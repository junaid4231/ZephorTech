import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const origin = request.nextUrl.origin;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.redirect(new URL("/newsletter/error?reason=config", origin));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/newsletter/error?reason=missing-token", origin));
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  const { data: subscriber, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .eq("confirmation_token", token)
    .maybeSingle();

  if (error || !subscriber) {
    return NextResponse.redirect(new URL("/newsletter/error?reason=invalid-token", origin));
  }

  await supabase
    .from("newsletter_subscribers")
    .update({
      status: "confirmed",
      confirmation_token: null,
      confirmed_at: new Date().toISOString(),
    })
    .eq("id", subscriber.id);

  return NextResponse.redirect(new URL("/newsletter/confirmed", origin));
}


