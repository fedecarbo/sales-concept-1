"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, PencilIcon, CheckIcon } from "@heroicons/react/20/solid";
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
];

// Navigation component to be used in the header
interface PageCarouselNavProps {
  pages: Page[];
  currentPage: number;
  onPageChange: (index: number) => void;
  onAddPage?: () => void;
  onRenamePage?: (index: number, newName: string) => void;
}

export function PageCarouselNav({
  pages,
  currentPage,
  onPageChange,
  onAddPage,
  onRenamePage,
}: PageCarouselNavProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const currentPageData = pages[currentPage];
  const hasMultiplePages = pages.length > 1;

  const startEditing = () => {
    setEditValue(currentPageData?.name || "");
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (editValue.trim() && onRenamePage) {
      onRenamePage(currentPage, editValue.trim());
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue("");
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div className="flex items-center justify-center gap-1.5">
      {/* Left arrow - only show if multiple pages */}
      {hasMultiplePages && (
        <button
          onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
          className={`rounded-full p-0.5 transition-all duration-200 ${
            currentPage > 0
              ? "text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300"
              : "text-stone-200 cursor-default dark:text-stone-700"
          }`}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      )}

      {/* Page name - editable */}
      <div className="relative flex items-center">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={saveEdit}
              className="w-24 bg-transparent text-center text-sm font-semibold text-stone-900 outline-none ring-1 ring-stone-300 rounded px-1.5 py-0.5 dark:text-white dark:ring-stone-600"
              maxLength={20}
            />
            <button
              onClick={saveEdit}
              className="rounded-full p-0.5 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
              aria-label="Save name"
            >
              <CheckIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={startEditing}
            className="group flex items-center gap-1.5 rounded-md px-2 py-0.5 transition-all duration-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <span className="text-sm font-semibold text-stone-900 dark:text-white">
              {currentPageData?.name}
            </span>
            <PencilIcon className="h-3 w-3 text-stone-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-stone-600" />
          </button>
        )}
      </div>

      {/* Right arrow - only show if multiple pages */}
      {hasMultiplePages && (
        <button
          onClick={() => currentPage < pages.length - 1 && onPageChange(currentPage + 1)}
          className={`rounded-full p-0.5 transition-all duration-200 ${
            currentPage < pages.length - 1
              ? "text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300"
              : "text-stone-200 cursor-default dark:text-stone-700"
          }`}
          disabled={currentPage === pages.length - 1}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}

      {/* Page dots indicator */}
      {hasMultiplePages && (
        <div className="ml-1 flex items-center gap-1">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "w-4 bg-stone-700 dark:bg-stone-300"
                  : "w-1.5 bg-stone-300 hover:bg-stone-400 dark:bg-stone-600 dark:hover:bg-stone-500"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="mx-1 h-4 w-px bg-stone-200 dark:bg-stone-700" />

      {/* Add page button */}
      <button
        onClick={onAddPage}
        className="group flex items-center gap-1 rounded-full px-2 py-1 text-stone-500 transition-all duration-200 hover:bg-stone-100 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
        aria-label="Add new page"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="text-xs font-medium opacity-0 max-w-0 overflow-hidden transition-all duration-200 group-hover:opacity-100 group-hover:max-w-[60px]">
          New
        </span>
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
      className={`flex h-full min-h-0 snap-x snap-mandatory overflow-x-auto scrollbar-hide ${className}`}
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
