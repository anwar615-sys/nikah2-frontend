# Nikha2 Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the Nikha2 frontend into the emerald and champagne premium design with dark/light themes, Balanced motion, glowing buttons and the living sunrise hero, without changing any page's content or behaviour.

**Architecture:**
- All colours move to CSS variables in `src/styles/theme.css`, applied by a property-aware codemod over the decompiled inline styles.
- Two small React contexts (`ThemeContext`, `MotionContext`) own the theme and motion settings.
- Dependency-free motion components live in `src/components/motion/`.
- The hero is a self-contained WebGL component ported from the approved prototype.

**Tech Stack:** React 19, Vite 7, React Router 6, plain CSS variables, WebGL 1, IntersectionObserver, View Transitions API. Tests use Node's built-in `node --test`, which needs no new dependencies. Codemods use the TypeScript compiler API, already used by `_recovered/tools/`.

**Spec:** `docs/superpowers/specs/2026-10-03-premium-redesign-design.md`

## Global Constraints

- No new runtime dependencies. Under 25 KB gzipped of new JS.
- **Fonts:** Cormorant Garamond (600, 700, italic 600) for display; Manrope (400 to 800) for UI. Load once in `index.html`. Fallbacks: `Georgia, serif` and `system-ui, sans-serif`.
- **Palette:** use the spec §2.1 table values verbatim, both themes.
- **Storage keys:** `nikha2-theme` (`light` | `dark`, absent means system), `nikha2-motion` (`auto` | `on` | `off`), `nikha2-hero-paused` (`1` | `0`), and `sessionStorage` `nikha2-sunrise-played` (`1`).
- **Reduced motion** is honoured when the motion setting is `auto`. Pressing play or replay in the hero sets motion to `on`.
- **Content is complete at rest:** nothing visible at load is hidden waiting for an observer.
- **Contrast:** WCAG AA (4.5:1 body, 3:1 large) in both themes.
- Animations use transform and opacity only, so there is no layout shift.
- **Hero performance:** pixel ratio capped at 1.5. Downscale to 0.6 when frame average is over 28 ms for 3 s. Show the still photo when it is over 42 ms for 3 s at 0.6. Stop rendering when off-screen or the tab is hidden.
- **Sunrise:** timeline as in spec §5, played once per session, with the safety net releasing the text after 9 s of visible time.
- Page content, routes, API calls and copy are unchanged.

## Review Focus

1. **Theme flash on first paint.** A returning dark-mode visitor must never see a white flash. *Test: Task 2, `noFlashScript` sets `data-theme` before React mounts.*
2. **A literal colour left behind that is unreadable in the other theme**, such as dark text on a dark surface. *Test: Task 1 codemod reports zero unmapped colours; Task 8 audit checks contrast of text against its background on every route in both themes.*
3. **Content stuck invisible.** A `Reveal` element already on screen at load, or on a device with motion off, must render visible. *Test: Task 4, `shouldStartHidden` returns false for in-view elements and when motion is off.*
4. **A visitor with reduced motion who presses play** must get the full sunrise. *Test: Task 5, `resolveMotion('on', true) === true` and the hero opt-in path.*
5. **A slow phone** must fall back to the still photo without freezing the page or losing the headline. *Test: Task 5, `qualityStep` thresholds; safety net releases the text.*

---

## File Structure

| File | Responsibility |
|---|---|
| `src/styles/theme.css` | Every colour token (light, system-dark, explicit dark); global button glow and shine; focus styles; reduced-motion rules |
| `_recovered/tools/retheme.cjs` | One-off codemod: literal colours to tokens (property-aware), font families, button class tagging |
| `_recovered/tools/retheme-map.cjs` | The colour mapping table (pure data plus `mapColor(value, property)`) |
| `src/context/ThemeContext.jsx` | `ThemeProvider`, `useTheme()` |
| `src/lib/theme.js` | Pure helpers: `resolveTheme`, `nextTheme`, `noFlashScript` string |
| `src/components/ThemeToggle.jsx` | Animated sun/moon pill with circular reveal |
| `src/context/MotionContext.jsx` | `MotionProvider`, `useMotion()` |
| `src/lib/motion.js` | Pure helpers: `resolveMotion`, `shouldStartHidden`, `countUpValue` |
| `src/components/MotionToggle.jsx` | Motion on/off switch |
| `src/components/motion/*.jsx` | `Reveal`, `BlurText`, `ShinyText`, `CountUp`, `SpotlightCard`, `Aurora`, `Marquee`, `GoldBorder`, `PageFade` |
| `src/components/motion/motion.css` | Keyframes and classes used by the motion components |
| `src/components/hero/LivingHero.jsx` | Hero layers, controls, sunrise orchestration |
| `src/components/hero/heroShader.js` | Vertex and fragment shader source strings (ported verbatim) |
| `src/components/hero/heroMath.js` | Pure: `introValues`, `uvToHero`, `qualityStep` |
| `src/components/hero/birds.js` | Bird flock spawn, update and draw on a 2D canvas |
| `public/assets/hero.webp` | Compressed hero photo (about 150 KB) |
| `tests/*.test.mjs` | `node --test` unit tests for the pure helpers and the codemod mapping |

