# Badge

## Metadata
- **Name**: Badge
- **Category**: Data Display / Labels
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/badge`

## Overview

**When to use**: Use Badge to label, categorize, or tag content with a short text string. Badges can be purely informational or interactive (clickable). Use the `icon` prop to pair an icon with the label. Badges support selection state for multi-select tag pickers.

**When not to use**: Do not use Badge as a primary action button. Do not use for numerical counts / notifications (use `Counter`). Do not use for status indicators that need color semantics (use `Bullet` + text or a semantic tag component).

## Anatomy

```
┌────────────────────────────────┐
│ [icon-left]  label  [icon-right]│  ← .badge (.is-{size})
└────────────────────────────────┘
```

Parts:
- **Root element** — `Box` rendered as `div` by default, or `button` when `onClick` is provided (or overridden via `element`)
- **Icon** (optional) — `Icon` wrapper with `color="teal" tint="darkest"`, placed left or right of the label
- **Label** — `UITextSmall` (small), `UITextBody` (medium), `UITextDisplay` (large); truncated with ellipsis

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-text` (`--color-teal-darkest`) | Label and icon color |
| `--color-neutral` (12% tint) | Default background and border |
| `--color-border` | Default border (`hsl(--color-neutral-darkest-hsl / 12%)`) |
| `--radius-md` (`--border-radius-medium`, ~4px = `0.4 * --unit`) | Badge corner radius |
| `--space-2` (`--spacer-smaller`, 6px) | Gap between icon and label |
| `--space-2` (`--spacer-smaller`) | Horizontal padding (`paddingHorizontal=2`) |
| `--transition-border` | Background-color transition on hover/active |
| `--duration-fast` (`--animation-duration`, 0.35s) | Transition duration |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls height (18/24/30 px) and label typography |
| `icon` | `ReactNode` | — | Icon element rendered inside an `Icon` wrapper |
| `iconPlacement` | `'left' \| 'right'` | `'left'` | Side of the label where the icon appears |
| `disabled` | `boolean` | `false` | Reduces opacity to 0.48 and disables pointer events |
| `selected` | `boolean` | `false` | Increases background opacity (24%) |
| `onClick` | `(event) => void` | — | When provided, renders as a `button` element and enables hover/active states |
| `element` | `string` | `'div'` / `'button'` | Override the root HTML element |
| `children` | `ReactNode` | — | Label content |
| `className` | `string` | — | Additional class on the root element |
| `...others` | `BoxProps` | — | Box layout props forwarded to the root |

## States

| State | Visual description |
|---|---|
| Default | Neutral 12% background, neutral 12% border, teal-darkest text |
| Hover (clickable) | Background deepens to neutral 18% |
| Focus-visible (clickable) | Border darkens to neutral 24%, double border ring via `box-shadow` |
| Active (clickable) | Inset shadow + neutral 18% background |
| Selected | Background neutral 24% (forced with `!important`) |
| Disabled | Opacity 0.48, pointer-events none |

## Code Example

```tsx
import Badge from '@teamleader/ahoy/dist/es/components/badge';
import { IconTagSmallFilled } from '@teamleader/ahoy/dist/es/assets/icons/components';

// Informational
<Badge size="medium">Design</Badge>

// With icon
<Badge icon={<IconTagSmallFilled />} iconPlacement="left">
  Labeled
</Badge>

// Clickable + selectable
<Badge
  size="small"
  selected={isSelected}
  onClick={() => toggleTag(id)}
>
  React
</Badge>

// Disabled
<Badge disabled>Archived</Badge>
```

## Cross-references
- `Counter` — numerical notification badge
- `Bullet` — color dot status indicator
- `BadgedLink` — inline interactive link with badge styling
- `Button` — primary action element
