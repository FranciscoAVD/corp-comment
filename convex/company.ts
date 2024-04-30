import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addCompany = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db.insert("company", {
      company: args.name,
      posts: 1,
    });
    return res;
  },
});

export const getCompanies = query({
  handler: async (ctx) => {
    return await ctx.db.query("company").collect();
  },
});

export const getCompany = query({
  args: {
    name: v.union(v.string(),v.null())
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("company")
      .filter((q) => q.eq(q.field("company"), args.name))
      .collect();
    if (result.length === 1) return result[0]._id;
    return null;
  },
});

export const updatePosts = mutation({
  args: {
    id: v.id("company"),
    post: v.number(),
  },
  handler: async (ctx, args) => {
    const company = await ctx.db.get(args.id);
    if (company) {
      await ctx.db.patch(args.id, {
        posts: company.posts + args.post,
      });
    }
  },
});
