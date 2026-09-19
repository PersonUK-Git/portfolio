import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Sun() {
  const ref = useRef();
  useFrame((state) => {
    const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    ref.current.scale.setScalar(s);
    ref.current.rotation.y += 0.004;
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.9, 3]} />
        <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={1.6} flatShading />
      </mesh>
      <mesh scale={1.35}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.12} />
      </mesh>
      <pointLight intensity={40} distance={30} color="#fff3d6" />
    </group>
  );
}

function OrbitRing({ radius, highlighted }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 128]} />
      <meshBasicMaterial
        color={highlighted ? "#c4b5fd" : "#ffffff"}
        transparent
        opacity={highlighted ? 0.5 : 0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Planet({ project, radius, speed, offset, size, hovered, onHover, onSelect }) {
  const ref = useRef();
  const body = useRef();
  const isHovered = hovered === project.id;

  useFrame((state, delta) => {
    // Hovered planets pause so they are easy to click.
    if (!isHovered) ref.current.userData.angle = (ref.current.userData.angle ?? offset) + delta * speed;
    const a = ref.current.userData.angle ?? offset;
    ref.current.position.set(Math.cos(a) * radius, Math.sin(a * 2) * 0.15, Math.sin(a) * radius);
    body.current.rotation.y += delta * 0.8;
    const s = THREE.MathUtils.lerp(body.current.scale.x, isHovered ? 1.35 : 1, 0.15);
    body.current.scale.setScalar(s);
  });

  return (
    <group ref={ref}>
      <group ref={body}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(project.id);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            onHover(null);
            document.body.style.cursor = "";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project.id);
          }}
        >
          <icosahedronGeometry args={[size, 2]} />
          <meshStandardMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={isHovered ? 0.9 : 0.35}
            roughness={0.4}
            metalness={0.3}
            flatShading
          />
        </mesh>
        {project.shape === "ring" && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[size * 1.7, size * 0.08, 8, 64]} />
            <meshBasicMaterial color={project.color} transparent opacity={0.8} />
          </mesh>
        )}
      </group>
      <Html center position={[0, size + 0.45, 0]} zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
        <span className={`galaxy-label ${isHovered ? "active" : ""}`} style={{ "--planet": project.color }}>
          {project.title}
        </span>
      </Html>
    </group>
  );
}

// Pull the camera back on narrow screens so the outer orbits stay in frame.
function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    // Portrait screens look almost straight down so the orbits fill the width.
    if (aspect < 1) camera.position.set(0, 19.5, 6);
    else {
      const k = aspect < 1.5 ? 1.4 : 1;
      camera.position.set(0, 6.5 * k, 10 * k);
    }
    camera.lookAt(0, 0, 0);
  }, [camera, size]);
  return null;
}

function Rig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.pointer.y * 0.15, 0.05);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -state.pointer.x * 0.1, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

export default function ProjectGalaxy({ projects, onSelect, active }) {
  const [hovered, setHovered] = useState(null);
  const orbits = useMemo(
    () =>
      projects.map((p, i) => ({
        project: p,
        radius: 2 + i * 0.85,
        speed: 0.5 / (1 + i * 0.35),
        offset: (i / projects.length) * Math.PI * 2 * 2.3,
        size: p.featured ? 0.34 : 0.22 + (i % 3) * 0.04,
      })),
    [projects]
  );

  return (
    <Canvas
      camera={{ position: [0, 6.5, 10], fov: 50 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      onPointerMissed={() => setHovered(null)}
      style={{ touchAction: "pan-y" }}
    >
      <ResponsiveCamera />
      <ambientLight intensity={0.35} />
      <Rig>
        <group scale={0.92}>
          <Sun />
          {orbits.map((o) => (
            <OrbitRing key={`ring-${o.project.id}`} radius={o.radius} highlighted={hovered === o.project.id} />
          ))}
          {orbits.map((o) => (
            <Planet key={o.project.id} {...o} hovered={hovered} onHover={setHovered} onSelect={onSelect} />
          ))}
        </group>
        <Sparkles count={80} scale={[16, 4, 16]} size={2} speed={0.3} color="#e9d5ff" />
      </Rig>
    </Canvas>
  );
}
