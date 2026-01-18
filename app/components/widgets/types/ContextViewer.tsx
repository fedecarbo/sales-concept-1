"use client";

import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { useWidget } from "@/app/context/WidgetContext";
import { WidgetCard } from "../WidgetCard";
import { WidgetHeader } from "../WidgetHeader";
import { WidgetFooter } from "../WidgetFooter";
import { PillButton, CircleButton } from "../../ui";

interface ContextViewerProps {
  widgetId: string;
  stepNumber?: number;
}

const interactionIcons: Record<string, typeof EnvelopeIcon> = {
  email: EnvelopeIcon,
  call: PhoneIcon,
  meeting: CalendarIcon,
  slack: ChatBubbleLeftIcon,
  note: ChatBubbleLeftIcon,
};

const sentimentColors: Record<string, string> = {
  positive: "text-green-500",
  neutral: "text-stone-400",
  negative: "text-red-500",
};

const stageColors: Record<string, string> = {
  lead: "bg-stone-200 text-stone-700",
  qualified: "bg-blue-100 text-blue-700",
  proposal: "bg-amber-100 text-amber-700",
  negotiation: "bg-purple-100 text-purple-700",
  "closed-won": "bg-green-100 text-green-700",
  "closed-lost": "bg-red-100 text-red-700",
};

export function ContextViewer({ widgetId, stepNumber }: ContextViewerProps) {
  const { state } = useWidget();
  const { clientContext } = state;

  if (!clientContext) {
    return (
      <WidgetCard className="h-full" stepNumber={stepNumber}>
        <WidgetHeader title="Client Context" subtitle="Select a client" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div
              className="mx-auto h-16 w-16 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center mb-3"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(161,161,170,0.1) 4px, rgba(161,161,170,0.1) 8px)",
              }}
            >
              <BuildingOfficeIcon className="h-6 w-6 text-stone-300 dark:text-stone-600" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Select a client to view their context
            </p>
          </div>
        </div>
        <WidgetFooter>
          <PillButton icon={PencilSquareIcon} variant="soft-gray" disabled>
            Add note
          </PillButton>
        </WidgetFooter>
      </WidgetCard>
    );
  }

  const { client, recentInteractions, deals, notes } = clientContext;

  return (
    <WidgetCard className="h-full" stepNumber={stepNumber}>
      <WidgetHeader
        title={client.name}
        subtitle={`${client.role} at ${client.company}`}
      />
      <div className="flex-1 overflow-y-auto">
        {/* Contact Info */}
        <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1">
              <EnvelopeIcon className="h-3.5 w-3.5" />
              {client.email}
            </span>
            {client.phone && (
              <span className="flex items-center gap-1">
                <PhoneIcon className="h-3.5 w-3.5" />
                {client.phone}
              </span>
            )}
          </div>
          {client.tags && client.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Deal Pipeline */}
        {deals.length > 0 && (
          <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
            <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              Deals
            </h4>
            <div className="space-y-2">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="h-4 w-4 text-stone-400" />
                    <span className="text-sm text-stone-700 dark:text-stone-300">
                      {deal.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-stone-900 dark:text-white">
                      ${deal.value.toLocaleString()}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${stageColors[deal.stage]}`}
                    >
                      {deal.stage.replace("-", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Interactions */}
        {recentInteractions.length > 0 && (
          <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
            <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              Recent Activity
            </h4>
            <div className="space-y-2">
              {recentInteractions.slice(0, 3).map((interaction) => {
                const Icon = interactionIcons[interaction.type] || ChatBubbleLeftIcon;
                return (
                  <div key={interaction.id} className="flex gap-2">
                    <Icon
                      className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                        sentimentColors[interaction.sentiment || "neutral"]
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-700 dark:text-stone-300 line-clamp-1">
                        {interaction.summary}
                      </p>
                      <p className="text-xs text-stone-400">
                        {interaction.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Notes */}
        {notes.length > 0 && (
          <div className="px-4 py-3">
            <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              Notes
            </h4>
            <ul className="space-y-1">
              {notes.map((note, index) => (
                <li
                  key={index}
                  className="text-sm text-stone-600 dark:text-stone-400 flex items-start gap-2"
                >
                  <span className="text-stone-300">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <WidgetFooter>
        <PillButton icon={PencilSquareIcon} variant="soft-gray">
          Add note
        </PillButton>
        <CircleButton
          icon={ArrowPathIcon}
          label="Refresh context"
          variant="ghost"
          size="sm"
        />
      </WidgetFooter>
    </WidgetCard>
  );
}
