"use client";

import { Mail, Zap, CheckCircle2, Shield } from "lucide-react";
import { NewsletterForm } from "@/components";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function NewsletterSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "#0A0A0A",
      }}
    >
      {/* Subtle radial bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,118,209,0.08), transparent)",
        }}
      />

      <div className="container-standard relative z-10">
        <div
          className="mx-auto max-w-3xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#00A8FF] backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5" />
              Newsletter
            </div>
            <h2 className="font-poppins mb-3 text-3xl font-bold text-white md:text-4xl">
              Stay ahead with monthly insights
            </h2>
            <p className="mx-auto max-w-xl text-sm text-white/70 md:text-base">
              One curated email per month with actionable frameworks, launch notes, and engineering
              insights.
            </p>
          </div>

          {/* Main Card */}
          <div
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,118,209,0.15)] md:p-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.2s",
            }}
          >
            {/* Animated Gradient Border */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={
                {
                  background:
                    "linear-gradient(135deg, rgba(0,118,209,0.3), rgba(0,168,255,0.2), rgba(0,118,209,0.3))",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 3s ease infinite",
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                } as React.CSSProperties
              }
            />

            <div className="relative z-10">
              {/* Form Section */}
              <div className="mb-6">
                <NewsletterForm />
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
                <span className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                  No spam
                </span>
                <span className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                  Unsubscribe anytime
                </span>
                <span className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white">
                  <Shield className="h-3.5 w-3.5 text-[#00A8FF]" />
                  Privacy-first
                </span>
                <span className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white">
                  <Mail className="h-3.5 w-3.5 text-[#00A8FF]" />1 email/month
                </span>
              </div>
            </div>

            {/* Shimmer Effect */}
            <div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:translate-x-full group-hover:opacity-100"
              style={{
                animation: "shimmer 3s ease-in-out infinite",
              }}
            />
          </div>

          {/* Subtle CTA */}
          <div
            className="mt-6 text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.5s ease 0.4s",
            }}
          >
            <p className="text-xs text-white/50">
              Join 2,500+ founders, CTOs, and product leads getting actionable insights
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
