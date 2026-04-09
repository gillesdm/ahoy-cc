# Ahoy Demo

A Vite + React 18 + TypeScript reference implementation of the [`@teamleader/ahoy`](https://www.npmjs.com/package/@teamleader/ahoy) design system (v3.x). Use it as a living prototype and component playground.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Routing | React Router v7 |
| Design system | `@teamleader/ahoy` v3.4.0 |
| Styling | CSS custom properties — no CSS modules, no Tailwind |

## Claude commands

This repo ships Claude Code slash commands for common workflows. Run `/get-started` first if you haven't set up the MCP servers yet.

### Setup
| Command | What it does |
|---------|-------------|
| `/get-started` | Interactive wizard to install Figma MCP and/or Playwright MCP |
| `/setup-figma-mcp` | Install Figma MCP (lets Claude read Figma URLs directly) |
| `/setup-playwright-mcp` | Install Playwright MCP (lets Claude control a browser) |

### Specs
| Command | What it does |
|---------|-------------|
| `/create-spec [name]` | Create a new design spec via guided interview |
| `/figma-spec [url]` | Generate a spec from a Figma design URL |
| `/spec-lookup [description]` | Find relevant specs before building UI |

### Development
| Command | What it does |
|---------|-------------|
| `/create-component-from-spec [spec]` | Generate a React component from a spec, Ahoy imports wired automatically |
| `/playwright-import "URL" ["action"]` | Scrape a page, map it to Ahoy components, generate a full prototype page |

## Adding a page manually

Follow the 4-step pattern in `CLAUDE.md` → "Adding a new page".

## Token rules

All CSS must use `var(--token)` references from `src/tokens.css`. Run the audit before committing:

```bash
node scripts/token-audit.js   # must exit 0
```

## Project structure

```
ahoy-demo/src/
  App.tsx          — route definitions
  main.tsx         — router entry point + CSS import order
  tokens.css       — Layer 2 design tokens
  components/
    Sidebar.tsx    — nav items (NAV_ITEMS)
    TopBar.tsx     — page header
  pages/           — routed page components
specs/
  foundations/     — color, spacing, typography, radius, elevation, motion
  atoms/           — Button, Input, Checkbox, Tag, …
  molecules/       — Counter, Hero, Tab, Widget, …
  organisms/       — DataGrid, Dialog, Sidebar, TopBar, …
  patterns/        — layout, island, flex, grid, …
  tokens/          — master token reference
scripts/
  token-audit.js   — CI token checker
.claude/commands/  — Claude Code slash commands
```
