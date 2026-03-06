"use client";

import React from "react";
import Link from "next/link";
import { Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const trustPoints = [
  "No long-term lock-in contracts",
  "Weekly progress demos",
  "Response within 24 hours",
];

export function FinalCTA() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: "#080D14",
      }}
    >
      {/* Background — centered glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,118,209,0.14), transparent)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-standard relative z-10">
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-1000"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0076D1]/20 bg-[#0076D1]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1]">
            <Rocket className="h-3.5 w-3.5" />
            Start Your Project
          </div>

          <h2 className="heading-2 mb-5 leading-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, #C0D8F0 60%, #80BAE8 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Ready to Build Something
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Exceptional?
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            Let's talk about your project. We'll get back to you within 24 hours with a clear plan
            and honest assessment.
          </p>

          {/* Trust points */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-1.5 text-sm text-white/50">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                {point}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact#quote"
              className="btn-primary group relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                color: "#FFFFFF",
                boxShadow: "0 4px 24px rgba(0, 118, 209, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 118, 209, 0.6)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 118, 209, 0.5)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="absolute inset-0 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                }}
              />
              <Rocket className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="relative z-10">Get a Free Quote</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/case-studies"
              className="btn-secondary group"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              }}
            >
              <span>View Our Work</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
