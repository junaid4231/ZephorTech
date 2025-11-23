"use client";

import React, { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "success" | "error";

interface NewsletterFormProps {
  variant?: "full" | "compact";
  className?: string;
}

export function NewsletterForm({ variant = "full", className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClasses =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !email) return;
    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "We couldn't subscribe you. Please try again.");
      }

      setStatus("success");
      setMessage("Almost there! Please check your email to confirm your subscription.");
      setEmail("");
      trackEvent("newsletter_subscribed", { variant });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonClasses =
    variant === "compact"
      ? "inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
      : "inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={
          variant === "full"
            ? "flex flex-col gap-4 sm:flex-row sm:items-center"
            : "flex flex-col gap-3 sm:flex-row sm:items-center"
        }
      >
        <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>
          Email address
        </label>
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <input
            id={`newsletter-email-${variant}`}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus("idle");
              setMessage("");
            }}
            required
            className={`${inputClasses} pl-11`}
          />
        </div>

        <button type="submit" disabled={isSubmitting} className={buttonClasses}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : (
            "Join newsletter"
          )}
        </button>
      </form>

      <div
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-sm ${variant === "compact" ? "text-left" : ""}`}
      >
        {status === "success" && <p className="text-emerald-300">{message}</p>}
        {status === "error" && <p className="text-rose-300">{message}</p>}
      </div>
    </div>
  );
}

