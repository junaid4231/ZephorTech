import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with validation
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL environment variable is not set");
  }

  if (!supabaseServiceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY environment variable is not set");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client
    const supabase = getSupabaseClient();

    const formData = await request.formData();

    // Extract form fields
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const portfolioUrl = formData.get("portfolioUrl") as string;
    const skills = JSON.parse(formData.get("skills") as string);
    const experienceLevel = formData.get("experienceLevel") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resumeFile = formData.get("resume") as File;

    // Validate required fields
    if (!fullName || !email || !experienceLevel || !resumeFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload resume to Supabase Storage
    const fileExt = resumeFile.name.split(".").pop();
    const fileName = `${Date.now()}-${fullName.toLowerCase().replace(/\s+/g, "-")}.${fileExt}`;
    const filePath = `career-resumes/${new Date().getFullYear()}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("applications")
      .upload(filePath, resumeFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { message: "Failed to upload resume" },
        { status: 500 }
      );
    }

    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from("applications")
      .getPublicUrl(filePath);

    const resumeUrl = urlData.publicUrl;

    // Save application to database
    const { data: dbData, error: dbError } = await supabase
      .from("career_applications")
      .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone || null,
          linkedin_url: linkedinUrl || null,
          portfolio_url: portfolioUrl || null,
          skills: skills,
          experience_level: experienceLevel,
          cover_letter: coverLetter || null,
          resume_url: resumeUrl,
          status: "new",
          submitted_at: new Date().toISOString(),
        },
      ])
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { message: "Failed to save application" },
        { status: 500 }
      );
    }

    // Send email notification (using Resend if configured)
    try {
      await sendEmailNotification({
        fullName,
        email,
        phone,
        linkedinUrl,
        portfolioUrl,
        skills,
        experienceLevel,
        resumeUrl,
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        applicationId: dbData[0].id,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Application submission error:", error);
    
    // Provide helpful error messages for missing env vars
    if (error instanceof Error && error.message.includes("NEXT_PUBLIC_SUPABASE_URL")) {
      return NextResponse.json(
        { 
          message: "Server configuration error: NEXT_PUBLIC_SUPABASE_URL is not set. Please check your .env.local file.",
          error: "Missing environment variable"
        },
        { status: 500 }
      );
    }
    
    if (error instanceof Error && error.message.includes("SUPABASE_SERVICE_ROLE_KEY")) {
      return NextResponse.json(
        { 
          message: "Server configuration error: SUPABASE_SERVICE_ROLE_KEY is not set. Please check your .env.local file.",
          error: "Missing environment variable"
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: error instanceof Error ? error.message : "Internal server error",
        error: "Application submission failed"
      },
      { status: 500 }
    );
  }
}

async function sendEmailNotification(data: {
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  portfolioUrl: string;
  skills: string[];
  experienceLevel: string;
  resumeUrl: string;
}) {
  // Check if Resend API key is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.log("Resend API key not configured, skipping email notification");
    return;
  }

  const emailContent = `
    <h2>New Talent Network Application</h2>
    <p><strong>Name:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
    <p><strong>Experience Level:</strong> ${data.experienceLevel}</p>
    <p><strong>Skills:</strong> ${data.skills.join(", ")}</p>
    ${data.linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedinUrl}">${data.linkedinUrl}</a></p>` : ""}
    ${data.portfolioUrl ? `<p><strong>Portfolio:</strong> <a href="${data.portfolioUrl}">${data.portfolioUrl}</a></p>` : ""}
    <p><strong>Resume:</strong> <a href="${data.resumeUrl}">Download Resume</a></p>
    <hr />
    <p style="color: #666; font-size: 12px;">View all applications in your Supabase dashboard</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "careers@zephortech.com",
      to: "careers@zephortech.com",
      subject: `New Talent Network Application - ${data.fullName}`,
      html: emailContent,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email API error: ${response.statusText}`);
  }

  return response.json();
}

