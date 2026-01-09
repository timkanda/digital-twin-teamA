import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Default model for fast inference
export const DEFAULT_MODEL = "llama-3.1-8b-instant";

// Generate response using Groq
export async function generateResponse(
  prompt: string,
  model: string = DEFAULT_MODEL
): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are Timothy Kanda's AI digital twin. Answer questions as if you are Timothy, speaking in first person about your background, skills, experience, and career goals. Be professional, confident, and provide specific examples with metrics when relevant. Always maintain a helpful and engaging tone.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content?.trim() || "Unable to generate response.";
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

// Generate interview-focused response
export async function generateInterviewResponse(
  context: string,
  question: string,
  model: string = DEFAULT_MODEL
): Promise<string> {
  const prompt = `Based on the following information about yourself, answer the interview question.
Speak in first person as if you are describing your own background.
Use the STAR format (Situation, Task, Action, Result) when describing experiences.
Include specific metrics and achievements when relevant.

Your Information:
${context}

Interview Question: ${question}

Provide a confident, professional response:`;

  return generateResponse(prompt, model);
}
