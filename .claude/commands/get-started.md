---
description: Interactive setup wizard — install Figma MCP and/or Playwright MCP into Claude Code
allowed-tools: Bash AskUserQuestion
---

Use `AskUserQuestion` to ask:

**Question:** "What would you like to set up?"
**multiSelect: true**
**Options:**
- `Figma MCP` — lets Claude read your Figma designs directly
- `Playwright MCP` — lets Claude control a browser for testing and page imports

Then run the selected setups below. Skip any that weren't selected.

---

## Figma MCP (if selected)

Run:
```bash
node -e "
const fs=require('fs'),h=require('os').homedir(),p=h+'/.claude/settings.json';
const s=JSON.parse(fs.readFileSync(p,'utf8'));
s.mcpServers=s.mcpServers||{};
if(s.mcpServers.figma){process.stdout.write('already_installed');}
else{s.mcpServers.figma={type:'http',url:'https://mcp.figma.com/mcp'};fs.writeFileSync(p,JSON.stringify(s,null,2));process.stdout.write('installed');}
"
```

- If output is `installed`: tell the user —
  > ✅ **Figma MCP added.** Restart Claude Code, then run `/mcp` → select **figma** → **Authenticate** to connect your Figma account.
- If output is `already_installed`: tell the user —
  > ✓ Figma MCP was already configured.

---

## Playwright MCP (if selected)

Run:
```bash
node -e "
const fs=require('fs'),h=require('os').homedir(),p=h+'/.claude/settings.json';
const s=JSON.parse(fs.readFileSync(p,'utf8'));
s.mcpServers=s.mcpServers||{};
if(s.mcpServers.playwright){process.stdout.write('already_installed');}
else{s.mcpServers.playwright={command:'npx',args:['-y','@playwright/mcp@latest']};fs.writeFileSync(p,JSON.stringify(s,null,2));process.stdout.write('installed');}
"
```

- If output is `installed`: tell the user —
  > ✅ **Playwright MCP added.** Restart Claude Code to activate it.
- If output is `already_installed`: tell the user —
  > ✓ Playwright MCP was already configured.

---

If nothing was selected, reply: "No problem — run `/get-started` any time to set these up."
