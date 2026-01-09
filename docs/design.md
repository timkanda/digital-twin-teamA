# Technical Design Document - Timothy Kanda Digital Twin

## Document Information
- **Generated From**: `docs/prd.md`
- **Generation Method**: AI-assisted (Claude Opus 4.5)
- **Version**: 1.0
- **Last Updated**: January 2026
- **Team Review Status**: Pending

---

## 1. Executive Summary

This document provides the comprehensive technical design for Timothy Kanda's Digital Twin system—an AI-powered professional assistant that answers questions about Timothy's background, skills, experience, and projects using RAG (Retrieval-Augmented Generation) architecture.

The system implements a production-grade architecture using:
- **Upstash Vector** for semantic search and knowledge retrieval
- **Groq + LLaMA 3.1** for fast LLM inference and response generation
- **Next.js 16** with Server Actions for the application layer
- **MCP (Model Context Protocol)** for Claude Desktop and VS Code integration

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ Claude       │  │ VS Code      │  │ Portfolio Website        │  │
│  │ Desktop      │  │ Copilot      │  │ (Next.js UI)             │  │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘  │
│         │                 │                        │                │
│         └────────────────┬┴───────────────────────┘                │
│                          ▼                                          │
├─────────────────────────────────────────────────────────────────────┤
│                      MCP API LAYER                                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              /api/mcp (JSON-RPC 2.0 Endpoint)               │   │
│  │  ┌─────────────┐ ┌─────────────────┐ ┌──────────────────┐  │   │
│  │  │ ask_timothy │ │ get_profile_    │ │ initialize_      │  │   │
│  │  │             │ │ summary         │ │ database         │  │   │
│  │  └─────────────┘ └─────────────────┘ └──────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                    SERVER ACTIONS LAYER                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │           digital-twin-actions.ts (Server Actions)          │   │
│  │  ┌────────────────┐ ┌──────────┐ ┌───────────────────────┐ │   │
│  │  │ ragQuery()     │ │ init     │ │ getDatabaseStatus()   │ │   │
│  │  │                │ │ Vector   │ │                       │ │   │
│  │  │                │ │ Database │ │                       │ │   │
│  │  └───────┬────────┘ └────┬─────┘ └───────────────────────┘ │   │
│  └──────────┼───────────────┼───────────────────────────────────┘   │
├─────────────┼───────────────┼───────────────────────────────────────┤
│             ▼               ▼        INTEGRATION LAYER              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐    │
│  │ lib/upstash.ts  │  │ lib/groq.ts     │  │ data/            │    │
│  │ (Vector Client) │  │ (LLM Client)    │  │ digitaltwin.json │    │
│  └────────┬────────┘  └────────┬────────┘  └──────────────────┘    │
│           │                    │                                    │
├───────────┼────────────────────┼────────────────────────────────────┤
│           ▼                    ▼          EXTERNAL SERVICES         │
│  ┌─────────────────┐  ┌─────────────────┐                          │
│  │ Upstash Vector  │  │ Groq Cloud      │                          │
│  │ (REST API)      │  │ (LLaMA 3.1-8b)  │                          │
│  └─────────────────┘  └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

```
User Question
      │
      ▼
┌─────────────────┐
│ MCP Endpoint    │  ← JSON-RPC 2.0 request
│ /api/mcp        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ragQuery()      │  ← Server Action
│ Server Action   │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────────┐
│Upstash │ │ Query      │
│Vector  │ │ Embedding  │
│Query   │ │ (Built-in) │
└───┬────┘ └────────────┘
    │
    ▼
┌─────────────────┐
│ Top-K Results   │  ← Similarity scored chunks
│ with Metadata   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Groq LLM        │  ← Context + Question
│ (LLaMA 3.1-8b)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Generated       │  ← Professional response
│ Response        │
└─────────────────┘
```

---

## 3. Component Design

### 3.1 Knowledge Base (`data/digitaltwin.json`)

**Purpose**: Store Timothy's professional information in embeddable content chunks.

