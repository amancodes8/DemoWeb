import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

function ExplodedMeshGroup({ explodeProgress = 0.5 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Calculate component Y shifts based on explode progress (0 = assembled, 1 = max separation)
  const shiftFactor = explodeProgress * 3.5;

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* 1. Ceramic Diamond Tip */}
      <group position={[0, 2.5 + shiftFactor * 1.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.384, 0.384, 0.2, 64]} />
          <meshStandardMaterial color="#111115" metalness={0.9} roughness={0.2} />
        </mesh>
        <Html position={[1.2, 0, 0]} center className="pointer-events-none">
          <div className="glass-panel px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap text-amber-300 border border-amber-500/30 shadow-xl">
            <span className="font-bold">01.</span> Ceramic Obsidian Tip
          </div>
        </Html>
      </group>

      {/* 2. Dual Density Silk Filter */}
      <group position={[0, 1.8 + shiftFactor * 1.0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.382, 0.382, 1.0, 64]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.7} />
        </mesh>
        <Html position={[-1.4, 0, 0]} center className="pointer-events-none">
          <div className="glass-panel px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap text-amber-200 border border-amber-500/30 shadow-xl">
            <span className="font-bold">02.</span> Japanese Silk & Charcoal Filter
          </div>
        </Html>
      </group>

      {/* 3. 24K Gold Band */}
      <group position={[0, 1.0 + shiftFactor * 0.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.386, 0.386, 0.5, 64]} />
          <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
        </mesh>
        <Html position={[1.3, 0, 0]} center className="pointer-events-none">
          <div className="glass-panel px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap text-amber-400 border border-amber-500/30 shadow-xl">
            <span className="font-bold">03.</span> 24K Gold Embossed Seal
          </div>
        </Html>
      </group>

      {/* 4. Outer Casing Paper */}
      <group position={[0, -0.4, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.38, 0.38, 2.2, 64]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.25} metalness={0.05} />
        </mesh>
        <Html position={[-1.5, 0, 0]} center className="pointer-events-none">
          <div className="glass-panel px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap text-zinc-200 border border-zinc-700 shadow-xl">
            <span className="font-bold">04.</span> Unbleached Linen Casing
          </div>
        </Html>
      </group>

      {/* 5. Aged Leaf Core Blend */}
      <group position={[0, -2.2 - shiftFactor * 0.8, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.35, 2.0, 64]} />
          <meshStandardMaterial color="#3b2318" roughness={0.85} />
        </mesh>
        <Html position={[1.4, 0, 0]} center className="pointer-events-none">
          <div className="glass-panel px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap text-amber-500 border border-amber-500/30 shadow-xl">
            <span className="font-bold">05.</span> Aged Virginia Leaf Blend
          </div>
        </Html>
      </group>
    </group>
  );
}

export default function ExplodedCigarette3D({ explodeProgress = 0.5 }) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <spotLight position={[10, 15, 10]} intensity={2} color="#ffd700" castShadow />
        <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#90e0ef" />

        <ExplodedMeshGroup explodeProgress={explodeProgress} />

        <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={8} blur={2} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
