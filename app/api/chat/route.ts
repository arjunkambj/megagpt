import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";
import { CHAT_CONFIG, ERROR_MESSAGES } from "@/lib/constants";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Generate a title from the first user message
function generateChatTitle(message: string): string {
  // Take first MAX_TITLE_LENGTH characters and clean up
  const title = message
    .slice(0, CHAT_CONFIG.MAX_TITLE_LENGTH)
    .replace(/\n/g, " ")
    .trim();

  return title.length < message.length ? `${title}...` : title;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, chatId, userId } = await request.json();

    if (!chatId) {
      return new Response(ERROR_MESSAGES.CHAT_ID_REQUIRED, { status: 400 });
    }

    if (!userId) {
      return new Response(ERROR_MESSAGES.USER_ID_REQUIRED, { status: 400 });
    }

    const systemPrompt = CHAT_CONFIG.SYSTEM_PROMPT;
    const userModel = openai(CHAT_CONFIG.AI_MODEL);

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
      model: userModel,
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
            const title = generateChatTitle(messages[0].content);

            await convex.mutation(api.functions.chat.updateChatTitle, {
              chatId,
              title,
            });
          }
        } catch (error) {
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
