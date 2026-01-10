# Digital Twin MCP Server

Next.js application serving as an MCP (Model Context Protocol) server for Timothy Kanda's professional digital twin.

## Features

- **RAG-powered Q&A**: Semantic search over professional profile data
- **MCP Protocol**: JSON-RPC endpoint for AI assistant integration
- **Vector Search**: Upstash Vector for embeddings and similarity search
- **LLM Generation**: Groq LLaMA for natural language responses

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/mcp` | GET | Health check & database status |
| `/api/mcp` | POST | MCP JSON-RPC requests |
| `/api/init` | GET | Initialize vector database |
| `/api/test` | GET/POST | Test RAG queries |
| `/api/reset` | POST | Reset vector database |

## Environment Variables

```env
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
GROQ_API_KEY=
```

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Deployment

Deployed on Vercel with automatic deployments from `main` branch.
