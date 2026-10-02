import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { FeatureCard } from "./FeaturesPage";

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

function StoryCard({ story: e }) {
  return (
    <div
      style={{
        background: `#fff`,
        border: `1px solid #E8F5EE`,
        borderRadius: 24,
        overflow: `hidden`,
        flexShrink: 0,
        width: 384,
        scrollSnapAlign: `start`,
        transition: `all 0.4s ease`,
        cursor: `default`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.borderColor = `#74C69D`),
          (e.currentTarget.style.boxShadow = `0 20px 56px rgba(45,106,79,0.14)`),
          (e.currentTarget.style.transform = `translateY(-6px)`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.borderColor = `#E8F5EE`),
          (e.currentTarget.style.boxShadow = `none`),
          (e.currentTarget.style.transform = `none`));
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, #D4EDDA 0%, #B7E4C7 100%)`,
          height: 220,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          flexDirection: `column`,
          gap: 6,
        }}
      >
        <div style={{ fontSize: 48 }}>📸</div>
        <p
          style={{
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: 11,
            color: `#52B788`,
          }}
        >
          {e.image}
        </p>
      </div>
      <div style={{ padding: `20px 22px 24px` }}>
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 23,
            fontWeight: 700,
            color: `#1B3A4B`,
            marginBottom: 6,
          }}
        >
          {e.names}
        </div>
        <div
          style={{
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: 14,
            color: `#74C69D`,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {e.location}
        </div>
        <p
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 17,
            color: `#3D6B55`,
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

function TestimonialCard({ testimonial: e }) {
  return (
    <div
      style={{
        background: `rgba(255,255,255,0.65)`,
        border: `1px solid #E8F5EE`,
        borderRadius: 20,
        padding: `28px 22px`,
        textAlign: `center`,
        backdropFilter: `blur(10px)`,
        transition: `all 0.35s ease`,
        cursor: `default`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.transform = `translateY(-6px)`),
          (e.currentTarget.style.boxShadow = `0 20px 48px rgba(45,106,79,0.12)`),
          (e.currentTarget.style.borderColor = `#74C69D`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.transform = `none`),
          (e.currentTarget.style.boxShadow = `none`),
          (e.currentTarget.style.borderColor = `#E8F5EE`));
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: `50%`,
          background: `linear-gradient(160deg, #D4EDDA, #B7E4C7)`,
          margin: `0 auto 16px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          fontSize: 24,
          border: `3px solid #fff`,
          boxShadow: `0 4px 14px rgba(45,106,79,0.15)`,
        }}
      >
        👤
      </div>
      <p
        style={{
          fontFamily: `'Playfair Display', serif`,
          fontSize: 15,
          color: `#1B3A4B`,
          fontStyle: `italic`,
          lineHeight: 1.65,
          margin: `0 0 12px`,
        }}
      >
        "{e.quote}"
      </p>
      <p
        style={{
          fontFamily: `'DM Sans', sans-serif`,
          fontSize: 10,
          color: `#74C69D`,
          opacity: 0.7,
        }}
      >
        {e.avatar}
      </p>
    </div>
  );
}

