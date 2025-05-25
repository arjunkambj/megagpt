import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getMessages = query({
  args: {
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chatId"), args.chatId))
      .collect();
    return messages;
  },
});
