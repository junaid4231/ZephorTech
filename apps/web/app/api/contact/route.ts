import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isRateLimited } from "@/lib/rate-limit";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Notification email for inquiry form submissions
// Set CONTACT_NOTIFICATION_EMAIL in .env.local to override
// Note: For Resend free tier, verify domain at resend.com/domains to send to custom emails
const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL ?? "info@zephortech.com";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { message: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientIp, { bucket: "contact", limit: 5, windowMs: 60_000 })) {
      return NextResponse.json(
        { message: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const payload = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      budget,
      customBudget,
      timeline,
      message,
    } = payload || {};

    if (!firstName || !lastName || !email || !service || !budget || !timeline) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { error } = await supabase.from("contact_submissions").insert([
      {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        service: service,
        budget: budget,
        custom_budget: customBudget?.trim() || null,
        timeline,
        message: message?.trim() || null,
        source: "web-contact-form",
      },
    ]);

    if (error) {
      console.error("Contact submission save error:", error);
      return NextResponse.json(
        { message: "Failed to save your inquiry. Please try again later." },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking - form submission succeeds even if email fails)
    try {
      await sendNotificationEmail({
        firstName,
        lastName,
        email,
        phone,
        company,
        service,
        budget,
        customBudget,
        timeline,
        message,
      });
    } catch (emailError) {
      // Log error but don't fail the form submission
      console.error("⚠️  Contact notification email failed (form still saved):", emailError);
      // In production, you might want to send this to an error tracking service
    }

    return NextResponse.json({ message: "Inquiry submitted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

async function sendNotificationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  customBudget?: string;
  timeline: string;
  message?: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("⚠️  RESEND_API_KEY not configured. Email notifications disabled.");
    return;
  }

  const html = `
    <h2>New Contact Inquiry</h2>
    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
    <p><strong>Company:</strong> ${data.company || "Not provided"}</p>
    <p><strong>Service:</strong> ${data.service}</p>
    <p><strong>Budget:</strong> ${data.budget}</p>
    ${data.customBudget ? `<p><strong>Custom Budget Notes:</strong> ${data.customBudget}</p>` : ""}
    <p><strong>Timeline:</strong> ${data.timeline}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message ? data.message.replace(/\\n/g, "<br />") : "No message provided."}</p>
  `;

  try {
    console.log("📧 Sending email notification:", {
      to: notificationEmail,
      from: "info@zephortech.com",
      hasApiKey: !!resendApiKey,
    });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "info@zephortech.com", // Resend test domain - verify your domain at resend.com/domains for production
        to: notificationEmail,
        subject: `New Inquiry from ${data.firstName} ${data.lastName}`,
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
    console.log("✅ Email sent successfully:", {
      id: result.id,
      to: notificationEmail,
    });
    return result;
  } catch (error) {
    console.error("❌ Failed to send email via Resend:", error);
    throw error;
  }
}
