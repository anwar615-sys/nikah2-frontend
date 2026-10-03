// Pure helpers for the typography + button codemod (retype.cjs).
const NO_BG = /^\s*(transparent|none)\s*$/i;

// Decide the glow class set for a <button> from its inline background/border and hover behaviour.
// Controls that are not really buttons to the eye (fake inputs, switches, list rows, icons) only get the soft glow.
const SOFT_NAME = /(^|-)(input|toggle|track|row|item|option|icon)(-|$)/;

function classifyButton({ background = '', border = '', hasBgHover = false, classGradient = false, className = '' } = {}) {
  if (className.split(/\s+/).some((c) => SOFT_NAME.test(c))) return 'nk-btn nk-btn-soft';
  if (classGradient || /linear-gradient/.test(background)) return 'nk-btn nk-btn-primary';
  const clear = background === '' ? false : NO_BG.test(background);
  const hasBorder = border && !/^\s*(none|0)\s*$/i.test(border);
  if (clear && hasBorder) return 'nk-btn nk-btn-ghost';
  if (clear || hasBgHover) return 'nk-btn nk-btn-soft';
  return 'nk-btn';
}

function mergeClass(existing, add) {
  const have = existing.split(/\s+/).filter(Boolean);
  const extra = add.split(/\s+/).filter((c) => !have.includes(c));
  return [...extra, ...have].join(' ');
}

function replaceFonts(text) {
  return text
    .replace(/[ \t]*@import url\(['"]?https:\/\/fonts\.googleapis\.com[^)]*\);[ \t]*(\\n|\n)?/g, '')
    .replace(/'Playfair Display',\s*(Georgia,\s*)?serif/g, 'var(--font-display)')
    .replace(/'DM Sans',\s*sans-serif/g, 'var(--font-ui)');
}

module.exports = { classifyButton, mergeClass, replaceFonts };
