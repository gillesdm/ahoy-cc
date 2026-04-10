# Prototype

A living prototype built on the [Ahoy design system](https://www.npmjs.com/package/@teamleader/ahoy) by Teamleader. Use it to explore components, turn Figma designs into specs, and generate working prototype pages — all through Claude Code commands.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## First time? Set up your tools

Before using the design and browser commands, run this once:

```
/get-started
```

It walks you through installing two integrations:
- **Figma MCP** — lets Claude read your Figma designs directly from a URL
- **Playwright MCP** — lets Claude open a real browser, navigate pages, and take screenshots

## Claude commands

All commands run inside Claude Code. Type them like `/command-name`.

### Setup

| Command | What it does |
|---------|-------------|
| `/get-started` | Interactive wizard — install Figma and/or Playwright integrations |
| `/setup-figma-mcp` | Install the Figma integration only |
| `/setup-playwright-mcp` | Install the Playwright browser integration only |

### Working with specs

Specs are the source of truth before anything gets built. Claude reads them automatically.

| Command | When to use it | Argument |
|---------|---------------|----------|
| `/figma-spec [url]` | You have a Figma design → Claude reads it and writes a spec | Figma URL |
| `/create-spec [name]` | No Figma file yet → Claude interviews you and writes a spec | Component name |
| `/spec-lookup [description]` | Before building — find which existing specs apply | Plain description |

### Building

| Command | When to use it | Argument |
|---------|---------------|----------|
| `/create-component-from-spec [spec]` | Turn a spec into a working React component | Spec path or name |
| `/playwright-import "URL" ["action"]` | Copy a real page into the prototype — Claude maps it to Ahoy components | URL + optional action |

**Example playwright-import:**
```
/playwright-import "https://example.com/deals" "click on the Deals tab"
```

## Design specs

Specs live in `specs/` and document every component before it gets built. There are 90+ specs covering foundations, atoms, molecules, organisms, and patterns.

```
specs/
  foundations/   — color, spacing, typography, radius, elevation, motion
  atoms/         — Button, Input, Checkbox, Tag, Badge, … (35+ components)
  molecules/     — Counter, Hero, Select, Tab, Tooltip, … (25+ components)
  organisms/     — DataGrid, Dialog, Sidebar, TopBar, … (15+ components)
  patterns/      — layout, flex, grid, island, …
  tokens/        — master token reference
```

## Adding a page manually

Follow the 4-step pattern in `CLAUDE.md` → "Adding a new page".

## The one rule: tokens

All colors, spacing, and sizes use named design tokens — never raw values like `#FF6D22` or `16px`. Everything comes from `src/tokens.css`.

Run the audit before committing:

```bash
node scripts/token-audit.js   # must exit 0
```

## Project structure

```
prototype/src/
  App.tsx          — route definitions
  main.tsx         — entry point + CSS import order
  tokens.css       — design tokens
  components/
    Sidebar.tsx    — nav items (NAV_ITEMS)
    TopBar.tsx     — page header
  pages/           — one file per route
specs/             — design specs (read before building)
scripts/
  token-audit.js   — CI token checker
.claude/commands/  — Claude Code slash commands
```

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Routing | React Router v7 |
| Design system | `@teamleader/ahoy` v3.4.0 |
| Styling | CSS custom properties — no CSS modules, no Tailwind |
