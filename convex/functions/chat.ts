import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { api } from "../_generated/api";

export const createChat = mutation({
  args: {
    userId: v.id("users"),
    chatId: v.string(),
  },

  handler: async (ctx, args) => {
    // Check if chat already exists
    const existingChat = await ctx.db
      .query("chats")
      .withIndex("byChatId", (q) => q.eq("chatId", args.chatId))
      .first();

    if (existingChat) {
      return existingChat._id;
    }

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
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
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
      .withIndex("byChatId", (q) => q.eq("chatId", args.chatId))
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
    // Validate title is not empty
    if (!title.trim()) {
      throw new Error("Chat title cannot be empty");
    }

    const chat = await ctx.db
      .query("chats")
      .withIndex("byChatId", (q) => q.eq("chatId", chatId))
      .first();

    if (!chat) {
      throw new Error("Chat not found");
    }

    await ctx.db.patch(chat._id, {
      title: title.trim(),
    });

    return chat._id;
  },
});

export const deleteChat = mutation({
  args: {
    chatId: v.string(),
  },
  handler: async (ctx, { chatId }) => {
    // Delete all messages in the chat using the optimized function
    await ctx.runMutation(api.functions.message.deleteMessagesByChatId, {
      chatId,
    });

    // Delete the chat
    const chat = await ctx.db
      .query("chats")
      .withIndex("byChatId", (q) => q.eq("chatId", chatId))
      .first();

    if (chat) {
      await ctx.db.delete(chat._id);

      return { success: true };
    }

    throw new Error("Chat not found");
  },
});
