# Select

## Metadata
- **Name:** Select
- **Category:** Form / Input
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/select`

## Overview
A dropdown that wraps `react-select` with Ahoy's visual language. Supports single and multi-value selection, async loading, option grouping, and a creatable variant.

**When to use:**
- Selecting one or multiple values from a predefined list
- The list is too long for radio buttons or checkboxes (> 6 items)

**When not to use:**
- 2–4 options that fit on screen — use RadioGroup or ButtonGroup
- Free-text entry — use Input

## Anatomy

```
Box[data-teamleader-ui="select"]
├── ReactSelect / ReactCreatableSelect
│     ├── ValueContainer
│     │     ├── Placeholder | SingleValue | MultiValue (Tag ×N)
│     │     └── Input
│     ├── IndicatorsContainer
│     │     ├── ClearIndicator (×IconCloseBadgedSmallFilled)
│     │     ├── LoadingIndicator (LoadingSpinner)
│     │     └── DropdownIndicator (×IconChevronDownSmallOutline)
│     └── Menu (portal)
│           └── MenuList
│                 └── Option ×N | GroupHeading + Option ×N
└── ValidationText (error | warning | success | help)
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-neutral-dark` | Default control border |
| `--color-neutral-darkest` | Focused / hovered control border + shadow ring |
| `--color-neutral-lightest` | Control background; option background (default) |
| `--color-neutral` | Disabled control background |
| `--color-neutral-light` | Focused option background |
| `--color-ruby-dark` (`--color-error`) | Error border + 1 px ring |
| `--color-gold-dark` (`--color-warning`) | Warning border + ring |
| `--color-mint-dark` (`--color-success`) | Success border + ring |
| `--color-teal-darkest` (`--color-text`) | Single value text |
| `--color-teal-dark` (`--color-text-subtle`) | Option text |
| `--color-aqua-lightest` | Selected option background |
| `--font-family-inter` | Menu portal font |
| `--unit` | Font-size scale (1.4×, 1.6× for large) |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `OptionType[]` | `[]` | Array of `{ value, label }` objects |
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Controls min-height (24/30/36/48 px) and font size |
| `isMulti` | `boolean` | — | Enables multi-value selection (renders Tags) |
| `isSearchable` | `boolean` | — | Enables typing to filter options |
| `creatable` | `boolean` | `false` | Allows creating new options via `ReactCreatableSelect` |
| `placeholder` | `string` | `'Select…'` | Placeholder text when no value is selected |
| `error` | `string \| boolean` | — | Shows error border + ring; passes string to ValidationText |
| `warning` | `string \| boolean` | — | Shows warning border + ring |
| `success` | `string \| boolean` | — | Shows success border + ring |
| `helpText` | `string` | — | Help message below the control |
| `width` | `string` | `'100%'` | CSS width of the control |
| `menuWidth` | `string` | — | Override menu portal width |
| `menuHorizontalOffset` | `number` | — | Offset the menu horizontally |
| `truncateOptionText` | `boolean` | — | Truncate option labels with ellipsis |
| `components` | `object` | — | Override internal react-select sub-components |

## States

| State | Visual Description |
|-------|--------------------|
| Default | White background, `--color-neutral-dark` border |
| Hover | Border shifts to `--color-neutral-darkest` |
| Focused | Border + 1 px ring in `--color-neutral-darkest` |
| Disabled | Background `--color-neutral`, border `--color-neutral` |
| Error | Border + 1 px ring in `--color-ruby-dark` |
| Warning | Border + 1 px ring in `--color-gold-dark` |
| Success | Border + 1 px ring in `--color-mint-dark` |
| Loading | Chevron replaced with `LoadingSpinner` |
| Multi-value | Selected items rendered as removable `Tag` chips |

## Code Example

```tsx
import Select from '@teamleader/ahoy/dist/es/components/select';

const options = [
  { value: 'prospect', label: 'Prospect' },
  { value: 'customer', label: 'Customer' },
  { value: 'supplier', label: 'Supplier' },
];

function ContactTypeSelect() {
  return (
    <Select
      options={options}
      size="medium"
      placeholder="Choose type"
      onChange={(option) => console.log(option)}
    />
  );
}
```

## Cross-references
- `RadioGroup` — small fixed option sets
- `Tag` — used to render multi-value chips inside Select
- `ValidationText` — renders error/warning/success/help below the control
- `Input` — free-text entry
