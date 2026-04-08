# Link

## Metadata
- **Name**: Link
- **Category**: Navigation / Actions
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/link`

## Overview

**When to use**: Use Link for inline navigation — hyperlinks within prose, breadcrumbs, or any text-level navigation. Supports standard anchor behavior, external links (opens in new tab with external icon), and button-element usage for SPA navigation handlers.

**When not to use**: Do not use Link for primary CTA actions — use `Button`. Do not use it when the interactive area needs padding or icon-only affordance — use `Button` or `IconButton`.

## Anatomy

```
<a|button|… data-teamleader-ui="link">   ← Box (.link .is-inherit? .is-inverse? .is-disabled?)
  ├── {children}                         ← Link text
  └── [external icon]                    ← <Icon><IconExternalLinkSmallOutline /></Icon>
                                            (only when external=true)
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-aqua-dark` | Non-inherit link color and focus outline |
| `--spacer-smaller` (6px) | Gap between text and external icon (`margin-left`) |
| `--font-family-inter` | Non-inherit link typeface |

Behavior matrix (inherit × inverse):

| Mode | Default | Hover / Active |
|---|---|---|
| Non-inherit, non-inverse | Color `--color-aqua-dark`, no underline | Underline added |
| Non-inherit, inverse | Color `--color-aqua-dark`, underline | Underline removed |
| Inherit, non-inverse | Color inherits, underline | Underline removed |
| Inherit, inverse | Color inherits, no underline | Underline added |

Focus-visible: `outline: 2px solid --color-aqua-dark`.

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Link label text or content. |
| `inherit` | `boolean` | `true` | When `true`, inherits color and font from surrounding text. When `false`, uses `--color-aqua-dark` with Inter typeface. |
| `inverse` | `boolean` | `false` | Inverts underline behavior (underline at rest, removed on hover) for use on dark backgrounds. |
| `external` | `boolean` | — | Appends an external link icon and sets `target="_blank" rel="noreferrer"` on anchor elements. |
| `disabled` | `boolean` | `false` | Applies `opacity: 0.48` and `pointer-events: none`. |
| `selected` | `boolean` | — | Reserved selected state (class applied but no default visual — caller provides styles). |
| `element` | `ElementType` | `'a'` | Root element. Use `'button'` for SPA navigation without `href`. |
| `href` | `string` | — | URL (when `element="a"`). |
| `className` | `string` | `''` | Additional CSS class names. |
| `...others` | `BoxProps` | — | Layout and HTML props forwarded to the Box wrapper. |

## States

| State | Visual description |
|---|---|
| Default (inherit) | Color inherited, underlined. |
| Default (non-inherit) | `--color-aqua-dark` text, no underline. |
| Hover | Underline toggled (see matrix above). |
| Focus-visible | 2px solid `--color-aqua-dark` outline. |
| Active | Outline removed; underline behavior same as hover. |
| Disabled | `opacity: 0.48`, no pointer events. |
| External | External icon appended with 6px left margin. |
| Inverse | Underline/hover behavior inverted (see matrix above). |

## Code Example

```tsx
import Link from '@teamleader/ahoy/dist/es/components/link';

// Inline link inheriting surrounding text style
<p>
  Read the <Link href="/docs">documentation</Link> for more.
</p>

// Standalone aqua link
<Link href="/pricing" inherit={false}>
  View pricing
</Link>

// External link
<Link href="https://teamleader.eu" external inherit={false}>
  Teamleader website
</Link>

// Button element for SPA navigation
<Link element="button" onClick={handleNavigate}>
  Go to dashboard
</Link>

// Inverse (on dark background)
<Link inverse inherit={false} href="/help">
  Help center
</Link>
```

## Cross-references
- `Button` — labeled action button
- `IconButton` — icon-only action
- `BadgedLink` — link with a notification badge
- `MarketingLink` — marketing-surface variant of Link
