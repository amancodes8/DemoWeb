import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Luxury Cigarette Component
function FloatingCigaretteModel({ mousePos }) {
  const meshGroup = useRef();

  useFrame((state, delta) => {
    if (!meshGroup.current) return;
    // Smooth rotation influenced by mouse cursor
    meshGroup.current.rotation.y = THREE.MathUtils.lerp(
      meshGroup.current.rotation.y,
      mousePos.x * 0.6 + state.clock.getElapsedTime() * 0.1,
      0.05
    );
    meshGroup.current.rotation.x = THREE.MathUtils.lerp(
      meshGroup.current.rotation.x,
      mousePos.y * 0.4,
      0.05
    );
  });

  return (
    <group ref={meshGroup} position={[0, 0, 0]} rotation={[0.2, -0.4, 0.15]}>
      {/* Outer Wrapper Cylinder */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.38, 5.2, 64]} />
        <meshStandardMaterial
          color="#fbfbfb"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* 24K Gold Foil Band */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.385, 0.385, 0.5, 64]} />
        <meshStandardMaterial
          color="#ffd700"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Gold Ring Accents */}
      <mesh position={[0, 1.68, 0]}>
        <torusGeometry args={[0.388, 0.015, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
      </mesh>

      {/* Silk Luxury Filter */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <cylinderGeometry args={[0.382, 0.382, 0.8, 64]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Diamond Cut Tip */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.384, 0.384, 0.1, 64]} />
        <meshStandardMaterial color="#111115" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Tobacco Leaf Core End (Bottom Cured Glow) */}
      <mesh position={[0, -2.605, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.375, 32]} />
        <meshStandardMaterial color="#3b2318" roughness={0.9} />
      </mesh>
      
      {/* Subtle Ember Glow Ring */}
      <mesh position={[0, -2.61, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.37, 32]} />
        <meshBasicMaterial color="#ff5500" opacity={0.6} transparent />
      </mesh>
    </group>
  );
}

export default function Hero3DCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.4}
          penumbra={1}
          intensity={2.5}
          color="#ffd700"
          castShadow
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4169e1" />
        <pointLight position={[0, 0, 5]} intensity={1.2} color="#fff5c0" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <FloatingCigaretteModel mousePos={mousePos} />
        </Float>

        <ContactShadows
          position={[0, -3.2, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={5}
          color="#d4af37"
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
