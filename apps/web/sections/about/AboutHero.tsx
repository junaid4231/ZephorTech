"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function AboutHero() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const particleCount = 100;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 118, 209, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 168, 255, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "85vh",
        paddingTop: "5rem", // Account for fixed header
        background: "linear-gradient(135deg, #001529 0%, #003355 50%, #004E8F 100%)",
      }}
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ pointerEvents: "none" }}
      />

      {/* Gradient Orbs */}
      <div
        className="absolute right-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full opacity-30 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #0076D1 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 h-[600px] w-[600px] animate-pulse rounded-full opacity-20 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #00A8FF 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite reverse",
        }}
      />

      {/* Content */}
      <div className="container-standard relative z-10 text-center">
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
          <span className="font-inter text-sm font-semibold tracking-wide text-white">
            Pioneering Digital Excellence Since 2010
          </span>
        </div>

        {/* Main Heading with Typewriter Effect */}
        <h1
          className="heading-1 mb-8 text-white transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "100ms",
          }}
        >
          <span className="mb-3 block">We Build the</span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #FFFFFF 0%, #E0F2FE 30%, #BAE6FD 60%, #7DD3FC 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 12px rgba(0, 168, 255, 0.4))",
            }}
          >
            Future of Technology
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="font-inter mx-auto mb-12 max-w-4xl leading-relaxed text-blue-50/95 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "200ms",
            fontSize: "clamp(0.95rem, 1.2vw + 0.3rem, 1.25rem)",
            lineHeight: "1.7",
            fontWeight: 400,
          }}
        >
          A team of world-class engineers, designers, and strategists united by one mission:{" "}
          <span className="font-semibold text-white">
            to transform ambitious ideas into exceptional digital experiences.
          </span>
        </p>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 transition-all duration-1000 md:grid-cols-4"
          style={{
            gap: "var(--section-inner-gap)",
            marginBottom: "var(--section-inner-gap)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "300ms",
          }}
        >
          {[
            { value: "15+", label: "Years of Excellence" },
            { value: "200+", label: "Happy Clients" },
            { value: "500+", label: "Projects Delivered" },
            { value: "50+", label: "Team Members" },
          ].map((stat, index) => (
            <div
              key={index}
              className="card-standard group relative transition-all duration-500 hover:-translate-y-1 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 168, 255, 0.5)";
                e.currentTarget.style.boxShadow = "0 12px 48px rgba(0, 168, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              <div className="heading-1 mb-2 text-white">{stat.value}</div>
              <p className="text-sm text-blue-50/80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          className="flex flex-col items-center gap-2 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "400ms",
          }}
        >
          <span className="font-inter text-sm text-blue-50/70">Discover Our Story</span>
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-blue-50/70" />
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
            transform: translate(30px, -30px) scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
