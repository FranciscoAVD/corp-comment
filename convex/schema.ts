import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    comment: defineTable({
        upvote_count: v.number(),
        badge_letter: v.string(),
        company: v.string(),
        text: v.string(),
        companyId: v.id("company")
    }).index('companyId', ['companyId']),
    company: defineTable({
        company: v.string(),
        posts: v.number(),
    })
})