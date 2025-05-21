import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import chalk from "chalk";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const systemPrompt =
    "You are a helpful assistant that can answer questions and help with tasks.";

  const userModel = openai("gpt-4o-mini");

  const result = streamText({
    model: userModel,
    system: systemPrompt,
    messages: messages,
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chalk.green(chunk));
  }

  return result.toDataStreamResponse();
}
