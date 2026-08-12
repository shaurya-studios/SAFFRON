import { MANUSCRIPT, Chapter } from "@/data/manuscript";

export type FlattenedPage = {
  id: string;
  content: React.ReactNode;
  chapterId?: string;
  chapterTitle?: string;
  romanNumeral?: string;
  mood?: Chapter["mood"];
  isCover?: boolean;
  isTableOfContents?: boolean;
  isEndPage?: boolean;
  pageNumber?: number;
};

export const getFlattenedBook = (): FlattenedPage[] => {
  const pages: FlattenedPage[] = [];

  // 0. Cover
  pages.push({
    id: "cover-front",
    isCover: true,
    content: null,
  });

  // 1. Inside Cover / Title Page
  pages.push({
    id: "title-page",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-8 mt-20">
        <h1 className="font-serif text-5xl sm:text-6xl tracking-widest text-[var(--color-ink-primary)]">SAFFRON</h1>
        <p className="font-sans text-sm tracking-[0.4em] text-[var(--color-ink-muted)]">A STORY BY DHANRAJ SINGH</p>
      </div>
    ),
  });

  // 2. Dedication
  pages.push({
    id: "dedication",
    content: (
      <div className="flex flex-col items-center justify-center h-full italic text-[var(--color-ink-secondary)] text-sm sm:text-base">
        <p>For those who fight silently.</p>
      </div>
    ),
  });

  // 3. Table of Contents
  pages.push({
    id: "contents",
    isTableOfContents: true,
    content: null,
  });

  let pageNumber = 1;

  MANUSCRIPT.forEach((chapter) => {
    // Chapter Title Page
    pages.push({
      id: `${chapter.id}-title`,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      romanNumeral: chapter.romanNumeral,
      mood: chapter.mood,
      content: (
        <div className="flex flex-col items-center justify-center h-full gap-6 mt-20">
          <p className="font-serif text-xl sm:text-2xl tracking-[0.4em] text-[var(--color-saffron-dark)]">CHAPTER {chapter.romanNumeral}</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-widest text-[var(--color-ink-primary)]">{chapter.title}</h2>
        </div>
      ),
      pageNumber: pageNumber++,
    });
    
    chapter.pages.forEach((page) => {
      pages.push({
        id: page.id,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        romanNumeral: chapter.romanNumeral,
        mood: chapter.mood,
        content: page.content,
        pageNumber: pageNumber++,
      });
    });
    
    if (pages.length % 2 !== 0) {
      pages.push({
        id: `${chapter.id}-blank`,
        mood: chapter.mood,
        content: null,
      });
    }
  });

  // End page
  pages.push({
    id: "end-page",
    isEndPage: true,
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-6 mt-10">
        <h2 className="font-serif text-2xl tracking-widest text-[var(--color-ink-primary)]">SAFFRON</h2>
        <p className="font-serif text-sm tracking-[0.2em] text-[var(--color-saffron-dark)] uppercase">END OF CHAPTER THREE</p>
        <p className="font-sans text-xs tracking-widest text-[var(--color-ink-muted)] mt-12">The story continues.</p>
      </div>
    ),
  });

  // Ensure total pages is even
  if (pages.length % 2 !== 0) {
    pages.push({
      id: "final-blank",
      content: null,
    });
  }

  return pages;
};
