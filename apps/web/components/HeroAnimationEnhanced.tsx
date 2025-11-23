"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Points, Float, Sphere, Line } from "@react-three/drei";
// Post-processing disabled for performance (was causing WebGL context loss)
// import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
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
 * ENHANCED Particle Field Component
 * Creates a sparse field of orbiting particles with connecting lines
 */
function ParticleField({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);
  const particleCount = isMobile ? 100 : 150; // Reduced for better performance

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a sphere around the center
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, [particleCount]);

  // Create connections between nearby particles (network effect)
  const connections = useMemo(() => {
    const maxConnections = isMobile ? 10 : 20; // Reduced for performance
    const maxDistance = 2.5;
    const lines: Array<[THREE.Vector3, THREE.Vector3]> = [];

    for (let i = 0; i < particleCount && lines.length < maxConnections; i++) {
      const p1 = new THREE.Vector3(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );

      for (let j = i + 1; j < particleCount && lines.length < maxConnections; j++) {
        const p2 = new THREE.Vector3(
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2]
        );

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

    // Gentle rotation
    pointsRef.current.rotation.y += 0.0003;
    pointsRef.current.rotation.x += 0.0001;

    // Animate connection lines opacity
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        // Pulsing effect
        material.opacity = 0.1 + Math.sin(clock.elapsedTime * 2 + i * 0.5) * 0.1;
      });
    }
  });

  return (
    <group>
      {/* Particles */}
      <Points ref={pointsRef} positions={positions} stride={3}>
        <pointsMaterial
          size={0.03}
          color="#60A5FA"
          sizeAttenuation
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Connection Lines (Network Effect) */}
      <group ref={linesRef}>
        {connections.map((line, i) => (
          <Line
            key={i}
            points={line}
            color="#0076D1"
            lineWidth={0.5}
            transparent
            opacity={0.2}
          />
        ))}
      </group>
    </group>
  );
}

/**
 * PERFECTED Orbiting Spheres with Cursor Interaction
 * Premium spheres that react to mouse with elegant animations
 */
