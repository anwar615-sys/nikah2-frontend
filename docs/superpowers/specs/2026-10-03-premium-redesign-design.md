# Nikha2 Premium Redesign: Design Spec

**Date:** 2026-10-03
**Status:** Awaiting review
**Prototypes (approved):** palette directions, type pairings, motion levels, living hero (claude.ai artifacts "Nikha2 Emerald Directions", "Nikha2 Type Pairings", "Nikha2 Motion Levels", "Nikha2 Living Hero")

## 1. Goal

Make the rebuilt Nikha2 frontend feel premium and alive instead of templated. That means:
- an emerald metallic palette with champagne gold;
- a refined serif and sans font pairing;
- tasteful motion across the site;
- buttons that glow on hover;
- an animated dark/light theme;
- a living, animated home hero with a sunrise intro.

All of this keeps every page's content, routes and behaviour unchanged.

**Scope:** every page, including the admin panel.
**Out of scope:** backend work, copy/content changes, Privacy/Cookie policy text, new features.

## 2. Visual identity

### 2.1 Palette (mix of directions A and C)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F3F6F1` | `#020B08` | Page background |
| `--surface` | `#FFFFFF` | `#07160F` | Cards, panels, inputs |
| `--surface-2` | `#F0FAF4` | `#0B2018` | Subtle fills, table stripes |
| `--fg` | `#0E2A1F` | `#E8FFF5` | Primary text |
| `--muted` | `#4C6A5D` | `#8DB8A6` | Secondary text |
| `--line` | `#D7E6DD` | `#10291F` | Borders, dividers |
| `--emerald-900` | `#043524` | `#059669` | Deepest metal stop, primary button start |
| `--emerald-700` | `#06573B` | `#10B981` | Primary brand |
| `--emerald-500` | `#10B981` | `#34F5A8` | Accent, links, active states |
| `--emerald-hi` | `#B8FFE0` | `#F0FFF8` | Metallic highlight |
| `--gold` | `#C9A55C` | `#D9B86C` | Champagne accent: badges, avatar rings, Premium, eyebrows |
| `--glow` | `rgba(16,200,140,.5)` | `rgba(52,245,168,.5)` | Hover glow |
| `--danger` | `#C0392B` | `#F07167` | Errors, destructive actions |
| `--danger-bg` | `#FFF5F5` | `#2A0E0C` | Error backgrounds |
| `--success` | `#2D6A4F` | `#34D399` | Success states (semantic; separate from the accent) |
| `--warning` | `#9A6B00` | `#E0B85A` | Pending/warning states |

Metallic text uses a moving gradient through `emerald-900 → 700 → 500 → hi → gold → 500 → 700`. Every display line gets padding of at least `.12em` on the sides and `.14em` below, so the clipped gradient never cuts descenders or italics (this was the "incomplete letters" bug).

### 2.2 Typography

- **Display:** Cormorant Garamond, weights 600 and 700, plus italic 600. Used for headings, names and big numbers.
- **UI/body:** Manrope, weights 400 to 800. Used for everything else.
- Loaded once from Google Fonts in `index.html`, replacing every per-component `@import` of Playfair Display and DM Sans.
- Fallback stacks: `Georgia, serif` and `system-ui, sans-serif`.

### 2.3 Buttons

- One shared glow treatment for all buttons.
- **On hover and on keyboard focus:** the button lifts 2px and gets an emerald glow (`0 0 0 1px emerald-500, 0 0 26px glow, 0 0 60px glow`).
- **Primary (gradient) buttons** also get a diagonal light-sweep shine.
- **Ghost buttons:** an inset emerald border plus the glow.
- Icon buttons get a softer glow only.
- Every button keeps a visible keyboard focus style.

## 3. Theme system

