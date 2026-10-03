import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme, nextTheme, noFlashScript } from '../src/lib/theme.js';

test('no stored choice follows the system preference', () => {
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme(null, false), 'light');
});
test('a stored choice wins over the system preference', () => assert.equal(resolveTheme('light', true), 'light'));
test('garbage in storage is ignored', () => assert.equal(resolveTheme('purple', true), 'dark'));
test('toggling flips the theme', () => { assert.equal(nextTheme('dark'), 'light'); assert.equal(nextTheme('light'), 'dark'); });

function runScript({ stored, systemDark, storageThrows = false }) {
  const documentElement = { dataset: {}, style: {} };
  const ctx = {
    document: { documentElement },
    localStorage: { getItem: (k) => { if (storageThrows) throw new Error('blocked'); return k === 'nikha2-theme' ? stored : null; } },
    matchMedia: (q) => ({ matches: q.includes('dark') && systemDark }),
  };
  new Function('document', 'localStorage', 'matchMedia', 'window', noFlashScript)(ctx.document, ctx.localStorage, ctx.matchMedia, ctx);
  return documentElement;
}
test('no-flash script applies a stored dark choice before React mounts', () => {
  assert.equal(runScript({ stored: 'dark', systemDark: false }).dataset.theme, 'dark');
});
test('no-flash script falls back to the system theme when storage is blocked', () => {
  assert.equal(runScript({ stored: null, systemDark: true, storageThrows: true }).dataset.theme, 'dark');
});

test('index.html inlines the same no-flash script', async () => {
  const { readFile } = await import('node:fs/promises');
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.ok(html.includes('<script>' + noFlashScript.replace(/\n/g, '') + '</script>'));
});
