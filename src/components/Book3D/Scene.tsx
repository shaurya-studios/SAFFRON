'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Simple curved plane geometry mapped to the DOM layout
function PageGeometry({ zIndex }: { zIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // A subtle floating animation to make it feel alive
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, zIndex]} castShadow receiveShadow>
      {/* 
        Width and height perfectly calibrated to match the DOM overlay container 
        (approx 600px max-width equivalent in WebGL space)
      */}
      <planeGeometry args={[8, 11, 32, 32]} />
      <meshStandardMaterial 
        color="#EDE1C4" // Aged Parchment
        roughness={0.9}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="canvas-container canvas-interactive">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} 
        shadows
      >
        <ambientLight intensity={0.4} />
        
        {/* Warm Reading Lamp Light */}
        <spotLight 
          position={[0, 10, 10]} 
          intensity={1.5} 
          angle={0.8}
          penumbra={1}
          color="#E8B857" // Dust Gold
          castShadow
        />
        
        {/* Cool Fill Light for depth */}
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#16110B" />
        
        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            {/* The primary reading surface */}
            <PageGeometry zIndex={0} />
            
            {/* Stacked background pages to give physical thickness */}
            <PageGeometry zIndex={-0.1} />
            <PageGeometry zIndex={-0.2} />
            <PageGeometry zIndex={-0.3} />
          </group>
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
