import { Navbar } from "../components/Navbar";

var Ma = [
  {
    icon: `🔍`,
    title: `Verify before you trust`,
    desc: `Look for the verified badge, video-call before meeting, and be cautious of profiles that avoid a live conversation.`,
  },
  {
    icon: `🚫`,
    title: `Block and report freely`,
    desc: `Use Block or Report on any profile, conversation, or message from the ⋮ menu. Reports are reviewed by our team, never ignored.`,
  },
  {
    icon: `💬`,
    title: `Keep it on-platform at first`,
    desc: `Avoid sharing your phone number, home address, or financial details until you've built real trust. Calls happen through Nikha2, not your personal number.`,
  },
  {
    icon: `🤝`,
    title: `Meeting in person`,
    desc: `Choose a public place for early meetings, tell a friend or family member your plans, and arrange your own transport.`,
  },
  {
    icon: `💰`,
    title: `Never send money`,
    desc: `No genuine match will ever ask you for money, gift cards, or investment help. Report and block immediately if this happens.`,
  },
  {
    icon: `🔒`,
    title: `Control your privacy`,
    desc: `In Settings, you decide who can see your profile, your online status, and whether you appear in search at all.`,
  },
];

function SafetyPage() {
  return (
    <div
      style={{
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        minHeight: `100vh`,
      }}
    >
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;\n        }\n      "
        }
      </style>
      <Navbar />
      <section
        style={{
          paddingTop: 96,
          paddingBottom: 48,
          paddingLeft: 40,
          paddingRight: 40,
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          borderBottom: `1px solid #D4EDDA`,
          textAlign: `center`,
        }}
      >
        <div style={{ maxWidth: 720, margin: `0 auto` }}>
          <h1
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(28px, 4vw, 44px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              marginBottom: 12,
            }}
          >
            {"Safety "}
            <span className="green-text">Center</span>
          </h1>
          <p style={{ fontSize: 15, color: `#3D6B55` }}>
            Nikha2 connects people who haven't met before. Here's how we — and
            you — keep that safe.
          </p>
        </div>
      </section>
      <section
        style={{ padding: `48px 40px`, maxWidth: 1e3, margin: `0 auto` }}
      >
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`,
            gap: 20,
          }}
        >
          {Ma.map((e) => (
            <div
              key={e.title}
              style={{
                background: `#fff`,
                borderRadius: 16,
                border: `1px solid #E8F5EE`,
                padding: `22px 20px`,
                boxShadow: `0 4px 20px rgba(27,58,75,0.06)`,
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 10 }}>{e.icon}</div>
              <h3
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontWeight: 700,
                  fontSize: 16,
                  color: `#1B3A4B`,
                  marginBottom: 6,
                }}
              >
                {e.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: `#3D6B55`,
                  lineHeight: 1.6,
                }}
              >
                {e.desc}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 32,
            padding: `22px 24px`,
            background: `#F0FAF4`,
            border: `1px solid #D4EDDA`,
            borderRadius: 16,
            textAlign: `center`,
          }}
        >
          <p style={{ fontSize: 13.5, color: `#2D6A4F`, fontWeight: 600 }}>
            If you're in immediate danger, contact your local emergency services
            first — Nikha2's reporting tools are for platform safety, not
            emergency response.
          </p>
        </div>
      </section>
      <footer
        style={{
          background: `#1B3A4B`,
          color: `#74C69D`,
          padding: `32px 40px`,
          textAlign: `center`,
        }}
      >
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontWeight: 700,
            fontSize: 22,
            color: `#fff`,
            letterSpacing: `-0.02em`,
          }}
        >
          Nikha<span style={{ color: `#74C69D` }}>2</span>{" "}
          <span style={{ color: `#40916C` }}>♡</span>
        </div>
      </footer>
    </div>
  );
}

export { SafetyPage };
