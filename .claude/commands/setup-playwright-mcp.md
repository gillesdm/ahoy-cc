---
description: Install the Playwright MCP server into Claude Code (adds to ~/.claude.json)
allowed-tools: Bash
---

Add the Playwright MCP server to `~/.claude.json` (the file Claude Code actually reads for MCP servers).

```bash
python3 -c "
import json, os
path = os.path.expanduser('~/.claude.json')
with open(path) as f:
    d = json.load(f)
d.setdefault('mcpServers', {})
if 'playwright' in d['mcpServers']:
    print('already_installed')
else:
    d['mcpServers']['playwright'] = {
        'type': 'stdio',
        'command': 'npx',
        'args': ['-y', '@playwright/mcp@latest'],
        'env': {}
    }
    with open(path, 'w') as f:
        json.dump(d, f, indent=2)
    print('installed')
"
```

- **`installed`** → reply:
  > ✅ **Playwright MCP added to `~/.claude.json`.**
  >
  > Restart Claude Code to activate it. After that, you can use `/playwright-import` to copy any page into the prototype.

- **`already_installed`** → reply:
  > ✓ Playwright MCP is already configured — no changes needed.
