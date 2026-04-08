# Checkbox

## Metadata
- **Name**: Checkbox
- **Category**: Forms / Inputs
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/checkbox`

## Overview

**When to use**: Use Checkbox for binary opt-in selections (checked / unchecked) and for multi-select lists where users can pick zero or more options. Supports an indeterminate state for parent checkboxes in hierarchical lists. Provide a `label` or `children` to give the checkbox an accessible text label.

**When not to use**: Do not use Checkbox for mutually exclusive options (use `RadioButton`). Do not use for toggle actions that take immediate effect without a form submit (use a `Toggle`). Do not use without a visible label unless an `aria-label` is provided.

## Anatomy

```
┌──┐  Label text
│✓ │  ← .shape (custom checkbox control)
└──┘
     [ErrorText below when error provided]
```

Structure:
```
Box (outer wrapper, receives boxProps)
└── label.checkbox (.is-{size} .is-checked .is-disabled)
    ├── input[type=checkbox] (visually hidden, .input)
    ├── span.shape                ← visual checkbox square
    │   └── IconCheckmarkSmall / IconCheckmarkMedium (checked)
    │       IconMinusSmallOutline (indeterminate)
    └── span.label
        ├── TextSmall / TextBodyCompact / TextDisplay ← size-dependent
        └── children
ErrorText (below label, when error)
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-bg` (`--color-neutral-lightest`) | Shape background (unchecked) |
| `--color-border` (`--color-neutral-dark`) | Shape border (unchecked) |
| `--color-accent` (`--color-mint`) | Shape background (checked) |
| `--color-accent-border` (`--color-mint-dark`) | Shape border (checked) |
| `--color-error` (via `--input-error-border`) | Shape border when `error` provided |
| `--color-surface` (`--color-white`) | Checkmark icon color |
| `--color-text` (`--color-teal-darkest`) | Label text color |
| `--radius-md` (4px) | Shape border-radius |
| `--space-4` (`--spacer-small`, 12px) | Label left margin |
| `--space-1` (`--spacer-smallest`, 3px) | Label top padding for medium/large sizes |
| `--transition-border` | Background + border-color transition |
| `--duration-fast` (`--animation-duration`) | Transition duration |

Shape sizes:
| Size | Shape dimensions |
|---|---|
| `small` | 18 × 18 px |
| `medium` | 24 × 24 px |
| `large` | 30 × 30 px |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Controlled checked state |
| `indeterminate` | `boolean` | `false` | Shows minus icon; treated visually as checked (filled shape) |
| `disabled` | `boolean` | `false` | Disables interaction; reduces opacity; neutral background |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls shape size and label typography |
| `label` | `string` | — | Text label rendered inside a typography component |
| `children` | `ReactNode` | — | Additional content rendered after `label` in the label span |
| `error` | `string` | — | Error message rendered below the checkbox as `ErrorText` |
| `onChange` | `(event: ChangeEvent) => void` | — | Change handler for the hidden input |
| `onClick` | `(event: MouseEvent) => void` | — | Click handler on the label element |
| `className` | `string` | — | Additional class on the outer wrapper Box |
| `...boxProps` | `BoxProps` | — | Box layout props on the outer wrapper |
| `...inputProps` | `InputHTMLAttributes` | — | Remaining props forwarded to the hidden `<input>` (name, id, etc.) |

## States

| State | Visual description |
|---|---|
| Unchecked | White background, neutral-dark border; icon hidden (scale 0, opacity 0) |
| Unchecked hover | Neutral background, neutral-darkest border |
| Checked | Mint background, mint-dark border; checkmark icon at scale 1 |
| Checked hover | Mint-dark background, mint-darkest border |
| Indeterminate | Mint background (same as checked), minus icon shown |
| Focus (unchecked) | Neutral-darkest border + inset `box-shadow: 0 0 0 1px --color-neutral-darkest` |
| Focus (checked) | Mint-darkest border + inset box-shadow |
| Active (press) | Inset shadow `0 1px 3px 0 {darkest}` |
| Disabled | Neutral background, transparent border, neutral-dark icon color; pointer-events none |
| Error | Shape border uses `--input-error-border` (ruby); ErrorText shown below |

## Code Example

```tsx
import Checkbox from '@teamleader/ahoy/dist/es/components/checkbox';

// Basic controlled checkbox
<Checkbox
  checked={isChecked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Send me email updates"
/>

// Indeterminate (parent of partial selection)
<Checkbox
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  onChange={handleSelectAll}
  label="Select all"
  size="medium"
/>

// With error
<Checkbox
  checked={false}
  onChange={handleChange}
  label="I agree to the terms"
  error="You must accept the terms to continue"
/>

// Large size, children slot
<Checkbox size="large" checked={isChecked} onChange={handleChange}>
  <span>Custom label content</span>
</Checkbox>
```

## Cross-references
- `RadioButton` — mutually exclusive selection
- `Toggle` — immediate-effect binary switch
- `ValidationText` / `ErrorText` — error message component used internally
- `Box` — outer wrapper receiving layout props
