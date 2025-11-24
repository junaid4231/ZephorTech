import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isRateLimited } from "@/lib/rate-limit";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Unsubscribe endpoint
 * GET /api/newsletter/unsubscribe?token=xxx
 * 
 * Validates unsubscribe token and marks subscriber as unsubscribed
 */
export async function GET(request: NextRequest) {
  try {
    // Validate configuration
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        new URL("/newsletter/error?reason=config", origin)
      );
    }

    // Get token from query params
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        new URL("/newsletter/error?reason=missing-token", origin)
      );
    }

    // Rate limiting
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientIp, { bucket: "newsletter-unsubscribe", limit: 10, windowMs: 60_000 })) {
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        new URL("/newsletter/error?reason=rate-limit", origin)
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Find subscriber by unsubscribe token
    const { data: subscriber, error: findError } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("unsubscribe_token", token)
      .maybeSingle();

    if (findError) {
      console.error("❌ Error finding subscriber:", findError);
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        new URL("/newsletter/error?reason=database-error", origin)
      );
    }

    if (!subscriber) {
      console.warn("⚠️ Invalid unsubscribe token:", token);
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        new URL("/newsletter/error?reason=invalid-token", origin)
      );
    }

    // Check if already unsubscribed
    if (subscriber.status === "unsubscribed") {
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        new URL("/newsletter/unsubscribed?already=true", origin)
      );
    }

    // Update subscriber status
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
        unsubscribe_token: null, // Clear token after use
      })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error("❌ Error updating subscriber:", updateError);
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        new URL("/newsletter/error?reason=update-error", origin)
      );
    }

    console.log("✅ Subscriber unsubscribed successfully:", subscriber.email);

    // Redirect to confirmation page
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(
      new URL("/newsletter/unsubscribed", origin)
    );
  } catch (error) {
    console.error("❌ Unsubscribe error:", error);
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(
      new URL("/newsletter/error?reason=server-error", origin)
    );
  }
}

