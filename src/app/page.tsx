'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '@/data/chapters';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const droneMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxHoverRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize Audio
  useEffect(() => {
    bgMusicRef.current = new Audio('https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;

    droneMusicRef.current = new Audio('https://actions.google.com/sounds/v1/science_fiction/pulsing_rhythmic_drone.ogg');
    droneMusicRef.current.loop = true;
    droneMusicRef.current.volume = 0; // Starts silent, ramps up on Ch 3

    sfxHoverRef.current = new Audio('https://actions.google.com/sounds/v1/ui/button_click.ogg');
    sfxHoverRef.current.volume = 0.2;
  }, []);

  const toggleSound = () => {
    if (isMuted) {
      bgMusicRef.current?.play().catch(() => console.log("Audio blocked"));
      droneMusicRef.current?.play().catch(() => console.log("Audio blocked"));
      setIsMuted(false);
    } else {
      bgMusicRef.current?.pause();
      droneMusicRef.current?.pause();
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
    // 1. Text Scrub Reveal (Glitch to Focus)
    const paragraphs = document.querySelectorAll('.story-text');
    paragraphs.forEach((p) => {
      gsap.fromTo(p, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95,
          filter: 'blur(20px) contrast(200%)' // Analog glitch feel
        },
        { 
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px) contrast(100%)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 2.5,
          }
        }
      );
    });

    // 2. Timeline Shift (2005 -> 2024 Transition)
    // When Ch 3 hits, the CRT overlay dies, background flashes white, and audio crossfades
    const ch3 = document.querySelector('#ch3');
    if (ch3) {
      ScrollTrigger.create({
        trigger: ch3,
        start: 'top 60%',
        end: 'top 20%',
        scrub: true,
        onUpdate: (self) => {
          // Fade out rain, fade in sterile drone
          if (bgMusicRef.current && droneMusicRef.current && !isMuted) {
            bgMusicRef.current.volume = 0.4 * (1 - self.progress);
            droneMusicRef.current.volume = 0.6 * self.progress;
          }
          
          // Fade out CRT scanlines
          const crt = document.querySelector('.crt-overlay') as HTMLElement;
          if (crt) crt.style.opacity = String(0.6 * (1 - self.progress));
        }
      });
      
      // Harsh flash bang entering 2024
      ScrollTrigger.create({
        trigger: ch3,
        start: 'top 50%',
        onEnter: () => {
          gsap.fromTo('#ch3-bg', 
            { backgroundColor: '#000' },
            { backgroundColor: '#fff', duration: 0.1, ease: 'power4.inOut' }
          );
        },
        onLeaveBack: () => {
          gsap.to('#ch3-bg', { backgroundColor: '#000', duration: 0.1 });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMuted]);

  return (
    <div className="relative w-full min-h-screen bg-bg text-ink selection:bg-ink selection:text-bg font-serif overflow-hidden transition-colors duration-1000">
      
      {/* Immersive Overlays */}
      <div className="ink-noise"></div>
      <div className="crt-overlay"></div>

      {/* Main Container */}
      <div ref={containerRef} className="relative z-10 w-full">
        
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-[clamp(20px,4vw,40px)] mix-blend-difference flex justify-between items-center">
          <span className="font-bold text-[18px] tracking-widest uppercase font-sans">05-ALPHA</span>
          <div className="flex gap-4 font-sans">
            <button onClick={toggleSound} onMouseEnter={playHoverSfx} className="text-[12px] uppercase tracking-widest border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer">
              AUDIO: {isMuted ? 'MUTE' : 'LIVE'}
            </button>
            <a href="#prologue" onMouseEnter={playHoverSfx} className="text-[12px] uppercase tracking-widest border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-colors">
              EXECUTE
            </a>
          </div>
        </nav>

        {/* HERO / TITLE SCREEN */}
        <header className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4">
          <p className="text-[12px] uppercase tracking-[0.4em] text-ink-soft mb-8 font-sans">
            LOG RECORD: SEP 2005
          </p>
          <h1 className="font-bold text-[clamp(4rem,12vw,10rem)] leading-[0.8] tracking-[-0.04em] uppercase drop-shadow-[0_0_20px_rgba(51,255,51,0.4)]">
            THE ANCHOR
          </h1>
          <p className="mt-12 text-[clamp(18px,2vw,24px)] italic text-ink-soft max-w-lg">
            "It hasn't stopped raining since September."
          </p>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
            <span className="text-[10px] uppercase tracking-widest mb-4 font-sans">Scroll To Initiate</span>
            <div className="w-[1px] h-[60px] bg-gradient-to-b from-ink to-transparent"></div>
          </div>
        </header>

        {/* PROLOGUE */}
        <section id="prologue" className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)]">
          <div className="max-w-3xl mx-auto w-full">
            <div className="space-y-40">
              <p className="story-text text-[clamp(26px,4vw,44px)] leading-[1.3] font-medium drop-shadow-[0_0_10px_rgba(51,255,51,0.2)]">
                Miles sat bathed in the hum of a cathode-ray tube, scrolling through forgotten forums in the dark.
              </p>
              <p className="story-text text-[clamp(26px,4vw,44px)] leading-[1.3] font-medium text-ink-soft">
                The thread title was buried on page four of a conspiracy board: 'The World Ends in 2006. Here is the math.'
              </p>
            </div>
          </div>
        </section>

        {/* CHAPTER 1 */}
        <section id="ch1" className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020305] to-transparent -z-10"></div>
          <div className="max-w-3xl mx-auto w-full">
            <h2 onMouseEnter={playHoverSfx} className="text-[12px] font-sans tracking-widest uppercase text-ink-mute mb-20 border-l border-ink-mute pl-6">
              I. The Prediction
            </h2>
            <div className="space-y-[30vh]">
              {chapters[0].pages.slice(3).map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(26px,3.5vw,40px)] leading-[1.4] font-medium">
                  {pageObj.content.replace(/^\d+\.\s*/, '')}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 2: Two Moons (Deep Blue/Dark) */}
        <section id="ch2" className="min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative bg-[#010103] text-[#a0b0ff]">
          {/* Subtle Two Moons background graphic */}
          <div className="absolute top-[20%] right-[10%] opacity-10 pointer-events-none mix-blend-screen flex gap-8">
            <div className="w-[30vw] h-[30vw] rounded-full bg-white blur-3xl"></div>
            <div className="w-[30vw] h-[30vw] rounded-full bg-white blur-3xl"></div>
          </div>

          <div className="max-w-3xl mx-auto w-full relative z-10">
            <h2 onMouseEnter={playHoverSfx} className="text-[12px] font-sans tracking-widest uppercase text-[#5060a0] mb-20 border-l border-[#5060a0] pl-6">
              II. The Fracture
            </h2>
            <div className="space-y-[30vh]">
              {chapters[1].pages.map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(26px,3.5vw,40px)] leading-[1.4] font-medium drop-shadow-[0_0_15px_rgba(160,176,255,0.3)]">
                  {pageObj.content.replace(/^\d+\.\s*/, '')}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 3: The Shift (Harsh White Sterile Theme) */}
        <section id="ch3" className="theme-2024 min-h-screen flex items-center py-32 px-[clamp(20px,5vw,60px)] relative transition-colors duration-100">
          <div id="ch3-bg" className="absolute inset-0 bg-black -z-10 transition-colors duration-100"></div>
          
          <div className="max-w-3xl mx-auto w-full relative z-10">
            <h2 onMouseEnter={playHoverSfx} className="text-[12px] font-sans tracking-widest uppercase text-accent mb-20 border-l-4 border-accent pl-6 font-bold">
              III. The Shift — 2024
            </h2>
            <div className="space-y-[30vh]">
              {chapters[2].pages.map((pageObj, idx) => (
                <p key={idx} className="story-text text-[clamp(26px,3.5vw,40px)] leading-[1.4] font-bold text-black tracking-tight">
                  {pageObj.content.replace(/^\d+\.\s*/, '')}
                </p>
              ))}
            </div>
          </div>
        </section>

        <footer className="theme-2024 py-40 text-center bg-white text-ink-soft text-[12px] font-sans uppercase tracking-[0.4em]">
          TIMELINE QUARANTINED
        </footer>
      </div>
    </div>
  );
}
