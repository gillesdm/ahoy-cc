# MarketingSplitButton

## Metadata
- **Name:** MarketingSplitButton
- **Category:** Marketing / Actions
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingSplitButton`

## Overview
**When to use:** Use MarketingSplitButton when you need a primary marketing CTA combined with a dropdown of alternative actions — e.g. "Upgrade now" with additional plan options in the dropdown. Uses `MarketingButton` for both the main button and the chevron toggle, rendering in the violet marketing palette.

**When not to use:** Do not use in standard product toolbars or command surfaces. Use the standard `SplitButton` for those. Do not use when there is only one action — use `MarketingButton` directly.

## Anatomy

```
┌──────────────────────────────────────┐
│  ┌─────────────────────┐ ┌────────┐  │
│  │  [label from first  │ │   ⌄   │  │  ← ButtonGroup (segmented)
│  │   MenuItem]         │ │chevron │  │
│  └─────────────────────┘ └────────┘  │
└──────────────────────────────────────┘
         ↓ on chevron click
┌──────────────────────────────────────┐
│  Popover                             │
│  ┌────────────────────────────────┐  │
│  │  Menu                         │  │
│  │  ├─ MenuItem (skips first)    │  │
│  │  ├─ MenuItem                  │  │
│  │  └─ ...                       │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

- **Root:** `BaseSplitButton` render-prop component managing popover state
- **Main button:** `MarketingButton` with `level` and `size`, label = first `MenuItem`'s label
- **Chevron button:** `MarketingButton` with `IconChevronDownSmallOutline` icon only
- **Both buttons:** wrapped in `ButtonGroup segmented`; 0px margin between them for primary, -1px for secondary to collapse borders
- **Popover:** `Popover` with `position="start"`, no backdrop; contains standard `Menu` with `MenuItem` children
- **Processing state:** single full-width `MarketingButton` with extra right padding (size-dependent) replaces the group

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy. All tokens are inherited from `MarketingButton`.

| CSS Token | Role |
|---|---|
| `--color-violet` | Primary button fill; secondary border and text |
| `--color-violet-dark` | Hover states |
| `--color-violet-light` | Focus ring and active shadows |
| `--color-neutral-lightest` | Primary button text |
| `--border-radius-medium` | Button corner radius |
| `--animation-duration` | Transition duration |
| `--box-shadow-200` / `--elevation-2` | Popover shadow (via Popover) |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | `MenuItem` elements. The first item's `label` becomes the main button label and is excluded from the dropdown. |
| `level` | `'primary' \| 'secondary'` | `'primary'` | Visual level applied to both buttons. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size applied to both buttons. |
| `disabled` | `boolean` | `undefined` | Disables both buttons. |
| `processing` | `boolean` | `undefined` | Shows a single processing button; hides the split group. |
| `onButtonClick` | `(event: MouseEvent) => void` | `undefined` | Called when the main (label) button is clicked. |
| `onSecondaryButtonClick` | `(event: MouseEvent) => void` | `undefined` | Called when the chevron button is clicked (before popover opens). |
| `popoverProps` | `object` | `undefined` | Additional props spread onto the `Popover` component. |
| `ref` | `Ref` | — | Forwarded ref to the root element. |

### Processing padding offsets (theme.css)

| Size | Extra right padding |
|---|---|
| `small` | 42px |
| `medium` | 47px |
| `large` | 65px |

## States

| State | Visual Description |
|---|---|
| Default (primary) | Two violet-filled buttons side by side with 0px gap |
| Default (secondary) | Two outlined violet buttons with collapsed -1px margin |
| Hover | Buttons respond to MarketingButton hover states independently |
| Disabled | Both buttons disabled (muted colors) |
| Processing | Single MarketingButton with spinner; extra right padding accommodates spinner position |
| Popover open | Chevron button triggers Popover; first MenuItem excluded from list |
| Popover closed | Popover hidden; normal split button appearance |

## Code Example

```tsx
import MarketingSplitButton from '@teamleader/ahoy/dist/es/components/marketingSplitButton';
import { MenuItem } from '@teamleader/ahoy/dist/es/components/menu';

<MarketingSplitButton
  level="primary"
  size="medium"
  onButtonClick={() => handleUpgrade('pro')}
>
  <MenuItem label="Upgrade to Pro" />
  <MenuItem label="Upgrade to Business" onClick={() => handleUpgrade('business')} />
  <MenuItem label="View all plans" onClick={() => openPricingPage()} />
</MarketingSplitButton>
```

## Cross-references
- `MarketingButton` — the button building block used inside the split
- `SplitButton` — standard product split button using mint palette
- `BaseSplitButton` — shared stateful base (popover open/close logic)
- `MarketingButtonGroup` — for segmented option selection (no dropdown)
- `Popover` — the dropdown layer
- `Menu` / `MenuItem` — standard menu items used inside the popover
