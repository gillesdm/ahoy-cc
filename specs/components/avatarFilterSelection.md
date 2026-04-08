# AvatarFilterSelection

## Metadata
- **Name**: AvatarFilterSelection
- **Category**: Filters / Selection
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/avatarFilterSelection`

## Overview

**When to use**: Use AvatarFilterSelection to let users filter a list by selecting one or more people. Renders as a `FilterSelection` chip that, when clicked, opens a Popover with a searchable, scrollable list of avatar + name options. Ideal for assignee filters, team member filters, and similar people-picker scenarios.

**When not to use**: Do not use for filtering by non-person entities (use a regular FilterSelection or Select). Do not use when the list is small enough that a static checkbox group would suffice.

## Anatomy

```
[FilterSelection chip]
        ↓ (on click)
┌────────────────────────┐
│ [search icon] [input] [x] [spinner] │  ← search bar
├────────────────────────┤
│ ┌────────────────────┐ │
│ │ [Avatar] Name    ✓ │ │  ← MenuItem rows (selected shows aqua close icon)
│ │ [Avatar] Name      │ │
│ │  …                 │ │
│ └────────────────────┘ │  ← max-height 378px, scrollable
│  "No results" text     │  ← shown when options.length === 0
└────────────────────────┘
       Popover (direction=south)
```

Parts:
- **FilterSelection** — trigger chip showing label, applied count, clear button
- **Popover** — anchored south of the chip, no backdrop
- **Search input** — prefix search icon, suffix clear icon + optional loading spinner
- **Scrollable list** — Menu with MenuItem rows; fires `onBottomReached` on scroll to end (throttled 200 ms)
- **MenuItem row** — tiny Avatar + TextBody name, aqua checkmark icon when selected

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-accent` (`--color-mint`) | FilterSelection active/focused indicator |
| `--color-border` (`--color-neutral-dark`) | Input and popover borders |
| `--color-text` (`--color-teal-darkest`) | Option label text |
| `--color-text-subtle` (`--color-teal-dark`) | Search icon color |
| `--elevation-2` (`--box-shadow-200`) | Popover panel shadow |
| `--space-4` (`--spacer-small`, 12px) | Input padding (padding=3) |
| `--space-2` (`--spacer-smaller`, 6px) | Gap between avatar and name |
| `--z-overlay` | Popover z-index |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `Array<{ id: string, firstName: string, lastName?: string, avatarUrl?: string }>` | — | List of selectable people |
| `selectedOptionIds` | `string[]` | — | IDs of currently selected options; `['all']` means no filter active |
| `onSelectedOptionChange` | `(option: Option) => void` | — | Called when a MenuItem is clicked |
| `onSearchTermChange` | `(term: string) => void` | — | Called on search input change or clear |
| `onBottomReached` | `() => void` | — | Called (throttled 200 ms) when scroll reaches end of list |
| `onClear` | `() => void` | — | Called when the FilterSelection clear button is clicked |
| `onClose` | `() => void` | — | Called when the Popover closes |
| `label` | `string` | — | Label shown on the FilterSelection chip |
| `searchPlaceholder` | `string` | — | Placeholder text for the search input |
| `searchTerm` | `string` | — | Controlled search term value |
| `loading` | `boolean` | — | Shows a small LoadingSpinner in the search input suffix |
| `noResultMessage` | `string` | — | Message shown when `options` is empty |
| `popoverPosition` | `string` | — | Horizontal alignment of the Popover (forwarded as `position`) |

## States

| State | Visual description |
|---|---|
| Default | FilterSelection chip in default state, popover closed |
| Focused (open) | FilterSelection chip shows focused style, popover open |
| Active (filter applied) | FilterSelection chip shows active style + applied count badge; popover may be open or closed |
| Option selected | MenuItem row shows aqua close/deselect icon on the right |
| Loading | Small LoadingSpinner appears in search input suffix |
| No results | Centered `TextBodyCompact` message in the list area |

## Code Example

```tsx
import AvatarFilterSelection from '@teamleader/ahoy/dist/es/components/avatarFilterSelection';

const [selectedIds, setSelectedIds] = useState(['all']);
const [search, setSearch] = useState('');

const handleChange = (option) => {
  setSelectedIds((prev) =>
    prev.includes(option.id)
      ? prev.filter((id) => id !== option.id)
      : [...prev.filter((id) => id !== 'all'), option.id]
  );
};

<AvatarFilterSelection
  label="Assignee"
  options={users}
  selectedOptionIds={selectedIds}
  onSelectedOptionChange={handleChange}
  onSearchTermChange={setSearch}
  onBottomReached={fetchMoreUsers}
  onClear={() => setSelectedIds(['all'])}
  searchPlaceholder="Search people…"
  searchTerm={search}
  noResultMessage="No people found"
/>
```

## Cross-references
- `Avatar` — renders each option's avatar (size="tiny")
- `FilterSelection` — the trigger chip component
- `Popover` — dropdown positioning
- `Menu` / `MenuItem` — option list rendering
- `Input` — search field
- `LoadingSpinner` — async loading indicator
