import { NextRequest, NextResponse } from "next/server";
import { ragQuery } from "@/app/actions/digital-twin-actions";

// Test endpoint for RAG queries
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const question = searchParams.get("q") || "Tell me about yourself";

  try {
    const result = await ragQuery(question);
    return NextResponse.json({
      question,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
