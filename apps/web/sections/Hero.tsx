"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const heroStats = [
  { value: 500, suffix: "+", label: "Projects Delivered", delay: 500 },
  { value: 200, suffix: "+", label: "Happy Clients", delay: 650 },
  { value: 15, suffix: "+", label: "Years Experience", delay: 800 },
  { value: 98, suffix: "%", label: "Client Satisfaction", delay: 950 },
];

export default function Hero() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px",
  });

  return (
    <section
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
        minHeight: "85vh",
        paddingTop: "5rem", // Account for fixed header
      }}
    >
      {/* Video Background */}
      <HeroVideoBackground videoSrc="/videos/hero-video.mp4" posterSrc="/videos/hero-poster.jpg" />

      {/* Enhanced Background Effects (Fallback when video not available) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div
          className="absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.25), transparent)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0,168,255,0.3), transparent)",
            animation: "float 8s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="opacity-8 absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Dark Overlay for Text Readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="container-standard relative z-20 text-center">
        {/* Main Heading */}
        <h1
          id="hero-heading"
          className="heading-1 mb-6 text-white transition-all duration-1000"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "100ms",
          }}
        >
          <span className="mb-1.5 block">Cutting-Edge</span>
          <span
            className="mb-1.5 block bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, #E0F2FE 50%, #BAE6FD 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 8px rgba(0, 118, 209, 0.3))",
            }}
          >
            IT Solutions
          </span>
          <span className="block">For Your Business</span>
        </h1>

        {/* Subheading */}
        <p
          className="subtitle mx-auto mb-8 max-w-2xl text-blue-50/95 transition-all duration-1000"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "200ms",
          }}
        >
          We deliver innovative technology solutions including web & mobile development, AI agents,
          SaaS products, and comprehensive digital transformation services.
        </p>

        {/* CTA Buttons */}
        <div
          // CHANGED: Reduced margin-bottom from mb-16 to mb-8
          className="mb-8 flex flex-col items-center justify-center transition-all duration-1000 sm:flex-row sm:flex-wrap"
          style={{
            gap: "var(--section-inner-gap)",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "300ms",
          }}
        >
          <Link
            href="/contact#quote"
            className="btn-primary text-primary focus:ring-offset-primary-700 group relative w-full overflow-hidden bg-white shadow-xl hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:w-auto"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 16px rgba(255, 255, 255, 0.2)",
            }}
          >
            <span className="relative z-10">Hire Us</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </Link>
          <Link
            href="/portfolio"
            className="btn-secondary focus:ring-offset-primary-700 group w-full border-2 border-white/60 bg-white/5 text-white backdrop-blur-md hover:scale-105 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:w-auto"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span>Our Work</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* UPDATED: Stats with Animated Circular Progress & Rotating Ball */}
        <div
          // CHANGED: Reduced top padding (pt-8) and added bottom padding (pb-16)
          className="w-full max-w-6xl border-t border-white/10 pb-16 pt-8 transition-all duration-1000"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "400ms",
          }}
        >
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center">
                {/* Circle Container */}
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full sm:h-44 sm:w-44">
                  {/* 1. Static Background Circle & Border */}
                  <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm" />

                  {/* 2. The Spinner (Invisible container that rotates) */}
                  <div className="spinner-rotate absolute inset-0 rounded-full">
                    {/* The Ball (Positioned at the top of the rotating container) */}
                    <div
                      className="absolute -top-1.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      style={{ top: "-6px" }}
                    />
                  </div>

                  {/* 3. Text Content (Absolute centered so it doesn't move) */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-2 text-center">
                    <div className="text-3xl font-bold text-white sm:text-4xl">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        duration={2000}
                        startDelay={stat.delay}
                        // Intentionally not passing label here to avoid duplication
                        className="inline-block"
                      />
                    </div>
                    <div className="mt-2 max-w-[90%] text-xs font-semibold uppercase tracking-wider text-blue-200/90 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "600ms",
        }}
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="font-inter text-xs font-medium tracking-wide text-white/70">
            Scroll to explore
          </span>
          <div className="animate-bounce">
            <svg
              className="h-6 w-6 text-white/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .spinner-rotate {
          animation: spin-circle 4s linear infinite;
        }

        @keyframes spin-circle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -20px) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
