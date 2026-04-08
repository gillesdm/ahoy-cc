# Next Steps

## Metadata
- **Name:** Next Steps
- **Category:** Organism
- **Status:** Demo
- **File:** `ahoy-demo/src/App.css` — `#next-steps`, `#docs`, `#next-steps ul`

## Overview

**When to use:**
- Bottom-of-page navigation panel with icon + description + action links
- Two-column layout splitting documentation and deployment resources

**When not to use:**
- Any production navigation pattern — use Ahoy's `NavigationBar` or `SideNavigation`
- More than two sections — the layout is hardcoded to two columns

## Anatomy

```
#next-steps (flex row)
├── #docs (flex: 1, border-right)
│   ├── .icon
│   ├── heading
│   ├── description
│   └── ul > li > a.link-pill
└── div (flex: 1)
    ├── .icon
    ├── heading
    ├── description
    └── ul > li > a.link-pill
```

**Link pill** (`a` inside `#next-steps ul`):
```
┌────────────────────────────────┐
│  [.button-icon]  Link label    │  ← link pill
└────────────────────────────────┘
```

## Tokens Used

### `#next-steps` section

| Property | Token | Value |
|----------|-------|-------|
| `border-top` | `--border` → `--color-border` | neutral-dark |
| Padding (desktop) | `--space-section` | 32px |
| Padding (mobile) | `--space-6` `--space-mobile` | 24px 20px |
| `.icon` margin-bottom | `--space-icon` | 16px |
| `#docs` border-right | `--border` → `--color-border` | neutral-dark |

### `#next-steps ul` and link pills

| Property | Token | Value |
|----------|-------|-------|
| `gap` (ul) | `--space-3` | 8px |
| `margin` (ul) | `--space-section` | 32px top |
| `color` (link) | `--text-h` → `--color-text` | teal-darkest |
| `font-size` (link) | `--font-size-base` | 16px |
| `border-radius` (link) | `--radius-link` | 6px |
| `background` (link) | `--social-bg` → `--color-link-bg` | neutral-light |
| `padding` (link) | `--space-2` `--space-4` | 6px 12px |
| `gap` (link) | `--space-3` | 8px |
| `transition` (link) | `--transition-shadow` | box-shadow 0.3s |
| `box-shadow` (hover) | `--shadow` → `--elevation-2` | normal lift |
| `margin-top` (mobile) | `--space-mobile` | 20px |

### `#spacer`

| Property | Token / Value | Notes |
|----------|--------------|-------|
| `height` (desktop) | `--space-spacer` = 88px | Token used |
| `height` (mobile) | `--space-8` = 48px | Token used |
| `border-top` | `--border` → `--color-border` | neutral-dark |

## States

| Element | State | Visual |
|---------|-------|--------|
| Link pill | Default | Neutral-light background, no shadow |
| Link pill | Hover | Box shadow appears (`--shadow`) |
| `#docs` | Mobile | Right border removed, bottom border added |
| `#next-steps` | Mobile | Stacks vertically, centered text |

## Code Example

```tsx
<section id="next-steps">
  <div id="docs">
    <img className="icon" src={docsIcon} alt="" />
    <h2 className="heading-2">Documentation</h2>
    <p className="text-body">…</p>
    <ul>
      <li>
        <a href="https://docs.teamleader.eu" target="_blank" rel="noreferrer">
          <img className="button-icon" src={icon} alt="" />
          Read the docs
        </a>
      </li>
    </ul>
  </div>
  <div>
    {/* second column */}
  </div>
</section>
```

## Uses

- [Color](../foundations/color.md) — `--color-border`, `--color-link-bg`, `--color-text`, `--color-link`
- [Spacing](../foundations/spacing.md) — `--space-section`, `--space-6`, `--space-mobile`, `--space-3`, `--space-4`, `--space-2`, `--space-icon`, `--space-8`, `--space-spacer`
- [Typography](../foundations/typography.md) — `--font-size-base` for link text
- [Radius](../foundations/radius.md) — `--radius-link` for link pill corners
- [Elevation](../foundations/elevation.md) — `--elevation-2` for link pill hover shadow
- [Motion](../foundations/motion.md) — `--transition-shadow` for link pill hover
- [Button](../atoms/button.md) — primary CTA placed above this section
- [IconButton](../atoms/icon-button.md) — icon element inside link pill items

## Used by

_Page-level organism — composes the bottom section of the demo app page._
Preceded by `#spacer` which shares the same border token.
