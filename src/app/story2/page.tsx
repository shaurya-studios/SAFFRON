'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Lenis from '@studio-freight/lenis';
import storyData from '@/data/story2.json';

gsap.registerPlugin(ScrollTrigger);

export default function StoryTwo() {
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Initial basic text reveal for the scaffold
    const captions = document.querySelectorAll('.caption');
    captions.forEach((cap) => {
      gsap.fromTo(cap,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { 
          opacity: 1, y: 0, filter: 'blur(0px)',
          scrollTrigger: {
            trigger: cap,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1.5
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0B0B0F] text-[#EFE8DA] min-h-screen font-mono">
      <div className="grain-overlay"></div>
      
      {/* UI CHROME */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between mix-blend-difference text-[12px] uppercase tracking-widest" style={{ color: storyData.signalColor }}>
        <Link href="/" className="hover:text-white">← HUB</Link>
        <span>{storyData.title}</span>
      </nav>

      {/* STORY SCENES */}
      <div className="w-full max-w-3xl mx-auto px-8 py-32">
        {storyData.scenes.map((scene, i) => (
          <section key={scene.id} className="min-h-[150vh] relative pt-[20vh] border-l border-white/10 pl-8 mb-32">
            <h2 style={{ color: storyData.signalColor }} className="text-[10px] uppercase tracking-widest mb-32 absolute top-0 left-8">
              SCENE {scene.id} — {scene.name}
            </h2>
            
            <div className="space-y-[40vh]">
              {scene.captions.map((cap, j) => (
                <p 
                  key={j} 
                  className={`caption text-fluid-body leading-relaxed text-white`}
                  style={{
                    fontFamily: cap.mode === 'typewriter' ? 'IBM Plex Mono' : 'Anton',
                    textTransform: cap.mode === 'typewriter' ? 'none' : 'uppercase',
                    fontSize: cap.mode === 'shout' ? '4rem' : 'inherit',
                  }}
                >
                  {cap.text}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

    </main>
  );
}
