# Antimatter IDE

**A local-first AI coding environment built on VS Code, designed to match Cursor's UX with Antimatter branding and deep local model support.**

Antimatter IDE is a fork of [Void](https://github.com/voideditor/void) — the open-source VS Code fork — rebuilt with the Antimatter design system, a Cursor-parity settings panel, a standalone Agents Window, and a first-run Setup Wizard for connecting local models (Ollama, HuggingFace CLI) and cloud providers (OpenAI, Anthropic, Gemini, DeepSeek).

---

## What's Different from Void

| Feature | Void | Antimatter IDE |
|---|---|---|
| Brand | Void | Antimatter AI |
| Typography | System UI | Plus Jakarta Sans + JetBrains Mono |
| Color system | Void purple | Antimatter indigo/violet (Material You dark) |
| Settings panel | Icon-only rail | Cursor-style text-label vertical nav |
| Setup Wizard | None | API keys, Ollama, HuggingFace CLI |
| Agents Window | None | Standalone window with repo sidebar + composer |
| Welcome screen | VS Code default | Clean logo + keyboard shortcuts |
| Billing tab | None | Free plan + Premium coming soon |
| Plugins tab | None | Vercel, Supabase, GitHub, HuggingFace |

---

## Architecture

All Antimatter-specific UI lives in:

```
src/vs/workbench/contrib/void/browser/react/src/antimatter/
├── AntimatterSettings.tsx      # Settings panel shell (editor tab)
├── AntimatterAgentsWindow.tsx  # Standalone agents window
├── AntimatterWelcome.tsx       # Welcome screen (no file open)
├── antimatter.css              # Brand design tokens + component styles
├── index.ts                    # Barrel exports
└── tabs/
    ├── GeneralTab.tsx          # Account, preferences, layout
    ├── SetupWizardTab.tsx      # API keys, Ollama, HuggingFace CLI
    ├── ModelsTab.tsx           # Cloud + local provider configuration
    ├── RulesTab.tsx            # Rules, Skills, Subagents
    ├── PluginsTab.tsx          # Vercel, Supabase, GitHub, HuggingFace
    ├── IndexingTab.tsx         # Codebase indexing
    └── BillingTab.tsx          # Free plan + Premium coming soon
```

The base VS Code + React + Tailwind mounting, AI provider services, diff zones, and autocomplete are all inherited from Void. See [Void's Codebase Guide](https://github.com/voideditor/void/blob/main/VOID_CODEBASE_GUIDE.md) for architecture details.

---

## Getting Started (Development)

### Prerequisites

- Node.js 20+
- Python 3.11+ (for native modules)
- Xcode Command Line Tools (macOS) or build-essential (Linux)
- Git

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/mattantimatter/antimatter-ide.git
cd antimatter-ide

# 2. Install dependencies (this takes 5-10 minutes)
yarn

# 3. Build the React layer
cd src/vs/workbench/contrib/void/browser/react
yarn
yarn build
cd ../../../../../../../

# 4. Watch mode (rebuilds on file changes)
yarn watch

# 5. Run the IDE
./scripts/code.sh        # macOS/Linux
.\scripts\code.bat       # Windows
```

---

## Design System

### Typography
- **Primary:** `Plus Jakarta Sans` (headings, UI labels, body)
- **Monospace:** `JetBrains Mono` (code, metadata, timestamps)

### Color Tokens

```css
--am-background:              #0d0d0f
--am-surface-container-low:   #131316
--am-surface-container:       #18181c
--am-surface-container-high:  #1e1e24
--am-primary:                 #a2a3e9
--am-primary-container:       #c5c6f5
--am-on-surface:              #e4e1ec
--am-on-surface-variant:      #8b8b9e
--am-outline:                 #44444f
```

---

## License

MIT — same as VS Code and Void. See [LICENSE](./LICENSE).

Built by [Antimatter AI](https://antimatterai.com) · Atlanta, GA
