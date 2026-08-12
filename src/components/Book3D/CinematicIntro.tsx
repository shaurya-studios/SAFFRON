'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useBookStore } from '@/store/bookStore';

export default function CinematicIntro() {
  const { introComplete, completeIntro } = useBookStore();
  const [isVisible, setIsVisible] = useState(!introComplete);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (introComplete) return;

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Instant reveal for reduced motion
      gsap.set([titleRef.current, subtitleRef.current, lightRef.current, skipRef.current], { 
        opacity: 1 
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Animation finished, wait for interaction
      }
    });

    // Fade in the warm point light
    tl.to(lightRef.current, {
      opacity: 0.4,
      duration: 3,
      ease: 'power2.inOut',
    })
    // Resolve the foil-stamped title
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'power3.out',
    }, '-=1.5')
    // Subtitle and skip button
    .to([subtitleRef.current, skipRef.current], {
      opacity: 1,
      duration: 1.5,
      stagger: 0.5,
    }, '-=1');

    return () => {
      tl.kill();
    };
  }, [introComplete]);

  const handleOpen = () => {
    // Fade out sequence
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsVisible(false);
        completeIntro();
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-50 bg-char-umbra flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleOpen}
    >
      {/* Warm Point Light / Lamp Effect */}
      <div 
        ref={lightRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-0 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(232, 184, 87, 0.4) 0%, rgba(22, 17, 11, 0) 70%)',
          transform: 'translateY(-30%)'
        }}
      />
      
      {/* Foil-Stamped Title */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] text-saffron-gold opacity-0 translate-y-4"
          style={{
            textShadow: '0 2px 10px rgba(200, 120, 30, 0.3), 0 0 1px rgba(232, 184, 87, 0.8)'
          }}
        >
          SAFFRON
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-ui mt-6 text-sm md:text-base tracking-[0.3em] uppercase text-aged-parchment/60 opacity-0"
        >
          An Interactive Story
        </p>

        <button 
          ref={skipRef}
          className="font-ui mt-16 px-6 py-2 border border-aged-parchment/20 rounded-full text-xs tracking-widest text-aged-parchment/60 hover:bg-aged-parchment/10 hover:text-aged-parchment transition-all opacity-0"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the container click
            handleOpen();
          }}
        >
          TAP TO OPEN
        </button>
      </div>
    </div>
  );
}
