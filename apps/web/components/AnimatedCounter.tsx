"use client";

import React from "react";
import { useAnimatedCounter } from "@/lib/useAnimatedCounter";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  startDelay?: number;
  className?: string;
  label: string;
  labelClassName?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2000,
  startDelay = 0,
  className = "",
  label,
  labelClassName = "",
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const { formattedValue } = useAnimatedCounter(target, {
    duration,
    startDelay,
    decimals,
    suffix,
    prefix,
  });

  // Only start animation when visible
  const displayValue = isVisible ? formattedValue : prefix + "0" + suffix;

  return (
    <div ref={ref} className={className}>
      <div
        className="mb-2 font-poppins font-bold text-white"
        style={{
          fontSize: "clamp(1.875rem, 3vw + 0.5rem, 2.5rem)",
          lineHeight: "1.2",
        }}
      >
        {displayValue}
      </div>
      <div
        className={`font-inter text-blue-50/90 ${labelClassName}`}
        style={{
          fontSize: "clamp(0.875rem, 1vw + 0.25rem, 1rem)",
          lineHeight: "1.5",
          fontWeight: 400,
        }}
      >
        {label}
      </div>
    </div>
  );
}

