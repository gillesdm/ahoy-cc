---
description: Install the Figma MCP server into Claude Code (adds to ~/.claude/settings.json)
allowed-tools: Bash
---

Add the Figma MCP server to `~/.claude/settings.json` if it isn't already there.

```bash
node -e "
const fs=require('fs'),h=require('os').homedir(),p=h+'/.claude/settings.json';
const s=JSON.parse(fs.readFileSync(p,'utf8'));
s.mcpServers=s.mcpServers||{};
if(s.mcpServers.figma){process.stdout.write('already_installed');}
else{s.mcpServers.figma={type:'http',url:'https://mcp.figma.com/mcp'};fs.writeFileSync(p,JSON.stringify(s,null,2));process.stdout.write('installed');}
"
```

- **`installed`** → reply:
  > ✅ **Figma MCP added to `~/.claude/settings.json`.**
  >
  > **Next steps:**
  > 1. Restart Claude Code
  > 2. Run `/mcp` in the chat
  > 3. Select **figma** → click **Authenticate**
  > 4. Allow access in the browser that opens
  >
  > Once authenticated, share a Figma URL and Claude will read it directly.

- **`already_installed`** → reply:
  > ✓ Figma MCP is already in your settings. If you haven't authenticated yet, run `/mcp` → select **figma** → **Authenticate**.
