import { NextRequest, NextResponse } from "next/server";
import { fortuneRequestSchema } from "@/lib/validations";
import { buildFortunePrompt } from "@/lib/prompt-builder";
import { generateFortune } from "@/lib/openai";
import { saveFortuneRecord } from "@/lib/firebase";
import { ApiFortuneResponse } from "@/types/fortune";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, ...formData } = body;

    const validation = fortuneRequestSchema.safeParse(formData);
    if (!validation.success) {
      return NextResponse.json<ApiFortuneResponse>(
        { success: false, error: validation.error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { name, dateOfBirth, question, lang } = validation.data;
    const prompt = buildFortunePrompt({ name, dateOfBirth, question, lang });
    const fortuneResponse = await generateFortune(prompt);

    const timestamp = new Date().toISOString();
    const record = {
      ...(userId ? { userId } : {}),
      name,
      dateOfBirth,
      question,
      response: fortuneResponse,
      timestamp,
    };

    let recordId: string | undefined;
    try {
      recordId = await saveFortuneRecord(record);
    } catch (firebaseError) {
      console.error("Firebase save failed:", firebaseError);
    }

    return NextResponse.json<ApiFortuneResponse>({
      success: true,
      data: { ...record, id: recordId },
    });
  } catch (error) {
    console.error("Fortune API error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json<ApiFortuneResponse>(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
