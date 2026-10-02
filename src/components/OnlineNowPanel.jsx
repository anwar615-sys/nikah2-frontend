import * as React from "react";
import { useNavigate } from "react-router-dom";
import { GENDER_EMOJI } from "../lib/people";

function OnlineNowPanel({ member: e }) {
  let [t, n] = (0, React.useState)(!1),
    r = useNavigate();
  return (
    <div
      className="card-hover"
      style={{
        background: `#fff`,
        borderRadius: 18,
        overflow: `hidden`,
        border: `1px solid #E8F5EE`,
        boxShadow: `0 4px 20px rgba(27,58,75,0.07)`,
        transition: `transform 0.22s, box-shadow 0.22s`,
        cursor: `pointer`,
        display: `flex`,
        flexDirection: `column`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.transform = `translateY(-4px)`),
          (e.currentTarget.style.boxShadow = `0 12px 36px rgba(45,106,79,0.16)`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.transform = `none`),
          (e.currentTarget.style.boxShadow = `0 4px 20px rgba(27,58,75,0.07)`));
      }}
    >
      <div
        style={{
          background: `linear-gradient(160deg, #D4EDDA 0%, #B7E4C7 100%)`,
          padding: `22px 0 14px`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          gap: 6,
          position: `relative`,
        }}
      >
        {e.avatar ? (
          <img
            src={e.avatar}
            alt={e.name}
            style={{
              width: 68,
              height: 68,
              borderRadius: `50%`,
              border: `3px solid #fff`,
              boxShadow: `0 4px 14px rgba(45,106,79,0.22)`,
              objectFit: `cover`,
            }}
          />
        ) : (
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: `50%`,
              border: `3px solid #fff`,
              boxShadow: `0 4px 14px rgba(45,106,79,0.22)`,
              background: `#F8FAF5`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              fontSize: 32,
            }}
          >
            {GENDER_EMOJI[e.gender] || `🙂`}
          </div>
        )}
        <span
          style={{
            position: `absolute`,
            bottom: 16,
            right: `calc(50% - 26px)`,
            width: 10,
            height: 10,
            borderRadius: `50%`,
            background: `#22C55E`,
            border: `2px solid #fff`,
            boxShadow: `0 0 8px rgba(34,197,94,0.6)`,
          }}
        />
        <button
          onClick={(e) => {
            (e.stopPropagation(), n((e) => !e));
          }}
          style={{
            position: `absolute`,
            top: 10,
            right: 10,
            background: t ? `rgba(230,57,70,0.1)` : `rgba(255,255,255,0.75)`,
            border: `1.5px solid ${t ? `#e63946` : `rgba(255,255,255,0.6)`}`,
            borderRadius: `50%`,
            width: 30,
            height: 30,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            cursor: `pointer`,
            fontSize: 14,
            transition: `all 0.2s`,
          }}
        >
          {t ? `❤️` : `🤍`}
        </button>
      </div>
      <div
        style={{
          padding: `12px 14px 16px`,
          display: `flex`,
          flexDirection: `column`,
          flex: 1,
        }}
      >
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`,
            marginBottom: 2,
          }}
        >
          <span
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontWeight: 700,
              fontSize: 14.5,
              color: `#1B3A4B`,
            }}
          >
            {e.name}
          </span>
          <span style={{ fontSize: 11.5, color: `#3D6B55`, fontWeight: 600 }}>
            {e.age}
            {" yrs"}
          </span>
        </div>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            gap: 4,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: `50%`,
              background: `#22C55E`,
              display: `inline-block`,
              boxShadow: `0 0 6px rgba(34,197,94,0.6)`,
            }}
          />
          <span
            style={{
              fontSize: 11.5,
              color: `#22C55E`,
              fontWeight: 500,
              fontFamily: `'DM Sans', sans-serif`,
            }}
          >
            Online now
          </span>
        </div>
        <div
          style={{
            background: `#F0FAF4`,
            border: `1px solid #D4EDDA`,
            borderRadius: 10,
            padding: `8px 10px`,
            marginBottom: 12,
            display: `flex`,
            flexDirection: `column`,
            gap: 4,
          }}
        >
          {[
            { label: `City`, value: e.city },
            { label: `Country`, value: e.country },
            { label: `Kids`, value: e.kids },
            { label: `Seeking`, value: e.seeking },
          ].map(({ label: e, value: t }) => (
            <div
              key={e}
              style={{
                fontSize: 11.5,
                display: `flex`,
                justifyContent: `space-between`,
              }}
            >
              <span style={{ color: `#3D6B55`, fontWeight: 600 }}>{e}</span>
              <span style={{ color: `#2D6A4F`, fontWeight: 500 }}>{t}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => r(`/messaging`, { state: { selectedContact: e } })}
          style={{
            marginTop: `auto`,
            width: `100%`,
            background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
            color: `#fff`,
            border: `none`,
            borderRadius: 28,
            padding: `12px 0`,
            fontSize: 13.5,
            fontWeight: 700,
            fontFamily: `'DM Sans', sans-serif`,
            cursor: `pointer`,
            letterSpacing: `0.03em`,
            transition: `all 0.22s`,
            boxShadow: `0 4px 16px rgba(27,58,75,0.28)`,
          }}
          onMouseEnter={(e) => {
            ((e.currentTarget.style.opacity = `0.88`),
              (e.currentTarget.style.transform = `translateY(-1px)`));
          }}
          onMouseLeave={(e) => {
            ((e.currentTarget.style.opacity = `1`),
              (e.currentTarget.style.transform = `none`));
          }}
        >
          💬 Chat Now
        </button>
      </div>
    </div>
  );
}

export { OnlineNowPanel };
