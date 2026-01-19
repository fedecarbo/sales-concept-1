"use client";

import { useState, useCallback, useEffect } from "react";
import { MagnifyingGlassIcon, BellIcon, Cog6ToothIcon, SparklesIcon, PlusIcon } from "@heroicons/react/20/solid";
import { PageCarousel, PageCarouselNav, defaultPages } from "./components/widgets";
import { WidgetProvider } from "./context/WidgetContext";
import { CommandPalette } from "./components/CommandPalette";
import { Page, WidgetInstance, WidgetConnection, WidgetType, LayoutItem } from "./types";
import { pageTemplates, applyTemplate, PageTemplate } from "./lib/aiTemplates";
import { widgetRegistry } from "./lib/widgetRegistry";
import { personas, fcPersona } from "./data/personas";
import { Persona } from "./types";

export default function Home() {
  const [currentPersona, setCurrentPersona] = useState<Persona>(fcPersona);
  const [pages, setPages] = useState<Page[]>(currentPersona.pages);
  const [currentPage, setCurrentPage] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteDefaultTab, setPaletteDefaultTab] = useState<"search" | "ai">("search");
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);

  // Keyboard shortcut for command palette (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close persona menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (personaMenuOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest("[data-persona-menu]")) {
          setPersonaMenuOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [personaMenuOpen]);

  const handleAddPage = useCallback(() => {
    const newPageNumber = pages.length + 1;
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name: `Page ${newPageNumber}`,
      layout: [],
      widgets: [],
      connections: [],
    };
    setPages((prev) => [...prev, newPage]);
    setTimeout(() => {
      setCurrentPage(pages.length);
    }, 50);
  }, [pages.length]);

  const handleRenamePage = useCallback((index: number, newName: string) => {
    setPages((prev) =>
      prev.map((page, i) =>
        i === index ? { ...page, name: newName } : page
      )
    );
  }, []);

  const handleRemovePage = useCallback((index: number) => {
    if (pages.length <= 1) return;

    setPages((prev) => prev.filter((_, i) => i !== index));

    // Adjust current page if needed
    if (index <= currentPage && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [pages.length, currentPage]);

  const handleUpdatePage = useCallback(
    (
      pageIndex: number,
      updates: {
        widgets?: WidgetInstance[];
        layout?: LayoutItem[];
        connections?: WidgetConnection[];
      }
    ) => {
      setPages((prev) =>
        prev.map((page, i) =>
          i === pageIndex
            ? {
                ...page,
                ...(updates.widgets && { widgets: updates.widgets }),
                ...(updates.layout && { layout: updates.layout }),
                ...(updates.connections && { connections: updates.connections }),
              }
            : page
        )
      );
    },
    []
  );

  const handleApplyTemplate = useCallback((template: PageTemplate) => {
    const currentPageData = pages[currentPage];
    const updates = applyTemplate(template, currentPageData.id);

    setPages((prev) =>
      prev.map((page, i) =>
        i === currentPage
          ? {
              ...page,
              widgets: updates.widgets || page.widgets,
              layout: updates.layout || page.layout,
              connections: updates.connections || page.connections,
            }
          : page
      )
    );
  }, [currentPage, pages]);

  // Find an empty spot on the grid for a new widget
  const findEmptySpot = useCallback((layout: LayoutItem[], w: number, h: number): { x: number; y: number } => {
    const cols = 12;
    const rows = 6;

    // Create a grid to track occupied cells
    const occupied: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));

    // Mark occupied cells
    for (const item of layout) {
      for (let row = item.y; row < Math.min(item.y + item.h, rows); row++) {
        for (let col = item.x; col < Math.min(item.x + item.w, cols); col++) {
          occupied[row][col] = true;
        }
      }
    }

    // Find first spot that fits the widget
    for (let y = 0; y <= rows - h; y++) {
      for (let x = 0; x <= cols - w; x++) {
        let canFit = true;
        for (let dy = 0; dy < h && canFit; dy++) {
          for (let dx = 0; dx < w && canFit; dx++) {
            if (occupied[y + dy][x + dx]) {
              canFit = false;
            }
          }
        }
        if (canFit) {
          return { x, y };
        }
      }
    }

    // No space found, return origin (will overlap)
    return { x: 0, y: 0 };
  }, []);

  const handleAddWidget = useCallback((widgetType: WidgetType) => {
    const currentPageData = pages[currentPage];
    const widgetDef = widgetRegistry[widgetType];
    const newWidgetId = `${currentPageData.id}-w${Date.now()}`;

    const newWidget: WidgetInstance = {
      id: newWidgetId,
      type: widgetType,
    };

    // Find an empty spot for the new widget
    const { x, y } = findEmptySpot(currentPageData.layout, widgetDef.defaultSize.w, widgetDef.defaultSize.h);

    const newLayoutItem: LayoutItem = {
      i: newWidgetId,
      x,
      y,
      w: widgetDef.defaultSize.w,
      h: widgetDef.defaultSize.h,
      minW: widgetDef.minSize.w,
      minH: widgetDef.minSize.h,
    };

    setPages((prev) =>
      prev.map((page, i) =>
        i === currentPage
          ? {
              ...page,
              widgets: [...page.widgets, newWidget],
              layout: [...page.layout, newLayoutItem],
            }
          : page
      )
    );
  }, [currentPage, pages, findEmptySpot]);

  const handleAddWidgetAtPosition = useCallback((widgetType: WidgetType, x: number, y: number) => {
    const currentPageData = pages[currentPage];
    const widgetDef = widgetRegistry[widgetType];
    const newWidgetId = `${currentPageData.id}-w${Date.now()}`;

    const newWidget: WidgetInstance = {
      id: newWidgetId,
      type: widgetType,
    };

    const newLayoutItem: LayoutItem = {
      i: newWidgetId,
      x,
      y,
      w: widgetDef.defaultSize.w,
      h: widgetDef.defaultSize.h,
      minW: widgetDef.minSize.w,
      minH: widgetDef.minSize.h,
    };

    setPages((prev) =>
      prev.map((page, i) =>
        i === currentPage
          ? {
              ...page,
              widgets: [...page.widgets, newWidget],
              layout: [...page.layout, newLayoutItem],
            }
          : page
      )
    );
  }, [currentPage, pages]);

  const openPaletteSearch = useCallback(() => {
    setPaletteDefaultTab("search");
    setPaletteOpen(true);
  }, []);

  const openPaletteAI = useCallback(() => {
    setPaletteDefaultTab("ai");
    setPaletteOpen(true);
  }, []);

  const handleSwitchPersona = useCallback((persona: Persona) => {
    setCurrentPersona(persona);
    setPages(persona.pages);
    setCurrentPage(0);
    setPersonaMenuOpen(false);
  }, []);

  return (
    <WidgetProvider>
      <div className="flex h-screen flex-col bg-stone-50 dark:bg-stone-950">
        <div className="grid h-full grid-rows-[auto_1fr] gap-2 p-6">
            {/* Header - 3-column grid for true centering */}
            <div className="mx-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              {/* Left section */}
              <div className="flex items-center gap-2">
                {/* Logo pill */}
                <div className="flex h-10 items-center rounded-full bg-stone-50 px-3 ring-1 ring-stone-200 dark:bg-stone-950 dark:ring-stone-800">
                  <svg
                    className="h-5 w-5 text-stone-900 dark:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="1" y="1" width="10" height="10" rx="2" fill="currentColor" />
                    <rect x="13" y="1" width="10" height="10" rx="2" fill="currentColor" opacity="0.5" />
                    <rect x="1" y="13" width="10" height="10" rx="2" fill="currentColor" opacity="0.5" />
                    <rect x="13" y="13" width="10" height="10" rx="2" fill="currentColor" opacity="0.25" />
                  </svg>
                </div>
              </div>

              {/* Center section - navigation pill (truly centered) */}
              <div className="flex h-10 items-center rounded-full bg-stone-50 px-4 ring-1 ring-stone-200 dark:bg-stone-950 dark:ring-stone-800">
                <PageCarouselNav
                  pages={pages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  onAddPage={handleAddPage}
                  onRenamePage={handleRenamePage}
                  onRemovePage={handleRemovePage}
                />
              </div>

              {/* Right section */}
              <div className="flex items-center justify-end gap-2">
                {/* Add widget button */}
                <button
                  type="button"
                  onClick={() => handleAddWidget("ai-canvas")}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 ring-1 ring-stone-200 transition-colors hover:bg-stone-100 dark:bg-stone-950 dark:ring-stone-800 dark:hover:bg-stone-900"
                  aria-label="Add AI Canvas widget"
                  title="Add AI Canvas widget"
                >
                  <PlusIcon className="size-4 text-stone-500 dark:text-stone-400" />
                </button>

                {/* Search icon pill */}
                <button
                  type="button"
                  onClick={openPaletteSearch}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 ring-1 ring-stone-200 transition-colors hover:bg-stone-100 dark:bg-stone-950 dark:ring-stone-800 dark:hover:bg-stone-900"
                  aria-label="Search (⌘K)"
                >
                  <MagnifyingGlassIcon className="size-4 text-stone-500 dark:text-stone-400" />
                </button>

                {/* AI icon pill */}
                <button
                  type="button"
                  onClick={openPaletteAI}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 ring-1 ring-stone-200 transition-colors hover:bg-stone-100 dark:bg-stone-950 dark:ring-stone-800 dark:hover:bg-stone-900"
                  aria-label="AI Assistant"
                >
                  <SparklesIcon className="size-4 text-stone-500 dark:text-stone-400" />
                </button>

                {/* Icon buttons pill */}
                <div className="flex h-10 items-center gap-1 rounded-full bg-stone-50 px-2 ring-1 ring-stone-200 dark:bg-stone-950 dark:ring-stone-800">
                  <button
                    type="button"
                    className="relative rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                    aria-label="Notifications"
                  >
                    <BellIcon className="size-4" aria-hidden="true" />
                    {/* Notification dot */}
                    <span className="absolute top-1 right-1 size-1.5 rounded-full bg-primary-500" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                    aria-label="Settings"
                  >
                    <Cog6ToothIcon className="size-4" aria-hidden="true" />
                  </button>
                  <div className="relative" data-persona-menu>
                    <button
                      type="button"
                      onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
                      className="rounded-full p-0.5"
                      aria-label="User menu"
                    >
                      <span className="inline-flex size-7 items-center justify-center rounded-full bg-stone-900 dark:bg-stone-100">
                        <span className="text-xs font-medium text-white dark:text-stone-900">{currentPersona.initials}</span>
                      </span>
                    </button>
                    {personaMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-700 z-50">
                        <div className="p-1">
                          {personas.map((persona) => (
                            <button
                              key={persona.id}
                              onClick={() => handleSwitchPersona(persona)}
                              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                                persona.id === currentPersona.id
                                  ? "bg-stone-100 dark:bg-stone-800"
                                  : "hover:bg-stone-50 dark:hover:bg-stone-800/50"
                              }`}
                            >
                              <span className="inline-flex size-7 items-center justify-center rounded-full bg-stone-900 dark:bg-stone-100">
                                <span className="text-xs font-medium text-white dark:text-stone-900">{persona.initials}</span>
                              </span>
                              <span className="font-medium text-stone-900 dark:text-white">{persona.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Page Carousel */}
            <PageCarousel
              pages={pages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onUpdatePage={handleUpdatePage}
              onAddWidgetAtPosition={handleAddWidgetAtPosition}
              className=""
            />
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        defaultTab={paletteDefaultTab}
        pages={pages}
        currentPage={currentPage}
        onNavigateToPage={setCurrentPage}
        onApplyTemplate={handleApplyTemplate}
        onAddWidget={handleAddWidget}
      />
    </WidgetProvider>
  );
}
