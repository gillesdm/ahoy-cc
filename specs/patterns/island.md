# Island

## Metadata
- **Name**: Island / IslandGroup
- **Category**: Layout / Containers
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/island`

## Overview

**When to use**: Use Island to group related content into a visually distinct, padded card-like container with a subtle border and rounded corners. Islands are the primary surface primitive for dashboard widgets, sidebars, and content panels.

**When not to use**: Do not use Island as a full-page layout wrapper — use `Container` or `Box` instead. Avoid deeply nesting Islands.

## Anatomy

```
<div data-teamleader-ui="island">   ← Box (borderRadius="rounded", border 1px, background)
  └── {children}
</div>

IslandGroup:
<div data-teamleader-ui="island-group">  ← Box (display flex, row or column)
  ├── <Island …>
  └── <Island …>   ← adjacent borders collapsed via borderLeftWidth/borderTopWidth=0
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-neutral-lightest` (`white`) | Default (`color="white"`) background |
| `--color-neutral-light` | Neutral background (`color="neutral"`) via `backgroundTint="light"` |
| `--color-neutral-dark` | Default border color (`borderTint="normal"` on `color="white"`) |
| `--color-mint-lightest` | Mint background |
| `--color-mint` | Mint border |
| `--color-violet-lightest` | Violet background |
| `--color-violet` | Violet border |
| `--color-ruby-lightest` | Ruby background |
| `--color-ruby` | Ruby border |
| `--color-gold-lightest` | Gold background |
| `--color-gold` | Gold border |
| `--color-aqua-lightest` | Aqua background |
| `--color-aqua` | Aqua border |
| `--color-teal-darkest` | Text color for white/neutral islands (via theme.css) |
| `--spacer-small` (12px) | `size="small"` padding (Box padding=3) |
| `--spacer-medium` (24px) | `size="medium"` padding (Box padding=4) |
| `--spacer-regular` (18px) | `size="large"` padding (Box padding=5) |
| `--border-radius-round` | `borderRadius="rounded"` |

## Props / API

### Island

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `'white' \| 'neutral' \| 'mint' \| 'violet' \| 'ruby' \| 'gold' \| 'aqua'` | `'white'` | Background and border color. `'white'` uses neutral background/border; others use their lightest background with normal-tint border. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls padding (3 / 4 / 5 = 12px / 24px / 18px). |
| `onClick` | `MouseEventHandler` | — | Makes the island interactive. |
| `className` | `string` | — | Additional CSS class names. |
| `children` | `ReactNode` | — | Island content. |
| `...others` | `BoxProps` | — | All Box props forwarded (override borderRadius, padding, etc.). |

### IslandGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout axis. Adjacent islands share borders (left/top width collapsed to 0). |
| `color` | `Island['color']` | — | Overrides `color` on all child Islands. |
| `size` | `Island['size']` | — | Overrides `size` on all child Islands. |
| `children` | `ReactNode` | — | Must be `Island` components. |
| `className` | `string` | — | Additional CSS class names. |
| `...others` | `BoxProps` | — | Layout props forwarded to the outer Box. |

## States

| State | Visual description |
|---|---|
| Default | White background, 1px neutral-dark border, rounded corners, padded. |
| Colored | Lightest background of the color family, normal-tint border. |
| Grouped horizontal | Left border of each subsequent Island removed; first/last get squared inner corners. |
| Grouped vertical | Top border of each subsequent Island removed; first/last get squared inner corners. |

## Code Example

```tsx
import Island, { IslandGroup } from '@teamleader/ahoy/dist/es/components/island';

// Standalone island
<Island size="medium">
  <p>Content goes here</p>
</Island>

// Colored island
<Island color="mint" size="small">
  <p>Highlighted content</p>
</Island>

// Horizontal group (shared borders)
<IslandGroup direction="horizontal">
  <Island>Left</Island>
  <Island>Right</Island>
</IslandGroup>

// Vertical group
<IslandGroup direction="vertical" color="neutral">
  <Island>Top</Island>
  <Island>Bottom</Island>
</IslandGroup>
```

## Cross-references
- `Box` — base layout primitive
- `MarketingBanner` — uses similar bordered surface with `borderRadius="rounded"`
- `Dialog` — modal surface container
