import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "../_generated/server";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    return await ctx.db.get(userId);
  },
});

export const updateUserModel = mutation({
  args: {
    data: v.object({
      lastUsedModel: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    return await ctx.db.patch(userId!, {
      lastUsedModel: args.data.lastUsedModel,
    });
  },
});
