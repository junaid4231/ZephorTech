"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Points, Float, Sphere, Line } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
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
 * Interactive Cursor-Connected Grid Lines
 * Lines connect from grid intersections to cursor position
 */
function InteractiveCursorGrid({
  mousePosition,
  isMobile,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const linesGroupRef = useRef<THREE.Group>(null);
  const maxConnections = isMobile ? 6 : 12;

  // Generate grid intersection points
  const gridPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const gridSize = 18;
    const divisions = 18;
    const step = gridSize / divisions;

    for (let x = -gridSize / 2; x <= gridSize / 2; x += step) {
      for (let z = -gridSize / 2; z <= gridSize / 2; z += step) {
        points.push(new THREE.Vector3(x, -3, z));
      }
    }
    return points;
  }, []);

  // Create line geometries
  const lines = useMemo(() => {
    return Array.from({ length: maxConnections }, () => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6); // 2 points * 3 coordinates
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return geometry;
    });
  }, [maxConnections]);

  useFrame(() => {
    if (!linesGroupRef.current || isMobile) return;

    // Convert 2D mouse to 3D world position
    const worldMouseX = mousePosition.current.x * 8;
    const worldMouseY = mousePosition.current.y * 4 + 1;
    const worldMouseZ = 2;

    const worldMouse = new THREE.Vector3(worldMouseX, worldMouseY, worldMouseZ);

    // Find closest grid points
    const distances = gridPoints
      .map((point) => ({
        point,
        distance: point.distanceTo(worldMouse),
      }))
      .sort((a, b) => a.distance - b.distance);

    // Update lines
    linesGroupRef.current.children.forEach((child, i) => {
      if (i < maxConnections && distances[i]) {
        const line = child as THREE.Line;
        const geometry = line.geometry as THREE.BufferGeometry;
        const positions = geometry.attributes.position.array as Float32Array;
        const material = line.material as THREE.LineBasicMaterial;

        const gridPoint = distances[i].point;
        const distance = distances[i].distance;

        // Only connect if within range
        if (distance < 10) {
          positions[0] = gridPoint.x;
          positions[1] = gridPoint.y;
          positions[2] = gridPoint.z;
          positions[3] = worldMouseX;
          positions[4] = worldMouseY;
          positions[5] = worldMouseZ;

          geometry.attributes.position.needsUpdate = true;

          // Fade based on distance
          material.opacity = Math.max(0, 1 - distance / 10);
          material.visible = true;
        } else {
          material.visible = false;
        }
      }
    });
  });

  return (
    <group ref={linesGroupRef}>
      {lines.map((geometry, i) => {
        const line = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color: "#00E5FF",
            transparent: true,
            opacity: 0,
            linewidth: 2,
            blending: THREE.AdditiveBlending,
          })
        );
        return <primitive key={i} object={line} />;
      })}
    </group>
  );
}

/**
 * Advanced Particle Trail System
 * Particles follow cursor with trail effect
 */
