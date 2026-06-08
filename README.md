# FusionLab

A responsive, dark-mode marketing site + lightweight backoffice for a 3D printing
studio. Built with **Vite + React + TypeScript + React Router**. Slight dev/code
aesthetic (mono accents, terminal block, subtle grid, neon-green on near-black).
UI text is fully internationalised; current locale is **Portuguese (pt-PT)**.

## Features

- **Public site** (`/`) — hero, print gallery, about, contact form, and static
  legal pages (Privacy Policy, Cookies).
- **Gallery** — renders posts created in the backoffice. Click any print for a
  lightbox with details.
- **Backoffice** (`/bckfc3d`) — login screen → dashboard with full CRUD over
  gallery posts.
- Responsive layout with a mobile nav, dark-only theme, `prefers-reduced-motion`
  aware animations.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Backoffice

- URL: **`/bckfc3d`**
- Demo credentials: **`admin` / `fusionlab`**

> ⚠️ Auth and post storage are **client-side only** (sessionStorage +
> localStorage) so the static site works without a backend. Before going to
> production, replace `src/lib/auth.ts` and `src/lib/posts.ts` with real API
> calls and move credentials server-side.

## Internationalisation (i18n)

All UI strings live in `src/i18n/pt.ts` and are accessed through the `useT()`
hook (`t('home.title')`, with `{var}` interpolation). To add a language, create a
sibling file with the same shape, register it in `src/i18n/index.tsx`, and pass
the `locale` prop to `<I18nProvider>` in `src/main.tsx`.

## Project structure

```
src/
  components/   Header, Footer, layout, gallery, auth guard
  pages/        Home, legal pages, contact, 404
  pages/admin/  Login, Dashboard (CRUD)
  i18n/         index.tsx (provider + useT), pt.ts (strings)
  lib/          auth.ts, posts.ts (storage-backed stores)
```

## Deployment notes

This is a single-page app using client-side routing. The included
`public/_redirects` handles SPA fallback on Netlify; for other hosts, route all
paths to `index.html`.

Social: [@fusionlab0](https://instagram.com/fusionlab0)
