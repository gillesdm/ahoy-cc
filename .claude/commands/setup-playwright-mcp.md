---
description: Install the Playwright MCP server into Claude Code (adds to ~/.claude/settings.json)
allowed-tools: Bash
---

Add the Playwright MCP server to `~/.claude/settings.json` if it isn't already there.

```bash
node -e "
const fs=require('fs'),h=require('os').homedir(),p=h+'/.claude/settings.json';
const s=JSON.parse(fs.readFileSync(p,'utf8'));
s.mcpServers=s.mcpServers||{};
if(s.mcpServers.playwright){process.stdout.write('already_installed');}
else{s.mcpServers.playwright={command:'npx',args:['-y','@playwright/mcp@latest']};fs.writeFileSync(p,JSON.stringify(s,null,2));process.stdout.write('installed');}
"
```

- **`installed`** → reply:
  > ✅ **Playwright MCP added to `~/.claude/settings.json`.**
  >
  > Restart Claude Code to activate it. After that, you can use `/playwright-import` to copy any page into the prototype.

- **`already_installed`** → reply:
  > ✓ Playwright MCP is already configured — no changes needed.
