import { ADMIN_THEME } from "./theme";

var ADMIN_FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');`;

var adminCardStyle = {
  background: `color-mix(in srgb, var(--surface) 90%, transparent)`,
  border: `1px solid color-mix(in srgb, var(--emerald-500) 15%, transparent)`,
  borderRadius: 20,
  padding: 24,
  marginBottom: 20,
};

var adminTitleStyle = {
  fontFamily: `'Playfair Display', serif`,
  fontWeight: 700,
  color: ADMIN_THEME.navy,
  margin: 0,
};

var adminInputStyle = {
  width: `100%`,
  padding: `10px 13px`,
  borderRadius: 12,
  border: `1.5px solid ${ADMIN_THEME.border}`,
  background: ADMIN_THEME.paleBg,
  color: ADMIN_THEME.navy,
  fontSize: 13.5,
  fontFamily: `'DM Sans', sans-serif`,
  outline: `none`,
  boxSizing: `border-box`,
};

var adminPrimaryButton = (e) => ({
  padding: `10px 22px`,
  borderRadius: 32,
  border: `none`,
  background: e
    ? `var(--mint)`
    : `linear-gradient(135deg, ${ADMIN_THEME.deep} 0%, ${ADMIN_THEME.green} 100%)`,
  color: `#fff`,
  fontFamily: `'DM Sans', sans-serif`,
  fontSize: 13,
  fontWeight: 700,
  cursor: e ? `not-allowed` : `pointer`,
  letterSpacing: `0.02em`,
});

var adminSecondaryButton = {
  padding: `9px 20px`,
  borderRadius: 32,
  border: `1.5px solid ${ADMIN_THEME.border}`,
  background: `var(--surface)`,
  color: ADMIN_THEME.green,
  fontFamily: `'DM Sans', sans-serif`,
  fontSize: 13,
  fontWeight: 700,
  cursor: `pointer`,
};

var adminDangerButton = {
  padding: `9px 20px`,
  borderRadius: 32,
  border: `none`,
  background: ADMIN_THEME.danger,
  color: `#fff`,
  fontFamily: `'DM Sans', sans-serif`,
  fontSize: 13,
  fontWeight: 700,
  cursor: `pointer`,
};

var adminTableStyle = {
  width: `100%`,
  borderCollapse: `collapse`,
  fontSize: 13.5,
};

var adminThStyle = {
  textAlign: `left`,
  padding: `10px 12px`,
  fontSize: 10.5,
  fontWeight: 700,
  color: `var(--muted)`,
  letterSpacing: `0.06em`,
  textTransform: `uppercase`,
  borderBottom: `2px solid ${ADMIN_THEME.border}`,
};

var adminTdStyle = {
  padding: `12px 12px`,
  borderBottom: `1px solid ${ADMIN_THEME.borderSoft}`,
  verticalAlign: `middle`,
};

function adminBadgeStyle(e) {
  let t = {
      verified: { bg: `color-mix(in srgb, var(--emerald-700) 12%, transparent)`, color: ADMIN_THEME.green },
      pending: { bg: `color-mix(in srgb, var(--gold) 15%, transparent)`, color: ADMIN_THEME.gold },
      none: { bg: `color-mix(in srgb, var(--muted) 12%, transparent)`, color: ADMIN_THEME.textMuted },
      blocked: { bg: ADMIN_THEME.dangerBg, color: ADMIN_THEME.danger },
      open: { bg: `color-mix(in srgb, var(--gold) 15%, transparent)`, color: ADMIN_THEME.gold },
      reviewed: { bg: `color-mix(in srgb, var(--emerald-700) 12%, transparent)`, color: ADMIN_THEME.green },
      dismissed: { bg: `color-mix(in srgb, var(--muted) 12%, transparent)`, color: ADMIN_THEME.textMuted },
      actioned: { bg: `color-mix(in srgb, var(--emerald-700) 12%, transparent)`, color: ADMIN_THEME.green },
    },
    n = t[e] || t.none;
  return {
    display: `inline-block`,
    padding: `3px 11px`,
    borderRadius: 20,
    fontSize: 11.5,
    fontWeight: 700,
    background: n.bg,
    color: n.color,
    textTransform: `capitalize`,
  };
}

export {
  ADMIN_FONT_IMPORT,
  adminBadgeStyle,
  adminCardStyle,
  adminDangerButton,
  adminInputStyle,
  adminPrimaryButton,
  adminSecondaryButton,
  adminTableStyle,
  adminTdStyle,
  adminThStyle,
  adminTitleStyle,
};
