"use client";

import React from "react";
import { Coffee, Gamepad2, GraduationCap, Globe, Heart, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const perks = [
  {
    icon: Rocket,
    title: "Remote-First",
    description: "Work from anywhere in the world with flexible hours",
  },
  {
    icon: Coffee,
    title: "Unlimited PTO",
    description: "Take time off when you need it, no questions asked",
  },
  {
    icon: Gamepad2,
    title: "Team Events",
    description: "Regular offsites, hackathons, and virtual game nights",
  },
  {
    icon: Globe,
    title: "Global Team",
    description: "Work with talented people from 25+ countries",
  },
];

export function AboutCulture() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(135deg, #001529 0%, #002B4D 50%, #004E8F 100%)",
      }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div
        className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full opacity-30 blur-[150px]"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
      />

      <div className="container-standard relative z-10">
        {/* Header */}
        <div
          className="mb-6 text-center transition-all duration-1000 md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00A8FF] md:text-sm">
            Life at ZephorTech
          </p>
          <h2 className="heading-2 mb-3 text-white">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00A8FF 0%, #7DD3FC 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 12px rgba(0, 168, 255, 0.4))",
              }}
            >
              A Culture Built on Growth
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-blue-50/90 md:text-base">
            We believe that happy, empowered teams build exceptional products. That's why we've
            created an environment where innovation thrives and everyone can do their best work.
          </p>
        </div>

        {/* Perks Grid */}
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            transitionDelay: "200ms",
          }}
        >
          {perks.map((perk, index) => (
            <div
              key={index}
              className="group relative rounded-xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                transitionDelay: `${index * 80}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 168, 255, 0.4)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 168, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 md:h-14 md:w-14"
                style={{
                  background: "linear-gradient(135deg, #004E8F, #0076D1)",
                }}
              >
                <perk.icon className="h-6 w-6 text-white md:h-7 md:w-7" />
              </div>

              <h3 className="font-poppins mb-2 text-lg font-bold text-white md:text-xl">
                {perk.title}
              </h3>
              <p className="text-sm leading-relaxed text-blue-50/80 md:text-base">
                {perk.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div
          className="mx-auto mt-8 max-w-4xl text-center transition-all duration-1000 md:mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "400ms",
          }}
        >
          <div
            className="rounded-xl border p-5 md:p-6"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <p className="mb-4 text-lg italic leading-relaxed text-white/95 md:mb-5 md:text-xl">
              "At ZephorTech, you're not just an employee—you're a valued member of a global family
              dedicated to pushing the boundaries of what's possible."
            </p>
            <p className="text-xs font-semibold text-white md:text-sm">Sarah Chen</p>
            <p className="text-xs text-[#0076D1] md:text-sm">CEO, ZephorTech</p>
          </div>
        </div>
      </div>
    </section>
  );
}
