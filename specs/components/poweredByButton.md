# PoweredByButton

## Metadata
- **Name:** PoweredByButton
- **Category:** Branding / Navigation
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/poweredByButton`

## Overview
**When to use:** Use `PoweredByButton` to display a Teamleader "Powered by" attribution button — typically at the bottom of white-label pages, embedded widgets, or client-facing views. It renders as an anchor tag linking to `https://www.teamleader.eu` in a new tab.

**When not to use:** Do not use for general navigation or call-to-action buttons. Do not modify the link target — it must point to the Teamleader website.

## Anatomy

```
┌─ PoweredByButton (shape="pill") ───────────────────────┐
│  <a href="https://www.teamleader.eu" target="_blank">  │
│    <TextSmall>Powered by </TextSmall>                  │
│    <Icon> [Teamleader wordmark SVG]  </Icon>           │
│    <Icon> [Teamleader logomark SVG] </Icon>            │
│  </a>                                                  │
└────────────────────────────────────────────────────────┘

shape="box":
┌─────────┐
│  <a>    │
│  [logo] │  54×54px square
└─────────┘
```

Parts:
- **Anchor** — `<a>` element opening `href` in `_blank` with `rel="noopener noreferrer"`
- **"Powered by" text** — `TextSmall` with non-breaking space
- **Wordmark** — Teamleader text logo SVG (78×12) — hidden when `label="logo-only"`
- **Logomark** — Teamleader icon/diamond SVG (25×18) — hidden when `label="text-only"`
- **Box shape** — only the larger logomark SVG (39×27) at fixed 54×54px

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-text` (`--color-black`) | Text and icon colour for `tint="dark"` |
| `--color-surface` (`--color-white`) | Text and icon colour for `tint="light"` |
| `--radius-md` (`--border-radius-medium`) | Base border radius |
| `--radius-round` (pill = `calc(6 * var(--unit))` = 60px) | Pill shape border radius |
| `--space-2` (`--spacer-smaller`, 6px) | Pill vertical padding |
| `--space-4` (`--spacer-small`, 12px) | Pill horizontal padding |
| `--duration-fast` (`--animation-duration`) | Background-color transition |
| `--easing-enter` (`--animation-curve-fast-out-slow-in`) | Transition easing |

### Tint background colours

| Tint | Background | Hover |
|------|-----------|-------|
| `dark` | `hsl(black / 10%)` | `hsl(black / 20%)` |
| `light` | `hsl(white / 20%)` | `hsl(white / 40%)` |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tint` | `'dark' \| 'light'` | `'dark'` | Colour scheme — `dark` for light backgrounds, `light` for dark backgrounds |
| `shape` | `'pill' \| 'box'` | `'pill'` | `pill` renders text + logos inline; `box` renders logomark only at 54×54px |
| `label` | `'text-and-logo' \| 'logo-only' \| 'text-only'` | `'text-and-logo'` | Controls which parts of the pill are shown |
| `href` | `string` | `'https://www.teamleader.eu'` | Override the link target (rarely needed) |
| `children` | `ReactNode` | — | Custom content replacing the default "Powered by" text+logos |
| `className` | `string` | — | Additional CSS classes |
| `ref` | `Ref<HTMLAnchorElement>` | — | Forwarded ref to the anchor element |
| `...rest` | `HTMLAnchorProps` | — | Any standard anchor attributes |

## States

| State | Visual description |
|-------|--------------------|
| Default (dark, pill) | Translucent black (10%) pill with "Powered by" + wordmark + logomark |
| Default (light, pill) | Translucent white (20%) pill — for placement on dark backgrounds |
| Hover | Background opacity increases (20% / 40%) |
| Focus-visible | 2px outline with 2px offset |
| `shape="box"` | 54×54px square with only the large logomark, transparent background |
| `label="logo-only"` | Pill without the "Teamleader" wordmark text |
| `label="text-only"` | Pill without the logomark diamond icon |

## Code Example

```tsx
import PoweredByButton from '@teamleader/ahoy/dist/es/components/poweredByButton';

// Standard pill on a light background
<PoweredByButton tint="dark" />

// On a dark/coloured background
<PoweredByButton tint="light" />

// Logo-only pill
<PoweredByButton tint="dark" label="logo-only" />

// Box shape (icon only, square)
<PoweredByButton shape="box" tint="dark" />
```

## Cross-references
- `button` — general-purpose button component
- `link` — for non-branded external links
