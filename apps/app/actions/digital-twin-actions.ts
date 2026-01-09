"use server";

import { queryVectors, upsertVectors, getVectorInfo, VectorMetadata } from "@/lib/upstash";
import { generateInterviewResponse } from "@/lib/groq";
import digitaltwinData from "@/data/digitaltwin.json";

// Type for content chunk
interface ContentChunk {
  id: string;
  title: string;
  type: string;
  content: string;
  metadata: {
    category: string;
    tags: string[];
  };
}

// Initialize vector database with digital twin data
export async function initializeVectorDatabase() {
  try {
    // Check current database status
    const info = await getVectorInfo();
    console.log(`Current vectors in database: ${info.vectorCount}`);

    // If database is empty, load the digital twin data
    if (info.vectorCount === 0) {
      const contentChunks = digitaltwinData.content_chunks as ContentChunk[];

      const vectors = contentChunks.map((chunk) => ({
        id: chunk.id,
        data: `${chunk.title}: ${chunk.content}`,
        metadata: {
          title: chunk.title,
          type: chunk.type,
          content: chunk.content,
          category: chunk.metadata.category,
          tags: chunk.metadata.tags,
        } as VectorMetadata,
      }));

      await upsertVectors(vectors);
      console.log(`Successfully uploaded ${vectors.length} content chunks!`);

      return {
        success: true,
        message: `Initialized database with ${vectors.length} vectors`,
        vectorCount: vectors.length,
      };
    }

    return {
      success: true,
      message: "Database already initialized",
      vectorCount: info.vectorCount,
    };
  } catch (error) {
    console.error("Error initializing vector database:", error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      vectorCount: 0,
    };
  }
}

// RAG Query - Search vectors and generate response
export async function ragQuery(question: string) {
  try {
    // Step 1: Query vector database for relevant content
    console.log(`\n🔍 Searching for: "${question}"`);
    const results = await queryVectors(question, 3);

    if (!results || results.length === 0) {
      return {
        success: false,
        response: "I don't have specific information about that topic in my profile.",
        sources: [],
      };
    }

    // Step 2: Extract relevant content from results
    console.log(`\n🧠 Found ${results.length} relevant chunks:`);
    const sources = results.map((result) => ({
      title: result.metadata?.title || "Unknown",
      score: result.score,
      content: result.metadata?.content || "",
    }));

    sources.forEach((source) => {
      console.log(`  🔹 ${source.title} (Relevance: ${source.score.toFixed(3)})`);
    });

    // Step 3: Build context from top results
    const context = sources
      .map((s) => `${s.title}: ${s.content}`)
      .join("\n\n");

    // Step 4: Generate response with Groq
    console.log(`\n⚡ Generating personalized response...`);
    const response = await generateInterviewResponse(context, question);

    return {
      success: true,
      response,
      sources: sources.map((s) => ({
        title: s.title,
        relevance: Math.round(s.score * 100),
      })),
    };
  } catch (error) {
    console.error("Error in RAG query:", error);
    return {
      success: false,
      response: `Error processing your question: ${error instanceof Error ? error.message : "Unknown error"}`,
      sources: [],
    };
  }
}

// Get database status
export async function getDatabaseStatus() {
  try {
    const info = await getVectorInfo();
    return {
      success: true,
      vectorCount: info.vectorCount,
      pendingVectorCount: info.pendingVectorCount,
      dimension: info.dimension,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
