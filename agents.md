1. Project Goal
The objective is to build an AI-powered professional assistant (a Digital Twin) using a True Retrieval-Augmented Generation (RAG) architecture. This project demonstrates real-world AI engineering capability by moving beyond "prompt tricks" to established industry-standard patterns. The Digital Twin must generate personalized, metric-rich responses to recruiter questions using a defined "ground truth" knowledge base of STAR achievements.
2. Technical Stack (Required)
All code generated or modified must strictly adhere to the following stack to ensure architecture-compliant development:
• Vector Database: Upstash Vector on Vercel. Retrieval operations must rely exclusively on vector search, not hard-coded prompts.
• Relational Database: Neon Postgres on Vercel (recommended for storing interview transcripts and performance metrics).
• Agentic LLM: Claude Sonnet 4.5 or Claude Opus 4.5. These models are required for their strong reasoning, tool-calling capabilities, and reliable instruction adherence.
• Front-end Framework: Next.js 15.5.3+ using strong TypeScript type safety.
• Package Manager: Always use pnpm (never use npm or yarn).
• UI/Styling: ShadCN with a dark mode theme and globals.css.
3. Agent Environment & Architecture
• Environment: The system must operate using Agent Mode in Visual Studio Code (Insider Edition).
• Orchestration: Requires a GitHub Copilot (Pro license) to provide the agent environment and tool-orchestration features.
• Autonomous Capabilities: The LLM must be able to autonomously call the MCP retrieval tool, retrieve evidence, and produce hiring recommendation reports.
• Design Patterns: Follow the "roll dice" MCP server pattern and prioritize the use of server actions wherever possible.
• Commands: Always use Windows PowerShell commands for setup and execution.
4. Coding Standards & Data Discipline
• Data Separation: Personal content and embedding data must not be stored in GitHub. Follow best-practice data separation where technical codebase is in the team repo and personal content is submitted separately.
• Secret Management: Use .env.local files for all secret keys, including UPSTASH_VECTOR_REST_URL, UPSTASH_VECTOR_REST_TOKEN, and GROQ_API_KEY.
• Contribution Style: Use conventional commits (e.g., feat:, fix:, docs:) because AI tools use them to generate contextual suggestions.
• Project Context: Refer to docs/prd.md for technical requirements and the data/ directory for the source knowledge base