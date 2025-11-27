"use client";

import React, { useState } from "react";
import { Upload, CheckCircle, AlertCircle, Loader2, FileText, X } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const skillOptions = [
  "React/Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AI/ML",
  "DevOps",
  "AWS/GCP/Azure",
  "Mobile Development",
  "UI/UX Design",
  "Product Management",
  "Data Engineering",
  "Blockchain",
];

const experienceLevels = [
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  portfolioUrl: string;
  skills: string[];
  experienceLevel: string;
  coverLetter: string;
  resume: File | null;
}

export function CareerApplicationForm() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    skills: [],
    experienceLevel: "",
    coverLetter: "",
    resume: null,
  });

  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillToggle = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.includes(skill)
        ? formData.skills.filter((s) => s !== skill)
        : [...formData.skills, skill],
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please upload a PDF or Word document");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must be less than 5MB");
      return;
    }

    setFormData({ ...formData, resume: file });
    setErrorMessage("");
  };

  const removeFile = () => {
    setFormData({ ...formData, resume: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("linkedinUrl", formData.linkedinUrl);
      submitData.append("portfolioUrl", formData.portfolioUrl);
      submitData.append("skills", JSON.stringify(formData.skills));
      submitData.append("experienceLevel", formData.experienceLevel);
      submitData.append("coverLetter", formData.coverLetter);
      
      if (formData.resume) {
        submitData.append("resume", formData.resume);
      }

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }

      setSubmitStatus("success");
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        linkedinUrl: "",
        portfolioUrl: "",
        skills: [],
        experienceLevel: "",
        coverLetter: "",
        resume: null,
      });
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-2xl text-center">
          <div
            className="rounded-xl backdrop-blur-sm p-5 md:rounded-2xl md:p-6"
            style={{
              background: "rgba(0, 118, 209, 0.1)",
              border: "1px solid rgba(0, 118, 209, 0.3)",
            }}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 md:mb-6 md:h-20 md:w-20">
              <CheckCircle className="h-8 w-8 text-green-400 md:h-10 md:w-10" />
            </div>
            <h2 className="heading-2 mb-3 text-white md:mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="mb-6 text-sm text-white/70 md:mb-8 md:text-base">
              Thank you for your interest in joining ZephorTech. We've received your profile and will review it carefully. 
              We'll reach out when opportunities match your expertise.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/careers"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 md:text-base"
                style={{
                  background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                }}
              >
                Back to Careers
              </a>
              <a
                href="/"
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 md:text-base"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="px-4 py-12 md:py-16">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div
          className="mb-6 text-center md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-sm md:mb-4 md:px-4 md:py-2"
            style={{
              background: "rgba(0, 118, 209, 0.1)",
              border: "1px solid rgba(0, 118, 209, 0.3)",
            }}
          >
            <span className="text-xs font-semibold text-primary md:text-sm">Talent Network Application</span>
          </div>
          <h1 className="heading-2 mb-3 font-bold text-white md:mb-4">
            Submit Your Profile
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
            Join our talent network and be the first to know when opportunities arise that match your expertise.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl backdrop-blur-sm p-5 md:rounded-2xl md:p-6"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          {/* Personal Information */}
          <div className="mb-6 md:mb-8">
            <h3 className="font-poppins mb-4 text-lg font-bold text-white md:mb-5 md:text-xl">Personal Information</h3>
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <div>
                <label className="mb-2 block text-xs font-medium text-white/80 md:text-sm">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:text-base"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-white/80 md:text-sm">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:text-base"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-white/80 md:text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:text-base"
                  placeholder="+971521257034"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-white/80 md:text-sm">
                  Experience Level <span className="text-red-400">*</span>
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:text-base"
                >
                  <option value="" className="bg-gray-900">Select experience level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level} className="bg-gray-900">{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div className="mb-6 md:mb-8">
            <h3 className="font-poppins mb-4 text-lg font-bold text-white md:mb-5 md:text-xl">Professional Links</h3>
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <div>
                <label className="mb-2 block text-xs font-medium text-white/80 md:text-sm">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:text-base"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-white/80 md:text-sm">
                  Portfolio / Website
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:text-base"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6 md:mb-8">
            <h3 className="font-poppins mb-3 text-lg font-bold text-white md:mb-4 md:text-xl">Skills & Expertise</h3>
            <p className="mb-3 text-xs text-white/60 md:mb-4 md:text-sm">Select all that apply</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all md:text-sm ${
                    formData.skills.includes(skill)
                      ? "bg-primary text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Resume Upload */}
          <div className="mb-6 md:mb-8">
            <h3 className="font-poppins mb-3 text-lg font-bold text-white md:mb-4 md:text-xl">
              Resume / CV <span className="text-red-400">*</span>
            </h3>
            
            {!formData.resume ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all md:rounded-2xl md:p-10 ${
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-white/20 bg-white/5 hover:border-white/30"
                }`}
              >
                <Upload className="mx-auto mb-3 h-10 w-10 text-white/40 md:mb-4 md:h-12 md:w-12" />
                <p className="mb-2 text-sm font-medium text-white/80 md:text-base">
                  Drag and drop your resume here, or
                </p>
                <label className="inline-block cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 md:text-base">
                  Browse Files
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    required
                  />
                </label>
                <p className="mt-3 text-xs text-white/40 md:mt-4 md:text-sm">
                  PDF, DOC, or DOCX (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 md:gap-4 md:p-4">
                <FileText className="h-8 w-8 flex-shrink-0 text-primary md:h-10 md:w-10" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white md:text-base">{formData.resume.name}</p>
                  <p className="text-xs text-white/40 md:text-sm">
                    {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-lg bg-red-500/20 p-1.5 text-red-400 transition-all hover:bg-red-500/30 md:p-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div className="mb-6 md:mb-8">
            <h3 className="font-poppins mb-3 text-lg font-bold text-white md:mb-4 md:text-xl">Cover Letter</h3>
            <p className="mb-3 text-xs text-white/60 md:mb-4 md:text-sm">
              Tell us about yourself and why you'd be a great addition to ZephorTech
            </p>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={5}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:text-base"
              placeholder="I'm passionate about..."
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 md:mb-6 md:gap-3 md:p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
              <p className="text-xs text-red-400 md:text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 md:text-base"
            style={{
              background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
              boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit to Talent Network</span>
            )}
          </button>

          <p className="mt-5 text-center text-xs text-white/40 md:mt-6 md:text-sm">
            By submitting this form, you agree to our{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