---

### Task 1: Theme tokens and colour codemod

**Files:**
- Create: `src/styles/theme.css`, `_recovered/tools/retheme-map.cjs`, `_recovered/tools/retheme.cjs`, `tests/retheme-map.test.mjs`, `_recovered/tools/check.cjs` (copy of the existing static checker; resolves TypeScript from `node_modules/typescript` or `/opt/npm-tools/node_modules/typescript`)
- Modify: every `src/**/*.jsx` and `src/**/*.js` that contains colour literals (done by the codemod); `src/main.jsx` (import `./styles/theme.css` after `legacy.css`); `src/admin/theme.js` (values become `var(--…)` strings)

**Interfaces:**
- Produces: CSS variables `--bg --surface --surface-2 --fg --muted --line --emerald-900 --emerald-700 --emerald-500 --emerald-hi --gold --glow --danger --danger-bg --success --warning`, with values from spec §2.1. Also `--deep` (a section background that stays dark in both themes: light `#0B2A1F`, dark `#03130D`) and `--on-deep` (text on deep sections: `#EAF7F0` in both).
- Produces: `mapColor(value: string, property: string): string | null` from `retheme-map.cjs`. It returns the replacement CSS value, or null if unmapped.

- [ ] **Step 1: Write failing tests for `mapColor`** in `tests/retheme-map.test.mjs`. Each case asserts an exact result:
  - `('#1B3A4B','color')` returns `'var(--fg)'`.
  - `('#1B3A4B','background')` returns `'var(--deep)'`.
  - `('#2D6A4F','color')` returns `'var(--emerald-700)'`.
  - `('#74C69D','borderColor')` returns `'var(--emerald-500)'`.
  - `('#F8FAF5','background')` returns `'var(--bg)'`.
  - `('#fff','background')` returns `'var(--surface)'`.
  - `('#fff','color')` returns `null`. White text stays literal; it sits on emerald or deep surfaces.
  - `('rgba(116,198,157,0.2)','borderColor')` returns `'color-mix(in srgb, var(--emerald-500) 20%, transparent)'`.
  - `('#C0392B','color')` returns `'var(--danger)'`.
  - `('#D4AF37','color')` returns `'var(--gold)'`.
  - `('#123456','color')` returns `null`.
- [ ] **Step 2: Run** `node --test tests/retheme-map.test.mjs`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement `retheme-map.cjs`.** It holds a table for all 57 hex values and the rgba families found by `grep -rhoiE '#[0-9a-f]{3,6}\b|rgba\([^)]*\)' src`, keyed by normalised uppercase hex.
  - Property groups: `color`-like (`color`, `fill`, `stroke`, `caretColor`), `bg`-like (`background`, `backgroundColor`, gradient stops), `border`-like (`border*`, `outline*`, `boxShadow`).
  - rgba keeps its alpha via `color-mix`.
  - Pastel and pink accents (`#F8C8DC`, `#E8A9A9`, `#FFF8F0`, `#EADBC8`) map to `--gold`-tinted `color-mix` values.
  - Greys (`#2D2D2D`, `#3A3A3A`, `#4A4A4A`) map to `--fg`/`--muted`.
- [ ] **Step 4: Run tests.** Expected: PASS.
- [ ] **Step 5: Implement `retheme.cjs`.**
  - Walk `src/**/*.{js,jsx}` with the TS compiler API.
  - For every string or template literal inside a `style={{…}}` object or a style-object constant, replace colour literals using the enclosing property name. Gradient strings map each stop with the `bg` group.
  - Inside `<style>` template strings, map colours by CSS property with a regex over `prop: value`.
  - Print `UNMAPPED file:line value property` for nulls (except white text) and exit 1 if any remain.
