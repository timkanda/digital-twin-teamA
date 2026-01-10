import { NextResponse } from "next/server";
import { forceReinitializeDatabase } from "@/app/actions/digital-twin-actions";

// GET endpoint to reset and re-initialize the vector database
export async function GET() {
  try {
    console.log("Resetting and re-initializing vector database...");
    const result = await forceReinitializeDatabase();
    console.log("Re-initialization result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
