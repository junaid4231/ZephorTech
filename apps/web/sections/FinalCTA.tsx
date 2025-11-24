"use client";

import React from "react";
import Link from "next/link";
import { Rocket, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function FinalCTA() {
  const { ref: sectionRef } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #0076D1 2px, transparent 2px)",
          backgroundSize: "30px 30px",
          opacity: 0.1,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
      />

      <div className="container-standard relative z-10">
        <div className="text-center">
          <h2 className="heading-2 mb-4 leading-tight md:mb-6">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Ready to Transform
            </span>
            <br />
            <span className="text-white">Your Business?</span>
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-400 md:mb-10 md:text-lg">
            Let's build something extraordinary together. Get in touch and discover how we can
            accelerate your digital transformation.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mb-12">
            <Link
              href="/contact#quote"
              className="btn-primary group relative overflow-hidden hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                color: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(0, 118, 209, 0.5), 0 4px 12px rgba(0, 118, 209, 0.3)";
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.4)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <div
                className="absolute inset-0 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
                }}
              />
              <Rocket className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-12 md:h-6 md:w-6" />
              <span className="relative z-10">Get Started Today</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6" />
            </Link>

            <Link
              href="/portfolio"
              className="btn-secondary group hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(0, 118, 209, 0.15), 0 4px 12px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>View Our Work</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
