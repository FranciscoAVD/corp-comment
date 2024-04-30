import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getComments = query({
  args: {
    company: v.union(v.id("company"), v.null()),
  },
  handler: async (ctx, args) => {
    if (args.company) {
      const comments = await ctx.db
        .query("comment")
        //@ts-ignore
        .withIndex("companyId", (q) => q.eq("companyId", args.company))
        .order("desc")
        .take(50);
      return comments.reverse();
    }
    const comments = await ctx.db.query("comment").order("desc").take(50);
    return comments.reverse();
  },
});

export const addComment = mutation({
  args: {
    badge: v.string(),
    text: v.string(),
    company: v.string(),
    upvotes: v.number(),
    companyId: v.id("company")
  },
  handler: async (ctx, args) => {
      await ctx.db.insert("comment", {
        upvote_count: args.upvotes,
        badge_letter: args.badge,
        text: args.text,
        company: args.company,
        companyId: args.companyId,
      })
}});

export const removeComment = mutation({
  args: {
    id: v.id("comment"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateVote = mutation({
  args: {
    id: v.id("comment"),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.id);
    if(!comment) return;
    ctx.db.patch(args.id, {
      upvote_count: comment.upvote_count + 1
    })
  }
})
