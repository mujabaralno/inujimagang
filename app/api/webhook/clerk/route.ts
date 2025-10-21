/* eslint-disable @typescript-eslint/no-explicit-any */
// app/webhook/clerk/route.ts (App Router)
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { createUser, updateUser, deleteUser } from "@/actions/user.actions";

export const runtime = "nodejs"; // → stabil di Node
export const dynamic = "force-dynamic"; // → jangan di-cache

export async function POST(req: Request) {
  // LOG PALING AWAL (biar kelihatan di Vercel fungsi ini jalan)
  console.log("→ /webhook/clerk: request masuk");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SIGNING_SECRET");
    return new Response("Misconfigured", { status: 500 });
  }

  const h = headers();
  const svix_id = (await h).get("svix-id");
  const svix_timestamp = (await h).get("svix-timestamp");
  const svix_signature = (await h).get("svix-signature");
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("No svix headers");
    return new Response("No svix headers", { status: 400 });
  }

  // RAW BODY
  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Svix verify error:", err);
    return new Response("Bad signature", { status: 400 });
  }

  const eventType = evt.type;
  console.log("Webhook type:", eventType);

  // CREATE
  if (eventType === "user.created") {
    const data = evt.data as any;
    const {
      id,
      email_addresses,
      image_url,
      first_name,
      last_name,
      public_metadata,
    } = data;

    if (!email_addresses?.length)
      return new Response("No email", { status: 400 });

    const role = (public_metadata?.role as string) ?? "admin";

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name || "",
      lastName: last_name || "",
      photo: image_url,
      role, // simpan juga ke DB
    };

    console.log("Creating user:", user);

    try {
      const newUser = await createUser(user);
      try {
        const clerkClientInstance = await clerkClient();
        const result = await clerkClientInstance.users.updateUserMetadata(id, {
          publicMetadata: {
            ...public_metadata, // kalau ada yang lain, tetap dipertahankan
            role, 
            userId: newUser._id.toString(),
          },
        });
        console.log("✅ Clerk metadata updated:", result.publicMetadata);
      } catch (e) {
        console.warn("Update Clerk publicMetadata failed:", e);
      }
      return NextResponse.json({ ok: true, userId: newUser._id.toString() });
    } catch (e) {
      console.error("createUser failed:", e);
      return new Response("Create failed", { status: 500 });
    }
  }

  // UPDATE
  if (eventType === "user.updated") {
    const data = evt.data as any;
    try {
      const updated = await updateUser(data.id, {
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        photo: data.image_url,
      });
      return NextResponse.json({ ok: true, user: updated });
    } catch (e) {
      console.error("updateUser failed:", e);
      return new Response("Update failed", { status: 500 });
    }
  }

  // DELETE
  if (eventType === "user.deleted") {
    const data = evt.data as any;
    try {
      const deleted = await deleteUser(data.id);
      return NextResponse.json({ ok: true, user: deleted });
    } catch (e) {
      console.error("deleteUser failed:", e);
      return new Response("Delete failed", { status: 500 });
    }
  }

  console.log("Unhandled event:", eventType);
  return NextResponse.json({ ok: true });
}
