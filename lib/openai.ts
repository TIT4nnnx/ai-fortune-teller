import OpenAI from "openai";
import { FortuneOutlook } from "@/types/fortune";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function generateFortune(prompt: string): Promise<FortuneOutlook> {
  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
    max_tokens: 1024,
    response_format: { type: "json_object" },
  });

  const text = response.choices[0]?.message?.content;
  if (!text) throw new Error("No response from OpenAI");

  const parsed = JSON.parse(text) as FortuneOutlook;

  if (
    !parsed.summary ||
    !parsed.careerOutlook ||
    !parsed.financialOutlook ||
    !parsed.relationshipOutlook ||
    !parsed.generalAdvice
  ) {
    throw new Error("Incomplete fortune response from AI");
  }

  return parsed;
}
