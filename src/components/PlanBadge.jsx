var Jn = {
  premium: {
    icon: `👑`,
    label: `Premium`,
    color: `var(--warning)`,
    bg: `color-mix(in srgb, var(--gold) 15%, transparent)`,
  },
  basic: {
    icon: `⭐`,
    label: `Basic`,
    color: `var(--emerald-700)`,
    bg: `color-mix(in srgb, var(--emerald-700) 12%, transparent)`,
  },
};

function PlanBadge({ plan: e, size: t = `sm` }) {
  let n = Jn[e];
  return n ? (
    <span
      title={`${n.label} member`}
      style={{
        display: `inline-flex`,
        alignItems: `center`,
        gap: 3,
        fontFamily: `var(--font-ui)`,
        fontSize: t === `sm` ? 10.5 : 12,
        fontWeight: 700,
        color: n.color,
        background: n.bg,
        borderRadius: 20,
        padding: t === `sm` ? `2px 7px` : `3px 10px`,
        letterSpacing: `0.02em`,
        whiteSpace: `nowrap`,
        verticalAlign: `middle`,
      }}
    >
      {n.icon} {n.label}
    </span>
  ) : null;
}

export { PlanBadge };
