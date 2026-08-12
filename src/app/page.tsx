'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '@/data/chapters';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    // Basic Hero Animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
    );

    // Text Reveal Animations for paragraphs using ScrollTrigger
    textRefs.current.forEach((ref) => {
      if (!ref) return;
      
      gsap.fromTo(
        ref,
        { opacity: 0, y: 40, rotationX: -10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative w-full text-ink">
      
      {/* SECTION 1: HERO & CHAPTER 1 (Yellow Theme) */}
      <div className="relative bg-[#FFF48D] min-h-screen z-0 pb-32">
        {/* Massive Marquee */}
        <div className="absolute top-0 w-full overflow-hidden whitespace-nowrap bg-ink text-accent py-4 border-b-[3px] border-ink z-10 flex">
          <div className="animate-[cs-spin_20s_linear_infinite] flex items-center gap-8 sg-text-large tracking-tighter w-[200vw]">
             SAFFRON ✦ AN INTERACTIVE STORY ✦ DHANRAJ SAFFRON ✦ AN INTERACTIVE STORY ✦ DHANRAJ ✦
             SAFFRON ✦ AN INTERACTIVE STORY ✦ DHANRAJ SAFFRON ✦ AN INTERACTIVE STORY ✦ DHANRAJ ✦
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-16 pt-48" ref={heroRef}>
          <h1 className="sg-text-huge mb-16 uppercase max-w-[14ch]">
            A STORY<br/>
            THAT<br/>
            ACTUALLY<br/>
            HITS.
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-24">
            <button className="bg-ink text-accent px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Begin Reading →
            </button>
            <p className="max-w-md sg-text-body">
              For the ones willing to make something beautiful while still trying to make ends meet.
            </p>
          </div>
        </div>

        {/* Chapter 1 Text Flowing */}
        <div className="container mx-auto px-6 md:px-16 mt-48">
          <div className="flex items-center gap-4 sg-mono-label mb-12">
            <span className="w-2 h-2 rounded-full bg-ink animate-pulse" />
            CHAPTER 01 / {chapters[0].title}
          </div>
          <div className="max-w-3xl mx-auto space-y-12">
            {chapters[0].pages.map((pageObj, index) => (
              <p 
                key={index} 
                className="sg-text-body text-2xl md:text-4xl leading-relaxed font-serif"
                ref={el => { textRefs.current.push(el); }}
              >
                {pageObj.content}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: CHAPTER 2 (Sticky Stack Dark Theme) */}
      <div className="sticky top-0 h-screen w-full bg-[#0e0e0c] text-[#faf7ea] overflow-y-auto rounded-t-[48px] shadow-[0_-20px_40px_rgba(0,0,0,0.2)] z-10 pt-24 pb-32">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex items-center gap-4 sg-mono-label mb-24 text-[#FFF48D]">
            <span className="w-2 h-2 rounded-full bg-[#FFF48D]" />
            CHAPTER 02 / {chapters[1].title}
          </div>
          
          <div className="max-w-4xl mx-auto space-y-16">
             <h2 className="sg-text-large mb-16 text-[#FFF48D]">
               Then, something shifts. Not dramatically. Not all at once.
             </h2>
            {chapters[1].pages.map((pageObj, index) => (
              <p 
                key={index} 
                className="sg-text-body text-xl md:text-3xl leading-relaxed font-serif text-[#cfcfc4]"
                ref={el => { textRefs.current.push(el); }}
              >
                {pageObj.content}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: CHAPTER 3 (Sticky Stack Grey Theme with Glitch Cutoff) */}
      <div className="sticky top-0 h-screen w-full bg-[#1e1e1e] text-[#f4f4f4] overflow-y-auto rounded-t-[48px] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-20 pt-24 pb-32 flex flex-col justify-between">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex items-center gap-4 sg-mono-label mb-24 text-[#8ED8FF]">
            <span className="w-2 h-2 rounded-full bg-[#8ED8FF]" />
            CHAPTER 03 / {chapters[2].title}
          </div>
          
          <div className="max-w-5xl mx-auto space-y-16 pb-32">
            {chapters[2].pages.map((pageObj, index) => (
              <p 
                key={index} 
                className="sg-text-body text-2xl md:text-4xl leading-loose font-serif font-bold tracking-tight"
                ref={el => { textRefs.current.push(el); }}
              >
                {pageObj.content}
              </p>
            ))}
          </div>
        </div>
        
        {/* The Abrupt Glitch Cutoff */}
        <div className="w-full bg-[#f4f4f4] text-[#1e1e1e] py-12 px-6 overflow-hidden relative">
           <div className="absolute inset-0 flex space-x-1 opacity-20 pointer-events-none">
              {Array.from({length: 20}).map((_, i) => (
                <div key={i} className="flex-1 bg-black h-full" style={{transform: `scaleY(${Math.random()})`, transformOrigin: 'top'}} />
              ))}
           </div>
           <h3 className="sg-text-huge uppercase text-center relative z-10 mix-blend-exclusion text-white">
             END OF LINE
           </h3>
        </div>
      </div>

    </main>
  );
}
