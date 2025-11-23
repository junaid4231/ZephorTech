"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroAnimation from "@/components/HeroAnimation";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Stat {
  value?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
  decimals?: number;
  duration?: number;
  display?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  stats?: Stat[];
  ctaText?: string;
  ctaHref?: string;
  backgroundType?: "animation" | "gradient" | "video";
  videoSrc?: string;
  posterSrc?: string;
  overlayOpacity?: number;
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  description,
  stats = [],
  ctaText = "Get Started",
  ctaHref = "/contact#quote",
  backgroundType = "animation",
  videoSrc = "/videos/hero-video.mp4",
  posterSrc = "/videos/hero-poster.jpg",
  overlayOpacity = 0.3,
  className = "",
}: PageHeroProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px",
  });

  return (
    <section
      ref={heroRef}
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-20 pt-32 ${className}`}
      aria-labelledby="page-hero-heading"
      style={{
        background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.25), transparent)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0,168,255,0.3), transparent)",
            animation: "float 8s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Background Render Logic */}
      {backgroundType === "animation" && (
        <div className="pointer-events-none absolute inset-0 z-0 min-h-screen">
          <HeroAnimation />
        </div>
      )}
      {backgroundType === "video" && (
        <div className="pointer-events-none absolute inset-0">
          <HeroVideoBackground videoSrc={videoSrc} posterSrc={posterSrc} />
        </div>
      )}

      {/* Dark Overlay */}
      <div
        className="z-1 pointer-events-none absolute inset-0"
        style={{ background: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />

      {/* Main Content */}
      <div className="container-standard relative z-20 flex flex-col items-center text-center">
        {/* Subtitle */}
        {subtitle && (
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md transition-all duration-1000"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(-20px)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span className="font-inter text-xs font-bold uppercase tracking-widest text-blue-100 md:text-sm">
              {subtitle}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="heading-1 font-poppins mb-6 max-w-4xl font-bold text-white drop-shadow-lg transition-all duration-1000"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "100ms",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            className="font-inter mx-auto mb-10 max-w-2xl text-base leading-relaxed text-blue-50/90 transition-all duration-1000 md:text-lg"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "200ms",
            }}
          >
            {description}
          </p>
        )}

        {/* CTA Button */}
        <div
          className="mb-8 flex w-full justify-center transition-all duration-1000 md:mb-8"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "300ms",
          }}
        >
          <Link
            href={ctaHref}
            className="text-primary hover:shadow-3xl group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3.5 shadow-2xl transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 md:gap-3"
            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)" }}
          >
            <span className="relative z-10 font-semibold tracking-wide">{ctaText}</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
          </Link>
        </div>

        {/* STATS SECTION - FIXED */}
        {stats.length > 0 && (
          <div
            className="w-full max-w-6xl border-t border-white/10 pt-12 transition-all duration-1000"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "400ms",
            }}
          >
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center justify-center">
                  {/* Circle Container */}
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full sm:h-44 sm:w-44">
                    {/* 1. Static Background Circle & Border */}
                    <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm" />

                    {/* 2. The Spinner (Invisible container that rotates) */}
                    <div className="spinner-rotate absolute inset-0 rounded-full">
                      {/* The Ball (Positioned at the top of the rotating container) */}
                      <div
                        className="absolute -top-1.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                        style={{ top: "-6px" }} // Fine tune ball position to sit on border
                      />
                    </div>

                    {/* 3. Text Content (Absolute centered so it doesn't move) */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-2 text-center">
                      <div className="text-3xl font-bold text-white sm:text-4xl">
                        {stat.display ? (
                          stat.display
                        ) : (
                          <AnimatedCounter
                            target={stat.value ?? 0}
                            suffix={stat.suffix}
                            prefix={stat.prefix}
                            decimals={stat.decimals}
                            duration={stat.duration ?? 2000}
                            startDelay={500 + (stat.delay || index * 200)}
                            // Intentionally NOT passing label here to avoid duplication/overlap
                            className="inline-block"
                          />
                        )}
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
        )}
      </div>

      {/* CSS for the Rotation Animation */}
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
