import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TERMS_SECTIONS } from "../lib/legal";
import { LEGAL_LAST_UPDATED, legalDetailsComplete, TO_BE_COMPLETED } from "../lib/legalConfig";
import {
  PRIVACY_SECTIONS,
  COOKIE_SECTIONS,
  COOKIE_TABLE,
  BETA_SECTIONS,
  BETA_TERMS_SECTION,
  REFUND_SECTION,
} from "../lib/legalContent";
import { openCookieSettings } from "../lib/consent";
import { BlurText, Reveal } from "../components/motion";

const IS_BETA = import.meta.env.VITE_BETA === "true";
const PRIVACY_SECTION = TERMS_SECTIONS.find(([title]) => /Privacy/.test(title));

// The full Privacy Policy, Cookie Policy and Beta Notice describe the beta setup
// (Supabase, Vercel). The full-backend build keeps its earlier placeholder texts
// until its own policies are written.
function pageFor(page) {
  switch (page) {
    case "terms":
      return {
        title: [`Terms & `, `Conditions`],
        intro: `Please read these terms carefully before using Nikha2.`,
        sections: [...TERMS_SECTIONS, ...(IS_BETA ? [BETA_TERMS_SECTION()] : []), REFUND_SECTION(IS_BETA)],
        dated: IS_BETA,
      };
    case "privacy":
      return IS_BETA
        ? { title: [`Privacy `, `Policy`], intro: `How Nikha2 collects, uses and protects your personal information.`, sections: PRIVACY_SECTIONS(), dated: true }
        : {
            title: [`Privacy `, `Policy`],
            intro: `How Nikha2 looks after your personal information.`,
            sections: PRIVACY_SECTION ? [PRIVACY_SECTION] : [],
            pending: `Our full Privacy Policy is being finalised and will be published here soon.`,
          };
    case "cookies":
      return IS_BETA
        ? { title: [`Cookie `, `Policy`], intro: `What Nikha2 stores in your browser, and your choices.`, sections: COOKIE_SECTIONS(), table: true, dated: true }
        : {
            title: [`Cookie `, `Policy`],
            intro: `How Nikha2 uses cookies and similar technologies.`,
            sections: [],
            pending: `Our Cookie Policy is being finalised and will be published here soon.`,
          };
    case "beta":
      return IS_BETA
        ? { title: [`Beta `, `Notice`], intro: `Early access beta – features may change. No real payments.`, sections: BETA_SECTIONS(), dated: true }
        : null;
    default:
      return null;
  }
}

const slug = (s) =>
  String(s)
    .replace(/^\d+\.\s*/, ``)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/^-|-$/g, ``);

// Renders text with "[to be completed]" markers highlighted so they can't be missed.
function Marked({ text }) {
  const parts = String(text).split(TO_BE_COMPLETED);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <mark style={{ background: `var(--warn-bg, #FFF4C2)`, color: `var(--warn-fg, #5C4500)`, padding: `0 4px`, borderRadius: 4 }}>
          {TO_BE_COMPLETED}
        </mark>
      )}
    </React.Fragment>
  ));
}

const bodyText = { fontSize: 14, lineHeight: 1.75, color: `var(--muted)`, margin: 0 };

function CookieTable() {
  const cell = { padding: `9px 10px`, borderBottom: `1px solid var(--line)`, textAlign: `left`, verticalAlign: `top` };
  return (
    <div style={{ overflowX: `auto` }}>
      <table style={{ width: `100%`, borderCollapse: `collapse`, fontSize: 13, color: `var(--muted)`, minWidth: 520 }}>
        <thead>
          <tr style={{ color: `var(--fg)` }}>
            {[`Name`, `Type`, `Purpose`, `Kept for`].map((h) => (
              <th key={h} scope="col" style={{ ...cell, fontWeight: 700 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(IS_BETA ? COOKIE_TABLE : []).map(([name, type, purpose, kept]) => (
            <tr key={name}>
              <td style={{ ...cell, fontFamily: `ui-monospace, monospace`, fontSize: 12, color: `var(--fg)` }}>{name}</td>
              <td style={cell}>{type}</td>
              <td style={cell}>{purpose}</td>
              <td style={cell}>{kept}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LegalPage({ page }) {
  const p = pageFor(page);
  const { hash } = useLocation();

  // Jump to a section such as /terms#refunds once the page has rendered.
  React.useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: `smooth`, block: `start` }), 60);
    return () => clearTimeout(t);
  }, [hash, page]);

  if (!p) return <NotFoundPage />;

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
          {p.dated && <p style={{ fontSize: 12.5, color: `var(--muted)`, marginTop: 8 }}>Last updated: {LEGAL_LAST_UPDATED}</p>}
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
          {p.dated && !legalDetailsComplete() && (
            <p role="note" style={{ ...bodyText, background: `var(--surface-2)`, border: `1px solid var(--line)`, borderRadius: 12, padding: `12px 16px` }}>
              Some company details on this page are still being completed. They are marked <Marked text={TO_BE_COMPLETED} />.
            </p>
          )}
          {p.sections.map(([title, body, id]) => (
            <div key={title} id={id || slug(title)} style={{ scrollMarginTop: 90 }}>
              <Reveal blur={false}>
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
                {(Array.isArray(body) ? body : [body]).map((para, i) => (
                  <p key={i} style={{ ...bodyText, marginTop: i ? 10 : 0 }}>
                    <Marked text={para} />
                  </p>
                ))}
              </Reveal>
            </div>
          ))}
          {p.table && (
            <>
              <CookieTable />
              <div>
                <button type="button" className="nk-btn nk-btn-primary" onClick={openCookieSettings} style={{ padding: `11px 22px`, borderRadius: 28, fontWeight: 700, fontSize: 13.5 }}>
                  Change cookie settings
                </button>
              </div>
            </>
          )}
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
          {IS_BETA && p.dated && (
            <p style={{ ...bodyText, fontSize: 13 }}>
              Related:{" "}
              {[
                [`/privacy`, `Privacy Policy`],
                [`/terms`, `Terms`],
                [`/cookies`, `Cookie Policy`],
                [`/beta`, `Beta Notice`],
              ]
                .filter(([to]) => to !== `/${page}`)
                .map(([to, label], i) => (
                  <React.Fragment key={to}>
                    {i > 0 && ` · `}
                    <Link to={to} style={{ color: `var(--emerald-700)`, fontWeight: 600 }}>
                      {label}
                    </Link>
                  </React.Fragment>
                ))}
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
