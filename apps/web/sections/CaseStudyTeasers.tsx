"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface CaseStudyTeasersProps {
  caseStudies?: CaseStudy[];
}

export function CaseStudyTeasers({ caseStudies }: CaseStudyTeasersProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  });

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  // Show only 2 case studies for a cleaner look
  const teasers = caseStudies.slice(0, 2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
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

      <div className="container-standard relative z-10">
        <div
          className="mb-10 text-center transition-all duration-1000 ease-out md:mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2">
            <Target className="h-4 w-4 text-[#0076D1] md:h-5 md:w-5" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Latest Wins
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
              Proof Points from the Field
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
            Real results from real projects across AI platforms, commerce, and SaaS modernisation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {teasers.map((study, index) => {
            const metric = study.metrics[0];

            return (
              <article
                key={study.slug}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] md:p-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${index * 100}ms`,
                }}
              >
                {/* Left border accent */}
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{
                    background: "linear-gradient(180deg, #0076D1 0%, #00A8FF 100%)",
                  }}
                />

                <div className="pl-4">
                  {/* Industry */}
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                    {study.industry}
                  </p>

                  {/* Title */}
                  <h3 className="mb-3 font-poppins text-xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#00A8FF] md:text-2xl">
                    {study.title}
                  </h3>

                  {/* Summary */}
                  <p className="mb-6 text-sm leading-relaxed text-white/70 md:text-base">
                    {study.summary}
                  </p>

                  {/* Metric */}
                  {metric && (
                    <div className="mb-6 flex items-baseline gap-3 border-t border-white/10 pt-6">
                      <p
                        className="font-poppins text-3xl font-bold md:text-4xl"
                        style={{
                          background: "linear-gradient(135deg, #0076D1, #00A8FF)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {metric.value}
                      </p>
                      <p className="text-sm text-white/60 md:text-base">{metric.label}</p>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 hover:gap-3"
                    style={{ color: "#0076D1" }}
                  >
                    <span>Read case study</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className="mt-10 text-center transition-all duration-1000 ease-out md:mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "300ms",
          }}
        >
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
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
            <span>Browse all success stories</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

