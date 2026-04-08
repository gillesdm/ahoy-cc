# Grid

## Metadata
- **Name:** Grid
- **Category:** Layout
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/grid`
- **Sub-components:** `Grid.Item`

## Overview
**When to use:** Use Grid for two-dimensional CSS grid layouts — dashboard panels, form layouts with named areas, responsive column grids, or any layout that benefits from explicit `grid-template-columns`, `grid-template-rows`, or `grid-template-areas`. `Grid.Item` can be placed into named areas.

**When not to use:** Do not use Grid for simple linear (one-axis) arrangements — use `Flex` instead. Do not use Grid when you only need consistent horizontal padding — use `Container`.

## Anatomy

```
<Grid columns={['1fr', '2fr']} gap={4}>
┌─────────────┬──────────────────────┐
│  [item A]   │  [item B]            │
├─────────────┼──────────────────────┤
│  [item C]   │  [item D]            │
└─────────────┴──────────────────────┘

Named areas:
<Grid areas={['header header', 'sidebar main']} columns={['200px', '1fr']}>
┌──────────────────────────────────┐
│         header                   │
├─────────────┬────────────────────┤
│   sidebar   │       main         │
└─────────────┴────────────────────┘
```

Grid.Item maps a child to a named area:
```
<Grid.Item area="sidebar">…</Grid.Item>
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--space-1` / `--spacer-smallest` (3px) | `gap={1}`, `columnGap={1}`, `rowGap={1}` |
| `--space-2` / `--spacer-smaller` (6px) | `gap={2}`, `columnGap={2}`, `rowGap={2}` |
| `--space-4` / `--spacer-small` (12px) | `gap={3}`, `columnGap={3}`, `rowGap={3}` |
| `--space-5` / `--spacer-regular` (18px) | `gap={4}`, `columnGap={4}`, `rowGap={4}` |
| `--space-6` / `--spacer-medium` (24px) | `gap={5}`, `columnGap={5}`, `rowGap={5}` |
| `--space-7` / `--spacer-big` (36px) | `gap={6}`, `columnGap={6}`, `rowGap={6}` |
| `--space-8` / `--spacer-bigger` (48px) | `gap={7}`, `columnGap={7}`, `rowGap={7}` |
| `--space-9` / `--spacer-biggest` (72px) | `gap={8}`, `columnGap={8}`, `rowGap={8}` |

> `gap`, `columnGap`, and `rowGap` each default to `0`. Only non-zero values apply a gap class.
> `columnGap` and `rowGap` override the corresponding axis of a uniform `gap`.

## Props / API

### Grid

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `string[]` | — | `grid-template-columns` values (e.g. `['1fr', '2fr']`, `['200px', 'auto']`) |
| `rows` | `string[]` | — | `grid-template-rows` values |
| `areas` | `string[]` | — | `grid-template-areas` rows — each string becomes a quoted row (e.g. `['header header', 'sidebar main']`) |
| `gap` | `0–8` | `0` | Uniform gap between all cells (Ahoy spacer scale) |
| `columnGap` | `0–8` | `0` | Column-only gap |
| `rowGap` | `0–8` | `0` | Row-only gap |
| `justifyItems` | `CSSProperties['justifyItems']` | — | CSS `justify-items` — aligns items along the inline axis |
| `alignItems` | `CSSProperties['alignItems']` | — | CSS `align-items` — aligns items along the block axis |
| `children` | `ReactNode` | — | Grid children (plain elements or `Grid.Item`) |
| `className` | `string` | — | Additional CSS class names |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

### Grid.Item

| Prop | Type | Default | Description |
|---|---|---|---|
| `area` | `string` | — | Named grid area matching an entry in the parent `areas` array |
| `children` | `ReactNode` | — | Content of this grid area |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

> Grid.Item renders a plain `<div>` with `style={{ gridArea: area }}`. It does not accept Box props — wrap its children in `Box` if layout props are needed.

## States

Grid is a layout-only component with no interactive states.

## Code Example

```tsx
import Grid from '@teamleader/ahoy/dist/es/components/grid';

// Simple 3-column equal grid
<Grid columns={['1fr', '1fr', '1fr']} gap={4}>
  <Card>…</Card>
  <Card>…</Card>
  <Card>…</Card>
</Grid>

// Named area layout
<Grid
  areas={['header header', 'sidebar content', 'footer footer']}
  columns={['240px', '1fr']}
  rows={['auto', '1fr', '60px']}
  rowGap={3}
  columnGap={5}
>
  <Grid.Item area="header"><AppHeader /></Grid.Item>
  <Grid.Item area="sidebar"><SideNav /></Grid.Item>
  <Grid.Item area="content"><MainContent /></Grid.Item>
  <Grid.Item area="footer"><AppFooter /></Grid.Item>
</Grid>

// Mixed gap
<Grid columns={['repeat(2, 1fr)']} columnGap={4} rowGap={2}>
  <InputField label="First name" />
  <InputField label="Last name" />
  <InputField label="Email" />
  <InputField label="Phone" />
</Grid>
```

## Cross-references
- `Flex` — use for one-dimensional (row or column) layouts
- `Container` — use when only horizontal page gutter padding is needed
- `Box` — use when CSS grid is not needed but generic layout props are
