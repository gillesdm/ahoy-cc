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
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                             │
│  [Left — empty by default]   [Search ──────────] [+]  [🔔3] [👥] [🎁]  [? Need help?]  [⏱ 00:00]  [●]  [JD]  [Upgrade now] │
│                                                                                             │
└─────────────────────────── 1px bottom border ───────────────────────────────────────────────┘
```

1. **Root** — Full-width bar, `var(--space-8)` tall (48px), white background, 1px bottom border via inset box-shadow
2. **Right** — Right-aligned flex row; `var(--space-4)` gap (12px) between all top-level groups; `var(--space-7)` right offset (36px)
3. **Actions** — Search input + teal add button; `var(--space-2)` gap (6px)
4. **Links** — Notification bell (with Counter badge), contacts, gift icon buttons + "Need help?" button; `var(--space-2)` gap (6px)
5. **Timer** — Stopwatch control; displays elapsed time (e.g. `00:00`)
6. **Logo** — Teamleader logo mark in a 30×30px circular chip; `var(--color-surface)` bg, `var(--color-border)` border
7. **Avatar** — Current user initials or photo; 30×30px
8. **MKT CTA** — Optional "Upgrade now" marketing button; shown when `mktAction=True`

## Tokens Used

| Role | Token |
|------|-------|
| Background | `var(--color-bg)` |
| Bottom border | `var(--color-border)` |
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

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
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
// TopBar is a custom composition — assemble from sub-components:
import { Input }       from '@teamleader/ahoy/dist/es/components/input';
import { Button }      from '@teamleader/ahoy/dist/es/components/button';
import { IconButton }  from '@teamleader/ahoy/dist/es/components/iconButton';
import { Counter }     from '@teamleader/ahoy/dist/es/components/counter';
import { Timer }       from '@teamleader/ahoy/dist/es/components/timer';
import { Avatar }      from '@teamleader/ahoy/dist/es/components/avatar';

<header className="top-bar">
  <div className="top-bar__right">
    {/* Actions */}
    <div className="top-bar__actions">
      <Input placeholder="Search" size="small" prefix={<SearchIcon />} />
      <Button icon={<AddIcon />} level="primary" size="small" />
    </div>

    {/* Links */}
    <div className="top-bar__links">
      <div style={{ position: 'relative' }}>
        <IconButton icon={<BellIcon />} />
        <Counter count={3} />
      </div>
      <IconButton icon={<PeopleIcon />} />
      <IconButton icon={<GiftIcon />} />
      <Button icon={<HelpIcon />} label="Need help?" />
    </div>

    <Timer />

    {/* Logo chip */}
    <div className="top-bar__logo">
      <LogoMark />
    </div>

    <Avatar name="John Doe" size="small" />

    {/* Marketing CTA */}
    <button className="top-bar__mkt-cta">Upgrade now</button>
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
- [Button](../atoms/button.md) — Teal add (`level="primary"`) and "Need help?" (with icon and label)
- [IconButton](../atoms/icon-button.md) — Notification bell, contacts, gift icon buttons
- [Counter](../molecules/counter.md) — Red notification count badge overlaid on the bell icon
- [Timer](../atoms/timer.md) — Elapsed time stopwatch control
- [Avatar](../atoms/avatar.md) — Current user identity chip (initials or photo)
- [marketingButton](../atoms/marketingButton.md) — Purple "Upgrade now" CTA

## Used by

_No known usages yet._
