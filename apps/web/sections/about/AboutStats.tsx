"use client";

import React, { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Globe, Target } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function AboutStats() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Orbital animation with analytics visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw central core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
      coreGradient.addColorStop(0, "rgba(0, 118, 209, 0.8)");
      coreGradient.addColorStop(0.5, "rgba(0, 168, 255, 0.4)");
      coreGradient.addColorStop(1, "rgba(0, 168, 255, 0)");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbiting circles (like analytics data points)
      const orbits = [
        { radius: 120, speed: 0.01, color: "rgba(0, 118, 209, 0.6)", size: 8 },
        { radius: 180, speed: 0.015, color: "rgba(0, 168, 255, 0.6)", size: 6 },
        { radius: 240, speed: 0.008, color: "rgba(125, 211, 252, 0.6)", size: 10 },
      ];

      orbits.forEach((orbit, index) => {
        const angle = rotation * orbit.speed + (index * Math.PI * 2) / 3;
        const x = centerX + Math.cos(angle) * orbit.radius;
        const y = centerY + Math.sin(angle) * orbit.radius;

        // Glow effect
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, orbit.size * 3);
        glowGradient.addColorStop(0, orbit.color);
        glowGradient.addColorStop(1, "rgba(0, 168, 255, 0)");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, orbit.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Main circle
        ctx.fillStyle = orbit.color;
        ctx.beginPath();
        ctx.arc(x, y, orbit.size, 0, Math.PI * 2);
        ctx.fill();

        // Orbit trail
        ctx.strokeStyle = `rgba(0, 168, 255, 0.1)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw data lines (connecting to mouse position for interactivity)
      if (mousePos.x > 0 && mousePos.y > 0) {
        ctx.strokeStyle = "rgba(0, 168, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
      }

      rotation += 1;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const stats = [
    {
      icon: TrendingUp,
      value: "340%",
      label: "Average ROI",
      description: "For our clients",
      color: "#0076D1",
    },
    {
      icon: Users,
      value: "98%",
      label: "Client Retention",
      description: "Year over year",
      color: "#00A8FF",
    },
    {
      icon: Globe,
      value: "25+",
      label: "Countries Served",
      description: "Global reach",
      color: "#0EA5E9",
    },
    {
      icon: Target,
      value: "99.9%",
      label: "Uptime SLA",
      description: "Guaranteed",
      color: "#38BDF8",
    },
    {
      icon: Target,
      value: "100%",
      label: "On-Time Delivery",
      description: "Last 24 months",
      color: "#0284C7",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    >
      {/* Orbital Animation Canvas */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ maxWidth: "800px", maxHeight: "800px" }}
        />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #0076D1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

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
            By the Numbers
          </p>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Performance That Speaks
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-400 md:text-base">
            Our track record of delivering exceptional results for clients across industries
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            transitionDelay: "200ms",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative rounded-xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                transitionDelay: `${index * 80}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${stat.color}66`;
                e.currentTarget.style.boxShadow = `0 12px 48px ${stat.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 md:h-14 md:w-14"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}33, ${stat.color}66)`,
                }}
              >
                <stat.icon className="h-6 w-6 md:h-7 md:w-7" style={{ color: stat.color }} />
              </div>

              <div className="mb-2 text-3xl font-bold text-white transition-colors duration-300 group-hover:text-[#00A8FF] md:text-4xl">
                {stat.value}
              </div>

              <h3 className="heading-3 mb-2 text-white">{stat.label}</h3>
              <p className="text-xs text-gray-400 md:text-sm">{stat.description}</p>

              {/* Animated corner accent */}
              <div
                className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${stat.color}22 100%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
