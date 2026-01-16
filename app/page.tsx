"use client";

import { useState } from "react";
import { WidgetGrid } from "./components/widgets";

export default function Home() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      setSubmitted(true);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      {!submitted ? (
        // Empty state - chat centered
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="w-full max-w-2xl">
            <h1 className="mb-8 text-center text-2xl font-semibold text-zinc-900 dark:text-white">
              What can I help you with?
            </h1>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything..."
                rows={1}
                className="block w-full resize-none rounded-xl border-0 bg-white px-4 py-3 pr-12 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-100 sm:text-sm sm:leading-6"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-zinc-900 p-1.5 text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
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
        // Widget view - grid of widgets with page padding
        <div className="min-h-0 flex-1 p-6">
          <WidgetGrid />
        </div>
      )}
    </div>
  );
}
