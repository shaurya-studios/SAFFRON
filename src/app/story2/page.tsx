'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import rawStoryData from '@/data/story2.json';
import { Story } from '@/types/story';
import { computeSceneLayout } from '@/engine/scroll';
import { clamp } from '@/engine/math';

const storyData = rawStoryData as Story;

export default function StoryTwo() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLenisScroll();

  useLayoutEffect(() => {
    const layouts = storyData.scenes.map(s => computeSceneLayout(s.captions));
    
    const ctx = gsap.context(() => {
      const tracks = gsap.utils.toArray<HTMLElement>('.scene-track');
      tracks.forEach((track, idx) => {
        const captions = track.querySelectorAll('.caption');
        const layout = layouts[idx];

        ScrollTrigger.create({
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            captions.forEach((cap, i) => {
              const l = layout.mappedCaptions[i];
              let capProg = (p - l.progressStart) / (l.progressEnd - l.progressStart);
              capProg = clamp(capProg, -0.5, 1.5);
              
              const alpha = 1 - Math.abs(capProg - 0.5) * 2;
              const opacity = clamp(alpha * 1.5, 0, 1);
              const y = (0.5 - capProg) * 80;
              const blur = Math.max(0, (1 - opacity) * 10);
              
              gsap.set(cap, {
                opacity,
                y,
                filter: `blur(${blur}px)`,
                visibility: opacity === 0 ? 'hidden' : 'visible'
              });
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-screen">
      <div className="grain-overlay"></div>
      
      {/* UI CHROME - Story 2: solid #0B0B0F text, NO mix-blend-mode */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between text-[12px] uppercase tracking-widest text-[#0B0B0F] pointer-events-none">
        <Link href="/" className="pointer-events-auto hover:opacity-50 transition-opacity">← HUB</Link>
        <span className="font-bold opacity-100">{storyData.title}</span>
      </nav>

      {/* STORY SCENES */}
      <div className="w-full">
        {storyData.scenes.map((scene) => {
          const { L_i } = computeSceneLayout(scene.captions);
          
          return (
            <section 
              key={scene.id} 
              className="scene-track relative border-b border-black/10"
              style={{ height: `${(L_i + 1) * 100}vh` }}
            >
              {/* STICKY STAGE */}
              <div className="scene-stage relative flex flex-col items-center justify-center w-full px-8"
                   style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                   
                <h2 className="text-[#0B0B0F] text-[10px] uppercase tracking-widest absolute top-8 left-8 opacity-30">
                  SCENE {scene.id} — {scene.name}
                </h2>
                
                {scene.captions.map((cap, j) => (
                  <p 
                    key={j} 
                    className="caption absolute text-center w-full max-w-3xl leading-relaxed opacity-0 invisible px-8"
                    style={{
                      fontFamily: cap.mode === 'typewriter' ? 'var(--font-ibm-plex-mono)' : 'var(--font-anton)',
                      textTransform: cap.mode === 'typewriter' ? 'none' : 'uppercase',
                      // Cap shout font so it doesn't overflow mobile
                      fontSize: cap.mode === 'shout' ? 'clamp(2rem, 8vw, 4rem)' : 'clamp(18px, 1.2rem + 0.5vw, 24px)',
                      color: '#0B0B0F'
                    }}
                  >
                    {cap.text}
                  </p>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
