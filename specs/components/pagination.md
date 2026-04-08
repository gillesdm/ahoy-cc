# Pagination

## Metadata
- **Name:** Pagination
- **Category:** Navigation / Data Display
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/pagination`

## Overview
**When to use:** Use `Pagination` at the bottom of paginated lists, tables, or search results to let users navigate between pages. It renders a previous arrow, up to `maxNumPagesVisible` page numbers (with ellipsis compression), and a next arrow.

**When not to use:** Do not use when there is only one page (`numPages < 2` — component returns `null`). Do not use for infinite scroll — use a "Load more" button pattern instead.

## Anatomy

```
┌─ Pagination (nav) ──────────────────────────────────────┐
│  ┌─ ul.list ─────────────────────────────────────────┐  │
│  │  [← prev]  [1]  [2]  ...  [5]  [6]  [7]  [→ next]│  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

Parts:
- **Nav wrapper** — `<nav>` element via `Box`
- **List** — `<ul>` with `display: inline-flex; align-items: center`
- **Arrow items** — previous (left) and next (right) rendered via the render-prop `children` with `icon` and `iconPlacement`
- **Page items** — page number buttons rendered via `children` render-prop; active page gets `.is-current`
- **Ellipsis items** — `TextBody` "..." replacing the 2nd or 2nd-last item when page range is compressed

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-text` (`--color-teal-darkest`) | Page number and ellipsis text |
| `--color-border` (`--color-neutral-dark`) | Active page background (`.is-current`) |
| `--space-1` (`--spacer-smallest`, 3px) | Margin between list items |
| `--font-family-base` (`--font-family-inter`) | Active page font |
| `--font-weight-medium` (500) | Active page font weight |

> Active page button: `background: --color-border`, `color: --color-text`, `font-weight: 500`, `pointer-events: none`.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `numPages` | `number` | — | Total number of pages; component returns `null` if < 2 |
| `currentPage` | `number` | `1` | The currently active page (1-indexed) |
| `maxNumPagesVisible` | `number` | `7` | Maximum page buttons to display (ellipsis hides the rest) |
| `children` | `(args: PageRenderArgs) => ReactNode` | — | Render prop called for each page button and arrow |
| `className` | `string` | — | Additional CSS classes on the nav element |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref to the nav element |
| `...others` | `BoxProps` | — | Box layout props |

### PageRenderArgs (render-prop argument shape)

| Key | Type | Description |
|-----|------|-------------|
| `number` | `number` | Page number to navigate to |
| `text` | `string \| undefined` | Display text (string page number); `undefined` for arrows |
| `isActive` | `boolean` | True if the item is disabled (prev on page 1, next on last page) |
| `icon` | `ReactNode \| undefined` | Chevron icon for arrow items |
| `iconPlacement` | `'left' \| 'right' \| undefined` | Icon position for arrow items |
| `className` | `string \| undefined` | `.is-current` class for the active page |

## States

| State | Visual description |
|-------|--------------------|
| Default | Inline row of numbered buttons and arrow chevrons |
| Active page | Button receives `--color-border` background, weight 500, no pointer events |
| Ellipsis | "..." `TextBody` shown in place of compressed middle pages |
| Previous arrow — first page | `isActive=true` — consumer should disable/hide the button |
| Next arrow — last page | `isActive=true` — consumer should disable/hide the button |

## Code Example

```tsx
import Pagination from '@teamleader/ahoy/dist/es/components/pagination';
import Button from '@teamleader/ahoy/dist/es/components/button';
import IconButton from '@teamleader/ahoy/dist/es/components/iconButton';

<Pagination
  numPages={20}
  currentPage={currentPage}
  maxNumPagesVisible={7}
>
  {({ number, text, isActive, icon, iconPlacement, className }) =>
    icon ? (
      <IconButton
        icon={icon}
        disabled={isActive}
        onClick={() => setCurrentPage(number)}
        size="small"
      />
    ) : (
      <Button
        label={text}
        disabled={isActive}
        className={className}
        onClick={() => setCurrentPage(number)}
        size="small"
        level="secondary"
      />
    )
  }
</Pagination>
```

## Cross-references
- `button` — typical render-prop implementation for page buttons
- `iconButton` — typical render-prop implementation for arrow buttons
- `dataGrid` — most common host for Pagination