- `src/styles/theme.css` defines every token in section 2.1, in the standard structure:
  - light values on `:root`;
  - dark values under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`;
  - the same dark values again under `:root[data-theme="dark"]`.
- **`ThemeProvider`** (in `src/context/ThemeContext.jsx`):
  - holds the theme setting (`light`, `dark`, or system by default);
  - stores the choice in `localStorage['nikha2-theme']`;
  - sets `data-theme` on `<html>`.
- **No flash on load:** an inline script in `index.html` applies the saved theme before React mounts.
- **`ThemeToggle` component:** the animated sun/moon pill from the prototypes (knob rolls across, the sun turns into a crescent moon, stars appear, the cloud slides away).
  - Switching uses a circular reveal from the button (View Transitions API).
  - Browsers without that API get an instant switch.
  - It appears in the Navbar, on the login, signup and admin login pages, and in the admin sidebar.

### 3.1 Colour migration

The decompiled code hard-codes colours inline in about 18K lines. A one-off script (`_recovered/tools/retheme.cjs`) rewrites them:
- **Hex and rgba colours** are mapped through a fixed table to `var(--token)`. For example, `#1B3A4B → var(--fg)`, `#2D6A4F → var(--emerald-700)`, `#74C69D → var(--emerald-500)`, `#F8FAF5 → var(--bg)`.
- **rgba values** with alpha map to `color-mix(in srgb, var(--token) N%, transparent)`.
- **Gradients** are rewritten to token stops.
- **The `ADMIN_THEME` object** is re-pointed at the CSS variables.
- **White text on emerald buttons** stays literal white.

The script prints any colour it could not map. Each one is resolved by hand, with no silent leftovers.

## 4. Motion system ("Balanced")

- **`MotionProvider`** (`src/context/MotionContext.jsx`):
  - holds the motion setting (`auto`, `on` or `off`) in `localStorage['nikha2-motion']`;
  - `auto` follows the device's reduced-motion preference;
  - exposes `motionEnabled`.
- **`MotionToggle`**: a small switch next to the theme toggle, so visitors can turn animations on or off either way.
- Pressing play in the hero counts as turning motion `on`.
- Every animated component reads `motionEnabled`. When it is off, content renders in its final state with no movement.
- **Content is complete at rest:** anything already on screen at load is never hidden waiting for an animation.

### 4.1 Animation components (`src/components/motion/`)

These are React Bits style components, adapted to the tokens. They are written to need no extra libraries, and are CSS or IntersectionObserver based unless noted.

| Component | Effect | Used on |
|---|---|---|
| `Reveal` | Fade and blur up on scroll, with optional stagger | Section heads and cards site-wide |
| `BlurText` | Word-by-word blur-in | Page headlines (not the home hero) |
| `ShinyText` / `.metal` | Moving metallic gradient on text | Accent heading lines |
| `CountUp` | Numbers count up when visible | Home stats, admin dashboard numbers |
| `SpotlightCard` | Cursor-following glow and slight lift | Member, feature, plan and story cards |
| `Aurora` | Slow drifting emerald and gold light blobs | How It Works, Features, Success Stories heroes |
| `Marquee` | Endless slow drift; pauses on hover and when motion is off | Success Stories carousel |
| `GoldBorder` | Slowly rotating champagne gradient border | Premium plan card |
| `PageFade` | Short fade between routes | `App` |

**Navbar:** frosted glass once scrolled, and an active-link underline that slides between links.

## 5. Living home hero

A new `src/components/hero/LivingHero.jsx` replaces the static hero background on the Home page. It is ported from the approved prototype.

