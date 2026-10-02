import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

var mn = [
  {
    icon: `🛡️`,
    title: `Trusted Profiles`,
    desc: `Every member is verified, helping you connect with greater confidence. Trust Badges make it easier to identify genuine people with sincere intentions.`,
    accent: `#40916C`,
    tag: `Trusted`,
  },
  {
    icon: `💚`,
    title: `Compatible Matches`,
    desc: `Find meaningful matches based on your values, traditions, and relationship goals. We focus on true compatibility not just proximity.`,
    accent: `#52B788`,
    tag: `Compatible`,
  },
  {
    icon: `🔒`,
    title: `Privacy Assured`,
    desc: `Your privacy comes first. Your conversations and profile details are protected by design, so you can connect with confidence knowing your information stays yours.`,
    accent: `#74C69D`,
    tag: `Privacy`,
  },
  {
    icon: `🤝`,
    title: `Respect & Support`,
    desc: `A respectful, supportive community where your boundaries are valued. Connect comfortably with mindful interactions and thoughtful moderation designed to create a safe, welcoming experience.`,
    accent: `#2D6A4F`,
    tag: `Support`,
  },
  {
    icon: `✨`,
    title: `Quality Connections`,
    desc: `Spend less time searching and more time building meaningful connections. Find people who align with your values and intentions, and let conversations develop naturally at a pace that feels right.`,
    accent: `#52B788`,
    tag: `Quality`,
  },
];