- [ ] **Step 6: Write `src/styles/theme.css`** with the token block in the three-part structure from spec §3: `:root`, `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])`, `:root[data-theme="dark"]`. Each sets `color-scheme`. Also set `body { background: var(--bg); color: var(--fg); }`. Import it in `main.jsx` after `legacy.css`.
- [ ] **Step 7: Run** `node _recovered/tools/retheme.cjs`. Expected: `0 unmapped` and a count of replacements. Hand-map anything reported by adding it to the table, then re-run until it reports 0.
- [ ] **Step 8: Verify** `node _recovered/tools/check.cjs src` reports `counts {}`. In the browser, `/`, `/explore` and `/admin/login` load with no console errors and look identical in light mode to before (same colours, now as variables).
- [ ] **Step 9: Commit:** `git add -A && git commit -m "feat(theme): move all colours to CSS variables via codemod"`

### Task 2: ThemeProvider, no-flash script, animated ThemeToggle

**Files:**
- Create: `src/lib/theme.js`, `src/context/ThemeContext.jsx`, `src/components/ThemeToggle.jsx`, `tests/theme.test.mjs`
- Modify: `index.html` (inline no-flash script in `<head>`); `src/App.jsx` (wrap in `ThemeProvider`); `src/components/Navbar.jsx` (toggle before the auth buttons); `src/pages/LoginPage.jsx`, `src/pages/SignupPage.jsx`, `src/admin/AdminLoginPage.jsx` (toggle top-right); `src/admin/AdminLayout.jsx` (toggle in the sidebar above "Log out")

**Interfaces:**
- Produces:
  - `resolveTheme(stored: 'light'|'dark'|null, systemDark: boolean): 'light'|'dark'`
  - `nextTheme(current: 'light'|'dark'): 'light'|'dark'`
  - `noFlashScript: string`
  - `useTheme(): { theme: 'light'|'dark', setTheme(t), toggle(originEl?: HTMLElement) }`
  - `<ThemeToggle size?: 'md'|'sm' />`

- [ ] **Step 1: Write failing tests** in `tests/theme.test.mjs`:
  - `resolveTheme(null,true)==='dark'`
  - `resolveTheme(null,false)==='light'`
  - `resolveTheme('light',true)==='light'`
  - `nextTheme('dark')==='light'`
  - Evaluating `noFlashScript` against a fake `document`, `localStorage` (`nikha2-theme`=`dark`) and `matchMedia` sets `documentElement.dataset.theme==='dark'`.
- [ ] **Step 2: Run** `node --test tests/theme.test.mjs`. Expected: FAIL.
- [ ] **Step 3: Implement `src/lib/theme.js`.** `noFlashScript` is a self-contained IIFE string that is safe if storage throws.
- [ ] **Step 4: Run tests.** Expected: PASS.
- [ ] **Step 5: Implement `ThemeContext.jsx` and `ThemeToggle.jsx`.**
  - The toggle's markup, CSS and motion are copied from the approved prototype (knob, stars, cloud, moon crescent).
  - `toggle(originEl)` uses `document.startViewTransition` with a `clip-path` circle from the button's centre (650 ms, `cubic-bezier(.4,0,.2,1)`). Without the API, or with motion off, it switches instantly.
  - `aria-pressed` is true when dark.
- [ ] **Step 6: Inline `noFlashScript`** in `index.html` and place the toggles in the five files listed.
- [ ] **Step 7: Verify in the browser.**
  - Toggling on `/` animates and persists across a reload.
  - Set dark, reload with cache disabled, and confirm the first frame is dark (no white flash).
  - `/login` and `/admin` show the toggle.
- [ ] **Step 8: Commit:** `git commit -am "feat(theme): animated theme toggle with no-flash dark mode"`

### Task 3: Typography and button glow

**Files:**
- Modify: `index.html` (Google Fonts link for Cormorant Garamond and Manrope); `_recovered/tools/retheme.cjs` (add a font pass and a button-tagging pass); `src/styles/theme.css` (button rules); every component with font strings or `@import` of fonts (done by the codemod)

**Interfaces:**
- Produces: global classes `.nk-btn`, `.nk-btn-primary` and `.nk-btn-ghost`, and the variables `--font-display` and `--font-ui`.

