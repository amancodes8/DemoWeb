import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

function StudioProductMesh({ product, wireframe, exploded, lightingPreset }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && !exploded) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const wrapperColor = product?.colors?.wrapper || product?.['3dModelPreset']?.wrapperColor || '#ffffff';
  const filterColor = product?.colors?.filter || product?.['3dModelPreset']?.filterColor || '#d4af37';
  const bandColor = product?.colors?.band || product?.['3dModelPreset']?.bandColor || '#ffd700';
  const metalness = product?.['3dModelPreset']?.metalness ?? 0.8;
  const roughness = product?.['3dModelPreset']?.roughness ?? 0.2;

  const shift = exploded ? 1.6 : 0;

  return (
    <group ref={meshRef} position={[0, -0.2, 0]}>
      {/* Outer Casing */}
      <group position={[0, -shift * 0.4, 0]}>
        <mesh castShadow receiveShadow wireframe={wireframe}>
          <cylinderGeometry args={[0.38, 0.38, 3.8, 64]} />
          <meshStandardMaterial color={wrapperColor} roughness={roughness} metalness={metalness * 0.4} />
        </mesh>
      </group>

      {/* Gold Band & Brand Tag */}
      <group position={[0, 1.9 + shift * 0.4, 0]}>
        <mesh castShadow wireframe={wireframe}>
          <cylinderGeometry args={[0.385, 0.385, 0.4, 64]} />
          <meshStandardMaterial color={bandColor} metalness={0.95} roughness={0.1} />
        </mesh>
        <Html position={[0, 0, 0.41]} center transform distanceFactor={4}>
          <div className="text-[7px] font-serif-luxury font-black text-zinc-950 uppercase tracking-widest pointer-events-none whitespace-nowrap bg-amber-400/90 px-1.5 py-0.5 rounded shadow">
            {product?.brand || 'VOLUTE'}
          </div>
        </Html>
      </group>

      {/* Filter Component */}
      <group position={[0, 2.4 + shift * 1.0, 0]}>
        <mesh castShadow wireframe={wireframe}>
          <cylinderGeometry args={[0.382, 0.382, 0.8, 64]} />
          <meshStandardMaterial color={filterColor} roughness={roughness} metalness={metalness} />
        </mesh>
      </group>
    </group>
  );
}

export default function ProductViewer3D({ product }) {
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [lightingPreset, setLightingPreset] = useState('studio');

  return (
    <div className="w-full h-full relative group">
      {/* Studio Interactive Control Floating Bar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            wireframe
              ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30'
              : 'glass-panel text-zinc-300 hover:text-white border border-white/10'
          }`}
        >
          Wireframe: {wireframe ? 'ON' : 'OFF'}
        </button>

        <button
          onClick={() => setExploded(!exploded)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            exploded
              ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30'
              : 'glass-panel text-zinc-300 hover:text-white border border-white/10'
          }`}
        >
          Exploded View: {exploded ? 'ON' : 'OFF'}
        </button>
      </div>

      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <spotLight position={[10, 15, 10]} intensity={2} color="#ffd700" castShadow />
        <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#90e0ef" />

        <StudioProductMesh
          product={product}
          wireframe={wireframe}
          exploded={exploded}
          lightingPreset={lightingPreset}
        />

        <ContactShadows position={[0, -2.8, 0]} opacity={0.6} scale={8} blur={2} />
        <OrbitControls makeDefault enableZoom={true} maxDistance={12} minDistance={3} />
        <Environment preset={lightingPreset} />
      </Canvas>
    </div>
  );
}
