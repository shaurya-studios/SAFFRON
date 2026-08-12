'use client';

import { useBookStore } from '@/store/bookStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HtmlOverlay() {
  const { prevPage, nextPage, transitionLocked } = useBookStore();

  return (
    <div className="html-layer pointer-events-none flex flex-col items-center justify-center p-6 md:p-16 z-50">
      {/* Interactive Navigation Zones (Invisible click targets covering left/right thirds) */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-auto cursor-pointer"
        onClick={() => !transitionLocked && prevPage()}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-auto cursor-pointer"
        onClick={() => !transitionLocked && nextPage()}
      />

      {/* Visible Nav Controls (Bottom corners) */}
      <div className="absolute bottom-8 left-8 md:left-16 pointer-events-auto">
        <button 
          onClick={() => !transitionLocked && prevPage()}
          className="p-3 rounded-full border border-aged-parchment/20 text-aged-parchment/60 hover:bg-aged-parchment/10 hover:text-aged-parchment hover:border-aged-parchment/40 transition-all backdrop-blur-md bg-char-umbra/20"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute bottom-8 right-8 md:right-32 pointer-events-auto">
        <button 
          onClick={() => !transitionLocked && nextPage()}
          className="p-3 rounded-full border border-aged-parchment/20 text-aged-parchment/60 hover:bg-aged-parchment/10 hover:text-aged-parchment hover:border-aged-parchment/40 transition-all backdrop-blur-md bg-char-umbra/20"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
