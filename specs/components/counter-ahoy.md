# Counter (Ahoy)

## Metadata
- **Name:** Counter
- **Category:** Data Display / Badge
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/counter`

> Note: This file documents the **Ahoy library Counter** component. The demo app's custom counter widget is documented in `counter.md`.

## Overview
**When to use:** Use Counter to display a numeric count in a compact pill/badge — typically in navigation tabs, list headers, or notification indicators where the quantity of items needs to be surfaced at a glance. Supports a `maxCount` overflow display (e.g. "99+").

**When not to use:** Do not use Counter to display non-numeric status. Use a `StatusLabel` or `Badge` for text-based states. Do not use for action buttons with count — that is a Button + Counter composition.

## Anatomy

```
┌─────────────────────────────┐
│  [count value] [children?]  │  ← <span> .counter + color + size modifier
└─────────────────────────────┘

medium:  min-width 24px, height 24px, padding 0 6px
small:   min-width 18px, height 18px, padding 0 3px
```

The count is rendered in a `Monospaced` typography wrapper. If `count > maxCount`, the display shows `{maxCount}+`.

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-white` | Text color (always white on colored backgrounds) |
| `--color-neutral-darkest` | Background for `color="neutral"` |
| `--color-mint-dark` | Background for `color="mint"` |
| `--color-violet-dark` | Background for `color="violet"` |
| `--color-teal-dark` | Background for `color="teal"` |
| `--color-ruby-dark` | Background for `color="ruby"` (error/danger) |
| `--color-gold-dark` | Background for `color="gold"` (warning) |
| `--color-aqua-dark` | Background for `color="aqua"` |
| `--radius-md` (`--border-radius-medium`, 4px) | Border radius |
| `--space-2` (`--spacer-smaller`, 6px) | Horizontal padding — medium size |
| `--space-1` (`--spacer-smallest`, 3px) | Horizontal padding — small size |
| `--font-size-xs` (12px) | Font size |
| `--font-weight-bold` (700) | Font weight |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `count` | `number` | — | The numeric value to display |
| `maxCount` | `number` | — | When `count` exceeds this, display `{maxCount}+` |
| `color` | `'neutral' \| 'mint' \| 'violet' \| 'teal' \| 'ruby' \| 'gold' \| 'aqua'` | `'neutral'` | Background color family |
| `size` | `'medium' \| 'small'` | `'medium'` | Controls height and padding |
| `borderColor` | `'neutral' \| 'mint' \| 'violet' \| 'ruby' \| 'gold' \| 'aqua' \| 'teal'` | — | Optional border color family |
| `borderTint` | `'darkest' \| 'dark' \| 'light' \| 'lightest'` | — | Border tint — requires `borderColor` to be set |
| `children` | `ReactNode` | — | Optional content rendered after the count (e.g. a label suffix) |
| `className` | `string` | — | Additional CSS class names |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref (renders as `<span>`) |
| `...others` | `BoxProps` | — | All `Box` props forwarded (margin, padding, etc.) |

## States

| State | Visual Description |
|---|---|
| Default (neutral) | Dark neutral background, white monospace number |
| Mint | Mint-dark background — brand affirmation |
| Ruby | Ruby-dark background — error/destructive count |
| Gold | Gold-dark background — warning count |
| Overflow | Shows `{maxCount}+` when count exceeds maxCount |
| With border | Adds 1px border in the specified color/tint |

## Code Example

```tsx
import Counter from '@teamleader/ahoy/dist/es/components/counter';

// Basic count
<Counter count={5} />

// Capped at 99
<Counter count={142} maxCount={99} color="ruby" />

// Small mint counter
<Counter count={3} color="mint" size="small" />

// With border
<Counter count={7} color="neutral" borderColor="neutral" borderTint="dark" />
```

## Cross-references
- `Badge` — text-based status indicator
- `Tab` — often composes with Counter to show item count per tab
- `typography/Monospaced` — used internally to render the number
