# DataGrid

## Metadata
- **Name:** DataGrid
- **Category:** Data Display / Tables
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/datagrid`
- **Named exports:** `DataGrid`, `ColumnManagerMenuItem`, `ColumnWidth`

## Overview
**When to use:** Use DataGrid to display large tabular datasets where users need to sort, filter, paginate, group, resize columns, reorder columns, pin columns, select rows, or expand rows. Built on TanStack Table v8 with optional DnD-kit column reordering and TanStack Virtual row virtualization.

**When not to use:** Do not use DataGrid for simple read-only lists with 2–3 columns — a plain HTML table or `Box` layout is lighter. Do not use when no sorting/filtering/selection features are needed.

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│  [LoadingBar — visible when processing=true]                 │
├──[color]─[checkbox]─[col1]─[col2]─[col3]─[columnManager]────┤  ← Header row (60px)
├──────────────────────────────────────────────────────────────┤
│  [color cell] [checkbox] [data cells...]                     │  ← Line row (48px)
│  [color cell] [checkbox] [data cells...]                     │
│  ...                                                         │
├──────────────────────────────────────────────────────────────┤
│  [footer content — sticky left]                              │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│  [Pagination + results amount]      [Page size: 10 20 50]    │
└──────────────────────────────────────────────────────────────┘

Loading skeleton replaces entire grid when loading=true.
```

**Predefined column slots (in order):**
- Color line cell (optional, 6px, `rowColorGenerator`)
- First spacer (optional, `spacerSize`)
- Checkbox (optional, `rowSelectionConfig.enableRowSelection`)
- User columns
- Column manager (optional, `columnVisibilityConfig.enableHiding`)
- Last spacer (optional, `spacerSize`)

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-neutral-lightest` | Loading bar background |
| `--color-neutral-light` (`backgroundTint: light`) | Footer background |
| `--color-neutral` (`borderColor: neutral`) | Footer top border |
| `--elevation-3` (`box-shadow-300`) | Applied via `uiUtilities` class on dialog-base |

**CSS custom properties set by datagrid/styles.css:**
| Property | Value | Role |
|---|---|---|
| `--datagrid-header-row-height` | 60px | Header row height |
| `--datagrid-line-row-height` | 48px | Data row height |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TData[]` | **required** | Array of row data objects |
| `columns` | `ColumnDef<TData>[]` | **required** | TanStack column definitions |
| `visible` | `boolean` | `true` | When `false`, renders nothing |
| `headerVisible` | `boolean` | `true` | Show/hide the header row |
| `columnBorders` | `boolean` | `false` | Show vertical borders between columns |
| `processing` | `boolean` | `false` | Shows animated LoadingBar above header |
| `loading` | `boolean` | `false` | Replaces grid with LoadingSkeleton |
| `loadingRows` | `number` | — | Number of skeleton rows |
| `loadingColumns` | `ColumnDef[]` | — | Column shapes for skeleton |
| `spacerSize` | `number` | — | Width in px of leading/trailing spacer columns |
| `footer` | `ReactNode` | — | Content for sticky footer bar |
| `pagination` | `PaginationConfig` | — | See pagination sub-props below |
| `onRowClick` | `(row: Row<TData>) => void` | — | Row click handler |
| `rowHrefGenerator` | `(row: Row<TData>) => string` | — | Makes rows anchor links |
| `onRowsChange` | `(rows: Row<TData>[]) => void` | — | Fires when rendered rows change |
| `onTableStateChange` | `(table: Table<TData>) => void` | — | Access full TanStack table instance |
| `rowColorGenerator` | `(row: TData) => string` | — | Returns color string for left color stripe |
| `getCellStyles` | `(cell: Cell<TData>) => CSSProperties` | — | Per-cell inline style override |
| `rowExpansionButtonTitles` | `{ expand, collapse }` | — | Accessibility titles for expand/collapse buttons |
| `debug` | `boolean` | `false` | Enables TanStack table debug logging |
| `aggregationConfig` | `AggregationConfig` | — | Aggregation function titles and callbacks |

