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
});

export default schema;
