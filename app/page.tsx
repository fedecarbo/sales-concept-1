"use client";

import { useState, useCallback } from "react";
import { MagnifyingGlassIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";
import { PageCarousel, PageCarouselNav, defaultPages, Page } from "./components/widgets";

export default function Home() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [currentPage, setCurrentPage] = useState(0);

  const handleAddPage = useCallback(() => {
    const newPageNumber = pages.length + 1;
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name: `Page ${newPageNumber}`,
      layout: [], // Empty layout for new pages
    };
    setPages((prev) => [...prev, newPage]);
    // Navigate to the new page after a brief delay to allow render
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

  const handleSubmit = () => {
    if (message.trim()) {
      setSubmitted(true);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-stone-50 dark:bg-stone-950">
      {!submitted ? (
        // Empty state - chat centered
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="w-full max-w-2xl">
            <h1 className="mb-8 text-center text-2xl font-semibold text-stone-900 dark:text-white">
              What can I help you with?
            </h1>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything..."
                rows={1}
                className="block w-full resize-none rounded-xl border-0 bg-white px-4 py-3 pr-12 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-stone-900 dark:bg-stone-900 dark:text-white dark:ring-stone-700 dark:placeholder:text-stone-500 dark:focus:ring-stone-100 sm:text-sm sm:leading-6"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-stone-900 p-1.5 text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Widget view - header + grid
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
              />
            </div>

            {/* Right section */}
            <div className="flex items-center justify-end gap-2">
              {/* Search input pill */}
              <div className="flex h-10 items-center rounded-full bg-stone-50 px-3 ring-1 ring-stone-200 dark:bg-stone-950 dark:ring-stone-800">
                <div className="relative">
                  <div className="grid grid-cols-1">
                    <input
                      type="text"
                      className="col-start-1 row-start-1 w-44 bg-transparent pr-3 pl-6 text-sm text-stone-900 outline-none placeholder:text-stone-500 dark:text-white dark:placeholder:text-stone-400"
                      placeholder="Search..."
                    />
                    <MagnifyingGlassIcon
                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center text-stone-400 dark:text-stone-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

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
              </div>

              {/* User avatar pill */}
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 ring-1 ring-stone-200 dark:bg-stone-950 dark:ring-stone-800"
                aria-label="User menu"
              >
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-stone-900 dark:bg-stone-100">
                  <span className="text-xs font-medium text-white dark:text-stone-900">FC</span>
                </span>
              </button>
            </div>
          </div>

          {/* Page Carousel */}
          <PageCarousel
            pages={pages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
