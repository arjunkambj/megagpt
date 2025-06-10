import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    // Add your custom fields here
    isSubscribed: v.optional(v.boolean()),
    subscriptionTier: v.optional(
      v.union(v.literal("free"), v.literal("plus"), v.literal("pro")),
    ),
    subscriptionEnds: v.optional(v.number()),
  }).index("email", ["email"]),

  chats: defineTable({
    userId: v.id("users"),
    chatId: v.string(),
    title: v.string(),
    isPinned: v.boolean(),
    updatedAt: v.optional(v.number()),
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
