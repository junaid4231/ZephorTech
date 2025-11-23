"use client";

import React from "react";
import { Shield, Users, Lightbulb, Target, Rocket, Heart } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We build trust through transparency, honesty, and ethical practices in every interaction.",
    color: "#0076D1",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly explore new technologies and methodologies to deliver cutting-edge solutions.",
    color: "#00A8FF",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We set high standards and never settle for less than exceptional quality in our work.",
    color: "#7DD3FC",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe the best results come from diverse perspectives working together harmoniously.",
    color: "#0EA5E9",
  },
  {
    icon: Rocket,
    title: "Agility",
    description:
      "We adapt quickly to change, embracing new challenges as opportunities for growth.",
    color: "#38BDF8",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We love what we do, and that passion drives us to go above and beyond for our clients.",
    color: "#0284C7",
  },
];

export function AboutValues() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #0076D1 2px, transparent 2px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div
        className="absolute right-1/4 top-0 h-[600px] w-[600px] animate-pulse rounded-full opacity-20 blur-[150px]"
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
            Our Core Values
          </p>
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
              What Drives Us Forward
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-400 md:text-base">
            The principles that guide our decisions, shape our culture, and define who we are as a
            team
          </p>
        </div>

        {/* Values Grid */}
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            transitionDelay: "200ms",
          }}
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative rounded-xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${value.color}66`;
                e.currentTarget.style.boxShadow = `0 16px 48px ${value.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              {/* Icon */}
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 md:h-14 md:w-14"
                style={{
                  background: `linear-gradient(135deg, ${value.color}33, ${value.color}66)`,
                }}
              >
                <value.icon className="h-6 w-6 md:h-7 md:w-7" style={{ color: value.color }} />
              </div>

              {/* Content */}
              <h3 className="font-poppins mb-3 text-lg font-bold text-white md:text-xl">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                {value.description}
              </p>

              {/* Animated corner accent */}
              <div
                className="absolute bottom-0 left-0 h-24 w-24 rounded-br-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${value.color}11 0%, transparent 100%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
