# Tab

## Metadata
- **Name:** Tab (TabGroup + TitleTab)
- **Category:** Navigation
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/tab`

## Overview
Horizontal navigation tabs for switching between content sections within a single page view. `TabGroup` is the container; `TitleTab` is the individual tab element. Automatically shows scroll buttons when tabs overflow the available width.

**When to use:**
- Switching between related sections at the same hierarchy level (e.g. "Overview", "Activity", "Files")
- Content that shares the same page but does not require a full navigation change

**When not to use:**
- Top-level app navigation — use a sidebar or nav bar
- Fewer than 2 sections — no navigation needed
- Deeply nested sub-navigation — consider breadcrumbs or a secondary sidebar

## Anatomy

```
TabGroup[data-teamleader-ui="tab-group"]
├── Box.scroll-container   (overflow-x: scroll, no scrollbar)
│     └── TitleTab[data-teamleader-ui="title-tab"] ×N
│           ├── Heading4 | Heading5  (label text)
│           └── Counter?             (absolute badge, top-right)
├── Box.scroll-left-button-wrapper?  (IconButton with left chevron)
└── Box.scroll-right-button-wrapper? (IconButton with right chevron)
```

The active tab has a 3 px mint bottom border (via `::after` pseudo-element scaleX animation).

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-neutral-lightest` | Tab background (default and scroll button wrapper) |
| `--color-neutral` | Tab hover background |
| `--color-neutral-darkest` | Tab text colour; hover text colour |
| `--color-teal-darkest` | Active tab text colour |
| `--color-mint` | Active tab underline (3 px `box-shadow` inset) |
| `--color-neutral` | Focus-visible inset ring |
| `--animation-duration` | Underline scale transition |
| `--animation-curve-fast-out-slow-in` | Underline easing |
| `--spacer-small` | Scroll button fade gradient width |

## Props / API

### TabGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `TitleTab[]` | — | Tab elements; receives `size` prop injected by group |
| `size` | `'small' \| 'medium'` | — | Passed to all children; affects padding and typography |
| `className` | `string` | — | Extra class names |

All Box props are forwarded to the root element.

### TitleTab

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `false` | Marks this tab as the current/active one (shows underline) |
| `children` | `ReactNode` | — | Tab label text |
| `counter` | `ReactNode` | — | Optional counter badge (positioned absolutely top-right) |
| `size` | `'small' \| 'medium'` | `'medium'` | Small uses `Heading5` (12 px); medium uses `Heading4` (12 px uppercase) |
| `element` | `string \| ComponentType` | `'a'` | Root HTML element (use `'button'` for SPA tab panels) |
| `onClick` | `(event) => void` | — | Click handler |
| `className` | `string` | — | Extra class names |

## States

| State | Visual Description |
|-------|--------------------|
| Default | White background, neutral-darkest text, no underline |
| Hover | Background fills `--color-neutral`; cursor pointer |
| Active | Mint 3 px underline animates in (scaleX 0→1) |
| Focus-visible | 2 px inset `--color-neutral` ring inside tab |
| Overflow (left) | Left scroll button appears with fade gradient |
| Overflow (right) | Right scroll button appears with fade gradient |

## Code Example

```tsx
import { TabGroup, TitleTab } from '@teamleader/ahoy/dist/es/components/tab';

function ContentTabs({ activeTab, onTabChange }) {
  return (
    <TabGroup>
      <TitleTab
        active={activeTab === 'overview'}
        onClick={() => onTabChange('overview')}
        element="button"
      >
        Overview
      </TitleTab>
      <TitleTab
        active={activeTab === 'activity'}
        onClick={() => onTabChange('activity')}
        element="button"
      >
        Activity
      </TitleTab>
      <TitleTab
        active={activeTab === 'files'}
        onClick={() => onTabChange('files')}
        element="button"
      >
        Files
      </TitleTab>
    </TabGroup>
  );
}
```

## Cross-references
- `Counter` — numeric badge used as `counter` prop on TitleTab
- `Heading4` / `Heading5` — typography inside tab labels
- `IconButton` — scroll navigation arrows in overflowing TabGroup
