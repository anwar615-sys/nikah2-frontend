import * as React from "react";
import { useScreenshotGuard } from "../../hooks/useScreenshotGuard";
import { api } from "../../lib/api";

function TimedImageMessage({ messageId: e, duration: t, noScreenshot: n }) {
  let [r, i] = (0, React.useState)(`idle`),
    [a, o] = (0, React.useState)(null),
    [s, c] = (0, React.useState)(t),
    [l, u] = (0, React.useState)(!1),
    [d, f] = (0, React.useState)(``),
    p = (0, React.useRef)(null),
    m = (0, React.useCallback)(() => {
      (clearInterval(p.current), i(`expired`));
    }, []),
    h = (0, React.useCallback)(() => {
      r === `viewing` && (u(!0), m(), setTimeout(() => u(!1), 3e3));
    }, [r, m]);
  useScreenshotGuard(n ? h : () => {});
  let g = async () => {
      if (r === `idle`) {
        i(`loading`);
        try {
          let n = await api.post(`/media/timed-images/${e}/view`, {});
          (o(n.signedUrl),
            c(n.durationSecondsRemaining ?? t),
            i(`viewing`),
            (p.current = setInterval(() => {
              c((e) => {
                let t = +(e - 0.1).toFixed(1);
                return t <= 0 ? (clearInterval(p.current), i(`expired`), 0) : t;
              });
            }, 100)));
        } catch (e) {
          (f(
            e.code === `TIMED_IMAGE_NOT_ACCESSIBLE`
              ? `Already viewed`
              : e.message || `Could not open`,
          ),
            i(`error`));
        }
      }
    },
    _ = (0, React.useCallback)(() => {
      r === `viewing` && m();
    }, [r, m]);
  ((0, React.useEffect)(() => {
    let e = () => {
      r === `viewing` && _();
    };
    return (
      window.addEventListener(`blur`, e),
      () => window.removeEventListener(`blur`, e)
    );
  }, [r, _]),
    (0, React.useEffect)(() => () => clearInterval(p.current), []));
  let y = 2 * Math.PI * 13,
    b = (s / t) * y;
  return r === `expired` || r === `error` ? (
    <div className="timed-expired">
      <span style={{ fontSize: 22 }}>🔥</span>
      <span className="timed-expired-text">
        {r === `error` ? d : `Photo expired`}
      </span>
      {l && <span className="screenshot-warn">⚠️ Screenshot detected</span>}
    </div>
  ) : r === `loading` ? (
    <div className="timed-idle" style={{ cursor: `default` }}>
      <div className="timed-idle-label">Opening…</div>
    </div>
  ) : r === `viewing` ? (
    <div
      className="timed-viewing"
      onMouseUp={_}
      onTouchEnd={_}
      style={{ userSelect: `none`, WebkitUserSelect: `none` }}
    >
      <img
        src={a}
        alt="timed"
        className="timed-photo"
        draggable={!1}
        onContextMenu={(e) => e.preventDefault()}
        style={{ pointerEvents: `none` }}
      />
      {n && <div className="no-ss-overlay" />}
      <svg className="progress-ring" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2.5"
        />
        <circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray={`${b} ${y}`}
          strokeLinecap="round"
          style={{
            transform: `rotate(-90deg)`,
            transformOrigin: `50% 50%`,
            transition: `stroke-dasharray 0.1s linear`,
          }}
        />
      </svg>
      <div className="timed-timer">{s.toFixed(1)}s</div>
      {n && <div className="timed-lock-badge">🔒</div>}
    </div>
  ) : (
    <div className="timed-idle" onMouseDown={g} onTouchStart={g}>
      <div style={{ fontSize: 28 }}>📷</div>
      <div className="timed-idle-label">
        {"Hold to view · "}
        {t}s
      </div>
      <div className="timed-idle-sub">
        {n ? `🔒 No screenshot` : `📸 Screenshot OK`}
      </div>
    </div>
  );
}

export { TimedImageMessage };
