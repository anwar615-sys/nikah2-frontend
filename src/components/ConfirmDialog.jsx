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
        background: `rgba(27,58,75,0.5)`,
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
          background: `#fff`,
          borderRadius: 20,
          maxWidth: 340,
          width: `100%`,
          padding: 24,
          fontFamily: `'DM Sans', sans-serif`,
          boxShadow: `0 24px 64px rgba(27,58,75,0.25)`,
          textAlign: `center`,
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: `#1B3A4B`,
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
              border: `1.5px solid #D4EDDA`,
              background: `transparent`,
              color: `#3D6B55`,
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
                ? `#C0392B`
                : `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
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
