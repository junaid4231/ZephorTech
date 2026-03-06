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
  label?: string;
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
  // Use a lenient rootMargin so hero-level counters (already in the viewport on load) fire immediately
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px",
  });

  // Pass isVisible as `enabled` — animation starts from 0 the moment the element enters the viewport
  const { formattedValue } = useAnimatedCounter(target, {
    duration,
    startDelay,
    decimals,
    suffix,
    prefix,
    enabled: isVisible,
  });

  // formattedValue is always "prefix + 0 + suffix" until enabled, then counts up to target
  const displayValue = formattedValue;

  return (
    <div ref={ref} className={className}>
      <div
        className="font-poppins mb-2 font-bold text-white"
        style={{
          fontSize: "clamp(1.875rem, 3vw + 0.5rem, 2.5rem)",
          lineHeight: "1.2",
        }}
      >
        {displayValue}
      </div>
      {label && (
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
      )}
    </div>
  );
}
