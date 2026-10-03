// Maps the decompiled site's literal colours to theme tokens, by CSS property role.
// mapColor(value, property) -> replacement string, or null when the literal should stay / is unknown.
// Use isKnownKeep(value, property) to tell "deliberately kept" from "unmapped".

const ROLE = (prop) => {
  const p = String(prop || '').toLowerCase();
  if (/shadow|filter/.test(p)) return 'shadow';
  if (/border|outline|divider|line/.test(p)) return 'border';
  if (/^bg$|bg$|background|fill$|overlay|surface/.test(p)) return 'bg';
  return 'color';
};

// base colour (uppercase 6-digit hex) -> token per role; a string applies to every role
const T = {
  '1B3A4B': { color: '--fg', bg: '--deep', border: '--fg', shadow: '--shadow' },
  'FFFFFF': { color: null, bg: '--surface', border: '--surface', shadow: null },
  '2D6A4F': '--emerald-700',
  '74C69D': '--emerald-500',
  'D4EDDA': { color: '--line', bg: '--surface-2', border: '--line', shadow: '--line' },
  '3D6B55': '--muted',
  '40916C': { color: '--emerald-700', bg: '--emerald-700', border: '--emerald-500', shadow: '--emerald-500' },
  'F0FAF4': { color: '--surface-2', bg: '--surface-2', border: '--line', shadow: '--line' },
  'F8FAF5': { color: '--bg', bg: '--bg', border: '--line', shadow: '--line' },
  'E8F5EE': { color: '--line', bg: '--surface-2', border: '--line', shadow: '--line' },
  'C0392B': '--danger',
  'B7E4C7': '--mint',
  '9DC4B0': '--muted',
  'FFF5F5': '--danger-bg',
  'F5C6C6': { color: '--danger', bg: '--danger-bg', border: '--danger-line', shadow: '--danger-line' },
  '9A6B00': '--warning',
  'D4A017': '--gold',
  'D4AF37': '--gold',
  '52B788': '--emerald-500',
  '0D2418': '--deep', '0D1F2D': '--deep', '12291D': '--deep',
  'E63946': '--danger', 'EF4444': '--danger', '8A4A42': '--danger',
  'FEE2E2': '--danger-bg',
  '5C7A6D': '--muted', '8AA79C': '--muted',
  'F1F5F2': { color: '--line', bg: '--surface-2', border: '--line', shadow: '--line' },
  'B8E4C7': '--mint', 'B7E4C8': '--mint', 'B8E4C8': '--mint',
  '5BA086': '--emerald-500',
  '10B981': '--emerald-500',
  'F8FCF8': '--bg',
  'FDF6EC': { color: '--gold', bg: '--gold-bg', border: '--gold', shadow: '--gold' },
  'F0E0BE': { color: '--gold', bg: '--gold-bg', border: '--gold-line', shadow: '--gold-line' },
  'FFF8F0': { color: '--gold', bg: '--gold-bg', border: '--gold-line', shadow: '--gold-line' },
  'EADBC8': { color: '--gold', bg: '--gold-bg', border: '--gold-line', shadow: '--gold-line' },
  'F8C8DC': { color: '--danger', bg: '--danger-bg', border: '--danger-line', shadow: '--danger-line' },
  'E8A9A9': { color: '--danger', bg: '--danger-bg', border: '--danger-line', shadow: '--danger-line' },
  'F8F0F0': { color: '--danger', bg: '--danger-bg', border: '--danger-line', shadow: '--danger-line' },
  '1A1A1A': { color: '--fg', bg: '--deep', border: '--fg', shadow: '--shadow' },
  '252525': { color: '--fg', bg: '--deep', border: '--fg', shadow: '--shadow' },
  '2D2D2D': { color: '--fg', bg: '--deep', border: '--fg', shadow: '--shadow' },
  '3A3A3A': { color: '--fg', bg: '--deep', border: '--line', shadow: '--shadow' },
  '4A4A4A': { color: '--muted', bg: '--deep', border: '--line', shadow: '--shadow' },
  'FAFAFA': { color: '--surface', bg: '--surface-2', border: '--line', shadow: '--line' },
  'F0F0F0': { color: '--line', bg: '--surface-2', border: '--line', shadow: '--line' },
  'E5E7EB': { color: '--line', bg: '--surface-2', border: '--line', shadow: '--line' },
  '86EFAC': '--online-soft',
  // neutral greys (timestamps, placeholders, dividers)
  '555555': { color: '--muted', bg: '--line', border: '--line', shadow: '--shadow' },
  '888888': { color: '--muted', bg: '--line', border: '--line', shadow: '--shadow' },
  'AAAAAA': { color: '--muted', bg: '--line', border: '--line', shadow: '--shadow' },
  'BBBBBB': { color: '--muted', bg: '--line', border: '--line', shadow: '--shadow' },
  'CCCCCC': { color: '--muted', bg: '--line', border: '--line', shadow: '--shadow' },
  'DDDDDD': { color: '--muted', bg: '--line', border: '--line', shadow: '--shadow' },
  'D1D5DB': { color: '--muted', bg: '--line', border: '--line', shadow: '--shadow' },
  'F5F5F5': { color: '--surface-2', bg: '--surface-2', border: '--line', shadow: '--line' },
  '22C55E': '--online',
};
// rgba families: base rgb -> token per role (alpha preserved)
const RGB = {
  '27,58,75': { color: '--fg', bg: '--overlay', border: '--fg', shadow: '--shadow' },
  '13,31,45': { color: '--fg', bg: '--overlay', border: '--fg', shadow: '--shadow' },
  '45,106,79': '--emerald-700',
  '64,145,108': { color: '--emerald-700', bg: '--emerald-700', border: '--emerald-500', shadow: '--emerald-500' },
  '116,198,157': '--emerald-500',
  '183,228,199': '--mint', '184,228,199': '--mint',
  '92,122,109': '--muted',
  '192,57,43': '--danger',
  '212,160,23': '--gold',
  '212,175,55': '--gold',
  '16,185,129': '--emerald-500',
  '82,183,136': '--emerald-500',
  '212,237,218': { color: '--line', bg: '--surface-2', border: '--line', shadow: '--line' },
  '230,57,70': '--danger',
  '248,252,248': '--bg',
  '34,197,94': '--online',
  '255,255,255': { color: null, bg: '--surface', border: null, shadow: null },
  '0,0,0': null,
};

