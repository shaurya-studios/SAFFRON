import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({ 
      lerp: 0.085, 
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4 
    });
    
    lenis.on('scroll', ScrollTrigger.update);
    
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);
}
