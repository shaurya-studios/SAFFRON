'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '@/data/chapters';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 1. Wipe Curtain Animation
    gsap.fromTo(
      wipeRef.current,
      { scaleY: 1 },
      { scaleY: 0, duration: 1.2, ease: 'expo.inOut', delay: 0.1 }
    );

    // 2. Exact GSAP Stagger Reveal for Hero
    if (heroTextRef.current) {
      const spans = heroTextRef.current.querySelectorAll('.reveal-span');
      gsap.fromTo(
        spans,
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.8 }
      );
    }
    
    // 3. Marquee animation
    gsap.to('.cs-marq', {
      xPercent: -50,
      ease: 'none',
      duration: 15,
      repeat: -1
    });

    // 4. Scrubbing Reading Experience
    // The text starts at low opacity and scales down. As it reaches the center, it becomes 100% opaque and scales to 1.
    const readLines = document.querySelectorAll('.read-line');
    readLines.forEach((line) => {
      gsap.fromTo(line, 
        { opacity: 0.1, scale: 0.95 },
        { 
          opacity: 1,
          scale: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );
    });

    // 5. Smooth Anchor Scrolling via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        // @ts-ignore
        if (window.lenis) window.lenis.scrollTo(anchor.hash);
        else document.querySelector(anchor.hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div id="cs-root" className="relative w-full bg-[#FFF48D]">
      {/* Wipe Curtain */}
      <div ref={wipeRef} className="fixed inset-0 z-[400] bg-ink transform scale-y-0 origin-bottom pointer-events-none" />

      <div className="fixed inset-0 z-[9997] pointer-events-none opacity-5 mix-blend-overlay" style={{backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22/></svg>')"}}></div>
      <div className="fixed inset-0 z-[9996] pointer-events-none" style={{background: 'radial-gradient(130% 100% at 50% 45%,transparent 55%,rgba(14,14,12,.18) 100%)'}}></div>

      {/* NAV */}
      <nav id="cs-nav" className="fixed top-0 left-0 right-0 z-[180] flex items-center justify-between px-[clamp(18px,4vw,44px)] py-[18px]">
        <a href="#top" className="no-underline font-extrabold text-[22px] tracking-[-0.03em] text-ink">saffron<span className="text-ink">*</span></a>
        <div className="flex items-center gap-[clamp(12px,2vw,30px)]">
          <a href="#prologue" className="no-underline font-bold text-[15px] bg-ink text-accent px-[20px] py-[11px] rounded-full transition-transform hover:scale-105">Read Book →</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative min-h-[100svh] flex flex-col justify-center px-[clamp(18px,4vw,44px)] pt-[120px] pb-[60px] overflow-hidden bg-bg z-10">
        <div className="absolute right-[clamp(18px,6vw,90px)] top-[18%] w-[clamp(96px,12vw,150px)] h-[clamp(96px,12vw,150px)] z-10">
          <div className="absolute inset-0 animate-[cs-spin_13s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs><path id="cs-c33" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"></path></defs>
              <text className="mono text-[8.4px] tracking-[2.1px] fill-ink uppercase font-medium">
                <textPath href="#cs-c33" startOffset="0">READ SAFFRON · BY DHANRAJ · A STORY · </textPath>
              </text>
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-[38%] h-[38%] rounded-full bg-ink"></span>
          </div>
        </div>

        <div className="mono text-[13px] tracking-[0.12em] uppercase mb-[clamp(20px,3vw,34px)] flex items-center gap-[12px]">
          <span className="w-[9px] h-[9px] rounded-full bg-ink animate-[cs-blink_1.5s_step-end_infinite]"></span>
          <span>Saffron — An Interactive Story</span>
        </div>

        <h1 ref={heroTextRef} className="relative z-10 m-0 font-bold text-[clamp(3rem,11vw,11rem)] leading-[0.9] tracking-[-0.045em] max-w-[14ch]">
          <span className="block overflow-visible"><span className="reveal-span block opacity-0 translate-y-[38px]">A story</span></span>
          <span className="block overflow-visible"><span className="reveal-span block opacity-0 translate-y-[38px]">that</span></span>
          <span className="block overflow-visible"><span className="reveal-span inline-block relative opacity-0 translate-y-[38px]">
            actually hits.
            <svg viewBox="0 0 320 120" preserveAspectRatio="none" className="absolute left-[-6%] top-[-8%] w-[112%] h-[116%] overflow-visible pointer-events-none">
              <path d="M30 64 C70 18 250 14 300 52 C322 70 300 104 180 110 C70 116 6 96 14 62 C20 36 70 26 120 26" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"></path>
            </svg>
          </span></span>
        </h1>

        <div className="relative z-10 flex items-center gap-[clamp(20px,3vw,40px)] flex-wrap mt-[clamp(32px,5vw,56px)]">
          <a href="#prologue" className="inline-flex items-center gap-[10px] bg-ink text-accent no-underline font-bold text-[clamp(15px,1.3vw,18px)] px-[32px] py-[18px] rounded-full transition-transform hover:scale-105 hover:-rotate-[1.5deg]">
            Begin Reading →
          </a>
          <span className="max-w-[400px] text-[clamp(15px,1.2vw,17px)] leading-[1.5] font-medium text-ink">
            For the ones willing to make something beautiful while still trying to make ends meet.
          </span>
        </div>
      </header>

      {/* MARQUEE BAR */}
      <div className="bg-ink text-accent overflow-hidden py-[18px] border-t-[3px] border-ink relative z-10">
        <div className="cs-marq flex whitespace-nowrap font-bold text-[clamp(1.4rem,3vw,2.4rem)] tracking-[-0.02em]">
          <span className="px-[0.4em]">Affection</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Situations</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Management</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Dhanraj</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Saffron</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Affection</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Situations</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Management</span><span className="px-[0.4em]">✦</span>
        </div>
      </div>

      {/* THE PROLOGUE */}
      <section id="prologue" className="bg-paper py-[clamp(60px,9vw,140px)] px-[clamp(18px,4vw,44px)] overflow-hidden relative z-10 rounded-b-[48px] shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-[clamp(28px,5vw,80px)] items-end">
            <div>
              <div className="mono text-[13px] tracking-[0.14em] uppercase mb-[22px] flex items-center gap-[10px]">
                <span className="w-[9px] h-[9px] rounded-full bg-ink"></span>
                <span>The Setup</span>
              </div>
              <h2 className="m-0 font-bold text-[clamp(2.2rem,5.8vw,5.2rem)] leading-[0.94] tracking-[-0.035em]">
                It was raining<br/>outside,
                <span className="relative inline-flex flex-col h-[0.94em] overflow-hidden align-bottom ml-2">
                  <span className="flex flex-col animate-[cs-rotword_6.5s_cubic-bezier(.76,0,.24,1)_infinite]">
                    <span className="leading-[0.94em] text-ink">September 2005.</span>
                    <span className="leading-[0.94em] text-ink">Miles was 19.</span>
                    <span className="leading-[0.94em] text-ink">World ends 2006.</span>
                    <span className="leading-[0.94em] text-ink">September 2005.</span>
                  </span>
                  <svg viewBox="0 0 240 40" preserveAspectRatio="none" className="absolute left-0 bottom-[-6px] w-[100%] h-[22px] overflow-visible">
                    <path d="M6 22 C70 8 170 8 234 18" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round"></path>
                  </svg>
                </span>
              </h2>
            </div>
            <div>
              <p className="m-0 mb-[20px] text-[clamp(16px,1.3vw,19px)] leading-[1.5] font-semibold text-ink">
                Miles was watching online videos in his television, suddenly a wave of rain came up with wind.
              </p>
              <div className="flex gap-[22px] flex-wrap mono text-[12px] tracking-[0.06em] uppercase text-ink-soft">
                <span>◆ Sci-Fi</span><span>◆ Time Shift</span><span>◆ Mystery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW READING EXPERIENCE: Sticky Backgrounds + Scrollable Flowing Text */}
      
      {/* PHASE 01: CHAPTER 1 */}
      <section className="relative w-full z-10">
        {/* The Pinned Background layer */}
        <div className="sticky top-0 w-full h-screen bg-ink overflow-hidden rounded-t-[48px] -z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
           <div aria-hidden="true" className="absolute right-[-3%] bottom-[-14%] font-bold text-[min(52vw,64vh)] leading-[0.7] tracking-[-0.06em] text-[rgba(255,244,141,0.07)] pointer-events-none select-none">
              01
           </div>
        </div>
        
        {/* The Scrollable Text layer */}
        <div className="relative z-10 pt-[150px] pb-[300px] px-[clamp(18px,4vw,44px)]">
           <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <div className="flex items-center gap-[10px] mono text-[12px] tracking-[0.14em] mb-[26px]">
                <span className="text-accent">01</span><span className="w-[34px] h-[2px] bg-accent"></span>
                <span className="opacity-35 text-white">02</span><span className="w-[12px] h-[1px] bg-[rgba(255,244,141,0.35)]"></span>
                <span className="opacity-35 text-white">03</span>
              </div>
              <h2 className="m-0 mb-[100px] font-bold text-[clamp(3rem,8vw,6.5rem)] leading-[0.94] tracking-[-0.03em] text-white">
                The Prediction.
              </h2>
              
              <div className="space-y-[12vh]">
                {chapters[0].pages.map((pageObj, idx) => (
                  <p key={idx} className="read-line m-0 text-[clamp(24px,3.5vw,42px)] leading-tight font-bold text-accent">
                    {pageObj.content.replace(/^\d+\.\s*/, '') /* Strips the numbers for a cleaner read */}
                  </p>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* PHASE 02: CHAPTER 2 */}
      <section className="relative w-full z-20">
        <div className="sticky top-0 w-full h-screen bg-[#FFF48D] overflow-hidden rounded-t-[48px] -z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.15)]">
           <div aria-hidden="true" className="absolute right-[-3%] bottom-[-14%] font-bold text-[min(52vw,64vh)] leading-[0.7] tracking-[-0.06em] text-[rgba(14,14,12,0.06)] pointer-events-none select-none">
              02
           </div>
        </div>
        
        <div className="relative z-10 pt-[150px] pb-[300px] px-[clamp(18px,4vw,44px)]">
           <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <div className="flex items-center gap-[10px] mono text-[12px] tracking-[0.14em] mb-[26px]">
                <span className="opacity-35 text-ink">01</span><span className="w-[12px] h-[1px] bg-[rgba(14,14,12,0.35)]"></span>
                <span className="text-ink">02</span><span className="w-[34px] h-[2px] bg-ink"></span>
                <span className="opacity-35 text-ink">03</span>
              </div>
              <h2 className="m-0 mb-[100px] font-bold text-[clamp(3rem,8vw,6.5rem)] leading-[0.94] tracking-[-0.03em] text-ink">
                The Two Moons.
              </h2>
              
              <div className="space-y-[12vh]">
                {chapters[1].pages.map((pageObj, idx) => (
                  <p key={idx} className="read-line m-0 text-[clamp(24px,3.5vw,42px)] leading-tight font-bold text-ink">
                    {pageObj.content.replace(/^\d+\.\s*/, '')}
                  </p>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* PHASE 03: CHAPTER 3 */}
      <section className="relative w-full z-30">
        <div className="sticky top-0 w-full h-screen bg-[#eef5fa] overflow-hidden rounded-t-[48px] -z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
           <div aria-hidden="true" className="absolute right-[-3%] bottom-[-14%] font-bold text-[min(52vw,64vh)] leading-[0.7] tracking-[-0.06em] text-[rgba(48,58,64,0.06)] pointer-events-none select-none">
              03
           </div>
        </div>
        
        <div className="relative z-10 pt-[150px] pb-[300px] px-[clamp(18px,4vw,44px)]">
           <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <div className="flex items-center gap-[10px] mono text-[12px] tracking-[0.14em] mb-[26px]">
                <span className="opacity-35 text-[#303a40]">01</span><span className="w-[12px] h-[1px] bg-[rgba(48,58,64,0.35)]"></span>
                <span className="opacity-35 text-[#303a40]">02</span><span className="w-[12px] h-[1px] bg-[rgba(48,58,64,0.35)]"></span>
                <span className="text-[#0a1216]">03</span><span className="w-[34px] h-[2px] bg-[#0a1216]"></span>
              </div>
              <h2 className="m-0 mb-[100px] font-bold text-[clamp(3rem,8vw,6.5rem)] leading-[0.94] tracking-[-0.03em] text-[#0a1216]">
                The Time Shift.
              </h2>
              
              <div className="space-y-[12vh]">
                {chapters[2].pages.map((pageObj, idx) => (
                  <p key={idx} className="read-line m-0 text-[clamp(24px,3.5vw,42px)] leading-tight font-bold text-[#303a40]">
                    {pageObj.content.replace(/^\d+\.\s*/, '')}
                  </p>
                ))}
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}
