"use client";

import React, { useEffect, useState } from "react";
import {
  CreditCard,
  ShoppingBag,
  Activity,
  Truck,
  Building2,
  Cloud,
  GraduationCap,
  Utensils,
} from "lucide-react";

const clients = [
  {
    name: "Fintech",
    industry: "Finance & Payments",
    icon: CreditCard,
    color: "#10B981",
    glow: "rgba(16,185,129,0.18)",
  },
  {
    name: "E-Commerce",
    industry: "Retail & Commerce",
    icon: ShoppingBag,
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.18)",
  },
  {
    name: "Healthcare",
    industry: "Health Tech",
    icon: Activity,
    color: "#EF4444",
    glow: "rgba(239,68,68,0.18)",
  },
  {
    name: "Logistics",
    industry: "Supply Chain",
    icon: Truck,
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.18)",
  },
  {
    name: "Real Estate",
    industry: "PropTech",
    icon: Building2,
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.18)",
  },
  {
    name: "SaaS",
    industry: "Cloud Software",
    icon: Cloud,
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.18)",
  },
  {
    name: "Education",
    industry: "EdTech",
    icon: GraduationCap,
    color: "#EC4899",
    glow: "rgba(236,72,153,0.18)",
  },
  {
    name: "Hospitality",
    industry: "Travel & Hotels",
    icon: Utensils,
    color: "#F97316",
    glow: "rgba(249,115,22,0.18)",
  },
];

export function ClientLogos() {
  const [animationDuration, setAnimationDuration] = useState(28);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const updateDuration = () => {
      setAnimationDuration(window.innerWidth < 768 ? 20 : 25);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!motionQuery.matches);
    updateDuration();

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setShouldAnimate(!event.matches);
    };

    window.addEventListener("resize", updateDuration);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", updateDuration);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-12 md:py-16" style={{ background: "#080D14" }}>
      <div className="container-standard relative z-10">
        <div className="mb-6 text-center md:mb-8">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] md:text-sm"
            style={{ color: "#0076D1" }}
          >
            Sectors We Serve
          </p>
          <h2 className="heading-2 mb-2 text-white">Built for Every Industry</h2>
        </div>

        <div className="group relative overflow-hidden" aria-live="polite">
          <div
            className="absolute bottom-0 left-0 top-0 z-10 w-24 md:w-32"
            style={{
              background: "linear-gradient(to right, #0A0A0A, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 top-0 z-10 w-24 md:w-32"
            style={{
              background: "linear-gradient(to left, #0A0A0A, transparent)",
            }}
          />

          <div
            className={`flex gap-4 md:gap-6 ${shouldAnimate ? "animate-logo-scroll" : ""}`}
            style={{
              animationDuration: `${animationDuration}s`,
              animationPlayState: shouldAnimate ? "running" : "paused",
            }}
          >
            {[...clients, ...clients].map((client, index) => {
              const Icon = client.icon;
              return (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] md:p-5"
                  style={{ minWidth: "170px" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    (e.currentTarget.querySelector(".sector-icon-wrap") as HTMLElement | null)
                      ?.style &&
                      ((
                        e.currentTarget.querySelector(".sector-icon-wrap") as HTMLElement
                      ).style.boxShadow = `0 0 20px ${client.glow}`);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    (e.currentTarget.querySelector(".sector-icon-wrap") as HTMLElement | null)
                      ?.style &&
                      ((
                        e.currentTarget.querySelector(".sector-icon-wrap") as HTMLElement
                      ).style.boxShadow = "none");
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    {/* Icon container */}
                    <div
                      className="sector-icon-wrap flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300"
                      style={{
                        background: `${client.color}18`,
                        border: `1px solid ${client.color}35`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: client.color }}
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white/90">{client.name}</p>
                      <p className="mt-0.5 text-[11px] text-white/40">{client.industry}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes logo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-logo-scroll {
          animation: logo-scroll linear infinite;
        }
        .group:hover .animate-logo-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
