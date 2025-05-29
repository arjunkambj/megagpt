import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { google } from "@ai-sdk/google";
import { DateTime } from "luxon";

import { generateTitleFromUserMessage } from "@/actions/ai-action";
import { api } from "@/convex/_generated/api";
import { ERROR_MESSAGES } from "@/lib/constants";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const { messages, chatId, userId, modelId = 0 } = await request.json();

    if (!chatId) {
      return new Response(ERROR_MESSAGES.CHAT_ID_REQUIRED, { status: 400 });
    }

    if (!userId) {
      return new Response(ERROR_MESSAGES.USER_ID_REQUIRED, { status: 400 });
    }

    const systemPrompt =
      "You are a helpful assistant that can answer questions and help with tasks. and current date and time is " +
      DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss") +
      " in UTC timezone";

    const userModel = [
      openai("gpt-4o-mini"),
      openai("gpt-4.1-mini"),
      google("gemini-2.0-flash-001"),
    ];

    // Ensure modelId is within valid range
    const selectedModelIndex = Math.max(
      0,
      Math.min(modelId, userModel.length - 1)
    );
    const selectedModel = userModel[selectedModelIndex];

    // Save user message to database
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      if (lastMessage.role === "user") {
        await convex.mutation(api.functions.message.createMessage, {
          chatId,
          content: lastMessage.content,
          role: "user",
        });
      }
    }

    const result = streamText({
      model: selectedModel,
      system: systemPrompt,
      messages: messages,
      onFinish: async (result) => {
        try {
          // Save assistant message to database
          await convex.mutation(api.functions.message.createMessage, {
            chatId,
            content: result.text,
            role: "assistant",
          });

          // Update chat title if this is the first exchange
          if (messages.length === 1 && messages[0].role === "user") {
            const title = await generateTitleFromUserMessage({
              message: messages[0],
            });

            await convex.mutation(api.functions.chat.updateChatTitle, {
              chatId,
              title,
            });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Error saving assistant message:", error);
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in chat API:", error);

    return new Response(ERROR_MESSAGES.INTERNAL_ERROR, { status: 500 });
  }
}
