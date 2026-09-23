'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Lenis from '@studio-freight/lenis';
import rawStoryData from '@/data/story1.json';
import { Story } from '@/types/story';

const storyData = rawStoryData as Story;

gsap.registerPlugin(ScrollTrigger);

export default function StoryOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
      ScrollTrigger.refresh();
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    gsap.ticker.add(raf);

    // Setup pinned scenes and scrubbed captions
    const scenes = gsap.utils.toArray<HTMLElement>('.scene-container');
    scenes.forEach((scene) => {
      const captions = scene.querySelectorAll('.caption');
      
      // Pin the scene container
      ScrollTrigger.create({
        trigger: scene,
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        pinSpacing: false
      });

      // Scrub captions inside the pinned scene
      captions.forEach((cap, i) => {
        gsap.fromTo(cap,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { 
            opacity: 1, y: 0, filter: 'blur(0px)',
            scrollTrigger: {
              trigger: scene,
              start: `top+=${i * 30}% top`,
              end: `top+=${(i + 1) * 30}% top`,
              scrub: 1.5
            }
          }
        );
      });
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [fontsLoaded]);

  // Compute sizing helpers
  const getWordCount = (text: string) => text.split(' ').length;
  const getCaptionVH = (text: string) => Math.max(0.6, 0.105 * getWordCount(text));
  const getSceneVH = (captions: any[]) => {
    let totalVH = 0;
    captions.forEach((cap, idx) => {
      totalVH += getCaptionVH(cap.text);
      if ((idx + 1) % 3 === 0) totalVH += 1.2;
    });
    return Math.max(1.5, totalVH) * 100; // Multiply by 100 to convert to vh for CSS height
  };

  return (
    <main ref={containerRef} className="bg-[#0B0B0F] text-[#EFE8DA] min-h-screen font-mono">
      <div className="grain-overlay"></div>
      
      {/* UI CHROME - Color Rule: Story 1 Cyan */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between mix-blend-difference text-[12px] uppercase tracking-widest text-[#00F0FF]">
        <Link href="/" className="hover:text-white">← HUB</Link>
        <span>{storyData.title}</span>
      </nav>

      {/* STORY SCENES */}
      <div className="w-full">
        {storyData.scenes.map((scene) => {
          const sceneHeightVH = getSceneVH(scene.captions);

          return (
            <section 
              key={scene.id} 
              className="scene-container relative flex flex-col justify-center px-8 border-b border-white/10"
              style={{ height: `${sceneHeightVH}vh` }}
            >
              <h2 className="text-[#00F0FF] text-[10px] uppercase tracking-widest absolute top-8 left-8 opacity-50">
                SCENE {scene.id} — {scene.name}
              </h2>
              
              <div className="w-full max-w-3xl mx-auto space-y-16">
                {scene.captions.map((cap, j) => (
                  <p 
                    key={j} 
                    className={`caption text-fluid-body leading-relaxed ${cap.speaker ? 'text-[#FFB000]' : 'text-white'}`}
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
          )
        })}
      </div>

    </main>
  );
}