**Schema**:
```typescript
interface ContentChunk {
  id: string;              // Unique identifier (e.g., "intro-1")
  title: string;           // Human-readable title
  type: string;            // Category: "introduction", "skills", "experience", "project", "strength", "goals"
  content: string;         // Full text content for embedding
  metadata: {
    category: string;      // Searchable category
    keywords: string[];    // Relevant keywords for filtering
  };
}

interface DigitalTwinData {
  profile: {
    name: string;
    title: string;
    summary: string;
  };
  content_chunks: ContentChunk[];
}
```

**Content Categories**:
| Type | Description | Example Count |
|------|-------------|---------------|
| `introduction` | Personal intro and summary | 1-2 |
| `skills` | Technical skills by domain | 3-4 |
| `experience` | Work experience with STAR details | 3-5 |
| `project` | Key projects with metrics | 2-3 |
| `strength` | Professional attributes | 2-3 |
| `goals` | Career objectives | 1-2 |

**Minimum Vectors Required**: 15+ per team member (45+ total for team)

---

### 3.2 Vector Database Client (`lib/upstash.ts`)

**Purpose**: Interface with Upstash Vector for semantic search operations.

**Key Functions**:

```typescript
// Initialize Upstash client
export const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

// Semantic search
export async function queryVectors(
  queryText: string,
  topK: number = 3
): Promise<QueryResult[]>

// Load data into vector DB
export async function upsertVectors(
  vectors: Array<{id, data, metadata}>
): Promise<{success: boolean, count: number}>

// Get database statistics
export async function getVectorInfo(): Promise<{
  vectorCount: number,
  pendingVectorCount: number,
  dimension: number
}>
```

**Embedding Strategy**:
- Uses Upstash's built-in embedding model
- Query with `data` parameter (not pre-computed vectors)
- Includes metadata for filtering and context

---

### 3.3 LLM Client (`lib/groq.ts`)

**Purpose**: Generate professional responses using retrieved context.

**Configuration**:
```typescript
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Model: llama-3.1-8b-instant
// Temperature: 0.7 (balanced creativity/accuracy)
// Max Tokens: 1024
```

**Key Functions**:

```typescript
// General RAG response generation
export async function generateResponse(
  question: string,
  context: string
): Promise<string>

// Interview-specific response with STAR format
export async function generateInterviewResponse(
  question: string,
  context: string
): Promise<string>
```

**System Prompt Design**:
- Role: "Timothy Kanda's digital twin assistant"
- Constraints: Use only provided context, maintain first-person voice
- Format: Professional, metric-rich language
- Fallback: "I don't have specific information about that"

---

### 3.4 Server Actions (`app/actions/digital-twin-actions.ts`)

**Purpose**: Orchestrate RAG pipeline as Next.js Server Actions.

**Functions**:

| Function | Description | Return Type |
|----------|-------------|-------------|
| `initializeVectorDatabase()` | Load digitaltwin.json into Upstash | `{success, message, count}` |
| `ragQuery(question)` | Full RAG pipeline: query → retrieve → generate | `{success, response, sources}` |
| `getDatabaseStatus()` | Check vector count and health | `{vectorCount, status}` |

**RAG Query Pipeline**:
1. Receive user question
2. Query Upstash Vector with semantic search (top-3)
3. Extract content from matched chunks
4. Build context string from results
5. Call Groq LLM with context + question
6. Return generated response with source IDs

---

### 3.5 MCP API Endpoint (`app/api/mcp/route.ts`)

**Purpose**: Expose digital twin as MCP-compatible tool for AI assistants.

**Protocol**: JSON-RPC 2.0

**Supported Methods**:

| Method | Description |
|--------|-------------|
| `initialize` | Return server capabilities |
| `tools/list` | List available tools |
| `tools/call` | Execute a tool |
| `ping` | Health check |

**Available Tools**:

```typescript
const TOOLS = [
  {
    name: "ask_timothy",
    description: "Ask Timothy Kanda a question about his professional background",
    inputSchema: {
      type: "object",
      properties: {
        question: { type: "string" }
      },
      required: ["question"]
    }
  },
  {
    name: "get_profile_summary",
    description: "Get Timothy's professional profile overview"
  },
  {
    name: "initialize_database",
    description: "Initialize vector database with profile data"
  }
]
```

