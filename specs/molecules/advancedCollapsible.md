# AdvancedCollapsible

## Metadata
- **Name**: AdvancedCollapsible
- **Category**: Layout / Disclosure
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/advancedCollapsible`

## Overview

**When to use**: Use AdvancedCollapsible to progressively disclose sections of content behind a clickable title row. Suitable for settings panels, filter groups, detail sections, and any place where a user may or may not need to see additional content. Supports three title sizes and an optional help-text hint when collapsed. Use `AdvancedCollapsibleGroup` to stack multiple collapsibles with shared divider borders.

**When not to use**: Do not use for primary navigation. Do not use when all content should always be visible — use a plain Box instead. Avoid nesting collapsibles more than two levels deep.

## Anatomy

```
▶ Title text          [titleSuffix]    ← title row (cursor pointer)
  helpText (collapsed only, 1 line)

  ┌──────────────────────────────┐
  │  children content            │     ← body (marginTop=2, optional indent)
  └──────────────────────────────┘
```

Parts:
- **Chevron icon** — `IconChevronRightSmallOutline` (collapsed) / `IconChevronDownSmallOutline` (expanded)
- **Title** — `Heading3` (large), `Heading4` (medium-caps), or `TextBody` bold (medium)
- **titleSuffix** — optional slot, click-propagation stopped; hidden when collapsed if `hideTitleSuffixOnCollapse`
- **helpText** — `TextSmall` shown only when collapsed; truncated to 1 line
- **children** — body content; indented 20 px by default via `.children-indent`

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-text` (`--color-teal-darkest`) | Title and icon color (`color="teal" tint="darkest"`) |
| `--color-border` (maps to `--color-neutral`) | Group divider borders between collapsibles |
| `--space-2` (`--spacer-smaller`, 6px) | Gap between chevron and title; body `marginTop` |
| `--space-4` (`--spacer-small`, 12px) | `helpText` left offset (`marginLeft=4`) |
| `--transition-border` | Border-color transition on group items |
| `--duration-base` | Transition duration |

## Props / API

### AdvancedCollapsible

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | — | Title content rendered in the header row |
| `size` | `'medium' \| 'medium-caps' \| 'large'` | `'medium'` | Controls title typography: medium=TextBody bold, medium-caps=Heading4, large=Heading3 |
| `color` | `string` | `'teal'` | Ahoy color token name applied to the chevron icon and title text |
| `defaultIsCollapsed` | `boolean` | `true` | Initial collapsed state |
| `onChange` | `(isCollapsed: boolean, event: MouseEvent) => void` | — | Called when the title row is clicked |
| `indent` | `boolean` | `true` | Adds 20 px left padding to the children container |
| `titleSuffix` | `ReactNode` | — | Content rendered after the title (e.g. a counter badge) |
| `hideTitleSuffixOnCollapse` | `boolean` | `false` | Hides `titleSuffix` when the panel is collapsed |
| `helpText` | `string` | — | Short hint shown beneath the title row only when collapsed |
| `className` | `string` | — | Additional class applied to the title row |
| `children` | `ReactNode` | — | Body content shown when expanded |
| `...boxProps` | `BoxProps` | — | Box layout props forwarded to the title row |

### AdvancedCollapsibleGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | One or more `AdvancedCollapsible` components |
| `className` | `string` | — | Additional class on the wrapper Box |
| `...rest` | `BoxProps` | — | Box layout props |

## States

| State | Visual description |
|---|---|
| Collapsed (default) | Chevron points right; children hidden; helpText visible (if provided) |
| Expanded | Chevron points down; children rendered below title with optional indent; helpText hidden |
| Group item | Title row gains `border-top: 1px solid --color-neutral` and `padding-top/bottom: --spacer-smaller`; expanded items also get `border-bottom` |

## Code Example

```tsx
import AdvancedCollapsible, {
  AdvancedCollapsibleGroup,
} from '@teamleader/ahoy/dist/es/components/advancedCollapsible';

// Standalone
<AdvancedCollapsible
  title="Billing details"
  size="large"
  defaultIsCollapsed={false}
  helpText="VAT, payment terms"
  onChange={(collapsed) => console.log(collapsed)}
>
  <p>Content goes here</p>
</AdvancedCollapsible>

// Grouped
<AdvancedCollapsibleGroup>
  <AdvancedCollapsible title="Section A">
    <p>Content A</p>
  </AdvancedCollapsible>
  <AdvancedCollapsible title="Section B">
    <p>Content B</p>
  </AdvancedCollapsible>
</AdvancedCollapsibleGroup>
```

## Cross-references
- `Box` — layout primitive used internally
- `Icon` — chevron icon rendering
- `Heading3`, `Heading4`, `TextBody`, `TextSmall` — title / help typography
