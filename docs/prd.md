# Product Requirements Document (PRD) - Digital Twin I

## 1. Introduction and Project Scope
The Digital Twin project must demonstrate a **professional AI architecture** built on dedicated vector storage and agentic LLM capability to ensure **True RAG operations** and **Autonomous reasoning** .

## 2. Technical Requirements
*   **Vector Database:** Must utilize **Upstash Vector** for retrieval operations and evidence storage.
*   **Generation Engine/Agent:** Must use **Claude Sonnet 4.5 or Claude Opus 4.5** due to their required tool-calling capabilities and reliable adherence to instructions.
*   **Knowledge Base:** System must ingest and parse JSON files (`data/` directory). Embedding data must **not** be hard-coded into prompts.
*   **Tooling:** Requires integration with the MCP retrieval tool for agent workflows.
*   **Data Handling (Recommended but Optional):** **Neon Postgres on Vercel** is recommended for storing interview transcripts and tracking retrieval performance metrics.

## 3. Functional Requirements
*   FR1: The system must successfully query the vector database based on the **semantic meaning** of a user’s question.
*   FR2: The system must retrieve the top relevant STAR achievements from the user’s knowledge base.
*   FR3: The agent must synthesize the retrieved, evidence-based data into a coherent, professional answer.
*   FR4: The system must use `.env` files for all secret keys .

## 4. Acceptance Criteria
*   AC1: The agent must successfully execute within **Agent Mode in VS Code Insider Edition**.
*   AC2: All factual evidence generated must rely on **vector search** for retrieval.
*   AC3: Given any question, the system must return an answer utilizing **specific, metric-rich language** from the source data.
