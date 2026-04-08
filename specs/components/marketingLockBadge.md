# MarketingLockBadge

## Metadata
- **Name:** MarketingLockBadge
- **Category:** Marketing / Indicators
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingLockBadge`

## Overview
**When to use:** Use MarketingLockBadge to visually signal that a feature or menu item is locked behind an upgrade. It renders a small circular badge with a lock icon in the violet marketing palette. Commonly embedded inside `MarketingMenuItem` and `MarketingTab`.

**When not to use:** Do not use to indicate security or authentication state — this badge is strictly for upsell / feature-gating UI. Do not use in standard product navigation outside of upgrade contexts.

## Anatomy

```
┌────────────────────┐
│   ╔══╗             │
│   ║🔒║  ← lock icon (violet)
│   ╚══╝             │
└────────────────────┘
  circular wrapper
  (violet-light bg)
```

- **Root element:** `Box` with `display="flex"`, `alignItems="center"`, `justifyContent="center"`, `borderRadius="rounded"` (50%)
- **Icon:** `IconLockSmallFilled` rendered through an `Icon` wrapper in violet

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet-light` | Badge background fill |
| `--color-violet` | Lock icon color |
| `--border-radius-round` | Circle shape (50%) via `borderRadius="rounded"` |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'small' \| 'medium'` | `'medium'` | Controls badge dimensions. `small` = 18×18px; `medium` = 24×24px. |
| `className` | `string` | `undefined` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to the root Box element. |

MarketingLockBadge also accepts Box layout props (margin, padding, etc.).

## States

| State | Visual Description |
|---|---|
| Default (medium) | 24×24px circle with violet-light background, violet lock icon |
| Default (small) | 18×18px circle with same color treatment |

The badge has no interactive states — it is purely decorative/informational.

## Code Example

```tsx
import MarketingLockBadge from '@teamleader/ahoy/dist/es/components/marketingLockBadge';

// Standalone badge
<MarketingLockBadge size="medium" />

// Small variant (e.g. inside a tab)
<MarketingLockBadge size="small" marginLeft={2} />
```

## Cross-references
- `MarketingMenuItem` — embeds a `small` MarketingLockBadge as the leading element
- `MarketingTab` — embeds a MarketingLockBadge (size matches tab size) as a trailing element
- `MarketingStatusLabel` — alternative marketing indicator using a pill shape
