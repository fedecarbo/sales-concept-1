"use client";

import { useState } from "react";
import { SparklesIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { WidgetCard } from "../WidgetCard";
import { WidgetHeader } from "../WidgetHeader";

interface AICanvasProps {
  widgetId: string;
  stepNumber?: number;
  animationDelay?: number;
  isDragging?: boolean;
}

export function AICanvas({ widgetId, stepNumber, animationDelay, isDragging }: AICanvasProps) {
  const [prompt, setPrompt] = useState("");

  return (
    <WidgetCard className="h-full" stepNumber={stepNumber} animationDelay={animationDelay} isDragging={isDragging}>
      <WidgetHeader
        title="AI Canvas"
        subtitle="Ask AI to display anything"
        action={
          <SparklesIcon className="h-4 w-4 text-stone-400" />
        }
      />

      {/* Content area with placeholder pattern */}
      <div className="flex-1 overflow-hidden relative">
        {/* Diagonal stripe placeholder pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              currentColor,
              currentColor 1px,
              transparent 1px,
              transparent 12px
            )`,
          }}
        />

        {/* Centered placeholder content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 dark:text-stone-500">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 mb-3">
            <SparklesIcon className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium">Ask AI anything</p>
          <p className="text-xs mt-1">Use the input below to generate content</p>
        </div>
      </div>

      {/* Chat input footer */}
      <div className="px-3 py-2 border-t border-stone-200 dark:border-stone-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask AI to display something..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full pl-3 pr-10 py-2 text-sm bg-stone-100 dark:bg-stone-800 rounded-lg border-0 focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-500 placeholder:text-stone-400 dark:placeholder:text-stone-500"
          />
          <button
            type="button"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-stone-900 p-1.5 text-white hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200 disabled:opacity-50"
            disabled={!prompt.trim()}
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </WidgetCard>
  );
}
