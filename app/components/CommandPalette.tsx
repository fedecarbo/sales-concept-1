"use client";

import { Fragment, useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  UserIcon,
  DocumentIcon,
  Squares2X2Icon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/20/solid";
import { useWidget } from "@/app/context/WidgetContext";
import { widgetRegistry } from "@/app/lib/widgetRegistry";
import { pageTemplates, PageTemplate } from "@/app/lib/aiTemplates";
import { Page, Client, WidgetType } from "@/app/types";

type TabType = "search" | "ai";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: TabType;
  pages: Page[];
  currentPage: number;
  onNavigateToPage: (index: number) => void;
  onApplyTemplate: (template: PageTemplate) => void;
  onAddWidget: (widgetType: WidgetType) => void;
}

type SearchResultType = "client" | "page" | "widget";

interface SearchResult {
  id: string;
  type: SearchResultType;
  label: string;
  subtitle?: string;
  data: Client | Page | { type: WidgetType; label: string };
}

export function CommandPalette({
  open,
  onClose,
  defaultTab = "search",
  pages,
  currentPage,
  onNavigateToPage,
  onApplyTemplate,
  onAddWidget,
}: CommandPaletteProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [query, setQuery] = useState("");
  const { clients, actions } = useWidget();

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
      setQuery("");
    }
  }, [open, defaultTab]);

  // Build search results
  const searchResults = useMemo(() => {
    if (activeTab !== "search") return [];

    const results: SearchResult[] = [];
    const normalizedQuery = query.toLowerCase().trim();

    // Search clients
    const filteredClients = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(normalizedQuery) ||
        client.company.toLowerCase().includes(normalizedQuery) ||
        client.email.toLowerCase().includes(normalizedQuery)
    );
    filteredClients.forEach((client) => {
      results.push({
        id: `client-${client.id}`,
        type: "client",
        label: client.name,
        subtitle: client.company,
        data: client,
      });
    });

    // Search pages
    const filteredPages = pages.filter((page) =>
      page.name.toLowerCase().includes(normalizedQuery)
    );
    filteredPages.forEach((page, index) => {
      results.push({
        id: `page-${page.id}`,
        type: "page",
        label: page.name,
        subtitle: index === currentPage ? "Current page" : undefined,
        data: page,
      });
    });

    // Show widget types (always show when query is empty or matches)
    const widgetTypes = Object.values(widgetRegistry);
    const filteredWidgets = widgetTypes.filter(
      (widget) =>
        normalizedQuery === "" ||
        widget.label.toLowerCase().includes(normalizedQuery) ||
        widget.description.toLowerCase().includes(normalizedQuery)
    );
    filteredWidgets.forEach((widget) => {
      results.push({
        id: `widget-${widget.type}`,
        type: "widget",
        label: `Add ${widget.label}`,
        subtitle: widget.description,
        data: { type: widget.type, label: widget.label },
      });
    });

    return results;
  }, [activeTab, query, clients, pages, currentPage]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<SearchResultType, SearchResult[]> = {
      client: [],
      page: [],
      widget: [],
    };
    searchResults.forEach((result) => {
      groups[result.type].push(result);
    });
    return groups;
  }, [searchResults]);

  const handleSelect = (result: SearchResult | null) => {
    if (!result) return;

    switch (result.type) {
      case "client":
        actions.selectClient(result.data as Client);
        break;
      case "page":
        const pageIndex = pages.findIndex((p) => p.id === (result.data as Page).id);
        if (pageIndex !== -1) {
          onNavigateToPage(pageIndex);
        }
        break;
      case "widget":
        const widgetData = result.data as { type: WidgetType; label: string };
        onAddWidget(widgetData.type);
        break;
    }
    onClose();
  };

  const handleTemplateClick = (template: PageTemplate) => {
    onApplyTemplate(template);
    onClose();
  };

  const handleAISubmit = () => {
    if (!query.trim()) return;

    // Find matching template based on query
    const matchedTemplate = pageTemplates.find((template) =>
      template.keywords.some((keyword) =>
        query.toLowerCase().includes(keyword)
      )
    );

    if (matchedTemplate) {
      onApplyTemplate(matchedTemplate);
    }
    onClose();
  };

  const getResultIcon = (type: SearchResultType) => {
    switch (type) {
      case "client":
        return UserIcon;
      case "page":
        return DocumentIcon;
      case "widget":
        return Squares2X2Icon;
    }
  };

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case "email-workflow":
        return EnvelopeIcon;
      case "client-review":
        return UserIcon;
      case "activity-overview":
        return ClipboardDocumentListIcon;
      default:
        return ChatBubbleLeftIcon;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-stone-950/50 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-2xl transform divide-y divide-stone-200 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-200 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in dark:divide-stone-700 dark:bg-stone-900 dark:ring-stone-700"
        >
          {/* Tab Switcher */}
          <div className="flex gap-1 p-2">
            <button
              onClick={() => setActiveTab("search")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === "search"
                  ? "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-white"
                  : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
              }`}
            >
              <MagnifyingGlassIcon className="size-4" />
              Search
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === "ai"
                  ? "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-white"
                  : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
              }`}
            >
              <SparklesIcon className="size-4" />
              AI
            </button>
            <div className="ml-auto flex items-center pr-2">
              <kbd className="hidden rounded bg-stone-100 px-1.5 py-0.5 text-xs font-medium text-stone-500 sm:inline-block dark:bg-stone-800 dark:text-stone-400">
                esc
              </kbd>
            </div>
          </div>

          {activeTab === "search" ? (
            <Combobox<SearchResult | null>
              onChange={handleSelect}
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-3.5 size-5 text-stone-400 dark:text-stone-500"
                  aria-hidden="true"
                />
                <ComboboxInput
                  autoFocus
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-stone-900 outline-none placeholder:text-stone-400 focus:ring-0 sm:text-sm dark:text-white dark:placeholder:text-stone-500"
                  placeholder="Search clients, pages, widgets..."
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={() => {}}
                />
              </div>

              <ComboboxOptions
                static
                className="max-h-80 scroll-py-2 overflow-y-auto py-2"
              >
                {groupedResults.client.length > 0 && (
                  <div className="px-2">
                    <h3 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                      Clients
                    </h3>
                    {groupedResults.client.map((result) => {
                      const Icon = getResultIcon(result.type);
                      return (
                        <ComboboxOption
                          key={result.id}
                          value={result}
                          className="group flex cursor-default select-none items-center gap-3 rounded-lg px-2 py-2 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-800"
                        >
                          <Icon className="size-5 text-stone-400 group-data-[focus]:text-stone-600 dark:text-stone-500 dark:group-data-[focus]:text-stone-300" />
                          <div className="flex-1 truncate">
                            <span className="text-sm text-stone-900 dark:text-white">
                              {result.label}
                            </span>
                            {result.subtitle && (
                              <span className="ml-2 text-sm text-stone-500 dark:text-stone-400">
                                {result.subtitle}
                              </span>
                            )}
                          </div>
                        </ComboboxOption>
                      );
                    })}
                  </div>
                )}

                {groupedResults.page.length > 0 && (
                  <div className="mt-2 px-2">
                    <h3 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                      Pages
                    </h3>
                    {groupedResults.page.map((result) => {
                      const Icon = getResultIcon(result.type);
                      return (
                        <ComboboxOption
                          key={result.id}
                          value={result}
                          className="group flex cursor-default select-none items-center gap-3 rounded-lg px-2 py-2 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-800"
                        >
                          <Icon className="size-5 text-stone-400 group-data-[focus]:text-stone-600 dark:text-stone-500 dark:group-data-[focus]:text-stone-300" />
                          <div className="flex-1 truncate">
                            <span className="text-sm text-stone-900 dark:text-white">
                              {result.label}
                            </span>
                            {result.subtitle && (
                              <span className="ml-2 text-xs text-stone-500 dark:text-stone-400">
                                {result.subtitle}
                              </span>
                            )}
                          </div>
                        </ComboboxOption>
                      );
                    })}
                  </div>
                )}

                {groupedResults.widget.length > 0 && (
                  <div className="mt-2 px-2">
                    <h3 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                      Widgets
                    </h3>
                    {groupedResults.widget.map((result) => {
                      const Icon = getResultIcon(result.type);
                      return (
                        <ComboboxOption
                          key={result.id}
                          value={result}
                          className="group flex cursor-default select-none items-center gap-3 rounded-lg px-2 py-2 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-800"
                        >
                          <Icon className="size-5 text-stone-400 group-data-[focus]:text-stone-600 dark:text-stone-500 dark:group-data-[focus]:text-stone-300" />
                          <div className="flex-1 truncate">
                            <span className="text-sm text-stone-900 dark:text-white">
                              {result.label}
                            </span>
                            {result.subtitle && (
                              <span className="ml-2 text-sm text-stone-500 dark:text-stone-400">
                                {result.subtitle}
                              </span>
                            )}
                          </div>
                        </ComboboxOption>
                      );
                    })}
                  </div>
                )}

                {searchResults.length === 0 && query !== "" && (
                  <p className="px-4 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                    No results found for "{query}"
                  </p>
                )}
              </ComboboxOptions>
            </Combobox>
          ) : (
            // AI Tab
            <div>
              <div className="relative">
                <SparklesIcon
                  className="pointer-events-none absolute left-4 top-4 size-5 text-stone-400 dark:text-stone-500"
                  aria-hidden="true"
                />
                <textarea
                  autoFocus
                  rows={2}
                  className="w-full resize-none border-0 bg-transparent py-4 pl-11 pr-4 text-stone-900 outline-none placeholder:text-stone-400 focus:ring-0 sm:text-sm dark:text-white dark:placeholder:text-stone-500"
                  placeholder="Ask AI to create a workflow..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAISubmit();
                    }
                  }}
                />
              </div>

              <div className="max-h-80 overflow-y-auto py-4">
                <div className="px-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    {pageTemplates.map((template) => {
                      const Icon = getTemplateIcon(template.id);
                      return (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateClick(template)}
                          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          <div className="flex size-8 items-center justify-center rounded-lg bg-stone-100 text-stone-500 group-hover:bg-stone-200 group-hover:text-stone-700 dark:bg-stone-800 dark:text-stone-400 dark:group-hover:bg-stone-700 dark:group-hover:text-stone-200">
                            <Icon className="size-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-stone-900 dark:text-white">
                              {template.name}
                            </div>
                            <div className="text-xs text-stone-500 dark:text-stone-400">
                              {template.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {query && (
                  <div className="mt-4 border-t border-stone-200 px-4 pt-4 dark:border-stone-700">
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Press <kbd className="rounded bg-stone-100 px-1 py-0.5 text-xs font-medium dark:bg-stone-800">Enter</kbd> to create a workflow based on your prompt
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
