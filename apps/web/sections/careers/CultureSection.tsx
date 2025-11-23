"use client";

import React from "react";
import { Code, Users, Target, Lightbulb, Globe, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const cultureValues = [
  {
    icon: Code,
    title: "Engineering Excellence",
    description: "We're obsessed with code quality, best practices, and building things that last.",
    stats: "95% test coverage target",
  },
  {
    icon: Users,
    title: "Collaboration First",
    description: "We believe the best solutions come from diverse perspectives working together.",
    stats: "Cross-functional teams",
  },
  {
    icon: Target,
    title: "Customer Impact",
    description: "Every line of code we write is in service of creating real value for our clients.",
    stats: "98% client satisfaction",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description: "We invest in growth through courses, conferences, and dedicated learning time.",
    stats: "$2K annual learning budget",
  },
  {
    icon: Globe,
    title: "Remote-First",
    description: "Built for distributed teams from day one, with async communication at our core.",
    stats: "15+ countries represented",
  },
  {
    icon: Rocket,
    title: "Move Fast, Stay Stable",
    description: "We ship quickly without compromising quality or cutting corners.",
    stats: "Weekly deployment cycle",
  },
];

const teamQuotes = [
  {
    quote: "The level of autonomy and trust here is unmatched. I can experiment, fail fast, and iterate without fear.",
    author: "Sarah Chen",
    role: "Senior Full-Stack Engineer",
    tenure: "2 years",
  },
  {
    quote: "Working with brilliant people who genuinely care about craft and impact—that's what keeps me here.",
    author: "Marcus Rodriguez",
    role: "AI/ML Engineer",
    tenure: "1.5 years",
  },
  {
    quote: "Remote-first doesn't mean isolated. The culture of async collaboration is incredibly effective.",
    author: "Aisha Patel",
    role: "Product Designer",
    tenure: "3 years",
  },
];

export function CultureSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="culture"
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #05070B 0%, #0A111C 50%, #05070B 100%)",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="mb-6 text-center md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease",
          }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary md:text-sm">
            Our Culture
          </p>
          <h2 className="heading-2 mb-3 font-bold text-white">
            What We Value
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
            Our culture is built on trust, excellence, and a shared commitment to building something meaningful.
          </p>
        </div>

        {/* Culture Values Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 md:mb-10">
          {cultureValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group relative rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 md:p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease ${0.1 * index}s`,
                }}
              >
                {/* Icon */}
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 md:mb-4 md:h-14 md:w-14"
                  style={{
                    background: "rgba(0, 118, 209, 0.1)",
                    border: "1px solid rgba(0, 118, 209, 0.3)",
                  }}
                >
                  <Icon className="h-6 w-6 text-primary md:h-7 md:w-7" />
                </div>

                {/* Content */}
                <h3 className="font-poppins mb-2 text-lg font-bold text-white md:text-xl">
                  {value.title}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-white/60 md:mb-4 md:text-base">{value.description}</p>

                {/* Stat */}
                <div
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "rgba(0, 118, 209, 0.15)",
                    color: "#0076D1",
                  }}
                >
                  {value.stats}
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Quotes */}
        <div
          className="mb-8 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.4s",
          }}
        >
          <h3 className="heading-3 mb-6 text-center text-white md:mb-8">
            Hear From Our Team
          </h3>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {teamQuotes.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border p-4 backdrop-blur-sm md:p-5"
                style={{
                  background: "rgba(0, 118, 209, 0.05)",
                  borderColor: "rgba(0, 118, 209, 0.2)",
                }}
              >
                <p className="mb-4 text-sm italic leading-relaxed text-white/80 md:text-base">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-3 md:pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-xs text-white/60 md:text-sm">{testimonial.role}</p>
                  <p className="mt-1 text-xs text-primary">With us for {testimonial.tenure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Environment */}
        <div
          className="grid gap-4 md:grid-cols-2 md:gap-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.6s",
          }}
        >
          <div
            className="rounded-xl border p-5 backdrop-blur-sm md:p-6"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <h3 className="font-poppins mb-3 text-xl font-bold text-white md:mb-4 md:text-2xl">
              Work-Life Balance
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-white/70 md:text-base">
              We believe in sustainable pace. No crunch culture, no expectations of constant availability. 
              We trust you to manage your time and deliver excellence.
            </p>
            <ul className="space-y-2 text-xs text-white/60 md:text-sm">
              <li>• Flexible hours that fit your schedule</li>
              <li>• Async-first communication</li>
              <li>• Generous PTO policy</li>
              <li>• No after-hours expectations</li>
            </ul>
          </div>

          <div
            className="rounded-xl border p-5 backdrop-blur-sm md:p-6"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <h3 className="font-poppins mb-3 text-xl font-bold text-white md:mb-4 md:text-2xl">
              Growth & Impact
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-white/70 md:text-base">
              Your career growth is our priority. Work on challenging problems, learn from experts, 
              and see your impact on real products serving thousands of users.
            </p>
            <ul className="space-y-2 text-xs text-white/60 md:text-sm">
              <li>• Mentorship from senior engineers</li>
              <li>• Quarterly career development check-ins</li>
              <li>• Transparent promotion paths</li>
              <li>• Ownership of meaningful projects</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

