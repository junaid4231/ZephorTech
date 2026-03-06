"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Target, BarChart2 } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface CaseStudyTeasersProps {
  caseStudies?: CaseStudy[];
}

const industryColors: Record<string, string> = {
  FinTech: "#10B981",
  Fintech: "#10B981",
  "Financial Technology": "#10B981",
  Healthcare: "#06B6D4",
  "E-commerce": "#F59E0B",
  "E-Commerce": "#F59E0B",
  Ecommerce: "#F59E0B",
  SaaS: "#8B5CF6",
  "Analytics / SaaS": "#8B5CF6",
  Logistics: "#EF4444",
  "Real Estate": "#F97316",
  AI: "#0076D1",
  default: "#0076D1",
};

export function CaseStudyTeasers({ caseStudies }: CaseStudyTeasersProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  const teasers = caseStudies.slice(0, 2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "#0A0A0A" }}
    >
      <div className="container-standard relative z-10">
        {/* Section Header — matches BlogHighlights layout */}
        <div
          className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2">
              <Target className="h-4 w-4 text-[#0076D1]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1]">
                Latest Wins
              </p>
            </div>
            <h2 className="heading-2 mb-2 text-white">Proof Points from the Field</h2>
            <p className="max-w-xl text-sm text-white/60 md:text-base">
              Real results from real projects across AI platforms, commerce, and SaaS.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="group hidden shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/20 hover:text-white md:inline-flex"
          >
            View all case studies
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {teasers.map((study, index) => {
            const metric = study.metrics[0];
            const accentColor = industryColors[study.industry] ?? industryColors.default;

            return (
              <article
                key={study.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.5s ease ${index * 100}ms`,
                }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full shrink-0" style={{ background: accentColor }} />

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  {/* Badge + metric meta row */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        background: `${accentColor}18`,
                        color: accentColor,
                      }}
                    >
                      {study.industry}
                    </span>
                    {metric && (
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <BarChart2 className="h-3 w-3" />
                        {metric.value} {metric.label}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins mb-3 text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-white/90 md:text-lg">
                    {study.title}
                  </h3>

                  {/* Summary */}
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-white/50">
                    {study.summary}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 hover:gap-2.5"
                    style={{ color: accentColor }}
                  >
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile "View all" button */}
        <div
          className="mt-8 text-center md:hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "all 0.5s ease 300ms",
          }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20"
          >
            View all case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
