"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Award,
  Target,
} from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import type { CaseStudy } from "@/lib/case-studies";

interface FeaturedCaseStudyProps {
  caseStudy?: CaseStudy;
}

export function FeaturedCaseStudy({ caseStudy }: FeaturedCaseStudyProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Fallback if no case study is provided
  if (!caseStudy) {
    return null;
  }

  // Get first 4 stats from hero
  const displayStats = caseStudy.hero.stats.slice(0, 4);
  const displayHighlights = caseStudy.highlights.slice(0, 3);
  const displayMetrics = caseStudy.metrics.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
      ref={sectionRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0076D1 1px, transparent 1px),
              linear-gradient(to bottom, #0076D1 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
      />

      <div className="container-standard relative z-10">
        {/* Section Header */}
        <div
          className="mb-8 text-center transition-all duration-1000 ease-out md:mb-10"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1]">
              Featured Project
            </p>
          </div>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "gradient-shift 3s ease infinite",
              }}
            >
              Success Stories
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-base">
            Real results from real clients. See how we transform businesses through innovative
            technology solutions.
          </p>
        </div>

        {/* Featured Card */}
        <div
          className="group relative transition-all duration-1000 ease-out"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "200ms",
          }}
        >
          {/* Main Card */}
          <div
            className="rounded-2xl border p-5 transition-all duration-500 group-hover:scale-[1.01] md:p-6 lg:p-8"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.12)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 118, 209, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 12px 48px rgba(0, 118, 209, 0.2), 0 0 0 1px rgba(0, 118, 209, 0.2)";
              e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 118, 209, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 rounded-2xl opacity-5"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, #0076D1 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative z-10 grid items-start gap-6 md:gap-8 lg:grid-cols-[52%_48%]">
              {/* Left Content */}
              <div className="space-y-5">
                {/* Industry Badge & Title */}
                <div>
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
                    style={{
                      background: "rgba(0, 118, 209, 0.12)",
                      borderColor: "rgba(0, 118, 209, 0.3)",
                    }}
                  >
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#0076D1" }}
                    >
                      {caseStudy.industry}
                    </span>
                  </div>

                  <h3 className="heading-3 mb-4 text-white">{caseStudy.title}</h3>

                  <p className="mb-5 text-sm leading-relaxed text-gray-300 md:text-base">
                    {caseStudy.summary}
                  </p>
                </div>

                {/* Project Info */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 md:text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(0, 118, 209, 0.1)",
                      }}
                    >
                      <Clock className="h-4 w-4 text-[#0076D1]" />
                    </div>
                    <span className="font-medium">{caseStudy.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(0, 118, 209, 0.1)",
                      }}
                    >
                      <MapPin className="h-4 w-4 text-[#0076D1]" />
                    </div>
                    <span className="font-medium">{caseStudy.headquarters}</span>
                  </div>
                </div>

                {/* Stats Grid - Enhanced */}
                <div className="grid grid-cols-2 gap-3">
                  {displayStats.map((stat, idx) => {
                    const icons = [TrendingUp, Target, Users, Award];
                    const colors = ["#0076D1", "#00A8FF", "#A855F7", "#10B981"];
                    const StatIcon = icons[idx % icons.length];

                    return (
                      <div
                        key={stat.label}
                        className="group/stat rounded-xl border p-4 transition-all duration-300 hover:scale-105"
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          backdropFilter: "blur(10px)",
                          borderColor: "rgba(255, 255, 255, 0.12)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = colors[idx % colors.length] + "40";
                          e.currentTarget.style.background = colors[idx % colors.length] + "08";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                        }}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <StatIcon
                            className="h-4 w-4 transition-transform duration-300 group-hover/stat:scale-110"
                            style={{ color: colors[idx % colors.length] }}
                          />
                        </div>
                        <div
                          className="numeric-value font-poppins mb-1 text-xl font-black text-white md:text-2xl"
                          style={{
                            color: "#FFFFFF",
                            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          {stat.value}
                          {stat.suffix || ""}
                        </div>
                        <p className="text-xs font-medium text-gray-400">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Tech Stack - Enhanced */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#0076D1]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105"
                        style={{
                          background: "rgba(255, 255, 255, 0.06)",
                          borderColor: "rgba(255, 255, 255, 0.15)",
                          color: "#FFFFFF",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                    boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 118, 209, 0.6)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.4)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>View Full Case Study</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Right Section - Functional Content */}
              <div className="relative space-y-4">
                {/* Highlights Card */}
                {displayHighlights.length > 0 && (
                  <div
                    className="rounded-xl border p-5 transition-all duration-300 hover:border-[#FF6B35]/30"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      backdropFilter: "blur(10px)",
                      borderColor: "rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{
                          background: "rgba(255, 107, 53, 0.15)",
                        }}
                      >
                        <Target className="h-4 w-4 text-[#FF6B35]" />
                      </div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                        Key Highlights
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {displayHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0076D1]"
                            style={{ filter: "drop-shadow(0 2px 4px rgba(0, 118, 209, 0.3))" }}
                          />
                          <span className="text-sm leading-relaxed text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metrics Card */}
                {displayMetrics.length > 0 && (
                  <div
                    className="rounded-xl border p-5 transition-all duration-300 hover:border-[#00A8FF]/30"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      backdropFilter: "blur(10px)",
                      borderColor: "rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{
                          background: "rgba(0, 168, 255, 0.15)",
                        }}
                      >
                        <TrendingUp className="h-4 w-4 text-[#00A8FF]" />
                      </div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                        Impact Metrics
                      </h4>
                    </div>
                    <div className="space-y-4">
                      {displayMetrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                        >
                          <div
                            className="numeric-value font-poppins mb-1.5 text-xl font-bold text-white md:text-2xl"
                            style={{
                              color: "#FFFFFF",
                              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-xs font-semibold text-gray-400">{metric.label}</div>
                          {metric.detail && (
                            <div className="mt-1 text-xs text-gray-500">{metric.detail}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial Preview */}
                {caseStudy.testimonial && (
                  <div
                    className="rounded-xl border p-5"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0, 118, 209, 0.12) 0%, rgba(0, 168, 255, 0.08) 100%)",
                      backdropFilter: "blur(10px)",
                      borderColor: "rgba(0, 118, 209, 0.25)",
                    }}
                  >
                    <div className="mb-3 flex items-center gap-2.5">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{
                          background: "rgba(0, 118, 209, 0.2)",
                        }}
                      >
                        <Users className="h-4 w-4 text-[#0076D1]" />
                      </div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                        Client Feedback
                      </h4>
                    </div>
                    <p className="mb-4 text-sm italic leading-relaxed text-gray-200 md:text-base">
                      "{caseStudy.testimonial.quote.slice(0, 120)}..."
                    </p>
                    <div className="border-t border-white/10 pt-3 text-xs">
                      <div className="mb-1 font-semibold text-white">
                        {caseStudy.testimonial.author}
                      </div>
                      <div className="text-gray-400">
                        {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                      </div>
                    </div>
                  </div>
                )}

                {/* Decorative gradient orbs */}
                <div
                  className="absolute -right-4 -top-4 h-20 w-20 animate-pulse rounded-full opacity-25 blur-2xl"
                  style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
                />
                <div
                  className="absolute -bottom-4 -left-4 h-24 w-24 animate-pulse rounded-full opacity-25 blur-2xl"
                  style={{
                    background: "radial-gradient(circle, #00A8FF, transparent)",
                    animationDelay: "1s",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className="mt-8 text-center">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
            style={{ color: "#0076D1" }}
          >
            <span>View All Case Studies</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
