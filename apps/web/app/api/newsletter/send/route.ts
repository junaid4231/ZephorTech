import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchGraphQL } from "@/lib/graphql/client";
import crypto from "node:crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const strapiApiToken = process.env.STRAPI_API_TOKEN;
const newsletterFromEmail = process.env.NEWSLETTER_FROM_EMAIL || "newsletter@zephortech.com";

// Admin API key for authentication (should be set in environment)
const ADMIN_API_KEY = process.env.NEWSLETTER_ADMIN_API_KEY;

/**
 * Newsletter Sending Endpoint
 * POST /api/newsletter/send
 * 
 * Sends newsletter to all confirmed subscribers
 * Requires admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Validate admin authentication
    const authHeader = request.headers.get("authorization");
    const providedKey = authHeader?.replace("Bearer ", "");

    if (!ADMIN_API_KEY || providedKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { message: "Unauthorized. Admin API key required." },
        { status: 401 }
      );
    }

    // Validate configuration
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { message: "Server configuration error. Supabase not configured." },
        { status: 500 }
      );
    }

    if (!resendApiKey) {
      return NextResponse.json(
        { message: "Server configuration error. Email service not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { newsletterId, subject, content, previewText } = body;

    // Option 1: Fetch from Strapi if newsletterId provided
    let newsletterContent = content;
    let newsletterSubject = subject;
    let newsletterPreviewText = previewText;

    if (newsletterId && strapiApiToken) {
      try {
        const query = `
          query GetNewsletter($id: ID!) {
            newsletter(id: $id) {
              data {
                id
                attributes {
                  title
                  subject
                  previewText
                  content
                }
              }
            }
          }
        `;

        const response = await fetchGraphQL<{
          newsletter: {
            data: {
              attributes: {
                title: string;
                subject: string;
                previewText?: string;
                content: string;
              };
            };
          };
        }>(query, { id: newsletterId });

        if (response.data?.newsletter?.data?.attributes) {
          const attrs = response.data.newsletter.data.attributes;
          newsletterSubject = attrs.subject || attrs.title;
          newsletterContent = attrs.content;
          newsletterPreviewText = attrs.previewText || "";
        }
      } catch (error) {
        console.warn("⚠️ Could not fetch newsletter from Strapi, using provided content:", error);
      }
    }

    // Validate required fields
    if (!newsletterSubject || !newsletterContent) {
      return NextResponse.json(
        { message: "Missing required fields: subject and content are required." },
        { status: 400 }
      );
    }

    // Fetch all confirmed subscribers
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const { data: subscribers, error: subscribersError } = await supabase
      .from("newsletter_subscribers")
      .select("id, email, unsubscribe_token")
      .eq("status", "confirmed")
      .is("unsubscribed_at", null)
      .not("email", "is", null);

    if (subscribersError) {
      console.error("❌ Error fetching subscribers:", subscribersError);
      return NextResponse.json(
        { message: "Failed to fetch subscribers from database." },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { message: "No confirmed subscribers found." },
        { status: 400 }
      );
    }

    console.log(`📧 Preparing to send newsletter to ${subscribers.length} subscribers`);

    // Send emails in batches (Resend allows up to 50 recipients per batch)
    const BATCH_SIZE = 50;
    const batches = [];
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      batches.push(subscribers.slice(i, i + BATCH_SIZE));
    }

    const results = {
      total: subscribers.length,
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Send each batch
    for (const batch of batches) {
      const emailPromises = batch.map(async (subscriber) => {
        try {
          // Generate unsubscribe token if missing (backward compatibility)
          let unsubscribeToken = subscriber.unsubscribe_token;
          if (!unsubscribeToken) {
            // Generate token and update database
            unsubscribeToken = crypto.randomBytes(32).toString("hex");
            
            const { error: updateError } = await supabase
              .from("newsletter_subscribers")
              .update({ unsubscribe_token: unsubscribeToken })
              .eq("id", subscriber.id);
            
            if (updateError) {
              console.warn(`⚠️ Could not update unsubscribe token for ${subscriber.email}:`, updateError);
            }
          }

          const unsubscribeUrl = `${siteUrl || request.nextUrl.origin}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

          // Convert rich text to HTML (basic conversion - you may want to use a proper HTML converter)
          const htmlContent = convertRichTextToHTML(newsletterContent);

          const html = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${newsletterSubject}</title>
              </head>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #004E8F 0%, #0076D1 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                  <h1 style="color: #ffffff; margin: 0;">ZephorTech Newsletter</h1>
                </div>
                <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
                  ${htmlContent}
                </div>
                <div style="background: #f5f5f5; padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #666;">
                  <p style="margin: 0 0 10px 0;">
                    You're receiving this because you subscribed to ZephorTech's newsletter.
                  </p>
                  <p style="margin: 0;">
                    <a href="${unsubscribeUrl}" style="color: #0076D1; text-decoration: none;">Unsubscribe</a>
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
              to: subscriber.email,
              subject: newsletterSubject,
              html,
              ...(newsletterPreviewText && { text: newsletterPreviewText }),
            }),
          });

          if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            throw new Error(`Resend API error: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ""}`);
          }

          return { success: true, email: subscriber.email };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error(`❌ Failed to send to ${subscriber.email}:`, errorMessage);
          return { success: false, email: subscriber.email, error: errorMessage };
        }
      });

      const batchResults = await Promise.allSettled(emailPromises);
      
      batchResults.forEach((result) => {
        if (result.status === "fulfilled") {
          if (result.value.success) {
            results.sent++;
          } else {
            results.failed++;
            if (result.value.error) {
              results.errors.push(`${result.value.email}: ${result.value.error}`);
            }
          }
        } else {
          results.failed++;
          results.errors.push(`Promise rejected: ${result.reason}`);
        }
      });

      // Rate limiting: wait between batches to avoid overwhelming Resend
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`✅ Newsletter sending completed: ${results.sent} sent, ${results.failed} failed`);

    return NextResponse.json({
      message: "Newsletter sending completed",
      results: {
        total: results.total,
        sent: results.sent,
        failed: results.failed,
        errors: results.errors.slice(0, 10), // Limit error details
      },
    });
  } catch (error) {
    console.error("❌ Newsletter send error:", error);
    return NextResponse.json(
      {
        message: "Failed to send newsletter",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Convert Strapi rich text to HTML
 * Basic implementation - you may want to use a proper converter
 */
function convertRichTextToHTML(richText: string): string {
  if (!richText) return "";

  // If it's already HTML, return as is
  if (richText.includes("<")) {
    return richText;
  }

  // Basic markdown-like conversion
  let html = richText
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith("<")) {
    html = `<p>${html}</p>`;
  }

  return html;
}

