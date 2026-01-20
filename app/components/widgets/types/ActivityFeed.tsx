"use client";

import {
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  FunnelIcon,
  ArrowPathIcon,
  UserGroupIcon,
  BriefcaseIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";
import { useWidget } from "@/app/context/WidgetContext";
import { WidgetCard } from "../WidgetCard";
import { WidgetHeader } from "../WidgetHeader";
import { WidgetFooter } from "../WidgetFooter";
import { getAllInteractions, getActivitySummary, ActivitySummary } from "@/app/data/mockData";
import { Interaction } from "@/app/types";

interface ActivityFeedProps {
  widgetId: string;
  stepNumber?: number;
  animationDelay?: number;
  isDragging?: boolean;
}

const interactionIcons: Record<string, typeof EnvelopeIcon> = {
  email: EnvelopeIcon,
  call: PhoneIcon,
  meeting: CalendarIcon,
  slack: ChatBubbleLeftIcon,
  note: DocumentTextIcon,
  linkedin: UserGroupIcon,
  "sales-navigator": BriefcaseIcon,
};

const interactionColors: Record<string, string> = {
  email: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  call: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  meeting: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  slack: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  note: "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
  linkedin: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  "sales-navigator": "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
};

const sentimentDots: Record<string, string> = {
  positive: "bg-green-500",
  neutral: "bg-stone-300 dark:bg-stone-600",
  negative: "bg-red-500",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ActivityFeed({ widgetId, stepNumber, animationDelay, isDragging }: ActivityFeedProps) {
  const { state } = useWidget();
  const { selectedClient, clientContext } = state;

  // If a client is selected, show their interactions; otherwise show all
  const interactions: Interaction[] = selectedClient && clientContext
    ? clientContext.recentInteractions
    : getAllInteractions();

  const filteredByClient = selectedClient && clientContext;

  // Get AI summary for selected client
  const summary: ActivitySummary | null = selectedClient
    ? getActivitySummary(selectedClient.id)
    : null;

  return (
    <WidgetCard className="h-full" stepNumber={stepNumber} animationDelay={animationDelay} isDragging={isDragging}>
      <WidgetHeader title="Activity Feed" />
      <div className="flex-1 overflow-y-auto">
        {/* AI Summary Section */}
        {summary && filteredByClient && (
          <div className="mx-3 mt-3 mb-2 rounded-lg bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-3 ring-1 ring-violet-200/50 dark:ring-violet-800/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-violet-100 dark:bg-violet-900/50">
                <SparklesIcon className="h-3 w-3 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">AI Summary</span>
              <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${
                summary.sentiment === "positive"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : summary.sentiment === "negative"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
              }`}>
                {summary.sentiment}
              </span>
            </div>
            <p className="text-sm text-stone-700 dark:text-stone-300 mb-2">
              {summary.overview}
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-violet-200/50 dark:border-violet-800/30">
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">Next step:</span>
              <span className="text-xs text-stone-600 dark:text-stone-400">{summary.nextStep}</span>
            </div>
          </div>
        )}

        {interactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div
              className="h-12 w-12 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center mb-3"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(161,161,170,0.1) 4px, rgba(161,161,170,0.1) 8px)",
              }}
            >
              <CalendarIcon className="h-5 w-5 text-stone-300 dark:text-stone-600" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              No recent activity
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {interactions.map((interaction) => {
              const Icon = interactionIcons[interaction.type] || ChatBubbleLeftIcon;
              const colorClass = interactionColors[interaction.type] || interactionColors.note;

              return (
                <div
                  key={interaction.id}
                  className="px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${colorClass}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-400 capitalize">
                          {interaction.type}
                        </span>
                        {interaction.sentiment && (
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${sentimentDots[interaction.sentiment]}`}
                          />
                        )}
                        <span className="text-xs text-stone-400 dark:text-stone-500 ml-auto">
                          {formatDate(interaction.date)}
                        </span>
                      </div>
                      <p className="text-sm text-stone-700 dark:text-stone-300 mt-0.5 line-clamp-2">
                        {interaction.summary}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <WidgetFooter
        secondaryAction={{
          label: "Refresh",
          icon: ArrowPathIcon,
        }}
        primaryAction={{
          label: "Filter",
          icon: FunnelIcon,
        }}
      />
    </WidgetCard>
  );
}
