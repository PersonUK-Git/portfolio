import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 3.2;
const isTouch =
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

// Even distribution of n points on a sphere (Fibonacci lattice).
function fibonacciSphere(n, r) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * radius * r, y * r, Math.sin(theta) * radius * r));
  }
  return pts;
}

function Words({ words, activeGroup, spin }) {
  const labels = useRef([]);
  const positions = useMemo(() => fibonacciSphere(words.length, RADIUS), [words.length]);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    const camDist = camera.position.length();
    positions.forEach((p, i) => {
      const el = labels.current[i];
      if (!el) return;
      // 0 = far side of the globe, 1 = facing the camera.
      const d = tmp.copy(p).applyMatrix4(spin.current.matrixWorld).distanceTo(camera.position);
      const depth = THREE.MathUtils.clamp(1 - (d - (camDist - RADIUS)) / (RADIUS * 2), 0, 1);
      const dimmed = activeGroup && words[i].group !== activeGroup;
      el.style.opacity = String((0.15 + depth * 0.85) * (dimmed ? 0.2 : 1));
      el.style.transform = `scale(${0.7 + depth * 0.45})`;
    });
  });

  return words.map((w, i) => (
    <Html key={w.label} position={positions[i]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <span
        ref={(el) => (labels.current[i] = el)}
        className="globe-word"
        style={{ "--word-color": w.color }}
      >
        {w.label}
      </span>
    </Html>
  ));
}

function Wireframe() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.92, 24, 16]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function Spinner({ children, spin }) {
  useFrame((_, delta) => {
    spin.current.rotation.y += delta * 0.12;
    spin.current.rotation.x = Math.sin(spin.current.rotation.y * 0.5) * 0.15;
  });
  return <group ref={spin}>{children}</group>;
}

// Back the camera off on narrow screens so edge labels aren't clipped.
function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.setLength(aspect < 1 ? 11.5 : 8.5);
  }, [camera, size]);
  return null;
}

export default function SkillsGlobe({ skills, activeGroup, active }) {
  const spin = useRef();
  const words = useMemo(
    () => skills.flatMap((g) => g.items.map((label) => ({ label, group: g.group, color: g.color }))),
    [skills]
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 50 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
    >
      <ResponsiveCamera />
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 6]} intensity={30} color="#c4b5fd" />
      <Spinner spin={spin}>
        <Wireframe />
        <Words words={words} activeGroup={activeGroup} spin={spin} />
      </Spinner>
      {/* On touch screens a drag should scroll the page, so only desktop gets drag-to-rotate. */}
      {!isTouch && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />}
    </Canvas>
  );
}