function OrbitingSpheres({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRefs = useRef<Array<THREE.Mesh | null>>([]);

  const sphereData = useMemo(() => {
    const count = 8; // Optimal number for balance
    const data: Array<{
      position: THREE.Vector3;
      basePosition: THREE.Vector3;
      color: string;
      emissive: string;
      size: number;
      speed: number;
      orbitSpeed: number;
      orbitalPlane: number;
      shellRadius: number;
    }> = [];

    // Premium color palette - refined gradient
    const colors = [
      { color: "#0066FF", emissive: "#1E88E5" }, // Vivid blue
      { color: "#0076D1", emissive: "#42A5F5" }, // Brand primary
      { color: "#2196F3", emissive: "#64B5F6" }, // Sky blue
      { color: "#42A5F5", emissive: "#90CAF9" }, // Light blue
      { color: "#00ACC1", emissive: "#26C6DA" }, // Teal blue
      { color: "#0097A7", emissive: "#00BCD4" }, // Deep teal
      { color: "#0288D1", emissive: "#03A9F4" }, // Bright blue
      { color: "#0277BD", emissive: "#29B6F6" }, // Ocean blue
    ];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4.5;
      const height = Math.cos(angle * 2) * 1.2;

      const pos = new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );

      data.push({
        position: pos.clone(),
        basePosition: pos.clone(),
        ...colors[i],
        size: 0.18, // Slightly increased (was 0.15)
        speed: 1.5 + (i % 3) * 0.3,
        orbitSpeed: 0.001 + (i % 2) * 0.0005,
        orbitalPlane: (i % 3) * (Math.PI / 3), // 3 different orbital planes (like electron shells)
        shellRadius: 4.0 + (i % 3) * 0.5, // Different radii per shell
      });
    }
    return data;
  }, []);

  useFrame(({ clock, camera }) => {
    if (!groupRef.current || document.hidden) return;

    // Smooth orbital rotation
    groupRef.current.rotation.y += 0.0015;

    // Individual sphere behavior
    sphereRefs.current.forEach((sphere, i) => {
      if (!sphere) return;

      const data = sphereData[i];
      const time = clock.elapsedTime;

      // Electron-like orbital movement with multiple planes
      const orbitAngle = time * data.orbitSpeed + (i / sphereData.length) * Math.PI * 2;
      const baseRadius = data.shellRadius;
      const tilt = Math.PI / 6; // 30-degree tilt per orbital plane
      
      // Calculate position on orbital plane
      const orbitX = Math.cos(orbitAngle) * baseRadius;
      const orbitZ = Math.sin(orbitAngle) * baseRadius;
      const orbitY = Math.sin(orbitAngle + data.orbitalPlane) * tilt * 1.5;
      
      // Apply 3D rotation for orbital plane orientation
      const rotatedX = orbitX * Math.cos(data.orbitalPlane) - orbitZ * Math.sin(data.orbitalPlane);
      const rotatedZ = orbitX * Math.sin(data.orbitalPlane) + orbitZ * Math.cos(data.orbitalPlane);

      // REFINED Mouse interaction - subtle, elegant response
      const mouseInfluence = 0.3; // Reduced from 0.8 (much less sensitive)
      const mouseDist = Math.sqrt(
        Math.pow(mousePosition.current.x, 2) + Math.pow(mousePosition.current.y, 2)
      );
      
      // Only react when mouse moves significantly
      const attractionThreshold = 0.2;
      const attractionFactor = mouseDist > attractionThreshold 
        ? Math.min((mouseDist - attractionThreshold) * 0.3, 0.5) 
        : 0;

      sphere.position.x = rotatedX + mousePosition.current.x * mouseInfluence * attractionFactor;
      sphere.position.y = orbitY + mousePosition.current.y * mouseInfluence * attractionFactor * 0.3;
      sphere.position.z = rotatedZ;

      // PERSPECTIVE SCALING - spheres get smaller when closer to camera (improved)
      const distanceToCamera = sphere.position.distanceTo(camera.position);
      const perspectiveScale = Math.max(0.4, Math.min(1.0, distanceToCamera / 8));
      
      // Elegant pulsing combined with perspective
      const pulseFactor = 1 + Math.sin(time * 1.5 + i * 0.7) * 0.08;
      sphere.scale.setScalar(pulseFactor * perspectiveScale);

      // Breathing glow
      const material = sphere.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.7 + Math.sin(time * 2 + i * 0.5) * 0.3;

      // Gentle rotation
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.005;
    });
  });

  return (
    <group ref={groupRef}>
      {sphereData.map((data, i) => (
        <Float 
          key={i} 
          speed={data.speed} 
          rotationIntensity={0.1} 
          floatIntensity={0.4}
        >
          <Sphere 
            ref={(el) => { sphereRefs.current[i] = el; }}
            position={data.position} 
            args={[data.size, 32, 32]}
          >
            <meshStandardMaterial
              color={data.color}
              emissive={data.emissive}
              emissiveIntensity={0.7}
              metalness={0.4}
              roughness={0.1}
              transparent
              opacity={0.92}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

/**
 * ENHANCED Central Geometry with Morphing Effects
 * Dual-layer icosahedron with orbital ring and fractal elements
 */
function CentralGeometry() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Create fractal geometries once
  const fractalGeometries = useMemo(() => {
    return [0, 1, 2].map(() => new THREE.IcosahedronGeometry(0.2, 0));
  }, []);

  useFrame(({ clock }) => {
    if (document.hidden) return;

    if (outerRef.current) {
      outerRef.current.rotation.x += 0.001;
      outerRef.current.rotation.y += 0.002;
      outerRef.current.rotation.z += 0.0005;
    }

    if (innerRef.current) {
      // Counter-rotation for depth effect
      innerRef.current.rotation.x -= 0.0015;
      innerRef.current.rotation.y -= 0.0025;
    }

    // Morphing orbital ring
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z += 0.02;

      // Pulsing scale
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.2;
      ringRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Outer wireframe */}
      <Icosahedron ref={outerRef} args={[1.5, 0]}>
        <meshStandardMaterial
          color="#0076D1"
          wireframe
          transparent
          opacity={0.4}
        />
      </Icosahedron>

      {/* Inner solid with gradient-like emissive */}
      <Icosahedron ref={innerRef} args={[1.2, 1]}>
        <meshStandardMaterial
          color="#004E8F"
          emissive="#0076D1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
          flatShading
        />
      </Icosahedron>

      {/* Electron orbital ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#00BCD4"
          emissive="#00E5FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Fractal-like smaller geometries */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5]}
            geometry={fractalGeometries[i]}
          >
            <meshStandardMaterial
              color="#42A5F5"
              emissive="#64B5F6"
              emissiveIntensity={0.6}
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * Interactive Cursor Grid - Lines connect from grid to cursor
 * Professional cursor-responsive grid system
 */
function InteractiveCursorGrid({
  mousePosition,
  isMobile,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const linesRef = useRef<THREE.Group>(null);
  const gridSize = 20;
  const gridDivisions = 20;
  const maxConnections = isMobile ? 6 : 12; // Reduced for performance

  // Generate grid intersection points
  const gridPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const step = gridSize / gridDivisions;
    for (let x = -gridSize / 2; x <= gridSize / 2; x += step) {
      for (let z = -gridSize / 2; z <= gridSize / 2; z += step) {
        points.push(new THREE.Vector3(x, -3, z));
      }
    }
    return points;
  }, []);


  // Create line objects with refs
  const lineObjectsRef = useRef<THREE.Line[]>([]);

  useEffect(() => {
    const linesGroup = linesRef.current;
    if (!linesGroup) return;

    // Create line objects
    lineObjectsRef.current = Array.from({ length: maxConnections }).map(() => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([0, -3, 0, 0, -3, 0]);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: "#00BCD4",
        transparent: true,
        opacity: 0,
        linewidth: 1.5,
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

  useFrame(() => {
    if (!linesRef.current || isMobile || document.hidden) return;

    // Convert mouse to world position (matching camera perspective)
    const worldMouse = new THREE.Vector3(
      mousePosition.current.x * 10,
      mousePosition.current.y * 5 + 1,
      0
    );

    // Find closest grid points to cursor
    const distances = gridPoints
      .map((p) => ({
        point: p,
        distance: p.distanceTo(worldMouse),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxConnections);

    // Update lines to closest points
    lineObjectsRef.current.forEach((line, i) => {
      const material = line.material as THREE.LineBasicMaterial;

      if (i < distances.length && distances[i].distance < 8) {
        const geometry = line.geometry as THREE.BufferGeometry;
        const positions = geometry.attributes.position.array as Float32Array;

        // Set line start (grid point) and end (cursor position)
        positions[0] = distances[i].point.x;
        positions[1] = distances[i].point.y;
        positions[2] = distances[i].point.z;
        positions[3] = worldMouse.x;
        positions[4] = worldMouse.y;
        positions[5] = worldMouse.z;

        geometry.attributes.position.needsUpdate = true;

        // Fade based on distance
        const fadeFactor = 1 - distances[i].distance / 8;
        material.opacity = Math.max(0.1, Math.min(0.6, fadeFactor));
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
 * ENHANCED Tech Grid Background
 * Subtle grid for tech aesthetic
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
      <meshBasicMaterial transparent opacity={0.1} />
    </gridHelper>
  );
}

/**
 * Advanced Particle Effects System
 * Cursor trails and glowing connections
 */
function AdvancedParticleEffects({
  mousePosition,
  isMobile,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const trailRef = useRef<THREE.Points>(null);
  const trailCount = isMobile ? 15 : 30; // Reduced for performance
  const trailPositions = useRef<Float32Array>(
    new Float32Array(trailCount * 3).fill(0)
  );

  useFrame(() => {
    if (!trailRef.current || isMobile || document.hidden) return;

    // Update trail particles (follow cursor with delay)
    const targetX = mousePosition.current.x * 5;
    const targetY = mousePosition.current.y * 3;
    const targetZ = 0;

    for (let i = trailCount - 1; i > 0; i--) {
      const prevIndex = (i - 1) * 3;
      const currIndex = i * 3;

      trailPositions.current[currIndex] = trailPositions.current[prevIndex];
      trailPositions.current[currIndex + 1] = trailPositions.current[prevIndex + 1];
      trailPositions.current[currIndex + 2] = trailPositions.current[prevIndex + 2];
    }

    // Update first particle to cursor position
    trailPositions.current[0] = targetX;
    trailPositions.current[1] = targetY;
    trailPositions.current[2] = targetZ;

    if (trailRef.current.geometry) {
      const geometry = trailRef.current.geometry as THREE.BufferGeometry;
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(trailPositions.current, 3)
      );
      geometry.attributes.position.needsUpdate = true;
    }
  });

  if (isMobile) return null;

  return (
    <Points ref={trailRef} positions={trailPositions.current}>
      <pointsMaterial
        size={0.05}
        color="#00E5FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * ENHANCED Scene Composition
 * Includes performance monitoring, advanced lighting, and effects
 */
function Scene({
  isMobile,
  onLowPerformance,
  lowPerformance,
}: {
  isMobile: boolean;
  onLowPerformance: () => void;
  lowPerformance: boolean;
}) {
  const { camera, gl } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });
  const fpsRef = useRef({ frames: 0, lastTime: performance.now(), lowFPSTime: 0 });
  const spotLightRef = useRef<THREE.SpotLight>(null);

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost - triggering fallback");
      onLowPerformance();
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
    };

    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl, onLowPerformance]);

  // Mouse parallax (desktop only)
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

      // More lenient FPS threshold (25 FPS for 5 seconds)
      if (fps < 25) {
        fpsRef.current.lowFPSTime += currentTime - fpsRef.current.lastTime;

        if (fpsRef.current.lowFPSTime > 5000) {
          console.warn("Low FPS detected, triggering performance fallback");
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

    // REFINED camera movement (desktop only) - subtle, elegant
    if (!isMobile) {
      // Gentle parallax with smooth easing (reduced sensitivity)
      const targetX = mousePosition.current.x * 0.5; // Reduced from 1.2
      const targetY = mousePosition.current.y * 0.3 + 1; // Reduced from 0.8
      const targetZ = 6 - Math.abs(mousePosition.current.x) * 0.2; // Reduced from 0.5

      // Slower easing for smoother feel
      camera.position.x += (targetX - camera.position.x) * 0.03; // Reduced from 0.05
      camera.position.y += (targetY - camera.position.y) * 0.03; // Reduced from 0.05
      camera.position.z += (targetZ - camera.position.z) * 0.02; // Reduced from 0.03

      // Add subtle drift for organic feel
      camera.position.x += Math.sin(clock.elapsedTime * 0.2) * 0.01;
      camera.position.y += Math.cos(clock.elapsedTime * 0.15) * 0.01;

      camera.lookAt(0, 0, 0);

      // Spotlight follows cursor
      if (spotLightRef.current) {
        spotLightRef.current.position.x = mousePosition.current.x * 8;
        spotLightRef.current.position.y = 10;
        spotLightRef.current.position.z = mousePosition.current.y * 4 + 8;
        spotLightRef.current.target.position.set(
          mousePosition.current.x * 4,
          0,
          mousePosition.current.y * 2
        );
        spotLightRef.current.target.updateMatrixWorld();
      }
    }
  });

  return (
    <>
      {/* Enhanced Lighting for Beautiful Spheres */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#42A5F5" />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#0076D1" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#80D8FF" distance={12} decay={2} />
      {/* Additional rim lights for sphere glow */}
      <pointLight position={[8, 0, 0]} intensity={0.8} color="#00BCD4" distance={15} decay={2} />
      <pointLight position={[-8, 0, 0]} intensity={0.8} color="#2196F3" distance={15} decay={2} />

      {/* Dynamic Spotlight following cursor (desktop only, disabled if low performance) */}
      {!isMobile && !lowPerformance && (
        <spotLight
          ref={spotLightRef}
          intensity={1.5}
          angle={0.6}
          penumbra={0.5}
          color="#00E5FF"
          position={[0, 10, 8]}
          castShadow={false}
        />
      )}

      {/* Scene Elements */}
      <CentralGeometry />
      <ParticleField isMobile={isMobile} />
      <OrbitingSpheres mousePosition={mousePosition} />
      {!lowPerformance && (
        <AdvancedParticleEffects mousePosition={mousePosition} isMobile={isMobile} />
      )}
      {!isMobile && <TechGrid />}
      {!isMobile && !lowPerformance && (
        <InteractiveCursorGrid mousePosition={mousePosition} isMobile={isMobile} />
      )}

      {/* Post-Processing Effects (desktop only, lighter for performance) */}
      {/* Disabled to prevent WebGL context loss - too heavy */}
      {/* {!isMobile && !lowPerformance && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={1.0} />
        </EffectComposer>
      )} */}
    </>
  );
}

/**
 * Enhanced SVG Fallback with Brand Colors
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
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004E8F" />
            <stop offset="100%" stopColor="#0076D1" />
          </linearGradient>
        </defs>

        {/* Central hexagon */}
        <polygon
          points="250,150 325,200 325,300 250,350 175,300 175,200"
          stroke="url(#brandGradient)"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />

        {/* Inner hexagon */}
        <polygon
          points="250,175 300,210 300,290 250,325 200,290 200,210"
          stroke="#0076D1"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />

        {/* Connecting lines */}
        <line x1="250" y1="150" x2="250" y2="175" stroke="#0076D1" strokeWidth="2" opacity="0.4" />
        <line x1="325" y1="200" x2="300" y2="210" stroke="#0076D1" strokeWidth="2" opacity="0.4" />
        <line x1="325" y1="300" x2="300" y2="290" stroke="#0076D1" strokeWidth="2" opacity="0.4" />

        {/* Orbiting circles */}
        <circle cx="250" cy="100" r="8" fill="#0076D1" opacity="0.6" />
        <circle cx="375" cy="250" r="8" fill="#0076D1" opacity="0.6" />
        <circle cx="250" cy="400" r="8" fill="#0076D1" opacity="0.6" />
        <circle cx="125" cy="250" r="8" fill="#004E8F" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * Main Enhanced Hero Animation Component
 */
export default function HeroAnimationEnhanced() {
  const [shouldRender, setShouldRender] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lowPerformance, setLowPerformance] = useState(false);

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

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleCreated = () => {
    try {
      setShouldRender(true);
      console.log("✅ Enhanced 3D Animation Loaded Successfully");
    } catch (error) {
      console.error("WebGL initialization failed:", error);
      setHasError(true);

      if (typeof window !== "undefined" && window.Sentry) {
        window.Sentry.captureException(error, {
          tags: { feature: "hero-animation-enhanced" },
        });
      }
    }
  };

  const handleLowPerformance = () => {
    setLowPerformance(true);
  };

  // Show fallback for reduced motion, errors, or low performance
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
        <Scene isMobile={isMobile} onLowPerformance={handleLowPerformance} lowPerformance={lowPerformance} />
      </Canvas>
    </div>
  );
}

