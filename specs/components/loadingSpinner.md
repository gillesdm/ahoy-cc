# LoadingSpinner

## Metadata
- **Name**: LoadingSpinner
- **Category**: Feedback / Loading
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/loadingSpinner`

## Overview

**When to use**: Use LoadingSpinner for inline or component-level loading states — inside buttons (via `IconButton` processing state), within cards, or as a small overlay indicator. It is the standard circular spinner in the Ahoy design system.

**When not to use**: Do not use for page-level or bar-style progress — use `LoadingBar`. Do not use for content placeholder skeletons — use `LoadingElement`.

## Anatomy

```
<div data-teamleader-ui="loading-spinner">
  ← Box (.loading-spinner .is-{color} .is-{tint} .is-{size})
  ← Rendered entirely via CSS ::before pseudo-element (border + spinning top border)
```

The visual ring is a `::before` pseudo-element with:
- Full circular border at 18% opacity of the chosen color/tint
- `border-top-color` set to the solid chosen color/tint
- CSS `spin` animation (0.6s linear infinite) applied globally

## Tokens Used

| CSS Token | Role |
|---|---|
| `--spinner-border-width` (2px) | Ring border width |
| `--small-spinner-size` (`calc(1.4 * var(--unit))` = 14px) | `size="small"` dimensions |
| `--medium-spinner-size` (`calc(2.2 * var(--unit))` = 22px) | `size="medium"` dimensions |
| `--color-teal-darkest` | Default spinner color (`color="teal" tint="darkest"`) |
| `--color-teal-darkest-hsl` / 18% | Default track ring (semi-transparent) |
| `--color-{family}-{tint}` | Active arc color |
| `--color-{family}-{tint}-hsl` / 18% | Track ring (semi-transparent background of arc) |

All color families supported: `neutral`, `mint`, `violet`, `ruby`, `gold`, `aqua`, `teal`. Each has five tints: `lightest`, `light`, `normal`, `dark`, `darkest`.

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `'teal' \| 'mint' \| 'neutral' \| 'ruby' \| 'aqua' \| 'violet' \| 'gold'` | `'teal'` | Color family for the spinner arc. |
| `tint` | `'lightest' \| 'light' \| 'normal' \| 'dark' \| 'darkest'` | `'darkest'` | Tint level within the color family. |
| `size` | `'small' \| 'medium'` | `'medium'` | Spinner diameter: 14px (small) or 22px (medium). |
| `className` | `string` | — | Additional CSS class names. |
| `...others` | `BoxProps` | — | Layout props forwarded to the Box wrapper. |

## States

| State | Visual description |
|---|---|
| Spinning (default) | Arc rotates at 0.6s linear infinite. Track ring at 18% opacity of the color. |
| Small | 14px × 14px. Used inside buttons or tight UI. |
| Medium | 22px × 22px. Standard inline spinner. |
| Custom color | Arc and track both adapt to the chosen color/tint combination. |
| White surface | Use `color="neutral" tint="lightest"` for spinners on dark backgrounds. |

## Code Example

```tsx
import LoadingSpinner from '@teamleader/ahoy/dist/es/components/loadingSpinner';

// Default (medium, teal/darkest)
<LoadingSpinner />

// Small mint spinner
<LoadingSpinner size="small" color="mint" tint="dark" />

// On dark background
<LoadingSpinner color="neutral" tint="lightest" />

// Centered in a container
<div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
  <LoadingSpinner />
</div>
```

## Cross-references
- `IconButton` — embeds LoadingSpinner when `processing={true}`
- `Button` — embeds LoadingSpinner when `processing={true}`
- `LoadingBar` — horizontal progress bar for page-level loading
- `LoadingElement` — skeleton placeholders for content areas
