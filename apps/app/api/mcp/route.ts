import { NextRequest, NextResponse } from "next/server";
import { ragQuery, initializeVectorDatabase, getDatabaseStatus } from "@/app/actions/digital-twin-actions";

// MCP JSON-RPC Types
interface MCPRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface MCPResponse {
  jsonrpc: "2.0";
  id: string | number;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// Tool definitions for MCP
const TOOLS = [
  {
    name: "ask_timothy",
    description: "Ask Timothy Kanda a question about his professional background, skills, experience, projects, or career goals. Timothy is a Graduate Software Developer with a Master's in IT from Swinburne University.",
    inputSchema: {
      type: "object",
      properties: {
        question: {
          type: "string",
          description: "The question to ask Timothy about his professional background",
        },
      },
      required: ["question"],
    },
  },
  {
    name: "get_profile_summary",
    description: "Get a summary of Timothy Kanda's professional profile including education, skills, and experience overview.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "initialize_database",
    description: "Initialize the vector database with Timothy's professional profile data. Only needed once.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

// Handle MCP requests
async function handleMCPRequest(request: MCPRequest): Promise<MCPResponse> {
  const { id, method, params } = request;

  try {
    switch (method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: "timothy-digital-twin",
              version: "1.0.0",
            },
          },
        };

      case "tools/list":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            tools: TOOLS,
          },
        };

      case "tools/call":
        const toolName = (params as { name: string })?.name;
        const toolArgs = (params as { arguments: Record<string, unknown> })?.arguments || {};

        if (toolName === "ask_timothy") {
          const question = toolArgs.question as string;
          if (!question) {
            return {
              jsonrpc: "2.0",
              id,
              error: {
                code: -32602,
                message: "Invalid params: question is required",
              },
            };
          }

          const result = await ragQuery(question);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: result.response,
                },
              ],
              isError: !result.success,
            },
          };
        }

        if (toolName === "get_profile_summary") {
          const summaryResult = await ragQuery("Give me a summary of your professional profile, education, and key skills");
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: summaryResult.response,
                },
              ],
              isError: !summaryResult.success,
            },
          };
        }

        if (toolName === "initialize_database") {
          const initResult = await initializeVectorDatabase();
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: initResult.message,
                },
              ],
              isError: !initResult.success,
            },
          };
        }

        return {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Unknown tool: ${toolName}`,
          },
        };

      case "ping":
        return {
          jsonrpc: "2.0",
          id,
          result: { status: "ok" },
        };

      default:
        return {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Method not found: ${method}`,
          },
        };
    }
  } catch (error) {
    console.error("MCP Error:", error);
    return {
      jsonrpc: "2.0",
      id,
      error: {
        code: -32603,
        message: error instanceof Error ? error.message : "Internal error",
      },
    };
  }
}

// POST handler for MCP requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await handleMCPRequest(body as MCPRequest);
    return NextResponse.json(response);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: "Parse error",
        },
      },
      { status: 400 }
    );
  }
}

// GET handler for health check
export async function GET() {
  try {
    const status = await getDatabaseStatus();
    return NextResponse.json({
      status: "ok",
      server: "Timothy Kanda Digital Twin MCP Server",
      version: "1.0.0",
      database: status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
