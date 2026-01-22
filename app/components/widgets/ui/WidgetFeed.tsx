"use client";

import { useMemo } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/20/solid";
import { ConversationActivity, ActivityChannel, ActivityDirection } from "./mockData";

export interface WidgetFeedProps {
  activities: ConversationActivity[];
  showSummaries?: boolean;
  maxItems?: number;
  hoverable?: boolean;
}

const CHANNEL_CONFIG: Record<
  ActivityChannel,
  {
    icon: typeof EnvelopeIcon;
    bgColor: string;
    textColor: string;
    label: string;
  }
> = {
  linkedin: {
    icon: UserCircleIcon,
    bgColor: "bg-blue-500",
    textColor: "text-white",
    label: "LinkedIn",
  },
  sales_navigator: {
    icon: MagnifyingGlassIcon,
    bgColor: "bg-blue-600",
    textColor: "text-white",
    label: "Sales Nav",
  },
  email: {
    icon: EnvelopeIcon,
    bgColor: "bg-amber-500",
    textColor: "text-white",
    label: "Email",
  },
  call: {
    icon: PhoneIcon,
    bgColor: "bg-green-500",
    textColor: "text-white",
    label: "Call",
  },
  meeting: {
    icon: CalendarIcon,
    bgColor: "bg-purple-500",
    textColor: "text-white",
    label: "Meeting",
  },
  slack: {
    icon: ChatBubbleLeftRightIcon,
    bgColor: "bg-rose-500",
    textColor: "text-white",
    label: "Slack",
  },
  note: {
    icon: PencilSquareIcon,
    bgColor: "bg-stone-500",
    textColor: "text-white",
    label: "Note",
  },
};

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function DirectionIndicator({ direction }: { direction: ActivityDirection }) {
  const isInbound = direction === "inbound";
  return (
    <span
      className={classNames(
        "inline-flex items-center",
        isInbound ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
      )}
    >
      {isInbound ? (
        <ArrowDownIcon className="size-3" />
      ) : (
        <ArrowUpIcon className="size-3" />
      )}
    </span>
  );
}

/**
 * Container-responsive conversation history feed.
 *
 * Breakpoints:
 * - < 20rem: Compact list (icon + name + time)
 * - 20rem - 32rem: Timeline with content preview
 * - > 32rem: Full cards with avatar overlay and highlights
 */
