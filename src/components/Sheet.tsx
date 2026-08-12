"use client";

import { motion } from "framer-motion";
import React from "react";
import { Chapter } from "@/data/manuscript";

interface SheetProps {
  index: number;
  currentPage: number;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  frontMood?: Chapter["mood"];
  backMood?: Chapter["mood"];
  zIndex: number;
  totalSheets: number;
}

const getPaperColor = (mood?: Chapter["mood"], isAlt = false) => {
  if (mood === "chapter2") return isAlt ? "#0D0505" : "#0B0303"; 
  if (mood === "chapter3") return isAlt ? "#080202" : "#050101"; 
  // default / chapter1
  return isAlt ? "var(--color-paper-alt)" : "var(--color-paper)";
};

export const Sheet = ({
  index,
  currentPage,
  frontContent,
  backContent,
  frontMood,
  backMood,
  zIndex,
  totalSheets,
}: SheetProps) => {
  const isFlipped = currentPage > index * 2;
  const stackOffset = isFlipped ? (index * 0.5) : ((totalSheets - index) * 0.5);
  
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full origin-left preserve-3d"
      style={{ zIndex }}
      initial={false}
      animate={{
        rotateY: isFlipped ? -180 : 0,
        x: isFlipped ? -stackOffset : stackOffset,
        translateZ: isFlipped ? index : -index,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 12,
        mass: 1,
      }}
    >
      {/* FRONT (Faces right when closed) - Gutter on the left */}
      <div
        className="absolute inset-0 backface-hidden paper-texture rounded-r-md book-edge-right overflow-hidden flex transition-colors duration-1000"
        style={{ backgroundColor: getPaperColor(frontMood, false) }}
      >
        <div className="flex-grow pt-12 pb-16 pl-14 pr-10 sm:pt-16 sm:pb-20 sm:pl-20 sm:pr-12 flex flex-col font-body text-[var(--color-ink-primary)] text-xl sm:text-2xl leading-relaxed relative font-medium">
          {frontContent}
        </div>
      </div>

      {/* BACK (Faces left when flipped) - Gutter on the right */}
      <div
        className="absolute inset-0 backface-hidden paper-texture rounded-l-md book-edge-left overflow-hidden flex transition-colors duration-1000"
        style={{
          backgroundColor: getPaperColor(backMood, true),
          transform: "rotateY(180deg)",
        }}
      >
        <div className="flex-grow pt-12 pb-16 pr-14 pl-10 sm:pt-16 sm:pb-20 sm:pr-20 sm:pl-12 flex flex-col font-body text-[var(--color-ink-primary)] text-xl sm:text-2xl leading-relaxed relative font-medium">
          {backContent}
        </div>
      </div>
    </motion.div>
  );
};