- [ ] **Step 1: Extend the codemod.**
  - Replace `'Playfair Display', serif` and similar with `var(--font-display)`.
  - Replace `'DM Sans', sans-serif` with `var(--font-ui)`.
  - Delete the `@import url('https://fonts.googleapis.com…')` lines inside `<style>` strings.
  - Add `className` to every `<button>`:
    - `nk-btn nk-btn-primary` when its inline background contains `linear-gradient`;
    - `nk-btn nk-btn-ghost` when its background is transparent or none and it has a border;
    - `nk-btn` otherwise.
    - Existing classNames are merged, not replaced.
- [ ] **Step 2: Run the codemod.** Expected: it reports 0 remaining `Playfair` or `DM Sans` strings (`grep -rc "Playfair\|DM Sans" src` gives 0), and every `<button` has `nk-btn`.
- [ ] **Step 3: Add button rules to `theme.css`.**
  - `.nk-btn:hover, .nk-btn:focus-visible`: `transform: translateY(-2px)` and the glow `box-shadow` from spec §2.3, with `!important`, because inline styles set shadows.
  - `.nk-btn-primary`: `position: relative; overflow: hidden`, plus an `::after` light sweep (`left: -60%` to `130%` over `.7s`).
  - `.nk-btn-ghost`: an inset-border glow.
  - Remove the `onMouseEnter`/`onMouseLeave` handlers that set `boxShadow`/`transform` on `.nk-btn` elements, because the CSS now owns hover. The codemod deletes handlers whose bodies only assign `style.boxShadow`/`style.transform`.
  - Under `@media (prefers-reduced-motion: reduce)` and `[data-motion="off"]`: no transform and no sweep, but the glow stays.
- [ ] **Step 4: Verify.**
  - `node _recovered/tools/check.cjs src` reports `counts {}`.
  - In the browser, hovering any button on `/`, `/how-it-works` and `/login` glows and lifts; primary buttons sweep.
  - Headings render in Cormorant. Check the computed `font-family` of `h1`.
- [ ] **Step 5: Commit:** `git commit -am "feat(style): Cormorant + Manrope fonts and glowing buttons"`

### Task 4: Motion system and components

**Files:**
- Create: `src/lib/motion.js`, `src/context/MotionContext.jsx`, `src/components/MotionToggle.jsx`, `src/components/motion/{Reveal,BlurText,ShinyText,CountUp,SpotlightCard,Aurora,Marquee,GoldBorder,PageFade}.jsx`, `src/components/motion/motion.css`, `tests/motion.test.mjs`
- Modify: `src/App.jsx` (wrap in `MotionProvider`, wrap `Routes` in `PageFade`); `src/components/Navbar.jsx` (`MotionToggle` next to `ThemeToggle`; frosted glass after `scrollY > 12`; sliding active underline)

**Interfaces:**
- Produces:
  - `resolveMotion(setting: 'auto'|'on'|'off', systemReduced: boolean): boolean`
  - `shouldStartHidden(rect: {top:number}, viewportH: number, motionEnabled: boolean): boolean`, true only when `rect.top >= viewportH * 0.9` and motion is enabled
  - `countUpValue(to: number, progress: number): number`, using ease-out cubic and rounding
  - `useMotion(): { motionEnabled: boolean, setting, setSetting(s) }`. It also sets `document.documentElement.dataset.motion = 'on'|'off'`.
- Component props:
  - `<Reveal as? delay? blur? stagger?>`
  - `<BlurText text: string, as?, className?, style?>`
  - `<ShinyText as?, children>`
  - `<CountUp to: number, suffix?: string, duration?: number=1400>`
  - `<SpotlightCard as?, style?, className?, children>`
  - `<Aurora intensity?: number=.55>`
  - `<Marquee speed?: number=40 (seconds per loop), children>`
  - `<GoldBorder radius?: number, children>`
  - `<PageFade>`

- [ ] **Step 1: Write failing tests:**
  - `resolveMotion('auto',true)===false`
  - `resolveMotion('auto',false)===true`
  - `resolveMotion('on',true)===true`
  - `resolveMotion('off',false)===false`
  - `shouldStartHidden({top:100},800,true)===false`
  - `shouldStartHidden({top:900},800,true)===true`
  - `shouldStartHidden({top:900},800,false)===false`
  - `countUpValue(40,0)===0`, `countUpValue(40,1)===40`, `countUpValue(100,.5)===88`
