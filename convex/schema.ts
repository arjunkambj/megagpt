import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  userData: defineTable({
    userId: v.id("users"),
    isSubscribed: v.optional(v.boolean()),
    subscriptionEnds: v.optional(v.number()),
    subscriptionTier: v.optional(
      v.union(v.literal("free"), v.literal("plus"), v.literal("pro"))
    ),
  }),

  chats: defineTable({
    userId: v.id("users"),
    chatId: v.string(),
    title: v.string(),
    isPinned: v.boolean(),
  })
    .index("byUserId", ["userId"])
    .index("byChatId", ["chatId"]),

  messages: defineTable({
    chatId: v.string(),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  }).index("byChatId", ["chatId"]),
});

export default schema;
