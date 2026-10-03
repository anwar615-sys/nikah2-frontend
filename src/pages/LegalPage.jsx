import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TERMS_SECTIONS } from "../lib/legal";

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
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        minHeight: `100vh`,
        display: `flex`,
        flexDirection: `column`,
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
          paddingLeft: 24,
          paddingRight: 24,
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
            {p.title[0]}
            <span className="green-text">{p.title[1]}</span>
          </h1>
          <p style={{ fontSize: 15, color: `#3D6B55` }}>{p.intro}</p>
        </div>
      </section>
      <section style={{ flex: 1, padding: `48px 24px 72px` }}>
        <div
          style={{
            maxWidth: 760,
            margin: `0 auto`,
            background: `#fff`,
            border: `1px solid #E8F5EE`,
            borderRadius: 20,
            padding: `clamp(22px, 4vw, 40px)`,
            display: `flex`,
            flexDirection: `column`,
            gap: 22,
          }}
        >
          {p.sections.map(([title, body]) => (
            <div key={title}>
              <h2
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontSize: 18,
                  fontWeight: 700,
                  color: `#1B3A4B`,
                  margin: `0 0 8px`,
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: `#3D6B55`,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
          {p.pending && (
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: `#2D6A4F`,
                background: `#F0FAF4`,
                border: `1px solid #D4EDDA`,
                borderRadius: 12,
                padding: `14px 18px`,
                margin: 0,
              }}
            >
              {p.pending} In the meantime, see our{" "}
              <Link to="/terms" style={{ color: `#2D6A4F`, fontWeight: 700 }}>
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
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        minHeight: `100vh`,
        display: `flex`,
        flexDirection: `column`,
      }}
    >
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');\n      "
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
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(28px, 5vw, 40px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              margin: `0 0 10px`,
            }}
          >
            Page not found
          </h1>
          <p style={{ fontSize: 15, color: `#3D6B55`, margin: `0 0 28px` }}>
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
            <Link
              to="/"
              style={{
                padding: `12px 26px`,
                borderRadius: 32,
                background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
                color: `#fff`,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: `none`,
              }}
            >
              Go Home
            </Link>
            <Link
              to="/explore"
              style={{
                padding: `11px 24px`,
                borderRadius: 32,
                border: `1.5px solid #D4EDDA`,
                background: `#fff`,
                color: `#2D6A4F`,
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
