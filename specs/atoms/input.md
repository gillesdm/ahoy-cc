# Input

## Metadata
- **Name:** Input
- **Category:** Atom
- **Status:** Stable
- **Import:** `import Input from '@teamleader/ahoy/dist/es/components/input'`

## Overview

**When to use:** Use Input for single-line text entry — names, emails, search queries, and other short free-form values. Variants include numeric inputs (with steppers), time inputs, duration inputs, and multiline `Textarea`.

**When not to use:** Do not use for multi-line content — use the `Textarea` variant. Do not use for structured selection — use `Select` or `Checkbox` instead.

## Anatomy

```
<div class="wrapper has-focus? has-error? is-disabled? is-inverse?">
  <div class="input-wrapper">
    [connectedLeft]
    <div class="input-inner-wrapper">
      [prefix-wrapper]
        └── prefix content
      <input class="input is-{size} is-inverse? is-bold?">
      [suffix-wrapper]
        └── suffix content
    </div>
    [connectedRight]
  </div>
  <ValidationText error help success warning />
</div>
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-neutral-dark` | Default border color |
| `--color-neutral-darkest` | Hover / focus border color |
| `--color-neutral` | Disabled / read-only background and border |
| `--color-white` | Default input background |
| `--color-teal-darkest` | Input text color |
| `--color-neutral-darkest` | Placeholder text color |
| `--input-error-border` (`--color-ruby-dark`) | Error state border + shadow |
| `--input-success-border` (`--color-mint-dark`) | Success state border + shadow |
| `--input-warning-border` (`--color-gold-dark`) | Warning state border + shadow |
| `--input-border-radius` (`calc(0.4 * var(--unit))` = 4px) | Corner radius |
| `--input-height-medium` (`calc(3.4 * var(--unit))` = 34px) | Default height |
| `--input-height-large` (`calc(4.6 * var(--unit))` = 46px) | Large height |
| `--input-height-small` (`calc(2.8 * var(--unit))` = 28px) | Small height |
| `--input-height-tiny` (`calc(2.2 * var(--unit))` = 22px) | Tiny height |
| `--input-text-size` (`calc(1.4 * var(--unit))` = 14px) | Default font size |
| `--font-family-inter` | Input typeface |
| `--color-teal` | Inverse background |
| `--color-teal-light` | Inverse hover/focus border |
| `--color-teal-dark` | Inverse disabled background |
| `--color-neutral-lightest` | Inverse text color |

Transitions: `0.3s ease-in-out border, 0.3s ease-in-out box-shadow`

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Controlled value. Uncontrolled when omitted. |
| `onChange` | `(event, value: string) => void` | — | Change handler; receives both the synthetic event and the string value. |
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Controls height and font size. |
| `disabled` | `boolean` | `false` | Disables all interaction. |
| `readOnly` | `boolean` | `false` | Prevents editing; renders same visual as disabled but allows text selection. |
| `inverse` | `boolean` | `false` | Dark/teal background variant for use on dark surfaces. |
| `bold` | `boolean` | — | Renders input text at `font-weight: 500`. |
| `textAlignRight` | `boolean` | — | Right-aligns input text (useful for numeric inputs). |
| `prefix` | `ReactNode \| ReactNode[]` | — | Content rendered before the input field (inside the border). |
| `suffix` | `ReactNode \| ReactNode[]` | — | Content rendered after the input field (inside the border). |
| `connectedLeft` | `ReactNode` | — | Element connected flush to the left edge of the wrapper (shares border). |
| `connectedRight` | `ReactNode` | — | Element connected flush to the right edge of the wrapper (shares border). |
| `error` | `string \| boolean` | — | Error message shown in ValidationText; applies error border. |
| `success` | `string \| boolean` | — | Success message; applies success border. |
| `warning` | `string \| boolean` | — | Warning message; applies warning border. |
| `helpText` | `string` | — | Neutral helper text shown below the input. |
| `width` | `string \| number` | — | Explicit width for the inner wrapper. |
| `noInputStyling` | `boolean` | — | Suppresses hover cursor override (used internally for read-only numeric inputs). |
| `type` | `string` | `'text'` | HTML input type. |
| `placeholder` | `string` | — | Placeholder text. |
| `onFocus` | `FocusEventHandler` | — | Focus event handler. |
| `onBlur` | `FocusEventHandler` | — | Blur event handler. |
| `element` | `'input' \| 'textarea'` | `'input'` | Underlying element (used by Textarea variant). |
| `...others` | `BoxProps` | — | Layout props forwarded to the wrapper Box. |

## States

| State | Visual description |
|---|---|
| Default | White background, `--color-neutral-dark` border. |
| Hover | Border changes to `--color-neutral-darkest`. |
| Focus | Border `--color-neutral-darkest` + `box-shadow: 0 0 0 1px --color-neutral-darkest`. |
| Active | Border `--color-neutral-darkest` + inset shadow `0 1px 3px 0 rgba(130,130,140,.48)`. |
| Disabled | Background + border both `--color-neutral`, no shadow, pointer events off. |
| Read-only | Same visual as disabled for the wrapper; stepper hidden. |
| Error | Border + 1px ring in `--color-ruby-dark`. |
| Success | Border + 1px ring in `--color-mint-dark`. |
| Warning | Border + 1px ring in `--color-gold-dark`. |
| Inverse default | Teal background and border. |
| Inverse focus | `--color-teal-light` border + ring. |
| Inverse disabled | `--color-teal-dark` background and border. |

## Code Example

```tsx
import Input from '@teamleader/ahoy/dist/es/components/input';

// Basic uncontrolled
<Input placeholder="Enter a value" />

// Controlled with validation
<Input
  value={name}
  onChange={(event, value) => setName(value)}
  error={name.length === 0 ? 'Name is required' : undefined}
/>

// With prefix and suffix
<Input
  prefix={<span>€</span>}
  suffix={<span>per unit</span>}
  size="large"
  textAlignRight
/>

// Inverse (dark surface)
<Input inverse placeholder="Search…" />
```

## Uses

- `ValidationText` — rendered internally for error / success / warning / help states
- `Label` — paired externally for accessible form fields (not composed internally)
- [Color](../foundations/color.md) — Layer 1 palette tokens for border, background, and text
- [Typography](../foundations/typography.md) — `--font-family-inter` for input typeface
- [Radius](../foundations/radius.md) — `--radius-md` (via Ahoy's `--input-border-radius`)
- [Motion](../foundations/motion.md) — border and shadow transitions

## Used by

_No product-level composed components depend on Input in the current demo app._
Pair with `Label` and a wrapping layout component when building forms.
