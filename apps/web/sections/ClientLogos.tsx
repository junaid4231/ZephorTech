"use client";

import React, { useEffect, useState } from "react";

const clients = [
  { name: "TechCorp", logo: "TC" },
  { name: "InnovateLab", logo: "IL" },
  { name: "DigitalFlow", logo: "DF" },
  { name: "CloudScale", logo: "CS" },
  { name: "DataVault", logo: "DV" },
  { name: "NextGen", logo: "NG" },
  { name: "SmartSys", logo: "SS" },
  { name: "FutureTech", logo: "FT" },
];

export function ClientLogos() {
  const [animationDuration, setAnimationDuration] = useState(28);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const updateDuration = () => {
      setAnimationDuration(window.innerWidth < 768 ? 42 : 28);
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
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div className="container-standard relative z-10">
        <div className="mb-6 text-center md:mb-8">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] md:text-sm"
            style={{ color: "#0076D1" }}
          >
            Trusted By
          </p>
          <h2 className="heading-2 mb-2">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Industry Leaders
            </span>
          </h2>
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
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="hover:border-primary/30 flex-shrink-0 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.07] md:p-5"
                style={{
                  minWidth: "160px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex h-12 flex-col items-center justify-center gap-1.5 md:h-14">
                  <span className="font-poppins text-xl font-bold tracking-wide text-white md:text-2xl">
                    {client.logo}
                  </span>
                  <span className="text-center text-xs uppercase tracking-[0.2em] text-white/60">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
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
