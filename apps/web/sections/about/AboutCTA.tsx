"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function AboutCTA() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(135deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background effects */}
      <div
        className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
      />

      <div className="container-standard relative z-10 max-w-6xl">
        <div
          className="grid gap-4 md:gap-5 lg:grid-cols-2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          {/* Start a Project CTA */}
          <Link
            href="/careers"
            className="group relative rounded-xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.4)";
              e.currentTarget.style.boxShadow = "0 24px 72px rgba(0, 118, 209, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.4)";
            }}
          >
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 md:h-12 md:w-12"
              style={{
                background: "linear-gradient(135deg, #004E8F, #0076D1)",
              }}
            >
              <MessageCircle className="h-5 w-5 text-white md:h-6 md:w-6" />
            </div>

            <h3 className="mb-2 text-lg font-bold text-white md:text-xl">Start Your Project</h3>
            <p className="mb-4 text-sm text-gray-400 md:mb-5 md:text-base">
              Ready to transform your business with cutting-edge technology? Let's discuss your
              vision.
            </p>

            <div
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 md:text-base"
              style={{ color: "#0076D1" }}
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </div>

            {/* Gradient accent */}
            <div
              className="absolute left-0 right-0 top-0 h-1 rounded-t-3xl"
              style={{
                background: "linear-gradient(90deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
              }}
            />
          </Link>

          {/* Join Team CTA */}
          <Link
            href="/contact"
            className="group relative rounded-xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 168, 255, 0.4)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 168, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
            }}
          >
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 md:h-12 md:w-12"
              style={{
                background: "linear-gradient(135deg, #0076D1, #00A8FF)",
              }}
            >
              <Briefcase className="h-5 w-5 text-white md:h-6 md:w-6" />
            </div>

            <h3 className="mb-2 text-lg font-bold text-white md:text-xl">Join Our Team</h3>
            <p className="mb-4 text-sm text-gray-400 md:mb-5 md:text-base">
              Be part of a world-class team building the future of technology. Explore career
              opportunities.
            </p>

            <div
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 md:text-base"
              style={{ color: "#00A8FF" }}
            >
              <span>View Openings</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </div>

            {/* Gradient accent */}
            <div
              className="absolute left-0 right-0 top-0 h-1 rounded-t-3xl"
              style={{
                background: "linear-gradient(90deg, #0076D1 0%, #00A8FF 50%, #7DD3FC 100%)",
              }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