**Layers:**
1. The still photo (`<img>`, always present: it's the first paint, the fallback and what the SEO preview shows).
2. A WebGL canvas.
3. A birds canvas.
4. The theme veil.
5. The content.

**Shader:** one full-screen pass over the photo, in image coordinates, with hand-tuned zones:
- **Water:** blue water pixels only, with the couple masked out. Layered ripples drift toward the viewer, with sun glints and shimmer.
- **Leaves:** the top and corner canopy. A gusting sway, stronger toward the hanging tips, at 1.5× the original prototype speed.
- **Sky:** the existing clouds billow slowly, and new procedural wisps drift through.
- **Dithering:** applied to remove colour banding.
- **Kept still:** the couple, the stone ledge and the mountains.

**Birds:** 2 to 5 bird flocks cross the sky from either side every 7 to 16 seconds, flapping and bobbing. They are removed once off-screen.

**Sunrise intro** (about 10 seconds):
1. Dawn grade.
2. The sun rises behind the far hills, with a golden path on the water.
3. When the sun crests, each letter of "Start Your New Beginning" flies out of the sun, gold, and turns emerald as it lands.
4. The tagline and buttons fade in.
5. The scene warms into day, and a soft sun glow remains.

**Sunrise rules:**
- It plays once per browser session (`sessionStorage['nikha2-sunrise-played']`).
- Its clock only runs while the hero is visible.
- If the letters haven't been released after 9 seconds of visible time, the text is shown anyway as a safety net.
- Replay fades from day back to dawn instead of cutting.

**Controls (bottom-right of the hero):**
- **Replay sunrise** (sun icon).
- **Pause/play.** The setting is remembered (`localStorage['nikha2-hero-paused']`).
- Play or replay is an explicit choice and overrides reduced motion.

**Performance:**
- Rendering stops when the hero is off-screen or the tab is hidden.
- Pixel ratio is capped at 1.5.
- **Automatic step-down:** if frames average over 28 ms for 3 seconds, render at 0.6× resolution. If they still average over 42 ms, show the still photo.
- Without WebGL, the still photo is shown.
- The animation starts after first paint, so the photo shows instantly.
- The hero photo is served as **WebP, about 150 KB**, instead of the 1.4 MB PNG.
- No memory growth over time.
- The prototype's fps label is removed.

**Theme:**
- **Dark:** a deep emerald veil.
- **Light:** a light mint veil, with the headline in dark emerald and gold.

## 6. Page-by-page

| Page | Changes beyond tokens, fonts and buttons |
|---|---|
| Home | Living hero; `CountUp` stats; `SpotlightCard` member cards; `Reveal` sections |
| How It Works | `Aurora` hero; steps `Reveal` in sequence; `SpotlightCard` plan cards; `GoldBorder` on Premium |
| Features | `Aurora` hero; `BlurText` headline; feature cards stagger in with spotlight |
| Success Stories | `Aurora` hero; story carousel becomes a `Marquee`; spotlight testimonials |
| Safety, Terms, Privacy, Cookies, 404 | `BlurText` headline; `Reveal` cards |
| Login, Signup, Admin login | Slow zoom on the side photo; the form card rises in; theme toggle |
| Explore | Profile cards stagger in with spotlight; AI Match button shimmer |
| Messaging, Account, Complete Profile | Tokens, fonts, glow buttons, dark mode only (working screens) |
| Admin (7 pages) | Tokens via `ADMIN_THEME`, fonts, glow buttons, dark mode, theme toggle in the sidebar, `CountUp` on dashboard numbers |

## 7. Accessibility and performance budgets

- **Reduced motion:** honoured by default, with the motion switch as an explicit override.
- **Contrast:** at least WCAG AA (4.5:1 body text, 3:1 large text) in both themes. Metallic text is checked at its darkest and lightest gradient stops against its background.
- **Keyboard and screen readers:** visible focus on every interactive element; theme and motion toggles have `aria-pressed` and labels.
- **Bundle size:** under 25 KB gzipped of new JavaScript, and no new runtime dependencies.
- **No layout shift** from animations: transforms and opacity only.

## 8. Testing and verification

1. **Static check:** the TypeScript checker reports no unresolved names, and `vite build` passes.
2. **Colour migration:** the script reports zero unmapped colours (or a reviewed list).
3. **Browser audit**, repeating the earlier one on every route at 1440px and 375px, in light and dark: no console errors, broken images, horizontal overflow or dead links.
4. **Visual review:** a screenshot of each page in both themes, compared against the prototypes.
5. **Hero:** the sunrise plays once per session, then pause/play, replay, the reduced-motion path and the slow-device step-down are each checked.
6. **Performance:** steady 60 fps on the hero on your machine, and nothing running when the hero is off-screen.
7. **Behaviour unchanged:** login, signup, Explore, messaging and admin are spot-checked against the old backend.

## 9. Delivery

The work is built in stages, each one committed and pushed:
1. Theme system and colour migration.
2. Fonts and buttons.
3. Motion components.
4. Living hero.
5. Per-page motion.
6. Verification.

You test each stage locally with `npm run dev`.
