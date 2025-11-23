"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Points, Float } from "@react-three/drei";
import * as THREE from "three";

// Type declaration for optional Sentry integration
interface SentryInterface {
  captureException: (error: unknown, context?: { tags?: Record<string, string> }) => void;
  addBreadcrumb: (breadcrumb: {
    category: string;
    message: string;
    level: string;
    data?: Record<string, unknown>;
  }) => void;
}

declare global {
  interface Window {
    Sentry?: SentryInterface;
  }
}

/**
 * Particle Field Component
 * Creates a sparse field of orbiting particles
 */
function ParticleField({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 125 : 250; // 50% reduction on mobile

  const [positions, _colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a sphere around the center
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Blue-tinted colors
      colors[i * 3] = 0.3 + Math.random() * 0.3; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }

    return [positions, colors];
  }, [particleCount]);

  useFrame(() => {
    if (!pointsRef.current || document.hidden) return;

    // Gentle rotation
    pointsRef.current.rotation.y += 0.0005;
    pointsRef.current.rotation.x += 0.0002;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

/**
 * Orbiting Spheres Component
 * Small emissive spheres orbiting the center
 */
function OrbitingSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereCount = 8;

  const spherePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < sphereCount; i++) {
      const angle = (i / sphereCount) * Math.PI * 2;
      const radius = 2.5;
      positions.push([
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 0.5,
        Math.sin(angle) * radius,
      ]);
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || document.hidden) return;

    // Slow orbit
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {spherePositions.map((pos, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={pos}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#0076D1" />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/**
 * Central Icosahedron Component
 * Low-poly rotating geometric shape
 */
function CentralGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current || document.hidden) return;

    // Gentle rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.2, 0]}>
      <meshStandardMaterial
        color="#0076D1"
        wireframe
        transparent
        opacity={0.3}
      />
    </Icosahedron>
  );
}

/**
 * Interactive Cursor Grid Lines
 * Lines connect from 3D background grid to cursor position as it moves
 * Grid covers entire scene background for continuous line formation
 */
function InteractiveCursorGrid({
  mousePosition,
  isMobile,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const linesRef = useRef<THREE.Group>(null);
  const lineObjectsRef = useRef<THREE.Line[]>([]);
  const gridSize = 30; // Larger spread
  const gridDivisions = 25; // More divisions = denser grid = shorter lines
  const maxConnections = isMobile ? 8 : 16; // More connections for better effect
  const gridDepth = 8; // 3D depth layers
  const gridDepthDivisions = 6; // More depth layers for denser 3D grid

  // Generate 3D grid points covering entire background volume
  const gridPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const step = gridSize / gridDivisions;
    const depthStep = gridDepth / gridDepthDivisions;
    
    // Create grid points in 3D space (X, Y, Z) covering entire background
    // Denser grid = more points = shorter lines
    for (let x = -gridSize / 2; x <= gridSize / 2; x += step) {
      for (let y = -4; y <= 4; y += step * 0.6) { // Tighter vertical spacing
        for (let z = -gridDepth / 2; z <= gridDepth / 2; z += depthStep) {
          // Less randomness for more uniform grid
          const offsetX = (Math.random() - 0.5) * step * 0.2;
          const offsetY = (Math.random() - 0.5) * step * 0.2;
          const offsetZ = (Math.random() - 0.5) * depthStep * 0.2;
          
          points.push(new THREE.Vector3(
            x + offsetX,
            y + offsetY,
            z + offsetZ
          ));
        }
      }
    }
    return points;
  }, []);

  // Create line objects with refs
  useEffect(() => {
    const linesGroup = linesRef.current;
    if (!linesGroup) return;

    lineObjectsRef.current = Array.from({ length: maxConnections }).map(() => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([0, -3, 0, 0, -3, 0]);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: "#00BCD4",
        transparent: true,
        opacity: 0,
        linewidth: 1.5,
        depthTest: false, // Allow lines to appear over other objects
      });

      const line = new THREE.Line(geometry, material);
      linesGroup.add(line);
      return line;
    });

    return () => {
      lineObjectsRef.current.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
        linesGroup.remove(line);
      });
      lineObjectsRef.current = [];
    };
  }, [maxConnections]);

  useFrame(({ camera }) => {
    if (!linesRef.current || isMobile || document.hidden) return;

    // Convert normalized mouse position (-1 to 1) to 3D world position
    // mousePosition.current is already normalized from CameraController
    const mouse = new THREE.Vector2(mousePosition.current.x, mousePosition.current.y);
    
    // Create a ray from camera through the mouse position
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    // Project to a plane at Z = 0 (center of scene) for consistent line connections
    // This ensures lines connect to where cursor appears in the scene
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();
    
    // Get the intersection point where the ray hits the plane
    const hasIntersection = raycaster.ray.intersectPlane(plane, intersection);
    
    // Use intersection point if valid, otherwise use a point along the ray
    const finalMousePos = hasIntersection 
      ? intersection 
      : raycaster.ray.at(5, new THREE.Vector3()); // Point 5 units along the ray as fallback

    // Find closest grid points to cursor in 3D space
    const distances = gridPoints
      .map((p) => ({
        point: p,
        distance: p.distanceTo(finalMousePos),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxConnections);

    // Update lines to closest points
    lineObjectsRef.current.forEach((line, i) => {
      const material = line.material as THREE.LineBasicMaterial;

      // Much shorter max distance for tighter, shorter lines
      if (i < distances.length && distances[i].distance < 3.5) {
        const geometry = line.geometry as THREE.BufferGeometry;
        const positions = geometry.attributes.position.array as Float32Array;

        // Set line start (grid point in 3D space) and end (cursor position in 3D)
        positions[0] = distances[i].point.x;
        positions[1] = distances[i].point.y;
        positions[2] = distances[i].point.z;
        positions[3] = finalMousePos.x;
        positions[4] = finalMousePos.y;
        positions[5] = finalMousePos.z;

        geometry.attributes.position.needsUpdate = true;

        // Fade based on distance (shorter lines = brighter)
        const fadeFactor = 1 - distances[i].distance / 3.5;
        material.opacity = Math.max(0.2, Math.min(0.8, fadeFactor));
        material.visible = true;
      } else {
        // Hide line if too far
        material.opacity = 0;
        material.visible = false;
      }
    });
  });

  return <group ref={linesRef} />;
}

/**
 * Camera Controller with Mouse Parallax
 * Damped camera movement based on mouse position
 */
function CameraController({ 
  enableParallax,
  mousePosition,
}: { 
  enableParallax: boolean;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enableParallax) return;

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableParallax, mousePosition]);

  useFrame(() => {
    if (!enableParallax || document.hidden) return;

    // Damped movement
    targetRef.current.x += (mousePosition.current.x * 0.3 - targetRef.current.x) * 0.05;
    targetRef.current.y += (mousePosition.current.y * 0.2 - targetRef.current.y) * 0.05;

    camera.position.x = targetRef.current.x;
    camera.position.y = 1 + targetRef.current.y;
  });

  return null;
}

