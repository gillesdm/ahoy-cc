<p align="center">
  <img src="assets/banner.png" alt="Teamleader Design Specs" width="100%" />
</p>

<p align="center">
  A living spec system and interactive prototype environment for the Teamleader product —<br>powered by the <a href="https://github.com/teamleader/ahoy">Ahoy</a> design system and Claude Code.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Ahoy-3.4.0-00b2b2?style=flat-square" alt="Ahoy 3.4.0" />
  <img src="https://img.shields.io/badge/Claude_Code-required-D97706?style=flat-square" alt="Claude Code" />
</p>

---

Designers describe what they want. The specs tell Claude how to build it correctly — using the right tokens, the right components, and the right import paths every time. **No code required.**

---

## What is this?

Two things working together:

| | What it is | Where it lives |
|---|---|---|
| **Spec library** | Written design decisions for every Ahoy component — tokens, states, anatomy, usage rules | `specs/` |
| **Live prototype** | A Vite + React app that Claude edits in real time as you describe what you want | `ahoy-demo/` |

---

## Documentation

| Guide | What's in it |
|---|---|
| [Getting Started](docs/getting-started.md) | Prerequisites, installation, starting the prototype |
| [Using Claude Code](docs/using-claude.md) | How to prompt Claude, example conversations, tips |
| [The Spec System](docs/spec-system.md) | Folder structure, spec anatomy, the four tiers |
| [Figma Integration](docs/figma.md) | `/figma-spec` workflow, tips for good output |
| [Tokens & Audit](docs/tokens.md) | Token reference tables, running the audit, fixing violations |
| [Developer Handoff](docs/handoff.md) | Handoff checklist, what developers receive |
| [Quick Reference](docs/quick-reference.md) | All spec lookups, token cheat sheet, key commands |

---

## Quick start

```bash
# Install dependencies (once)
cd ahoy-demo && npm install

# Start the prototype
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), then in a second terminal:

```bash
claude
```

Describe what you want to build. Claude handles the rest.

---

## Key commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the live prototype |
| `node scripts/token-audit.js` | Check for raw values that should be tokens |
| `/create-spec <name>` | Create a spec via guided Q&A interview |
| `/figma-spec <figma-url>` | Create a spec from a Figma component |

---

*Built with [Ahoy](https://github.com/teamleader/ahoy) · Prototyped with [Claude Code](https://claude.ai/code)*
