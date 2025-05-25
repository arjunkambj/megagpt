import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const createChat = mutation({
  args: {
    userId: v.id("users"),
    chatId: v.string(),
  },
  handler: async (ctx, args) => {
    const chatId = await ctx.db.insert("chats", {
      userId: args.userId,
      title: "New Chat",
      chatId: args.chatId,
      isPinned: false,
    });
    return chatId;
  },
});

export const getChats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const chats = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
    return chats;
  },
});
