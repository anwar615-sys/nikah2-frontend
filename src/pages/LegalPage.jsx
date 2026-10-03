import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TERMS_SECTIONS } from "../lib/legal";
import { BlurText, Reveal } from "../components/motion";

const PRIVACY_SECTION = TERMS_SECTIONS.find(([title]) => /Privacy/.test(title));

const PAGES = {
  terms: {
    title: [`Terms & `, `Conditions`],
    intro: `Please read these terms carefully before using Nikha2.`,
    sections: TERMS_SECTIONS,
  },
  privacy: {
    title: [`Privacy `, `Policy`],
    intro: `How Nikha2 looks after your personal information.`,
    sections: PRIVACY_SECTION ? [PRIVACY_SECTION] : [],
    pending: `Our full Privacy Policy is being finalised and will be published here soon.`,
  },
  cookies: {
    title: [`Cookie `, `Policy`],
    intro: `How Nikha2 uses cookies and similar technologies.`,
    sections: [],
    pending: `Our Cookie Policy is being finalised and will be published here soon.`,
  },
};

function LegalPage({ page }) {
  const p = PAGES[page];
  return (
    <div
      style={{
        fontFamily: `var(--font-ui)`,
        background: `var(--bg)`,
        minHeight: `100vh`,
        display: `flex`,
        flexDirection: `column`,
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
          paddingLeft: 24,
          paddingRight: 24,
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
            <BlurText key={page} text={p.title[0]} />
            <BlurText key={`${page}-2`} text={p.title[1]} wordClassName="nk-shiny" startIndex={p.title[0].trim().split(/\s+/).length} />
          </h1>
          <p style={{ fontSize: 15, color: `var(--muted)` }}>{p.intro}</p>
        </div>
      </section>
      <section style={{ flex: 1, padding: `48px 24px 72px` }}>
        <div
          style={{
            maxWidth: 760,
            margin: `0 auto`,
            background: `var(--surface)`,
            border: `1px solid var(--line)`,
            borderRadius: 20,
            padding: `clamp(22px, 4vw, 40px)`,
            display: `flex`,
            flexDirection: `column`,
            gap: 22,
          }}
        >
          {p.sections.map(([title, body]) => (
            <Reveal key={title} blur={false}>
              <h2
                style={{
                  fontFamily: `var(--font-display)`,
                  fontSize: 18,
                  fontWeight: 700,
                  color: `var(--fg)`,
                  margin: `0 0 8px`,
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: `var(--muted)`,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </Reveal>
          ))}
          {p.pending && (
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: `var(--emerald-700)`,
                background: `var(--surface-2)`,
                border: `1px solid var(--line)`,
                borderRadius: 12,
                padding: `14px 18px`,
                margin: 0,
              }}
            >
              {p.pending} In the meantime, see our{" "}
              <Link to="/terms" style={{ color: `var(--emerald-700)`, fontWeight: 700 }}>
                Terms &amp; Conditions
              </Link>{" "}
              or reach us through the chat on the home page.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div
      style={{
        fontFamily: `var(--font-ui)`,
        background: `var(--bg)`,
        minHeight: `100vh`,
        display: `flex`,
        flexDirection: `column`,
      }}
    >
      <style>
        {
          "\n      "
        }
      </style>
      <Navbar />
      <section
        style={{
          flex: 1,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          textAlign: `center`,
          padding: `120px 24px 72px`,
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🌿</div>
          <h1
            style={{
              fontFamily: `var(--font-display)`,
              fontSize: `clamp(28px, 5vw, 40px)`,
              fontWeight: 700,
              color: `var(--fg)`,
              margin: `0 0 10px`,
            }}
          >
            <BlurText text="Page not found" />
          </h1>
          <p style={{ fontSize: 15, color: `var(--muted)`, margin: `0 0 28px` }}>
            The page you're looking for doesn't exist or has moved.
          </p>
          <div
            style={{
              display: `flex`,
              gap: 12,
              justifyContent: `center`,
              flexWrap: `wrap`,
            }}
          >
            <Link className="nk-btn nk-btn-primary"
              to="/"
              style={{
                padding: `12px 26px`,
                borderRadius: 32,
                background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%)`,
                color: `#fff`,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: `none`,
              }}
            >
              Go Home
            </Link>
            <Link className="nk-btn"
              to="/explore"
              style={{
                padding: `11px 24px`,
                borderRadius: 32,
                border: `1.5px solid var(--line)`,
                background: `var(--surface)`,
                color: `var(--emerald-700)`,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: `none`,
              }}
            >
              Explore People
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export { LegalPage, NotFoundPage };
