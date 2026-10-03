// One-off codemod: replace literal colours in src/ with theme tokens.
// Usage: node _recovered/tools/retheme.cjs [--dry]
// Exits 1 if any colour could not be mapped (and is not a deliberate keep).
const fs = require('fs');
const path = require('path');
const ts = (() => { try { return require('typescript'); } catch (e) { return require('/opt/npm-tools/node_modules/typescript'); } })();
const { mapColor, isKnownKeep } = require('./retheme-map.cjs');

const ROOT = path.resolve(__dirname, '../../src');
const DRY = process.argv.includes('--dry');
// The call screen sits on live video and is dark in both themes, so it keeps its literal colours.
const SKIP = new Set([path.join(ROOT, 'styles/legacy.css'), path.join(ROOT, 'calls/CallOverlay.jsx')]);
const COLOR_RE = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g;
// canvas / WebGL APIs cannot read CSS variables
const LITERAL_ONLY = /^(fillStyle|strokeStyle|shadowColor)$/;

const LOG = process.argv.includes('--log');
const mappedLog = [];
const unmapped = [];
const kept = [];
let replaced = 0;

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return files(p);
    return /\.(jsx?|mjs)$/.test(d.name) && !SKIP.has(p) ? [p] : [];
  });
}

function propertyNameFor(node) {
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isPropertyAssignment(n)) return n.name.getText().replace(/['"`]/g, '');
    if (ts.isJsxAttribute(n)) return n.name.getText();
    if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isPropertyAccessExpression(n.left)) return n.left.name.text;
    if (ts.isVariableDeclaration(n) || ts.isFunctionLike(n) || ts.isSourceFile(n)) return null;
  }
  return null;
}

function camel(p) { return p.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }

function replaceIn(text, prop, where) {
  return text.replace(COLOR_RE, (c) => {
    if (prop && LITERAL_ONLY.test(prop)) { kept.push(`${where} ${c} ${prop} (canvas)`); return c; }
    const m = mapColor(c, prop || 'color');
    if (m) { replaced++; if (LOG) mappedLog.push(`${where} ${c} ${prop} -> ${m}`); return m; }
    if (isKnownKeep(c, prop || 'color')) { kept.push(`${where} ${c} ${prop}`); return c; }
    unmapped.push(`${where} ${c} ${prop || '(no property)'}`);
    return c;
  });
}

function replaceCss(text, where) {
  // CSS declarations inside <style> strings: map each value by its property
  return text.replace(/([a-zA-Z-]+)(\s*:\s*)([^;{}]+)/g, (all, prop, sep, val) => {
    if (!COLOR_RE.test(val)) { COLOR_RE.lastIndex = 0; return all; }
    COLOR_RE.lastIndex = 0;
    return prop + sep + replaceIn(val, camel(prop), where);
  });
}

for (const file of files(ROOT)) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
  const edits = [];
  const rel = path.relative(path.resolve(ROOT, '..'), file);
  (function walk(n) {
    const isLit = ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) || n.kind === ts.SyntaxKind.TemplateHead || n.kind === ts.SyntaxKind.TemplateMiddle || n.kind === ts.SyntaxKind.TemplateTail || ts.isJsxText(n);
    if (isLit) {
      const raw = src.slice(n.getStart(sf), n.getEnd());
      COLOR_RE.lastIndex = 0;
      if (COLOR_RE.test(raw)) {
        COLOR_RE.lastIndex = 0;
        const line = sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
        const where = `${rel}:${line}`;
        const looksCss = /[{}]/.test(raw) && /:\s*[^;]+;/.test(raw);
        const out = looksCss ? replaceCss(raw, where) : replaceIn(raw, propertyNameFor(n), where);
        if (out !== raw) edits.push([n.getStart(sf), n.getEnd(), out]);
      }
    }
    ts.forEachChild(n, walk);
  })(sf);
  if (edits.length && !DRY) {
    let out = src;
    for (const [s, e, t] of edits.sort((a, b) => b[0] - a[0])) out = out.slice(0, s) + t + out.slice(e);
    fs.writeFileSync(file, out);
  }
}

if (LOG) console.log(mappedLog.join('\n'));
if (process.argv.includes('--kept')) console.log(kept.join('\n'));
console.log(`replaced ${replaced} colours, kept ${kept.length} deliberate literals, ${unmapped.length} unmapped`);
if (unmapped.length) { console.log(unmapped.map((u) => 'UNMAPPED ' + u).join('\n')); process.exit(1); }
