'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '@/data/chapters';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxHoverRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize Audio
  useEffect(() => {
    bgMusicRef.current = new Audio('https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;

    sfxHoverRef.current = new Audio('https://actions.google.com/sounds/v1/ui/button_click.ogg');
    sfxHoverRef.current.volume = 0.2;
  }, []);

  const toggleSound = () => {
    if (isMuted) {
      bgMusicRef.current?.play().catch(() => console.log("Audio blocked"));
      setIsMuted(false);
    } else {
      bgMusicRef.current?.pause();
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
    // 1. The Boat Sway Effect (Subtle rocking of the entire container)
    gsap.to(containerRef.current, {
      rotation: 1.5,
      x: 10,
      y: 10,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // 2. Graphic Novel Text Reveal (Fade in slowly from the abyss)
    const paragraphs = document.querySelectorAll('.story-text');
    paragraphs.forEach((p) => {
      gsap.fromTo(p, 
        { 
          opacity: 0, 
          y: 80,
          filter: 'blur(24px)'
        },
        { 
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 2.5,
          }
        }
      );
    });

    // 3. Lightning Flash for Chapter Titles
    const chapters = document.querySelectorAll('.chapter-title');
    chapters.forEach((ch) => {
      ScrollTrigger.create({
        trigger: ch,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(ch, 
            { opacity: 0, filter: 'blur(30px)' },
            { 
              opacity: 1, 
              filter: 'blur(0px)',
              duration: 0.15, 
              ease: 'power4.inOut',
              yoyo: true,
              repeat: 3
            }
          );
        },
        once: true
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-bg text-ink selection:bg-white selection:text-black font-serif overflow-hidden">
      
      {/* Immersive Overlays */}
      <div className="ink-noise"></div>
      <div className="rain-overlay"></div>

      {/* Main Container with Sway */}
      <div ref={containerRef} className="relative z-10 w-full transform-origin-center">
        
        {/* NAV (Minimal, Graphic Novel style) */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-[clamp(20px,4vw,40px)] mix-blend-difference flex justify-between items-center">
          <span className="font-bold text-[18px] tracking-widest uppercase">Saffron</span>
          <div className="flex gap-4">
            <button onClick={toggleSound} onMouseEnter={playHoverSfx} className="text-[14px] uppercase tracking-widest border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer">
              Sound: {isMuted ? 'OFF' : 'ON'}
            </button>
            <a href="#prologue" onMouseEnter={playHoverSfx} className="text-[14px] uppercase tracking-widest border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-colors">
              Begin
            </a>
          </div>
        </nav>

        {/* HERO / TITLE SCREEN */}
        <header className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4">
          <p className="text-[12px] uppercase tracking-[0.3em] text-ink-soft mb-8">
            An Interactive Graphic Story
          </p>
          <h1 className="font-black text-[clamp(4rem,15vw,12rem)] leading-[0.8] tracking-[-0.02em] uppercase mix-blend-difference drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            SAFFRON
          </h1>
          <p className="mt-12 text-[clamp(16px,2vw,22px)] italic text-ink-soft max-w-lg">
            "It was raining outside. Miles was watching online videos..."
          </p>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
            <span className="text-[10px] uppercase tracking-widest mb-4">Scroll Down</span>
            <div className="w-[1px] h-[60px] bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </header>

        {/* PROLOGUE */}
        <section id="prologue" className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)]">
          <div className="max-w-3xl mx-auto w-full">
            <h2 onMouseEnter={playHoverSfx} className="chapter-title text-[clamp(2rem,6vw,4rem)] font-bold italic mb-20 text-ink-mute border-l-4 border-ink pl-8">
              The Setup
            </h2>
            <div className="space-y-32">
              <p className="story-text text-[clamp(24px,4vw,40px)] leading-[1.4] font-medium">
                Miles was watching online videos on his television. Suddenly, a wave of rain came up with wind.
              </p>
              <p className="story-text text-[clamp(24px,4vw,40px)] leading-[1.4] font-medium text-ink-soft">
                It was September 9th, 2005. He was 19 years old.
              </p>
            </div>
          </div>
        </section>

        {/* CHAPTER 1 */}
        <section className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080808] to-transparent -z-10"></div>
          <div className="max-w-3xl mx-auto w-full">
            <h2 onMouseEnter={playHoverSfx} className="chapter-title text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter mb-32 mix-blend-difference">
              I. The Prediction
            </h2>
            <div className="space-y-[25vh]">
              {chapters[0].pages.map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(22px,3.5vw,38px)] leading-[1.5] font-medium border-b border-white/10 pb-12">
                  {pageObj.content.replace(/^\d+\.\s*/, '')}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 2 */}
        <section className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative">
          <div className="max-w-3xl mx-auto w-full">
            <h2 onMouseEnter={playHoverSfx} className="chapter-title text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter mb-32 mix-blend-difference">
              II. Two Moons
            </h2>
            <div className="space-y-[25vh]">
              {chapters[1].pages.map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(22px,3.5vw,38px)] leading-[1.5] font-medium text-ink border-l border-white/20 pl-8">
                  {pageObj.content.replace(/^\d+\.\s*/, '')}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 3 */}
        <section className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative bg-[#020202]">
          <div className="max-w-3xl mx-auto w-full">
            <h2 onMouseEnter={playHoverSfx} className="chapter-title text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter mb-32 text-accent drop-shadow-[0_0_20px_rgba(153,0,0,0.5)]">
              III. The Time Shift
            </h2>
            <div className="space-y-[25vh]">
              {chapters[2].pages.map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(22px,3.5vw,38px)] leading-[1.5] font-bold text-white uppercase tracking-wide">
                  {pageObj.content.replace(/^\d+\.\s*/, '')}
                </p>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-32 text-center text-ink-mute text-[12px] uppercase tracking-[0.4em]">
          End of Simulation
        </footer>
      </div>
    </div>
  );
}
