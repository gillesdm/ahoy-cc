# Icon

## Metadata
- **Name**: Icon
- **Category**: Foundation / Display
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/icon`

## Overview

**When to use**: Wrap any SVG icon component from `@teamleader/ahoy` (or a compatible SVG) to apply a consistent color and opacity. Use Icon whenever you need a standalone decorative or informational glyph with controlled tinting.

**When not to use**: Do not use Icon for interactive affordances — use `IconButton` instead. Do not use it to wrap non-icon content.

## Anatomy

```
<span data-teamleader-ui="icon">   ← Box/span wrapper (.teal.normal etc.)
  └── {children}                   ← SVG icon element (receives opacity prop)
</span>
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-teal-darkest` | Default icon color (teal/darkest) |
| `--color-teal-dark` | Subtle icon tint |
| `--color-mint` | Brand / accent icon color |
| `--color-mint-dark` | Accent hover / active |
| `--color-ruby-dark` | Error / destructive icon |
| `--color-gold-dark` | Warning icon |
| `--color-neutral-dark` | Muted / disabled icon |
| `--color-neutral-lightest` | Inverse / on-dark icon |

Mapped via `theme.css` — color class + tint class are composed (e.g. `.teal.darkest`). Opacity is passed directly to the child SVG element via the `opacity` prop (default `0.84`).

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | SVG icon element(s) to render. Each valid React element receives the `opacity` prop. |
| `color` | `'teal' \| 'mint' \| 'neutral' \| 'ruby' \| 'aqua' \| 'violet' \| 'gold'` | `'teal'` | Color family applied as a CSS class. |
| `tint` | `'lightest' \| 'light' \| 'normal' \| 'dark' \| 'darkest'` | `'normal'` | Tint level within the color family. |
| `opacity` | `number` | `0.84` | Opacity forwarded to the child SVG. |
| `className` | `string` | — | Additional CSS class names. |
| `...others` | `BoxProps` | — | All Box layout props (display, margin, padding, etc.) are forwarded. |

## States

| State | Visual description |
|---|---|
| Default | Icon rendered at chosen color/tint with 0.84 opacity. |
| Custom color | Rendered with the resolved CSS custom property for the selected `color`+`tint` combination. |
| Reduced opacity | Pass a lower `opacity` value (e.g. `0.48`) to indicate disabled or secondary importance — callers typically manage this. |

## Code Example

```tsx
import Icon from '@teamleader/ahoy/dist/es/components/icon';
import { IconAddSmallOutline } from '@teamleader/ahoy/dist/es/assets/icons/components';

// Default teal icon
<Icon>
  <IconAddSmallOutline />
</Icon>

// Mint accent icon
<Icon color="mint" tint="dark">
  <IconAddSmallOutline />
</Icon>

// Error icon
<Icon color="ruby" tint="dark" opacity={1}>
  <IconAddSmallOutline />
</Icon>
```

## Cross-references
- `IconButton` — interactive wrapper around Icon
- `LoadingSpinner` — uses color/tint system identically
- `LoadingBar` — uses color/tint system identically
