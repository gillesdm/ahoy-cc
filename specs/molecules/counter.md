# Counter

## Metadata
- **Name:** Counter
- **Category:** Molecule
- **Status:** Demo
- **File:** `ahoy-demo/src/App.css` — `.counter`

## Overview

**When to use:**
- Displaying a numeric value with interactive hover/focus affordance
- Showing a count that updates via user interaction

**When not to use:**
- Static labels with no interactivity — use a plain text element
- Counts inside tables or lists — use Ahoy's `Badge` component

## Anatomy

```
┌──────────────────────┐
│        42            │  ← .counter wrapper
└──────────────────────┘
  ↑ accent color text
  ↑ accent-bg fill
  ↑ transparent border → accent-border on hover
```

1. **Wrapper** — `<div class="counter">` — carries all visual styling
2. **Text content** — the count value, rendered at `--font-size-base`

## Tokens Used

| Property | Token | Value |
|----------|-------|-------|
| `font-size` | `--font-size-base` | 16px |
| `padding` | `--space-xxs` `--space-xs-alt` | 5px 10px |
| `border-radius` | `--radius-counter` | 5px |
| `color` | `--accent` → `--color-accent` | mint |
| `background` | `--accent-bg` → `--color-accent-bg` | mint lightest |
| `border` | transparent → `--accent-border` on hover | mint dark |
| `margin-bottom` | `--space-6` | 24px |
| `transition` | `--transition-border` | 0.3s ease |
| `outline` (focus) | `--accent` color, 2px | mint |

## States

| State | Visual |
|-------|--------|
| Default | Mint text on mint-tinted background, transparent border |
| Hover | Border appears in `--color-accent-border` (mint dark) |
| Focus visible | 2px solid outline in `--color-focus` (mint), offset 2px |

## Code Example

```tsx
// In App.tsx (or any component)
<div className="counter">{count}</div>
```

```css
/* In App.css — all values reference tokens */
.counter {
  font-size: var(--font-size-base);
  padding: var(--space-xxs) var(--space-xs-alt);
  border-radius: var(--radius-counter);
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: var(--transition-border);
  margin-bottom: var(--space-6);

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}
```

## Uses

- [Color](../foundations/color.md) — `--color-accent`, `--color-accent-bg`, `--color-accent-border`, `--color-focus`
- [Spacing](../foundations/spacing.md) — `--space-xxs`, `--space-xs-alt` (padding), `--space-6` (margin-bottom)
- [Typography](../foundations/typography.md) — `--font-size-base`
- [Radius](../foundations/radius.md) — `--radius-counter`
- [Motion](../foundations/motion.md) — `--transition-border`

## Used by

_Standalone display molecule — not composed into other product components._
Rendered in the demo app alongside [Button](../atoms/button.md) inside `#center`.
