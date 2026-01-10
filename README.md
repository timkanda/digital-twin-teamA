# Timothy Kanda - Digital Twin MCP Server

AI-powered professional assistant using RAG (Retrieval-Augmented Generation) architecture. Ask questions about Timothy's professional background, skills, and experience.

## 🚀 Live Demo

- **Portfolio**: [https://digital-twin-team-a.vercel.app](https://digital-twin-team-a.vercel.app)
- **MCP Endpoint**: [https://digital-twin-team-a.vercel.app/api/mcp](https://digital-twin-team-a.vercel.app/api/mcp)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Vector Database**: Upstash Vector
- **LLM**: Groq (LLaMA)
- **Protocol**: MCP (Model Context Protocol)
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: Vercel

## 📁 Project Structure

```
digital-twin-teamA/
├── apps/                    # Next.js MCP Server
│   ├── app/
│   │   ├── actions/        # Server actions for RAG
│   │   └── api/
│   │       ├── mcp/        # MCP JSON-RPC endpoint
│   │       ├── init/       # Vector DB initialization
│   │       └── test/       # RAG query testing
│   ├── lib/
│   │   ├── upstash.ts      # Vector database client
│   │   └── groq.ts         # LLM client
│   └── data/
│       └── digitaltwin.json # Professional profile data
├── jobs/                    # Job postings for interview prep
├── interview/               # Interview simulation results
├── docs/                    # Documentation
│   ├── prd.md              # Product Requirements
│   ├── design.md           # Technical Design
│   └── implementation-plan.md
└── agents.md               # Copilot instructions
```

## 🔧 MCP Tools Available

| Tool | Description |
|------|-------------|
| `ask_timothy` | Ask questions about Timothy's professional background |
| `get_profile_summary` | Get a summary of Timothy's profile |
| `initialize_database` | Initialize/reset the vector database |

## 🏃 Local Development

```bash
cd apps
pnpm install
pnpm dev
```

## 🔌 Connect to MCP Server

### VS Code (GitHub Copilot)
Add to `.vscode/mcp.json`:
```json
{
  "servers": {
    "timothy-digital-twin": {
      "type": "http",
      "url": "https://digital-twin-team-a.vercel.app/api/mcp"
    }
  }
}
```

### Claude Desktop
```bash
npx -y mcp-remote https://digital-twin-team-a.vercel.app/api/mcp
```

## 👥 Team

- Timothy Kanda
- Yutong  
- Pranjal
- Callum (Mentor)

## 📊 Project Status

✅ Week 1: Infrastructure & Setup  
✅ Week 2: RAG Implementation  
✅ Week 3: Interview Simulations  
✅ Week 4: Production Deployment
