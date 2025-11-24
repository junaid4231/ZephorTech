"use client";

import React from "react";
import { Shield, Users, Award, Clock, Headphones, Zap, LifeBuoy } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Award,
    title: "Award-Winning Quality",
    description: "Recognized for excellence in IT solutions and innovation",
    color: "#0076D1",
  },
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "Agile development process ensuring rapid time-to-market",
    color: "#0076D1",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Bank-level security protocols protecting your data and applications",
    color: "#0076D1",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "15+ years of combined experience across cutting-edge technologies",
    color: "#0076D1",
  },
  {
    icon: LifeBuoy,
    title: "24/7 Support",
    description: "Round-the-clock technical support and maintenance services",
    color: "#0076D1",
  },
  {
    icon: Headphones,
    title: "Dedicated Success Manager",
    description: "Personal point of contact ensuring your project's success",
    color: "#0076D1",
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
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
      aria-labelledby="why-choose-us-heading"
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #0076D1 1px, transparent 1px),
            linear-gradient(-45deg, #0076D1 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute left-0 top-0 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00A8FF, transparent)" }}
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
          <h2 id="why-choose-us-heading" className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Your Trusted Technology Partner
            </span>
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
                  className="relative h-full rounded-xl border p-4 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02] md:p-5"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0, 118, 209, 0.12), 0 4px 16px rgba(0, 0, 0, 0.4)";
                    e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Icon */}
                  <div className="relative mb-3">
                    <div
                      className="absolute inset-0 rounded-lg opacity-10 blur-xl transition-opacity duration-500 group-hover:opacity-15"
                      style={{
                        background: "#0076D1",
                      }}
                    />
                    <div
                      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 md:h-12 md:w-12"
                      style={{
                        background: "rgba(0, 118, 209, 0.1)",
                        border: "1px solid rgba(0, 118, 209, 0.2)",
                        boxShadow: "0 4px 12px rgba(0, 118, 209, 0.1)",
                      }}
                    >
                      <div style={{ color: "#0076D1" }}>
                        <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="heading-3 mb-2 text-white transition-colors duration-300 group-hover:text-[#0076D1]">
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
