'use client';

import { useBookStore } from '@/store/bookStore';
import { chapters } from '@/data/chapters';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HtmlOverlay() {
  const { currentChapter, currentPage, prevPage, nextPage, transitionLocked } = useBookStore();
  const contentRef = useRef<HTMLDivElement>(null);

  const currentChapterData = chapters[currentChapter - 1];
  const pageData = currentChapterData?.pages[currentPage];

  // Animate text entry on page change
  useEffect(() => {
    if (contentRef.current && pageData) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentPage, pageData]);

  if (!currentChapterData || !pageData) return null;

  return (
    <div className="html-layer pointer-events-none flex flex-col items-center justify-center p-6 md:p-16">
      
      {/* Chapter Title / Header */}
      <div className="absolute top-8 left-0 right-0 flex justify-center opacity-40">
        <span className="font-ui text-xs tracking-[0.3em] uppercase">
          {currentChapterData.title}
        </span>
      </div>

      {/* Narrative Text */}
      <div 
        ref={contentRef}
        className="w-full max-w-[600px] bg-aged-parchment/5 p-8 md:p-12 rounded-lg backdrop-blur-sm border border-aged-parchment/10 shadow-2xl relative z-10"
      >
        <div 
          className="book-text-content"
          dangerouslySetInnerHTML={{ __html: pageData.content.replace(/\n\n/g, '</p><p>').replace(/\*(.*?)\*/g, '<em>\</em>').replace(/^/, '<p>').replace(/$/, '</p>') }}
        />
      </div>

      {/* Interactive Navigation Zones */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-auto cursor-pointer z-0"
        onClick={() => !transitionLocked && prevPage()}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-auto cursor-pointer z-0"
        onClick={() => !transitionLocked && nextPage()}
      />

      {/* Visible Nav Controls */}
      <div className="absolute bottom-8 left-8 pointer-events-auto z-20">
        <button 
          onClick={() => !transitionLocked && prevPage()}
          className="p-3 rounded-full border border-aged-parchment/20 text-aged-parchment/60 hover:bg-aged-parchment/10 hover:text-aged-parchment transition-all"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="absolute bottom-8 right-8 pointer-events-auto z-20">
        <button 
          onClick={() => !transitionLocked && nextPage()}
          className="p-3 rounded-full border border-aged-parchment/20 text-aged-parchment/60 hover:bg-aged-parchment/10 hover:text-aged-parchment transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Page Number */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-40">
        <span className="font-ui text-xs tracking-widest">
          {pageData.page} / {currentChapterData.pages.length}
        </span>
      </div>
    </div>
  );
}
