# FilterSelection

## Metadata
- **Name:** FilterSelection
- **Category:** Form / Filters
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/filterSelection`

## Overview
**When to use:** Use FilterSelection as an interactive filter chip/pill in filter bars. It represents a single filterable dimension (e.g., "Status", "Assignee", "Date range") and visually communicates whether a filter is default, active, focused, invalid, broken, or disabled. When applied, it can show a count badge and a clear (✕) button.

**When not to use:** Do not use FilterSelection as a general button or toggle. It is specifically designed for filter bar contexts where each chip corresponds to a filterable attribute. For multi-select option lists use `Select`.

## Anatomy

```
Default (unapplied):
┌──────────────────────────────────────────┐
│  [label text]                    [▾]     │  ← .select-control (height 36px, border-radius rounded)
└──────────────────────────────────────────┘

Active / applied with amount + clear:
┌─────────────────────────────────────────────────┐
│  [label] [valueLabel]  •  ┌──[+3][✕]──┐  [▾]   │
│                           └───────────┘         │
└─────────────────────────────────────────────────┘

Aggregate (isAggregate=true): replaces dropdown chevron with filter icon on the left
┌──────────────────────────────────────────┐
│  [⚙ filter icon] [label text]            │  ← no dropdown chevron
└──────────────────────────────────────────┘

Dropdown chevron rotates 180° when status="focused".
```

**Color mapping by status:**

| Status | Border/bg family | Background tint |
|---|---|---|
| `default` | neutral | — |
| `active` | aqua | light |
| `focused` | aqua | light |
| `disabled` | neutral | — |
| `invalid` | gold | lightest |
| `broken` | ruby | lightest |

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-neutral-dark` | Amount badge background (default status) |
| `--color-aqua` | Amount badge background (active/focused) |
| `--color-aqua-light` | Hover background (default status hover) |
| `--color-aqua-darkest` | Hover text color |
| `--color-gold-light` | Amount badge background (invalid) |
| `--color-ruby-light` | Amount badge background (broken) |
| `--color-neutral` (border, `borderTint: normal`) | Default border |
| `--color-aqua-darkest` (border, `borderTint: darkest`) | Active/focused border |
| `--color-gold-dark` (border, `borderTint: dark`) | Invalid border |
| `--color-ruby-dark` (border, `borderTint: dark`) | Broken border |
| `height: 36px` | Control height |
| `padding: 7px 10px` | Control inner padding |
| `borderWidth: 2` | All-sides border |
| `borderRadius: "rounded"` | Pill-shaped corners |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Dimension label (e.g., "Status") — always visible |
| `valueLabel` | `string` | — | Currently applied value label (e.g., "Active") |
| `status` | `'default' \| 'active' \| 'focused' \| 'disabled' \| 'invalid' \| 'broken'` | `'default'` | Visual state of the filter chip |
| `applied` | `boolean` | `false` | Whether the filter has been applied; shows amount badge and clear button when `true` |
| `amountApplied` | `number \| null` | `null` | Count of applied values shown as a badge (requires `applied=true`) |
| `amountTooltip` | `string` | — | Tooltip shown on the amount badge area |
| `modificationText` | `string \| null` | `null` | When set (non-null string), shows a modification indicator (`•`) and wraps in a tooltip showing this text |
| `onClick` | `() => void` | `() => {}` | Called when the chip is clicked (not fired when `status="disabled"`) |
| `onClearClick` | `() => void` | — | When provided, renders a ✕ icon button in the amount badge area to clear the filter |
| `isAggregate` | `boolean` | — | Shows a filter icon on the left instead of a dropdown chevron on the right |
| `maxWidth` | `number \| string` | — | CSS max-width for the label/value container (truncation) |
| `className` | `string` | — | Additional CSS class names |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

> The exported `STATUS` constant provides the string literals: `STATUS.ACTIVE`, `STATUS.DEFAULT`, `STATUS.DISABLED`, `STATUS.FOCUSED`, `STATUS.INVALID`, `STATUS.BROKEN`.

## States

| State | Visual Description |
|---|---|
| `default` | Neutral border, teal text; hover shifts to aqua-light background |
| `active` | Aqua-darkest border, aqua-light background, aqua text |
| `focused` | Same as active + chevron rotated 180° |
| `disabled` | Neutral border, neutral-dark text, `cursor: default`, no click handler |
| `invalid` | Gold-dark border, gold-lightest background, gold text |
| `broken` | Ruby-dark border, ruby-lightest background, ruby text |
| With clear | Amount badge shows count, ✕ icon clears filter |
| Modified | `•` appended to value label; tooltip on hover shows `modificationText` |

## Code Example

```tsx
import FilterSelection, { STATUS } from '@teamleader/ahoy/dist/es/components/filterSelection';

// Default — no filter applied
<FilterSelection
  label="Status"
  status={STATUS.DEFAULT}
  onClick={() => openFilterMenu('status')}
/>

// Active — filter applied with 2 values selected, clearable
<FilterSelection
  label="Status"
  valueLabel="Active"
  status={STATUS.ACTIVE}
  applied
  amountApplied={2}
  onClearClick={() => clearFilter('status')}
  onClick={() => openFilterMenu('status')}
/>

// Invalid filter (e.g., referenced value was deleted)
<FilterSelection
  label="Assignee"
  valueLabel="Deleted user"
  status={STATUS.INVALID}
  modificationText="This user no longer exists"
  applied
  onClick={() => openFilterMenu('assignee')}
/>

// Disabled
<FilterSelection
  label="Category"
  status={STATUS.DISABLED}
/>
```

## Cross-references
- `Tooltip` — used internally to wrap the chip when `modificationText` or `amountTooltip` is set
- `Icon` — used for the filter icon (aggregate) and dropdown chevron
- `Heading4` / `TextBodyCompact` / `Monospaced` — typography used inside the chip
- `Select` — for dropdown-based filter value selection panels
