import { v } from "convex/values";

import { mutation, query } from "../_generated/server";

export const createMessage = mutation({
  args: {
    chatId: v.string(),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      chatId: args.chatId,
      content: args.content,
      role: args.role,
    });

    return messageId;
  },
});

export const getMessages = query({
  args: {
    chatId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chatId"), args.chatId))
      .collect();

    return messages;
  },
});
