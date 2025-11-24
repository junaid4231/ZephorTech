"use client";

import React, { useEffect, useRef } from "react";
import { Code, Heart, Lightbulb, Target } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function AboutMission() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Flowing data particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create flowing particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.5 + 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;

        // Draw particle
        ctx.fillStyle = `rgba(0, 168, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(135deg, #001529 0%, #002B4D 50%, #004E8F 100%)",
      }}
    >
      {/* Animated particles background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
        style={{ pointerEvents: "none" }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-30 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #0076D1 0%, transparent 70%)",
        }}
      />

      <div className="container-standard relative z-10">
        <div className="grid items-center gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
            }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00A8FF] md:text-sm">
              Our Mission
            </p>

            <h2 className="heading-2 mb-4 text-white md:mb-6">
              Empowering Businesses Through
              <span
                className="mt-2 block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #00A8FF 0%, #7DD3FC 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 12px rgba(0, 168, 255, 0.4))",
                }}
              >
                Exceptional Technology
              </span>
            </h2>

            <p className="mb-5 text-sm text-blue-50/90 md:mb-6 md:text-base">
              We believe that technology is not just a tool—it's a catalyst for transformation. Our
              mission is to empower businesses to achieve their boldest ambitions through innovative
              solutions, strategic thinking, and unwavering dedication to excellence.
            </p>

            <div className="space-y-4 md:space-y-5">
              {[
                {
                  icon: Code,
                  title: "Innovation First",
                  description:
                    "We push boundaries and embrace cutting-edge technologies to deliver solutions that set new standards.",
                },
                {
                  icon: Heart,
                  title: "Client Success",
                  description:
                    "Your success is our success. We're invested in your growth and committed to exceeding expectations.",
                },
                {
                  icon: Target,
                  title: "Excellence Always",
                  description:
                    "We never compromise on quality. Every line of code, every design choice reflects our pursuit of perfection.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 md:gap-4"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 md:h-14 md:w-14"
                    style={{
                      background: "linear-gradient(135deg, #004E8F, #0076D1)",
                      boxShadow: "0 4px 16px rgba(0, 118, 209, 0.3)",
                    }}
                  >
                    <item.icon className="h-6 w-6 text-white md:h-7 md:w-7" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white md:text-xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-blue-50/80 md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Enhanced with visible content */}
          <div
            className="relative transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "200ms",
            }}
          >
            <div
              className="relative aspect-square overflow-hidden rounded-3xl border"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 118, 209, 0.15) 0%, rgba(0, 168, 255, 0.08) 100%)",
                borderColor: "rgba(0, 168, 255, 0.2)",
                boxShadow: "0 20px 60px rgba(0, 118, 209, 0.3)",
              }}
            >
              {/* Central icon/badge */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-3xl border backdrop-blur-xl md:h-24 md:w-24"
                  style={{
                    background: "rgba(0, 118, 209, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 118, 209, 0.4)",
                  }}
                >
                  <Target className="h-10 w-10 text-white md:h-12 md:w-12" />
                </div>
              </div>

              {/* Orbiting elements */}
              <div className="absolute inset-0" style={{ padding: "var(--card-padding)" }}>
                {/* Code icon */}
                <div
                  className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: "orbit 8s linear infinite",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl md:h-14 md:w-14"
                    style={{
                      background: "rgba(0, 118, 209, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Code className="h-6 w-6 text-[#0076D1] md:h-7 md:w-7" />
                  </div>
                </div>

                {/* Heart icon */}
                <div
                  className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
                  style={{
                    animation: "orbit 10s linear infinite reverse",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl md:h-14 md:w-14"
                    style={{
                      background: "rgba(0, 168, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Heart className="h-6 w-6 text-[#00A8FF] md:h-7 md:w-7" />
                  </div>
                </div>

                {/* Lightbulb icon */}
                <div
                  className="absolute right-1/4 top-1/3 translate-x-1/2"
                  style={{
                    animation: "orbit 12s linear infinite",
                    animationDelay: "2s",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-xl md:h-14 md:w-14"
                    style={{
                      background: "rgba(125, 211, 252, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Lightbulb className="h-6 w-6 text-[#7DD3FC] md:h-7 md:w-7" />
                  </div>
                </div>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 h-full w-full opacity-20">
                <line
                  x1="50%"
                  y1="50%"
                  x2="25%"
                  y2="25%"
                  stroke="#0076D1"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="50%"
                  y1="50%"
                  x2="75%"
                  y2="75%"
                  stroke="#00A8FF"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="50%"
                  y1="50%"
                  x2="75%"
                  y2="33%"
                  stroke="#7DD3FC"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </line>
              </svg>

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Radial glow effects */}
              <div
                className="absolute left-1/4 top-1/4 h-40 w-40 animate-pulse rounded-full opacity-30 blur-3xl"
                style={{
                  background: "radial-gradient(circle, #0076D1 0%, transparent 70%)",
                  animation: "float 6s ease-in-out infinite",
                }}
              />
              <div
                className="absolute bottom-1/3 right-1/3 h-48 w-48 animate-pulse rounded-full opacity-20 blur-3xl"
                style={{
                  background: "radial-gradient(circle, #00A8FF 0%, transparent 70%)",
                  animation: "float 8s ease-in-out infinite reverse",
                }}
              />
            </div>

            {/* Floating accent elements */}
            <div
              className="absolute -right-6 -top-6 h-24 w-24 animate-pulse rounded-2xl opacity-50 blur-2xl"
              style={{
                background: "radial-gradient(circle, #0076D1, transparent)",
              }}
            />
            <div
              className="absolute -bottom-6 -left-6 h-32 w-32 animate-pulse rounded-2xl opacity-50 blur-2xl"
              style={{
                background: "radial-gradient(circle, #00A8FF, transparent)",
                animationDelay: "1s",
              }}
            />
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

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
