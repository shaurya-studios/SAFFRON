'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Cinematic Title Reveal
    gsap.fromTo('.reveal-text', 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#020202] text-[#e5e5e5] font-serif overflow-hidden flex flex-col justify-center items-center">
      <div className="ink-noise"></div>
      
      <div ref={containerRef} className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center">
        
        <p className="reveal-text text-[11px] uppercase tracking-[0.4em] text-[#555] mb-12 font-sans">
          STORY COLLECTION / 01
        </p>
        
        <h1 className="reveal-text font-black text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-tight mb-8">
          The Final Stories
        </h1>
        
        <p className="reveal-text text-[clamp(16px,2vw,20px)] italic text-[#888] max-w-md mb-24">
          Two dark, suspense-driven narratives prepared for interactive adaptation.
        </p>

        <div className="flex flex-col md:flex-row gap-12 w-full justify-center">
          
          <Link href="/2006" className="reveal-text group relative block p-8 border border-[#222] hover:border-[#666] transition-colors bg-[#050505] w-full md:w-1/2 text-left cursor-pointer">
            <div className="absolute inset-0 bg-[#111] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out -z-10"></div>
            <h2 className="text-[12px] font-sans tracking-widest uppercase text-[#ff3333] mb-4">
              2006 — A Little Shift
            </h2>
            <p className="text-[18px] text-[#ccc]">
              A man wakes into a year that should not exist.
            </p>
          </Link>

          <Link href="/red-towel" className="reveal-text group relative block p-8 border border-[#222] hover:border-[#666] transition-colors bg-[#050505] w-full md:w-1/2 text-left cursor-pointer">
            <div className="absolute inset-0 bg-[#111] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out -z-10"></div>
            <h2 className="text-[12px] font-sans tracking-widest uppercase text-[#ff3333] mb-4">
              The Red Towel
            </h2>
            <p className="text-[18px] text-[#ccc]">
              An ordinary object becomes the center of an impossible infestation.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}