function SuccessStoriesPage() {
  let e = (0, React.useRef)(null),
    t = useNavigate(),
    n = (t) => {
      e.current && e.current.scrollBy({ left: t * 400, behavior: `smooth` });
    };
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
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        @keyframes float {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-14px); }\n        }\n\n        @keyframes heroBtnFloat {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-6px); }\n        }\n\n        .hero-btn-primary {\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff; border: none; padding: 14px 36px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px rgba(27,58,75,0.35);\n          transition: box-shadow 0.22s;\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n          text-decoration: none; display: inline-block;\n        }\n        .hero-btn-primary:hover { box-shadow: 0 10px 32px rgba(27,58,75,0.45); }\n\n        .story-scroll {\n          display: flex;\n          gap: 20px;\n          overflow-x: auto;\n          padding: 8px 8px 20px;\n          scroll-snap-type: x mandatory;\n        }\n        .story-scroll::-webkit-scrollbar { height: 4px; }\n        .story-scroll::-webkit-scrollbar-track { background: #E8F5EE; border-radius: 10px; }\n        .story-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg, #40916C, #74C69D); border-radius: 10px; }\n\n        .features-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n          gap: 18px;\n        }\n\n        .testimonials-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n          gap: 20px;\n        }\n\n        @media (max-width: 768px) {\n          .features-grid    { grid-template-columns: repeat(2, 1fr); }\n          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }\n        }\n        @media (max-width: 480px) {\n          .features-grid    { grid-template-columns: 1fr; }\n          .testimonials-grid { grid-template-columns: 1fr; }\n        }\n      "
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
            💖 Success Stories
          </p>
          <h1
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(28px, 5vw, 54px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              color: `#1B3A4B`,
              lineHeight: 1.15,
              marginBottom: 18,
            }}
          >
            Real Stories. Real Connections.
            <br />
            <span className="green-text">Real Love.</span>
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
            Thousands have found meaningful relationships on our platform. Here
            are some of their journeys.
          </p>
          <Link to="/how-it-works" className="hero-btn-primary">
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
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 17,
              color: `#40916C`,
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
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(30px, 4.5vw, 50px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.02em`,
            }}
          >
            {"Love "}
            <span className="green-text">Stories</span>
            {" That Inspire"}
          </h2>
        </div>
        <div style={{ position: `relative` }}>
          <button
            onClick={() => n(-1)}
            style={{
              position: `absolute`,
              left: -20,
              top: `50%`,
              transform: `translateY(-50%)`,
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: `50%`,
              background: `#fff`,
              border: `1.5px solid #B7E4C7`,
              color: `#2D6A4F`,
              fontSize: 16,
              cursor: `pointer`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              boxShadow: `0 4px 16px rgba(45,106,79,0.15)`,
              transition: `all 0.2s`,
            }}
            onMouseEnter={(e) => {
              ((e.currentTarget.style.background = `#F0FAF4`),
                (e.currentTarget.style.borderColor = `#40916C`));
            }}
            onMouseLeave={(e) => {
              ((e.currentTarget.style.background = `#fff`),
                (e.currentTarget.style.borderColor = `#B7E4C7`));
            }}
          >
            ←
          </button>
          <button
            onClick={() => n(1)}
            style={{
              position: `absolute`,
              right: -20,
              top: `50%`,
              transform: `translateY(-50%)`,
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: `50%`,
              background: `#fff`,
              border: `1.5px solid #B7E4C7`,
              color: `#2D6A4F`,
              fontSize: 16,
              cursor: `pointer`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              boxShadow: `0 4px 16px rgba(45,106,79,0.15)`,
              transition: `all 0.2s`,
            }}
            onMouseEnter={(e) => {
              ((e.currentTarget.style.background = `#F0FAF4`),
                (e.currentTarget.style.borderColor = `#40916C`));
            }}
            onMouseLeave={(e) => {
              ((e.currentTarget.style.background = `#fff`),
                (e.currentTarget.style.borderColor = `#B7E4C7`));
            }}
          >
            →
          </button>
          <div ref={e} className="story-scroll">
            {_n.map((e, t) => (
              <StoryCard key={t} story={e} />
            ))}
          </div>
        </div>
      </section>
      <section
        style={{
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          borderTop: `1px solid #D4EDDA`,
          padding: `60px 40px`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: `0 auto` }}>
          <div style={{ textAlign: `center`, marginBottom: 40 }}>
            <p
              style={{
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 12,
                color: `#40916C`,
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
                fontFamily: `'Playfair Display', serif`,
                fontSize: `clamp(22px, 3vw, 34px)`,
                fontWeight: 700,
                color: `#1B3A4B`,
                letterSpacing: `-0.02em`,
              }}
            >
              {"What Makes "}
              <span className="green-text">Connections</span>
              {" Real"}
            </h2>
          </div>
          <div className="features-grid">
            {yn.map((e, t) => (
              <FeatureCard
                key={t}
                icon={e.icon}
                title={e.title}
                desc={e.desc}
              />
            ))}
          </div>
        </div>
      </section>
      <section
        style={{ padding: `60px 40px`, maxWidth: 1100, margin: `0 auto` }}
      >
        <div style={{ textAlign: `center`, marginBottom: 40 }}>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 12,
              color: `#40916C`,
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
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(22px, 3vw, 34px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.02em`,
            }}
          >
            {"What Our "}
            <span className="green-text">Members</span>
            {" Say"}
          </h2>
        </div>
        <div className="testimonials-grid">
          {vn.map((e, t) => (
            <TestimonialCard key={t} testimonial={e} />
          ))}
        </div>
      </section>
      <section
        style={{
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          padding: `64px 40px 72px`,
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
            ⌒ ☽ ⌒
          </div>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(26px, 4vw, 42px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              color: `#1B3A4B`,
              marginBottom: 8,
            }}
          >
            Your Story Could Be <span className="green-text">Next</span>
          </h2>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 16,
              color: `#3D6B55`,
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
            <Link to="/how-it-works" className="hero-btn-primary">
              Get Started →
            </Link>
            <button
              onClick={() => t(`/explore`)}
              style={{
                background: `rgba(255,255,255,0.92)`,
                color: `#2D6A4F`,
                border: `2px solid #74C69D`,
                padding: `13px 32px`,
                borderRadius: 32,
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 15,
                fontWeight: 700,
                cursor: `pointer`,
                letterSpacing: `0.04em`,
                transition: `all 0.22s`,
                backdropFilter: `blur(6px)`,
              }}
              onMouseEnter={(e) => {
                ((e.currentTarget.style.background = `#fff`),
                  (e.currentTarget.style.boxShadow = `0 6px 20px rgba(45,106,79,0.2)`));
              }}
              onMouseLeave={(e) => {
                ((e.currentTarget.style.background = `rgba(255,255,255,0.92)`),
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
          <span style={{ color: `#40916C` }}>♡</span>
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

export { SuccessStoriesPage };