const tok = (entry, role) => (entry && typeof entry === 'object' ? entry[role] : entry);

function normHex(v) {
  let h = v.replace('#', '').toUpperCase();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return h;
}

function parseRgba(v) {
  const m = v.replace(/\s+/g, '').match(/^rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)$/i);
  if (!m) return null;
  return { rgb: `${m[1]},${m[2]},${m[3]}`, a: m[4] === undefined ? 1 : parseFloat(m[4]) };
}

const pct = (a) => `${Math.round(a * 1000) / 10}%`;

function mapColor(value, property) {
  const role = ROLE(property);
  const v = String(value).trim();
  if (v.startsWith('#')) {
    const t = tok(T[normHex(v)], role);
    return t ? `var(${t})` : null;
  }
  const p = parseRgba(v);
  if (!p) return null;
  if (!(p.rgb in RGB)) return null;
  const t = tok(RGB[p.rgb], role);
  if (!t) return null;
  if (p.a >= 1) return `var(${t})`;
  return `color-mix(in srgb, var(${t}) ${pct(p.a)}, transparent)`;
}

// Literals that intentionally stay (white text/borders and black shadows on photo or deep sections).
function isKnownKeep(value, property) {
  const role = ROLE(property);
  const v = String(value).trim();
  if (v.startsWith('#')) {
    const e = T[normHex(v)];
    return !!e && typeof e === 'object' && e[role] === null;
  }
  const p = parseRgba(v);
  if (!p) return false;
  if (p.rgb === '0,0,0') return true;
  const e = RGB[p.rgb];
  return !!e && typeof e === 'object' && e[role] === null;
}

module.exports = { mapColor, isKnownKeep, ROLE };
