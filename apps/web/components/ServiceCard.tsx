"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay?: number;
}

/**
 * ServiceCard Component
 * 
 * Professional service card for the services overview page.
 * Features:
 * - Hover animations
 * - Scroll-triggered animations
 * - Glassmorphism design
 * - Feature list display
 */
export function ServiceCard({
  title,
  description,
  features,
  href,
  icon: Icon,
  gradient,
  delay = 0,
}: ServiceCardProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease-out ${delay}ms`,
      }}
    >
      <Link href={href}>
        <div
          className="relative h-full rounded-3xl p-8 border transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 118, 209, 0.15), 0 12px 40px rgba(0, 0, 0, 0.4)";
            e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          }}
        >
          {/* Icon */}
          <div
            className="mb-6 inline-flex items-center justify-center rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: `linear-gradient(135deg, ${gradient})`,
              boxShadow: "0 8px 24px rgba(0, 118, 209, 0.3)",
            }}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="mb-4 font-poppins text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#0076D1]">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-6 text-gray-400 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Features */}
          <ul className="mb-6 space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "#0076D1" }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-4" style={{ color: "#0076D1" }}>
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>
      </Link>
    </div>
  );
}

