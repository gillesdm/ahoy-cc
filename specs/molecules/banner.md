# Banner

## Metadata
- **Name**: Banner
- **Category**: Feedback / Notifications
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/banner`

## Overview

**When to use**: Use Banner for non-modal, inline contextual messages that inform the user about a status, warning, success, or general information. Banners sit within page content (not overlaid). The `fullWidth` variant spans the full container width with only a bottom border — suitable for page-level notifications at the top of a page or section.

**When not to use**: Do not use Banner for actions requiring immediate user decision (use `Alert`). Do not use for field-level validation errors (use `ValidationText`). Do not use more than one banner per page region simultaneously.

## Anatomy

```
┌──────────────────────────────────────────────┐
│ [icon]  children content            [close]  │  ← .banner .{color}
└──────────────────────────────────────────────┘
```

Full-width variant removes border-radius and left/right/top borders:
```
──────────────────────────────────────────────── ← top of section
  [icon]  children content            [close]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ← bottom border only
```

Parts:
- **Root** — `Box` with `data-teamleader-ui="banner"`, border, background, and text color from color variant
- **Inner** — `div.inner`, flex row, align-items center
- **Icon slot** — `span.icon` with `margin-right: --spacer-small`; renders any ReactNode (typically an `Icon`)
- **Content** — `Box` with `flex: 1`; right-padding added when close button present (`paddingRight=7`)
- **Close button** — `IconButton` absolutely positioned top-right; color matches banner color (neutral for white)

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-bg` (`--color-white`) | Background for `color="white"` |
| `--color-border` (`--color-neutral`) | Border color for white/neutral variants |
| `--color-text` (`--color-teal-darkest`) | Text color for white/neutral variants |
| `--color-accent-bg` (`--color-mint-lightest`) | Background for `color="mint"` |
| `--color-accent` (`--color-mint`) | Border for `color="mint"` |
| `--color-error` (ruby-dark) | `color="ruby"` border reference |
| `--color-warning` (gold-dark) | `color="gold"` border reference |
| `--space-4` (`--spacer-small`, 12px) | Icon right margin |
| `--space-4` / `--space-5` / `--space-6` | Body padding per size (small=3→12px, medium=4→18px, large=5→24px) |
| `--radius-md` (`--border-radius-medium`) | Rounded (non-fullWidth) border-radius |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `'white' \| 'neutral' \| 'mint' \| 'violet' \| 'ruby' \| 'gold' \| 'aqua'` | `'white'` | Color variant controlling background, border, and text color |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Padding scale: small=12px, medium=18px, large=24px |
| `icon` | `ReactNode` | — | Icon element rendered in the left icon slot |
| `onClose` | `() => void` | — | When provided, renders a close IconButton in the top-right |
| `fullWidth` | `boolean` | `false` | Removes border-radius and side/top borders; only bottom border shown |
| `children` | `ReactNode` | — | Banner message content |
| `className` | `string` | — | Additional class on the root element |
| `...others` | `BoxProps` | — | Box layout props forwarded to the root |

## States

| State | Visual description |
|---|---|
| Default (white) | White background, neutral border, teal-darkest text |
| Mint | Mint-lightest background, mint border, mint-darkest text |
| Neutral | Neutral-light background, neutral border, teal-darkest text |
| Ruby (error) | Ruby-lightest background, ruby border, ruby-darkest text |
| Gold (warning) | Gold-lightest background, gold border, gold-darkest text |
| Aqua | Aqua-lightest background, aqua border, aqua-darkest text |
| Violet | Violet-lightest background, violet border, violet-darkest text |
| Full-width | No border-radius, no side/top border, bottom border only |
| Dismissible | Close IconButton rendered; content has right-padding |

## Code Example

```tsx
import Banner from '@teamleader/ahoy/dist/es/components/banner';
import { IconInfoSmallFilled } from '@teamleader/ahoy/dist/es/assets/icons/components';
import Icon from '@teamleader/ahoy/dist/es/components/icon';

// Info banner
<Banner
  color="mint"
  icon={<Icon color="mint"><IconInfoSmallFilled /></Icon>}
  onClose={handleDismiss}
>
  Your changes have been saved successfully.
</Banner>

// Warning, full-width
<Banner color="gold" fullWidth>
  Your subscription expires in 3 days.
</Banner>

// Error
<Banner color="ruby" size="small">
  Something went wrong. Please try again.
</Banner>
```

## Cross-references
- `Alert` — modal confirmation / destructive overlay
- `ValidationText` / `ErrorText` — field-level inline error
- `IconButton` — close button used internally
- `Icon` — icon slot content
