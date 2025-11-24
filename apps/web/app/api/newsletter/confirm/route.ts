import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    const origin = request.nextUrl.origin;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("❌ Missing Supabase configuration");
      return NextResponse.redirect(new URL("/newsletter/error?reason=config", origin));
    }

    if (!token) {
      console.warn("⚠️ Missing confirmation token");
      return NextResponse.redirect(new URL("/newsletter/error?reason=missing-token", origin));
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: subscriber, error: findError } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("confirmation_token", token)
      .maybeSingle();

    if (findError) {
      console.error("❌ Error finding subscriber:", findError);
      return NextResponse.redirect(new URL("/newsletter/error?reason=database-error", origin));
    }

    if (!subscriber) {
      console.warn("⚠️ Invalid confirmation token:", token);
      return NextResponse.redirect(new URL("/newsletter/error?reason=invalid-token", origin));
    }

    // Generate unsubscribe token if not exists (for backward compatibility)
    const unsubscribeToken = subscriber.unsubscribe_token || crypto.randomBytes(32).toString("hex");

    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({
        status: "confirmed",
        confirmation_token: null,
        confirmed_at: new Date().toISOString(),
        unsubscribe_token: unsubscribeToken, // Ensure unsubscribe token exists
      })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error("❌ Error updating subscriber:", updateError);
      return NextResponse.redirect(new URL("/newsletter/error?reason=update-error", origin));
    }

    console.log("✅ Newsletter subscription confirmed:", subscriber.email);

    return NextResponse.redirect(new URL("/newsletter/confirmed", origin));
  } catch (error) {
    console.error("❌ Confirmation error:", error);
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(new URL("/newsletter/error?reason=server-error", origin));
  }
}


