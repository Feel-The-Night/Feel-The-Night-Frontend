# Assets

Images live here, grouped by where they are used:

```text
src/assets/
  images/   photography and artwork exported from Figma
  icons/    small SVG icons
```

Import them from the component that uses them so Vite fingerprints and bundles
the file:

```ts
import background from '../../assets/images/dashboard-background.png'
```

Files that are referenced from `index.html` or that must keep a stable URL go in
`public/` instead.

## Pending export from Figma

**No image has been committed yet.** The Figma MCP asset URLs are not reachable
from the environment this commit was prepared in, and inventing stand-ins was
not an option, so the images below still have to be exported by hand from the
Figma file and dropped into the folders above.

File: `foE2DUmsfyiJBMecskkNg4` (Fighting game site)

### Shared across screens (export these first)

| Figma layer            | Node    | Size      | Notes                                                       |
| ---------------------- | ------- | --------- | ----------------------------------------------------------- |
| `background 1`         | `105:4` | 1920x1080 | Dashboard background. Drawn with `blur(2px)` and `mix-blend-mode: luminosity` over a white layer — keep the source image clean and apply both in CSS. |
| `community_background 1` | `107:41` | 1920x1080 | Community page background. |

### Screen-specific (export when that screen is implemented)

- Start Here cards — `125:30`, `125:31`, `127:100`, `127:101` (880x340 each)
- Dashboard news items — `117:115` (502x564), `105:17`, `105:21`, `105:27`, `105:28` (367x97)
- Dashboard "compre uni" panel — `105:38`, `105:40`, `105:41`, `105:42`
- Community Discord cards — `107:50`, `107:51`, `107:55`, `107:54`
- Community X/social cards — `107:70`, `107:71`, `107:74`, `107:75`
- Guides thumbnails — `143:36` and the equivalent layer in each guide row
- Register close icon — `125:17` (Material Symbols `close`, 60x60)

Most of the screen-specific images are *content* (news banners, Discord invites,
guide thumbnails), not interface chrome. They will eventually come from an API,
so treat committing them as a temporary step while the pages are being built.

### Not assets

- The divider above the Start Here cards (`125:28`) is a 1820x0 line — plain CSS border.
- Bebas Neue and Poppins are loaded from Google Fonts in `index.html`.
