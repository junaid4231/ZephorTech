import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { isRateLimited } from "@/lib/rate-limit";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const newsletterFromEmail = process.env.NEWSLETTER_FROM_EMAIL || "newsletter@zephortech.com";

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
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const normalizedEmail = email.trim().toLowerCase();
    const confirmationToken = crypto.randomBytes(32).toString("hex");
    const unsubscribeToken = crypto.randomBytes(32).toString("hex");

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
      unsubscribe_token: unsubscribeToken,
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
      unsubscribeToken: unsubscribeToken,
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
  unsubscribeToken,
  origin,
}: {
  email: string;
  token: string;
  unsubscribeToken: string;
  origin: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("⚠️ RESEND_API_KEY not configured. Email notifications disabled.");
    return;
  }

  try {
    const confirmationUrl = `${origin.replace(/\/$/, "")}/api/newsletter/confirm?token=${token}`;
    const unsubscribeUrl = `${origin.replace(/\/$/, "")}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Subscription</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #004E8F 0%, #0076D1 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0;">Confirm Your Subscription</h1>
          </div>
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Thanks for subscribing to ZephorTech's newsletter!</p>
            <p style="font-size: 16px; margin-bottom: 30px;">Please confirm your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" style="display: inline-block; padding: 12px 24px; background: #0076D1; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Confirm Subscription</a>
            </div>
            <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              If you didn't subscribe, you can safely ignore this email or 
              <a href="${unsubscribeUrl}" style="color: #0076D1; text-decoration: none;">unsubscribe here</a>.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
            <p>© ${new Date().getFullYear()} ZephorTech. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: newsletterFromEmail,
        to: email,
        subject: "Confirm your ZephorTech newsletter subscription",
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Resend API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Resend API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("✅ Confirmation email sent successfully:", {
      id: result.id,
      to: email,
    });
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
    // Don't throw - allow subscription to succeed even if email fails
  }
}
