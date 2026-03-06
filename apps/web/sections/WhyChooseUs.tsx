"use client";

import React from "react";
import { Shield, Users, Award, Headphones, Zap, LifeBuoy } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

const features: Feature[] = [
  {
    icon: Award,
    title: "Senior-Led Execution",
    description:
      "Every project is led by senior engineers — no offshore juniors managing your product",
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.08)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    glowColor: "rgba(245, 158, 11, 0.12)",
  },
  {
    icon: Zap,
    title: "Fast, Iterative Delivery",
    description: "Agile sprints with weekly demos so you always see real progress",
    color: "#10B981",
    bgColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.2)",
    glowColor: "rgba(16, 185, 129, 0.12)",
  },
  {
    icon: Shield,
    title: "Production-First Security",
    description: "Security best practices baked in from day one — not bolted on at the end",
    color: "#EF4444",
    bgColor: "rgba(239, 68, 68, 0.08)",
    borderColor: "rgba(239, 68, 68, 0.2)",
    glowColor: "rgba(239, 68, 68, 0.12)",
  },
  {
    icon: Users,
    title: "Specialised Team",
    description: "Deep expertise in web, mobile, AI agents, and cloud infrastructure",
    color: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.08)",
    borderColor: "rgba(139, 92, 246, 0.2)",
    glowColor: "rgba(139, 92, 246, 0.12)",
  },
  {
    icon: LifeBuoy,
    title: "Post-Launch Support",
    description: "We stay engaged after launch with SLA-backed maintenance and monitoring",
    color: "#06B6D4",
    bgColor: "rgba(6, 182, 212, 0.08)",
    borderColor: "rgba(6, 182, 212, 0.2)",
    glowColor: "rgba(6, 182, 212, 0.12)",
  },
  {
    icon: Headphones,
    title: "Dedicated Project Lead",
    description: "One accountable point of contact throughout your entire engagement",
    color: "#0076D1",
    bgColor: "rgba(0, 118, 209, 0.08)",
    borderColor: "rgba(0, 118, 209, 0.2)",
    glowColor: "rgba(0, 118, 209, 0.12)",
  },
];

export function WhyChooseUs() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background: "#080D14",
      }}
      aria-labelledby="why-choose-us-heading"
    >
      {/* Subtle radial background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,118,209,0.12), transparent)",
        }}
      />

      <div className="container-standard relative z-10">
        {/* Section Header */}
        <div
          className="mb-6 text-center transition-all duration-1000 ease-out md:mb-8"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2">
            <Award className="h-4 w-4 text-[#0076D1] md:h-5 md:w-5" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Why Choose Us
            </p>
          </div>
          <h2 id="why-choose-us-heading" className="heading-2 mb-3 text-white">
            Your Trusted Technology Partner
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-base">
            We combine technical expertise with business acumen to deliver solutions that drive real
            results
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative transition-all duration-700 ease-out"
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(30px) scale(0.95)",
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <div
                  className="relative h-full overflow-hidden rounded-xl border p-5 transition-all duration-300 md:p-6"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255, 255, 255, 0.07)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 32px ${feature.glowColor}, 0 4px 16px rgba(0,0,0,0.4)`;
                    e.currentTarget.style.borderColor = feature.borderColor;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Colored top accent bar */}
                  <div
                    className="absolute left-0 right-0 top-0 h-0.5 rounded-t-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: feature.color }}
                  />

                  {/* Icon */}
                  <div className="relative mb-4">
                    <div
                      className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 md:h-12 md:w-12"
                      style={{
                        background: feature.bgColor,
                        border: `1px solid ${feature.borderColor}`,
                      }}
                    >
                      <div style={{ color: feature.color }}>
                        <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="heading-3 mb-2 text-white transition-colors duration-300"
                    style={{ color: undefined }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
