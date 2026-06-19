import { NextRequest, NextResponse } from "next/server";
import { getFortuneHistory } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId") ?? undefined;
    const history = await getFortuneHistory(userId, 20);
    return NextResponse.json({ success: true, data: history });
  } catch (error) {
    console.error("History API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
