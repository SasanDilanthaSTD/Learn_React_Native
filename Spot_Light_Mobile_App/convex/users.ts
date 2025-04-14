import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
    args: {
        username: v.string(),
        fullname: v.string(),
        image: v.string(),
        bio: v.optional(v.string()),
        email: v.string(),
        clerkId: v.string()
    },

    handler: async (ctx, args) => {
        // check user is already inserted
        const exxistingUser = await ctx.db.query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first()

        if (exxistingUser) return

        // create a user in db
        try {
            await ctx.db.insert("users", {
                username: args.username,
                fullname: args.fullname,
                image: args.image,
                bio: args.bio,
                email: args.email,
                clerkId: args.clerkId,
                followers: 0,
                folowing: 0,
                posts: 0
            })
        } catch (err) {
            console.log("Error db create : ", err);
        }
        
    }
});