# LoadingBar

## Metadata
- **Name**: LoadingBar
- **Category**: Feedback / Loading
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/loadingBar`

## Overview

**When to use**: Use LoadingBar to communicate indeterminate progress — page loads, data fetching, or background operations where completion time is unknown. It renders as a horizontal bar with a sliding indicator animation.

**When not to use**: Do not use for determinate progress (known percentage) — there is no progress value prop; the animation is always infinite. For inline or button-level loading, use `LoadingSpinner` instead.

## Anatomy

```
<div data-teamleader-ui="loading-bar">   ← Box (.loading-bar .is-{color} .is-{size} .is-{tint})
  └── <div class="loading-bar-indicator">  ← Sliding indicator (20% width, animates slide-out)
```

The indicator animates via `@keyframes slide-out` — translates from off-screen left to off-screen right (`translate3d(650%, 0, 0)`) over `calc(var(--animation-duration) * 3)` (≈ 1.05s) with `ease infinite`.

## Tokens Used

| CSS Token | Role |
|---|---|
| `--animation-duration` (0.35s) | Animation duration base; bar uses `× 3 = 1.05s` |
| `--spacer-unit` (3px) | `size="small"` height (1 × 3px = 3px) |
| `calc(--spacer-unit * 2)` (6px) | `size="medium"` height |
| `calc(--spacer-unit * 3)` (9px) | `size="large"` height |
| `--color-mint` | Default indicator color (`color="mint" tint="normal"`) |
| `--color-mint-hsl` / 18% | Default track background (semi-transparent mint) |
| `--color-{family}-{tint}` | Indicator color for each color/tint combination |
| `--color-{family}-{tint}-hsl` / 18% | Track background (18% opacity of chosen tint) |

All color families supported: `mint`, `neutral`, `violet`, `ruby`, `gold`, `aqua`, `teal`. Each has five tints: `lightest`, `light`, `normal`, `dark`, `darkest`.

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `'mint' \| 'neutral' \| 'violet' \| 'ruby' \| 'gold' \| 'aqua' \| 'teal'` | `'mint'` | Color family for both track and indicator. |
| `tint` | `'lightest' \| 'light' \| 'normal' \| 'dark' \| 'darkest'` | `'normal'` | Tint level within the color family. |
| `size` | `'small' \| 'medium' \| 'large'` | `'small'` | Track height: 3px / 6px / 9px. |
| `className` | `string` | — | Additional CSS class names. |
| `...others` | `BoxProps` | — | Layout props forwarded to the outer Box (e.g. `width`, `marginBottom`). |

## States

| State | Visual description |
|---|---|
| Loading (default) | Sliding indicator animates left-to-right infinitely over a semi-transparent track. |
| Mint (default) | Mint indicator on 18%-opacity mint track. |
| Custom color/tint | Indicator uses solid chosen tint color; track uses 18%-opacity of that tint. |

## Code Example

```tsx
import LoadingBar from '@teamleader/ahoy/dist/es/components/loadingBar';

// Default mint, small
<LoadingBar />

// Medium height, teal
<LoadingBar color="teal" tint="darkest" size="medium" />

// Full-width page loader
<LoadingBar
  color="mint"
  size="small"
  style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
/>
```

## Cross-references
- `LoadingSpinner` — circular spinner for inline/button loading states
- `LoadingElement` — skeleton/placeholder shimmer for content areas
