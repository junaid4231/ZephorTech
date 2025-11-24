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
  Sparkles,
  BarChart3,
  Zap,
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
      {/* Enhanced Background Effects */}
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
      {/* Floating gradient orbs */}
      <div
        className="absolute right-0 top-20 h-96 w-96 animate-pulse rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-20 left-0 h-96 w-96 animate-pulse rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #00A8FF 0%, transparent 70%)",
          animationDelay: "1s",
        }}
      />

      <div className="container-standard relative z-10">
        {/* Enhanced Section Header */}
        <div
          className="mb-8 text-center transition-all duration-1000 ease-out md:mb-10"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 animate-pulse text-[#0076D1]" />
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

        {/* Enhanced Featured Card */}
        <div
          className="group relative transition-all duration-1000 ease-out"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "200ms",
          }}
        >
          {/* Main Card with Enhanced Glassmorphism */}
          <div
            className="relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 group-hover:scale-[1.01] md:p-8 lg:p-10"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.15)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 118, 209, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 16px 64px rgba(0, 118, 209, 0.25), 0 0 0 1px rgba(0, 118, 209, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.4)";
              e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 118, 209, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Subtle background pattern */}
            <div
              className="absolute inset-0 rounded-2xl opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, #0076D1 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Gradient accent border */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 118, 209, 0.2) 0%, rgba(0, 168, 255, 0.1) 100%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "1px",
              }}
            />

            <div className="relative z-10 grid items-start gap-8 md:gap-10 lg:grid-cols-[55%_45%]">
              {/* Left Content - Enhanced */}
              <div className="space-y-6">
                {/* Industry Badge & Title Section */}
                <div>
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-sm"
                    style={{
                      background: "rgba(0, 118, 209, 0.15)",
                      borderColor: "rgba(0, 118, 209, 0.35)",
                    }}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "#0076D1" }}
                    >
                      {caseStudy.industry}
                    </span>
                  </div>

                  <h3 className="heading-3 mb-4 text-white">{caseStudy.title}</h3>

                  <p className="mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
                    {caseStudy.summary}
                  </p>
                </div>

                {/* Project Info - Enhanced */}
                <div className="flex flex-wrap gap-4">
                  <div className="group/info flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all duration-300 hover:border-[#0076D1]/30 hover:bg-white/10">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 group-hover/info:scale-110"
                      style={{
                        background: "rgba(0, 118, 209, 0.15)",
                      }}
                    >
                      <Clock className="h-4 w-4 text-[#0076D1]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        Timeline
                      </div>
                      <span className="text-sm font-semibold text-white">{caseStudy.timeline}</span>
                    </div>
                  </div>
                  <div className="group/info flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all duration-300 hover:border-[#0076D1]/30 hover:bg-white/10">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 group-hover/info:scale-110"
                      style={{
                        background: "rgba(0, 118, 209, 0.15)",
                      }}
                    >
                      <MapPin className="h-4 w-4 text-[#0076D1]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        Location
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {caseStudy.headquarters}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {displayStats.map((stat, idx) => {
                    const icons = [TrendingUp, Target, Users, Award];
                    const colors = ["#0076D1", "#00A8FF", "#4F46E5", "#10B981"];
                    const StatIcon = icons[idx % icons.length];
                    const statColor = colors[idx % colors.length];

                    return (
                      <div
                        key={stat.label}
                        className="group/stat relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:scale-105"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(10px)",
                          borderColor: "rgba(255, 255, 255, 0.15)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = statColor + "50";
                          e.currentTarget.style.background = statColor + "10";
                          e.currentTarget.style.boxShadow = `0 8px 24px ${statColor}20`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover/stat:scale-110 group-hover/stat:rotate-6"
                            style={{
                              background: `${statColor}20`,
                            }}
                          >
                            <StatIcon className="h-4 w-4" style={{ color: statColor }} />
                          </div>
                        </div>
                        <div
                          className="numeric-value font-poppins mb-1.5 text-2xl font-black text-white md:text-3xl"
                          style={{
                            color: "#FFFFFF",
                            textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
                          }}
                        >
                          {stat.value}
                          {stat.suffix || ""}
                        </div>
                        <p className="text-xs font-semibold text-gray-400">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Enhanced Tech Stack */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(0, 118, 209, 0.15)",
                      }}
                    >
                      <Target className="h-4 w-4 text-[#0076D1]" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {caseStudy.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="group/tech rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-300 hover:scale-105 hover:border-[#0076D1]/40"
                        style={{
                          background: "rgba(255, 255, 255, 0.08)",
                          borderColor: "rgba(255, 255, 255, 0.2)",
                          color: "#FFFFFF",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(0, 118, 209, 0.15)";
                          e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced CTA */}
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                    boxShadow: "0 4px 20px rgba(0, 118, 209, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 118, 209, 0.6)";
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 118, 209, 0.4)";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  <span className="relative z-10">View Full Case Study</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </Link>
              </div>

              {/* Right Section - Redesigned Cards */}
              <div className="relative space-y-5">
                {/* Highlights Card - Enhanced */}
                {displayHighlights.length > 0 && (
                  <div
                    className="group/card relative overflow-hidden rounded-xl border p-6 transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.4)";
                      e.currentTarget.style.background = "rgba(0, 118, 209, 0.08)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 118, 209, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover/card:scale-110"
                        style={{
                          background: "rgba(0, 118, 209, 0.2)",
                        }}
                      >
                        <Zap className="h-5 w-5 text-[#0076D1]" />
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Key Highlights
                      </h4>
                    </div>
                    <ul className="space-y-3.5">
                      {displayHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            <CheckCircle2
                              className="h-4 w-4 text-[#0076D1]"
                              style={{
                                filter: "drop-shadow(0 2px 4px rgba(0, 118, 209, 0.4))",
                              }}
                            />
                          </div>
                          <span className="text-sm leading-relaxed text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metrics Card - Enhanced */}
                {displayMetrics.length > 0 && (
                  <div
                    className="group/card relative overflow-hidden rounded-xl border p-6 transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 168, 255, 0.4)";
                      e.currentTarget.style.background = "rgba(0, 168, 255, 0.08)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 168, 255, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover/card:scale-110"
                        style={{
                          background: "rgba(0, 168, 255, 0.2)",
                        }}
                      >
                        <BarChart3 className="h-5 w-5 text-[#00A8FF]" />
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Impact Metrics
                      </h4>
                    </div>
                    <div className="space-y-5">
                      {displayMetrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
                        >
                          <div
                            className="numeric-value font-poppins mb-2 text-2xl font-black text-white md:text-3xl"
                            style={{
                              color: "#FFFFFF",
                              textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
                            }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-xs font-bold text-gray-400">{metric.label}</div>
                          {metric.detail && (
                            <div className="mt-1.5 text-xs text-gray-500">{metric.detail}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial Preview - Enhanced */}
                {caseStudy.testimonial && (
                  <div
                    className="group/card relative overflow-hidden rounded-xl border p-6 transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0, 118, 209, 0.15) 0%, rgba(0, 168, 255, 0.1) 100%)",
                      backdropFilter: "blur(10px)",
                      borderColor: "rgba(0, 118, 209, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.5)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 118, 209, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover/card:scale-110"
                        style={{
                          background: "rgba(0, 118, 209, 0.25)",
                        }}
                      >
                        <Users className="h-5 w-5 text-[#0076D1]" />
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Client Feedback
                      </h4>
                    </div>
                    <p className="mb-5 text-sm italic leading-relaxed text-gray-200 md:text-base">
                      "{caseStudy.testimonial.quote.slice(0, 120)}..."
                    </p>
                    <div className="border-t border-white/10 pt-4">
                      <div className="mb-1 font-bold text-white">{caseStudy.testimonial.author}</div>
                      <div className="text-xs text-gray-400">
                        {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                      </div>
                    </div>
                  </div>
                )}

                {/* Decorative gradient orbs */}
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 animate-pulse rounded-full opacity-20 blur-2xl"
                  style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
                />
                <div
                  className="absolute -bottom-6 -left-6 h-28 w-28 animate-pulse rounded-full opacity-20 blur-2xl"
                  style={{
                    background: "radial-gradient(circle, #00A8FF, transparent)",
                    animationDelay: "1s",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced View All Link */}
        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-lg border border-[#0076D1]/30 bg-[#0076D1]/10 px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-[#0076D1]/50 hover:bg-[#0076D1]/20 hover:gap-3"
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
