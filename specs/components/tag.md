# Tag

## Metadata
- **Name:** Tag
- **Category:** Data Display / Label
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/tag`

## Overview
A compact pill-shaped label used to display metadata, categories, or user-generated attributes. Optionally includes a remove button for dismissible tags in multi-value inputs or filter chips.

**When to use:**
- Displaying a list of selected values or categories on a record
- Removable chips inside multi-select inputs (Select renders these automatically)
- Filter chips in search/filter bars

**When not to use:**
- Status communication — use `StatusLabel` instead
- Numeric counts — use `Counter` or `Badge`
- Navigation — use `Link` or tabs

## Anatomy

```
Box[data-teamleader-ui="tag"] (inline-flex, pill shape)
├── UITextSmall | UITextBody | UITextDisplay
│     └── children (label text, single line with maxLines: 1)
└── IconButton.remove-button?   (×IconCloseSmallOutline, circular)
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `hsl(--color-neutral-darkest-hsl / 12%)` | Default background (no `backgroundColor` prop) |
| `hsl(--color-neutral-darkest-hsl / 12%)` | 1 px inset box-shadow (always present, provides border) |
| `--color-teal-darkest` | Default text colour |
| `--size` (18 / 24 / 30 px) | Height and border-radius (= size/2, creating full pill) |
| `--spacer-smaller` (6 px) | Horizontal text margin for small |
| `--spacer-small` (12 px) | Horizontal text margin for medium/large |

Custom colours are supported via `customBackgroundColor` and `customColor` (raw CSS values).

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Height: 18 / 24 / 30 px |
| `color` | Ahoy colour name | `'teal'` | Text (and remove icon) colour using Ahoy's colour system |
| `backgroundColor` | Ahoy colour name | — | Background using Ahoy's colour system; omit for default grey |
| `borderWidth` | `number` | — | Adds a box-sizing: content-box border |
| `customColor` | `string` | — | Raw CSS colour for text (overrides `color` prop) |
| `customBackgroundColor` | `string` | — | Raw CSS colour for background (overrides `backgroundColor` prop) |
| `onRemoveClick` | `(event) => void` | — | When provided, shows the circular remove `IconButton` |
| `onRemoveMouseDown` | `(event) => void` | — | Forwarded to remove button |
| `onRemoveMouseUp` | `(event) => void` | — | Forwarded to remove button |
| `removeElement` | `string \| ComponentType` | — | Root element override for the remove button |
| `className` | `string` | — | Extra class names |
| `children` | `ReactNode` | — | Tag label text |

## States

| State | Visual Description |
|-------|--------------------|
| Default | Semi-transparent grey pill; single-line text |
| With remove button | Circular `×` button appended to the right |
| Custom colour | Background and/or text use custom CSS colour values |
| Max lines = 1 | Text truncated with ellipsis when too long |

## Code Example

```tsx
import Tag from '@teamleader/ahoy/dist/es/components/tag';

// Simple tag
<Tag size="medium">Engineering</Tag>

// Removable tag (e.g. in a filter bar)
<Tag
  size="medium"
  onRemoveClick={() => removeFilter('engineering')}
>
  Engineering
</Tag>

// Coloured tag
<Tag
  size="small"
  backgroundColor="mint"
  color="mint"
>
  Active
</Tag>
```

## Cross-references
- `Select` — renders removable `Tag` chips for multi-value selections
- `StatusLabel` — status pill (no remove action, semantic colours)
- `Counter` — numeric count pill
- `IconButton` — used for the remove button inside Tag
