import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createChat = mutation({
  args: {
    title: v.string(),
    userId: v.id("user"),
    chatId: v.id("chat"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chats", {
      chatId: args.chatId,
      title: args.title,
      userId: args.userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPinned: false,
    });
    return args.chatId;
  },
});
