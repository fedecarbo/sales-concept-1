"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { WidgetGrid } from "./WidgetGrid";
import { Layout } from "react-grid-layout";

export interface Page {
  id: string;
  name: string;
  layout: Layout[];
}

export const defaultPages: Page[] = [
  {
    id: "page-1",
    name: "Overview",
    layout: [
      { i: "dashboard", x: 0, y: 0, w: 6, h: 5, minW: 2, minH: 2 },
      { i: "analytics", x: 6, y: 0, w: 6, h: 2, minW: 2, minH: 2 },
      { i: "stats", x: 6, y: 2, w: 3, h: 3, minW: 2, minH: 2 },
      { i: "activity", x: 9, y: 2, w: 3, h: 3, minW: 2, minH: 2 },
    ],
  },
  {
    id: "page-2",
    name: "Reports",
    layout: [
      { i: "reports", x: 0, y: 0, w: 8, h: 3, minW: 2, minH: 2 },
      { i: "trends", x: 8, y: 0, w: 4, h: 5, minW: 2, minH: 2 },
      { i: "forecast", x: 0, y: 3, w: 4, h: 2, minW: 2, minH: 2 },
      { i: "pipeline", x: 4, y: 3, w: 4, h: 2, minW: 2, minH: 2 },
    ],
  },
  {
    id: "page-3",
    name: "Team",
    layout: [
      { i: "leaderboard", x: 0, y: 0, w: 4, h: 5, minW: 2, minH: 2 },
      { i: "targets", x: 4, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
      { i: "meetings", x: 8, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
      { i: "tasks", x: 4, y: 3, w: 8, h: 2, minW: 2, minH: 2 },
    ],
  },
];

// Navigation component to be used in the header
interface PageCarouselNavProps {
  pages: Page[];
  currentPage: number;
  onPageChange: (index: number) => void;
}

export function PageCarouselNav({ pages, currentPage, onPageChange }: PageCarouselNavProps) {
  const goToPrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < pages.length - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Previous button */}
      <button
        onClick={goToPrevious}
        disabled={currentPage === 0}
        className="rounded-full p-0.5 text-zinc-400 transition-colors hover:text-zinc-600 disabled:opacity-0 dark:text-zinc-500 dark:hover:text-zinc-300"
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {/* Page title and dots */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {pages[currentPage]?.name}
        </span>
        <div className="flex items-center gap-1">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => onPageChange(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentPage
                  ? "w-3 bg-zinc-400 dark:bg-zinc-500"
                  : "w-1 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
              }`}
              aria-label={`Go to ${page.name}`}
              aria-current={index === currentPage ? "page" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={goToNext}
        disabled={currentPage === pages.length - 1}
        className="rounded-full p-0.5 text-zinc-400 transition-colors hover:text-zinc-600 disabled:opacity-0 dark:text-zinc-500 dark:hover:text-zinc-300"
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

// Carousel container component
interface PageCarouselProps {
  pages: Page[];
  currentPage: number;
  onPageChange: (index: number) => void;
  className?: string;
}

export function PageCarousel({ pages, currentPage, onPageChange, className = "" }: PageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastPageRef = useRef(currentPage);

  const scrollToPage = useCallback((index: number, instant = false) => {
    if (containerRef.current && containerRef.current.offsetWidth > 0) {
      isProgrammaticScroll.current = true;
      const pageWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: pageWidth * index,
        behavior: instant ? "instant" : "smooth",
      });
    }
  }, []);

  const handleScrollEnd = useCallback(() => {
    if (containerRef.current) {
      const pageWidth = containerRef.current.offsetWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const newPage = Math.round(scrollLeft / pageWidth);

      // Only update if it's a user-initiated scroll (not programmatic)
      if (!isProgrammaticScroll.current && newPage !== lastPageRef.current && newPage >= 0 && newPage < pages.length) {
        lastPageRef.current = newPage;
        onPageChange(newPage);
      }
      isProgrammaticScroll.current = false;
    }
  }, [pages.length, onPageChange]);

  const handleScroll = useCallback(() => {
    // Debounce scroll end detection
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(handleScrollEnd, 100);
  }, [handleScrollEnd]);

  // Sync scroll position when currentPage changes
  useEffect(() => {
    if (currentPage !== lastPageRef.current) {
      lastPageRef.current = currentPage;
      scrollToPage(currentPage, false);
    }
  }, [currentPage, scrollToPage]);

  // Initial scroll on mount
  useEffect(() => {
    scrollToPage(currentPage, true);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 0) {
        onPageChange(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < pages.length - 1) {
        onPageChange(currentPage + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, pages.length, onPageChange]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto scrollbar-hide ${className}`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {pages.map((page) => (
        <div
          key={page.id}
          className="h-full w-full flex-shrink-0 snap-center"
        >
          <WidgetGrid
            layout={page.layout}
            pageId={page.id}
          />
        </div>
      ))}
    </div>
  );
}
