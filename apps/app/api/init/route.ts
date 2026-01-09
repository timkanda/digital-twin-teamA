import { NextResponse } from "next/server";
import { initializeVectorDatabase } from "@/app/actions/digital-twin-actions";

// GET endpoint to initialize the vector database
export async function GET() {
  try {
    console.log("Starting vector database initialization...");
    const result = await initializeVectorDatabase();
    console.log("Initialization result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Initialization error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
