# Assets

```text
src/assets/
  images/   artwork exported from the design file
  icons/    small SVG icons
```

Import from the component that uses it so Vite fingerprints and bundles the
file, then pass it to the component's `image` prop:

```ts
import selectYourCharacter from '../../assets/images/start-select-your-character.png'
// ...
{ id: 'select-your-character', title: 'Select your character', image: selectYourCharacter }
```

Files referenced from `index.html` go in `public/` instead.

## Still to export

Nothing has been committed yet. The Figma asset URLs are not reachable from
the environment these commits were prepared in, and the mockup screenshots
shared in review are roughly 700px wide with two screens each - cropping them
would yield a 26x50 portrait for a 150x200 slot, so they were not used.

Every component already accepts its artwork through an `image` prop and falls
back to a neutral slot until then. Export at 2x the listed size where possible.

### Dashboard (`src/pages/Home/Home.tsx`)

| File name | Size | Slot |
| --- | --- | --- |
| `dashboard-background.png` | 1920x1080 | page background |
| `dashboard-promo.png` | 735x800 | key art panel, left column |
| `news-rachao-da-unibr.png` | 502x564 | featured news card |
| `news-summer-workshop.png` | 367x97 | news row 1 |
| `news-zate.png` | 367x97 | news row 2 |
| `news-training-grounds.png` | 367x97 | news row 3 |
| `news-celestial-rumble.png` | 367x97 | news row 4 |

### Start Here (`src/pages/Start/Start.tsx`)

| File name | Size | Slot |
| --- | --- | --- |
| `start-select-your-character.png` | 880x340 | card 01 |
| `start-understand-your-power.png` | 880x340 | card 02 |
| `start-defence-is-an-offence.png` | 880x340 | card 03 |
| `start-get-out-of-jail.png` | 880x340 | card 04 |

### Community (`src/pages/Community/Community.tsx`)

| File name | Size | Slot |
| --- | --- | --- |
| `community-background.png` | 1920x1080 | page background |
| `discord-under-night-brasil.png` | 128x128 | server avatar |
| `discord-uwuse-chile.png` | 128x128 | server avatar |
| `discord-guard-thrusters.png` | 128x128 | server avatar |
| `discord-uni-player-hub.png` | 128x128 | server avatar |
| `social-under-night-brasil.png` | 480x270 | post preview |
| `social-zate.png` | 480x270 | post preview |
| `social-uni-official.png` | 480x270 | post preview |
| `social-uni-cl.png` | 480x270 | post preview |

### Characters (`src/pages/Characters/Characters.tsx`)

| File name | Size | Slot |
| --- | --- | --- |
| `characters-background.png` | 1920x1080 | page background |
| `portrait-<name>.png` | 130x250 | one per roster slot (24 drawn) |

The roster itself is still undefined: the grid renders 24 numbered slots.
Replace the generated list with real entries (`id`, `name`, `image`) as the
portraits arrive.

### Register (`src/pages/Register/Register.tsx`)

| File name | Size | Slot |
| --- | --- | --- |
| `register-background.png` | 1920x1080 | page background behind the panel |

### Events (`src/pages/Events/events.data.ts`)

Reuses the community artwork above. Point each event's `image` at the matching
`news-*.png` banner; only a dedicated featured banner
(`event-rachao-da-unibr.png`, 1600x600) is missing.
