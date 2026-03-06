"use client";

import React from "react";
import { Code, Heart, Lightbulb, Target } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function AboutMission() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{ background: "#0A0A0A" }}
    >
      <div className="container-standard relative z-10">
        <div className="grid items-center gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
            }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00A8FF] md:text-sm">
              Our Mission
            </p>

            <h2 className="heading-2 mb-4 text-white md:mb-6">
              Built Around Delivery,
              <span className="mt-2 block text-[#00A8FF]">Not Presentations</span>
            </h2>

            <p className="mb-5 text-sm text-white/70 md:mb-6 md:text-base">
              Most agencies sell a process and hand off a codebase. We work directly with founders
              and engineering leads, stay accountable to agreed metrics, and don't consider an
              engagement closed until the team running it is genuinely confident owning what we
              built.
            </p>

            <div className="space-y-4 md:space-y-5">
              {[
                {
                  icon: Code,
                  title: "Senior engineers on every project",
                  description:
                    "Every engagement is run by engineers who have shipped production systems at scale. You work directly with the people building your product — not a project manager relaying messages.",
                },
                {
                  icon: Heart,
                  title: "Honest scope, real timelines",
                  description:
                    "We tell clients when something won't work before we build it. Delivery metrics and acceptance criteria are agreed in writing before the first sprint starts.",
                },
                {
                  icon: Target,
                  title: "Handoffs that don't create dependencies",
                  description:
                    "At the end of every engagement we hand over documentation, runbooks, and architecture decisions alongside the code. Your internal team should be able to own and extend everything we build.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 md:gap-4"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 md:h-14 md:w-14"
                    style={{
                      background: "linear-gradient(135deg, #004E8F, #0076D1)",
                      boxShadow: "0 4px 16px rgba(0, 118, 209, 0.3)",
                    }}
                  >
                    <item.icon className="h-6 w-6 text-white md:h-7 md:w-7" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white md:text-xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60 md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Enhanced with visible content */}
          <div
            className="relative transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "200ms",
            }}
          >
            <div
              className="relative aspect-square overflow-hidden rounded-3xl border"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 118, 209, 0.15) 0%, rgba(0, 168, 255, 0.08) 100%)",
                borderColor: "rgba(0, 168, 255, 0.2)",
                boxShadow: "0 20px 60px rgba(0, 118, 209, 0.3)",
              }}
            >
              {/* Central icon/badge */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-3xl border backdrop-blur-xl md:h-24 md:w-24"
                  style={{
                    background: "rgba(0, 118, 209, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 118, 209, 0.4)",
                  }}
                >
                  <Target className="h-10 w-10 text-white md:h-12 md:w-12" />
                </div>
              </div>

              {/* Orbiting elements */}
              <div className="absolute inset-0" style={{ padding: "var(--card-padding)" }}>
                {/* Code icon */}
                <div
                  className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: "orbit 8s linear infinite",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl md:h-14 md:w-14"
                    style={{
                      background: "rgba(0, 118, 209, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Code className="h-6 w-6 text-[#0076D1] md:h-7 md:w-7" />
                  </div>
                </div>

                {/* Heart icon */}
                <div
                  className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
                  style={{
                    animation: "orbit 10s linear infinite reverse",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl md:h-14 md:w-14"
                    style={{
                      background: "rgba(0, 168, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Heart className="h-6 w-6 text-[#00A8FF] md:h-7 md:w-7" />
                  </div>
                </div>

                {/* Lightbulb icon */}
                <div
                  className="absolute right-1/4 top-1/3 translate-x-1/2"
                  style={{
                    animation: "orbit 12s linear infinite",
                    animationDelay: "2s",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl md:h-14 md:w-14"
                    style={{
                      background: "rgba(125, 211, 252, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Lightbulb className="h-6 w-6 text-[#7DD3FC] md:h-7 md:w-7" />
                  </div>
                </div>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 h-full w-full opacity-20">
                <line
                  x1="50%"
                  y1="50%"
                  x2="25%"
                  y2="25%"
                  stroke="#0076D1"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="50%"
                  y1="50%"
                  x2="75%"
                  y2="75%"
                  stroke="#00A8FF"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="50%"
                  y1="50%"
                  x2="75%"
                  y2="33%"
                  stroke="#7DD3FC"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </line>
              </svg>

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Radial glow effects */}
              <div
                className="absolute left-1/4 top-1/4 h-40 w-40 animate-pulse rounded-full opacity-30 blur-3xl"
                style={{
                  background: "radial-gradient(circle, #0076D1 0%, transparent 70%)",
                  animation: "float 6s ease-in-out infinite",
                }}
              />
              <div
                className="absolute bottom-1/3 right-1/3 h-48 w-48 animate-pulse rounded-full opacity-20 blur-3xl"
                style={{
                  background: "radial-gradient(circle, #00A8FF 0%, transparent 70%)",
                  animation: "float 8s ease-in-out infinite reverse",
                }}
              />
            </div>

            {/* Floating accent elements removed */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
