import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { FeatureCard } from "./FeaturesPage";
import { Aurora, Marquee, Reveal, SpotlightCard } from "../components/motion";

var _n = [
  {
    names: `Aisha & Rahman`,
    image: `/images/success/couple1.jpg`,
    quote: `We started with a simple chat and quickly realized how much we had in common. The private chat rooms helped us open up comfortably, and our first video call made everything feel real. Today, we're happily engaged.`,
    location: `Mumbai × Delhi`,
  },
  {
    names: `Priya & Arjun`,
    image: `/images/success/couple2.jpg`,
    quote: `What we loved most was the quality of matches. No endless swiping — just genuine people. The platform made it easy to connect and build something meaningful.`,
    location: `Bengaluru × Chennai`,
  },
  {
    names: `Simran & Harpreet`,
    image: `/images/success/couple3.jpg`,
    quote: `Having a space where we could connect within our community made all the difference. From chats to video calls, everything felt safe and natural.`,
    location: `Toronto × Vancouver`,
  },
  {
    names: `Fatima & Omar`,
    image: `/images/success/couple4.jpg`,
    quote: `The Trust Badge gave us confidence from the start. We knew we were talking to genuine people. Six months later, we're planning our wedding!`,
    location: `London × Birmingham`,
  },
  {
    names: `Anjali & Vikram`,
    image: `/images/success/couple5.jpg`,
    quote: `Video calling before meeting in person was a game-changer. It helped us feel connected even before our first date. Now we're married.`,
    location: `Dubai × Abu Dhabi`,
  },
  {
    names: `Meera & Karthik`,
    image: `/images/success/couple6.jpg`,
    quote: `The community-based matching introduced us to someone who truly shared our values and outlook on life. We're grateful for this platform.`,
    location: `Singapore × Chennai`,
  },
];

var vn = [
  {
    quote: `I found someone who truly understands me.`,
    avatar: `/images/success/user1.jpg`,
  },
  {
    quote: `Safe, simple, and meaningful.`,
    avatar: `/images/success/user2.jpg`,
  },
  {
    quote: `This platform changed my life.`,
    avatar: `/images/success/user3.jpg`,
  },
];

var yn = [
  {
    icon: `✅`,
    title: `Verified Profiles`,
    desc: `Trust Badge ensures authentic connections`,
  },
  {
    icon: `💬`,
    title: `Private Chat Rooms`,
    desc: `Safe spaces for real conversations`,
  },
  {
    icon: `📹`,
    title: `Video Calling`,
    desc: `Connect beyond text with face-to-face`,
  },
  {
    icon: `🏘️`,
    title: `Community Matching`,
    desc: `Find matches who share your values`,
  },
];

// Shows the photo when the file exists in public/; otherwise shows the placeholder.
function PhotoOrPlaceholder({ src, alt, placeholder, style }) {
  let [failed, setFailed] = React.useState(false);
  if (failed || !src) return placeholder;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
        display: `block`,
        ...style,
      }}
    />
  );
}

