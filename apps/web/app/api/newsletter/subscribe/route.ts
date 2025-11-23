import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { isRateLimited } from "@/lib/rate-limit";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { message: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientIp, { bucket: "newsletter", limit: 10, windowMs: 60_000 })) {
      return NextResponse.json(
        { message: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string" || !validateEmail(email)) {
      return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const normalizedEmail = email.trim().toLowerCase();
    const confirmationToken = crypto.randomBytes(32).toString("hex");

    const { data: existingSubscriber } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingSubscriber && existingSubscriber.status === "confirmed") {
      return NextResponse.json(
        { message: "You're already subscribed to our newsletter." },
        { status: 200 }
      );
    }

    const upsertPayload = {
      email: normalizedEmail,
      status: "pending",
      confirmation_token: confirmationToken,
      confirmed_at: null,
      unsubscribed_at: null,
      source: "web-newsletter-form",
    };

    if (existingSubscriber) {
      await supabase
        .from("newsletter_subscribers")
        .update(upsertPayload)
        .eq("id", existingSubscriber.id);
    } else {
      await supabase.from("newsletter_subscribers").insert(upsertPayload);
    }

    await sendConfirmationEmail({
      email: normalizedEmail,
      token: confirmationToken,
      origin: siteUrl || request.nextUrl.origin,
    });

    return NextResponse.json(
      { message: "Thanks! Please check your email to confirm your subscription." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { message: "We couldn't process your request. Please try again later." },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail({
  email,
  token,
  origin,
}: {
  email: string;
  token: string;
  origin: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return;
  }

  const confirmationUrl = `${origin.replace(/\/$/, "")}/api/newsletter/confirm?token=${token}`;

  const html = `
    <h2>Confirm your subscription</h2>
    <p>Thanks for subscribing to ZephorTech's newsletter!</p>
    <p>Please confirm your email address by clicking the button below:</p>
    <p><a href="${confirmationUrl}" style="display:inline-block;padding:10px 18px;background:#0076D1;color:#ffffff;border-radius:8px;text-decoration:none;">Confirm Subscription</a></p>
    <p>If you didn't subscribe, you can safely ignore this email.</p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "newsletter@zephortech.com",
      to: email,
      subject: "Confirm your ZephorTech newsletter subscription",
      html,
    }),
  });
}