function WayDifferentSection() {
  let [e, t] = (0, React.useState)(null);
  return (
    <section
      style={{
        background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
        borderTop: `1px solid #D4EDDA`,
        padding: `40px 40px`,
        minHeight: `100vh`,
        display: `flex`,
        alignItems: `center`,
      }}
    >
      <style>
        {
          "\n        .zebra-container {\n          border-radius: 20px;\n          overflow: hidden;\n          border: 1px solid #D4EDDA;\n          box-shadow: 0 8px 32px rgba(45,106,79,0.08);\n          width: 100%;\n        }\n        .zebra-row {\n          display: flex;\n          align-items: center;\n          gap: 24px;\n          padding: 22px 36px;\n          transition: background 0.25s ease;\n          cursor: default;\n        }\n        .zebra-row:not(:last-child) { border-bottom: 1px solid #E8F5EE; }\n        .zebra-icon {\n          width: 44px; height: 44px; border-radius: 12px;\n          display: flex; align-items: center; justify-content: center;\n          font-size: 20px; flex-shrink: 0;\n          transition: all 0.25s ease;\n        }\n        .zebra-title { width: 180px; flex-shrink: 0; }\n        .zebra-divider {\n          width: 1.5px; align-self: stretch;\n          flex-shrink: 0; transition: background 0.25s ease;\n        }\n        .zebra-desc {\n          font-family: 'DM Sans', sans-serif;\n          font-size: 13px; color: #3D6B55;\n          line-height: 1.65; margin: 0; flex: 1;\n        }\n\n        @media (max-width: 900px) {\n          .zebra-section { padding: 32px 24px !important; }\n          .zebra-row { padding: 18px 24px !important; gap: 16px !important; }\n          .zebra-title { width: 140px !important; }\n        }\n\n        @media (max-width: 600px) {\n          .zebra-section { padding: 24px 16px !important; min-height: unset !important; }\n          .zebra-container { border-radius: 14px !important; }\n          .zebra-row {\n            flex-direction: column !important;\n            align-items: flex-start !important;\n            padding: 18px 16px !important;\n            gap: 10px !important;\n          }\n          .zebra-top-row {\n            display: flex !important;\n            align-items: center !important;\n            gap: 12px !important;\n            width: 100% !important;\n          }\n          .zebra-divider { display: none !important; }\n          .zebra-title { width: auto !important; flex: 1 !important; }\n          .zebra-icon { width: 38px !important; height: 38px !important; font-size: 18px !important; }\n          .zebra-desc { font-size: 12.5px !important; width: 100% !important; }\n        }\n      "
        }
      </style>
      <div
        style={{ maxWidth: 1100, margin: `0 auto`, width: `100%` }}
        className="zebra-section"
      >
        <div style={{ textAlign: `center`, marginBottom: 32 }}>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 11,
              color: `#40916C`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 8,
              opacity: 0.8,
            }}
          >
            The Nikha2 Way
          </p>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(20px, 2.5vw, 30px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.02em`,
            }}
          >
            {"What Makes Us "}
            <span className="green-text">Different</span>
          </h2>
        </div>
        <div className="zebra-container">
          {mn.map((n, r) => (
            <div
              key={r}
              className="zebra-row"
              onMouseEnter={() => t(r)}
              onMouseLeave={() => t(null)}
              style={{
                background:
                  e === r
                    ? `linear-gradient(90deg, ${n.accent}14, ${n.accent}06)`
                    : r % 2 == 0
                      ? `#fff`
                      : `#F8FAF5`,
              }}
            >
              <div className="zebra-top-row" style={{ display: `contents` }}>
                <div
                  className="zebra-icon"
                  style={{
                    background:
                      e === r
                        ? `linear-gradient(135deg, ${n.accent}28, ${n.accent}48)`
                        : r % 2 == 0
                          ? `#F0FAF4`
                          : `#fff`,
                    border: `1.5px solid ${e === r ? n.accent + `60` : `#D4EDDA`}`,
                  }}
                >
                  {n.icon}
                </div>
                <div className="zebra-title">
                  <span
                    style={{
                      fontFamily: `'DM Sans', sans-serif`,
                      fontSize: 9,
                      fontWeight: 700,
                      color: e === r ? n.accent : `#74C69D`,
                      letterSpacing: `0.18em`,
                      textTransform: `uppercase`,
                      display: `block`,
                      marginBottom: 4,
                      transition: `color 0.25s ease`,
                    }}
                  >
                    {n.tag}
                  </span>
                  <h4
                    style={{
                      fontFamily: `'Playfair Display', serif`,
                      fontSize: `clamp(13px, 1.3vw, 16px)`,
                      fontWeight: 700,
                      color: `#1B3A4B`,
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {n.title}
                  </h4>
                </div>
              </div>
              <div
                className="zebra-divider"
                style={{
                  background: e === r ? n.accent + `50` : `#E8F5EE`,
                }}
              />
              <p className="zebra-desc">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesPage() {
  let e = useNavigate();
  return (
    <div
      style={{
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        minHeight: `100vh`,
        paddingTop: 68,
      }}
    >
      <Navbar />
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        @keyframes float {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-14px); }\n        }\n\n        @keyframes pulse {\n          0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.7); }\n          50%       { box-shadow: 0 0 16px rgba(34,197,94,0.35); }\n        }\n\n        .hero-btn-primary {\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff; border: none; padding: 14px 36px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px rgba(27,58,75,0.35);\n          transition: all 0.22s;\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n        }\n        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(27,58,75,0.45); }\n\n        .hero-btn-outline {\n          background: rgba(255,255,255,0.92); color: #2D6A4F;\n          border: 2px solid #74C69D; padding: 13px 32px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em; transition: all 0.22s;\n          backdrop-filter: blur(6px);\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n        }\n        .hero-btn-outline:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(45,106,79,0.2); }\n\n        @keyframes heroBtnFloat {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-6px); }\n        }\n      "
        }
      </style>
      <section
        style={{
          position: `relative`,
          padding: `88px 40px 96px`,
          textAlign: `center`,
          overflow: `hidden`,
        }}
      >
        <div
          style={{
            position: `absolute`,
            top: 40,
            left: `8%`,
            width: 280,
            height: 280,
            borderRadius: `50%`,
            background: `rgba(183,228,199,0.35)`,
            filter: `blur(60px)`,
            animation: `float 6s ease-in-out infinite`,
            pointerEvents: `none`,
          }}
        />
        <div
          style={{
            position: `absolute`,
            bottom: 20,
            right: `6%`,
            width: 320,
            height: 320,
            borderRadius: `50%`,
            background: `rgba(116,198,157,0.2)`,
            filter: `blur(70px)`,
            animation: `float 6s ease-in-out infinite`,
            animationDelay: `1s`,
            pointerEvents: `none`,
          }}
        />
        <div
          style={{
            position: `relative`,
            zIndex: 1,
            maxWidth: 760,
            margin: `0 auto`,
          }}
        >
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 12,
              color: `#40916C`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 16,
              opacity: 0.8,
            }}
          >
            ✦ Platform Features
          </p>
          <h1
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(28px, 5vw, 54px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              color: `#1B3A4B`,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Built for <span className="green-text">Meaningful</span>
            {" Connections"}
          </h1>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 16,
              color: `#3D6B55`,
              lineHeight: 1.7,
              maxWidth: 520,
              margin: `0 auto 40px`,
            }}
          >
            Every feature is thoughtfully designed to help you connect with
            someone who truly shares your values, respects your culture, and
            envisions a future aligned with yours.
          </p>
          <div
            style={{
              display: `flex`,
              gap: 14,
              justifyContent: `center`,
              flexWrap: `wrap`,
            }}
          >
            <button className="hero-btn-primary" onClick={() => e(`/explore`)}>
              🔍 Explore People Online
            </button>
            <button className="hero-btn-outline" onClick={() => e(`/signup`)}>
              Log In / Sign Up
            </button>
          </div>
        </div>
      </section>
      <div
        style={{
          background: `#fff`,
          borderTop: `1px solid #E8F5EE`,
          borderBottom: `1px solid #E8F5EE`,
          padding: `36px 40px`,
        }}
      >
        <p
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: `clamp(15px, 2vw, 19px)`,
            color: `#3D6B55`,
            fontStyle: `italic`,
            textAlign: `center`,
            maxWidth: 860,
            margin: `0 auto`,
            lineHeight: 1.7,
            textWrap: `pretty`,
          }}
        >
          "Shared beliefs and culture create meaningful connections. Discover
          communities that reflect your identity and connect with people who
          share your values, traditions, and{" "}vision."
        </p>
      </div>
      <WayDifferentSection />
      <section
        style={{
          padding: `80px 40px`,
          textAlign: `center`,
          background: `#fff`,
        }}
      >
        <div style={{ maxWidth: 780, margin: `0 auto` }}>
          <div
            style={{
              fontSize: 13,
              color: `#40916C`,
              letterSpacing: 4,
              marginBottom: 14,
              opacity: 0.6,
            }}
          >
            ⊡ ☯ ⊡
          </div>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(22px, 3.5vw, 38px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.02em`,
              marginBottom: 16,
            }}
          >
            Every Feature, Designed for{" "}
            <span className="green-text">Your Journey</span>
          </h2>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 15,
              color: `#3D6B55`,
              lineHeight: 1.75,
              maxWidth: 560,
              margin: `0 auto 52px`,
            }}
          >
            Whether you're just starting out or ready to take the next step —
            our tools adapt to where you are, not the other way around.
          </p>
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
              gap: 20,
              maxWidth: 720,
              margin: `0 auto`,
            }}
          >
            {[
              {
                icon: `🔒`,
                label: `End-to-End Privacy`,
                sub: `Your data stays yours, always.`,
              },
              {
                icon: `⚡`,
                label: `Smart Matching`,
                sub: `Relevant profiles, not just nearby ones.`,
              },
              {
                icon: `🤝`,
                label: `Real Connections`,
                sub: `Built on shared values, not swipes.`,
              },
            ].map((e) => (
              <div
                key={e.label}
                style={{
                  background: `linear-gradient(160deg, #F0FAF4, #E8F5EE)`,
                  border: `1px solid #D4EDDA`,
                  borderRadius: 20,
                  padding: `28px 24px`,
                  textAlign: `center`,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{e.icon}</div>
                <div
                  style={{
                    fontFamily: `'Playfair Display', serif`,
                    fontSize: 15,
                    fontWeight: 700,
                    color: `#1B3A4B`,
                    marginBottom: 6,
                  }}
                >
                  {e.label}
                </div>
                <div
                  style={{
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 13,
                    color: `#3D6B55`,
                    lineHeight: 1.6,
                  }}
                >
                  {e.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        style={{
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          padding: `80px 40px 88px`,
          borderTop: `1px solid #D4EDDA`,
        }}
      >
        <div style={{ maxWidth: 720, margin: `0 auto`, textAlign: `center` }}>
          <div
            style={{
              fontSize: 13,
              color: `#40916C`,
              letterSpacing: 4,
              marginBottom: 12,
              opacity: 0.6,
            }}
          >
            ⊡ ☯ ⊡
          </div>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(26px, 4vw, 42px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              marginBottom: 12,
              color: `#1B3A4B`,
            }}
          >
            Ready to Find <span className="green-text">Your Person?</span>
          </h2>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 16,
              color: `#3D6B55`,
              marginBottom: 40,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: `0 auto 40px`,
            }}
          >
            Thousands of verified members are already using these features to
            build real, lasting relationships. Your story starts here.
          </p>
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                gap: 8,
                background: `#fff`,
                border: `1px solid #B7E4C7`,
                borderRadius: 24,
                padding: `9px 22px`,
                boxShadow: `0 3px 12px rgba(45,106,79,0.1)`,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: `50%`,
                  background: `#22C55E`,
                  display: `inline-block`,
                  boxShadow: `0 0 7px rgba(34,197,94,0.65)`,
                  animation: `pulse 2s infinite`,
                }}
              />
              <span
                style={{
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 13,
                  fontWeight: 700,
                  color: `#2D6A4F`,
                }}
              >
                12 Online Members Right Now
              </span>
            </div>
          </div>
          <div
            style={{
              display: `flex`,
              gap: 14,
              justifyContent: `center`,
              flexWrap: `wrap`,
            }}
          >
            <button
              className="hero-btn-primary"
              onClick={() => e(`/how-it-works`)}
            >
              Get Started →
            </button>
            <button className="hero-btn-outline" onClick={() => e(`/explore`)}>
              🔍 Browse Members
            </button>
          </div>
        </div>
      </section>
      <div
        style={{
          background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 50%, #40916C 100%)`,
          padding: `18px 40px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: 10,
        }}
      >
        <span
          style={{
            color: `#B7E4C7`,
            fontSize: 13,
            letterSpacing: `0.18em`,
            fontFamily: `'DM Sans', sans-serif`,
            fontWeight: 600,
            textTransform: `uppercase`,
          }}
        >
          Because everyone deserves a second chance at happiness.
        </span>
        <span style={{ color: `#74C69D`, fontSize: 16 }}>♥</span>
      </div>
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
            marginBottom: 10,
          }}
        >
          Nikha<span style={{ color: `#74C69D` }}>2</span>{" "}
          <span style={{ color: `#40916C` }}>♥</span>
        </div>
        <p
          style={{
            margin: `0 0 14px`,
            fontSize: 13,
            opacity: 0.5,
            fontFamily: `'DM Sans', sans-serif`,
          }}
        >
          © 2026 Nikha2 — The Second Chance. All rights reserved.
        </p>
        <div style={{ display: `flex`, justifyContent: `center`, gap: 24 }}>
          {[`Terms`, `Privacy`, `Cookies`].map((e) => (
            <a
              key={e}
              href="#"
              style={{
                fontSize: 12,
                color: `#74C69D`,
                opacity: 0.6,
                textDecoration: `none`,
                fontFamily: `'DM Sans', sans-serif`,
                transition: `opacity 0.2s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = `1`)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = `0.6`)}
            >
              {e}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: e, title: t, desc: n }) {
  return (
    <div
      style={{
        background: `rgba(255,255,255,0.65)`,
        border: `1px solid #E8F5EE`,
        borderRadius: 20,
        padding: `28px 20px`,
        textAlign: `center`,
        backdropFilter: `blur(10px)`,
        transition: `all 0.3s ease`,
        cursor: `default`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.background = `rgba(255,255,255,0.95)`),
          (e.currentTarget.style.borderColor = `#74C69D`),
          (e.currentTarget.style.transform = `translateY(-4px)`),
          (e.currentTarget.style.boxShadow = `0 12px 36px rgba(45,106,79,0.12)`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.background = `rgba(255,255,255,0.65)`),
          (e.currentTarget.style.borderColor = `#E8F5EE`),
          (e.currentTarget.style.transform = `none`),
          (e.currentTarget.style.boxShadow = `none`));
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{e}</div>
      <div
        style={{
          fontFamily: `'Playfair Display', serif`,
          fontSize: 14,
          fontWeight: 700,
          color: `#1B3A4B`,
          marginBottom: 6,
        }}
      >
        {t}
      </div>
      <div
        style={{
          fontFamily: `'DM Sans', sans-serif`,
          fontSize: 12,
          color: `#74C69D`,
          lineHeight: 1.55,
        }}
      >
        {n}
      </div>
    </div>
  );
}

export { FeatureCard, FeaturesPage };
