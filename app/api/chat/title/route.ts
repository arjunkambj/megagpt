import { NextResponse } from "next/server";

import { generateTitleFromUserMessage } from "@/actions/ai-action";

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();

  const title = await generateTitleFromUserMessage({
    message: messages,
  });

  return NextResponse.json({ title });
}
