import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET || "applications";
const supabaseDirectory = process.env.SUPABASE_DIRECTORY || "career-resumes";
const notificationEmail = process.env.CAREER_NOTIFICATION_EMAIL || "info@zephortech.com";

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
}

export async function POST(request: NextRequest) {
  try {
    const useSupabase = !!(supabaseUrl && supabaseServiceRoleKey);
    const supabase = useSupabase ? createClient(supabaseUrl!, supabaseServiceRoleKey!) : null;

    const formData = await request.formData();

    // Extract expected fields
    const fields: Record<string, string> = {};
    for (const [k, v] of formData.entries()) {
      if (k === "resume") continue;
      if (typeof v === "string") fields[k] = v;
    }

    // Handle resume upload (if present)
    let resumeUrl: string | null = null;
    const resumeFile = formData.get("resume") as File | null;
    if (resumeFile && (resumeFile as any).size) {
      const arrayBuffer = await (resumeFile as any).arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const year = new Date().getFullYear();
      const safeName = safeFileName((resumeFile as File).name || "resume.pdf");
      const fileName = `${Date.now()}-${safeName}`;
      const key = `${supabaseDirectory}/${year}/${fileName}`;

      if (useSupabase && supabase) {
        const { error: uploadError } = await supabase.storage
          .from(supabaseBucket)
          .upload(key, buffer, { contentType: (resumeFile as File).type, upsert: false });

        if (uploadError) {
          console.error("Resume upload failed:", uploadError);
          // Try local fallback when Supabase upload is not possible (dev environment)
          try {
            const uploadsDir = path.join(process.cwd(), "public", "_uploads", supabaseDirectory, String(year));
            fs.mkdirSync(uploadsDir, { recursive: true });
            const filePath = path.join(uploadsDir, fileName);
            fs.writeFileSync(filePath, buffer);
            const origin = request.nextUrl?.origin || `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}`;
            resumeUrl = `${origin.replace(/\/$/, "")}/_uploads/${encodeURIComponent(supabaseDirectory)}/${year}/${encodeURIComponent(fileName)}`;
          } catch (fsErr) {
            console.error("Local resume save failed after Supabase error:", fsErr);
            return NextResponse.json({ message: "Failed to upload resume." }, { status: 500 });
          }
        } else {
          // Construct public URL (works for public buckets)
          resumeUrl = `${supabaseUrl!.replace(/\/$/, "")}/storage/v1/object/public/${encodeURIComponent(
            supabaseBucket
          )}/${encodeURIComponent(key)}`;
        }
      } else {
        // Local fallback: save file to public/_uploads so it can be served during dev
        const uploadsDir = path.join(process.cwd(), "public", "_uploads", supabaseDirectory, String(year));
        try {
          fs.mkdirSync(uploadsDir, { recursive: true });
          const filePath = path.join(uploadsDir, fileName);
          fs.writeFileSync(filePath, buffer);
          const origin = request.nextUrl?.origin || `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}`;
          resumeUrl = `${origin.replace(/\/$/, "")}/_uploads/${encodeURIComponent(supabaseDirectory)}/${year}/${encodeURIComponent(fileName)}`;
        } catch (fsErr) {
          console.error("Local resume save failed:", fsErr);
          return NextResponse.json({ message: "Failed to save resume locally." }, { status: 500 });
        }
      }
    }

    // Save application to database
    const insertPayload: any = {
      full_name: fields.fullName || fields.full_name || null,
      email: fields.email || null,
      phone: fields.phone || null,
      city: fields.city || null,
      university: fields.university || null,
      degree: fields.degree || null,
      semester: fields.semester || null,
      graduation_year: fields.graduationYear || null,
      role: fields.role || null,
      internship_type: fields.internshipType || null,
      start_date: fields.startDate || null,
      skills: fields.skills ? fields.skills.split(/,\s*/) : [],
      linkedin_url: fields.linkedin || null,
      portfolio_url: fields.portfolio || null,
      experience: fields.experience || null,
      why_zephortech: fields.whyZephortech || null,
      heard_from: fields.heardFrom || null,
      resume_url: resumeUrl,
      source: "web-careers-form",
      submitted_at: new Date().toISOString(),
    };

    if (useSupabase && supabase) {
      const { error: dbError } = await supabase.from("career_applications").insert([insertPayload]);
      if (dbError) {
        console.error("Failed to save application to Supabase:", dbError);
        // Fall back to local storage if Supabase fails
        console.log("Falling back to local storage...");
        const applicationsFile = path.join(process.cwd(), "public", "applications.json");
        try {
          let existing: any[] = [];
          if (fs.existsSync(applicationsFile)) {
            const data = fs.readFileSync(applicationsFile, "utf-8");
            existing = JSON.parse(data) || [];
          }
          existing.push({ ...insertPayload, id: `app-${Date.now()}` });
          fs.writeFileSync(applicationsFile, JSON.stringify(existing, null, 2));
          console.log(`✅ Application saved locally (Supabase fallback) to ${applicationsFile}`);
        } catch (fsErr) {
          console.error("Local fallback also failed:", fsErr);
          return NextResponse.json({ message: "Failed to save application." }, { status: 500 });
        }
      }
    } else {
      // Local fallback: save to JSON file for development/testing
      const applicationsFile = path.join(process.cwd(), "public", "applications.json");
      try {
        let existing: any[] = [];
        if (fs.existsSync(applicationsFile)) {
          const data = fs.readFileSync(applicationsFile, "utf-8");
          existing = JSON.parse(data) || [];
        }
        existing.push({ ...insertPayload, id: `app-${Date.now()}` });
        fs.writeFileSync(applicationsFile, JSON.stringify(existing, null, 2));
        console.log(`✅ Application saved locally to ${applicationsFile}`);
      } catch (fsErr) {
        console.error("Failed to save application locally:", fsErr);
        return NextResponse.json({ message: "Failed to save application." }, { status: 500 });
      }
    }

    // Send notification email (best-effort)
    try {
      await sendNotificationEmail({ payload: insertPayload });
    } catch (emailErr) {
      console.error("Failed to send notification email:", emailErr);
    }

    return NextResponse.json({ message: "Application submitted successfully.", ok: true }, { status: 200 });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}

async function sendNotificationEmail({ payload }: { payload: any }) {
  const formspreeFormId = "mykvdkjb";

  const emailFormData = new FormData();
  emailFormData.append("fullName", payload.full_name || "");
  emailFormData.append("email", payload.email || "");
  emailFormData.append("phone", payload.phone || "");
  emailFormData.append("city", payload.city || "");
  emailFormData.append("university", payload.university || "");
  emailFormData.append("degree", payload.degree || "");
  emailFormData.append("semester", payload.semester || "");
  emailFormData.append("graduationYear", payload.graduation_year || "");
  emailFormData.append("role", payload.role || "");
  emailFormData.append("internshipType", payload.internship_type || "");
  emailFormData.append("startDate", payload.start_date || "");
  emailFormData.append("skills", Array.isArray(payload.skills) ? payload.skills.join(", ") : (payload.skills || ""));
  emailFormData.append("linkedin", payload.linkedin_url || "");
  emailFormData.append("portfolio", payload.portfolio_url || "");
  emailFormData.append("experience", payload.experience || "");
  emailFormData.append("whyZephortech", payload.why_zephortech || "");
  emailFormData.append("heardFrom", payload.heard_from || "");
  emailFormData.append("resumeUrl", payload.resume_url || "");
  emailFormData.append("subject", `New Career Application - ${payload.full_name || "Applicant"}`);

  const response = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: emailFormData,
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Formspree email failed (${response.status}): ${responseText}`);
  }

  console.log(`✅ Notification email sent to the Formspree-linked inbox for ${payload.email || "applicant"}`);
}
