"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function CareersCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A111C 0%, #05070B 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #0076D1 1px, transparent 1px),
            linear-gradient(-45deg, #0076D1 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.95)",
            transition: "all 0.8s ease",
          }}
        >
          {/* Main Content */}
          <h2 className="heading-2 mb-4 font-bold text-white md:mb-5">
            Ready to Build the Future?
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-white/70 md:mb-5 md:text-lg">
            Join a team that's pushing the boundaries of what's possible in technology. 
            Submit your profile and we'll reach out when opportunities arise.
          </p>
          <p className="mx-auto mb-8 max-w-xl text-sm text-white/50 md:mb-10 md:text-base">
            Even without active job postings, we're always building relationships with exceptional talent.
          </p>

          {/* CTA Buttons */}
          <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row md:mb-10 md:gap-4">
            <Link
              href="/careers/apply"
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 md:gap-3 md:px-8 md:py-4"
              style={{
                background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
              }}
            >
              <span>Submit Your Profile</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
            </Link>

            <Link
              href="/contact?subject=General%20Inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 md:gap-3 md:px-8 md:py-4"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Mail className="h-4 w-4 md:h-5 md:w-5" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="flex flex-col items-center justify-center gap-4 text-xs text-white/60 md:flex-row md:gap-6 md:text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span>Actively hiring talented professionals</span>
            </div>
            <div className="hidden h-4 w-px bg-white/20 md:block"></div>
            <div>
              <span>Average response time: 48 hours</span>
            </div>
            <div className="hidden h-4 w-px bg-white/20 md:block"></div>
            <div>
              <span>Remote-first across 15+ countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

