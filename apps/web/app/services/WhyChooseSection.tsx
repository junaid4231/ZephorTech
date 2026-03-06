"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function WhyChooseSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  const benefits = [
    {
      icon: CheckCircle2,
      title: "Expert Team",
      description: "Deep technical expertise across web, mobile, AI, and cloud engineering",
    },
    {
      icon: CheckCircle2,
      title: "Proven Track Record",
      description: "70+ successful projects delivered across web, mobile, AI, and cloud",
    },
    {
      icon: ArrowRight,
      title: "End-to-End Solutions",
      description: "From concept to deployment, we handle every aspect of your project",
    },
    {
      icon: ArrowRight,
      title: "Agile Methodology",
      description: "Flexible development process with regular updates and iterations",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{ background: "#080D14" }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center md:mb-8">
          <h2 className="heading-2 font-poppins mb-3 font-black text-white">
            Why Choose Our Services
          </h2>
        </div>

        <div
          className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="rounded-xl border p-4 transition-all duration-500 hover:scale-105 md:p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <Icon className="mb-3 h-7 w-7 md:mb-4 md:h-8 md:w-8" style={{ color: "#0076D1" }} />
                <h3 className="font-poppins mb-2 text-lg font-bold text-white md:text-xl">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-400 md:text-base">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