- [ ] **Step 2: Run** `node --test tests/motion.test.mjs`. Expected: FAIL.
- [ ] **Step 3: Implement `src/lib/motion.js`.** Expected: tests PASS.
- [ ] **Step 4: Implement the context, `MotionToggle` and the components** using the behaviour and timings from the approved "Motion Levels" prototype (Balanced level):
  - **`Reveal`:** 28px rise plus 8px blur, `.8s`; stagger `.12s × (i % 3)`.
  - **`BlurText`:** per word, `.14s` step, `.9s` duration.
  - **`SpotlightCard`:** a `240px` radial glow at the pointer and `translateY(-4px)`; no 3D tilt (Balanced).
  - **`Aurora`:** three blurred blobs using `--emerald-500`, `--gold` and `--emerald-700`, at 14s, 18s and 20s alternate.
  - **`Marquee`:** duplicated track, `translateX(-50%)`; pauses on hover and when motion is off.
  - **`GoldBorder`:** a conic gradient of `--gold` rotating over 6s.
  - **`PageFade`:** opacity 0 to 1 over 250 ms keyed on `location.pathname`.
  - When `motionEnabled` is false, every component renders its final state with no animation.
- [ ] **Step 5: Verify.**
  - `node --test tests` passes.
  - The static check is clean.
  - In the browser, the Navbar becomes frosted after scrolling, the underline slides, and `MotionToggle` switches `data-motion`.
  - With motion off, `/features` shows every card immediately.
- [ ] **Step 6: Commit:** `git commit -am "feat(motion): motion setting and dependency-free animation components"`

### Task 5: Living hero

**Files:**
- Create: `src/components/hero/{LivingHero.jsx,heroShader.js,heroMath.js,birds.js,hero.css}`, `public/assets/hero.webp`, `tests/hero.test.mjs`
- Modify: `src/pages/HomePage.jsx` (the hero section's background `<img src={Bt}>` and overlay are replaced by `<LivingHero>`, which wraps the existing hero content; the headline block becomes the hero's `headline` slot)

**Interfaces:**
- Consumes: `useMotion()` from Task 4; `useTheme()` from Task 2.
- Produces:
  - `introValues(it: number, fromDay: boolean): {rise:number, dawn:number, sun:number}`: `rise = easeOutCubic((it-1)/5.2)`, `dawn = (1-smooth(3.4,9.5,it)) * (fromDay ? smooth(0,1.1,it) : 1)`, `sun = 1-.5*smooth(8,12,it)`
  - `uvToHero(ux, uy, w, h, imgAspect): {x, y}`, using cover-fit as in the prototype
  - `qualityStep(state: {quality, slowFor}, frameAvgMs, dt): {quality, slowFor, fallback: boolean}`
  - `<LivingHero headline: [string, string], children>`, where children are the tagline, lead and buttons

- [ ] **Step 1: Write failing tests** in `tests/hero.test.mjs`:
  - `introValues(0,false)` gives `{rise:0, dawn:1, sun:1}`.
  - `introValues(20,false)` gives `{rise:1, dawn:0, sun:.5}`.
  - `introValues(0,true).dawn===0`.
  - `uvToHero(.5,.5,1000,500,1.79)` gives `{x:500, y:250}`.
  - `qualityStep({quality:1,slowFor:2.95},30,.1)` gives `{quality:.6, slowFor:0, fallback:false}`.
  - `qualityStep({quality:.6,slowFor:2.95},45,.1).fallback===true`.
  - `qualityStep({quality:1,slowFor:1},16,.1).slowFor` is about `.9`.
- [ ] **Step 2: Run** `node --test tests/hero.test.mjs`. Expected: FAIL.
- [ ] **Step 3: Implement `heroMath.js`.** Expected: tests PASS.
- [ ] **Step 4: Port the prototype.**
  - Copy the vertex and fragment shaders verbatim from the approved prototype (Version 6) into `heroShader.js`, with the boat code already removed.
  - Bird logic goes into `birds.js`.
  - `LivingHero.jsx` holds the layers, the veil (light mint and dark emerald from the tokens), the controls (sun replay button and pause/play, with `aria-label`s as in the prototype), `IntersectionObserver` and `document.hidden` gating, and the letter emission with Web Animations.
  - Sunrise runs once per session via `sessionStorage`. Play or replay calls `setSetting('on')`.
  - Remove the prototype's fps label.
