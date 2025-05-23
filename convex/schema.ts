import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  users: defineTable({
    id: v.id("user"),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("byId", ["id"]),

  chats: defineTable({
    userId: v.id("user"),
    chatId: v.id("chat"),
    title: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isPinned: v.boolean(),
  }).index("byUserId", ["userId"]),

  messages: defineTable({
    chatId: v.id("chat"),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("byChatId", ["chatId"]),
});

export default schema;
