# Teamleader Design Specs

> A living spec system and interactive prototype environment for the Teamleader product — powered by the [Ahoy](https://github.com/teamleader/ahoy) design system and Claude Code.

Designers describe what they want. The specs tell Claude how to build it correctly — using the right tokens, the right components, and the right import paths every time.

---

## Table of Contents

1. [What is this?](#1-what-is-this)
2. [Before you start](#2-before-you-start)
3. [Installation](#3-installation)
4. [Starting the prototype](#4-starting-the-prototype)
5. [Using Claude Code](#5-using-claude-code)
   - [Asking Claude to build things](#asking-claude-to-build-things)
   - [Pointing Claude to a specific spec](#pointing-claude-to-a-specific-spec)
   - [Iterating on what Claude built](#iterating-on-what-claude-built)
6. [The spec system](#6-the-spec-system)
   - [Folder structure](#folder-structure)
   - [What a spec contains](#what-a-spec-contains)
7. [Creating specs from Figma](#7-creating-specs-from-figma)
   - [What /create-spec does](#what-create-spec-does)
   - [How to run it](#how-to-run-it)
   - [What happens next](#what-happens-next)
8. [The token system](#8-the-token-system)
9. [Running the token audit](#9-running-the-token-audit)
10. [Handing off to a developer](#10-handing-off-to-a-developer)
11. [Quick reference](#11-quick-reference)

---

## 1. What is this?

This repository contains two things working together:

| | What it is | Where it lives |
|---|---|---|
| **Spec library** | Written design decisions for every Ahoy component — tokens, states, anatomy, usage rules | `specs/` |
| **Live prototype** | A Vite + React app that Claude edits in real time as you describe what you want | `ahoy-demo/` |

You don't write any code. You describe what you want in plain English, Claude reads the relevant spec, and the prototype updates in your browser.

---

## 2. Before you start

You need the following installed on your machine. If you're unsure, ask a developer to set these up once.

| Tool | Why you need it | Check if installed |
|---|---|---|
| [Node.js](https://nodejs.org) v18 or later | Runs the prototype and the audit script | `node --version` |
| [Claude Code](https://claude.ai/code) | The AI assistant that reads specs and writes code | `claude --version` |
| A Figma account | Required only for `/create-spec` | — |

---

## 3. Installation

Open your terminal, navigate to this folder, and run:

```bash
cd ahoy-demo
npm install
```

This downloads all the libraries the prototype needs. You only need to do this once (or after pulling new changes from git).

---

## 4. Starting the prototype

**Step 1** — Start the dev server (keep this terminal window open):

```bash
cd ahoy-demo
npm run dev
```

You'll see something like:

```
  VITE v6.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173` in your browser. This is your live prototype — it updates instantly whenever Claude makes a change.

**Step 2** — In a separate terminal window, open Claude Code:

```bash
claude
```

Claude automatically reads `CLAUDE.md` on startup, which loads all the project rules and points it to the spec library.

---

## 5. Using Claude Code

### Asking Claude to build things

You don't need to know component names or technical terms. Describe what you want — Claude looks up the right spec and implements it correctly.

**Starting from a blank page:**
```
Build a page with a heading, a short description, and a primary mint-green button centred on screen.
```

**Adding a component:**
```
Add a text input below the heading. Show an error message if it's left empty.
```

**Layout:**
```
Split the page into two columns — text on the left, a demo widget on the right.
Stack them vertically on mobile.
```

**Asking what's available:**
```
What button styles exist? Show me all the options.
```
```
What spacing tokens should I use for section-level padding?
```

**Changing something that already exists:**
```
The button is too small. Can you give it more padding and make the label larger?
```
```
Replace the primary button with a split button that has a dropdown.
```

---

### Pointing Claude to a specific spec

For precise results, reference the spec file directly:

```
Following specs/atoms/button.md, add a disabled primary button below the form.
```
```
Use specs/organisms/sidebar.md to build the left navigation.
```
```
Build exactly what's described in specs/molecules/hero.md.
```

---

### Iterating on what Claude built

Claude remembers the full context of your session. You can keep refining naturally:

```
> Build a hero with a heading and a CTA button.

[Claude builds it]

> Make the button secondary instead of primary.

[Claude updates it]

> Add a counter above the button showing "42 active users".

[Claude adds the counter molecule]

> The counter needs more space above it — it feels cramped.

[Claude adjusts the spacing token]
```

Every change goes through the spec system. Claude won't introduce raw colours or break the token rules mid-conversation.

---

## 6. The spec system

### Folder structure

The `specs/` folder is organised by design-system hierarchy. Claude reads these files before writing anything.

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
│   ├── button.md       # Button levels, states, import path
│   ├── icon.md         # Icon sizes and usage
│   ├── badge.md        # Badge variants
│   ├── toggle.md       # Toggle / switch
│   └── …
│
├── molecules/          # Two or more atoms composed (27 specs)
│   ├── counter.md      # Numeric counter with badge
│   ├── hero.md         # Logo + heading section
│   ├── sidebar-menu-item.md
│   ├── select.md       # Dropdown select
│   ├── tab.md          # Tab navigation
│   └── …
│
├── organisms/          # Complex sections (16 specs)
│   ├── sidebar.md      # Full vertical navigation
│   ├── dialog.md       # Modal dialogs
│   ├── datagrid.md     # Data table
│   ├── datepicker.md   # Date picker
│   └── …
│
├── patterns/           # Layout and interaction conventions (7 specs)
│   ├── layout.md       # Page layout structure
│   ├── box.md          # Box layout primitive
│   ├── flex.md         # Flexbox utility
│   ├── grid.md         # Grid utility
│   └── …
│
└── usage.md            # This guide (non-developer version)
```

### What a spec contains

Every spec follows the same structure so Claude always knows where to look:

| Section | What it answers |
|---|---|
| **Overview** | When to use this component, when not to |
| **Anatomy** | A diagram labelling every visual part |
| **Tokens Used** | Which CSS variables control colour, spacing, radius, shadow |
| **Props / API** | What options (props) the component accepts |
| **States** | How it looks in default, hover, focus, disabled, error states |
| **Code Example** | A ready-to-use implementation snippet |
| **Uses** | Links to every foundation and sub-component it depends on |
| **Used by** | Links to every component that uses this one |

---

## 7. Creating specs from Figma

The `/create-spec` command lets you turn any Figma component directly into a spec file — without writing anything yourself.

### What `/create-spec` does

1. **Reads the Figma design** — fetches the component tree, screenshot, and design tokens directly from the Figma API
2. **Scans existing specs** — checks what's already specced so it never creates a duplicate
3. **Shows you a plan** — lists exactly which files it will create and which it will only reference
4. **Waits for your approval** — you confirm (or adjust) the plan before anything is written
5. **Writes the spec files** — creates correctly structured `.md` files in the right folder

### How to run it

Copy the URL of any component frame or section in Figma, then type in Claude Code:

```
/create-spec https://www.figma.com/design/YOUR_FILE_KEY/File-Name?node-id=123-456
```

**Where to find the URL in Figma:**
1. Select the frame or component you want to spec
2. Right-click → **Copy link to selection**
3. Paste it after `/create-spec`

> **Tip:** For best results, select a named component frame — not a raw group or a page. Named Figma components produce richer spec output.

### What happens next

Claude will show you a plan like this before writing anything:

```
Here's what I'm planning to do:

Will CREATE (new spec files):
  specs/organisms/notification-banner.md
  specs/molecules/notification-icon.md

Will REFERENCE (already specced — no new file):
  specs/atoms/button.md       → Dismiss button
  specs/foundations/color.md  → colour tokens consumed

How would you like to proceed?
  1. Proceed
  2. Proceed with adjustments — add a note below
  3. Re-plan — discard and re-analyse
  4. Cancel
```

Reply with a number. You can add a note to option 2 or 3:

```
2 – also add a dark mode variant section to the spec
```

```
3 – the icon is a separate reusable component, please spec it separately
```

Claude will not write any files until you approve.

---

## 8. The token system

Every visual decision in this project uses a named CSS custom property (a "token") instead of a raw value. This is what keeps the prototype consistent with the real product.

| What you want | Token to use |
|---|---|
| Primary text colour | `var(--color-text)` |
| Subtle / secondary text | `var(--color-text-subtle)` |
| Page background | `var(--color-bg)` |
| Card / panel surface | `var(--color-surface)` |
| Dividers and borders | `var(--color-border)` |
| Brand / mint green | `var(--color-accent)` |
| Spacing (small → large) | `var(--space-1)` … `var(--space-9)` |
| Font sizes | `var(--font-size-xs/sm/base/lg/xl)` |
| Font weights | `var(--font-weight-regular/medium/semibold/bold)` |
| Border radius | `var(--radius-sm/md/lg/round)` |
| Shadows | `var(--elevation-1)` … `var(--elevation-4)` |
| Transitions | `var(--transition-border)` · `var(--transition-shadow)` |

The full list is in [`specs/tokens/token-reference.md`](specs/tokens/token-reference.md).

Claude enforces these automatically — you'll never see a raw hex colour like `#00b2b2` in the output. If one slips through, the audit catches it.

---

## 9. Running the token audit

The audit script scans every file in `ahoy-demo/src/` and flags any raw values that should be tokens instead.

Run it at any time:

```bash
node scripts/token-audit.js
```

A clean prototype looks like this:

```
✅ Token audit passed — 0 violations found.
```

If there are violations, Claude can fix them automatically:

```
Run the token audit and fix any violations you find.
```

The audit must pass with zero errors before any changes are committed.

---

## 10. Handing off to a developer

When the prototype is ready, handoff is straightforward:

- **The code already follows production rules** — same Ahoy component import paths, same token names, same API conventions used in the real product
- **The audit confirms no ad-hoc values** — no one-off colours or magic numbers that a developer would have to clean up
- **The spec files explain every decision** — the developer reads the same source Claude used, so nothing is implicit

Tell the developer:

```
The prototype is in ahoy-demo/src/.
It follows the specs in specs/.
Run node scripts/token-audit.js to confirm it's clean.
```

---

## 11. Quick reference

### Spec locations by task

| I want to… | Spec to read |
|---|---|
| Use a button | [`specs/atoms/button.md`](specs/atoms/button.md) |
| Use a text input | [`specs/atoms/input.md`](specs/atoms/input.md) |
| Use an icon button | [`specs/atoms/icon-button.md`](specs/atoms/icon-button.md) |
| Show a badge or status label | [`specs/atoms/badge.md`](specs/atoms/badge.md) |
| Show a numeric counter | [`specs/molecules/counter.md`](specs/molecules/counter.md) |
| Build a hero / logo section | [`specs/molecules/hero.md`](specs/molecules/hero.md) |
| Build a tab bar | [`specs/molecules/tab.md`](specs/molecules/tab.md) |
| Build a dropdown select | [`specs/molecules/select.md`](specs/molecules/select.md) |
| Build a navigation sidebar | [`specs/organisms/sidebar.md`](specs/organisms/sidebar.md) |
| Show a modal dialog | [`specs/organisms/dialog.md`](specs/organisms/dialog.md) |
| Show an empty state | [`specs/organisms/emptyState.md`](specs/organisms/emptyState.md) |
| Lay out a page | [`specs/patterns/layout.md`](specs/patterns/layout.md) |
| Understand colour | [`specs/foundations/color.md`](specs/foundations/color.md) |
| Understand spacing | [`specs/foundations/spacing.md`](specs/foundations/spacing.md) |
| See every token | [`specs/tokens/token-reference.md`](specs/tokens/token-reference.md) |

### Browse by category

| Category | Specs |
|---|---|
| [Atoms](specs/atoms/) | avatar, badge, button, checkbox, icon, input, label, link, radio, tag, toggle, … |
| [Molecules](specs/molecules/) | alert, buttonGroup, counter, datepicker, hero, menu, pagination, select, splitButton, tab, toast, tooltip, … |
| [Organisms](specs/organisms/) | datagrid, dialog, emptyState, filterSelection, sidebar, sidePanel, wysiwygEditor, … |
| [Patterns](specs/patterns/) | box, container, flex, grid, island, layout, shadowedScrollContainer |
| [Foundations](specs/foundations/) | color, elevation, motion, radius, spacing, typography |

### Key commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the live prototype at `http://localhost:5173` |
| `node scripts/token-audit.js` | Check for raw values that should be tokens |
| `/create-spec <figma-url>` | Generate a spec file from a Figma component |

---

*Built with [Ahoy](https://github.com/teamleader/ahoy) · Prototyped with [Claude Code](https://claude.ai/code)*