export function WidgetFeed({
  activities,
  showSummaries = false,
  maxItems = 20,
  hoverable = true,
}: WidgetFeedProps) {
  // Sort by timestamp descending (most recent first)
  const sortedActivities = useMemo(() => {
    return [...activities]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, maxItems);
  }, [activities, maxItems]);

  // Narrow view: compact list
  const NarrowFeedView = () => (
    <ul className="divide-y divide-stone-100 dark:divide-stone-800">
      {sortedActivities.map((activity) => {
        const config = CHANNEL_CONFIG[activity.channel];
        const Icon = config.icon;

        return (
          <li
            key={activity.id}
            className={classNames(
              "flex items-center gap-3 px-3 py-2.5",
              hoverable && "hover:bg-stone-50 dark:hover:bg-stone-800/50"
            )}
          >
            <div
              className={classNames(
                "flex-shrink-0 size-7 rounded-full flex items-center justify-center",
                config.bgColor
              )}
            >
              <Icon className={classNames("size-3.5", config.textColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <DirectionIndicator direction={activity.direction} />
                <p className="text-xs font-medium text-stone-900 dark:text-white truncate">
                  {activity.contact.name}
                </p>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                {config.label}
              </p>
            </div>
            <span className="flex-shrink-0 text-[10px] text-stone-400 dark:text-stone-500">
              {formatRelativeTime(activity.timestamp)}
            </span>
          </li>
        );
      })}
    </ul>
  );

  // Medium view: timeline with content preview
  const MediumFeedView = () => (
    <div className="relative px-3 py-2">
      {/* Timeline line */}
      <div className="absolute left-[1.4rem] top-0 bottom-0 w-px bg-stone-200 dark:bg-stone-700" />

      <ul className="space-y-0">
        {sortedActivities.map((activity) => {
          const config = CHANNEL_CONFIG[activity.channel];
          const Icon = config.icon;
          const displayContent = showSummaries && activity.summary ? activity.summary : activity.content;

          return (
            <li
              key={activity.id}
              className={classNames(
                "relative flex gap-3 py-2.5",
                hoverable && "hover:bg-stone-50 dark:hover:bg-stone-800/30 -mx-3 px-3 rounded-lg"
              )}
            >
              <div className="relative flex-shrink-0 z-10">
                <div
                  className={classNames(
                    "size-8 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-stone-900",
                    config.bgColor
                  )}
                >
                  <Icon className={classNames("size-4", config.textColor)} />
                </div>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <DirectionIndicator direction={activity.direction} />
                    <p className="text-xs font-medium text-stone-900 dark:text-white truncate">
                      {activity.contact.name}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-[10px] text-stone-400 dark:text-stone-500">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                  {activity.title}
                  {activity.duration && ` · ${activity.duration}`}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
                  {displayContent}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  // Wide view: full cards with avatar overlay
  const WideFeedView = () => (
    <div className="relative px-4 py-3">
      {/* Timeline line */}
      <div className="absolute left-[2.25rem] top-0 bottom-0 w-0.5 bg-stone-200 dark:bg-stone-700" />

      <ul className="space-y-3">
        {sortedActivities.map((activity) => {
          const config = CHANNEL_CONFIG[activity.channel];
          const Icon = config.icon;
          const displayContent = showSummaries && activity.summary ? activity.summary : activity.content;

          return (
            <li key={activity.id} className={classNames("relative flex gap-4", hoverable && "group")}>
              {/* Avatar with channel overlay */}
              <div className="relative flex-shrink-0 z-10">
                {activity.contact.avatar ? (
                  <img
                    alt=""
                    src={activity.contact.avatar}
                    className="size-10 rounded-full object-cover ring-4 ring-white dark:ring-stone-900"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-stone-200 dark:bg-stone-700 ring-4 ring-white dark:ring-stone-900 flex items-center justify-center">
                    <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                      {activity.contact.name.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Channel badge overlay */}
                <div
                  className={classNames(
                    "absolute -bottom-0.5 -right-0.5 size-4 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-stone-900",
                    config.bgColor
                  )}
                >
                  <Icon className={classNames("size-2.5", config.textColor)} />
                </div>
              </div>

              {/* Content card */}
              <div
                className={classNames(
                  "flex-1 min-w-0 rounded-lg bg-stone-50 dark:bg-stone-800/50 p-3",
                  hoverable && "group-hover:bg-stone-100 dark:group-hover:bg-stone-800 transition-colors"
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <DirectionIndicator direction={activity.direction} />
                      <span className="font-medium text-sm text-stone-900 dark:text-white">
                        {activity.contact.name}
                      </span>
                      {activity.contact.company && (
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          at {activity.contact.company}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {activity.title}
                      {activity.duration && ` · ${activity.duration}`}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-stone-400 dark:text-stone-500 whitespace-nowrap">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 line-clamp-3">
                  {displayContent}
                </p>

                {/* Highlights */}
                {activity.highlights?.nextSteps && activity.highlights.nextSteps.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-700">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                        Next:
                      </span>
                      <span className="text-xs text-stone-600 dark:text-stone-300">
                        {activity.highlights.nextSteps[0]}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (sortedActivities.length === 0) {
    return (
      <div className="@container h-full w-full flex items-center justify-center">
        <p className="text-sm text-stone-500 dark:text-stone-400">No conversation history</p>
      </div>
    );
  }

  return (
    <div className="@container h-full w-full overflow-hidden">
      {/* Narrow: < 20rem */}
      <div className="block @[20rem]:hidden h-full overflow-y-auto">
        <NarrowFeedView />
      </div>

      {/* Medium: 20rem - 32rem */}
      <div className="hidden @[20rem]:block @[32rem]:hidden h-full overflow-y-auto">
        <MediumFeedView />
      </div>

      {/* Wide: > 32rem */}
      <div className="hidden @[32rem]:block h-full overflow-y-auto">
        <WideFeedView />
      </div>
    </div>
  );
}
