import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIContent = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "text-davinci-003",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    return response.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("Error generating AI content:", error);
    throw error;
  }
};
