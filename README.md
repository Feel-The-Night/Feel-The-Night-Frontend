# Feel The Night

Community platform for fighting game players.

Feel The Night brings together beginner onboarding, character guides and the
community channels for a fighting game scene in a single place. This repository
holds the frontend application.

The project is in early development: routing, the global layout and the shared
navigation are in place, and each page is being implemented from the Figma
design one at a time.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- CSS Modules

## Development

Requires Node.js 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

Other scripts:

```bash
npm run build     # type-check and build for production
npm run lint      # run ESLint
npm run preview   # serve the production build locally
```

## Project structure

```text
src/
  components/
    layout/
      Header/        # shared top bar
  layouts/
    AppLayout.tsx    # header + routed page content
  pages/
    Home/ Start/ Guides/ Community/ Characters/ Register/ NotFound/
  routes/
    AppRoutes.tsx    # route definitions
    navigation.ts    # nav items shared with the header
  styles/
    global.css       # design tokens and base styles
  App.tsx
  main.tsx
```

## Routes

| Path          | Page       |
| ------------- | ---------- |
| `/`           | Dashboard  |
| `/start`      | Start Here |
| `/guides`     | Guides     |
| `/community`  | Community  |
| `/characters` | Characters |
| `/register`   | Register   |
