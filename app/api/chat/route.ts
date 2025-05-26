import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  const { messages, chatId, userId } = await request.json();

  if (!chatId) {
    return new Response("Chat ID is required", { status: 400 });
  }

  const systemPrompt =
    "You are a helpful assistant that can answer questions and help with tasks.";

  const userModel = openai("gpt-4o-mini");

  // // Saving the last message from to database
  // if (messages.length > 0) {
  //   const lastMessage = messages[messages.length - 1];

  //   if (lastMessage.role === "user") {
  //     try {
  //       await convex.mutation(api.functions.message.createMessage, {
  //         chatId,
  //         content: lastMessage.content,
  //         role: "user",
  //       });
  //     } catch (error) {
  //       console.error("Error saving user message:", error);
  //     }
  //   }
  // }

  const result = streamText({
    model: userModel,
    system: systemPrompt,
    messages: messages,
    onFinish: async (result) => {
      // Save assistant message to database
      try {
        await convex.mutation(api.functions.message.createMessage, {
          chatId,
          content: result.text,
          role: "assistant",
        });

        // Update chat title if it's the first message
      } catch (error) {
        console.error("Error saving assistant message:", error);
      }
    },
  });

  return result.toDataStreamResponse();
}
