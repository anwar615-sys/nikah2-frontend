// Converts compiled `(0, z.jsx)(Tag, {...props, children}, key)` calls back into JSX.
const ts = require('/opt/npm-tools/node_modules/typescript');
const fs = require('fs');

const [, , inFile, outFile] = process.argv;
const src = fs.readFileSync(inFile, 'utf8');
const sf = ts.createSourceFile('in.js', src, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);

function jsxCalleeKind(call) {
  // (0, X.jsx) | (0, X.jsxs) | X.jsx
  let c = call.expression;
  if (ts.isParenthesizedExpression(c)) c = c.expression;
  if (ts.isBinaryExpression(c) && c.operatorToken.kind === ts.SyntaxKind.CommaToken) c = c.right;
  if (ts.isPropertyAccessExpression(c) && ['jsx', 'jsxs', 'jsxDEV'].includes(c.name.text)) return c.name.text;
  return null;
}
function isJsxCall(n) {
  return ts.isCallExpression(n) && n.arguments.length >= 2 && jsxCalleeKind(n) &&
    ts.isObjectLiteralExpression(n.arguments[1]);
}
const text = (n) => src.slice(n.getStart(sf), n.getEnd());

// Print any node, replacing nested jsx calls.
function print(node) {
  if (isJsxCall(node)) return printJsx(node);
  let out = '';
  let pos = node.getStart(sf);
  const end = node.getEnd();
  ts.forEachChild(node, (child) => {
    const cs = child.getStart(sf);
    if (cs < pos) return;
    out += src.slice(pos, cs);
    out += print(child);
    pos = child.getEnd();
  });
  out += src.slice(pos, end);
  return out;
}

function tagName(arg) {
  if (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg)) return arg.text;
  if (ts.isPropertyAccessExpression(arg) && arg.name.text === 'Fragment') return '';
  const t = print(arg);
  if (/^[A-Za-z_$][\w$.]*$/.test(t)) {
    // lowercase identifiers would be treated as DOM tags; alias them
    return /^[a-z]/.test(t) && !t.includes('.') ? null : t;
  }
  return null;
}

function attrValue(v) {
  if (ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v)) {
    const s = v.text;
    if (!/["\n\\{}]/.test(s)) return `"${s}"`;
  }
  return `{${print(v)}}`;
}

function childText(v) {
  if (ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v)) {
    const s = v.text;
    if (s.trim() === s && s.length && !/[{}<>\n]/.test(s)) return s;
    return `{${JSON.stringify(s)}}`;
  }
  if (isJsxCall(v)) { const r = printJsx(v); return r.startsWith('/*') ? `{${r}}` : r; }
  return `{${print(v)}}`;
}

function printJsx(call) {
  const [tagArg, props, keyArg] = call.arguments;
  let tag = tagName(tagArg);
  if (tag === null) return `/* dynamic tag */ React.createElement(${print(tagArg)}, ${print(props)}${keyArg ? ', ' + print(keyArg) : ''})`;
  const attrs = [];
  let children = [];
  for (const p of props.properties) {
    if (ts.isSpreadAssignment(p)) { attrs.push(`{...${print(p.expression)}}`); continue; }
    if (ts.isShorthandPropertyAssignment(p)) {
      if (p.name.text === 'children') children = [`{${p.name.text}}`];
      else attrs.push(`${p.name.text}={${p.name.text}}`);
      continue;
    }
    if (ts.isPropertyAssignment(p)) {
      const name = ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : text(p.name);
      if (name === 'children') {
        const v = p.initializer;
        if (ts.isArrayLiteralExpression(v) && jsxCalleeKind(call) === 'jsxs') children = v.elements.map(childText);
        else children = [childText(v)];
      } else attrs.push(`${name}=${attrValue(p.initializer)}`);
      continue;
    }
    attrs.push(`{...{${print(p)}}}`); // methods etc.
  }
  if (keyArg && !(ts.isIdentifier(keyArg) && keyArg.text === 'undefined') && !(ts.isVoidExpression(keyArg)))
    attrs.unshift(`key={${print(keyArg)}}`);
  const open = tag + (attrs.length ? ' ' + attrs.join(' ') : '');
  if (!children.length) return tag ? `<${open} />` : '<></>';
  return `<${open}>${children.join('')}</${tag}>`;
}

fs.writeFileSync(outFile, print(sf));
console.log('written', outFile);
