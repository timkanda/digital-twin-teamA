import { Index } from "@upstash/vector";

// Initialize Upstash Vector client with environment variables
export const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

// Type definitions for vector metadata (compatible with Upstash Dict)
export interface VectorMetadata {
  [key: string]: string | number | boolean | string[] | undefined;
  title: string;
  type: string;
  content: string;
  category?: string;
}

export interface QueryResult {
  id: string;
  score: number;
  metadata?: VectorMetadata;
}

// Query vectors for semantic search
export async function queryVectors(
  queryText: string,
  topK: number = 3
): Promise<QueryResult[]> {
  try {
    const results = await vectorIndex.query({
      data: queryText,
      topK,
      includeMetadata: true,
    });

    return results.map((result) => ({
      id: result.id as string,
      score: result.score,
      metadata: result.metadata as VectorMetadata | undefined,
    }));
  } catch (error) {
    console.error("Error querying vectors:", error);
    throw error;
  }
}

// Upsert vectors (for initial data loading)
export async function upsertVectors(
  vectors: Array<{
    id: string;
    data: string;
    metadata: VectorMetadata;
  }>
) {
  try {
    await vectorIndex.upsert(
      vectors.map((v) => ({
        id: v.id,
        data: v.data,
        metadata: v.metadata as Record<string, string | number | boolean | string[]>,
      }))
    );
    return { success: true, count: vectors.length };
  } catch (error) {
    console.error("Error upserting vectors:", error);
    throw error;
  }
}

// Get vector database info
export async function getVectorInfo() {
  try {
    const info = await vectorIndex.info();
    return {
      vectorCount: info.vectorCount,
      pendingVectorCount: info.pendingVectorCount,
      dimension: info.dimension,
    };
  } catch (error) {
    console.error("Error getting vector info:", error);
    throw error;
  }
}
