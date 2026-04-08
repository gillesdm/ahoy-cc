# Button

## Metadata
- **Name:** Button
- **Category:** Atom
- **Status:** Stable
- **Source:** `@teamleader/ahoy` — `components/button`
- **Import:** `import { Button } from '@teamleader/ahoy/dist/es/components/button'`

## Overview

**When to use:**
- Triggering an action (submit, save, delete, confirm)
- Primary calls-to-action on a page or dialog

**When not to use:**
- Navigation to another page — use an `<a>` tag or `Link` component instead
- Toggle states (on/off) — use a toggle or checkbox
- Inline text actions — use a text link

## Anatomy

```
┌─────────────────────────────┐
│  [icon?]  Label text        │  ← .button root
└─────────────────────────────┘
```

1. **Root** — the button element, carries all visual state
2. **Label** — required text content (`label` prop)
3. **Icon** — optional leading or trailing icon

## Tokens Used

The Button component uses Ahoy's internal design tokens. When building custom button-like elements, reference these Layer 2 tokens:

| Role | Token |
|------|-------|
| Background (primary) | `var(--color-accent)` |
| Background (subtle) | `var(--color-accent-bg)` |
| Border | `var(--color-accent-border)` |
| Text | `var(--color-text)` or `var(--color-surface)` |
| Focus ring | `var(--color-focus)` |
| Border radius | `var(--radius-md)` |
| Padding | `var(--space-2) var(--space-4)` |
| Font size | `var(--font-size-base)` |
| Font weight | `var(--font-weight-medium)` |
| Shadow (hover) | `var(--elevation-2)` |
| Transition | `var(--transition-border)`, `var(--transition-shadow)` |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Button text |
| `level` | `'primary' \| 'secondary' \| 'tertiary' \| 'destructive' \| 'link'` | `'secondary'` | Visual hierarchy |
| `disabled` | `boolean` | `false` | Disables interaction |
| `onClick` | `() => void` | — | Click handler |
| `icon` | `ReactNode` | — | Leading icon element |
| `iconPlacement` | `'left' \| 'right'` | `'left'` | Icon position |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

> **Note:** `level` defaults to `'secondary'` in Ahoy 3.x. Always pass `level="primary"` explicitly for the mint-green CTA style.

## States

| State | Visual |
|-------|--------|
| Default | Flat, no shadow |
| Hover | Elevated shadow (`--elevation-2`), slight background shift |
| Active / Pressed | Reduced elevation, darker background |
| Focus visible | `2px` outline with `--color-focus` color |
| Disabled | Reduced opacity, `cursor: not-allowed`, no hover effects |
| Loading | Spinner replaces label, button remains sized |

## Code Example

```tsx
import { Button } from '@teamleader/ahoy/dist/es/components/button';

// Primary CTA (mint green)
<Button label="Save changes" level="primary" onClick={handleSave} />

// Secondary (default level)
<Button label="Cancel" onClick={handleCancel} />

// Destructive
<Button label="Delete" level="destructive" onClick={handleDelete} />

// Disabled
<Button label="Submit" level="primary" disabled />
```

## Uses

_Primitive Ahoy component — no internal composition dependencies._

Tokens consumed:
- [Color](../foundations/color.md) — `--color-accent`, `--color-accent-bg`, `--color-accent-border`, `--color-focus`, `--color-text`, `--color-surface`
- [Spacing](../foundations/spacing.md) — `--space-2`, `--space-4`
- [Typography](../foundations/typography.md) — `--font-size-base`, `--font-weight-medium`
- [Radius](../foundations/radius.md) — `--radius-md`
- [Elevation](../foundations/elevation.md) — `--elevation-2`
- [Motion](../foundations/motion.md) — `--transition-border`, `--transition-shadow`

## Used by

- [Counter](../molecules/counter.md) — primary interactive action rendered alongside the counter display
- [Next Steps](../organisms/next-steps.md) — primary CTA placed above the navigation section
