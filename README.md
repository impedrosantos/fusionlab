# Esteva 3D

A responsive, dark-mode marketing site + lightweight backoffice for a 3D printing
studio. Built with **Vite + React + TypeScript + React Router**. Slight dev/code
aesthetic (mono accents, terminal block, subtle grid, neon-green on near-black).
UI text is fully internationalised; current locale is **Portuguese (pt-PT)**.

## Features

- **Public site** (`/`) — hero, print gallery, about, contact form, and static
  legal pages (Privacy Policy, Cookies).
- **Gallery** — renders posts created in the backoffice. Click any print for a
  lightbox with details.
- **Backoffice** (`/panda87`) — login screen → dashboard with full CRUD over
  gallery posts.
- Responsive layout with a mobile nav, dark-only theme, `prefers-reduced-motion`
  aware animations.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Firebase web config
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Firebase setup

This app uses **Firebase Authentication** (backoffice login) and **Cloud
Firestore** (gallery posts). One-time setup:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Authentication** → Get started → enable the **Email/Password** provider.
3. **Firestore Database** → Create database (production mode).
4. **Project settings → General → Your apps** → add a **Web app**, then copy the
   `firebaseConfig` values into `.env.local` (see `.env.example`).
5. Install the CLI and log in: `npm i -g firebase-tools && firebase login`.
6. Point the project at yours: set `default` in `.firebaserc` to your project ID
   (or run `firebase use --add`).

### Creating backoffice users

There is no public sign-up. Add users in **Authentication → Users → Add user**
(email + password). Any user you create can sign in to the backoffice; delete the
user there to revoke access. The login screen lives at **`/panda87`**.

## Deployment

```bash
npm run deploy           # build + deploy hosting AND Firestore rules
npm run deploy:hosting   # build + deploy hosting only
npm run deploy:rules     # deploy Firestore security rules only
```

`firebase.json` serves the Vite build from `dist/` and rewrites all routes to
`index.html` for client-side routing. `firestore.rules` makes posts **publicly
readable** but **writable only by authenticated users** — deploy it before going
live (`npm run deploy:rules`).

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
  lib/          firebase.ts (init), auth.tsx (Firebase Auth), posts.ts (Firestore)
```

Social: [@fusionlab0](https://instagram.com/fusionlab0)
