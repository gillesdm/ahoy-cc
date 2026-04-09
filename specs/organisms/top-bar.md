# TopBar

## Metadata
- **Name:** TopBar
- **Category:** Organism
- **Status:** Stable
- **Source:** Custom composition — not a direct Ahoy component
- **Figma:** [Teamleader Recipes — TopBar](https://www.figma.com/design/JFI2FuLvNtL1f1wkkxLFEv/Teamleader-Recipes?node-id=7-4131)

## Overview

**When to use:**
- As the fixed top navigation bar of a Teamleader application shell
- To provide global controls: search, quick actions, icon links, user identity, and optional upgrade CTA

**When not to use:**
- As a page-level header inside a content area (use a page header pattern instead)
- Inside a modal, panel, or nested layout

## Anatomy

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                      │
│  [Heading?]          [Search ──────────] [+]  [🔔3] [👤+] [🎁]  [⏱ 00:00]  [▲]  [JD]  [Upgrade now] │
│                                                                                                      │
└──────────────────────────────── 1px bottom border ──────────────────────────────────────────────────┘
```

1. **Root** — Full-width bar, `var(--space-8)` tall (48px), white background, 1px bottom border via inset box-shadow; `var(--space-7)` padding left and right
2. **Left** — Optional page heading (`<h1>`); hidden when no `heading` prop is passed
3. **Right** — Right-aligned flex row; `var(--space-4)` gap (12px) between all top-level groups
4. **Actions** — Search input + teal add button; `var(--space-2)` gap (6px)
5. **Links** — Notification bell (with Counter badge), add-user, gift icon buttons; `var(--space-2)` gap (6px)
6. **Timer** — Stopwatch icon (`Svg24X24TimerOutline`) + elapsed time text (e.g. `00:00`); neutral translucent pill
7. **Logo** — Teamleader logo mark (three ascending triangles, inline SVG) in a 30×30px circular chip; `var(--color-surface)` bg, `var(--color-border)` border
8. **Avatar** — Current user initials or photo; 30×30px
9. **MKT CTA** — Optional "Upgrade now" marketing button; shown when `mktAction=True`

## Tokens Used

| Role | Token |
|------|-------|
| Background | `var(--color-bg)` |
| Bottom border | `var(--color-border)` |
| Heading text | `var(--color-text)` |
| Heading font size | `var(--font-size-base)` |
| Heading font weight | `var(--font-weight-semibold)` |
| Input border | `var(--color-border)` |
| Placeholder / subtle text | `var(--color-text-subtle)` |
| Body text | `var(--color-text)` |
| Teal add button background | `var(--color-accent)` |
| Teal add button border | `var(--color-accent-border)` |
| Notification counter background | `var(--color-error)` |
| Height | `var(--space-8)` |
| Right padding | `var(--space-7)` |
| Gap between top-level groups | `var(--space-4)` |
| Gap within Actions / Links groups | `var(--space-2)` |
| Control border radius | `var(--radius-md)` |
| Logo chip border radius | `var(--radius-round)` |

Non-tokenised structural values:

| Property | Value | Reason |
|----------|-------|--------|
| Control height (buttons, input, timer) | `30px` | Standard Ahoy small control height — not on the spacing scale |
| Avatar / logo chip size | `30×30px` | Standard Ahoy small avatar size — unique structural constraint |
| Marketing CTA background | `#4F1FFF` | Marketing brand purple — not mapped to UI design tokens |
| Logo mark triangle fills | `#17BFC0`, `#0D9E9F`, `#067374` | Teamleader brand teal gradient — no Ahoy component; rendered as inline SVG |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | — | Optional page heading shown on the left (e.g. `"Projects"`); omit to leave the left side empty |
| `mktAction` | `"True" \| "False"` | `"True"` | Show or hide the purple "Upgrade now" marketing CTA |
| `withTabs` | `"True" \| "False"` | `"False"` | Show a tab navigation row immediately below the top bar |

## States

| State | Visual |
|-------|--------|
| Default | White bar; all controls visible; notification counter badge shown on bell icon |
| No CTA (`mktAction=False`) | Marketing "Upgrade now" button is hidden; remaining controls shift left |
| With tabs (`withTabs=True`) | Additional tab navigation row rendered directly below the bar |
| Timer active | Timer text updates live; background and border remain the same neutral style |

## Code Example

```tsx
import { Button }    from '@teamleader/ahoy/dist/es/components/button';
import IconButton    from '@teamleader/ahoy/dist/es/components/iconButton';
import Svg14X14AddOutline        from '@teamleader/ahoy/dist/es/assets/icons/components/14X14AddOutline';
import Svg14X14SearchOutline     from '@teamleader/ahoy/dist/es/assets/icons/components/14X14SearchOutline';
import Svg24X24BellOutline       from '@teamleader/ahoy/dist/es/assets/icons/components/24X24BellOutline';
import Svg24X24ContactsFilled    from '@teamleader/ahoy/dist/es/assets/icons/components/24X24ContactsFilled';
import Svg24X24GiftOutline       from '@teamleader/ahoy/dist/es/assets/icons/components/24X24GiftOutline';
import Svg24X24UserAddOutline    from '@teamleader/ahoy/dist/es/assets/icons/components/24X24UserAddOutline';
import Svg24X24TimerOutline      from '@teamleader/ahoy/dist/es/assets/icons/components/24X24TimerOutline';

// LogoMark — inline SVG; no dedicated Ahoy component exists
function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="3,18 16.04,18 9.52,6.82"     fill="#17BFC0" />
      <polygon points="10.48,17.18 17,17.18 13.74,6" fill="#0D9E9F" />
      <polygon points="18,17.15 21,17.15 19.5,6.86"  fill="#067374" />
    </svg>
  );
}

<header className="top-bar">
  <div className="top-bar__left">
    {heading && <h1 className="top-bar__heading">{heading}</h1>}
  </div>
  <div className="top-bar__right">

    {/* Actions */}
    <div className="top-bar__actions">
      <div className="top-bar__search-wrapper">
        <span className="top-bar__search-icon"><Svg14X14SearchOutline /></span>
        <input className="top-bar__search" type="search" placeholder="Search" aria-label="Search" />
      </div>
      <Button icon={<Svg14X14AddOutline />} level="primary" size="small" />
    </div>

    {/* Links */}
    <div className="top-bar__links">
      <div className="top-bar__bell-wrapper">
        <IconButton icon={<Svg24X24BellOutline />} />
        {notificationCount > 0 && (
          <span className="top-bar__badge" aria-label={`${notificationCount} notifications`}>
            {notificationCount}
          </span>
        )}
      </div>
      <IconButton icon={<Svg24X24UserAddOutline />} />
      <IconButton icon={<Svg24X24GiftOutline />} />
    </div>

    {/* Timer */}
    <button className="top-bar__timer" type="button" aria-label="Start timer">
      <Svg24X24TimerOutline aria-hidden="true" />
      00:00
    </button>

    {/* Logo chip */}
    <div className="top-bar__logo" role="img" aria-label="Teamleader">
      <LogoMark />
    </div>

    {/* Avatar */}
    <div className="top-bar__avatar" aria-label="Logged in as John Doe">JD</div>

    {/* Marketing CTA */}
    {mktAction === 'True' && (
      <button className="top-bar__mkt-cta" type="button">Upgrade now</button>
    )}
  </div>
</header>
```

```css
.top-bar {
  height: var(--space-8);              /* 48px */
  background: var(--color-bg);
  box-shadow: inset 0 -1px 0 var(--color-border);
  position: relative;
}

.top-bar__right {
  position: absolute;
  top: 50%;
  right: var(--space-7);              /* 36px */
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-4);               /* 12px between groups */
}

.top-bar__actions,
.top-bar__links {
  display: flex;
  align-items: center;
  gap: var(--space-2);               /* 6px within groups */
}

.top-bar__logo {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-round);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-bar__mkt-cta {
  height: 30px;
  padding: 0 12px;
  background: #4F1FFF;              /* marketing purple — not tokenised */
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}
```

## Uses

- [Color](../foundations/color.md) — `--color-bg`, `--color-border`, `--color-surface`, `--color-text`, `--color-text-subtle`, `--color-accent`, `--color-accent-border`, `--color-error`
- [Spacing](../foundations/spacing.md) — `--space-2`, `--space-4`, `--space-7`, `--space-8`
- [Typography](../foundations/typography.md) — `--font-size-sm`, `--font-weight-medium`
- [Radius](../foundations/radius.md) — `--radius-md`, `--radius-round`
- [Input](../atoms/input.md) — Search input field (274px wide, `size="small"`)
- [Button](../atoms/button.md) — Teal add button (`level="primary"`)
- [IconButton](../atoms/icon-button.md) — Notification bell, contacts, gift icon buttons
- [Counter](../molecules/counter.md) — Red notification count badge overlaid on the bell icon
- [Timer](../atoms/timer.md) — Elapsed time stopwatch control
- [Avatar](../atoms/avatar.md) — Current user identity chip (initials or photo)
- [marketingButton](../atoms/marketingButton.md) — Purple "Upgrade now" CTA

## Used by

_No known usages yet._
