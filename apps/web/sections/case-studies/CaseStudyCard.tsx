"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import type { CaseStudy } from "@/lib/case-studies";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  variant?: "standard" | "compact";
}

export function CaseStudyCard({ study, index, variant = "standard" }: CaseStudyCardProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px",
  });

  if (variant === "compact") {
    return (
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(40px)",
          transitionDelay: `${index * 100}ms`,
          transition: "all 0.8s ease",
        }}
      >
        <Link
          href={`/case-studies/${study.slug}`}
          className="group relative flex flex-col rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 16px 48px rgba(0, 118, 209, 0.15), 0 8px 24px rgba(0, 0, 0, 0.4)`;
            e.currentTarget.style.borderColor = `rgba(0, 118, 209, 0.25)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          }}
        >
          {/* Gradient accent bar */}
          <div
            className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 rounded-t-3xl transition-transform duration-500 group-hover:scale-x-100"
            style={{
              background: "linear-gradient(90deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
            }}
          />

          <div className="p-4 md:p-5">
            {/* Industry badge */}
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs uppercase tracking-[0.2em] md:mb-4"
              style={{
                background: "rgba(0, 118, 209, 0.1)",
                color: "#0076D1",
                border: "1px solid rgba(0, 118, 209, 0.2)",
              }}
            >
              {study.industry}
            </div>

            {/* Title */}
            <h3 className="font-poppins mb-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#00A8FF] md:text-xl">
              {study.title}
            </h3>

            {/* Meta */}
            <p className="mb-3 text-xs text-white/50 md:mb-4">
              {study.client} · {study.timeline}
            </p>

            {/* Summary */}
            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400 md:mb-5">
              {study.summary}
            </p>

            {/* Services */}
            <div className="mb-4 flex flex-wrap gap-2 md:mb-5">
              {study.services.slice(0, 2).map((service) => (
                <span
                  key={service}
                  className="rounded-full border px-3 py-1 text-xs font-medium text-white/70"
                  style={{
                    borderColor: "rgba(0, 118, 209, 0.2)",
                    background: "rgba(0, 118, 209, 0.05)",
                  }}
                >
                  {service}
                </span>
              ))}
              {study.services.length > 2 && (
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                  +{study.services.length - 2}
                </span>
              )}
            </div>

            {/* Metrics preview */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#0076D1]" />
                <span className="text-sm font-semibold text-white/80">
                  {study.metrics[0]?.value || "Results"}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0076D1] transition-all duration-300 group-hover:gap-3">
                <span>View details</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Standard variant
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 100}ms`,
        transition: "all 0.8s ease",
      }}
    >
      <Link
        href={`/case-studies/${study.slug}`}
        className="group relative flex flex-col rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 16px 48px rgba(0, 118, 209, 0.15), 0 8px 24px rgba(0, 0, 0, 0.4)`;
          e.currentTarget.style.borderColor = `rgba(0, 118, 209, 0.25)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }}
      >
        {/* Gradient accent bar */}
        <div
          className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 rounded-t-3xl transition-transform duration-500 group-hover:scale-x-100"
          style={{
            background: "linear-gradient(90deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
          }}
        />

        <div className="flex flex-1 flex-col p-4 md:p-5">
          {/* Industry badge */}
          <div
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-xs uppercase tracking-[0.2em] md:mb-4"
            style={{
              background: "rgba(0, 118, 209, 0.1)",
              color: "#0076D1",
              border: "1px solid rgba(0, 118, 209, 0.2)",
            }}
          >
            {study.industry}
          </div>

          {/* Title */}
          <h3 className="font-poppins mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#00A8FF] md:mb-3 md:text-2xl">
            {study.title}
          </h3>

          {/* Meta */}
          <p className="mb-3 text-xs text-white/50 md:mb-4 md:text-sm">
            {study.client} · {study.timeline}
          </p>

          {/* Summary */}
          <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-400 md:mb-6 md:text-base">{study.summary}</p>

          {/* Services */}
          <div className="mb-5 flex flex-wrap gap-2 md:mb-6">
            {study.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="rounded-full border px-2.5 py-1 text-xs font-medium text-white/70"
                style={{
                  borderColor: "rgba(0, 118, 209, 0.2)",
                  background: "rgba(0, 118, 209, 0.05)",
                }}
              >
                {service}
              </span>
            ))}
            {study.services.length > 3 && (
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/50">
                +{study.services.length - 3}
              </span>
            )}
          </div>

          {/* Metrics */}
          <div className="mb-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 md:mb-6 md:gap-4 md:pt-5">
            {study.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label}>
                <p className="heading-3 mb-1 text-white">{metric.value}</p>
                <p className="text-xs uppercase tracking-wide text-white/50">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0076D1] transition-all duration-300 group-hover:gap-3 md:text-sm">
            <span>View full case study</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </div>
  );
}
