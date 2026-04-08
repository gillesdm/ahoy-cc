# MarketingLink

## Metadata
- **Name:** MarketingLink
- **Category:** Marketing / Navigation
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingLink`

## Overview
**When to use:** Use MarketingLink for inline text links within marketing, upsell, or pricing surfaces where the violet brand palette should be applied — e.g. "Learn more" links inside feature descriptions, terms links on upgrade dialogs.

**When not to use:** Do not use in standard product navigation, breadcrumbs, or table cells. Use the standard `Link` component there.

## Anatomy

```
[anchor / inline element]
  ↳ underlined violet text
  ↳ underline removed on hover
```

- **Root element:** `<a>` by default (configurable via `element` prop)
- **Decoration:** underline by default; removed on hover
- **Focus ring:** 2px violet outline on focus-visible

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet` | Link text color and focus outline color |
| `--duration-base` / `--transition-border` | (Inherited via base styles if composed) |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Link label content. |
| `element` | `string` | `'a'` | HTML element to render (e.g. `'button'`, `'span'`). |
| `href` | `string` | `undefined` | Target URL when `element='a'`. |
| `target` | `string` | `undefined` | Link target (e.g. `'_blank'`). |
| `rel` | `string` | `undefined` | Link rel attribute. |
| `onClick` | `(event: MouseEvent) => void` | `undefined` | Click handler. |
| `className` | `string` | `''` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to the root element. |

MarketingLink also accepts any valid Box layout props (margin, padding, display, etc.) via the underlying `Box` component.

## States

| State | Visual Description |
|---|---|
| Default | Violet text with underline |
| Hover | Underline removed; text color remains violet |
| Focus-visible | 2px solid violet outline |
| Active | Outline removed (`outline: 0`) |
| Visited | No special visited treatment (inherits browser default unless overridden) |

## Code Example

```tsx
import MarketingLink from '@teamleader/ahoy/dist/es/components/marketingLink';

// Inline anchor
<p>
  Discover all features in our{' '}
  <MarketingLink href="/pricing" target="_blank" rel="noopener noreferrer">
    Pro plan
  </MarketingLink>
  .
</p>

// As a button (for SPA navigation or onClick handlers)
<MarketingLink element="button" onClick={() => openUpgradeModal()}>
  Upgrade now
</MarketingLink>
```

## Cross-references
- `Link` — standard product link using the teal/mint palette
- `MarketingButton` — for button-shaped CTAs; use `level="link"` for a link-styled button
- `MarketingDialog` — often contains MarketingLink inside body text
