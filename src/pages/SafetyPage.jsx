import { Navbar } from "../components/Navbar";
import { BlurText, Reveal, SpotlightCard } from "../components/motion";

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
        fontFamily: `var(--font-ui)`,
        background: `var(--bg)`,
        minHeight: `100vh`,
      }}
    >
      <style>
        {
          "\n        .green-text {\n          background: linear-gradient(135deg, var(--emerald-700), var(--emerald-500), var(--emerald-500), var(--mint), var(--emerald-700));\n          background-size: 200% auto;\n          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;\n        }\n      "
        }
      </style>
      <Navbar />
      <section
        style={{
          paddingTop: 96,
          paddingBottom: 48,
          paddingLeft: 40,
          paddingRight: 40,
          background: `linear-gradient(160deg, var(--surface-2) 0%, var(--surface-2) 100%)`,
          borderBottom: `1px solid var(--line)`,
          textAlign: `center`,
        }}
      >
        <div style={{ maxWidth: 720, margin: `0 auto` }}>
          <h1
            style={{
              fontFamily: `var(--font-display)`,
              fontSize: `clamp(28px, 4vw, 44px)`,
              fontWeight: 700,
              color: `var(--fg)`,
              marginBottom: 12,
            }}
          >
            <BlurText text="Safety " />
            <BlurText text="Center" wordClassName="nk-shiny" startIndex={1} />
          </h1>
          <p style={{ fontSize: 15, color: `var(--muted)` }}>
            Nikha2 connects people who haven't met before. Here's how we — and
            you — keep that safe.
          </p>
        </div>
      </section>
      <section
        style={{ padding: `48px 40px`, maxWidth: 1e3, margin: `0 auto` }}
      >
        <Reveal
          stagger
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`,
            gap: 20,
          }}
        >
          {Ma.map((e) => (
            <SpotlightCard
              key={e.title}
              style={{
                background: `var(--surface)`,
                borderRadius: 16,
                border: `1px solid var(--line)`,
                padding: `22px 20px`,
                boxShadow: `0 4px 20px color-mix(in srgb, var(--shadow) 6%, transparent)`,
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 10 }}>{e.icon}</div>
              <h3
                style={{
                  fontFamily: `var(--font-display)`,
                  fontWeight: 700,
                  fontSize: 16,
                  color: `var(--fg)`,
                  marginBottom: 6,
                }}
              >
                {e.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: `var(--muted)`,
                  lineHeight: 1.6,
                }}
              >
                {e.desc}
              </p>
            </SpotlightCard>
          ))}
        </Reveal>
        <div
          style={{
            marginTop: 32,
            padding: `22px 24px`,
            background: `var(--surface-2)`,
            border: `1px solid var(--line)`,
            borderRadius: 16,
            textAlign: `center`,
          }}
        >
          <p style={{ fontSize: 13.5, color: `var(--emerald-700)`, fontWeight: 600 }}>
            If you're in immediate danger, contact your local emergency services
            first — Nikha2's reporting tools are for platform safety, not
            emergency response.
          </p>
        </div>
      </section>
      <footer
        style={{
          background: `var(--deep)`,
          color: `var(--accent-text)`,
          padding: `32px 40px`,
          textAlign: `center`,
        }}
      >
        <div
          style={{
            fontFamily: `var(--font-display)`,
            fontWeight: 700,
            fontSize: 22,
            color: `#fff`,
            letterSpacing: `-0.02em`,
          }}
        >
          Nikha<span style={{ color: `var(--accent-text)` }}>2</span>{" "}
          <span style={{ color: `var(--emerald-700)` }}>♡</span>
        </div>
      </footer>
    </div>
  );
}

export { SafetyPage };
