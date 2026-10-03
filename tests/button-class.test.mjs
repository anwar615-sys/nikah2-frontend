import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { classifyButton, mergeClass, replaceFonts } = require('../_recovered/tools/button-class.cjs');

test('gradient background is primary', () => {
  assert.equal(classifyButton({ background: 'linear-gradient(135deg, var(--deep), var(--emerald-700))' }), 'nk-btn nk-btn-primary');
});
test('a class whose CSS has a gradient is primary', () => {
  assert.equal(classifyButton({ classGradient: true }), 'nk-btn nk-btn-primary');
});
test('transparent with border is ghost', () => {
  assert.equal(classifyButton({ background: 'transparent', border: '1.5px solid var(--line)' }), 'nk-btn nk-btn-ghost');
});
test('borderless transparent (icon) button is soft', () => {
  assert.equal(classifyButton({ background: 'none', border: 'none' }), 'nk-btn nk-btn-soft');
});
test('list item with its own background hover is soft', () => {
  assert.equal(classifyButton({ background: 'var(--surface)', hasBgHover: true }), 'nk-btn nk-btn-soft');
});
test('solid background is plain nk-btn', () => {
  assert.equal(classifyButton({ background: 'var(--emerald-700)', border: 'none' }), 'nk-btn');
});
test('mergeClass keeps existing classes and does not duplicate', () => {
  assert.equal(mergeClass('join-btn', 'nk-btn nk-btn-primary'), 'nk-btn nk-btn-primary join-btn');
  assert.equal(mergeClass('nk-btn x', 'nk-btn'), 'nk-btn x');
});
test('replaceFonts swaps both families and drops font imports', () => {
  const src = "a{font-family:'Playfair Display', serif} b{font-family:'DM Sans',sans-serif}\n        @import url('https://fonts.googleapis.com/css2?family=X&display=swap');\nc{font:'Playfair Display', Georgia, serif}";
  const out = replaceFonts(src);
  assert.ok(!/Playfair|DM Sans|@import/.test(out));
  assert.ok(out.includes('var(--font-display)') && out.includes('var(--font-ui)'));
});
test('input-like, switch, row and icon classes are soft', () => {
  for (const c of ['signup-input', 'toggle-track', 'ss-toggle', 'c-row', 'input-icon', 'account-dropdown-item'])
    assert.equal(classifyButton({ background: 'var(--surface)', className: c }), 'nk-btn nk-btn-soft', c);
});