**Feature config objects (all optional, each defaults to `{ enableX: false }`):**

| Prop | Key props | Description |
|---|---|---|
| `columnVisibilityConfig` | `enableHiding`, `columnVisibility`, `onColumnVisibilityChange`, `columnManagerTitle`, `showSearchInput`, `searchInputPlaceholder`, `removeColumnButtonTitle`, `columnManagerFooter`, `disabledTooltip`, `pinnedTooltip` | Column show/hide via column manager popover |
| `columnOrderingConfig` | `enableOrdering`, `columnOrder`, `onColumnOrderChange` | Drag-to-reorder columns |
| `columnPinningConfig` | `enablePinning`, `columnPinning`, `onColumnPinningChange` | Pin columns left/right |
| `columnFilteringConfig` | `enableColumnFilters`, `manualFiltering` | Column-level filtering |
| `sortingConfig` | `enableSorting`, `sorting`, `onSortingChange`, `manualSorting` | Column sort (up to 2 columns) |
| `groupingConfig` | `enableGrouping`, `grouping`, `onGroupingChange`, `expandGroupsByDefault` | Row grouping |
| `rowSelectionConfig` | `enableRowSelection`, `enableMultiRowSelection`, `rowSelection`, `onRowSelectionChange`, `bulkActions`, `selectedTitle` | Row checkbox selection |
| `columnSizingConfig` | `enableColumnResizing`, `columnSizing`, `onColumnSizingChange` | Column resize handles |
| `expandingConfig` | `enableExpanding`, `getSubRows`, `expandGroupsByDefault` | Nested row expansion |
| `virtualizationConfig` | `enableVirtualization`, plus TanStack Virtual options | Virtualizes rows for large datasets |

**Pagination sub-props (`pagination`):**

| Key | Type | Description |
|---|---|---|
| `pageNumber` | `number` | Current 1-based page number |
| `pageSize` | `number` | Rows per page |
| `rowCount` | `number` | Total row count for page calculation |
| `onChange` | `({ pageNumber, pageSize }) => void` | Page change callback |
| `manualPagination` | `boolean` | Default `true` — server-side pagination |
| `showResultsAmount` | `boolean \| (count) => string` | Show/format results amount label |
| `showPageSizeSelector` | `boolean` | Show 10/20/50 page-size buttons |
| `showSpacing` | `boolean` | Add spacer-aligned padding to pagination row |

## States

| State | Visual Description |
|---|---|
| Default | Static header + rows, no interaction features |
| Processing | Translucent LoadingBar animates below header row |
| Loading | Full skeleton with pulsing placeholder rows/columns |
| Scroll start/end | Pinned columns cast drop shadow on scroll edges |
| Row selected | Checkbox checked; bulk actions appear in header |
| Row hover | Row background highlight (via Box hover styles) |
| Column sorted | Sort icon in header cell indicates direction |
| Group expanded/collapsed | Expand toggle in grouped row header |

## Code Example

```tsx
import { DataGrid, ColumnWidth } from '@teamleader/ahoy/dist/es/components/datagrid';
import { createColumnHelper } from '@tanstack/react-table';

type Person = { id: number; name: string; email: string };

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('name', { header: 'Name', size: ColumnWidth.Medium }),
  columnHelper.accessor('email', { header: 'Email', size: ColumnWidth.Large }),
];

<DataGrid
  data={people}
  columns={columns}
  sortingConfig={{
    enableSorting: true,
    sorting: [],
    onSortingChange: setSorting,
  }}
  pagination={{
    pageNumber: 1,
    pageSize: 20,
    rowCount: 100,
    onChange: ({ pageNumber, pageSize }) => fetchPage(pageNumber, pageSize),
  }}
/>
```

## Cross-references
- `Pagination` — used internally for the pagination row
- `LoadingBar` — used internally for the processing state
- `Button` / `ButtonGroup` — used for pagination page-size selector
- `Checkbox` — used in `CheckboxLineCell` / `CheckboxHeaderCell`
- `flex` — used in pagination row layout
