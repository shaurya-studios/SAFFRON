'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Cinematic Intro
const CinematicIntro = dynamic(() => import('../components/Book3D/CinematicIntro'), {
  ssr: false,
});

// Dynamically import the 3D scene to prevent SSR issues and reduce initial payload
const Scene3D = dynamic(() => import('../components/Book3D/Scene'), {
  ssr: false,
});

const RibbonBookmark = dynamic(() => import('../components/Book3D/RibbonBookmark'), {
  ssr: false,
});

const HtmlOverlay = dynamic(() => import('../components/Book3D/HtmlOverlay'), {
  ssr: false,
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <main className="bg-char-umbra w-full h-[100dvh]"></main>;

  return (
    <main className="w-full h-[100dvh] bg-char-umbra relative overflow-hidden">
      <CinematicIntro />
      
      {/* 3D WebGL Layer */}
      <Scene3D />

      {/* Interactive Ribbon */}
      <RibbonBookmark />
      
      {/* DOM UI & Semantic Text Layer */}
      <HtmlOverlay />
    </main>
  );
}
