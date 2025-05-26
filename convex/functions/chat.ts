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

export const getChatsByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const chats = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();

    return chats;
  },
});

export const getChatByChatId = query({
  args: { chatId: v.string() },
  handler: async (ctx, args) => {
    const chat = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("chatId"), args.chatId))
      .first();

    return chat;
  },
});

export const updateChatTitle = mutation({
  args: {
    chatId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, { chatId, title }) => {
    const chat = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("chatId"), chatId))
      .first();

    if (chat) {
      await ctx.db.patch(chat._id, {
        title,
      });
    }
  },
});

export const deleteChat = mutation({
  args: {
    chatId: v.string(),
  },
  handler: async (ctx, { chatId }) => {
    // Delete all messages in the chat
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("chatId"), chatId))
      .collect();

    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    // Delete the chat
    const chat = await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("chatId"), chatId))
      .first();

    if (chat) {
      await ctx.db.delete(chat._id);
    }
  },
});
