# MarketingRadioButton

## Metadata
- **Name:** MarketingRadioButton
- **Category:** Marketing / Form Controls
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingRadioButton`

## Overview
**When to use:** Use MarketingRadioButton for single-select option groups within marketing, upsell, or pricing surfaces — e.g. plan tier selection, billing cycle choice. Uses the violet brand color for the checked indicator instead of the standard mint.

**When not to use:** Do not use in standard product settings forms or data entry flows. Use the standard `RadioButton` component there.

## Anatomy

```
┌──────────────────────────────────────────────┐
│  ┌──────────────────┐  [children / label]    │
│  │  radio__shape    │                        │
│  │  ┌────────────┐  │                        │
│  │  │  ✓ (SVG)  │  │  ← checked: violet bg  │
│  │  └────────────┘  │  unchecked: white bg   │
│  └──────────────────┘                        │
│  <input type="radio" /> (hidden)              │
└──────────────────────────────────────────────┘
```

- **Root element:** `Box` with `display="inline-flex"`, `gap=--spacer-smaller` (6px)
- **Hidden input:** `<input type="radio">` with `display: none`; fully hidden, no visual presence
- **Shape:** `Box` 24×24px, `border-radius: 12px` (circular); neutral border when unchecked
- **Checked indicator:** SVG checkmark centered inside the shape on a violet (`#4f1fff`) background with no border
- **Label:** `children` rendered beside the shape

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token / Value | Role |
|---|---|
| `--color-neutral-dark` | Unchecked shape border |
| `--color-neutral-lightest` | Unchecked shape background |
| `#4f1fff` (violet base) | Checked shape background (hardcoded in SVG data-uri context) |
| `--spacer-smaller` (6px) | Gap between shape and label |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `undefined` | Controlled checked state. |
| `onChange` | `(event: ChangeEvent) => void` | `undefined` | Change handler. |
| `value` | `string` | `undefined` | HTML input value. |
| `name` | `string` | `undefined` | HTML input name (used to group radio buttons). |
| `id` | `string` | `undefined` | HTML input id (for external label association). |
| `children` | `ReactNode` | `undefined` | Label content rendered beside the radio shape. |
| `className` | `string` | `undefined` | Additional CSS class names. |

Note: The component does not use `forwardRef` with a return ref — `ref` is accepted by the outer Box but not forwarded to the input.

## States

| State | Visual Description |
|---|---|
| Unchecked | 24×24px circle, neutral-dark border, white fill; no checkmark |
| Checked | 24×24px circle, no border, violet (`#4f1fff`) fill with centered white SVG checkmark |
| Disabled | Not explicitly styled in theme — inherits browser defaults; apply via surrounding form logic |
| Focus | Not explicitly themed — hidden input receives focus; implement visible focus ring via wrapper if needed |

## Code Example

```tsx
import MarketingRadioButton from '@teamleader/ahoy/dist/es/components/marketingRadioButton';
import { useState } from 'react';

function PlanSelector() {
  const [plan, setPlan] = useState('pro');

  return (
    <div>
      <MarketingRadioButton
        name="plan"
        value="starter"
        checked={plan === 'starter'}
        onChange={() => setPlan('starter')}
      >
        Starter
      </MarketingRadioButton>

      <MarketingRadioButton
        name="plan"
        value="pro"
        checked={plan === 'pro'}
        onChange={() => setPlan('pro')}
      >
        Pro
      </MarketingRadioButton>
    </div>
  );
}
```

## Cross-references
- `MarketingCheckbox` — marketing-styled checkbox using the violet palette
- `RadioButton` — standard product radio button using mint palette
- `MarketingButtonGroup` — alternative segmented control for mutually exclusive selections
