"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function ContactCTA() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      id="book-call"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background effects */}
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
      />

      <div className="container-standard relative z-10 max-w-5xl">
        <div
          className="group relative rounded-xl border p-5 transition-all duration-500 md:p-6"
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
            className="absolute left-0 right-0 top-0 h-1 rounded-t-xl"
            style={{
              background: "linear-gradient(90deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
            }}
          />

          <div className="grid items-center gap-6 lg:grid-cols-[1.2fr,0.8fr] md:gap-8">
            {/* Left Content */}
            <div>
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:mb-5"
                style={{
                  background: "rgba(0, 118, 209, 0.1)",
                  border: "1px solid rgba(0, 118, 209, 0.3)",
                }}
              >
                <Calendar className="h-3.5 w-3.5 text-[#0076D1] md:h-4 md:w-4" />
                <span className="text-xs font-semibold text-[#0076D1] md:text-sm">
                  Free 30-Min Consultation
                </span>
              </div>

              <h2 className="heading-2 mb-4 text-white md:mb-5">Ready to Transform Your Business?</h2>

              <p className="mb-5 text-sm text-gray-400 md:mb-6 md:text-base">
                Book a free strategy session with our team. We'll discuss your goals, challenges,
                and outline a clear path to success.
              </p>

              {/* Benefits */}
              <div className="mb-6 space-y-3 md:mb-8 md:space-y-4">
                  {[
                    "No-obligation consultation",
                    "Tailored technology roadmap",
                    "Transparent pricing & timeline",
                    "Meet your dedicated team",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2.5 md:gap-3">
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
                    href="https://calendly.com/zephortech/strategy-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group/btn text-white hover:scale-105"
                    style={{
                      background: "linear-gradient(90deg, #004E8F 0%, #0076D1 100%)",
                      boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 118, 209, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.4)";
                    }}
                  >
                    <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                    <span>Book a Strategy Call</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 md:h-5 md:w-5" />
                  </Link>

                  <Link
                    href="/case-studies"
                    className="btn-secondary group/btn text-white hover:bg-white/5"
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <span>View Our Work</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 md:h-5 md:w-5" />
                  </Link>
                </div>
              </div>

              {/* Right Stats/Visual */}
              <div className="space-y-3 md:space-y-4">
                {[
                  { value: "24hrs", label: "Average Response Time" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "500+", label: "Projects Delivered" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-xl border p-4 transition-all duration-300 hover:scale-105 md:p-5"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="heading-2 mb-2 text-white">{stat.value}</div>
                    <p className="text-xs text-gray-400 md:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
