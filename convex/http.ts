import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import {  WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
// import * as user from "./user"; // Import the user module
import {internal} from "./_generated/api";

// Optionally, if internal needs to include user:
// internal.user = user;

const validatePayload = async (req: Request): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };
  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
    return event;
  } catch (error) {
    console.log("clerk webhook request could not be verified");
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req);
  if (!event) {
    return new Response("could not validate clerk payload", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created":
    
      const userRecord = await ctx.runQuery(internal.users.get, { clerkId: event.data.id });
      if (userRecord) {
        console.log(`updating user ${event.data.id} with: ${event.data}`);
      }
      // No break statement because we want to fall through to "user.updated" case
    case "user.updated":
      console.log("creating or updating user:", event.data.id);
      await ctx.runMutation(internal.users.create, {
        username: `${event.data.first_name}${event.data.last_name}`,
        imageUrl: event.data.image_url,
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
      });
      break;
    default:
      console.log("clerk webhook event not supported", event.type);
  }

  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: "/clerk-users-webhooks",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
