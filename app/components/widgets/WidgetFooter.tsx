"use client";

import { useState, useRef, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

const connectors = [
  { id: "gmail", name: "Gmail", icon: "📧" },
  { id: "slack", name: "Slack", icon: "💬" },
  { id: "salesforce", name: "Salesforce", icon: "📊" },
  { id: "calendar", name: "Calendar", icon: "📅" },
  { id: "drive", name: "Google Drive", icon: "📁" },
];

interface WidgetFooterProps {
  className?: string;
}

export function WidgetFooter({ className = "" }: WidgetFooterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div
      className={`relative flex items-center justify-center bg-stone-50 px-4 py-3 dark:bg-stone-800/50 ${className}`}
      ref={menuRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex size-8 items-center justify-center rounded-full bg-stone-200 text-stone-600 transition-colors hover:bg-stone-300 dark:bg-white/10 dark:text-stone-300 dark:hover:bg-white/20"
        aria-label="Add connector"
      >
        <PlusIcon className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg border border-stone-200 bg-white p-2 shadow-lg dark:border-stone-700 dark:bg-stone-800">
          <div className="flex gap-1">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex size-10 items-center justify-center rounded-lg text-xl transition-colors hover:bg-stone-100 dark:hover:bg-stone-700"
                title={connector.name}
              >
                {connector.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
