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
      year: "2020",
      title: "The Beginning",
      description:
        "Founded in Dubai with a remote engineering hub in Lahore, built around one idea: deliver enterprise-grade software with agency speed.",
      icon: Rocket,
    },
    {
      year: "2021",
      title: "First Enterprise Clients",
      description:
        "Delivered our first SaaS platform and secured long-term partnerships with clients across the UAE and Saudi Arabia.",
      icon: Globe,
    },
    {
      year: "2023",
      title: "AI & Automation Expansion",
      description:
        "Launched our AI agent and process automation practice, helping clients automate workflows and unlock new revenue streams.",
      icon: Lightbulb,
    },
    {
      year: "2025",
      title: "Growing Across the Region",
      description:
        "Expanded our team to 20+ specialists and deepened partnerships across fintech, e-commerce, healthcare, and logistics verticals.",
      icon: Target,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{ background: "#080D14" }}
    >
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
          <h2 className="heading-2 mb-3 text-white">How We Got Here</h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-400 md:text-base">
            From a two-person founding team to a growing studio trusted by businesses across the
            MENA region — here's the story so far.
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
                      <div className="font-poppins mb-3 text-3xl font-black text-white/10 md:text-4xl">
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
                      className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 md:h-14 md:w-14"
                      style={{
                        background: "linear-gradient(135deg, #004E8F, #0076D1)",
                        boxShadow: "0 10px 40px rgba(0, 118, 209, 0.4)",
                      }}
                    >
                      <milestone.icon className="h-6 w-6 text-white md:h-7 md:w-7" />

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
                      className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, #004E8F, #0076D1)",
                      }}
                    >
                      <milestone.icon className="h-6 w-6 text-white" />
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
