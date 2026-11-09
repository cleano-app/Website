import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { answerChatQuestion, chatAiAvailable, type ChatTurn } from "@/lib/chat/assistant";

export const runtime = "nodejs";

// The website chat's typed questions. Public and unauthenticated, and every
// call costs money, so: only from this site's own pages, a cap on question
// length, and a per-visitor limit. The limit is kept in this server
// instance's memory - a best effort, not a hard wall - which with Haiku's
// price is plenty against a stuck script; WEBSITE_CHAT_AI=off in Vercel
// switches typed answers off altogether.

const PER_10_MIN = 12;
const PER_DAY = 60;
const asked = new Map<string, number[]>();

function overLimit(ip: string): boolean {
  const now = Date.now();
  const times = (asked.get(ip) ?? []).filter((t) => now - t < 24 * 3600_000);
  const recent = times.filter((t) => now - t < 10 * 60_000).length;
  if (recent >= PER_10_MIN || times.length >= PER_DAY) {
    asked.set(ip, times);
    return true;
  }
  times.push(now);
  asked.set(ip, times);
  // Keep the map from growing without end on a long-lived instance.
  if (asked.size > 5000) for (const key of asked.keys()) if (!asked.get(key)?.some((t) => now - t < 24 * 3600_000)) asked.delete(key);
  return false;
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (!chatAiAvailable()) return NextResponse.json({ offline: true });

  let body: { question?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) return NextResponse.json({ error: "Type your question first." }, { status: 400 });
  if (question.length > 1000) return NextResponse.json({ error: "That's a long one - please keep it shorter." }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (overLimit(ip)) return NextResponse.json({ offline: true });

  const history: ChatTurn[] = (Array.isArray(body.history) ? body.history : [])
    .filter((m): m is ChatTurn => !!m && typeof m === "object" && (m.from === "visitor" || m.from === "chat") && typeof m.text === "string")
    .slice(-6);

  try {
    return NextResponse.json(await answerChatQuestion(history, question));
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.error("[website chat] rate limited by the API");
      return NextResponse.json({ offline: true });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("[website chat] ANTHROPIC_API_KEY was refused");
      return NextResponse.json({ offline: true });
    }
    console.error("[website chat] answer failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Sorry, that didn't work - try again, or message the office." }, { status: 502 });
  }
}
