"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function ContactCTA() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background effects */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
      />

      <div className="container-standard relative z-10 max-w-5xl">
        <div
          className="group relative rounded-2xl border p-6 transition-all duration-500 md:p-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(0, 118, 209, 0.2), 0 4px 16px rgba(0, 0, 0, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
          }}
        >
          {/* Gradient accent */}
          <div
            className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl"
            style={{
              background: "linear-gradient(90deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
            }}
          />

          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            {/* Left Content */}
            <div>
              <h2 className="heading-2 mb-4 text-white md:mb-5">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Ready to Transform Your Business?
                </span>
              </h2>

              <p className="mb-6 text-sm text-white/70 md:mb-8 md:text-base">
                Let's discuss your project goals and create a tailored solution that drives real results.
                We respond within 24 hours.
              </p>

              {/* Benefits */}
              <div className="mb-8 space-y-3 md:space-y-4">
                {[
                  "Expert consultation & strategy",
                  "Transparent pricing & timeline",
                  "Dedicated project team",
                  "24/7 support & maintenance",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full md:h-6 md:w-6"
                      style={{
                        background: "linear-gradient(135deg, #004E8F, #0076D1)",
                      }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-white md:h-4 md:w-4" />
                    </div>
                    <span className="text-sm text-white md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
                <Link
                  href="#quote"
                  className="group/btn inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                    boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 118, 209, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.4)";
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>

                <Link
                  href="/case-studies"
                  className="group/btn inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Stats/Visual */}
            <div className="space-y-4">
              {[
                { value: "24hrs", label: "Average Response Time" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "500+", label: "Projects Delivered" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:scale-105 hover:border-white/20"
                  style={{
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="mb-2 font-poppins text-3xl font-bold md:text-4xl"
                    style={{
                      background: "linear-gradient(135deg, #0076D1, #00A8FF)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-xs text-white/60 md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
