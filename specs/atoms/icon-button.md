# IconButton

## Metadata
- **Name:** IconButton
- **Category:** Atom
- **Status:** Stable
- **Import:** `import IconButton from '@teamleader/ahoy/dist/es/components/iconButton'`

## Overview

**When to use:** Use IconButton for compact interactive controls that require no visible label — toolbar actions, close buttons, expand/collapse toggles, or any action where the icon alone sufficiently communicates intent (with a tooltip for accessibility).

**When not to use:** Do not use when a text label is needed — use `Button` instead. Avoid using multiple unlabeled IconButtons in close proximity without tooltips.

## Anatomy

```
<div/button data-teamleader-ui="icon-button">   ← Box (.button-base .icon-button .is-{size})
  ├── <Icon color tint style={iconStyle}>        ← Icon wrapper
  │     └── {icon}                               ← SVG icon prop
  └── {children}                                 ← Optional supplemental content

  [processing state]
  └── <LoadingSpinner className="spinner">       ← Centered spinner overlay
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-neutral-darkest-hsl` | Hover background (`hsl(… / 18%)`), focus ring (`hsl(… / 24%)`), selected background (`hsl(… / 24%)`) |
| `--unit` | Size scale base — all four sizes derived via `calc(N * var(--unit))` |
| `--color-teal-darkest` | Default icon color (via `color="neutral" tint="darkest"`) |

Sizes map to `--unit` multiples:

| Size | Height / min-width |
|---|---|
| `small` | `calc(1.8 * var(--unit))` = 18px |
| `regular` | `calc(2.4 * var(--unit))` = 24px |
| `medium` | `calc(3 * var(--unit))` = 30px |
| `large` | `calc(3.6 * var(--unit))` = 36px |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | — | SVG icon element to render inside the Icon wrapper. |
| `size` | `'small' \| 'regular' \| 'medium' \| 'large'` | `'medium'` | Controls button dimensions. |
| `color` | `'neutral' \| 'teal' \| 'mint' \| 'ruby' \| 'aqua' \| 'violet' \| 'gold' \| 'white'` | `'neutral'` | Icon color family. When `'white'`, the icon renders as `neutral/lightest`. |
| `tint` | `'lightest' \| 'light' \| 'normal' \| 'dark' \| 'darkest'` | `'darkest'` | Icon tint level. When `color="white"`, tint is overridden to `'lightest'`. |
| `disabled` | `boolean` | — | Disables interaction; applies `opacity: 0.48` and `pointer-events: none`. |
| `selected` | `boolean` | — | Applies persistent selected background (`hsl(neutral-darkest / 24%)`). |
| `processing` | `boolean` | `false` | Replaces icon with a centered `LoadingSpinner` and disables interaction. |
| `iconStyle` | `CSSProperties` | — | Inline style forwarded to the inner Icon element. |
| `element` | `ElementType` | `'button'` | Root HTML element or component. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type (only applied when `element="button"`). |
| `className` | `string` | `''` | Additional CSS class names. |
| `children` | `ReactNode` | — | Optional supplemental content rendered after the icon. |
| `...others` | `BoxProps` | — | Layout props forwarded to the Box wrapper. |

## States

| State | Visual description |
|---|---|
| Default | Transparent background, icon at chosen color/tint. |
| Hover | Background `hsl(neutral-darkest / 18%)`. |
| Focus-visible | Box-shadow ring `0 0 0 2px hsl(neutral-darkest / 24%)`. |
| Active | Inset box-shadow `0 2px 3px hsl(neutral-darkest / 12%)` + same hover background. |
| Selected | Background `hsl(neutral-darkest / 24%)` (persistent). |
| Disabled | Opacity `0.48`, no pointer events, cursor auto. |
| Processing | Icon replaced by centered LoadingSpinner, pointer events disabled. |

## Code Example

```tsx
import IconButton from '@teamleader/ahoy/dist/es/components/iconButton';
import { IconAddSmallOutline } from '@teamleader/ahoy/dist/es/assets/icons/components';

// Default medium icon button
<IconButton icon={<IconAddSmallOutline />} />

// Small, mint, with tooltip (accessibility)
<IconButton
  icon={<IconAddSmallOutline />}
  size="small"
  color="mint"
  tint="dark"
/>

// Processing state
<IconButton
  icon={<IconAddSmallOutline />}
  processing={true}
/>

// Disabled
<IconButton
  icon={<IconAddSmallOutline />}
  disabled
/>
```

## Uses

- `Icon` — SVG icon rendered inside the button wrapper
- `LoadingSpinner` — shown centered in the button during processing state
- [Color](../foundations/color.md) — Layer 1 `--color-neutral-darkest-hsl` for interaction states, `--color-teal-darkest` for default icon

## Used by

- [Next Steps](../organisms/next-steps.md) — icon element used inside link pill items (`<img class="button-icon">`)
