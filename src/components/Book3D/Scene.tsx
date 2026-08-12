'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo, useEffect } from 'react';
import { Preload, useTexture, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useBookStore } from '@/store/bookStore';
import { chapters } from '@/data/chapters';
import gsap from 'gsap';

function PageContent({ zIndex }: { zIndex: number }) {
  const { currentChapter, currentPage } = useBookStore();
  const currentChapterData = chapters[currentChapter - 1];
  const pageData = currentChapterData?.pages[currentPage];

  // Load the charcoal texture for physical tactility
  const texture = useTexture('/charcoal_paper.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);

  const groupRef = useRef<THREE.Group>(null);
  const textHtmlRef = useRef<HTMLDivElement>(null);

  // Subtle floating and page turn reaction
  useFrame((state) => {
    if (groupRef.current) {
      // Base float
      const targetY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      const targetRotY = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
      
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    }
  });

  // Animate text opacity when page changes
  useEffect(() => {
    if (textHtmlRef.current) {
      gsap.fromTo(textHtmlRef.current, 
        { opacity: 0, filter: 'blur(4px)' }, 
        { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [currentPage]);

  if (!currentChapterData || !pageData) return null;

  return (
    <group ref={groupRef} position={[0, 0, zIndex]}>
      <mesh castShadow receiveShadow>
        <planeGeometry args={[10, 14, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          bumpMap={texture}
          bumpScale={0.02}
          color="#EDE1C4" // Tint the charcoal texture with aged parchment
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* The DOM text projected exactly onto the 3D surface */}
      <Html 
        transform 
        position={[0, 0, 0.01]} // Just slightly above the paper mesh
        zIndexRange={[100, 0]}
        style={{
          width: '800px', // High-res coordinate space for projection
          height: '1100px',
          padding: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div ref={textHtmlRef} className="text-[#16110B] h-full flex flex-col justify-center">
          <div className="font-ui text-sm tracking-[0.3em] uppercase opacity-40 mb-12 text-center">
            {currentChapterData.title}
          </div>
          
          <div 
            className="font-body text-3xl leading-relaxed"
            style={{ 
              textShadow: '0px 1px 2px rgba(22, 17, 11, 0.1)' // Fake ink bleeding into paper
            }}
            dangerouslySetInnerHTML={{ 
              __html: pageData.content.replace(/\n\n/g, '</p><p class="mb-8">').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/^/, '<p>').replace(/$/, '</p>') 
            }}
          />
          
          <div className="mt-auto font-ui text-xs tracking-widest opacity-40 text-center">
            {pageData.page} / {currentChapterData.pages.length}
          </div>
        </div>
      </Html>
    </group>
  );
}

function AtmosphericBackground() {
  const { currentChapter } = useBookStore();
  
  // Decide which background image to use based on chapter
  const bgImage = useMemo(() => {
    if (currentChapter === 1) return '/ch1_bg.jpg';
    if (currentChapter === 3) return '/ch3_bg.jpg';
    return '/hero_bg.jpg'; // default
  }, [currentChapter]);

  const bgTexture = useTexture(bgImage);

  return (
    <mesh position={[0, 0, -20]}>
      <planeGeometry args={[40, 25]} />
      <meshBasicMaterial map={bgTexture} transparent opacity={0.3} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="canvas-container canvas-interactive bg-[#0A0806]">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 2]} 
        shadows
      >
        {/* Soft volumetric fog to blend the book into the void */}
        <fog attach="fog" args={['#0A0806', 10, 25]} />
        
        <ambientLight intensity={0.2} />
        
        {/* Cinematic Spot Light (Warm) */}
        <spotLight 
          position={[5, 10, 10]} 
          intensity={2} 
          angle={0.6}
          penumbra={1}
          color="#E8B857" // Saffron gold/dust
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* Cool Rim Light */}
        <spotLight 
          position={[-10, 0, -5]} 
          intensity={1} 
          angle={0.8}
          penumbra={1}
          color="#6B7A8C" // Muted blue
        />
        
        <Suspense fallback={null}>
          <AtmosphericBackground />
          <PageContent zIndex={0} />
          
          {/* Stacked background pages for physical depth */}
          <group position={[0.1, -0.1, -0.2]}>
            <mesh>
              <planeGeometry args={[10, 14, 2, 2]} />
              <meshStandardMaterial color="#D5C7A9" roughness={1} />
            </mesh>
          </group>
          <group position={[0.2, -0.2, -0.4]}>
            <mesh>
              <planeGeometry args={[10, 14, 2, 2]} />
              <meshStandardMaterial color="#BCAE90" roughness={1} />
            </mesh>
          </group>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
