"use client";

import React, { useState, useEffect, useRef } from "react";

interface HeroVideoBackgroundProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

/**
 * HeroVideoBackground Component
 * 
 * Professional video background for hero sections with:
 * - Lazy loading for performance
 * - Mobile detection and fallback
 * - Reduced motion detection
 * - Error handling with gradient fallback
 * - Optimized video attributes
 */
export default function HeroVideoBackground({
  videoSrc = "/videos/hero-video.mp4",
  posterSrc = "/videos/hero-poster.jpg",
  className = "",
}: HeroVideoBackgroundProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices and reduced motion preference
  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    // Reduced motion detection
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    // Lazy load video when hero is visible (Intersection Observer)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isMobile && !prefersReducedMotion) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      observer.disconnect();
    };
  }, [isMobile, prefersReducedMotion]);

  // Handle video errors
  const handleVideoError = () => {
    setHasError(true);
    if (videoRef.current) {
      videoRef.current.style.display = "none";
    }
  };

  // Don't show video on mobile, reduced motion, or if error occurred
  const shouldShowVideo =
    shouldLoadVideo && !isMobile && !prefersReducedMotion && !hasError;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "85vh",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {shouldShowVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onError={handleVideoError}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            minHeight: "85vh",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
      {/* Fallback gradient is handled by parent Hero component */}
    </div>
  );
}

