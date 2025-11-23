"use client";

import React from "react";
import { InquiryForm } from "@/components/InquiryForm";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function InquirySection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0B1220 60%, #050505 100%)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(0, 168, 255, 0.2), transparent 45%),
              radial-gradient(circle at 80% 0%, rgba(59, 130, 246, 0.2), transparent 55%),
              radial-gradient(circle at 50% 80%, rgba(0, 118, 209, 0.15), transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(120deg, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
            maskImage: "radial-gradient(circle at center, black, transparent)",
          }}
        />
      </div>

      {/* Form Container */}
      <div className="container-standard relative z-10">
        <InquiryForm />
      </div>
    </section>
  );
}
