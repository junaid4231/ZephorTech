"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SPLASH_STORAGE_KEY = "zephortech_splash_seen";
const MIN_DISPLAY_TIME = 1500; // 1.5 seconds minimum

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if user has seen splash before
    const hasSeenSplash = localStorage.getItem(SPLASH_STORAGE_KEY);
    
    if (!hasSeenSplash) {
      setShouldShow(true);
      setIsVisible(true);
      
      // Mark as seen immediately to prevent showing again
      localStorage.setItem(SPLASH_STORAGE_KEY, "true");
      
      // Auto-dismiss after minimum display time
      const timer = setTimeout(() => {
        setIsExiting(true);
        
        // Remove from DOM after fade-out animation
        setTimeout(() => {
          setIsVisible(false);
        }, 500); // Match fade-out duration
      }, MIN_DISPLAY_TIME);
      
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, []);

  // Don't render if not showing
  if (!shouldShow || !isVisible) {
    return null;
  }

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${
        isExiting ? "splash-fade-out" : "splash-fade-in"
      }`}
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* Animated Background Grid */}
      <div
        className={`absolute inset-0 opacity-10 ${
          prefersReducedMotion ? "" : "splash-grid-pulse"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 118, 209, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 118, 209, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gradient Orbs */}
      {!prefersReducedMotion && (
        <>
          <div
            className="absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-20 blur-3xl splash-float"
            style={{
              background: "radial-gradient(circle, rgba(0, 118, 209, 0.4), transparent)",
            }}
          />
          <div
            className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full opacity-20 blur-3xl splash-float-reverse"
            style={{
              background: "radial-gradient(circle, rgba(0, 78, 143, 0.4), transparent)",
            }}
          />
        </>
      )}

      {/* Floating Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => {
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 4;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            return (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full splash-particle-float"
                style={{
                  background: "rgba(0, 118, 209, 0.6)",
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  boxShadow: "0 0 10px rgba(0, 118, 209, 0.8)",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo Container with Animation */}
        <div
          className={`relative mb-8 flex items-center justify-center ${
            prefersReducedMotion ? "" : "splash-logo-reveal"
          }`}
        >
          {/* Logo Glow Effect */}
          {!prefersReducedMotion && (
            <div
              className="absolute rounded-full opacity-50 blur-3xl splash-pulse"
              style={{
                background: "radial-gradient(circle, rgba(0, 118, 209, 0.6), transparent)",
                width: "300px",
                height: "300px",
                transform: "translate(-50%, -50%)",
                left: "50%",
                top: "50%",
              }}
            />
          )}

          {/* Logo Image */}
          <div className="relative z-10">
            <Image
              src="/logo.png"
              alt="ZephorTech"
              width={280}
              height={90}
              priority
              className="h-auto w-auto object-contain"
              style={{
                maxWidth: "280px",
                height: "auto",
                filter: "drop-shadow(0 0 30px rgba(0, 118, 209, 0.5))",
              }}
            />
          </div>
        </div>

        {/* Loading Indicator */}
        {!prefersReducedMotion && (
          <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full splash-loading-bar"
              style={{
                background: "linear-gradient(90deg, #004E8F, #0076D1, #00A8FF)",
              }}
            />
          </div>
        )}

        {/* Tagline (Optional - subtle) */}
        <p
          className={`mt-6 text-sm font-light uppercase tracking-[0.3em] text-blue-300/60 ${
            prefersReducedMotion ? "" : "splash-fade-in-delayed"
          }`}
          style={{
            opacity: prefersReducedMotion ? 1 : 0,
          }}
        >
          Transforming Ideas Into Digital Excellence
        </p>
      </div>
    </div>
  );
}

