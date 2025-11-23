"use client";

import React from "react";
import { Rocket, Lightbulb, Target, Globe } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function AboutStory() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  const milestones = [
    {
      year: "2010",
      title: "The Beginning",
      description:
        "Founded with a vision to bridge the gap between ambitious ideas and exceptional execution.",
      icon: Rocket,
    },
    {
      year: "2015",
      title: "Global Expansion",
      description:
        "Expanded to serve clients across 25+ countries, building a diverse portfolio of transformative projects.",
      icon: Globe,
    },
    {
      year: "2020",
      title: "AI Innovation",
      description:
        "Pioneered AI-driven solutions, helping clients leverage cutting-edge technology for competitive advantage.",
      icon: Lightbulb,
    },
    {
      year: "2025",
      title: "Industry Leadership",
      description:
        "Recognized as a leading force in digital transformation, with 500+ successful projects and counting.",
      icon: Target,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0076D1 1px, transparent 1px),
              linear-gradient(to bottom, #0076D1 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        {/* Header */}
        <div
          className="mb-6 text-center transition-all duration-1000 md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] md:text-sm"
            style={{ color: "#0076D1" }}
          >
            Our Journey
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
              Building Excellence, Together
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-400 md:text-base">
            From a small team with big dreams to an industry leader trusted by global enterprises.
            Our story is one of continuous innovation, unwavering commitment, and extraordinary
            results.
          </p>
        </div>

        {/* Timeline */}
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            transitionDelay: "200ms",
          }}
        >
          {/* Vertical line */}
          <div
            className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 md:block"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, #0076D1 20%, #0076D1 80%, transparent 100%)",
            }}
          />

          {/* Milestones */}
          <div className="space-y-8 md:space-y-10">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="group relative grid items-center gap-8 md:grid-cols-2">
                  {/* Left Content (desktop) */}
                  <div className={`${isEven ? "md:text-right" : "md:order-2"}`}>
                    <div
                      className="inline-block transition-all duration-500 hover:scale-105"
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="font-poppins mb-3 text-4xl font-black text-white/10 md:text-5xl">
                        {milestone.year}
                      </div>
                      <h3 className="heading-3 mb-3 text-white">{milestone.title}</h3>
                      <p className="max-w-md text-sm leading-relaxed text-gray-400 md:text-base">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                    <div
                      className="relative flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 md:h-20 md:w-20"
                      style={{
                        background: "linear-gradient(135deg, #004E8F, #0076D1)",
                        boxShadow: "0 10px 40px rgba(0, 118, 209, 0.4)",
                      }}
                    >
                      <milestone.icon className="h-8 w-8 text-white md:h-10 md:w-10" />

                      {/* Pulse effect */}
                      <div
                        className="absolute inset-0 animate-ping rounded-2xl"
                        style={{
                          background: "linear-gradient(135deg, #004E8F, #0076D1)",
                          opacity: 0.5,
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Content (mobile icon) */}
                  <div className={`${isEven ? "md:order-2" : ""} md:hidden`}>
                    <div
                      className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, #004E8F, #0076D1)",
                      }}
                    >
                      <milestone.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