/**
 * FPS Monitor Component
 * Tracks performance and triggers fallback if needed
 */
function FPSMonitor({ onLowPerformance }: { onLowPerformance: () => void }) {
  const fpsRef = useRef({ frames: 0, lastTime: performance.now(), lowFPSTime: 0 });

  useFrame(() => {
    const currentTime = performance.now();
    fpsRef.current.frames++;

    if (currentTime >= fpsRef.current.lastTime + 1000) {
      const fps = (fpsRef.current.frames * 1000) / (currentTime - fpsRef.current.lastTime);

      if (fps < 35) {
        fpsRef.current.lowFPSTime += currentTime - fpsRef.current.lastTime;

        // If low FPS persists for 3 seconds, trigger fallback
        if (fpsRef.current.lowFPSTime > 3000) {
          console.warn("Low FPS detected, triggering performance fallback");
          // Log to Sentry breadcrumb
          if (typeof window !== "undefined" && window.Sentry) {
            window.Sentry.addBreadcrumb({
              category: "performance",
              message: "LowFPS - HeroAnimation",
              level: "warning",
              data: { fps },
            });
          }
          onLowPerformance();
        }
      } else {
        fpsRef.current.lowFPSTime = 0;
      }

      fpsRef.current.frames = 0;
      fpsRef.current.lastTime = currentTime;
    }
  });

  return null;
}

/**
 * 3D Scene Component
 * Contains all 3D elements
 */
function Scene({ isMobile, onLowPerformance }: { isMobile: boolean; onLowPerformance: () => void }) {
  const mousePosition = useRef({ x: 0, y: 0 });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#0076D1" />

      {/* Central geometry */}
      <CentralGeometry />

      {/* Particle field */}
      <ParticleField isMobile={isMobile} />

      {/* Orbiting spheres */}
      <OrbitingSpheres />

      {/* Interactive cursor grid lines (desktop only) */}
      {!isMobile && (
        <InteractiveCursorGrid mousePosition={mousePosition} isMobile={isMobile} />
      )}

      {/* Camera controller with parallax */}
      <CameraController enableParallax={!isMobile} mousePosition={mousePosition} />

      {/* FPS monitoring */}
      <FPSMonitor onLowPerformance={onLowPerformance} />
    </>
  );
}

/**
 * SVG Fallback Component
 * Static illustration for reduced motion or WebGL errors
 */
function SVGFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center opacity-20">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central geometric shape */}
        <polygon
          points="200,50 300,150 250,275 150,275 100,150"
          stroke="#0076D1"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        <polygon
          points="200,80 270,160 235,250 165,250 130,160"
          stroke="#0076D1"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />

        {/* Orbiting circles */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * 120;
          const y = 200 + Math.sin(rad) * 120;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="6"
              fill="#0076D1"
              opacity="0.6"
            />
          );
        })}

        {/* Particle dots */}
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const radius = 80 + Math.random() * 80;
          const x = 200 + Math.cos(angle) * radius;
          const y = 200 + Math.sin(angle) * radius;
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r="1.5"
              fill="#0076D1"
              opacity="0.3"
            />
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Main Hero Animation Component
 * Handles WebGL initialization, fallbacks, and mobile detection
 */
export default function HeroAnimationComp() {
  const [shouldRender, setShouldRender] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lowPerformance, setLowPerformance] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [canvasKey, setCanvasKey] = useState(0); // Key to force Canvas remount when needed
  const wasVisibleRef = useRef(true); // Track previous visibility state

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Handle visibility changes (tab focus/blur and app switching)
    const handleVisibilityChange = () => {
      const nowVisible = !document.hidden;
      const wasVisible = wasVisibleRef.current;
      wasVisibleRef.current = nowVisible;
      setIsVisible(nowVisible);
      
      // When tab/app becomes visible again, reset everything and force Canvas remount
      if (nowVisible && !wasVisible) {
        console.log("Tab/app became visible - resetting animation state and remounting Canvas");
        setHasError(false);
        setShouldRender(true);
        setLowPerformance(false); // Reset performance state too
        setCanvasKey((prev) => prev + 1); // Force Canvas remount
      }
    };

    // Also handle window focus/blur for app switching
    const handleFocus = () => {
      console.log("Window focused - ensuring animation is visible");
      const wasVisible = wasVisibleRef.current;
      wasVisibleRef.current = true;
      if (!wasVisible) {
        setIsVisible(true);
        setHasError(false);
        setShouldRender(true);
        setCanvasKey((prev) => prev + 1); // Force Canvas remount
      }
    };

    const handleBlur = () => {
      console.log("Window blurred - pausing animation");
      wasVisibleRef.current = false;
      setIsVisible(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [hasError]);

  // Handle WebGL errors and context loss
  const handleCreated = (state: { gl: THREE.WebGLRenderer }) => {
    try {
      // WebGL successfully initialized
      setShouldRender(true);
      setHasError(false);

      // Handle WebGL context loss/restore
      const canvas = state.gl.domElement;
      
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        console.warn("WebGL context lost - will restore when tab becomes visible");
        setHasError(true);
      };

      const handleContextRestored = () => {
        console.log("WebGL context restored - reinitializing animation");
        setHasError(false);
        setShouldRender(true);
      };

      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);
    } catch (error) {
      console.error("WebGL initialization failed:", error);
      setHasError(true);

      // Send to Sentry if available
      if (typeof window !== "undefined" && window.Sentry) {
        window.Sentry.captureException(error, {
          tags: { feature: "hero-animation" },
        });
      }
    }
  };

  const handleLowPerformance = () => {
    setLowPerformance(true);
  };

  // Debug logging (remove in production)
  useEffect(() => {
    console.log("HeroAnimation State:", {
      prefersReducedMotion,
      hasError,
      lowPerformance,
      shouldRender,
      isMobile,
    });
  }, [prefersReducedMotion, hasError, lowPerformance, shouldRender, isMobile]);

  // Show fallback only for reduced motion preference
  // Always render Canvas so it can resume properly when app/tab becomes visible
  if (prefersReducedMotion) {
    console.log("Showing SVG fallback - reduced motion preference");
    return <SVGFallback />;
  }

  // Always render Canvas - it will handle visibility and resume automatically
  // The key ensures Canvas remounts when visibility changes to guarantee proper resume
  console.log("Rendering 3D Canvas", { isVisible, shouldRender, hasError, lowPerformance });
  return (
    <div 
      className="absolute inset-0 h-full w-full" 
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        zIndex: 0,
      }}
    >
      <Canvas
        key={`canvas-${canvasKey}`} // Force remount when visibility changes from hidden to visible
        camera={{ position: [0, 1, 5], fov: 50 }}
        onCreated={handleCreated}
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false, // Better performance
        }}
        frameloop={isVisible ? "always" : "demand"} // Pause when hidden, resume when visible
        style={{ 
          background: "transparent", 
          width: "100%", 
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Scene isMobile={isMobile} onLowPerformance={handleLowPerformance} />
      </Canvas>
    </div>
  );
}

