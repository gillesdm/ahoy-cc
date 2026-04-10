# Hero

## Metadata
- **Name:** Hero
- **Category:** Molecule
- **Status:** Demo
- **File:** `prototype/src/App.css` — `.hero`, `.hero .base`, `.hero .framework`, `.hero .vite`

## Overview

**When to use:**
- Top-of-page brand/logo display with layered 3D perspective effect
- Showcasing the technology stack logos in the demo

**When not to use:**
- Content sections — use `#center` or `#next-steps` layout
- Any production UI — this is a demo scaffold, not a reusable pattern

## Anatomy

```
.hero (position: relative)
├── .base       — base technology logo (z-index: --z-base)
├── .framework  — framework logo, 3D-transformed (z-index: --z-above)
└── .vite       — Vite logo, 3D-transformed (z-index: --z-base)
```

All three child elements are horizontally centered via `inset-inline: 0; margin: 0 auto`.

## Tokens Used

| Property | Token | Value |
|----------|-------|-------|
| `z-index` (`.base`) | `--z-base` | 0 |
| `z-index` (`.framework`) | `--z-above` | 1 |
| `z-index` (`.vite`) | `--z-base` | 0 |

**Non-tokenised layout values** (structural dimensions, not design system concerns):

| Property | Value | Reason |
|----------|-------|--------|
| `.base` width | `170px` | Fixed logo size |
| `.framework` top | `34px` | Precise logo overlay position |
| `.framework` height | `28px` | Logo aspect ratio |
| `.vite` top | `107px` | Precise logo overlay position |
| `.vite` height | `26px` | Logo aspect ratio |
| `perspective` | `2000px` | 3D effect depth |
| Rotation angles | `300deg`, `44deg`, `39deg`, `40deg` | 3D effect calibration |
| Scale values | `1.4`, `0.8` | 3D effect sizing |

> Structural layout dimensions (width, height, top, transform) are intentionally not tokenised — they are unique to this demo's visual composition, not reusable design decisions.

## Code Example

```tsx
<div className="hero">
  <img className="base"      src={baseLogo}      alt="Base" />
  <img className="framework" src={frameworkLogo} alt="Framework" />
  <img className="vite"      src={viteLogo}      alt="Vite" />
</div>
```

```css
.hero {
  position: relative;

  .base {
    z-index: var(--z-base);
    /* ... */
  }
  .framework {
    z-index: var(--z-above);
    /* ... */
  }
  .vite {
    z-index: var(--z-base);
    /* ... */
  }
}
```

## Uses

- [Token Reference](../tokens/token-reference.md) — `--z-base`, `--z-above` z-index tokens

## Used by

_Top-of-page demo scaffold — not composed into other components._
Rendered as the first visual element in the page flow, above `#center`.
