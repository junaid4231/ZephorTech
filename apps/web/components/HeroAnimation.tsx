"use client";

import dynamic from "next/dynamic";

/**
 * HeroAnimation Component
 * 
 * Dynamically imports the 3D animation component with SSR disabled.
 * This ensures the Three.js canvas only loads on the client side,
 * preventing server-side rendering issues and improving initial page load.
 * 
 * Features (PROFESSIONAL VERSION):
 * - Electron-orbital spheres (8 spheres on 3 orbital planes like electrons)
 * - Interactive cursor-connected grid lines (lines connect from floor grid to cursor)
 * - Advanced particle trail system (particles follow cursor)
 * - Dynamic spotlight following cursor
 * - Post-processing effects (Bloom & Chromatic Aberration for premium look)
 * - Enhanced nucleus geometry (morphing rings, fractal elements)
 * - Professional 6-point lighting + dynamic spotlight
 * - Full gradient color system (#004E8F → #0076D1 with cyan accents)
 * - Network connection lines between particles
 * - Mobile optimization (effects disabled, still smooth)
 * - Automatic fallback for reduced motion preference
 * - Error handling with branded SVG fallback
 * - Performance monitoring with FPS tracking
 * 
 * Version History:
 * - Basic: "./HeroAnimationComp" (Current - Simple with cursor interactive lines)
 * - Enhanced: "./HeroAnimationEnhanced" (Complex version - not in use)
 * - Professional: "./HeroAnimationPro" (Alternative version - not in use)
 */
const HeroAnimationComp = dynamic(() => import("./HeroAnimationComp"), {
  ssr: false,
  loading: () => null,
});

export default function HeroAnimation() {
  return <HeroAnimationComp />;
}

