"use client";

import React from "react";
import { InquiryForm } from "@/components/InquiryForm";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function ContactForm() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      id="quote"
      ref={ref}
      className="relative py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #0076D1 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        {/* Header */}
        <div
          className="mb-6 text-center transition-all duration-1000 md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Send Us a Message
            </p>
          </div>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Start Your Project Today
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-400 md:text-base">
            Fill out the form below and we'll get back to you within 24 hours with a detailed
            proposal tailored to your needs.
          </p>
        </div>

        {/* Form */}
        <div
          className="transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "200ms",
          }}
        >
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