- [ ] **Step 5: Create `public/assets/hero.webp`** from `public/assets/1-BhKNAtC1.png` at width 1376, quality 82. Expected size: under 200 KB. Point the hero, `LoginPage.jsx` and `SignupPage.jsx` at `/assets/hero.webp`.
- [ ] **Step 6: Verify in the browser** (motion `on`):
  - The sunrise plays on first visit and not after a reload in the same session.
  - Replay fades day to dawn.
  - Pause persists.
  - Scrolling the hero out of view stops rendering (no `requestAnimationFrame` draw calls; check via a debug counter).
  - With motion `auto` and reduced motion, the still photo shows the full headline, and pressing play runs the sunrise.
  - Headless (software GL) falls back to the still photo without losing the headline.
- [ ] **Step 7: Commit:** `git add -A && git commit -m "feat(hero): living lake hero with sunrise intro"`

### Task 6: Public pages motion

**Files:**
- Modify: `src/pages/HomePage.jsx`, `HowItWorksPage.jsx`, `FeaturesPage.jsx`, `SuccessStoriesPage.jsx`, `SafetyPage.jsx`, `LegalPage.jsx`, `LoginPage.jsx`, `SignupPage.jsx`; `src/admin/AdminLoginPage.jsx`

**Interfaces:**
- Consumes: the Task 4 components; `ShinyText` replaces existing `.green-text` spans.

- [ ] **Step 1: Apply the spec §6 rows for these pages.**
  - **Home:** `CountUp` on the three stats (100 with `%`, 40 with `+`, 0); `SpotlightCard` on member cards; `Reveal` on sections below the hero.
  - **How It Works:** `Aurora` in the page hero; `Reveal` with `stagger` on the 5 steps; `SpotlightCard` on the plan cards; `GoldBorder` around the Premium card.
  - **Features:** `Aurora`; `BlurText` on the h1; `Reveal` stagger and `SpotlightCard` on the feature cards.
  - **Success Stories:** `Aurora`; the story carousel's scroll track becomes `<Marquee speed={40}>` (remove the arrow buttons); `SpotlightCard` on testimonials.
  - **Safety, Legal and 404:** `BlurText` h1; `Reveal` cards.
  - **Login, Signup and Admin login:** side photo `animation: kenburns 24s ease-in-out infinite alternate` (scale 1 to 1.08); the form card `Reveal`.
- [ ] **Step 2: Verify.** The static check is clean. Each page is checked in the browser at 1440 and 375 widths in both themes: no console errors, no horizontal overflow, cards reveal on scroll, and with motion off everything is visible immediately.
- [ ] **Step 3: Commit:** `git commit -am "feat(motion): animate public pages"`

### Task 7: Member and admin pages

**Files:**
- Modify: `src/pages/ExplorePage.jsx`, `src/admin/AdminDashboard.jsx`, `src/admin/AdminLayout.jsx`, `src/admin/styles.js`

- [ ] **Step 1: Explore.** `SpotlightCard` and `Reveal` stagger on profile cards; the AI Match button gets the `ShinyText` shimmer.
- [ ] **Step 2: Admin.** `CountUp` on the dashboard number tiles. Confirm `ADMIN_THEME` and `admin/styles.js` now resolve to tokens: dark mode on `/admin/users` has readable tables.
- [ ] **Step 3: Verify.** Signed in on your machine, check `/explore`, `/messaging`, `/account` and `/admin` in both themes. There must be no dark-on-dark or light-on-light text (Review Focus 2). Messaging and Account have no decorative motion.
- [ ] **Step 4: Commit:** `git commit -am "feat(theme): member and admin pages in new theme"`

### Task 8: Full verification

**Files:**
- Create: `_recovered/tools/audit.js` (the browser audit script from the earlier session, extended with a contrast check)

- [ ] **Step 1: Run unit tests and static check.** `node --test tests` passes all, and `node _recovered/tools/check.cjs src` reports `counts {}`.
- [ ] **Step 2: Build.** You run `npm run build` on your machine. Expected: success. Note the gzipped JS delta against the pre-redesign build, which must be under 25 KB.
- [ ] **Step 3: Audit every route** (`/ /how-it-works /features /success-stories /safety /terms /privacy /cookies /login /signup /explore /admin/login /nope-404`) at 1440×900 and 375×812, in light and dark. Expected: no console errors, broken images, horizontal overflow or dead links. Every text node's contrast against its effective background must be at least 4.5 (or 3 at 24px and above).
- [ ] **Step 4: Visual review.** Take one screenshot per route per theme and compare with the prototypes. Fix any differences.
- [ ] **Step 5: Hero performance on your machine.** The hero holds about 60 fps, and rendering stops when scrolled away.
- [ ] **Step 6: Commit and push:** `git commit -am "chore: premium redesign verified" && git push`
