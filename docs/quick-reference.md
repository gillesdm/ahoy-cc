# Quick Reference

Fast lookup tables for specs, tokens, and commands.

---

## Key commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the live prototype at `http://localhost:5173` |
| `node scripts/token-audit.js` | Check for raw values that should be tokens |
| `/figma-spec <figma-url>` | Create a spec from a Figma component |
| `/create-spec <name>` | Create a spec via guided Q&A interview |
| `/create-component-from-spec <spec>` | Scaffold a React component from an existing spec |
| `/spec-lookup <description>` | Surface relevant specs before building |
| `claude` | Open Claude Code in the current directory |

---

## Spec locations by task

| I want to… | Spec to read |
|---|---|
| Use a button | [`specs/atoms/button.md`](../specs/atoms/button.md) |
| Use a text input | [`specs/atoms/input.md`](../specs/atoms/input.md) |
| Use an icon button | [`specs/atoms/icon-button.md`](../specs/atoms/icon-button.md) |
| Show a badge or status label | [`specs/atoms/badge.md`](../specs/atoms/badge.md) |
| Show an avatar | [`specs/atoms/avatar.md`](../specs/atoms/avatar.md) |
| Use a checkbox | [`specs/atoms/checkbox.md`](../specs/atoms/checkbox.md) |
| Use a toggle / switch | [`specs/atoms/toggle.md`](../specs/atoms/toggle.md) |
| Show a link | [`specs/atoms/link.md`](../specs/atoms/link.md) |
| Show a tag | [`specs/atoms/tag.md`](../specs/atoms/tag.md) |
| Show a numeric counter | [`specs/molecules/counter.md`](../specs/molecules/counter.md) |
| Build a hero / logo section | [`specs/molecules/hero.md`](../specs/molecules/hero.md) |
| Build a tab bar | [`specs/molecules/tab.md`](../specs/molecules/tab.md) |
| Build a dropdown select | [`specs/molecules/select.md`](../specs/molecules/select.md) |
| Build a split button | [`specs/molecules/splitButton.md`](../specs/molecules/splitButton.md) |
| Show an alert / banner | [`specs/molecules/alert.md`](../specs/molecules/alert.md) |
| Show a toast notification | [`specs/molecules/toast.md`](../specs/molecules/toast.md) |
| Show a tooltip | [`specs/molecules/tooltip.md`](../specs/molecules/tooltip.md) |
| Group buttons | [`specs/molecules/buttonGroup.md`](../specs/molecules/buttonGroup.md) |
| Build a navigation sidebar | [`specs/organisms/sidebar.md`](../specs/organisms/sidebar.md) |
| Show a modal dialog | [`specs/organisms/dialog.md`](../specs/organisms/dialog.md) |
| Show an empty state | [`specs/organisms/emptyState.md`](../specs/organisms/emptyState.md) |
| Build a data table | [`specs/organisms/datagrid.md`](../specs/organisms/datagrid.md) |
| Build filter controls | [`specs/organisms/filterSelection.md`](../specs/organisms/filterSelection.md) |
| Build a side panel / drawer | [`specs/organisms/sidePanel.md`](../specs/organisms/sidePanel.md) |
| Lay out a page | [`specs/patterns/layout.md`](../specs/patterns/layout.md) |
| Use a box primitive | [`specs/patterns/box.md`](../specs/patterns/box.md) |
| Use flexbox layout | [`specs/patterns/flex.md`](../specs/patterns/flex.md) |
| Use grid layout | [`specs/patterns/grid.md`](../specs/patterns/grid.md) |
| Wrap content in an island | [`specs/patterns/island.md`](../specs/patterns/island.md) |
| Understand colour | [`specs/foundations/color.md`](../specs/foundations/color.md) |
| Understand spacing | [`specs/foundations/spacing.md`](../specs/foundations/spacing.md) |
| Understand typography | [`specs/foundations/typography.md`](../specs/foundations/typography.md) |
| Understand elevation | [`specs/foundations/elevation.md`](../specs/foundations/elevation.md) |
| Understand motion | [`specs/foundations/motion.md`](../specs/foundations/motion.md) |
| See every token | [`specs/tokens/token-reference.md`](../specs/tokens/token-reference.md) |

---

## Browse by category

| Category | Specs |
|---|---|
| [Atoms](../specs/atoms/) | avatar, badge, button, checkbox, icon, icon-button, input, label, link, radio, tag, toggle, … |
| [Molecules](../specs/molecules/) | alert, buttonGroup, counter, datepicker, hero, menu, pagination, select, sidebar-menu-item, splitButton, tab, toast, tooltip, … |
| [Organisms](../specs/organisms/) | datagrid, datepicker, dialog, emptyState, filterSelection, sidebar, sidePanel, wysiwygEditor, … |
| [Patterns](../specs/patterns/) | box, container, flex, grid, island, layout, shadowedScrollContainer |
| [Foundations](../specs/foundations/) | color, elevation, motion, radius, spacing, typography |

---

## Token cheat sheet

| What you want | Token |
|---|---|
| Primary text | `var(--color-text)` |
| Subtle text | `var(--color-text-subtle)` |
| Page background | `var(--color-bg)` |
| Card surface | `var(--color-surface)` |
| Border / divider | `var(--color-border)` |
| Brand / mint green | `var(--color-accent)` |
| Spacing xs→xl | `var(--space-1)` … `var(--space-9)` |
| Font size xs→xl | `var(--font-size-xs/sm/base/lg/xl)` |
| Font weight | `var(--font-weight-regular/medium/semibold/bold)` |
| Border radius | `var(--radius-sm/md/lg/round)` |
| Shadow / depth | `var(--elevation-1)` … `var(--elevation-4)` |
| Transitions | `var(--transition-border)` · `var(--transition-shadow)` |

Full token reference → [`specs/tokens/token-reference.md`](../specs/tokens/token-reference.md)
