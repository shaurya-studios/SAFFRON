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
    // 1. On Mount: Wipe Curtain Animation (Screen starts black, then scales down)
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

    // 4. Paragraph stagger reveals
    const pReveals = document.querySelectorAll('.p-reveal');
    pReveals.forEach((p) => {
      gsap.fromTo(p, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
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

      {/* Global grain (using inline SVG like Cloudstudio) */}
      <div className="fixed inset-0 z-[9997] pointer-events-none opacity-5 mix-blend-overlay" style={{backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22/></svg>')"}}></div>
      <div className="fixed inset-0 z-[9996] pointer-events-none" style={{background: 'radial-gradient(130% 100% at 50% 45%,transparent 55%,rgba(14,14,12,.18) 100%)'}}></div>

      {/* NAV */}
      <nav id="cs-nav" className="fixed top-0 left-0 right-0 z-[180] flex items-center justify-between px-[clamp(18px,4vw,44px)] py-[18px] transition-all duration-400">
        <a href="#top" className="no-underline font-extrabold text-[22px] tracking-[-0.03em] text-ink">saffron<span className="text-ink">*</span></a>
        <div className="flex items-center gap-[clamp(12px,2vw,30px)]">
          <a href="#work" className="no-underline font-semibold text-[15px] text-ink">Work</a>
          <a href="#faq" className="no-underline font-semibold text-[15px] text-ink">FAQ</a>
          <a href="#read" className="no-underline font-bold text-[15px] bg-ink text-accent px-[20px] py-[11px] rounded-full transition-transform hover:scale-105">Read Book →</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative min-h-[100svh] flex flex-col justify-center px-[clamp(18px,4vw,44px)] pt-[120px] pb-[60px] overflow-hidden">
        
        {/* Spinning Text SVG in corner */}
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

        <div className="mono text-[13px] tracking-[0.12em] uppercase mb-[clamp(20px,3vw,34px)] flex items-center gap-[12px] opacity-100 transform-none">
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

        <div className="relative z-10 flex items-center gap-[clamp(20px,3vw,40px)] flex-wrap mt-[clamp(32px,5vw,56px)] opacity-100">
          <a href="#prologue" className="inline-flex items-center gap-[10px] bg-ink text-accent no-underline font-bold text-[clamp(15px,1.3vw,18px)] px-[32px] py-[18px] rounded-full transition-transform hover:scale-105 hover:-rotate-[1.5deg]">
            Begin Reading →
          </a>
          <span className="max-w-[400px] text-[clamp(15px,1.2vw,17px)] leading-[1.5] font-medium text-ink">
            For the ones willing to make something beautiful while still trying to make ends meet.
          </span>
        </div>
      </header>

      {/* MARQUEE BAR */}
      <div className="bg-ink text-accent overflow-hidden py-[18px] border-t-[3px] border-ink">
        <div className="cs-marq flex whitespace-nowrap font-bold text-[clamp(1.4rem,3vw,2.4rem)] tracking-[-0.02em]">
          <span className="px-[0.4em]">Affection</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Situations</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Management</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Dhanraj</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Saffron</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Affection</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Situations</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Management</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Dhanraj</span><span className="px-[0.4em]">✦</span>
          <span className="px-[0.4em]">Saffron</span><span className="px-[0.4em]">✦</span>
        </div>
      </div>

      {/* WHAT WE DO -> THE PROLOGUE */}
      <section id="prologue" className="bg-paper py-[clamp(60px,9vw,140px)] px-[clamp(18px,4vw,44px)] overflow-hidden">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-[clamp(28px,5vw,80px)] items-end mb-[clamp(40px,5vw,72px)]">
            <div>
              <div className="mono text-[13px] tracking-[0.14em] uppercase mb-[22px] flex items-center gap-[10px]">
                <span className="w-[9px] h-[9px] rounded-full bg-ink"></span>
                <span>The Setup</span>
              </div>
              <h2 className="m-0 font-bold text-[clamp(2.2rem,5.8vw,5.2rem)] leading-[0.94] tracking-[-0.035em]">
                It was his first day<br/>at a
                <span className="relative inline-flex flex-col h-[0.94em] overflow-hidden align-bottom ml-2">
                  <span className="flex flex-col animate-[cs-rotword_6.5s_cubic-bezier(.76,0,.24,1)_infinite]">
                    <span className="leading-[0.94em] text-ink">new school.</span>
                    <span className="leading-[0.94em] text-ink">new life.</span>
                    <span className="leading-[0.94em] text-ink">new hell.</span>
                    <span className="leading-[0.94em] text-ink">new school.</span>
                  </span>
                  <svg viewBox="0 0 240 40" preserveAspectRatio="none" className="absolute left-0 bottom-[-6px] w-[100%] h-[22px] overflow-visible">
                    <path d="M6 22 C70 8 170 8 234 18" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round"></path>
                  </svg>
                </span>
              </h2>
            </div>
            <div>
              <p className="m-0 mb-[20px] text-[clamp(16px,1.3vw,19px)] leading-[1.5] font-semibold text-ink">
                He stopped outside the classroom, took a breath, and stepped inside.
              </p>
              <div className="flex gap-[22px] flex-wrap mono text-[12px] tracking-[0.06em] uppercase text-ink-soft">
                <span>◆ Suspense</span><span>◆ Drama</span><span>◆ Young Adult</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY-STACK PHASES */}
      <section id="cs-phases" className="relative bg-ink">
        
        {/* PHASE 01: CHAPTER 1 */}
        <div className="sticky top-0 h-screen overflow-hidden rounded-t-[36px] bg-ink text-accent">
          <div className="relative w-full h-full flex items-center overflow-y-auto">
            <div aria-hidden="true" className="fixed right-[-3%] bottom-[-14%] font-bold text-[min(52vw,64vh)] leading-[0.7] tracking-[-0.06em] text-[rgba(255,244,141,0.07)] pointer-events-none select-none z-0">
              01
            </div>
            <div className="relative z-10 max-w-[1320px] w-full mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-[clamp(24px,5vw,72px)] items-start pt-[96px] px-[clamp(18px,4vw,44px)] pb-[96px]">
              <div>
                <div className="flex items-center gap-[10px] mono text-[12px] tracking-[0.14em] mb-[26px]">
                  <span className="text-accent">01</span><span className="w-[34px] h-[2px] bg-accent"></span>
                  <span className="opacity-35">02</span><span className="w-[12px] h-[1px] bg-[rgba(255,244,141,0.35)]"></span>
                  <span className="opacity-35">03</span>
                </div>
                <div className="mono text-[12px] tracking-[0.16em] uppercase mb-[18px] text-[rgba(255,244,141,0.7)]">
                  ( {chapters[0].title} )
                </div>
                <h2 className="m-0 mb-[20px] font-bold text-[clamp(2.2rem,5vw,4.8rem)] leading-[0.94] tracking-[-0.03em] text-white">
                  The Set Up.
                </h2>
                
                <div className="space-y-[24px] mt-[48px] max-w-lg">
                  {chapters[0].pages.slice(0, 10).map((pageObj, idx) => (
                    <p key={idx} className="p-reveal m-0 text-[clamp(15px,1.2vw,18px)] leading-[1.55] font-medium text-[#cfcfc4]">
                      {pageObj.content}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PHASE 02: CHAPTER 2 */}
        <div className="sticky top-0 h-screen overflow-hidden rounded-t-[36px] bg-bg text-ink shadow-[0_-20px_40px_rgba(0,0,0,0.15)]">
          <div className="relative w-full h-full flex items-center overflow-y-auto">
            <div aria-hidden="true" className="fixed right-[-3%] bottom-[-14%] font-bold text-[min(52vw,64vh)] leading-[0.7] tracking-[-0.06em] text-[rgba(14,14,12,0.06)] pointer-events-none select-none z-0">
              02
            </div>
            <div className="relative z-10 max-w-[1320px] w-full mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-[clamp(24px,5vw,72px)] items-start pt-[96px] px-[clamp(18px,4vw,44px)] pb-[96px]">
              <div>
                <div className="flex items-center gap-[10px] mono text-[12px] tracking-[0.14em] mb-[26px]">
                  <span className="opacity-35">01</span><span className="w-[12px] h-[1px] bg-[rgba(14,14,12,0.35)]"></span>
                  <span className="text-ink">02</span><span className="w-[34px] h-[2px] bg-ink"></span>
                  <span className="opacity-35">03</span>
                </div>
                <div className="mono text-[12px] tracking-[0.16em] uppercase mb-[18px] text-[rgba(14,14,12,0.6)]">
                  ( {chapters[1].title} )
                </div>
                <h2 className="m-0 mb-[20px] font-bold text-[clamp(2.2rem,5vw,4.8rem)] leading-[0.94] tracking-[-0.03em] text-ink">
                  Then, something shifts.
                </h2>
                
                <div className="space-y-[24px] mt-[48px] max-w-lg">
                  {chapters[1].pages.slice(0, 10).map((pageObj, idx) => (
                    <p key={idx} className="p-reveal m-0 text-[clamp(15px,1.2vw,18px)] leading-[1.55] font-medium text-ink-soft">
                      {pageObj.content}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PHASE 03: CHAPTER 3 */}
        <div className="sticky top-0 h-screen overflow-hidden rounded-t-[36px] bg-[#eef5fa] text-[#303a40] shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
          <div className="relative w-full h-full flex items-center overflow-y-auto">
            <div aria-hidden="true" className="fixed right-[-3%] bottom-[-14%] font-bold text-[min(52vw,64vh)] leading-[0.7] tracking-[-0.06em] text-[rgba(48,58,64,0.06)] pointer-events-none select-none z-0">
              03
            </div>
            <div className="relative z-10 max-w-[1320px] w-full mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-[clamp(24px,5vw,72px)] items-start pt-[96px] px-[clamp(18px,4vw,44px)] pb-[96px]">
              <div>
                <div className="flex items-center gap-[10px] mono text-[12px] tracking-[0.14em] mb-[26px]">
                  <span className="opacity-35">01</span><span className="w-[12px] h-[1px] bg-[rgba(48,58,64,0.35)]"></span>
                  <span className="opacity-35">02</span><span className="w-[12px] h-[1px] bg-[rgba(48,58,64,0.35)]"></span>
                  <span className="text-[#303a40]">03</span><span className="w-[34px] h-[2px] bg-[#303a40]"></span>
                </div>
                <div className="mono text-[12px] tracking-[0.16em] uppercase mb-[18px] text-[rgba(48,58,64,0.6)]">
                  ( {chapters[2].title} )
                </div>
                <h2 className="m-0 mb-[20px] font-bold text-[clamp(2.2rem,5vw,4.8rem)] leading-[0.94] tracking-[-0.03em] text-[#0a1216]">
                  The Cutoff.
                </h2>
                
                <div className="space-y-[24px] mt-[48px] max-w-lg">
                  {chapters[2].pages.slice(0, 10).map((pageObj, idx) => (
                    <p key={idx} className="p-reveal m-0 text-[clamp(15px,1.2vw,18px)] leading-[1.55] font-medium text-[#303a40]">
                      {pageObj.content}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
