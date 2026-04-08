# MarketingMenuItem

## Metadata
- **Name:** MarketingMenuItem
- **Category:** Marketing / Navigation
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingMenuItem`

## Overview
**When to use:** Use MarketingMenuItem inside navigation menus or feature lists to present locked or upgrade-eligible features. It always renders a `MarketingLockBadge` as its leading element, making the upgrade affordance explicit. Typical use: sidebar navigation items for features locked to a higher tier.

**When not to use:** Do not use for standard navigation menu items that are not upgrade-gated. Use the standard `MenuItem` from the `menu` component for those.

## Anatomy

```
┌────────────────────────────────────────────────────────┐
│  <li>                                                  │
│    ┌──────────────────────────────────────────────┐   │
│    │  [LockBadge]  [label]       [optional icon]  │   │  ← inner button/anchor
│    │               [caption]                      │   │
│    └──────────────────────────────────────────────┘   │
│  </li>                                                 │
└────────────────────────────────────────────────────────┘
```

- **Outer element:** `<li>` (Box with `display="flex"`)
- **Inner element:** `<button>` by default (configurable via `element` prop); full-width flex row
- **Leading:** `MarketingLockBadge` size=small (always present)
- **Text area:** `TextBodyCompact` for `label`; optional `TextBodyCompact` in neutral tint for `caption`
- **Trailing:** optional `icon` (violet color)

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--marketing-menu-item-background` → `--color-neutral-lightest` | Default item background |
| `--marketing-menu-item-hover-background` → `--color-neutral-light` | Hover background |
| `--marketing-menu-item-selected-background` → `--color-aqua-lightest` | Selected state background |
| `--marketing-menu-item-height` → `calc(3.6 * var(--unit))` = 36px | Minimum item height |
| `--color-violet` | Label text color and icon color |
| `--color-neutral` / `--color-neutral-darkest` | Caption text color |
| `--unit` | Height/padding scale base |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Primary item text, rendered as `TextBodyCompact`. |
| `caption` | `string \| undefined` | `undefined` | Secondary descriptive text below the label, rendered in neutral tint. |
| `icon` | `ReactNode` | `undefined` | Optional trailing icon (renders in violet). |
| `selected` | `boolean` | `false` | Whether the item is in selected/active state. Applies aqua-lightest background. |
| `onClick` | `(event: MouseEvent) => void` | `undefined` | Click handler on the inner element. |
| `element` | `string` | `'button'` | Inner element type. Use `'a'` for link behavior (sets `tabIndex=-1` on inner, focus managed by outer `<li>`). |
| `className` | `string` | `''` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to the outer `<li>` element. |

## States

| State | Visual Description |
|---|---|
| Default | Neutral-lightest background, violet label and icon text |
| Hover | `--color-neutral-light` background, cursor pointer |
| Focus-visible | `--color-neutral-light` background |
| Selected | `--color-aqua-lightest` background; `pointer-events: none` on hover |
| Disabled | `pointer-events: none`, no outline |
| With caption | Caption rendered below label in neutral-darkest tint |
| With icon | Violet icon trailing after the text area |

## Code Example

```tsx
import MarketingMenuItem from '@teamleader/ahoy/dist/es/components/marketingMenuItem';
import { IconExternalSmallOutline } from '@teamleader/ahoy/dist/es/assets/icons/components';

// Basic locked menu item
<ul>
  <MarketingMenuItem
    label="Advanced reporting"
    caption="Available on Pro plan"
    onClick={() => openUpgradeDialog()}
  />

  <MarketingMenuItem
    label="Custom domains"
    icon={<IconExternalSmallOutline />}
    selected={false}
    onClick={() => openUpgradeDialog()}
  />
</ul>

// As a link
<MarketingMenuItem
  element="a"
  href="/pricing"
  label="View all features"
/>
```

## Cross-references
- `MarketingLockBadge` — always embedded as the leading element
- `MenuItem` — standard (non-marketing) menu item
- `MarketingTab` — alternative marketing navigation with lock badge for tab bar contexts
