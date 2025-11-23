"use client";

import { useEffect, useState, useRef } from "react";

interface UseAnimatedCounterOptions {
  duration?: number;
  startDelay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

/**
 * Hook for animating numbers from 0 to target value
 * Returns the current animated value
 */
export function useAnimatedCounter(
  target: number,
  options: UseAnimatedCounterOptions = {}
) {
  const {
    duration = 2000,
    startDelay = 0,
    decimals = 0,
    suffix = "",
    prefix = "",
  } = options;

  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Delay start if specified
    const delayTimeout = setTimeout(() => {
      setIsAnimating(true);
      startTimeRef.current = Date.now();

      const animate = () => {
        if (!startTimeRef.current) return;

        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = target * easeOut;

        setCount(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
          setIsAnimating(false);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, startDelay]);

  // Format the number with decimals, prefix, and suffix
  const formattedValue = (() => {
    const rounded = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();
    return `${prefix}${rounded}${suffix}`;
  })();

  return { count, formattedValue, isAnimating };
}

