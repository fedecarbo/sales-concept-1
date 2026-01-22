"use client";

import { useState, useCallback } from "react";
import { SparklesIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { WidgetCard } from "../WidgetCard";
import { WidgetHeader } from "../WidgetHeader";
import { WidgetFooter } from "../WidgetFooter";
import { WidgetTable, TableColumn, WidgetCalendar, WidgetFeed } from "../ui";
import {
  mockContacts,
  mockDeals,
  mockCalendarEvents,
  mockSarahChenHistory,
  widgetAsks,
  Contact,
  Deal,
} from "../ui/mockData";

interface GenericWidgetProps {
  widgetId: string;
  title?: string;
  animationDelay?: number;
  isDragging?: boolean;
}

type ContentType = "empty" | "contacts" | "deals" | "calendar" | "activity";

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/50",
    inactive: "bg-stone-50 text-stone-600 ring-stone-500/20 dark:bg-stone-800 dark:text-stone-400 dark:ring-stone-600/50",
    lead: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/50",
    prospecting: "bg-stone-50 text-stone-600 ring-stone-500/20 dark:bg-stone-800 dark:text-stone-400 dark:ring-stone-600/50",
    qualification: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-500/50",
    proposal: "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-500/50",
    negotiation: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/50",
    closed: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/50",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        colors[status] || colors.inactive
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// Contact name with avatar
function ContactName({ contact }: { contact: Contact }) {
  return (
    <div className="flex items-center gap-3">
      {contact.avatar ? (
        <img
          src={contact.avatar}
          alt=""
          className="h-8 w-8 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
          <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
            {contact.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="min-w-0">
        <div className="font-medium text-stone-900 dark:text-stone-100 truncate">
          {contact.name}
        </div>
        <div className="text-xs text-stone-500 dark:text-stone-400 truncate">
          {contact.email}
        </div>
      </div>
    </div>
  );
}

// Column definitions
const contactColumns: TableColumn<Contact>[] = [
  {
    key: "name",
    header: "Name",
    visibility: "always",
    render: (contact) => <ContactName contact={contact} />,
  },
  {
    key: "company",
    header: "Company",
    visibility: "medium",
  },
  {
    key: "role",
    header: "Role",
    visibility: "medium",
  },
  {
    key: "status",
    header: "Status",
    visibility: "wide",
    render: (contact) => <StatusBadge status={contact.status} />,
  },
];

const dealColumns: TableColumn<Deal>[] = [
  {
    key: "name",
    header: "Deal",
    visibility: "always",
    render: (deal) => (
      <div className="min-w-0">
        <div className="font-medium text-stone-900 dark:text-stone-100 truncate">
          {deal.name}
        </div>
        <div className="text-xs text-stone-500 dark:text-stone-400">
          {deal.company}
        </div>
      </div>
    ),
  },
  {
    key: "value",
    header: "Value",
    visibility: "medium",
    render: (deal) => (
      <span className="font-medium text-stone-900 dark:text-stone-100">
        {deal.value}
      </span>
    ),
  },
  {
    key: "stage",
    header: "Stage",
    visibility: "medium",
    render: (deal) => <StatusBadge status={deal.stage} />,
  },
  {
    key: "probability",
    header: "Prob.",
    visibility: "wide",
    render: (deal) => (
      <span className="text-stone-600 dark:text-stone-400">{deal.probability}%</span>
    ),
  },
];

export function GenericWidget({
  title = "Widget",
  animationDelay,
  isDragging,
}: GenericWidgetProps) {
  const [contentType, setContentType] = useState<ContentType>("empty");
  const [displayTitle, setDisplayTitle] = useState(title);
  const [query, setQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleAskSubmit = useCallback(async (askQuery?: string) => {
    const searchQuery = (askQuery || query).toLowerCase().trim();
    if (!searchQuery) return;

    setIsThinking(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Find matching ask by keywords
    const matchedAsk = widgetAsks.find((ask) =>
      ask.keywords.some((kw) => searchQuery.includes(kw))
    );

    if (matchedAsk) {
      setContentType(matchedAsk.contentType);
      setDisplayTitle(matchedAsk.title);
    } else {
      // Default to contacts if no match
      setContentType("contacts");
      setDisplayTitle("Results");
    }

    setQuery("");
    setIsThinking(false);
  }, [query]);

  const handlePresetClick = useCallback((askId: string) => {
    const ask = widgetAsks.find((a) => a.id === askId);
    if (ask) {
      handleAskSubmit(ask.label);
    }
  }, [handleAskSubmit]);

  const renderContent = () => {
    if (contentType === "empty") {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40 flex items-center justify-center">
              <SparklesIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            {isThinking && (
              <div className="absolute inset-0 rounded-xl border-2 border-primary-400 animate-ping opacity-50" />
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Ask AI for data
            </p>
          </div>

          {/* AI Input */}
          <div className="w-full max-w-xs">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAskSubmit();
                }}
                placeholder="e.g., show my contacts"
                disabled={isThinking}
                className="w-full px-3 py-2 pr-10 text-xs bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500 disabled:opacity-50"
              />
              <button
                onClick={() => handleAskSubmit()}
                disabled={!query.trim() || isThinking}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isThinking ? (
                  <ArrowPathIcon className="h-3 w-3 animate-spin" />
                ) : (
                  <SparklesIcon className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>

          {/* Preset asks */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {widgetAsks.map((ask) => (
              <button
                key={ask.id}
                onClick={() => handlePresetClick(ask.id)}
                disabled={isThinking}
                className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors disabled:opacity-50"
              >
                {ask.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Render content based on type
    if (contentType === "contacts") {
      return (
        <WidgetTable
          data={mockContacts}
          columns={contactColumns}
          keyExtractor={(contact) => contact.id}
        />
      );
    }

    if (contentType === "deals") {
      return (
        <WidgetTable
          data={mockDeals}
          columns={dealColumns}
          keyExtractor={(deal) => deal.id}
        />
      );
    }

    if (contentType === "calendar") {
      return <WidgetCalendar events={mockCalendarEvents} />;
    }

    if (contentType === "activity") {
      return <WidgetFeed activities={mockSarahChenHistory} />;
    }

    return null;
  };

  return (
    <WidgetCard animationDelay={animationDelay} isDragging={isDragging}>
      <WidgetHeader title={displayTitle} />

      <div className="flex-1 min-h-0 overflow-hidden">
        {renderContent()}
      </div>

      <WidgetFooter />
    </WidgetCard>
  );
}
