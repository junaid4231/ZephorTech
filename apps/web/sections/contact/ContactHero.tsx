"use client";

import React from "react";
import { Calendar, MessageSquare } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import dynamic from "next/dynamic";

const HeroAnimation = dynamic(() => import("@/components/HeroAnimation"), {
  ssr: false,
});

export function ContactHero() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px",
  });

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "85vh",
        paddingTop: "5rem", // Account for fixed header
      }}
      style={{
        background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
      }}
    >
      {/* 3D Animation Background */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <HeroAnimation />
      </div>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-standard relative z-20 text-center">
        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 backdrop-blur-md transition-all duration-1000"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-20px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <span className="font-inter text-sm font-semibold text-white tracking-wide">
            Let's Start a Conversation
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="mb-6 font-poppins font-bold text-white transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "100ms",
            fontSize: "clamp(2.5rem, 5vw + 0.5rem, 5rem)",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block mb-2">Let's Build Something</span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, #E0F2FE 50%, #BAE6FD 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 8px rgba(0, 118, 209, 0.3))",
            }}
          >
            Extraordinary
          </span>
        </h1>

        {/* Subheading */}
        <p
            className="subtitle mx-auto mb-8 max-w-3xl text-blue-50/95 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "200ms",
            fontSize: "clamp(1rem, 1.3vw + 0.4rem, 1.35rem)",
            lineHeight: "1.7",
            fontWeight: 400,
          }}
        >
          Whether you're launching a new product, scaling your platform, or transforming your tech stack—we're here to help. Get a response within 24 hours.
        </p>

        {/* Quick Action Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "300ms",
          }}
        >
          {[
            {
              icon: Calendar,
              title: "Book a Call",
              description: "30-min strategy session",
              action: "#book-call",
            },
            {
              icon: MessageSquare,
              title: "Send a Message",
              description: "Get a detailed quote",
              action: "#quote",
            },
            {
              icon: MessageSquare,
              title: "Quick Question",
              description: "Ask us anything",
              action: "#faq",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.action}
              className="group relative rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                padding: "1.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              <item.icon className="w-8 h-8 text-white mb-3 mx-auto" />
              <h3 className="font-poppins text-lg font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-blue-50/80">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

