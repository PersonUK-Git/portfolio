import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "../motion/smoothScroll";

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shared between the scene and the window listeners so the canvas itself can
// stay pointer-events: none behind the page content.
const input = { x: 0, y: 0, scroll: 0 };

function Core({ isMobile }) {
  const group = useRef();
  const shell = useRef();
  const ringA = useRef();
  const ringB = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y += delta * 0.15;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, input.y * 0.3, 0.05);
    shell.current.rotation.y -= delta * 0.25;
    shell.current.rotation.z += delta * 0.1;
    ringA.current.rotation.z = t * 0.4;
    ringB.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.15;
    ringB.current.rotation.z = -t * 0.3;
  });

  return (
    <group ref={group} position={isMobile ? [1.6, 2.2, -3] : [2.6, 0, 0]} scale={isMobile ? 0.7 : 1}>
      <mesh>
        <icosahedronGeometry args={[1.3, 12]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#3b0a8a"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.7}
          distort={0.42}
          speed={reducedMotion ? 0 : 2}
        />
      </mesh>
      <mesh ref={shell} scale={1.9}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.6, 0.015, 16, 160]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[3.1, 0.01, 16, 160]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </mesh>
      <Sparkles count={isMobile ? 30 : 60} scale={6} size={3} speed={0.4} color="#c4b5fd" />
    </group>
  );
}

const GEOMETRIES = [
  (k) => <torusKnotGeometry key={k} args={[0.5, 0.16, 100, 16]} />,
  (k) => <octahedronGeometry key={k} args={[0.7, 0]} />,
  (k) => <dodecahedronGeometry key={k} args={[0.6, 0]} />,
  (k) => <torusGeometry key={k} args={[0.55, 0.2, 16, 40]} />,
  (k) => <icosahedronGeometry key={k} args={[0.6, 0]} />,
  (k) => <boxGeometry key={k} args={[0.8, 0.8, 0.8]} />,
];
const COLORS = ["#8b5cf6", "#22d3ee", "#f472b6", "#34d399", "#fbbf24", "#60a5fa"];

// Seeded so the layout is stable across renders and reloads.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function FloatingShapes({ count, isMobile }) {
  const shapes = useMemo(() => {
    const rand = seeded(42);
    return Array.from({ length: count }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      return {
        position: [side * (isMobile ? 1.5 + rand() * 2.5 : 5 + rand() * 4), -5 - i * 2 - rand() * 2, -6 - rand() * 6],
        rotation: [rand() * Math.PI, rand() * Math.PI, 0],
        scale: 0.4 + rand() * 0.6,
        geo: i % GEOMETRIES.length,
        color: COLORS[i % COLORS.length],
        wire: rand() > 0.4,
      };
    });
  }, [count, isMobile]);

  return shapes.map((s, i) => (
    <Float key={i} speed={1.2} rotationIntensity={1.4} floatIntensity={1.6}>
      <mesh position={s.position} rotation={s.rotation} scale={s.scale}>
        {GEOMETRIES[s.geo](i)}
        {s.wire ? (
          <meshBasicMaterial color={s.color} wireframe transparent opacity={0.35} />
        ) : (
          <meshStandardMaterial color={s.color} roughness={0.3} metalness={0.6} flatShading transparent opacity={0.55} />
        )}
      </mesh>
    </Float>
  ));
}

// Camera "shots" keyed to page progress (0 = top, 1 = bottom). Between keys
// the camera eases along, so scrolling plays like a sequence of cuts.
const SHOTS = [
  { p: 0.0, x: 0, z: 7, roll: 0 }, // hero: close on the core
  { p: 0.12, x: -1.6, z: 9.5, roll: 0.07 }, // about: pull back, bank left
  { p: 0.26, x: 1.4, z: 6.5, roll: -0.05 }, // experience: push in from the right
  { p: 0.42, x: 0, z: 11, roll: 0.04 }, // skills: wide
  { p: 0.62, x: -1.2, z: 8, roll: -0.06 }, // projects: dolly across
  { p: 0.85, x: 1, z: 10, roll: 0.03 }, // feedback
  { p: 1.0, x: 0, z: 13, roll: 0 }, // contact: final wide shot
];
const smooth = (t) => t * t * (3 - 2 * t);

function shotAt(p) {
  let i = 0;
  while (i < SHOTS.length - 2 && p > SHOTS[i + 1].p) i++;
  const a = SHOTS[i];
  const b = SHOTS[i + 1];
  const t = smooth(THREE.MathUtils.clamp((p - a.p) / (b.p - a.p), 0, 1));
  return { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t, roll: a.roll + (b.roll - a.roll) * t };
}

function CameraRig({ starsRef }) {
  const roll = useRef(0);
  useFrame((state, delta) => {
    const cam = state.camera;
    const shot = shotAt(motion.progress);
    // One viewport of scroll moves the camera ~3.5 units down through the scene.
    const targetY = -input.scroll * 3.5;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, shot.x + input.x * 0.6, 0.04);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY + input.y * 0.4, 0.08);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, shot.z, 0.05);
    cam.lookAt(cam.position.x * 0.3, cam.position.y, 0);
    roll.current = THREE.MathUtils.lerp(roll.current, shot.roll, 0.05);
    cam.rotateZ(roll.current);

    // Warp speed: fast scrolling widens the lens and spins the starfield.
    const speed = Math.min(Math.abs(motion.velocity), 60);
    cam.fov = THREE.MathUtils.lerp(cam.fov, 50 + speed * 0.4, 0.1);
    cam.updateProjectionMatrix();
    if (starsRef.current) starsRef.current.rotation.z += delta * 0.02 + motion.velocity * 0.0006;
    motion.velocity *= 0.92; // decay so the kick settles once scrolling stops
  });
  return null;
}

export default function BackgroundScene() {
  const starsRef = useRef();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const onMove = (e) => {
      input.x = (e.clientX / window.innerWidth) * 2 - 1;
      input.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      input.scroll = window.scrollY / window.innerHeight;
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="bg-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <color attach="background" args={["#06050d"]} />
        <fog attach="fog" args={["#06050d", 8, 22]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 4, 5]} intensity={60} color="#a78bfa" />
        <pointLight position={[-5, -3, 3]} intensity={40} color="#22d3ee" />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        <group ref={starsRef}>
          <Stars radius={60} depth={40} count={isMobile ? 1500 : 3500} factor={3} fade speed={0.6} />
        </group>
        <Core isMobile={isMobile} />
        <FloatingShapes count={isMobile ? 10 : 16} isMobile={isMobile} />
        <CameraRig starsRef={starsRef} />
      </Canvas>
    </div>
  );
}
