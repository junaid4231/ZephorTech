"use client";

import React from "react";
import { Linkedin, Github, Twitter } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

// Core founding team — update social links with real profiles
const team = [
  {
    name: "Ahmad Habib",
    role: "Co-Founder & CEO",
    bio: "Entrepreneur with a background in building and scaling B2B software products across the MENA region. Leads client strategy, partnerships, and commercial direction at ZephorTech.",
    image: "AH",
    social: {
      linkedin: "https://linkedin.com/company/zephortech",
      twitter: "https://twitter.com/zephortech",
    },
  },
  {
    name: "Muhammad Junaid",
    role: "Co-Founder & CTO",
    bio: "Full-stack architect with deep experience in cloud-native systems, AI integration, and production engineering. Oversees technical delivery and platform architecture across all ZephorTech engagements.",
    image: "MJ",
    social: {
      linkedin: "https://linkedin.com/company/zephortech",
      github: "https://github.com/zephortech",
    },
  },
];

export function AboutTeam() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
            Founding Team
          </p>
          <h2 className="heading-2 mb-3 text-white">The People Behind the Work</h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-400 md:text-base">
            A small, senior team of engineers, designers, and strategists. We keep the team tight so
            every client gets our best.
          </p>
        </div>

        {/* Team Grid */}
        <div
          className="mx-auto grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            transitionDelay: "200ms",
          }}
        >
          {team.map((member, index) => (
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
                e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 118, 209, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <div
                  className="flex aspect-square w-full items-center justify-center rounded-xl text-2xl font-bold text-white transition-all duration-300 group-hover:scale-105 md:text-3xl"
                  style={{
                    background: "linear-gradient(135deg, #004E8F, #0076D1)",
                  }}
                >
                  {member.image}
                </div>
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #004E8F, #0076D1)",
                  }}
                />
              </div>

              {/* Info */}
              <h3 className="font-poppins mb-1 text-lg font-bold text-white md:text-xl">
                {member.name}
              </h3>
              <p className="mb-2 text-xs font-semibold text-[#0076D1] md:text-sm">{member.role}</p>
              <p className="mb-4 text-xs leading-relaxed text-gray-400 md:mb-5 md:text-sm">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#0A66C2";
                      e.currentTarget.style.background = "rgba(10, 102, 194, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    }}
                  >
                    <Linkedin className="h-4 w-4 text-white" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#FFFFFF";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    }}
                  >
                    <Github className="h-4 w-4 text-white" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-110"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#1DA1F2";
                      e.currentTarget.style.background = "rgba(29, 161, 242, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    }}
                  >
                    <Twitter className="h-4 w-4 text-white" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div
          className="mt-16 text-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "600ms",
          }}
        >
          <p className="mb-4 text-gray-400">Want to work with us?</p>
          <a
            href="/careers"
            className="inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3"
            style={{ color: "#0076D1" }}
          >
            <span>See Open Positions</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
