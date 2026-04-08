# BadgedLink

## Metadata
- **Name**: BadgedLink
- **Category**: Navigation / Inline Actions
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/badgedLink`

## Overview

**When to use**: Use BadgedLink for inline clickable text or icon+text combinations that behave like links or lightweight buttons but require a pill-shaped hover/focus area. Common uses: inline "Edit", icon + label navigation links, breadcrumb segments, inline actions within body text.

**When not to use**: Do not use as a primary CTA (use `Button`). Do not use when a standard `<a>` without hover treatment is sufficient. Do not use for navigation items in a sidebar (use `Menu`).

## Anatomy

```
[icon-left]  children  [icon-right]
↑
.badged-link — inline-flex, rounded pill padding
```

Parts:
- **Root element** — `Box` defaulting to `<a>`, configurable via `element`
- **Icon slot (left)** — first child when `iconPlacement="left"`
- **Children** — text or any inline content
- **Icon slot (right)** — last child when `iconPlacement="right"`
- **Hover surface** — `border-radius: --border-radius-medium`; negative margin compensates for padding to keep text alignment

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-link` (`--color-teal-darkest`) | Text color when `inherit=true` (inherits parent color) |
| `--color-accent` (aqua-dark) | Text color when `inherit=false` |
| `--color-border` (neutral-darkest 18%) | Hover background |
| `--radius-md` (`--border-radius-medium`, 4px) | Pill border-radius |
| `--space-1` (`--spacer-smallest`, 3px) | Vertical padding |
| `--space-2` (`--spacer-smaller`, 6px) | Horizontal padding; icon-to-content gap |
| `--transition-border` | Background-color + box-shadow transition |
| `--duration-fast` (`--animation-duration`) | Transition duration |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `element` | `string` | `'a'` | HTML element or component for the root node |
| `icon` | `ReactNode` | — | Icon element; placed left or right of children |
| `iconPlacement` | `'left' \| 'right'` | `'left'` | Side of the icon relative to content |
| `inherit` | `boolean` | `true` | When true, inherits parent color; when false, uses aqua-dark link color |
| `children` | `ReactNode` | — | Link text or content |
| `className` | `string` | `''` | Additional class on the root element |
| `...others` | `BoxProps + HTMLAnchorProps` | — | Forwarded to the root Box (href, target, rel, etc.) |

## States

| State | Visual description |
|---|---|
| Default | Transparent background, inherited or aqua-dark text |
| Hover | Background: `hsl(--color-neutral-darkest-hsl / 18%)` |
| Focus-visible | `box-shadow: 0 0 0 2px hsl(--color-neutral-darkest-hsl / 24%)`, outline none |
| Active | Inset shadow `inset 0 2px 3px hsl(... / 12%)` + neutral-18% background |
| Selected | Background neutral 24% (`!important`) |
| Disabled | Opacity 0.48, pointer-events none |

## Code Example

```tsx
import BadgedLink from '@teamleader/ahoy/dist/es/components/badgedLink';
import { IconEditSmallOutline } from '@teamleader/ahoy/dist/es/assets/icons/components';

// Simple inline link
<BadgedLink href="/profile">View profile</BadgedLink>

// With left icon
<BadgedLink
  icon={<IconEditSmallOutline />}
  iconPlacement="left"
  onClick={handleEdit}
  element="button"
>
  Edit
</BadgedLink>

// Non-inherit color (aqua link style)
<BadgedLink inherit={false} href="/docs">
  Documentation
</BadgedLink>
```

## Cross-references
- `Badge` — non-interactive or selectable label pill
- `Button` — primary action button
- `Link` — plain unstyled anchor
