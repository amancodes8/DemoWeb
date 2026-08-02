import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

function ProceduralCustomMesh({ cfg }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current && !cfg.exploded) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  const rad = (cfg.radius || 4) / 10;
  const len = (cfg.length || 84) / 16;
  const filterLen = len * 0.28;
  const wrapperLen = len * 0.72;

  // Radial Segments based on filter shape
  const getRadialSegments = (shape) => {
    switch (shape) {
      case 'Square': return 4;
      case 'Hexagon': return 6;
      case 'Triangle': return 3;
      case 'Star': return 5;
      default: return 64; // Round / Custom
    }
  };

  const segments = getRadialSegments(cfg.filterShape);

  // Separation if exploded mode active
  const shift = cfg.exploded ? 1.5 : 0;

  return (
    <group ref={groupRef} position={[0, -len / 4, 0]}>
      {/* 1. Tip Element */}
      <group position={[0, wrapperLen / 2 + filterLen + 0.3 + shift * 1.2, 0]}>
        <mesh castShadow wireframe={cfg.wireframe}>
          <cylinderGeometry args={[rad * 1.01, rad * 1.01, 0.15, segments]} />
          <meshStandardMaterial
            color={cfg.filterColor || '#d4af37'}
            metalness={cfg.metalness}
            roughness={cfg.roughness}
            transparent={cfg.opacity < 1}
            opacity={cfg.opacity}
          />
        </mesh>
      </group>

      {/* 2. Filter Component */}
      <group position={[0, wrapperLen / 2 + filterLen / 2 + shift * 0.8, 0]}>
        <mesh castShadow wireframe={cfg.wireframe}>
          <cylinderGeometry args={[rad * 1.005, rad * 1.005, filterLen, segments]} />
          <meshStandardMaterial
            color={cfg.filterColor || '#d4af37'}
            metalness={cfg.metalness * 0.6}
            roughness={cfg.roughness}
            transparent={cfg.opacity < 1}
            opacity={cfg.opacity}
          />
        </mesh>
      </group>

      {/* 3. Gold Foil Band */}
      {cfg.bandType !== 'None' && (
        <group position={[0, wrapperLen / 2 + shift * 0.4, 0]}>
          <mesh castShadow wireframe={cfg.wireframe}>
            <cylinderGeometry args={[rad * 1.02, rad * 1.02, 0.4, segments]} />
            <meshStandardMaterial
              color={cfg.bandColor || '#ffd700'}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
        </group>
      )}

      {/* 4. Main Outer Wrapper Casing */}
      <group position={[0, 0, 0]}>
        <mesh castShadow receiveShadow wireframe={cfg.wireframe}>
          {cfg.crossSection ? (
            <cylinderGeometry args={[rad, rad, wrapperLen, segments, 1, false, 0, Math.PI * 1.5]} />
          ) : (
            <cylinderGeometry args={[rad, rad, wrapperLen, segments]} />
          )}
          <meshStandardMaterial
            color={cfg.wrapperColor || '#121215'}
            metalness={cfg.wrapperTexture === 'Carbon Fiber' ? 0.8 : cfg.metalness * 0.3}
            roughness={cfg.wrapperTexture === 'Gloss' ? 0.1 : cfg.roughness}
            transparent={cfg.opacity < 1}
            opacity={cfg.opacity}
          />
        </mesh>

        {/* Monogram Seal Overlay on Wrapper */}
        {cfg.logoText && !cfg.wireframe && (
          <Html position={[0, 0, rad + 0.02]} center transform distanceFactor={6}>
            <div className="text-[10px] font-serif-luxury font-bold tracking-[0.3em] text-amber-300 uppercase select-none opacity-90">
              {cfg.logoText}
            </div>
          </Html>
        )}
      </group>

      {/* 5. Cured Leaf Core (Visible in Cross Section or Exploded) */}
      {(cfg.crossSection || cfg.exploded) && (
        <group position={[0, -shift * 0.5, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[rad * 0.9, rad * 0.9, wrapperLen * 0.95, 32]} />
            <meshStandardMaterial color="#3b2318" roughness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function Configurator3D() {
  const { configurator } = useStore();

  return (
    <div className="w-full h-full relative">
      <Canvas shadows camera={{ position: [0, 1, 9], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <spotLight position={[10, 15, 10]} intensity={2.2} color="#ffd700" castShadow />
        <directionalLight position={[-10, -5, -5]} intensity={0.8} color="#90e0ef" />
        <pointLight position={[0, 0, 6]} intensity={1.0} color="#ffffff" />

        <ProceduralCustomMesh cfg={configurator} />

        <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={10} blur={2.5} far={6} />
        <OrbitControls makeDefault enableZoom={true} maxDistance={15} minDistance={4} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
