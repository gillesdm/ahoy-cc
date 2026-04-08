# MarketingButtonGroup

## Metadata
- **Name:** MarketingButtonGroup
- **Category:** Marketing / Actions
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingButtonGroup`

## Overview
**When to use:** Use MarketingButtonGroup to render a set of mutually exclusive options as a segmented control in marketing or upsell contexts. Typical use: billing period toggles (monthly / yearly), plan tier selectors on pricing pages.

**When not to use:** Do not use for independent actions that can all be triggered. For that, place individual `MarketingButton` components side-by-side. Do not use in standard product UI — use `ButtonGroup` there.

## Anatomy

```
┌──────────────────────────────────────────────┐
│ ┌──────────────┐ ┌──────────────┐ ┌────────┐ │
│ │  Button (1)  │ │  Button (2)  │ │  ...   │ │  ← .group flex container
│ └──────────────┘ └──────────────┘ └────────┘ │
│   first child:       middle:        last:     │
│   left radii         no radii       right     │
│                                    radii      │
└──────────────────────────────────────────────┘
```

- **Root element:** `Box` with `data-teamleader-ui="button-group"`, flex row
- **Children:** `MarketingButtonGroup.Button` instances (segmented button variant, not `MarketingButton`)
- **Active item:** highlighted with violet fill + white text

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet` | Active button background and border |
| `--color-neutral-lightest` | Active button text; default button background |
| `--color-neutral-light` | Default button background |
| `--color-neutral-dark` | Default button border |
| `--color-neutral-darkest` | Default button text; hover/focus border |
| `--color-neutral` | Hover button background |
| `--marketing-button-group-button-border-radius` | `calc(0.4 * var(--unit))` = 4px corner radius for first/last children |
| `--animation-duration` | Transition duration |
| `--animation-curve-fast-out-slow-in` | Transition easing |
| `--unit` | Button height/padding scale base |

## Props / API

### MarketingButtonGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `undefined` | Controlled selected value. Matches against each child's `value` prop to set `active` state. |
| `onChange` | `(value: string, event: MouseEvent) => void` | `undefined` | Callback when a button is clicked. Receives the clicked button's `value`. |
| `children` | `ReactNode` | — | Should be `MarketingButtonGroup.Button` elements. |
| `className` | `string` | `undefined` | Additional CSS class names on the group wrapper. |
| `ref` | `Ref` | — | Forwarded ref to the root Box element. |

### MarketingButtonGroup.Button

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `undefined` | Button text (alternative to `children`). |
| `value` | `string` | `undefined` | Value associated with this button; used by the parent group for selection. |
| `active` | `boolean` | `false` | Whether the button is in the selected/active state (set automatically by parent). |
| `className` | `string` | `''` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to button element. |

## States

| State | Visual Description |
|---|---|
| Default | Neutral-light background, neutral-dark border, darkest text |
| Hover | `--color-neutral` background, `--color-neutral-darkest` border |
| Focus-visible | Neutral-light bg, darkest border, 1px darkest ring |
| Active (pressed) | `--color-neutral` background, no box-shadow |
| Selected (is-active) | `--color-violet` background and border, white text; `pointer-events: none` |
| First child | Left corners rounded, no left margin offset |
| Last child | Right corners rounded |
| Middle children | No border-radius; negative left margin to collapse borders |

## Code Example

```tsx
import MarketingButtonGroup from '@teamleader/ahoy/dist/es/components/marketingButtonGroup';
import { useState } from 'react';

const { Button } = MarketingButtonGroup;

function BillingToggle() {
  const [billing, setBilling] = useState('monthly');

  return (
    <MarketingButtonGroup value={billing} onChange={(val) => setBilling(val)}>
      <Button value="monthly" label="Monthly" />
      <Button value="yearly" label="Yearly" />
    </MarketingButtonGroup>
  );
}
```

## Cross-references
- `MarketingButton` — the standalone marketing button (different visual from group buttons)
- `ButtonGroup` — standard product segmented button group
- `MarketingSplitButton` — split action + dropdown using marketing styling
