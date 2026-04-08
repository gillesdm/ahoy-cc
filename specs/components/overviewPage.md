# OverviewPage

## Metadata
- **Name:** OverviewPage (OverviewPage, OverviewPage.Header, OverviewPage.Body)
- **Category:** Layout / Page Template
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/overviewPage`

## Overview
**When to use:** Use `OverviewPage` as the standard page layout shell for list/overview views — screens that show a collection of entities (contacts, deals, invoices, etc.). It provides a consistent header/body structure with correct padding and spacing.

**When not to use:** Do not use for detail pages or forms — use `DetailPage` or a custom layout. Do not use when the page has a fundamentally different layout (e.g., a full-bleed dashboard).

## Anatomy

```
┌─ OverviewPage (Box, full width) ──────────────────────┐
│                                                        │
│  ┌─ OverviewPage.Header (Container) ───────────────┐  │
│  │  <Heading1>  Page title                         │  │
│  │                                [children / CTA] │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─ OverviewPage.Body (Container) ─────────────────┐  │
│  │  children (table, card grid, etc.)              │  │
│  │                                                  │  │
│  │  [paddingBottom: --space-8 = 48px]              │  │
│  └─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

Parts:
- **OverviewPage** — root `Box` wrapper; accepts any Box layout props
- **OverviewPage.Header** — `Container` with `display: flex`, `justifyContent: space-between`; renders `Heading1` on the left and optional `children` on the right
- **OverviewPage.Body** — `Container` with `paddingBottom: --space-8`; wraps the main page content

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--space-5` (`--spacer-regular`, 18px) | Header `paddingTop` |
| `--space-4` (`--spacer-small`, 12px) | Header `marginBottom` (gap between header and body) |
| `--space-8` (`--spacer-bigger`, 48px) | Body `paddingBottom` (bottom breathing room) |
| `--color-text` (`--color-teal-darkest`) | Page title colour via `Heading1` |
| `--font-size-xl` (24px) | Page title font size via `Heading1` |
| `--font-weight-bold` (700) | Page title weight via `Heading1` |

## Props / API

### OverviewPage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Should contain `OverviewPage.Header` and `OverviewPage.Body` |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref to the root Box element |
| `...others` | `BoxProps` | — | Any Box layout props (backgroundColor, padding, etc.) |

### OverviewPage.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page title rendered as `Heading1` |
| `children` | `ReactNode` | — | Optional right-aligned content (e.g. action buttons) |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref to the Container element |
| `...others` | `ContainerProps` | — | Container/Box props for layout overrides |

### OverviewPage.Body

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Main page content |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref to the Container element |
| `...others` | `ContainerProps` | — | Container/Box props; `paddingBottom` is preset to `--space-8` |

## States

| State | Visual description |
|-------|--------------------|
| Default | White page background; `Heading1` title, content below |
| With header actions | Title left-aligned, CTA/buttons right-aligned in header row |
| Body — custom padding | `paddingBottom` can be overridden via `...others` |

## Code Example

```tsx
import OverviewPage from '@teamleader/ahoy/dist/es/components/overviewPage';
import Button from '@teamleader/ahoy/dist/es/components/button';

<OverviewPage>
  <OverviewPage.Header
    title="Contacts"
  >
    <Button level="primary" label="Add contact" />
  </OverviewPage.Header>

  <OverviewPage.Body>
    {/* DataGrid, card list, etc. */}
  </OverviewPage.Body>
</OverviewPage>
```

## Cross-references
- `container` — the layout primitive used by Header and Body
- `typography` → `Heading1` — renders the page title
- `button` — common right-side header action
- `dataGrid` — typical Body content in list views
