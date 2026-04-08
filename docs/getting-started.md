# Getting Started

This guide walks you through everything you need to get the prototype running on your machine for the first time.

---

## Prerequisites

You need the following installed. If you're unsure about any of these, ask a developer to set them up once — you won't need to touch them again.

| Tool | Why you need it | Check if installed |
|---|---|---|
| [Node.js](https://nodejs.org) v18+ | Runs the prototype and the audit script | `node --version` |
| [Claude Code](https://claude.ai/code) | The AI assistant that reads specs and writes code | `claude --version` |
| A Figma account | Required only for `/create-spec` | — |

> [!TIP]
> On macOS, the easiest way to install Node.js is via [nvm](https://github.com/nvm-sh/nvm):
> ```bash
> nvm install --lts
> nvm use --lts
> ```

---

## Installation

Once prerequisites are in place, install the prototype's dependencies:

```bash
cd ahoy-demo
npm install
```

You only need to do this once — and again after pulling changes that modify `package.json`.

---

## Starting the prototype

You need two terminal windows open at the same time.

### Terminal 1 — Dev server

```bash
cd ahoy-demo
npm run dev
```

You'll see:

```
  VITE v6.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

Open [http://localhost:5173](http://localhost:5173) in your browser. **Leave this terminal open** — the server must keep running for the prototype to be live.

The page updates instantly whenever Claude makes a change. No manual refresh needed.

### Terminal 2 — Claude Code

```bash
claude
```

Claude automatically reads `CLAUDE.md` on startup, which loads all project rules and points it to the spec library. You're ready to start building.

---

## What to do next

- **Start building** → [Using Claude Code](./using-claude.md)
- **Understand the spec structure** → [The Spec System](./spec-system.md)
- **Create a spec from Figma** → [Figma Integration](./figma.md)
