import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

// 1 - we need to make sure that the webhook event is coming from Clerk
// 2 -  if so, we'll listen for the user.create event
// 3 - we'll save the user to the databse

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.log("Missing CLERK_WEBHOOK_SECRET enviroment variable");
            throw new Error("Missing CLERK_WEBHOOK_SECRET enviroment variable");
        }

        // check headers
        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            console.log("Error : svix error")
            return new Response("Error occured - no svix headers", {
                status: 400,
            })
        }

        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: any

        // verfy webhook
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            }) as any;
        } catch (error) {
            console.error("Error verifying webhook: ", error);
            return new Response("Error occured", { status: 400 });
        }

        const eventType = evt.type;

        if (eventType === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;

            const email = email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.createUser, {
                    email,
                    fullname: name,
                    image: image_url,
                    clerkId: id,
                    username: email.split("@")[0],
                })
            } catch (err) {
                console.log("Error creating user: ", err);
                return new Response("Error creating user", { status: 500 });
            }
        }else{
            console.log("Error: evet type error")
        }

        return new Response("Webhook processed successfully", { status: 200 });
    })
})

export default http;