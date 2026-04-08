# Radio

## Metadata
- **Name:** Radio (RadioButton + RadioGroup)
- **Category:** Form / Selection
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/radio`

## Overview
Use radio buttons when the user must choose exactly one option from a set of mutually exclusive choices. Group them with `RadioGroup` to manage shared state automatically.

**When to use:**
- 2–6 mutually exclusive options that are all visible at once
- The user needs to compare options before selecting

**When not to use:**
- More than 6 options — prefer a Select
- Independent on/off choices — use Toggle or Checkbox instead

## Anatomy

```
RadioGroup
└── RadioButton (× N)
      ├── <input type="radio">  (visually hidden)
      ├── .shape                (circular indicator)
      │     └── ::before       (inner dot — scaled in on check)
      └── .label
            └── <TextSmall | TextBodyCompact | TextDisplay>
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-neutral-lightest` | Shape background (unchecked) |
| `--color-neutral-dark` | Shape border (unchecked) |
| `--color-neutral` | Shape background on hover / disabled |
| `--color-neutral-darkest` | Shape border on hover / focus |
| `--color-mint` | Shape fill when checked |
| `--color-mint-dark` | Shape border when checked; hover fill |
| `--color-mint-darkest` | Inner dot border; focus ring |
| `--color-border` (`--color-neutral-dark`) | Default border |
| `--color-accent` (`--color-mint`) | Checked state fill |
| `--spacer-small` | Gap between shape and label |
| `--spacer-smallest` | Label top-padding for medium/large sizes |
| `--animation-duration` | Inner-dot scale transition duration |
| `--animation-curve-default` | Inner-dot scale transition easing |

## Props / API

### RadioButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether this radio is selected |
| `disabled` | `boolean` | `false` | Disables interaction and mutes appearance |
| `label` | `string` | — | Text label rendered beside the shape |
| `name` | `string` | — | HTML `name` attribute for the hidden input |
| `onChange` | `(checked: boolean, event) => void` | — | Called when the radio is clicked |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls shape size and label typography |
| `onMouseEnter` | `MouseEventHandler` | — | Forwarded to the label element |
| `onMouseLeave` | `MouseEventHandler` | — | Forwarded to the label element |
| `className` | `string` | — | Extra class names on the root label |
| `children` | `ReactNode` | — | Additional content rendered inside `.label` |

### RadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | — | The currently selected value |
| `onChange` | `(value: any, event) => void` | — | Called when selection changes |
| `disabled` | `boolean` | `false` | Disables all child RadioButtons |
| `className` | `string` | `''` | Extra class names on the wrapper Box |
| `children` | `ReactNode` | — | `RadioButton` elements (each must have a `value` prop) |

## States

| State | Visual Description |
|-------|--------------------|
| Default (unchecked) | White circle with `--color-neutral-dark` border |
| Hover (unchecked) | Shape fills with `--color-neutral`; border darkens |
| Checked | Shape fills mint; inner white dot scales in |
| Checked + hover | Shape fills `--color-mint-dark` |
| Focus-visible | 1 px inset box-shadow in `--color-neutral-darkest`; checked: mint-darkest |
| Disabled | Shape fills `--color-neutral`, transparent border; `pointer-events: none` |
| Disabled + checked | Shape still mint-lightest tinted to convey prior selection |

## Code Example

```tsx
import { RadioButton, RadioGroup } from '@teamleader/ahoy/dist/es/components/radio';

function PaymentMethod() {
  const [method, setMethod] = React.useState('card');

  return (
    <RadioGroup value={method} onChange={setMethod}>
      <RadioButton value="card" label="Credit card" />
      <RadioButton value="bank" label="Bank transfer" />
      <RadioButton value="cash" label="Cash" disabled />
    </RadioGroup>
  );
}
```

## Cross-references
- `Checkbox` — multiple independent selections
- `Toggle` — binary on/off state
- `Select` — single selection from a long list
