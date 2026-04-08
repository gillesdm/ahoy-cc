# LabelValuePair

## Metadata
- **Name**: LabelValuePair / LabelValuePairGroup
- **Category**: Data Display
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/labelValuePair`

## Overview

**When to use**: Use LabelValuePair to display read-only key/value data — contact details, record metadata, invoice fields, and similar structured information. LabelValuePairGroup adds an optional heading above a set of pairs.

**When not to use**: Do not use for editable form fields — use `Label` + `Input` instead. Do not use for tabular data with sorting — use `Datagrid`.

## Anatomy

```
<div data-teamleader-ui="label-value-pair">   ← Box (flexDirection: row|column, marginBottom)
  ├── <LabelValuePair.Label>                  ← Heading5, flex "0 0 40%" (inline) or 1 (stacked)
  │     label text (max 2 lines)
  └── <LabelValuePair.Value>                  ← Box flex=1, overflow hidden, justifyContent
        value content

LabelValuePairGroup:
<div data-teamleader-ui="label-value-pair-group">
  ├── <Heading4 color="neutral" marginBottom=2>  ← Group title
  └── {children}                                 ← LabelValuePair items
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-teal-darkest` | Label text color (via Heading5 teal/darkest) |
| `--font-weight-semibold` (600) | Heading5 label weight |
| `--font-size-xs` (12px) | Heading5 font size |
| `--color-neutral` | Group title color (Heading4 neutral) |
| `--font-weight-bold` (700) | Heading4 font weight, uppercase |
| `--spacer-smallest` (3px) | `marginBottom` for inline pairs (Box spacing=1) |
| `--spacer-regular` (18px) | `marginBottom` for stacked pairs (Box spacing=3) |
| `--spacer-smaller` (6px) | Label margin-right in inline mode (Box spacing=2) |
| `--spacer-small` (12px) | `marginBottom` on group title (Box spacing=2) |

## Props / API

### LabelValuePair

| Prop | Type | Default | Description |
|---|---|---|---|
| `inline` | `boolean` | `true` | `true`: label and value side-by-side (row), label takes 40%. `false`: stacked (column). |
| `alignValue` | `'left' \| 'right'` | `'left'` | Controls `justifyContent` and `textAlign` of the Value sub-component. |
| `children` | `ReactNode` | — | Must be `LabelValuePair.Label` and `LabelValuePair.Value` components. |
| `...others` | `BoxProps` | — | Layout props forwarded to the outer Box. |

### LabelValuePair.Label

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Label text. |
| `maxLines` | `number \| false` | `2` | Clamps label to N lines. Pass `false` to disable clamping. |
| `inline` | `boolean` | — | Injected by parent — controls flex basis and margin. Do not pass manually. |
| `...others` | `Heading5Props` | — | Typography props forwarded to Heading5. |

### LabelValuePair.Value

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Value content — text, links, badges, etc. |
| `...others` | `BoxProps` | — | Layout props forwarded to Box (justifyContent, textAlign injected by parent). |

### LabelValuePairGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Group heading rendered as Heading4 (neutral, uppercase). |
| `children` | `ReactNode` | — | `LabelValuePair` items. |
| `...others` | `BoxProps` | — | Layout props forwarded to the outer Box. |

## States

| State | Visual description |
|---|---|
| Inline (default) | Label occupies 40% width, value fills remaining 60%. Row direction, 3px bottom margin. |
| Stacked | Label and value stack vertically. Column direction, 18px bottom margin. |
| Right-aligned value | Value text and content right-aligned; useful for numeric/currency display. |
| With group title | Heading4 in neutral color above the group of pairs, 12px bottom margin. |

## Code Example

```tsx
import LabelValuePair from '@teamleader/ahoy/dist/es/components/labelValuePair';

// Basic inline pair
<LabelValuePair>
  <LabelValuePair.Label>Company</LabelValuePair.Label>
  <LabelValuePair.Value>Teamleader</LabelValuePair.Value>
</LabelValuePair>

// Stacked layout, right-aligned value
<LabelValuePair inline={false} alignValue="right">
  <LabelValuePair.Label>Total</LabelValuePair.Label>
  <LabelValuePair.Value>€ 1,250.00</LabelValuePair.Value>
</LabelValuePair>

// Grouped pairs
import { LabelValuePairGroup } from '@teamleader/ahoy/dist/es/components/labelValuePair';

<LabelValuePairGroup title="Contact details">
  <LabelValuePair>
    <LabelValuePair.Label>Email</LabelValuePair.Label>
    <LabelValuePair.Value>hello@example.com</LabelValuePair.Value>
  </LabelValuePair>
  <LabelValuePair>
    <LabelValuePair.Label>Phone</LabelValuePair.Label>
    <LabelValuePair.Value>+32 123 456 789</LabelValuePair.Value>
  </LabelValuePair>
</LabelValuePairGroup>
```

## Cross-references
- `Label` — form label for editable fields (different use case)
- `Datagrid` — tabular data with sorting/selection
- `DetailPage` — page layout that commonly uses LabelValuePair for metadata sections
