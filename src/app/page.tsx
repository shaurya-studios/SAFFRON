'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Lenis from 'lenis';

export default function Home() {
  const [started, setStarted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis & Cursor
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    };
    window.addEventListener('mousemove', moveCursor);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    // In a full implementation, this triggers Tone.start() and the WebGL seam shader
    gsap.to('.intro-overlay', { opacity: 0, duration: 1, pointerEvents: 'none' });
    gsap.fromTo('.hub-content', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, delay: 0.5 });
  };

  return (
    <main className="bg-[#07070A] text-white min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center">
      <div className="grain-overlay"></div>
      <div ref={cursorRef} className="custom-cursor bg-white mix-blend-difference hidden md:block"></div>

      {/* INTRO / LOADER SCREEN */}
      <div className="intro-overlay absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#07070A]">
        <h1 className="display-text text-6xl md:text-9xl mb-8 tracking-widest text-center">SEAMS</h1>
        <p className="text-fluid-body text-gray-400 mb-12 text-center max-w-md italic">
          Two stories about the moment the world stops making sense.
        </p>
        <button 
          onClick={handleStart}
          className="text-fluid-body uppercase tracking-widest border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors"
        >
          ENTER (Headphones Recommended)
        </button>
      </div>

      {/* HUB CONTENT */}
      <div className="hub-content opacity-0 flex flex-col md:flex-row gap-8 w-full max-w-6xl px-8 z-10">
        
        {/* STORY 1 PORTAL */}
        <Link href="/story1" className="group relative w-full md:w-1/2 aspect-[4/5] border border-white/10 overflow-hidden flex flex-col justify-end p-8 hover:border-[#00F0FF]/50 transition-colors cursor-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
          {/* Placeholder for WebGL Shader / Hover Video */}
          <div className="absolute inset-0 bg-[#0B0B0F] group-hover:bg-[#00F0FF]/10 transition-colors duration-700"></div>
          
          <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[#00F0FF] text-sm tracking-widest mb-2 block">CHAPTER I (12 MIN)</span>
            <h2 className="display-text text-5xl md:text-7xl mb-4">2006:<br/>A Little Shift</h2>
            <p className="text-gray-400 font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              A man wakes into a year that should not exist.
            </p>
          </div>
        </Link>

        {/* STORY 2 PORTAL */}
        <Link href="/story2" className="group relative w-full md:w-1/2 aspect-[4/5] border border-white/10 overflow-hidden flex flex-col justify-end p-8 hover:border-[#E10600]/50 transition-colors cursor-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
          {/* Placeholder for WebGL Shader / Hover Video */}
          <div className="absolute inset-0 bg-[#0B0B0F] group-hover:bg-[#E10600]/10 transition-colors duration-700"></div>
          
          <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[#E10600] text-sm tracking-widest mb-2 block">CHAPTER II (10 MIN)</span>
            <h2 className="display-text text-5xl md:text-7xl mb-4">The Red<br/>Towel</h2>
            <p className="text-gray-400 font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              An ordinary object becomes the center of an impossible infestation.
            </p>
          </div>
        </Link>

      </div>

      {/* FOOTER */}
      <footer className="hub-content opacity-0 absolute bottom-8 left-0 right-0 flex justify-between px-12 text-[10px] text-gray-500 tracking-widest font-mono uppercase">
        <span>Scroll slowly. Headphones on.</span>
        <span>EN / HI</span>
      </footer>

    </main>
  );
}
