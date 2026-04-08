# EmptyState

## Metadata
- **Name:** EmptyState
- **Category:** Feedback / Content States
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/emptyState`

## Overview
**When to use:** Use EmptyState when a list, table, or content area has no items to display — either because no data exists yet or because a search/filter returned no results. It provides a consistent visual treatment with an illustration pointer, heading, descriptive text, and an optional call-to-action link button.

**When not to use:** Do not use EmptyState for error states — use an error boundary or `InlineMessage`. Do not use when the empty state is transient and data is loading — show a skeleton or `LoadingSpinner` instead.

## Anatomy

```
Size: medium (default)
┌──────────────────────────────────────────────────────────────┐
│                        [pointer illustration]  ← absolute   │
│                                                              │
│                    ┌─────────────────────┐                  │
│                    │  [Heading3 title]   │  ← .content      │
│                    │  [TextBody metaText]│    (max-w 432px)  │
│                    │  [+ Action button ] │                   │
│                    └─────────────────────┘                  │
└──────────────────────────────────────────────────────────────┘

Size: small  → 36×36px illustration, content max-w 324px, padding 60px h
Size: medium → 48×48px illustration, content max-w 432px, padding 84px h
Size: large  → 130×130px illustration, content max-w 530px, min-height 280px

Illustration pointer is positioned absolutely top-right of the wrapper.
hidePointer=true removes it entirely.
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-teal` (tint `darkest`) | Title `Heading3` color |
| `--color-neutral` (tint `normal`) | Meta text `TextBody` color |
| `--spacer-regular` (18px) | Small and medium base padding |
| `--spacer-medium` (24px) | Horizontal padding when pointer is shown (small/medium) |
| `--spacer-smaller` (6px) | Pointer top offset |
| `--spacer-small` (12px) | Pointer right offset (small size) |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls illustration size, content max-width, and padding |
| `title` | `string` | — | Main heading rendered as `Heading3` in teal |
| `metaText` | `string` | — | Supporting description rendered as `TextBody` in neutral |
| `action` | `ButtonProps` | — | Optional CTA button — always rendered at `level="link"` with a `+` icon prefix |
| `hidePointer` | `boolean` | `false` | Hides the illustration pointer even when a `title` is provided |
| `className` | `string` | — | Additional CSS class names on the wrapper |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |
| `...others` | `BoxProps` | — | All Box props forwarded (padding, margin, background, etc.) |

> The `.has-pointer` modifier (which triggers extra horizontal padding) is applied automatically when `title` is set and `hidePointer` is `false`.

## States

| State | Visual Description |
|---|---|
| Title only | Heading3 centered, no illustration if `hidePointer=true` |
| With title + pointer | Illustration positioned top-right; extra horizontal padding applied |
| With metaText | Supporting text below title with `marginTop` spacing |
| With action | Link-level button with `+` icon below the meta text |
| Large | Minimum height 280px, 130×130px illustration |

## Code Example

```tsx
import EmptyState from '@teamleader/ahoy/dist/es/components/emptyState';

// Basic empty list
<EmptyState
  size="medium"
  title="No contacts yet"
  metaText="Start by adding your first contact to get going."
  action={{
    label: 'Add contact',
    onClick: () => openAddContactModal(),
  }}
/>

// Without pointer illustration
<EmptyState
  title="No results"
  metaText="Try adjusting your search filters."
  hidePointer
/>

// Large variant in a full-page context
<EmptyState
  size="large"
  title="Nothing here yet"
  metaText="Create your first project to get started."
  action={{ label: 'New project', onClick: handleCreate }}
/>
```

## Cross-references
- `DataGrid` — renders EmptyState-style content when no rows match filters
- `Button` — the action button is a `level="link"` Button internally
- `Heading3` / `TextBody` — typography components used for title and meta text
