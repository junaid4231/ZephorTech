"use client";

import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function EngagementBanner() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-8 md:py-10"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Subtle Background Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,118,209,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,118,209,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Gradient Orbs */}
      <div
        className="absolute right-0 top-0 h-64 w-64 animate-float rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 h-64 w-64 animate-float-reverse rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00A8FF, transparent)" }}
      />

      <div className="container-standard relative z-10">
        <div
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,118,209,0.1)] md:p-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          {/* Shimmer Effect */}
          <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:translate-x-full group-hover:opacity-100"
            style={{
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#00A8FF] backdrop-blur-sm">
                <Workflow className="h-3.5 w-3.5" />
                Engagement Model
              </div>
              <h3 className="mb-2 font-poppins text-2xl font-bold text-white md:text-3xl">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Built for clarity from day zero
                </span>
              </h3>
              <p className="text-sm text-white/70 md:text-base">
                Every engagement follows a proven loop that keeps stakeholders in sync.
              </p>
            </div>

            <Link
              href="/about#process"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-[#0076D1]/20"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(10px)",
                transition: "all 0.5s ease 0.2s",
              }}
            >
              View full process
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

