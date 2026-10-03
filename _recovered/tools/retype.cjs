// One-off codemod for Task 3: fonts -> var(--font-*), drop per-component font @imports,
// tag every <button> with nk-btn classes, and remove hover handlers the CSS now owns.
// Usage: node _recovered/tools/retype.cjs [--dry]
const fs = require('fs');
const path = require('path');
const ts = (() => { try { return require('typescript'); } catch (e) { return require('/opt/npm-tools/node_modules/typescript'); } })();
const { classifyButton, mergeClass, replaceFonts } = require('./button-class.cjs');

const ROOT = path.resolve(__dirname, '../../src');
const DRY = process.argv.includes('--dry');
const SKIP = new Set([path.join(ROOT, 'calls/CallOverlay.jsx')]);
const stats = { files: 0, buttons: 0, primary: 0, ghost: 0, soft: 0, handlersRemoved: 0 };

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return files(p);
    return /\.(jsx?|mjs)$/.test(d.name) ? [p] : [];
  });
}

function litText(n) {
  if (!n) return '';
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  return n.getText();
}

// Only `e.currentTarget.style.boxShadow = …` / `.transform = …` assignments (comma/paren chains allowed).
function onlyShadowTransform(expr) {
  if (!expr) return false;
  if (ts.isParenthesizedExpression(expr)) return onlyShadowTransform(expr.expression);
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.CommaToken)
    return onlyShadowTransform(expr.left) && onlyShadowTransform(expr.right);
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.EqualsToken)
    return /\.currentTarget\.style\.(boxShadow|transform)$/.test(expr.left.getText());
  return false;
}
function handlerIsShadowOnly(init) {
  const fn = init && ts.isJsxExpression(init) ? init.expression : null;
  if (!fn || !ts.isArrowFunction(fn)) return false;
  if (ts.isBlock(fn.body)) return fn.body.statements.length > 0 && fn.body.statements.every((s) => ts.isExpressionStatement(s) && onlyShadowTransform(s.expression));
  return onlyShadowTransform(fn.body);
}
function handlerSetsBackground(init) {
  return !!init && /\.currentTarget\.style\.(background|color)\b/.test(init.getText());
}

for (const file of files(ROOT)) {
  if (SKIP.has(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  const fonted = replaceFonts(src);
  const sf = ts.createSourceFile(file, fonted, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
  // background/border declared by each class in this file's <style> strings
  const classCss = new Map();
  for (const m of fonted.matchAll(/\.([a-zA-Z][\w-]*)\s*\{([^}]*)\}/g)) {
    if (classCss.has(m[1])) continue;
    const bg = /(?:^|[;\s])background(?:-color)?\s*:\s*([^;]+)/.exec(m[2]);
    const bd = /(?:^|[;\s])border\s*:\s*([^;]+)/.exec(m[2]);
    classCss.set(m[1], { background: bg ? bg[1].trim() : '', border: bd ? bd[1].trim() : '' });
  }
  const edits = [];
  (function walk(n) {
    const tag = (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) ? n.tagName.getText() : '';
    if (tag === 'button' || tag === 'Link' || tag === 'a') {
      const attrs = n.attributes.properties.filter(ts.isJsxAttribute);
      const get = (name) => attrs.find((a) => a.name.getText() === name);
      const style = get('style');
      let background = '', border = '';
      const obj = style?.initializer?.expression;
      if (obj && ts.isObjectLiteralExpression(obj)) {
        for (const p of obj.properties) {
          if (!ts.isPropertyAssignment(p)) continue;
          const k = p.name.getText().replace(/['"]/g, '');
          if (k === 'background' || k === 'backgroundColor') background = litText(p.initializer);
          if (k === 'border') border = litText(p.initializer);
        }
      }
      const enter = get('onMouseEnter'), leave = get('onMouseLeave');
      const hasBgHover = handlerSetsBackground(enter?.initializer);
      const cls = get('className');
      const existing = cls?.initializer && ts.isStringLiteral(cls.initializer) ? cls.initializer.text : '';
      if (existing.split(/\s+/).includes('nk-theme-toggle') || (cls && cls.initializer.getText().includes('nk-theme-toggle'))) { ts.forEachChild(n, walk); return; }
      for (const c of existing.split(/\s+/)) {
        const css = classCss.get(c);
        if (css) { background = background || css.background; border = border || css.border; }
      }
      const classGradient = /linear-gradient/.test(background);
      // links only count when they are styled as buttons (gradient pill or bordered pill)
      if (tag !== 'button') {
        const pill = /linear-gradient/.test(background) || (border && !/^\s*none\s*$/.test(border) && /borderRadius|border-radius/.test(n.getText().slice(0, 600) + JSON.stringify([...classCss.keys()].filter((k) => existing.includes(k)))));
        if (!pill) { ts.forEachChild(n, walk); return; }
      }
      const clsText = cls ? (existing || cls.initializer.getText()) : '';
      const add = classifyButton({ background, border, hasBgHover, classGradient, className: clsText.replace(/[^\w\s-]/g, ' ') });
      stats.buttons++; if (add.includes('primary')) stats.primary++; if (add.includes('ghost')) stats.ghost++; if (add.includes('soft')) stats.soft++;
      if (!cls) edits.push([n.tagName.getEnd(), n.tagName.getEnd(), ` className="${add}"`]);
      else if (ts.isStringLiteral(cls.initializer)) edits.push([cls.initializer.getStart(sf), cls.initializer.getEnd(), `"${mergeClass(existing, add)}"`]);
      else if (!cls.initializer.getText().includes('nk-btn')) {
        const expr = cls.initializer.expression.getText(sf);
        edits.push([cls.initializer.getStart(sf), cls.initializer.getEnd(), `{\`${add} \${${expr} ?? ""}\`}`]);
      }
      // hover handlers that only set shadow/transform: the CSS owns hover now
      for (const h of [enter, leave]) if (h && handlerIsShadowOnly(h.initializer)) {
        let s = h.getFullStart(); edits.push([s, h.getEnd(), '']); stats.handlersRemoved++;
      }
    }
    ts.forEachChild(n, walk);
  })(sf);
  let out = fonted;
  for (const [s, e, t] of edits.sort((a, b) => b[0] - a[0])) out = out.slice(0, s) + t + out.slice(e);
  if (out !== src) { stats.files++; if (!DRY) fs.writeFileSync(file, out); }
}
console.log(JSON.stringify(stats));