function StoryCard({ story: e }) {
  return (
    <div
      style={{
        background: `var(--surface)`,
        border: `1px solid var(--line)`,
        borderRadius: 24,
        overflow: `hidden`,
        flexShrink: 0,
        width: `min(384px, calc(100vw - 56px))`,
        scrollSnapAlign: `start`,
        transition: `all 0.4s ease`,
        cursor: `default`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.borderColor = `var(--emerald-500)`),
          (e.currentTarget.style.boxShadow = `0 20px 56px color-mix(in srgb, var(--emerald-700) 14%, transparent)`),
          (e.currentTarget.style.transform = `translateY(-6px)`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.borderColor = `var(--line)`),
          (e.currentTarget.style.boxShadow = `none`),
          (e.currentTarget.style.transform = `none`));
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, var(--surface-2) 0%, var(--mint) 100%)`,
          height: 220,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          flexDirection: `column`,
          gap: 6,
        }}
      >
        <PhotoOrPlaceholder
          src={e.image}
          alt={e.names}
          placeholder={<div style={{ fontSize: 48 }}>📸</div>}
        />
      </div>
      <div style={{ padding: `20px 22px 24px` }}>
        <div
          style={{
            fontFamily: `var(--font-display)`,
            fontSize: 23,
            fontWeight: 700,
            color: `var(--fg)`,
            marginBottom: 6,
          }}
        >
          {e.names}
        </div>
        <div
          style={{
            fontFamily: `var(--font-ui)`,
            fontSize: 14,
            color: `var(--emerald-500)`,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {e.location}
        </div>
        <p
          style={{
            fontFamily: `var(--font-display)`,
            fontSize: 17,
            color: `var(--muted)`,
            fontStyle: `italic`,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          "{e.quote}"
        </p>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial: e, ref, className = ``, style }) {
  return (
    <SpotlightCard
      ref={ref}
      className={className}
      style={{
        background: `color-mix(in srgb, var(--surface) 65%, transparent)`,
        border: `1px solid var(--line)`,
        borderRadius: 20,
        padding: `28px 22px`,
        textAlign: `center`,
        backdropFilter: `blur(10px)`,
        cursor: `default`,
        ...style,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: `50%`,
          background: `linear-gradient(160deg, var(--surface-2), var(--mint))`,
          margin: `0 auto 16px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          fontSize: 24,
          border: `3px solid var(--surface)`,
          boxShadow: `0 4px 14px color-mix(in srgb, var(--emerald-700) 15%, transparent)`,
          overflow: `hidden`,
        }}
      >
        <PhotoOrPlaceholder src={e.avatar} alt="" placeholder="👤" />
      </div>
      <p
        style={{
          fontFamily: `var(--font-display)`,
          fontSize: 15,
          color: `var(--fg)`,
          fontStyle: `italic`,
          lineHeight: 1.65,
          margin: `0 0 12px`,
        }}
      >
        "{e.quote}"
      </p>
    </SpotlightCard>
  );
}

