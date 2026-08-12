'use client';

import { useMemo } from 'react';
import { useBookStore } from '@/store/bookStore';
import { chapters } from '@/data/chapters';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function RibbonBookmark() {
  const { currentChapter, currentPage, setChapter, setPage, transitionLocked } = useBookStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Get current ribbon color based on chapter
  const ribbonColor = useMemo(() => {
    switch (currentChapter) {
      case 1: return 'var(--color-thread-vermilion)'; // Rose-Gold/Vermilion
      case 2: return '#6B7A8C'; // Muted Grey-Blue
      case 3: return 'var(--color-dust-gold)'; // Deep Amber
      default: return 'var(--color-thread-vermilion)';
    }
  }, [currentChapter]);

  // Calculate total pages for scrubbing
  const currentChapterData = chapters[currentChapter - 1];
  const totalPagesInChapter = currentChapterData ? currentChapterData.pages.length : 1;
  const progressPercent = Math.min(100, Math.max(0, (currentPage / totalPagesInChapter) * 100));

  // Determine physical height and position based on viewport
  const ribbonHeight = isDesktop ? '80dvh' : '40dvh';
  const ribbonTop = isDesktop ? '0' : '0';
  const ribbonRight = isDesktop ? '15%' : '8%';

  return (
    <div 
      className="absolute z-40 origin-top pointer-events-auto flex items-end justify-center"
      style={{
        top: ribbonTop,
        right: ribbonRight,
        width: isDesktop ? '24px' : '16px',
        height: ribbonHeight,
        background: \linear-gradient(to bottom, \ 0%, \ \%, rgba(0,0,0,0.5) 100%)\,
        boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset -1px 0 2px rgba(0,0,0,0.3)',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        transition: 'background 1s ease, transform 0.3s ease',
        transform: transitionLocked ? 'translateY(-10px)' : 'translateY(0)',
      }}
    >
      <div 
        className="w-full h-full absolute top-0 left-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\'0 0 4 4\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M0 0h1v4H0zm2 0h1v4H2z\\' fill=\\'%23ffffff\\' fill-opacity=\\'0.1\\'/%3E%3C/svg%3E")',
          backgroundSize: '4px 4px',
          mixBlendMode: 'overlay',
          opacity: 0.5
        }}
      />
    </div>
  );
}
