"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, PencilIcon, CheckIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Layout } from "react-grid-layout";
import { WidgetGrid } from "./WidgetGrid";
import { Page, WidgetInstance, WidgetConnection, WidgetType } from "@/app/types";

// Re-export Page type for convenience
export type { Page } from "@/app/types";

export const defaultPages: Page[] = [
  {
    id: "page-1",
    name: "Overview",
    layout: [],
    widgets: [],
    connections: [],
  },
];

// Navigation component to be used in the header
interface PageCarouselNavProps {
  pages: Page[];
  currentPage: number;
  onPageChange: (index: number) => void;
  onAddPage?: () => void;
  onRenamePage?: (index: number, newName: string) => void;
  onRemovePage?: (index: number) => void;
}

export function PageCarouselNav({
  pages,
  currentPage,
  onPageChange,
  onAddPage,
  onRenamePage,
  onRemovePage,
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

      {/* Remove page button - only enabled when multiple pages */}
      <button
        onClick={() => onRemovePage?.(currentPage)}
        disabled={pages.length <= 1}
        className={`group flex items-center gap-1 rounded-full px-2 py-1 transition-all duration-200 ${
          pages.length > 1
            ? "text-stone-500 hover:bg-red-50 hover:text-red-600 dark:text-stone-400 dark:hover:bg-red-950 dark:hover:text-red-400"
            : "text-stone-300 cursor-not-allowed dark:text-stone-700"
        }`}
        aria-label="Remove current page"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

// Carousel container component
interface PageCarouselProps {
  pages: Page[];
  currentPage: number;
  onPageChange: (index: number) => void;
  onUpdatePage?: (
    pageIndex: number,
    updates: {
      widgets?: WidgetInstance[];
      layout?: Layout[];
      connections?: WidgetConnection[];
    }
  ) => void;
  onAddWidgetAtPosition?: (widgetType: WidgetType, x: number, y: number) => void;
  className?: string;
}

export function PageCarousel({
  pages,
  currentPage,
  onPageChange,
  onUpdatePage,
  onAddWidgetAtPosition,
  className = "",
}: PageCarouselProps) {
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

      if (!isProgrammaticScroll.current && newPage !== lastPageRef.current && newPage >= 0 && newPage < pages.length) {
        lastPageRef.current = newPage;
        onPageChange(newPage);
      }
      isProgrammaticScroll.current = false;
    }
  }, [pages.length, onPageChange]);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(handleScrollEnd, 100);
  }, [handleScrollEnd]);

  useEffect(() => {
    if (currentPage !== lastPageRef.current) {
      lastPageRef.current = currentPage;
      scrollToPage(currentPage, false);
    }
  }, [currentPage, scrollToPage]);

  useEffect(() => {
    scrollToPage(currentPage, true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keyboard if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowLeft" && currentPage > 0) {
        onPageChange(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < pages.length - 1) {
        onPageChange(currentPage + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, pages.length, onPageChange]);

  const handleApplyTemplate = useCallback(
    (pageIndex: number) =>
      (widgets: WidgetInstance[], layout: Layout[], connections: WidgetConnection[]) => {
        if (onUpdatePage) {
          onUpdatePage(pageIndex, { widgets, layout, connections });
        }
      },
    [onUpdatePage]
  );

  const handleRemoveWidget = useCallback(
    (pageIndex: number, page: Page) => (widgetId: string) => {
      if (onUpdatePage) {
        // Filter out the widget from widgets array
        const updatedWidgets = page.widgets.filter((w) => w.id !== widgetId);
        // Filter out the layout item
        const updatedLayout = page.layout.filter((l) => l.i !== widgetId);
        // Filter out any connections involving this widget
        const updatedConnections = page.connections.filter(
          (c) => c.sourceWidgetId !== widgetId && c.targetWidgetId !== widgetId
        );
        onUpdatePage(pageIndex, {
          widgets: updatedWidgets,
          layout: updatedLayout,
          connections: updatedConnections,
        });
      }
    },
    [onUpdatePage]
  );

  const handleLayoutChange = useCallback(
    (pageIndex: number) => (layout: Layout[]) => {
      if (onUpdatePage) {
        onUpdatePage(pageIndex, { layout });
      }
    },
    [onUpdatePage]
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`flex h-full min-h-0 snap-x snap-mandatory overflow-x-auto scrollbar-hide ${className}`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {pages.map((page, index) => (
        <div
          key={page.id}
          className="h-full w-full flex-shrink-0 snap-center"
        >
          <WidgetGrid
            layout={page.layout}
            widgets={page.widgets}
            connections={page.connections}
            pageId={page.id}
            onApplyTemplate={handleApplyTemplate(index)}
            onRemoveWidget={handleRemoveWidget(index, page)}
            onAddWidgetAtPosition={index === currentPage ? onAddWidgetAtPosition : undefined}
            onLayoutChange={handleLayoutChange(index)}
          />
        </div>
      ))}
    </div>
  );
}
