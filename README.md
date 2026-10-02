# Nikha2: The Second Chance (frontend)

React 19 + Vite + React Router 6 + Socket.IO. Rebuilt from the production build; see `BLUEPRINT.md` for the full spec.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Copy `.env.example` to `.env` to point at a different backend or Google client ID. By default it talks to the old live backend (`https://nikah2-backend.onrender.com/api`).

## Build

```bash
npm run build      # outputs dist/
```

Deploy `dist/` as a static site with an SPA rewrite (`/*` → `/index.html`).

## Layout

```
src/
  main.jsx, App.jsx          entry + routes
  lib/                       api client, socket, countries, people helpers
  context/AuthContext.jsx    auth state (JWT in localStorage "nikha2_tokens")
  calls/                     WebRTC call provider + call overlay UI
  components/                navbar, modals, shared UI, route guards
  pages/                     public + member pages, pages/messaging/*
  admin/                     admin panel
  styles/legacy.css          production CSS (Tailwind v4 output), kept verbatim
```

`_recovered/` holds the original production build and the decompiled reference.
