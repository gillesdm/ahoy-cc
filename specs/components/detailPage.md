# DetailPage

## Metadata
- **Name:** DetailPage
- **Category:** Layout / Page Templates
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/detailPage`
- **Sub-components:** `DetailPage.Header`, `DetailPage.Body`

## Overview
**When to use:** Use DetailPage as the top-level layout shell for record detail views (e.g., a contact, deal, or invoice detail screen). It composes a sticky header band with back navigation, title, and action buttons, plus a fixed-width centered body content area below.

**When not to use:** Do not use DetailPage for list/index pages — use a plain `Container` + page-specific layout. Do not use for modal or panel content; DetailPage is a full-page layout primitive.

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  DetailPage.Header  (neutral-lightest bg, bottom border)    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  ←  [BackLink]                                        │  │  ← .back-link (absolute, left: -20px)
│  │  [Heading1 title]  [titleSuffix]    [children/actions]│  │
│  └───────────────────────────────────────────────────────┘  │
│  (Container with --spacer-big horizontal padding)           │
├─────────────────────────────────────────────────────────────┤
│  DetailPage.Body  (fixed Container, max-width 1056px)       │
│  paddingTop: 24px   paddingBottom: 48px                     │
│                                                             │
│  [children]                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-neutral-lightest` | Header background (`backgroundColor: neutral, backgroundTint: lightest`) |
| `--color-border` (`--color-neutral-dark`) | Header bottom border (`borderBottomWidth: 1, borderTint: normal`) |
| `--space-6` (`--spacer-medium`, 24px) | Header padding (`padding: 4` Box scale → 24px), Body paddingTop |
| `--space-8` (`--spacer-bigger`, 48px) | Body paddingBottom |
| `--space-7` (`--spacer-big`, 36px) | Container horizontal gutter (inherited from Container) |
| `--space-9` (`--spacer-biggest`, 72px) | Header top padding when backLinkProps present (`paddingTop: 5` → maps to spacer-regular = 18px in Box scale — see note) |
| `max-width: 1056px` | Body container fixed width |

> Box numeric scale: prop value `4` = `--spacer-medium` (24px), `5` = `--spacer-regular` (18px), `6` = `--spacer-medium` (24px), `7` = `--spacer-big` (36px), `8` = `--spacer-bigger` (48px).

## Props / API

### DetailPage

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Typically `DetailPage.Header` + `DetailPage.Body` |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |
| `...others` | `BoxProps` | — | All Box props forwarded |

### DetailPage.Header

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | — | Page title — rendered as `Heading1`, truncated to 1 line |
| `titleColor` | `'teal' \| 'neutral'` | `'teal'` | Color family for the title; `neutral` uses `dark` tint |
| `titleSuffix` | `ReactNode` | — | Node rendered inline after the title (e.g., a status badge) |
| `backLinkProps` | `BadgedLinkProps` | — | When provided, renders a `BadgedLink` with left-arrow icon above the title |
| `children` | `ReactNode` | — | Right-aligned action area (buttons, menus) |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |
| `...others` | `BoxProps` | — | Additional Box props (override padding, background, etc.) |

### DetailPage.Body

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Main body content |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |
| `...others` | `BoxProps` | — | Box props forwarded; `fixed` is always `true` (cannot be overridden via prop here, it is hardcoded) |

## States

| State | Visual Description |
|---|---|
| Without back link | Title sits at normal vertical position within header padding |
| With back link | Title shifts down (`paddingTop: 5`), back-link arrow floats top-left via `position: absolute` |
| Long title | Truncated to single line with ellipsis via `maxLines: 1` |

## Code Example

```tsx
import DetailPage from '@teamleader/ahoy/dist/es/components/detailPage';
import Button from '@teamleader/ahoy/dist/es/components/button';

<DetailPage>
  <DetailPage.Header
    title="Acme Corporation"
    backLinkProps={{ href: '/contacts', children: 'Contacts' }}
    titleSuffix={<StatusLabel color="mint">Active</StatusLabel>}
  >
    <Button level="primary" label="Edit" />
  </DetailPage.Header>

  <DetailPage.Body>
    <p>Detail content goes here…</p>
  </DetailPage.Body>
</DetailPage>
```

## Cross-references
- `Container` — used internally by both Header and Body
- `BadgedLink` — used for the back-link arrow navigation
- `Heading1` — used for the page title
- `Box` — underlying layout primitive
