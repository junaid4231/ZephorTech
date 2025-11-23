"use client";

import React, { useState, FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { trackEvent } from "@/lib/analytics";

type InquiryPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  customBudget: string;
  timeline: string;
  message: string;
};

const defaultPayload: InquiryPayload = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  customBudget: "",
  timeline: "",
  message: "",
};

const serviceOptions = [
  "Web Development",
  "Mobile Apps",
  "AI Agents",
  "SaaS Platforms",
  "E-commerce",
  "Cloud & DevOps",
  "Digital Marketing",
  "SEO & Growth",
  "Brand Identity",
];

const budgetOptions = [
  "Under $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k - $100k",
  "$100k+",
  "Custom / We'll discuss",
];

const timelineOptions = [
  "ASAP (2-4 weeks)",
  "1-2 Months",
  "3-4 Months",
  "Ongoing/Retainer",
  "Flexible",
];

export function InquiryForm() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });
  const [payload, setPayload] = useState<InquiryPayload>(defaultPayload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange =
    (field: keyof InquiryPayload) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setPayload((prev) => ({ ...prev, [field]: value }));
      setStatus("idle");
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit your inquiry. Please try again.");
      }

      setStatus("success");
      setPayload(defaultPayload);
      trackEvent("contact_form_submitted", {
        service: payload.service,
        budget: payload.budget,
        timeline: payload.timeline,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s ease",
      }}
    >
      <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr,1.3fr]">
        {/* Left Column - Info */}
        <div className="space-y-6 text-white">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00A8FF]">
              <MessageCircle className="h-4 w-4" />
              Start a conversation
            </p>
            <h3 className="font-poppins mb-4 font-bold leading-tight text-[var(--scale-h2)] text-white">
              Tell us what you're building. We'll design the roadmap.
            </h3>
            <p className="leading-relaxed text-[var(--scale-body)] text-white/80">
              ZephorTech partners with modern teams to architect, build, and scale premium digital
              products. Share the essentials and we'll craft a tailored engagement within 24 hours.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0076D1]/20">
                  <Mail className="h-5 w-5 text-[#0076D1]" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-white/70">E-mail</p>
                  <p className="text-base font-medium text-white">hello@zephortech.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0076D1]/20">
                  <Phone className="h-5 w-5 text-[#0076D1]" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-white/70">Phone</p>
                  <p className="text-base font-medium text-white">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-white/20">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0076D1]/20">
                  <MapPin className="h-5 w-5 text-[#0076D1]" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-white/70">Headquarters</p>
                  <p className="text-base font-medium text-white">
                    123 Tech Street, Innovation City, IC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-black/80 to-black/60 p-6 backdrop-blur-xl md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-white">
                  First name <span className="text-red-400">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={payload.firstName}
                  onChange={handleChange("firstName")}
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-[var(--scale-body)] text-white transition-all duration-200 placeholder:text-white/60 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-white">
                  Surname <span className="text-red-400">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={payload.lastName}
                  onChange={handleChange("lastName")}
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-[var(--scale-body)] text-white transition-all duration-200 placeholder:text-white/60 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white">
                  E-mail <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={payload.email}
                  onChange={handleChange("email")}
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-[var(--scale-body)] text-white transition-all duration-200 placeholder:text-white/60 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-white">
                  Mobile number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={payload.phone}
                  onChange={handleChange("phone")}
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-[var(--scale-body)] text-white transition-all duration-200 placeholder:text-white/60 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-semibold text-white">
                Company / Organization
              </label>
              <input
                id="company"
                type="text"
                name="company"
                value={payload.company}
                onChange={handleChange("company")}
                className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-[var(--scale-body)] text-white transition-all duration-200 placeholder:text-white/60 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30"
                placeholder="Acme Corporation"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="mb-2 block text-sm font-semibold text-white">
                I would like <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={payload.service}
                  onChange={handleChange("service")}
                  className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 pr-10 font-medium text-[var(--scale-body)] text-white transition-all duration-200 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30 [&>option]:bg-gray-900 [&>option]:text-white"
                  required
                >
                  <option value="" className="text-white/40">
                    Select a service
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="mb-2 block text-sm font-semibold text-white">
                  Budget range <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    name="budget"
                    value={payload.budget}
                    onChange={handleChange("budget")}
                    className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 pr-10 font-medium text-[var(--scale-body)] text-white transition-all duration-200 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30 [&>option]:bg-gray-900 [&>option]:text-white"
                    required
                  >
                    <option value="" className="text-white/40">
                      Select budget
                    </option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                </div>
                {payload.budget === "Custom / We'll discuss" && (
                  <div className="mt-4">
                    <label
                      htmlFor="customBudget"
                      className="mb-2 block text-sm font-semibold text-white"
                    >
                      Preferred investment expectation
                    </label>
                    <input
                      id="customBudget"
                      type="text"
                      name="customBudget"
                      value={payload.customBudget}
                      onChange={handleChange("customBudget")}
                      className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-[var(--scale-body)] text-white transition-all duration-200 placeholder:text-white/60 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30"
                      placeholder="Share a range or context"
                    />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="timeline" className="mb-2 block text-sm font-semibold text-white">
                  Timeline <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="timeline"
                    name="timeline"
                    value={payload.timeline}
                    onChange={handleChange("timeline")}
                    className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 pr-10 font-medium text-[var(--scale-body)] text-white transition-all duration-200 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30 [&>option]:bg-gray-900 [&>option]:text-white"
                    required
                  >
                    <option value="" className="text-white/40">
                      Select timeline
                    </option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                value={payload.message}
                onChange={handleChange("message")}
                rows={5}
                className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-medium text-[var(--scale-body)] text-white transition-all duration-200 placeholder:text-white/60 focus:border-[#0076D1] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#0076D1]/30"
                placeholder="Tell us about your project, goals, and any specific requirements..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#5B4FE9] via-[#3B82F6] to-[#0EA5E9] px-6 py-3.5 font-semibold text-[var(--scale-body)] text-white shadow-lg shadow-[#0076D1]/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0076D1]/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit inquiry
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>

            {/* Status Messages */}
            <div role="status" aria-live="polite" className="min-h-[3.5rem]">
              {status === "success" && (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3.5 backdrop-blur-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-200">
                      Thank you for your inquiry!
                    </p>
                    <p className="mt-1 text-sm text-emerald-300/80">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3.5 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-red-200">
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
