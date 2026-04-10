# The Spec System

Specs are the source of truth for how every Ahoy component should be built. Claude reads them before writing anything — they're what keeps the prototype consistent with the real product.

---

## Folder structure

```
specs/
├── foundations/        # Core visual language (6 specs)
│   ├── color.md        # All colour tokens and semantic roles
│   ├── spacing.md      # Spacing scale (--space-1 to --space-9)
│   ├── typography.md   # Font sizes, weights, line heights
│   ├── radius.md       # Border radius tokens
│   ├── elevation.md    # Shadow / depth tokens
│   └── motion.md       # Duration and easing tokens
│
├── tokens/
│   └── token-reference.md   # Master map of every CSS custom property
│
├── atoms/              # Smallest building blocks (35 specs)
│   ├── button.md
│   ├── icon.md
│   ├── badge.md
│   ├── avatar.md
│   ├── checkbox.md
│   ├── input.md
│   ├── label.md
│   ├── link.md
│   ├── radio.md
│   ├── tag.md
│   ├── toggle.md
│   └── …
│
├── molecules/          # Two or more atoms composed (27 specs)
│   ├── alert.md
│   ├── buttonGroup.md
│   ├── counter.md
│   ├── datepicker.md
│   ├── hero.md
│   ├── menu.md
│   ├── pagination.md
│   ├── select.md
│   ├── splitButton.md
│   ├── tab.md
│   ├── toast.md
│   ├── tooltip.md
│   └── …
│
├── organisms/          # Complex sections (16 specs)
│   ├── datagrid.md
│   ├── dialog.md
│   ├── emptyState.md
│   ├── filterSelection.md
│   ├── sidebar.md
│   ├── sidePanel.md
│   ├── wysiwygEditor.md
│   └── …
│
├── patterns/           # Layout and interaction conventions (7 specs)
│   ├── box.md
│   ├── container.md
│   ├── flex.md
│   ├── grid.md
│   ├── island.md
│   ├── layout.md
│   └── shadowedScrollContainer.md
│
└── usage.md            # Non-developer usage guide
```

---

## The four tiers

### Foundations
The raw visual language — colours, spacing, typography, radius, elevation, motion. Everything else is built on top of these. If you want to understand *why* a component looks the way it does, start here.

### Atoms
The smallest meaningful UI elements. A button, an icon, a badge. Atoms don't contain other components — they're the leaves of the tree.

### Molecules
Two or more atoms working together as a unit. A counter (badge + number), a tooltip (text + arrow + container), a tab bar (multiple tab atoms). Molecules have a clear single purpose.

### Organisms
Complex, self-contained sections of a page. A sidebar with navigation, a data grid, a dialog. Organisms are typically large enough to occupy a meaningful region of the layout.

### Patterns
Layout and composition conventions — how to arrange organisms and molecules on a page. These aren't visual components themselves; they're rules for structure.

---

## What every spec contains

Each spec file follows the same structure so Claude always knows where to look:

| Section | What it answers |
|---|---|
| **Overview** | When to use this component, when not to |
| **Anatomy** | A diagram labelling every visual part |
| **Tokens Used** | Which CSS variables control colour, spacing, radius, shadow |
| **Props / API** | What options the component accepts |
| **States** | How it looks in default, hover, focus, disabled, error states |
| **Code Example** | A ready-to-use implementation snippet |
| **Uses** | Links to every foundation and sub-component it depends on |
| **Used by** | Links to every component that uses this one |

---

## If a spec doesn't exist yet

If Claude can't find a spec for what you're building, you have three options:

**Option 1 — Generate it from Figma**
If the component exists in Figma, use `/figma-spec` to generate the spec directly from the design. See [Figma Integration](./figma.md).

```
/figma-spec https://www.figma.com/design/...
```

**Option 2 — Interview-based spec (no Figma needed)**
Use `/create-spec` to walk through a short Q&A. Claude asks about the component's purpose, anatomy, states, and props — then writes the spec from your answers. Category and filename are inferred automatically; you confirm before anything is written.

```
/create-spec NotificationBadge
```

**Option 3 — Ask Claude to infer from the closest spec**
```
There's no spec for the notification badge yet.
Use specs/atoms/badge.md as the closest reference and apply the same token conventions.
```

Claude will flag any assumptions it makes so you can review them.

> [!TIP]
> When you add a new spec, update `specs/usage.md` with a one-line entry so it stays discoverable.

---

## From spec to working component

Once a spec file exists, use `/create-component-from-spec` to scaffold the React component automatically:

```
/create-component-from-spec specs/organisms/notification-banner.md
```

Claude will:
1. Read the spec and resolve all sub-component dependencies
2. Show you a plan — which files it will create, which Ahoy components it will import, which tokens it will use
3. Wait for your approval before writing anything
4. Run the token audit automatically and fix any violations before finishing

This works for any spec in any category. The output files go into `prototype/src/components/` and are ready to use immediately.