function ParticleTrailSystem({
  mousePosition,
  isMobile,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const trailCount = isMobile ? 20 : 40;
  const trailPositions = useRef<THREE.Vector3[]>(
    Array.from({ length: trailCount }, () => new THREE.Vector3(0, 1, 5))
  );
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!pointsRef.current || isMobile) return;

    const targetX = mousePosition.current.x * 5;
    const targetY = mousePosition.current.y * 3 + 1;

    // Update trail positions with delay
    trailPositions.current.forEach((pos, i) => {
      const delay = 1 - i / trailCount;
      const easing = 0.15 * delay;

      pos.x += (targetX - pos.x) * easing;
      pos.y += (targetY - pos.y) * easing;
      pos.z = 3 - i * 0.05;
    });

    // Update geometry
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    trailPositions.current.forEach((pos, i) => {
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
    });
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(trailCount * 3);
    trailPositions.current.forEach((pos, i) => {
      arr[i * 3] = pos.x;
      arr[i * 3 + 1] = pos.y;
      arr[i * 3 + 2] = pos.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [trailCount]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#00E5FF"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Electron-Orbital Spheres
 * Spheres orbit like electrons around nucleus in multiple orbital planes
 */
function ElectronOrbitalSpheres({
  mousePosition,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRefs = useRef<Array<THREE.Mesh | null>>([]);

  const sphereData = useMemo(() => {
    const count = 8;
    const data: Array<{
      orbitRadius: number;
      orbitSpeed: number;
      orbitalPlane: number;
      color: string;
      emissive: string;
      size: number;
    }> = [];

    // Premium color palette
    const colors = [
      { color: "#0066FF", emissive: "#42A5F5" },
      { color: "#0076D1", emissive: "#64B5F6" },
      { color: "#2196F3", emissive: "#90CAF9" },
      { color: "#00ACC1", emissive: "#26C6DA" },
      { color: "#0288D1", emissive: "#03A9F4" },
      { color: "#00BCD4", emissive: "#4DD0E1" },
      { color: "#0277BD", emissive: "#29B6F6" },
      { color: "#0097A7", emissive: "#00E5FF" },
    ];

    for (let i = 0; i < count; i++) {
      // Three orbital "shells" like electrons
      const shell = i % 3;
      const orbitRadius = 4 + shell * 0.8; // Inner: 4, Mid: 4.8, Outer: 5.6

      data.push({
        orbitRadius,
        orbitSpeed: 0.0015 - shell * 0.0003, // Inner faster, outer slower
        orbitalPlane: (i % 3) * (Math.PI / 3), // 0°, 60°, 120° planes
        ...colors[i],
        size: 0.18, // Larger base size
      });
    }
    return data;
  }, []);

  useFrame(({ clock, camera }) => {
    if (!groupRef.current || document.hidden) return;

    // Gentle group rotation
    groupRef.current.rotation.y += 0.001;

    // Individual sphere behavior
    sphereRefs.current.forEach((sphere, i) => {
      if (!sphere) return;

      const data = sphereData[i];
      const time = clock.elapsedTime;

      // Calculate orbital position
      const orbitAngle = time * data.orbitSpeed + (i / sphereData.length) * Math.PI * 2;
      const tilt = Math.PI / 6; // 30-degree tilt

      // Base orbital position
      const orbitX = Math.cos(orbitAngle) * data.orbitRadius;
      const orbitZ = Math.sin(orbitAngle) * data.orbitRadius;
      const orbitY = Math.sin(orbitAngle * 2) * tilt;

      // Apply orbital plane rotation (3D rotation matrix)
      const cosPlane = Math.cos(data.orbitalPlane);
      const sinPlane = Math.sin(data.orbitalPlane);

      const finalX = orbitX * cosPlane - orbitZ * sinPlane;
      const finalZ = orbitX * sinPlane + orbitZ * cosPlane;
      const finalY = orbitY;

      // REFINED Mouse interaction (minimal)
      const mouseInfluence = 0.2;
      const mouseDist = Math.sqrt(
        Math.pow(mousePosition.current.x, 2) + Math.pow(mousePosition.current.y, 2)
      );

      const attractionThreshold = 0.3;
      const attractionFactor =
        mouseDist > attractionThreshold ? Math.min((mouseDist - attractionThreshold) * 0.2, 0.3) : 0;

      sphere.position.x = finalX + mousePosition.current.x * mouseInfluence * attractionFactor;
      sphere.position.y = finalY + mousePosition.current.y * mouseInfluence * attractionFactor * 0.2;
      sphere.position.z = finalZ;

      // IMPROVED Perspective scaling
      const distanceToCamera = sphere.position.distanceTo(camera.position);
      const perspectiveScale = Math.max(0.4, Math.min(1.0, distanceToCamera / 8));

      // Elegant pulsing
      const pulseFactor = 1 + Math.sin(time * 1.2 + i * 0.6) * 0.06;
      sphere.scale.setScalar(pulseFactor * perspectiveScale);

      // Breathing glow
      const material = sphere.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.8 + Math.sin(time * 1.8 + i * 0.4) * 0.3;

      // Self-rotation
      sphere.rotation.y += 0.008;
      sphere.rotation.x += 0.004;
    });
  });

  return (
    <group ref={groupRef}>
      {sphereData.map((data, i) => (
        <Float key={i} speed={1.2 + (i % 3) * 0.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Sphere
            ref={(el) => {
              sphereRefs.current[i] = el;
            }}
            args={[data.size, 32, 32]}
          >
            <meshStandardMaterial
              color={data.color}
              emissive={data.emissive}
              emissiveIntensity={0.8}
              metalness={0.5}
              roughness={0.1}
              transparent
              opacity={0.9}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

/**
 * Enhanced Central Nucleus Geometry
 * Complex morphing geometry with orbital ring and fractal elements
 */
function CentralNucleusGeometry() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const fractalRefs = useRef<Array<THREE.Mesh | null>>([]);

  useFrame(({ clock }) => {
    if (document.hidden) return;

    const time = clock.elapsedTime;

    // Outer wireframe
    if (outerRef.current) {
      outerRef.current.rotation.x += 0.001;
      outerRef.current.rotation.y += 0.0015;
      outerRef.current.rotation.z += 0.0008;
    }

    // Inner solid (counter-rotation)
    if (innerRef.current) {
      innerRef.current.rotation.x -= 0.0012;
      innerRef.current.rotation.y -= 0.002;
    }

    // Orbital ring 1 (horizontal)
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.015;
      const scale = 1 + Math.sin(time * 1.5) * 0.15;
      ringRef.current.scale.setScalar(scale);
    }

    // Orbital ring 2 (vertical)
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += 0.018;
      const scale = 1 + Math.cos(time * 1.3) * 0.12;
      ring2Ref.current.scale.setScalar(scale);
    }

    // Fractal elements
    fractalRefs.current.forEach((fractal, i) => {
      if (fractal) {
        fractal.rotation.x += 0.02;
        fractal.rotation.y += 0.015;
        const pulse = 1 + Math.sin(time * 2 + i) * 0.2;
        fractal.scale.setScalar(pulse);
      }
    });
  });

  return (
    <group>
      {/* Outer wireframe icosahedron */}
      <Icosahedron ref={outerRef} args={[1.6, 0]}>
        <meshStandardMaterial color="#0076D1" wireframe transparent opacity={0.4} />
      </Icosahedron>

      {/* Inner solid icosahedron */}
      <Icosahedron ref={innerRef} args={[1.3, 1]}>
        <meshStandardMaterial
          color="#004E8F"
          emissive="#0076D1"
          emissiveIntensity={0.4}
          transparent
          opacity={0.25}
          flatShading
        />
      </Icosahedron>

      {/* Orbital ring 1 (horizontal) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#00BCD4"
          emissive="#00E5FF"
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital ring 2 (vertical) */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.4, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#0288D1"
          emissive="#42A5F5"
          emissiveIntensity={1.0}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Fractal octahedrons */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 1.8;
        return (
          <mesh
            key={i}
            ref={(el) => {
              fractalRefs.current[i] = el;
            }}
            position={[Math.cos(angle) * radius, Math.sin(angle) * 0.5, Math.sin(angle) * radius]}
          >
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial
              color="#42A5F5"
              emissive="#64B5F6"
              emissiveIntensity={0.8}
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * Enhanced Particle Field with Network Connections
 */
function EnhancedParticleField({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);
  const particleCount = isMobile ? 100 : 150;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, [particleCount]);

  // Create connections
  const connections = useMemo(() => {
    const maxConnections = isMobile ? 10 : 20;
    const maxDistance = 2.5;
    const lines: Array<[THREE.Vector3, THREE.Vector3]> = [];

    for (let i = 0; i < particleCount && lines.length < maxConnections; i++) {
      const p1 = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);

      for (let j = i + 1; j < particleCount && lines.length < maxConnections; j++) {
        const p2 = new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);

        const distance = p1.distanceTo(p2);
        if (distance < maxDistance) {
          lines.push([p1, p2]);
        }
      }
    }

    return lines;
  }, [positions, particleCount, isMobile]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || document.hidden) return;

    pointsRef.current.rotation.y += 0.0002;
    pointsRef.current.rotation.x += 0.0001;

    // Animate connection lines
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.08 + Math.sin(clock.elapsedTime * 1.5 + i * 0.5) * 0.06;
      });
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <pointsMaterial
          size={0.025}
          color="#60A5FA"
          sizeAttenuation
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <group ref={linesRef}>
        {connections.map((line, i) => (
          <Line
            key={i}
            points={line}
            color="#0076D1"
            lineWidth={0.4}
            transparent
            opacity={0.15}
          />
        ))}
      </group>
    </group>
  );
}

/**
 * Tech Grid Background
 */
function TechGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(() => {
    if (!gridRef.current || document.hidden) return;
    gridRef.current.rotation.y += 0.0001;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, "#0076D1", "#004E8F"]}
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial transparent opacity={0.08} />
    </gridHelper>
  );
}

/**
 * Main Scene with All Elements and Advanced Lighting
 */
function ProScene({
  isMobile,
  onLowPerformance,
}: {
  isMobile: boolean;
  onLowPerformance: () => void;
}) {
  const { camera } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });
  const fpsRef = useRef({ frames: 0, lastTime: performance.now(), lowFPSTime: 0 });
  const spotLightRef = useRef<THREE.SpotLight>(null);

  // Mouse tracking
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useFrame(({ clock }) => {
    if (document.hidden) return;

    // FPS monitoring
    fpsRef.current.frames++;
    const currentTime = performance.now();

    if (currentTime >= fpsRef.current.lastTime + 1000) {
      const fps = (fpsRef.current.frames * 1000) / (currentTime - fpsRef.current.lastTime);

      if (fps < 30) {
        fpsRef.current.lowFPSTime += currentTime - fpsRef.current.lastTime;

        if (fpsRef.current.lowFPSTime > 3000) {
          console.warn("Low FPS detected, triggering fallback");
          if (typeof window !== "undefined" && window.Sentry) {
            window.Sentry.addBreadcrumb({
              category: "performance",
              message: "LowFPS - ProAnimation",
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

    // Refined camera movement
    if (!isMobile) {
      const targetX = mousePosition.current.x * 0.4;
      const targetY = mousePosition.current.y * 0.25 + 1;
      const targetZ = 6 - Math.abs(mousePosition.current.x) * 0.15;

      camera.position.x += (targetX - camera.position.x) * 0.025;
      camera.position.y += (targetY - camera.position.y) * 0.025;
      camera.position.z += (targetZ - camera.position.z) * 0.02;

      camera.position.x += Math.sin(clock.elapsedTime * 0.2) * 0.01;
      camera.position.y += Math.cos(clock.elapsedTime * 0.15) * 0.01;

      camera.lookAt(0, 0, 0);
    }

    // Dynamic spotlight
    if (spotLightRef.current && !isMobile) {
      spotLightRef.current.position.x = mousePosition.current.x * 6;
      spotLightRef.current.position.y = 8;
      spotLightRef.current.position.z = mousePosition.current.y * 3 + 6;

      spotLightRef.current.target.position.set(
        mousePosition.current.x * 3,
        0,
        mousePosition.current.y * 1.5
      );
      spotLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#42A5F5" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#0076D1" />
      <pointLight position={[0, 0, 0]} intensity={1.2} color="#80D8FF" distance={12} decay={2} />
      <pointLight position={[8, 0, 0]} intensity={0.6} color="#00BCD4" distance={15} decay={2} />
      <pointLight position={[-8, 0, 0]} intensity={0.6} color="#2196F3" distance={15} decay={2} />

      {/* Dynamic Spotlight (desktop only) */}
      {!isMobile && (
        <spotLight
          ref={spotLightRef}
          position={[0, 8, 6]}
          intensity={1.5}
          angle={0.5}
          penumbra={0.5}
          color="#00E5FF"
          distance={20}
          decay={2}
        />
      )}

      {/* Scene Elements */}
      <CentralNucleusGeometry />
      <ElectronOrbitalSpheres mousePosition={mousePosition} />
      <EnhancedParticleField isMobile={isMobile} />
      {!isMobile && <ParticleTrailSystem mousePosition={mousePosition} isMobile={isMobile} />}
      {!isMobile && <InteractiveCursorGrid mousePosition={mousePosition} isMobile={isMobile} />}
      {!isMobile && <TechGrid />}
    </>
  );
}

/**
 * Enhanced SVG Fallback
 */
function SVGFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
      >
        <defs>
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004E8F" />
            <stop offset="100%" stopColor="#0076D1" />
          </linearGradient>
        </defs>
        <polygon
          points="250,150 325,200 325,300 250,350 175,300 175,200"
          stroke="url(#brandGradient)"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />
        <polygon
          points="250,175 300,210 300,290 250,325 200,290 200,210"
          stroke="#0076D1"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        <circle cx="250" cy="100" r="8" fill="#0076D1" opacity="0.6" />
        <circle cx="375" cy="250" r="8" fill="#0076D1" opacity="0.6" />
        <circle cx="250" cy="400" r="8" fill="#0076D1" opacity="0.6" />
        <circle cx="125" cy="250" r="8" fill="#004E8F" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * Main Professional Hero Animation Component
 */
export default function HeroAnimationPro() {
  const [shouldRender, setShouldRender] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lowPerformance, setLowPerformance] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleCreated = () => {
    try {
      setShouldRender(true);
      console.log("✅ Professional 3D Animation Loaded Successfully");
    } catch (error) {
      console.error("WebGL initialization failed:", error);
      setHasError(true);

      if (typeof window !== "undefined" && window.Sentry) {
        window.Sentry.captureException(error, {
          tags: { feature: "hero-animation-pro" },
        });
      }
    }
  };

  const handleLowPerformance = () => {
    setLowPerformance(true);
  };

  if (prefersReducedMotion || hasError || lowPerformance) {
    console.log("Showing SVG fallback");
    return <SVGFallback />;
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        onCreated={handleCreated}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ProScene isMobile={isMobile} onLowPerformance={handleLowPerformance} />

        {/* Post-processing Effects (desktop only) */}
        {!isMobile && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={1.2}
              radius={0.8}
              blendFunction={BlendFunction.SCREEN}
            />
            <ChromaticAberration offset={[0.0008, 0.0008]} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

