import { NextResponse } from "next/server";
import { db } from "@/db";
import { chatLogs } from "@/db/schema";
import { answer } from "@/lib/chat-brain";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const message = typeof body?.message === "string" ? body.message.trim().slice(0, 600) : "";
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId.slice(0, 80) : "anon";

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Message is required." },
        { status: 422 }
      );
    }

    const { reply, suggestions, action } = answer(message);

    // Log conversation (best-effort; never blocks the reply)
    db.insert(chatLogs)
      .values([
        { sessionId, role: "user", content: message },
        { sessionId, role: "assistant", content: reply },
      ])
      .catch((e) => console.error("[chat] log failed", e));

    return NextResponse.json({ ok: true, reply, suggestions, action: action ?? null });
  } catch (error) {
    console.error("[chat] failed", error);
    return NextResponse.json(
      { ok: false, error: "Assistant is unavailable right now — please use WhatsApp." },
      { status: 500 }
    );
  }
}
