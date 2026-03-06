"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react"; // Imported MapPin
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const heroStats = [
  { value: 70, suffix: "+", label: "Projects Delivered", delay: 500 },
  { value: 40, suffix: "+", label: "Happy Clients", delay: 650 },
  { value: 5, suffix: "+", label: "Years of Experience", delay: 800 },
  { value: 99.9, suffix: "%", label: "Uptime SLA", delay: 950 },
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
        paddingTop: "5rem",
      }}
    >
      {/* Video Background */}
      <HeroVideoBackground videoSrc="/videos/hero-video.mp4" posterSrc="/videos/hero-poster.jpg" />

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.5)", // Darkened slightly for premium feel
          zIndex: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="container-standard relative z-20 text-center">
        {/* NEW: Dubai & Lahore Location Badge */}
        <div
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md transition-all duration-1000"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <MapPin className="h-3 w-3 text-blue-200" />
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-50">
            Operating from Dubai & Lahore
          </span>
        </div>

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
          <span className="mb-1.5 block">We Build Software</span>
          <span
            className="mb-1.5 block bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, #E0F2FE 50%, #BAE6FD 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 8px rgba(0, 118, 209, 0.3))",
            }}
          >
            That Drives Results
          </span>
          <span className="mt-2 block text-4xl opacity-90 md:text-5xl">
            For Ambitious Businesses
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="subtitle mx-auto mb-8 max-w-2xl transition-all duration-1000"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "200ms",
            color: "rgba(225, 242, 254, 0.9)",
          }}
        >
          From scalable SaaS platforms to AI automation — we design, build, and ship digital
          products that grow your business.
        </p>

        {/* CTA Buttons */}
        <div
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
            <span className="relative z-10">Start a Project</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </Link>
          <Link
            href="/case-studies"
            className="btn-secondary focus:ring-offset-primary-700 group w-full border-2 border-white/60 bg-white/5 text-white backdrop-blur-md hover:scale-105 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:w-auto"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span>View Our Work</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Stats — Glowing Ring Circles */}
        <div
          className="w-full pb-16 pt-8 transition-all duration-1000"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "400ms",
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-20">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center justify-center"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transition: `all 0.6s ease ${400 + i * 100}ms`,
                }}
              >
                {/* Outer glow ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "clamp(120px, 14vw, 168px)",
                    height: "clamp(120px, 14vw, 168px)",
                    background: "transparent",
                    border: "1px solid rgba(0,168,255,0.25)",
                    boxShadow: "0 0 28px rgba(0,168,255,0.15), inset 0 0 28px rgba(0,118,209,0.08)",
                    borderRadius: "50%",
                    transition: "box-shadow 0.4s ease",
                  }}
                />
                {/* Inner circle */}
                <div
                  className="relative flex flex-col items-center justify-center rounded-full transition-all duration-500 group-hover:scale-105"
                  style={{
                    width: "clamp(96px, 11vw, 136px)",
                    height: "clamp(96px, 11vw, 136px)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Number */}
                  <div
                    className="font-black leading-none tracking-tight text-white"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                  >
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={1800}
                      startDelay={stat.delay}
                      className="inline-block"
                    />
                  </div>
                </div>
                {/* Label below circle */}
                <div
                  className="mt-3 text-center font-semibold uppercase text-blue-200/60"
                  style={{
                    fontSize: "clamp(9px, 0.9vw, 11px)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
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
