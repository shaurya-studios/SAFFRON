"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sheet } from "./Sheet";
import { getFlattenedBook, FlattenedPage } from "@/utils/book";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

export const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pages = React.useMemo(() => getFlattenedBook(), []);
  
  // Audio refs
  const pageTurnSound = useRef<HTMLAudioElement | null>(null);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const savedPage = localStorage.getItem("saffron-page");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("saffron-page", currentPage.toString());
  }, [currentPage]);

  const turnNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      if (soundEnabled && pageTurnSound.current) {
        pageTurnSound.current.currentTime = 0;
        pageTurnSound.current.play().catch(() => {});
      }
      setCurrentPage((prev) => prev + (isDesktop ? 2 : 1));
    }
  }, [currentPage, pages.length, isDesktop, soundEnabled]);

  const turnPrev = useCallback(() => {
    if (currentPage > 0) {
      if (soundEnabled && pageTurnSound.current) {
        pageTurnSound.current.currentTime = 0;
        pageTurnSound.current.play().catch(() => {});
      }
      setCurrentPage((prev) => prev - (isDesktop ? 2 : 1));
    }
  }, [currentPage, isDesktop, soundEnabled]);

  const goToPage = useCallback((index: number) => {
    // If desktop, snap to the left side (even index) of the spread
    const target = isDesktop ? Math.floor(index / 2) * 2 : index;
    if (soundEnabled && pageTurnSound.current) {
      pageTurnSound.current.currentTime = 0;
      pageTurnSound.current.play().catch(() => {});
    }
    setCurrentPage(target);
    setShowNav(false);
  }, [isDesktop, soundEnabled]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        turnNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        turnPrev();
      } else if (e.key === "Escape") {
        setShowNav(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turnNext, turnPrev]);

  // Generate sheets for desktop
  const sheets = [];
  if (isDesktop) {
    for (let i = 0; i < pages.length; i += 2) {
      const frontPage = pages[i];
      const backPage = pages[i + 1];
      
      const frontContent = renderPageContent(frontPage, goToPage);
      const backContent = renderPageContent(backPage, goToPage);
      
      sheets.push(
        <Sheet
          key={i}
          index={i / 2}
          currentPage={currentPage}
          frontContent={frontContent}
          backContent={backContent}
          frontMood={frontPage?.mood}
          backMood={backPage?.mood}
          zIndex={pages.length - i}
          totalSheets={pages.length / 2}
        />
      );
    }
  }

  // Swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    
    if (distance > 50) turnNext();
    if (distance < -50) turnPrev();
    setTouchStart(null);
  };

  if (!mounted) {
    return <div className="w-full h-screen bg-[var(--color-paper-bg)]" />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--color-paper-bg)] flex flex-col items-center justify-center font-sans text-[var(--color-ink-primary)]">
      
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

      {/* NAVIGATION OVERLAY */}
      <AnimatePresence>
        {showNav && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[var(--color-paper-bg)] bg-opacity-95 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-8 right-8 p-4 text-[var(--color-ink-secondary)] hover:text-[var(--color-saffron-dark)] transition-colors"
              onClick={() => setShowNav(false)}
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col gap-12 w-full max-w-md px-8">
              <h2 className="font-serif text-3xl tracking-widest text-center">CONTENTS</h2>
              <div className="flex flex-col gap-6">
                {pages.filter(p => p.isTableOfContents || p.chapterId).reduce((acc, curr) => {
                  if (curr.isTableOfContents) return acc;
                  if (curr.id.endsWith('-title')) acc.push(curr);
                  return acc;
                }, [] as FlattenedPage[]).map((chapter) => (
                  <button
                    key={chapter.id}
                    className="flex justify-between items-center group w-full text-left"
                    onClick={() => goToPage(pages.indexOf(chapter))}
                  >
                    <span className="font-serif text-lg tracking-wider group-hover:text-[var(--color-saffron-dark)] transition-colors">
                      {chapter.romanNumeral} &mdash; {chapter.chapterTitle}
                    </span>
                    <span className="font-sans text-sm text-[var(--color-ink-muted)]">
                      {chapter.pageNumber}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUBTLE UI CONTROLS */}
      <div className="absolute top-6 left-6 z-40 flex gap-4">
        <button 
          className="text-xs tracking-[0.2em] font-medium text-[var(--color-ink-primary)] hover:text-[var(--color-ink-primary)] transition-all flex items-center gap-2 bg-[var(--color-paper)]/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full shadow-lg"
          onClick={() => setShowNav(true)}
        >
          <Menu size={14} /> MENU
        </button>
      </div>
      
      <div className="absolute top-6 right-6 z-40 flex gap-4">
        <button 
          className="text-[var(--color-ink-primary)] transition-all bg-[var(--color-paper)]/40 backdrop-blur-md border border-white/5 p-2 rounded-full shadow-lg hover:bg-[var(--color-paper)]/60"
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? "Disable sound" : "Enable sound"}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* BOOK RENDERER */}
      {isDesktop ? (
        <div className="relative w-[95vw] max-w-[1500px] h-[88vh] max-h-[1000px] mx-auto" style={{ perspective: "3000px" }}>
          {/* Main 3D Wrapper */}
          <motion.div 
            className="absolute inset-0 preserve-3d"
            animate={{
              rotateX: 4,
              rotateY: currentPage === 0 ? 0 : -4,
              z: -100
            }}
            transition={{ type: "spring", stiffness: 30, damping: 20 }}
          >
            {/* The Right Half of the Book Container (where sheets stack) */}
            <motion.div 
              className="absolute top-0 right-0 w-1/2 h-full preserve-3d book-shadow rounded-r-2xl"
              animate={{
                x: currentPage === 0 ? "-50%" : "0%",
              }}
            transition={{ type: "spring", stiffness: 40, damping: 14 }}
          >
            {sheets}
          </motion.div>
          
          {/* Interaction overlays for desktop */}
          <div className="absolute inset-0 flex z-30 pointer-events-none">
            <div 
              className="w-1/2 h-full cursor-pointer pointer-events-auto"
              onClick={turnPrev}
            />
            <div 
              className="w-1/2 h-full cursor-pointer pointer-events-auto"
              onClick={turnNext}
            />
          </div>
            </motion.div>
        </div>
      ) : (
        <div 
          className="relative w-full h-full flex flex-col pt-20 pb-24"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Mobile interaction edges */}
          <div className="absolute inset-y-0 left-0 w-12 z-30" onClick={turnPrev} />
          <div className="absolute inset-y-0 right-0 w-12 z-30" onClick={turnNext} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow flex flex-col w-full h-full px-8 relative overflow-y-auto"
            >
              {renderPageContent(pages[currentPage], goToPage)}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// Helper to render specific page types
function renderPageContent(page: FlattenedPage | undefined, goToPage: (index: number) => void) {
  if (!page) return null;
  
  if (page.isCover) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0202] via-[#050000] to-[#140202] cover-texture flex flex-col items-center justify-center text-[#8C1C1C] p-6 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#000000aa] to-[#000000] pointer-events-none" />
        <div className="w-full h-full border-2 border-[#4a0b0b] flex flex-col items-center justify-center relative z-10 p-12 text-center">
          <p className="font-sans text-xs tracking-[0.4em] font-medium uppercase text-[#611616] mb-8">A STORY BY</p>
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl tracking-[0.15em] mb-8 font-normal leading-tight" style={{ textShadow: "4px 4px 10px rgba(0,0,0,0.9), 0 0 40px rgba(140,28,28,0.4)" }}>SAFFRON</h1>
          <p className="font-serif text-lg sm:text-xl tracking-[0.2em] font-medium uppercase text-[#5c1313] italic mb-12">Dhanraj Singh</p>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--color-ink-muted)]">An Interactive Dark Romance Experience</p>
          
          <div className="absolute bottom-16 text-xs tracking-[0.3em] opacity-40 animate-pulse hidden lg:block text-[#731313]">
            CLICK TO OPEN
          </div>
        </div>
      </div>
    );
  }
  
  if (page.isTableOfContents) {
    return (
      <div className="flex flex-col h-full mt-16 px-4">
        <h2 className="font-serif text-2xl tracking-widest text-[var(--color-ink-primary)] mb-16 text-center">CONTENTS</h2>
        <div className="flex flex-col gap-8 max-w-sm mx-auto w-full">
          {[
            { id: 4, num: "I", title: "AFFECTION" },
            { id: 16, num: "II", title: "SITUATIONS" },
            { id: 24, num: "III", title: "MANAGEMENT" },
          ].map((ch) => (
            <button
              key={ch.num}
              onClick={(e) => {
                e.stopPropagation();
                goToPage(ch.id);
              }}
              className="flex justify-between items-center group w-full text-left"
            >
              <span className="font-serif text-lg tracking-wider group-hover:text-[var(--color-saffron-dark)] transition-colors text-[var(--color-ink-primary)]">
                {ch.num} &mdash; {ch.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <>
      {page.content}
      {/* Add page number if it exists */}
      {page.pageNumber && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center text-xs font-serif text-[var(--color-ink-muted)]">
          {page.pageNumber}
        </div>
      )}
    </>
  );
}
