function ConfirmDialog({
  message: e,
  confirmLabel: t = `Confirm`,
  danger: n = !1,
  onConfirm: r,
  onCancel: i,
}) {
  return (
    <div
      onClick={i}
      style={{
        position: `fixed`,
        inset: 0,
        background: `color-mix(in srgb, var(--overlay) 50%, transparent)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        zIndex: 300,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `var(--surface)`,
          borderRadius: 20,
          maxWidth: 340,
          width: `100%`,
          padding: 24,
          fontFamily: `'DM Sans', sans-serif`,
          boxShadow: `0 24px 64px color-mix(in srgb, var(--shadow) 25%, transparent)`,
          textAlign: `center`,
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: `var(--fg)`,
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {e}
        </p>
        <div style={{ display: `flex`, gap: 10 }}>
          <button
            onClick={i}
            style={{
              flex: 1,
              padding: `10px 0`,
              borderRadius: 20,
              border: `1.5px solid var(--line)`,
              background: `transparent`,
              color: `var(--muted)`,
              fontWeight: 600,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            Cancel
          </button>
          <button
            onClick={r}
            style={{
              flex: 1,
              padding: `10px 0`,
              borderRadius: 20,
              border: `none`,
              background: n
                ? `var(--danger)`
                : `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%)`,
              color: `#fff`,
              fontWeight: 700,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            {t}
          </button>
        </div>
      </div>
    </div>
  );
}

export { ConfirmDialog };
