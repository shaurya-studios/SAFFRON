import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookState {
  currentChapter: number;
  currentPage: number;
  transitionLocked: boolean;
  introComplete: boolean;
  setChapter: (chapter: number) => void;
  setPage: (page: number) => void;
  setTransitionLocked: (locked: boolean) => void;
  completeIntro: () => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      currentChapter: 1,
      currentPage: 0,
      transitionLocked: false,
      introComplete: typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('saffron_intro_complete') === 'true' : false,
      setChapter: (chapter) => set({ currentChapter: chapter, currentPage: 0 }),
      setPage: (page) => set({ currentPage: page }),
      setTransitionLocked: (locked) => set({ transitionLocked: locked }),
      completeIntro: () => {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('saffron_intro_complete', 'true');
        }
        set({ introComplete: true });
      },
      nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
      prevPage: () => set((state) => ({ currentPage: Math.max(0, state.currentPage - 1) })),
    }),
    {
      name: 'saffron-book-storage',
      partialize: (state) => ({ currentChapter: state.currentChapter, currentPage: state.currentPage }),
    }
  )
);
