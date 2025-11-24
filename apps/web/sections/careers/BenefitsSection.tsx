"use client";

import React from "react";
import { Home, Plane, TrendingUp, Users, Clock } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const benefits = [
  {
    icon: Home,
    title: "Remote-First Culture",
    description: "Work from anywhere with flexible hours that fit your lifestyle.",
    color: "#4ECDC4",
  },
  {
    icon: Plane,
    title: "Unlimited PTO",
    description: "Take the time you need to recharge with our unlimited vacation policy.",
    color: "#95E1D3",
  },
  {
    icon: TrendingUp,
    title: "Competitive Compensation",
    description: "Market-leading salaries with equity options and performance bonuses.",
    color: "#0076D1",
  },
  {
    icon: Users,
    title: "Team Events",
    description: "Regular offsites, hackathons, and virtual events to build connections.",
    color: "#AA96DA",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Asynchronous work culture that respects your time and productivity patterns.",
    color: "#FFD93D",
  },
];

export function BenefitsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="benefits"
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A111C 0%, #05070B 50%, #0A111C 100%)",
      }}
    >
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="mb-6 text-center md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease",
          }}
        >
          <p className="text-primary mb-3 text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">
            Benefits & Perks
          </p>
          <h2 className="heading-2 mb-3 font-bold text-white">We Take Care of Our Team</h2>
          <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
            Competitive benefits and perks designed to help you thrive both professionally and
            personally.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 md:p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease ${0.05 * index}s`,
                }}
              >
                {/* Icon */}
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 md:mb-4"
                  style={{
                    background: `${benefit.color}15`,
                    border: `1px solid ${benefit.color}30`,
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: benefit.color }} />
                </div>

                {/* Content */}
                <h3 className="font-poppins group-hover:text-primary mb-2 text-lg font-bold text-white transition-colors md:text-xl">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60 md:text-base">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-8 text-center md:mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.4s",
          }}
        >
          <p className="mb-3 text-base text-white/80 md:mb-4 md:text-lg">
            And that's not all. We're constantly adding new benefits based on team feedback.
          </p>
          <p className="text-sm text-white/60 md:text-base">
            Have ideas for perks that would make your work life better? We want to hear them.
          </p>
        </div>
      </div>
    </section>
  );
}
