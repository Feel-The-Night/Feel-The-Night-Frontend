# Feel The Night

Community portal for the Under Night In-Birth scene: onboarding for new
players, a guides database, the community servers and the event calendar.
This repository holds the frontend.

## Status

The frontend is feature-complete for review. Two things are still open:

- **Backend integration is pending.** Register and Login validate on the
  client and stop there - no API, no session, no account is created. Guides,
  news and events are local sample data.
- **Game artwork is pending.** Every image slot is declared in
  `src/assets/media.ts` and renders an intentional placeholder until the file
  exists. See `src/assets/README.md` for the export list.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- CSS Modules
- Vitest + Testing Library

No UI framework and no state library.

## Development

Requires Node.js 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

```bash
npm run build       # type-check and build for production
npm run lint        # run ESLint
npm test            # run the Vitest suite once
npm run test:watch  # run Vitest in watch mode
npm run preview     # serve the production build locally
```

Tests assert behaviour - routing, guide search and filters, form validation,
the header menu. They do not assert styling: jsdom does not evaluate media
queries, so layout is checked in a browser.

## Routes

| Path          | Page                                          |
| ------------- | --------------------------------------------- |
| `/`           | Dashboard: key art and community news         |
| `/start`      | Start Here: the four onboarding cards         |
| `/guides`     | Guides with search, character filter and sort  |
| `/community`  | Discord servers and the social wall            |
| `/characters` | Character select roster                        |
| `/events`     | Featured, upcoming, weekly and past events     |
| `/login`      | Login form (client-side validation only)       |
| `/register`   | Register form (client-side validation only)    |
| anything else | Not found                                      |

## Project structure

```text
src/
  assets/         media.ts - every image slot, its ratio and object-position
  components/
    auth/         shared form field, password field, panel and validation
    layout/       Header
    ui/Media/     image slot with placeholder, overlay and tint
  layouts/        AppLayout: skip link, header, routed content
  pages/          one folder per route, with its CSS Module
  routes/         AppRoutes and the navigation source of truth
  styles/         tokens.css (design tokens) and global.css
  test/           Vitest setup and render helpers
```

Design tokens live in `src/styles/tokens.css`; components read them and never
hardcode a colour.

## Design

The visual direction comes from the project's Figma file: black and dark
graphite surfaces, deep red accents, Bebas Neue for display type and Poppins
for body text. Desktop is the primary target (1920px reference), with tablet
and mobile layouts down to 390px.
