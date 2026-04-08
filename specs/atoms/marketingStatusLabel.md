# MarketingStatusLabel

## Metadata
- **Name:** MarketingStatusLabel
- **Category:** Marketing / Indicators
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingStatusLabel`

## Overview
**When to use:** Use MarketingStatusLabel to display a short status or badge label (e.g. "Pro", "New", "Beta", "Upgrade") within marketing or upsell contexts. It renders as a pill with a violet-light background and an inset violet-light border. An optional icon can be appended.

**When not to use:** Do not use for operational statuses (success, error, warning) in product UI. Use the standard `StatusLabel` or `Badge` components for those.

## Anatomy

```
┌────────────────────────────────────┐
│  [label text]  [optional icon]     │  ← pill wrapper (inline-flex)
└────────────────────────────────────┘
   height: 18px (small) or 24px (medium)
   border-radius = height (full pill)
```

- **Root element:** `Box` with `display` = `inline-flex` (or `flex` if `fullWidth=true`), `alignItems="center"`, `justifyContent="center"`, `paddingHorizontal={2}`
- **Text:** `UITextSmall` (size=small) or `UITextBody` (size=medium), violet color
- **Icon:** optional `Icon` with violet color, `marginLeft={2}`

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet-lightest` | Pill background fill |
| `--color-violet-light` | Inset border ring: `inset 0 0 0 1px var(--color-violet-light)` |
| `--color-violet` | Text and icon color |
| `--size` (CSS custom property) | Drives both `height` and `border-radius`; set to 18px (small) or 24px (medium) |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Label text content. |
| `size` | `'small' \| 'medium'` | `'medium'` | Controls height and text size. `small`=18px/UITextSmall; `medium`=24px/UITextBody. |
| `fullWidth` | `boolean` | `false` | Stretches the label to 100% container width (`display: flex`). |
| `icon` | `ReactNode` | `undefined` | Optional icon rendered after the text with `marginLeft={2}`. |
| `className` | `string` | `undefined` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to the root Box element. |

MarketingStatusLabel also accepts Box layout props (margin, etc.).

## States

| State | Visual Description |
|---|---|
| Default (medium) | 24px tall full-pill, violet-lightest bg, violet-light inset border, violet text |
| Default (small) | 18px tall full-pill, same color treatment, smaller typography |
| Full-width | Expands to fill container, content centered |
| With icon | Icon appended after text with 6px left margin |

The component has no interactive states — it is read-only.

## Code Example

```tsx
import MarketingStatusLabel from '@teamleader/ahoy/dist/es/components/marketingStatusLabel';
import { IconStarSmallFilled } from '@teamleader/ahoy/dist/es/assets/icons/components';

// Simple status badge
<MarketingStatusLabel>Pro</MarketingStatusLabel>

// Small variant
<MarketingStatusLabel size="small">New</MarketingStatusLabel>

// With icon
<MarketingStatusLabel icon={<IconStarSmallFilled />}>
  Premium
</MarketingStatusLabel>

// Full-width in a container
<MarketingStatusLabel fullWidth size="medium">
  Upgrade required
</MarketingStatusLabel>
```

## Cross-references
- `MarketingLockBadge` — circular lock icon badge for feature-gating
- `MarketingMarker` — inline text highlight for marketing copy
- `StatusLabel` — standard product status pill (uses mint/ruby/gold palette)