function SuccessStoriesPage() {
  let e = (0, React.useRef)(null),
    t = useNavigate(),
    n = null;
  return (
    <div
      style={{
        fontFamily: `var(--font-ui)`,
        background: `var(--bg)`,
        minHeight: `100vh`,
        paddingTop: 68,
      }}
    >
      <Navbar />
      <style>
        {
          "\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, var(--emerald-700), var(--emerald-500), var(--emerald-500), var(--mint), var(--emerald-700));\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        @keyframes float {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-14px); }\n        }\n\n        @keyframes heroBtnFloat {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-6px); }\n        }\n\n        .hero-btn-primary {\n          background: linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%);\n          color: #fff; border: none; padding: 14px 36px;\n          border-radius: 32px; font-family: var(--font-ui);\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px color-mix(in srgb, var(--shadow) 35%, transparent);\n          transition: box-shadow 0.22s;\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n          text-decoration: none; display: inline-block;\n        }\n        .hero-btn-primary:hover { box-shadow: 0 10px 32px color-mix(in srgb, var(--shadow) 45%, transparent); }\n\n        .story-scroll {\n          display: flex;\n          gap: 20px;\n          overflow-x: auto;\n          padding: 8px 8px 20px;\n          scroll-snap-type: x mandatory;\n        }\n        .story-scroll::-webkit-scrollbar { height: 4px; }\n        .story-scroll::-webkit-scrollbar-track { background: var(--surface-2); border-radius: 10px; }\n        .story-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg, var(--emerald-700), var(--emerald-500)); border-radius: 10px; }\n\n        .features-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n          gap: 18px;\n        }\n\n        .testimonials-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n          gap: 20px;\n        }\n\n        @media (max-width: 768px) {\n          .features-grid    { grid-template-columns: repeat(2, 1fr); }\n          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }\n        }\n        @media (max-width: 480px) {\n          .features-grid    { grid-template-columns: 1fr; }\n          .testimonials-grid { grid-template-columns: 1fr; }\n        }\n      "
        }
      </style>
      <section
        style={{
          position: `relative`,
          padding: `72px 40px 80px`,
          textAlign: `center`,
          overflow: `hidden`,
        }}
      >
        <Aurora intensity={0.5} />
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
              fontFamily: `var(--font-ui)`,
              fontSize: 12,
              color: `var(--emerald-700)`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 16,
              opacity: 0.8,
            }}
          >
            💖 Success Stories
          </p>
          <h1
            style={{
              fontFamily: `var(--font-display)`,
              fontSize: `clamp(28px, 5vw, 54px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              color: `var(--fg)`,
              lineHeight: 1.15,
              marginBottom: 18,
            }}
          >
            Real Stories. Real Connections.
            <br />
            <span className="nk-shiny">Real Love.</span>
          </h1>
          <p
            style={{
              fontFamily: `var(--font-ui)`,
              fontSize: 16,
              color: `var(--muted)`,
              lineHeight: 1.7,
              maxWidth: 520,
              margin: `0 auto 40px`,
            }}
          >
            Thousands have found meaningful relationships on our platform. Here
            are some of their journeys.
          </p>
          <Link to="/how-it-works" className="nk-btn nk-btn-primary hero-btn-primary">
            Get Started
          </Link>
        </div>
      </section>
      <section
        style={{ padding: `52px 40px`, maxWidth: 1200, margin: `0 auto` }}
      >
        <div style={{ textAlign: `center`, marginBottom: 40 }}>
          <p
            style={{
              fontFamily: `var(--font-ui)`,
              fontSize: 17,
              color: `var(--emerald-700)`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 14,
              opacity: 0.8,
              fontWeight: 700,
            }}
          >
            💬 Testimonials
          </p>
          <h2
            style={{
              fontFamily: `var(--font-display)`,
              fontSize: `clamp(30px, 4.5vw, 50px)`,
              fontWeight: 700,
              color: `var(--fg)`,
              letterSpacing: `-0.02em`,
            }}
          >
            {"Love "}
            <span className="nk-shiny">Stories</span>
            {" That Inspire"}
          </h2>
        </div>
        <Marquee speed={40} gap={20} style={{ padding: `8px 0 20px` }}>
          {_n.map((e, t) => (
            <StoryCard key={t} story={e} />
          ))}
        </Marquee>
      </section>
      <section
        style={{
          background: `linear-gradient(160deg, var(--surface-2) 0%, var(--surface-2) 100%)`,
          borderTop: `1px solid var(--line)`,
          padding: `60px 40px`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: `0 auto` }}>
          <div style={{ textAlign: `center`, marginBottom: 40 }}>
            <p
              style={{
                fontFamily: `var(--font-ui)`,
                fontSize: 12,
                color: `var(--emerald-700)`,
                letterSpacing: `0.3em`,
                textTransform: `uppercase`,
                marginBottom: 10,
                opacity: 0.8,
              }}
            >
              🌟 Why These Stories Matter
            </p>
            <h2
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: `clamp(22px, 3vw, 34px)`,
                fontWeight: 700,
                color: `var(--fg)`,
                letterSpacing: `-0.02em`,
              }}
            >
              {"What Makes "}
              <span className="nk-shiny">Connections</span>
              {" Real"}
            </h2>
          </div>
          <Reveal stagger className="features-grid">
            {yn.map((e, t) => (
              <FeatureCard
                key={t}
                icon={e.icon}
                title={e.title}
                desc={e.desc}
              />
            ))}
          </Reveal>
        </div>
      </section>
      <section
        style={{ padding: `60px 40px`, maxWidth: 1100, margin: `0 auto` }}
      >
        <div style={{ textAlign: `center`, marginBottom: 40 }}>
          <p
            style={{
              fontFamily: `var(--font-ui)`,
              fontSize: 12,
              color: `var(--emerald-700)`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 10,
              opacity: 0.8,
            }}
          >
            💬 User Testimonials
          </p>
          <h2
            style={{
              fontFamily: `var(--font-display)`,
              fontSize: `clamp(22px, 3vw, 34px)`,
              fontWeight: 700,
              color: `var(--fg)`,
              letterSpacing: `-0.02em`,
            }}
          >
            {"What Our "}
            <span className="nk-shiny">Members</span>
            {" Say"}
          </h2>
        </div>
        <Reveal stagger className="testimonials-grid">
          {vn.map((e, t) => (
            <TestimonialCard key={t} testimonial={e} />
          ))}
        </Reveal>
      </section>
      <section
        style={{
          background: `linear-gradient(160deg, var(--surface-2) 0%, var(--surface-2) 100%)`,
          padding: `64px 40px 72px`,
          borderTop: `1px solid var(--line)`,
        }}
      >
        <div style={{ maxWidth: 720, margin: `0 auto`, textAlign: `center` }}>
          <div
            style={{
              fontSize: 13,
              color: `var(--emerald-700)`,
              letterSpacing: 4,
              marginBottom: 12,
              opacity: 0.6,
            }}
          >
            ⌒ ☽ ⌒
          </div>
          <h2
            style={{
              fontFamily: `var(--font-display)`,
              fontSize: `clamp(26px, 4vw, 42px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              color: `var(--fg)`,
              marginBottom: 8,
            }}
          >
            Your Story Could Be <span className="nk-shiny">Next</span>
          </h2>
          <p
            style={{
              fontFamily: `var(--font-ui)`,
              fontSize: 16,
              color: `var(--muted)`,
              marginBottom: 36,
              fontStyle: `italic`,
            }}
          >
            Join today and start your journey toward a meaningful connection.
          </p>
          <div
            style={{
              display: `flex`,
              gap: 14,
              justifyContent: `center`,
              flexWrap: `wrap`,
            }}
          >
            <Link to="/how-it-works" className="nk-btn nk-btn-primary hero-btn-primary">
              Get Started →
            </Link>
            <button className="nk-btn nk-btn-soft"
              onClick={() => t(`/explore`)}
              style={{
                background: `color-mix(in srgb, var(--surface) 92%, transparent)`,
                color: `var(--emerald-700)`,
                border: `2px solid var(--emerald-500)`,
                padding: `13px 32px`,
                borderRadius: 32,
                fontFamily: `var(--font-ui)`,
                fontSize: 15,
                fontWeight: 700,
                cursor: `pointer`,
                letterSpacing: `0.04em`,
                transition: `all 0.22s`,
                backdropFilter: `blur(6px)`,
              }}
              onMouseEnter={(e) => {
                ((e.currentTarget.style.background = `var(--surface)`),
                  (e.currentTarget.style.boxShadow = `0 6px 20px color-mix(in srgb, var(--emerald-700) 20%, transparent)`));
              }}
              onMouseLeave={(e) => {
                ((e.currentTarget.style.background = `color-mix(in srgb, var(--surface) 92%, transparent)`),
                  (e.currentTarget.style.boxShadow = `none`));
              }}
            >
              🔍 Browse Members
            </button>
          </div>
        </div>
      </section>
      <div
        style={{
          background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 50%, var(--emerald-700) 100%)`,
          padding: `18px 40px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: 10,
        }}
      >
        <span
          style={{
            color: `var(--mint)`,
            fontSize: 13,
            letterSpacing: `0.18em`,
            fontFamily: `var(--font-ui)`,
            fontWeight: 600,
            textTransform: `uppercase`,
          }}
        >
          Because everyone deserves a second chance at happiness.
        </span>
        <span style={{ color: `var(--emerald-500)`, fontSize: 16 }}>♥</span>
      </div>
      <footer
        style={{
          background: `var(--deep)`,
          color: `var(--emerald-500)`,
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
            marginBottom: 10,
          }}
        >
          Nikha<span style={{ color: `var(--emerald-500)` }}>2</span>{" "}
          <span style={{ color: `var(--emerald-700)` }}>♡</span>
        </div>
        <p
          style={{
            margin: `0 0 14px`,
            fontSize: 13,
            opacity: 0.5,
            fontFamily: `var(--font-ui)`,
          }}
        >
          © 2026 Nikha2 — The Second Chance. All rights reserved.
        </p>
        <div style={{ display: `flex`, justifyContent: `center`, gap: 24 }}>
          {[`Terms`, `Privacy`, `Cookies`].map((e) => (
            <Link
              key={e}
              to={`/${e.toLowerCase()}`}
              style={{
                fontSize: 12,
                color: `var(--emerald-500)`,
                opacity: 0.6,
                textDecoration: `none`,
                fontFamily: `var(--font-ui)`,
                transition: `opacity 0.2s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = `1`)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = `0.6`)}
            >
              {e}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}

export { SuccessStoriesPage };
