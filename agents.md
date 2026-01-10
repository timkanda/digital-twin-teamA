# Digital Twin MCP Server Project Instructions

## Project Overview
Build an MCP server using the roll dice pattern to create a digital twin assistant that can answer questions about a person's professional profile using RAG (Retrieval-Augmented Generation).

**Candidate**: Timothy Kanda  
**Repository**: https://github.com/timkanda/digital-twin-teamA  
**Live MCP Endpoint**: http://localhost:3000/api/mcp (development)

## Reference Repositories
- **Pattern Reference**: https://github.com/gocallum/rolldice-mcpserver.git
  - Roll dice MCP server - use same technology and pattern for our MCP server
- **Logic Reference**: https://github.com/gocallum/binal_digital-twin_py.git
  - Python code using Upstash Vector for RAG search with Groq and LLaMA for generations

## Core Functionality
- MCP server accepts user questions about the person's professional background
- Create server actions that search Upstash Vector database and return RAG results
- Search logic must match the Python version exactly

---

## MCP Server Connection Instructions

### VS Code Insiders Setup

1. **Ensure MCP Configuration exists** at `.vscode/mcp.json`:
```json
{
  "servers": {
    "digital-twin-mcp": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp",
      "timeout": 30000,
      "description": "Timothy Kanda's Digital Twin RAG MCP Server"
    }
  }
}
```

2. **Start the development server**:
```powershell
cd apps
pnpm dev
```

3. **Verify MCP is running**:
   - Open VS Code Insiders
   - Open `.vscode/mcp.json`
   - Click "Start" button next to the server configuration
   - Check Output panel for connection logs

4. **Test MCP in GitHub Copilot Chat**:
```
@workspace Can you tell me about Timothy's work experience using the digital twin MCP server?
```

### Claude Desktop Setup

1. **Start the local MCP server** (ensure pnpm dev is running)

2. **Use mcp-remote to bridge to Claude Desktop**:
```powershell
npx -y mcp-remote http://localhost:3000/api/mcp
```

3. **Configure Claude Desktop** (Settings > Developer > MCP Servers):
```json
{
  "mcpServers": {
    "timothy-digital-twin": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:3000/api/mcp"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

4. **Restart Claude Desktop** and test with:
   - "Tell me about Timothy's technical skills"
   - "What projects has Timothy worked on?"

---

## Interview Simulation Prompts

### CRITICAL: How the Interview Works

**The AI Agent = INTERVIEWER** (asks questions, evaluates responses)  
**The MCP Tool `ask_timothy` = CANDIDATE** (Timothy's digital twin that answers questions)

The interviewer MUST:
1. Generate interview questions based on the job description
2. Call the `ask_timothy` MCP tool to get the candidate's response
3. Evaluate the response
4. Continue to next question
5. Generate final hiring report

**DO NOT ask the user to answer questions - use the MCP tool instead!**

### Autonomous Interview Prompt (Copy this exactly)

```
You are a senior recruiter conducting an AUTONOMOUS interview simulation.

**SETUP:**
- Job Description: Read jobs/job1.md
- Candidate: Timothy Kanda (accessed via MCP tool `ask_timothy`)

**YOUR ROLE:** You are the INTERVIEWER. You ask questions and evaluate responses.

**CANDIDATE'S RESPONSES:** To get the candidate's answer to any question, you MUST call the `ask_timothy` MCP tool with your question. The tool will return Timothy's response based on his professional profile data.

**INTERVIEW PROCESS:**
1. Read the job description from jobs/job1.md
2. For each interview question:
   - State your question
   - Call `ask_timothy` with that question to get Timothy's answer
   - Evaluate the response
   - Move to next question

3. Cover these areas (use `ask_timothy` for each):
   - "Tell me about your relevant work experience"
   - "What are your key technical skills for this role?"
   - "Describe a challenging project you worked on"
   - "Give me a STAR example of problem-solving"
   - "Why should we hire you for this position?"

4. After all questions, generate a FINAL REPORT in Markdown:
   - Candidate details
   - Full interview transcript (questions + answers received from tool)
   - Technical competency scores (1-5)
   - HIRE / DO NOT HIRE recommendation
   - Justified rationale

**START NOW:** Read the job description, then begin the interview by calling `ask_timothy` with your first question.
```

### Quick Test Prompt

```
Use the `ask_timothy` MCP tool to ask: "Tell me about your experience with React and Next.js" - then evaluate the response and rate the candidate's frontend skills 1-5.
```

### Basic Digital Twin Testing
Use these prompts in VS Code GitHub Copilot or Claude Desktop:

```
@workspace Can you tell me about my work experience using the digital twin MCP server?
```

```
@workspace Using my digital twin data, what are my key technical skills?
```

```
@workspace Query my digital twin MCP server to help me prepare for a technical interview. What projects should I highlight?
```

### Complete Interview Simulation Prompt

Copy this into GitHub Copilot Chat for a full recruiter screening simulation:

```
@workspace You are a senior recruiter conducting a comprehensive interview simulation using the job posting in jobs/job1.md and my digital twin MCP server data.

**INTERVIEW PROCESS:**

**Phase 1 - Initial Screening (5 minutes)**
You are HIGHLY CRITICAL and expect SHORT, SHARP answers. Check these critical factors:
- Location compatibility and willingness to work from specified location
- Salary expectations alignment with the offered range
- ALL mandatory/key selection criteria are met
- Technical skills match the specific requirements
- Experience level appropriate for the role

Ask 3-4 probing screening questions.

