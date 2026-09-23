'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { redTowelChapters } from '@/data/red-towel';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function RedTowel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const clickMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxHoverRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize Audio
  useEffect(() => {
    // A low frequency drone for domestic room tone
    bgMusicRef.current = new Audio('https://actions.google.com/sounds/v1/science_fiction/pulsing_rhythmic_drone.ogg');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.3;

    // A subtle clicking sound (alien breath / organic clicking)
    clickMusicRef.current = new Audio('https://actions.google.com/sounds/v1/science_fiction/alien_breath.ogg');
    clickMusicRef.current.loop = true;
    clickMusicRef.current.volume = 0; // Starts silent

    sfxHoverRef.current = new Audio('https://actions.google.com/sounds/v1/ui/button_click.ogg');
    sfxHoverRef.current.volume = 0.2;
  }, []);

  const toggleSound = () => {
    if (isMuted) {
      bgMusicRef.current?.play().catch(() => {});
      clickMusicRef.current?.play().catch(() => {});
      setIsMuted(false);
    } else {
      bgMusicRef.current?.pause();
      clickMusicRef.current?.pause();
      setIsMuted(true);
    }
  };

  const playHoverSfx = () => {
    if (!isMuted && sfxHoverRef.current) {
      sfxHoverRef.current.currentTime = 0;
      sfxHoverRef.current.play().catch(() => {});
    }
  };
  
  useEffect(() => {
    // 1. Claustrophobic Text Scrub Reveal
    const paragraphs = document.querySelectorAll('.story-text');
    paragraphs.forEach((p) => {
      gsap.fromTo(p, 
        { 
          opacity: 0, 
          scale: 1.05,
          color: '#111'
        },
        { 
          opacity: 1,
          scale: 1,
          color: '#e5dada',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 2,
          }
        }
      );
    });

    // 2. The Escalation (Red creeps in)
    const ch2 = document.querySelector('#ch2');
    if (ch2) {
      ScrollTrigger.create({
        trigger: ch2,
        start: 'top 50%',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (clickMusicRef.current && !isMuted) {
            clickMusicRef.current.volume = 0.8 * self.progress;
          }
        }
      });
    }

    // 3. The Infestation (Pure Red)
    const ch3 = document.querySelector('#ch3');
    if (ch3) {
      ScrollTrigger.create({
        trigger: ch3,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(containerRef.current, { backgroundColor: '#1a0000', duration: 1 });
        },
        onLeaveBack: () => {
          gsap.to(containerRef.current, { backgroundColor: '#090202', duration: 1 });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMuted]);

  return (
    <div className="theme-redtowel relative w-full min-h-screen bg-bg text-ink selection:bg-accent selection:text-ink font-serif overflow-hidden">
      
      <div className="ink-noise"></div>

      {/* Slowly shrinking vignette to create claustrophobia */}
      <div className="pointer-events-none fixed inset-0 z-40 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>

      <div ref={containerRef} className="relative z-10 w-full transition-colors duration-1000">
        
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-[clamp(20px,4vw,40px)] mix-blend-difference flex justify-between items-center">
          <Link href="/" className="font-bold text-[18px] tracking-widest uppercase font-sans hover:text-accent transition-colors">
            ← LIBRARY
          </Link>
          <div className="flex gap-4 font-sans">
            <button onClick={toggleSound} onMouseEnter={playHoverSfx} className="text-[12px] uppercase tracking-widest border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer">
              AUDIO: {isMuted ? 'MUTE' : 'LIVE'}
            </button>
          </div>
        </nav>

        {/* HERO / TITLE SCREEN */}
        <header className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4">
          <p className="text-[12px] uppercase tracking-[0.4em] text-accent mb-8 font-sans font-bold">
            DOMESTIC INCIDENT
          </p>
          <h1 className="font-black text-[clamp(4rem,15vw,12rem)] leading-[0.8] tracking-tighter uppercase text-[#330000] drop-shadow-[0_0_40px_rgba(170,0,0,0.3)]">
            THE RED TOWEL
          </h1>
          <p className="mt-12 text-[clamp(18px,2vw,24px)] italic text-ink-soft max-w-lg">
            "An ordinary home. A red towel. And something that should never have been there."
          </p>
        </header>

        {/* CHAPTER 1 */}
        <section id="ch1" className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative">
          <div className="max-w-3xl mx-auto w-full">
            <h2 onMouseEnter={playHoverSfx} className="text-[12px] font-sans tracking-widest uppercase text-ink-mute mb-20 border-l border-ink-mute pl-6">
              I. The Discovery
            </h2>
            <div className="space-y-[35vh]">
              {redTowelChapters[0].pages.map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(26px,4vw,48px)] leading-[1.3] font-medium">
                  {pageObj.content}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 2 */}
        <section id="ch2" className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative">
          <div className="max-w-3xl mx-auto w-full relative z-10">
            <h2 onMouseEnter={playHoverSfx} className="text-[12px] font-sans tracking-widest uppercase text-accent mb-20 border-l border-accent pl-6">
              II. The Escalation
            </h2>
            <div className="space-y-[35vh]">
              {redTowelChapters[1].pages.map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(26px,4vw,48px)] leading-[1.3] font-medium">
                  {pageObj.content}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 3 */}
        <section id="ch3" className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative">
          <div className="max-w-3xl mx-auto w-full relative z-10">
            <h2 onMouseEnter={playHoverSfx} className="text-[12px] font-sans tracking-widest uppercase text-[#ff3333] mb-20 border-l-4 border-[#ff3333] pl-6 font-bold">
              III. The Infestation
            </h2>
            <div className="space-y-[35vh]">
              {redTowelChapters[2].pages.map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(26px,4vw,48px)] leading-[1.2] font-black text-accent drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] tracking-tight">
                  {pageObj.content}
                </p>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-40 text-center text-accent text-[12px] font-sans uppercase tracking-[0.4em]">
          THE LIGHTS WENT OUT.
        </footer>
      </div>
    </div>
  );
}
