"use client";

import React from "react";
import { Search, Lightbulb, Code, Rocket, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface ProcessStep {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Analysis",
    description:
      "We dive deep into your business needs, goals, and challenges to understand the full scope of your project.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy & Planning",
    description:
      "Our team creates a comprehensive roadmap with timelines, milestones, and clear deliverables tailored to your objectives.",
  },
  {
    number: "03",
    icon: Code,
    title: "Development & Design",
    description:
      "We build your solution using cutting-edge technologies, following best practices and maintaining the highest quality standards.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Testing & Launch",
    description:
      "Rigorous testing ensures everything works perfectly before we launch your solution to the world.",
  },
  {
    number: "05",
    icon: CheckCircle2,
    title: "Support & Optimization",
    description:
      "Ongoing support, monitoring, and continuous optimization to ensure your solution performs at its best.",
  },
];

export function OurProcess() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
      aria-labelledby="our-process-heading"
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, #0076D1 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
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
            <Rocket className="h-4 w-4 text-[#0076D1] md:h-5 md:w-5" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Our Process
            </p>
          </div>
          <h2 id="our-process-heading" className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              How We Work
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-base">
            A proven methodology that ensures your project's success from concept to launch
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <div
              className="duration-2000 h-0.5 transition-all ease-out"
              style={{
                width: sectionVisible ? "100%" : "0%",
                background: "linear-gradient(90deg, #0076D1 0%, #00A8FF 100%)",
                opacity: 0.3,
              }}
            />
          </div>

          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-5">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isVisible = sectionVisible;

              return (
                <div
                  key={step.number}
                  className="relative transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(30px) scale(0.95)",
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Step Card */}
                  <div className="relative">
                    {/* Number Badge */}
                    <div
                      className="font-poppins absolute -top-3 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-base font-black transition-all duration-500 group-hover:scale-110 md:h-12 md:w-12 md:text-lg"
                      style={{
                        background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                        boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Card */}
                    <div
                      className="group relative rounded-xl border p-4 pt-7 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5 md:pt-8"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(20px)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 8px 32px rgba(0, 118, 209, 0.15), 0 4px 16px rgba(0, 0, 0, 0.4)";
                        e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      }}
                    >
                      {/* Icon */}
                      <div className="mb-3 flex justify-center">
                        <div
                          className="rounded-lg p-2.5 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 md:p-3"
                          style={{
                            background: "rgba(0, 118, 209, 0.1)",
                            border: "1px solid rgba(0, 118, 209, 0.2)",
                          }}
                        >
                          <div style={{ color: "#0076D1" }}>
                            <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="font-poppins mb-2 text-center text-base font-bold text-white transition-colors duration-300 group-hover:text-[#00A8FF] md:text-lg">
                        {step.title}
                      </h3>
                      <p className="font-inter text-center text-xs leading-relaxed text-gray-400 md:text-sm">
                        {step.description}
                      </p>
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