**Phase 2 - Technical Assessment (10 minutes)**
Conduct focused technical evaluation:
- Specific programming languages/frameworks mentioned in the job
- Years of experience with required technologies
- Project complexity and scale they've handled
- Problem-solving approach for job scenarios
- Technical leadership experience if required

Provide a technical competency matrix with 1-5 ratings for each required skill.

**Phase 3 - Cultural Fit (5 minutes)**
Analyze behavioral fit:
- Working style compatibility
- Leadership experience vs expectations
- Team collaboration skills
- Communication style
- Career motivation alignment

**Phase 4 - Final Assessment Report**
Provide comprehensive report:

**EXECUTIVE SUMMARY:**
- HIRE/DO NOT HIRE recommendation
- Overall suitability score (1-10)
- Key reasons for recommendation

**DETAILED BREAKDOWN:**
- Technical competency scores
- Experience relevance analysis
- Cultural fit evaluation
- Salary/location alignment
- Risk factors identified

**IMPROVEMENT AREAS:**
- Skills gaps to address
- Missing profile information
- Areas for better interview responses
- Recommended next steps

Be ruthless in your assessment - only recommend candidates who are genuinely suitable for this specific role.
```

### Different Interviewer Personas

**HR/Recruiter Initial Screen:**
```
@workspace You are an experienced HR recruiter conducting an initial phone screen. Focus on cultural fit, basic qualifications, and compensation alignment. Use the job posting in jobs/job1.md and my digital twin MCP server data. Conduct a 15-minute screening call with 5-6 questions. Provide pass/fail recommendation with reasoning.
```

**Technical Interview:**
```
@workspace You are a senior software engineer conducting a technical interview. Focus on deep technical assessment using the job posting requirements in jobs/job1.md and my digital twin MCP server data. Ask 4-5 detailed technical questions. Include a system design challenge. Rate technical competency (1-10) for each required skill.
```

**Hiring Manager Interview:**
```
@workspace You are the hiring manager for this role. You need someone who can deliver results, work well with your existing team, and grow with the company. Use jobs/job1.md and my digital twin MCP server data. Conduct a focused 30-minute interview. Assess role fit (1-10) and provide hiring recommendation.
```

---

## Environment Variables (.env.local)
```
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
GROQ_API_KEY=
```

## Technical Requirements
- **Framework**: Next.js 16 (use latest available)
- **Package Manager**: Always use pnpm (never npm or yarn)
- **Commands**: Always use Windows PowerShell commands
- **Type Safety**: Enforce strong TypeScript type safety throughout
- **Architecture**: Always use server actions where possible
- **Styling**: Use globals.css instead of inline styling
- **UI Framework**: ShadCN with dark mode theme
- **Focus**: Prioritize MCP functionality over UI - UI is primarily for MCP server configuration
- **Deployment**: Vercel

## Setup Commands
```bash
pnpm dlx shadcn@latest init
```
Reference: https://ui.shadcn.com/docs/installation/next

## Upstash Vector Integration

### Key Documentation
- Getting Started: https://upstash.com/docs/vector/overall/getstarted
- Embedding Models: https://upstash.com/docs/vector/features/embeddingmodels
- TypeScript SDK: https://upstash.com/docs/vector/sdks/ts/getting-started

### Example Implementation
```typescript
import { Index } from "@upstash/vector"

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
})

// RAG search example
await index.query({
  data: "What is Upstash?",
  topK: 3,
  includeMetadata: true,
})
```

---

## Project Structure

```
digital-twin-teamA/
├── agents.md                    # This file - Copilot instructions
├── apps/                        # Next.js MCP Server
│   ├── app/
│   │   ├── actions/            # Server actions for RAG
│   │   │   └── digital-twin-actions.ts
│   │   └── api/
│   │       ├── mcp/route.ts    # MCP JSON-RPC endpoint
│   │       ├── init/route.ts   # Vector DB initialization
│   │       └── test/route.ts   # RAG query testing
│   ├── lib/
│   │   ├── upstash.ts          # Vector database client
│   │   └── groq.ts             # LLM client
│   └── data/
│       └── digitaltwin.json    # Professional profile data
├── jobs/                        # Job postings for interview prep
│   ├── job1.md                 # Junior Software Developer
│   ├── job2.md                 # Frontend Developer
│   ├── job3.md                 # Full Stack Developer (Fintech)
│   ├── job4.md                 # Software Engineer (AI/ML)
│   └── job5.md                 # Graduate Developer
├── interview/                   # Interview simulation results
│   ├── job1-results.md
│   ├── job2-results.md
│   ├── job3-results.md
│   ├── job4-results.md
│   └── job5-results.md
├── docs/
│   ├── prd.md                  # Product Requirements Document
│   ├── design.md               # Technical Design Document
│   └── implementation-plan.md  # Implementation Plan
└── data/
    └── Tim-data.json           # Source profile data
```

## MCP Server Tools Available

The MCP server exposes these tools via JSON-RPC:

1. **ask_timothy** - Ask questions about Timothy's professional background
2. **get_profile_summary** - Get a summary of Timothy's professional profile
3. **initialize_database** - Initialize/reset the vector database

## Additional Resources
- MCP Protocol Specification: https://modelcontextprotocol.io/
- Workshop Guide: https://aiagents.ausbizconsulting.com.au/digital-twin-workshop
- Roll Dice MCP Pattern: https://github.com/gocallum/rolldice-mcpserver.git
- Binal's Digital Twin: https://github.com/gocallum/binal_digital-twin_py.git

---

**Note**: This file provides context for GitHub Copilot to generate accurate, project-specific code suggestions. Keep it updated as requirements evolve.
