# MarketingCheckbox

## Metadata
- **Name:** MarketingCheckbox
- **Category:** Marketing / Form Controls
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingCheckbox`

## Overview
**When to use:** Use MarketingCheckbox for checkbox inputs within marketing, upsell, or feature-selection surfaces — e.g. selecting add-ons on a pricing page, opting in to a trial feature. It renders identically to the standard `Checkbox` but overrides the checked state with the violet marketing palette.

**When not to use:** Do not use in standard product forms or settings screens. Use the base `Checkbox` component there.

## Anatomy

```
┌─────────────────────────────────────────┐
│  ┌────┐  Label text                     │
│  │ ✓  │  ← checked indicator            │
│  └────┘  (violet fill when checked)     │
└─────────────────────────────────────────┘
```

- **Root:** `Checkbox` component with an appended marketing theme class
- **Check indicator:** The `<span>` adjacent to the hidden `<input>` receives violet background when checked
- **Label:** rendered via the Checkbox component's standard label slot

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet` | Checked state fill color (overrides default mint) |
| `--color-violet-dark` | Checked state border color |

All other visual properties (unchecked border, background, focus ring, label typography, spacing) inherit from the base `Checkbox` component tokens.

## Props / API

MarketingCheckbox is a thin wrapper around `Checkbox`. It accepts all props that `Checkbox` accepts.

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `undefined` | Controlled checked state. |
| `defaultChecked` | `boolean` | `undefined` | Uncontrolled initial checked state. |
| `onChange` | `(event: ChangeEvent) => void` | `undefined` | Change handler. |
| `disabled` | `boolean` | `false` | Disables the checkbox. |
| `label` | `string \| ReactNode` | `undefined` | Label displayed beside the checkbox. |
| `name` | `string` | `undefined` | HTML input name. |
| `value` | `string` | `undefined` | HTML input value. |
| `id` | `string` | `undefined` | HTML input id. |
| `className` | `string` | `undefined` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to the root element. |

## States

| State | Visual Description |
|---|---|
| Unchecked | Default Checkbox appearance — neutral border, white background |
| Checked | Violet fill (`--color-violet`) on the indicator box, `--color-violet-dark` border |
| Disabled unchecked | Muted, no interaction — inherits from base Checkbox |
| Disabled checked | Muted violet tint — inherits from base Checkbox with violet overrides |
| Hover | Inherits from base Checkbox hover styling |
| Focus-visible | Inherits from base Checkbox focus ring |

## Code Example

```tsx
import MarketingCheckbox from '@teamleader/ahoy/dist/es/components/marketingCheckbox';
import { useState } from 'react';

function AddOnSelector() {
  const [selected, setSelected] = useState(false);

  return (
    <MarketingCheckbox
      label="Include CRM add-on"
      checked={selected}
      onChange={(e) => setSelected(e.target.checked)}
    />
  );
}
```

## Cross-references
- `Checkbox` — base component; MarketingCheckbox delegates all logic to it
- `MarketingRadioButton` — marketing-styled radio input
- `MarketingMenuItem` — marketing menu item with built-in lock badge
