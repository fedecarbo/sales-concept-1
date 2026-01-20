"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlassIcon, CheckIcon, PlusIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { useWidget } from "@/app/context/WidgetContext";
import { WidgetCard } from "../WidgetCard";
import { WidgetHeader } from "../WidgetHeader";
import { WidgetFooter } from "../WidgetFooter";

interface ClientSelectorProps {
  widgetId: string;
  stepNumber?: number;
  animationDelay?: number;
  isDragging?: boolean;
}

export function ClientSelector({ widgetId, stepNumber, animationDelay, isDragging }: ClientSelectorProps) {
  const { state, actions, clients } = useWidget();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.company.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
    );
  }, [clients, searchQuery]);

  return (
    <WidgetCard className="h-full" stepNumber={stepNumber} animationDelay={animationDelay} isDragging={isDragging}>
      <WidgetHeader title="Clients" />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Search input */}
        <div className="px-3 py-2 border-b border-stone-200 dark:border-stone-700">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-stone-100 dark:bg-stone-800 rounded-lg border-0 focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-500 placeholder:text-stone-400 dark:placeholder:text-stone-500"
            />
          </div>
        </div>

        {/* Client list */}
        <div className="flex-1 overflow-y-auto">
          {filteredClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400 text-sm">
              <p>No clients found</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {filteredClients.map((client) => {
                const isSelected = state.selectedClient?.id === client.id;
                return (
                  <button
                    key={client.id}
                    onClick={() => actions.selectClient(isSelected ? null : client)}
                    className={`w-full px-3 py-2.5 flex items-start gap-3 text-left transition-colors ${
                      isSelected
                        ? "bg-primary-50 dark:bg-primary-900/20"
                        : "hover:bg-stone-50 dark:hover:bg-stone-800/50"
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium ${
                      isSelected
                        ? "bg-primary-500 text-white"
                        : "bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300"
                    }`}>
                      {client.name.split(" ").map(n => n[0]).join("")}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium truncate ${
                          isSelected
                            ? "text-primary-700 dark:text-primary-300"
                            : "text-stone-900 dark:text-white"
                        }`}>
                          {client.name}
                        </p>
                        {isSelected && (
                          <CheckIcon className="h-4 w-4 text-primary-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        {client.role} at {client.company}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <WidgetFooter
        secondaryAction={{
          label: "Refresh",
          icon: ArrowPathIcon,
        }}
        primaryAction={{
          label: "Add client",
          icon: PlusIcon,
        }}
      />
    </WidgetCard>
  );
}