**HTTP Handlers**:
- `POST /api/mcp` - Handle MCP JSON-RPC requests
- `GET /api/mcp` - Health check with database status

---

## 4. Security Design

### 4.1 Secret Management

| Secret | Storage | Access |
|--------|---------|--------|
| `UPSTASH_VECTOR_REST_URL` | `.env.local` | Server-side only |
| `UPSTASH_VECTOR_REST_TOKEN` | `.env.local` | Server-side only |
| `GROQ_API_KEY` | `.env.local` | Server-side only |

**Requirements**:
- ✅ All secrets in `.env.local` (git-ignored)
- ✅ Never exposed to client-side code
- ✅ Server Actions ensure server-only execution

### 4.2 API Security

- MCP endpoint is public (intended for AI tools)
- No authentication required (read-only professional data)
- Rate limiting recommended for production (Vercel handles basic limits)

---

## 5. Deployment Architecture

### 5.1 Vercel Deployment

```
┌─────────────────────────────────────────┐
│              Vercel Platform            │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │     Next.js Application         │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ Edge Functions (API)    │   │   │
│  │  │ • /api/mcp              │   │   │
│  │  └─────────────────────────┘   │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ Server Actions          │   │   │
│  │  │ • digital-twin-actions  │   │   │
│  │  └─────────────────────────┘   │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ Static Assets           │   │   │
│  │  │ • Portfolio UI          │   │   │
│  │  └─────────────────────────┘   │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│           Environment Variables         │
│  • UPSTASH_VECTOR_REST_URL             │
│  • UPSTASH_VECTOR_REST_TOKEN           │
│  • GROQ_API_KEY                         │
└─────────────────────────────────────────┘
```

### 5.2 External Services

| Service | Purpose | Region |
|---------|---------|--------|
| Upstash Vector | Semantic search | us-east-1 (auto) |
| Groq Cloud | LLM inference | Global |
| Vercel | Hosting & Serverless | Sydney (recommended) |

---

## 6. Integration Points

### 6.1 Claude Desktop Integration

**Configuration** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "timothy-digital-twin": {
      "url": "https://your-vercel-app.vercel.app/api/mcp"
    }
  }
}
```

### 6.2 VS Code Copilot Integration

**Configuration** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "timothy-digital-twin": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

---

## 7. Testing Strategy

### 7.1 Unit Tests
- Vector client functions (mock Upstash responses)
- LLM client functions (mock Groq responses)
- Server action logic

### 7.2 Integration Tests
- Full RAG pipeline with real services
- MCP endpoint JSON-RPC compliance
- Vector search relevance scoring

### 7.3 Acceptance Tests
- AC1: Agent runs in VS Code Agent Mode ✓
- AC2: All responses use vector search ✓
- AC3: Responses include metric-rich language ✓

---

## 8. Performance Considerations

| Metric | Target | Design Decision |
|--------|--------|-----------------|
| Query Latency | < 2s | Groq's fast inference, Upstash edge |
| Cold Start | < 3s | Next.js edge runtime |
| Vector Search | < 100ms | Upstash built-in embeddings |
| Token Usage | < 1024/response | Max tokens limit in Groq config |

---

## 9. Future Enhancements

1. **Interview Mode**: STAR-format responses for behavioral questions
2. **Multi-modal**: Support for resume/portfolio document uploads
3. **Analytics**: Track query patterns and improve knowledge base
4. **Caching**: Redis cache for frequent queries
5. **Multi-language**: Support for international job markets

---

## 10. Appendix

### A. File Structure
```
apps/
├── app/
│   ├── actions/
│   │   └── digital-twin-actions.ts
│   ├── api/
│   │   └── mcp/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── [UI components]
├── data/
│   └── digitaltwin.json
├── lib/
│   ├── groq.ts
│   ├── upstash.ts
│   └── utils.ts
└── .env.local
```

### B. Environment Variables Template
```env
UPSTASH_VECTOR_REST_URL=https://xxx-vector.upstash.io
UPSTASH_VECTOR_REST_TOKEN=xxx
GROQ_API_KEY=gsk_xxx
```

### C. References
- [Upstash Vector Documentation](https://upstash.com/docs/vector)
- [Groq SDK Documentation](https://console.groq.com/docs)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
