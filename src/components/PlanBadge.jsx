var Jn = {
  premium: {
    icon: `👑`,
    label: `Premium`,
    color: `#9A6B00`,
    bg: `rgba(212,160,23,0.15)`,
  },
  basic: {
    icon: `⭐`,
    label: `Basic`,
    color: `#2D6A4F`,
    bg: `rgba(45,106,79,0.12)`,
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
        fontFamily: `'DM Sans', sans-serif`,
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
