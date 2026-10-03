import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { mapColor } = require('../_recovered/tools/retheme-map.cjs');

test('navy text becomes the foreground token', () => assert.equal(mapColor('#1B3A4B', 'color'), 'var(--fg)'));
test('navy background becomes the deep section token', () => assert.equal(mapColor('#1B3A4B', 'background'), 'var(--deep)'));
test('brand green text becomes emerald-700', () => assert.equal(mapColor('#2D6A4F', 'color'), 'var(--emerald-700)'));
test('mint border becomes emerald-500', () => assert.equal(mapColor('#74C69D', 'borderColor'), 'var(--emerald-500)'));
test('page background becomes --bg', () => assert.equal(mapColor('#F8FAF5', 'background'), 'var(--bg)'));
test('white background becomes the surface token', () => assert.equal(mapColor('#fff', 'background'), 'var(--surface)'));
test('white text stays literal', () => assert.equal(mapColor('#fff', 'color'), null));
test('rgba keeps its alpha through color-mix', () =>
  assert.equal(mapColor('rgba(116,198,157,0.2)', 'borderColor'), 'color-mix(in srgb, var(--emerald-500) 20%, transparent)'));
test('danger red becomes --danger', () => assert.equal(mapColor('#C0392B', 'color'), 'var(--danger)'));
test('old gold becomes --gold', () => assert.equal(mapColor('#D4AF37', 'color'), 'var(--gold)'));
test('unknown colours are reported as unmapped', () => assert.equal(mapColor('#123456', 'color'), null));
test('navy shadows use the shadow token with alpha', () =>
  assert.equal(mapColor('rgba(27,58,75,0.14)', 'boxShadow'), 'color-mix(in srgb, var(--shadow) 14%, transparent)'));
test('white glass backgrounds become translucent surface', () =>
  assert.equal(mapColor('rgba(255,255,255,0.85)', 'background'), 'color-mix(in srgb, var(--surface) 85%, transparent)'));
test('rgb with spaces and lowercase hex are normalised', () => {
  assert.equal(mapColor('#2d6a4f', 'background'), 'var(--emerald-700)');
  assert.equal(mapColor('rgba(45, 106, 79, 0.12)', 'bg'), 'color-mix(in srgb, var(--emerald-700) 12%, transparent)');
});
test('neutral greys become muted text and line/surface backgrounds', () => {
  assert.equal(mapColor('#AAA', 'color'), 'var(--muted)');
  assert.equal(mapColor('#ccc', 'background'), 'var(--line)');
  assert.equal(mapColor('#F5F5F5', 'background'), 'var(--surface-2)');
});
test('tailwind emerald and light-mint rgba families map to emerald and surface tokens', () => {
  assert.equal(mapColor('rgba(16,185,129,0.45)', 'boxShadow'), 'color-mix(in srgb, var(--emerald-500) 45%, transparent)');
  assert.equal(mapColor('rgba(212,237,218,0.25)', 'background'), 'color-mix(in srgb, var(--surface-2) 25%, transparent)');
  assert.equal(mapColor('rgba(230,57,70,0.1)', 'background'), 'color-mix(in srgb, var(--danger) 10%, transparent)');
});
