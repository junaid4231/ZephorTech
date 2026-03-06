"use client";

import React from "react";
import { Users, Rocket, Heart } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function CareersHero() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden pt-20"
      style={{ background: "#0A0A0A" }}
    >
      {/* Subtle top accent glow — kept for hero context */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
      />

      <div className="container-standard relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm"
            style={{
              background: "rgba(0, 118, 209, 0.1)",
              border: "1px solid rgba(0, 118, 209, 0.3)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(-20px)",
              transition: "all 0.8s ease",
            }}
          >
            <span className="text-sm font-semibold text-white">Join Our Team</span>
          </div>

          {/* Main Heading */}
          <h1
            className="heading-2 mb-6 font-bold"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease 0.1s",
            }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Build the Future
            </span>
            <br />
            <span className="text-white">With ZephorTech</span>
          </h1>

          {/* Description */}
          <p
            className="mx-auto mb-5 max-w-3xl text-base leading-relaxed text-white/70 md:mb-6 md:text-lg"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            We're a team of innovators, creators, and problem-solvers building transformative
            digital experiences. Join us in shaping the future of technology.
          </p>

          {/* Talent Network Notice */}
          <div
            className="mx-auto mb-8 inline-flex max-w-2xl items-center gap-2 rounded-xl px-5 py-2.5 backdrop-blur-sm md:mb-10"
            style={{
              background: "rgba(0, 118, 209, 0.1)",
              border: "1px solid rgba(0, 118, 209, 0.3)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.25s",
            }}
          >
            <span className="text-center text-xs text-white/80 md:text-sm">
              While we don't have open positions right now, we're always interested in connecting
              with talented professionals.
            </span>
          </div>

          {/* Stats */}
          <div
            className="mb-8 grid grid-cols-2 gap-4 md:mb-10 md:grid-cols-3 md:gap-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.3s",
            }}
          >
            {[
              { icon: Users, value: "8+", label: "Disciplines Covered" },
              { icon: Rocket, value: "12+", label: "Countries Served" },
              { icon: Heart, value: "100%", label: "Remote-Friendly" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border p-4 backdrop-blur-sm md:p-5"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Icon className="text-primary mx-auto mb-3 h-7 w-7 md:h-8 md:w-8" />
                  <div className="font-poppins mb-1 text-3xl font-bold text-white md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60 md:text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col justify-center gap-3 sm:flex-row md:gap-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            <a
              href="/careers/apply"
              className="btn-primary group text-white hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
              }}
            >
              Join Our Talent Network
            </a>
            <a
              href="#culture"
              className="btn-secondary text-white backdrop-blur-sm hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Learn About Our Culture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
