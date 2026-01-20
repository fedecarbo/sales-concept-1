"use client";

import { useMemo } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { CalendarEvent } from "./mockData";

export interface WidgetCalendarProps {
  events: CalendarEvent[];
}

const EVENT_TYPE_COLORS: Record<CalendarEvent["type"], string> = {
  meeting: "bg-blue-500",
  deadline: "bg-red-500",
  reminder: "bg-amber-500",
  "follow-up": "bg-purple-500",
};

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Container-responsive calendar widget based on TailwindUI "Small with meetings".
 *
 * Breakpoints:
 * - < 20rem: Meetings list only
 * - 20rem - 32rem: Calendar grid only
 * - > 32rem: Meetings list + calendar side by side
 */
export function WidgetCalendar({ events }: WidgetCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Generate calendar days with proper padding
  const days = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Get day of week for first day (0 = Sunday, adjust for Monday start)
    let startDay = firstDay.getDay();
    // Convert to Monday-based (0 = Monday)
    startDay = startDay === 0 ? 6 : startDay - 1;

    const result: {
      date: string;
      day: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      hasEvents: boolean;
    }[] = [];

    // Previous month padding
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(currentYear, currentMonth - 1, day);
      result.push({
        date: date.toISOString().split("T")[0],
        day,
        isCurrentMonth: false,
        isToday: false,
        hasEvents: events.some((e) => e.date === date.toISOString().split("T")[0]),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split("T")[0];
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();
      result.push({
        date: dateStr,
        day,
        isCurrentMonth: true,
        isToday,
        hasEvents: events.some((e) => e.date === dateStr),
      });
    }

    // Next month padding (fill to 42 days = 6 rows)
    const remaining = 42 - result.length;
    for (let day = 1; day <= remaining; day++) {
      const date = new Date(currentYear, currentMonth + 1, day);
      result.push({
        date: date.toISOString().split("T")[0],
        day,
        isCurrentMonth: false,
        isToday: false,
        hasEvents: events.some((e) => e.date === date.toISOString().split("T")[0]),
      });
    }

    return result;
  }, [events, currentMonth, currentYear, today]);

  // Get upcoming events sorted by date
  const upcomingEvents = useMemo(() => {
    const todayStr = today.toISOString().split("T")[0];
    return events
      .filter((e) => e.date >= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }, [events, today]);

  const formatEventDate = (dateStr: string, time?: string) => {
    const date = new Date(dateStr + "T00:00:00");
    const todayStr = today.toISOString().split("T")[0];
    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowStr = tomorrowDate.toISOString().split("T")[0];

    let dateLabel: string;
    if (dateStr === todayStr) {
      dateLabel = "Today";
    } else if (dateStr === tomorrowStr) {
      dateLabel = "Tomorrow";
    } else {
      dateLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    return time ? `${dateLabel} at ${time}` : dateLabel;
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
    month: "long",
  });

  // Calendar grid component (reused in medium and wide views)
  const CalendarGrid = ({ compact = false }: { compact?: boolean }) => (
    <div className="text-center">
      <div className="flex items-center justify-center text-stone-900 dark:text-white">
        <div className={classNames("font-semibold", compact ? "text-xs" : "text-sm")}>
          {monthName}
        </div>
      </div>
      <div
        className={classNames(
          "mt-3 grid grid-cols-7 text-stone-500 dark:text-stone-400",
          compact ? "text-[10px]" : "text-xs"
        )}
      >
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>
      <div
        className={classNames(
          "isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-stone-200 text-sm ring-1 ring-stone-200 dark:bg-white/15 dark:ring-white/15",
          compact ? "text-[10px]" : "text-xs"
        )}
      >
        {days.map((day, idx) => (
          <div
            key={day.date}
            className={classNames(
              "aspect-square relative flex flex-col items-center justify-center",
              !day.isCurrentMonth && "bg-stone-50 dark:bg-stone-900/75",
              day.isCurrentMonth && "bg-white dark:bg-stone-900/90",
              idx === 0 && "rounded-tl-lg",
              idx === 6 && "rounded-tr-lg",
              idx === 35 && "rounded-bl-lg",
              idx === 41 && "rounded-br-lg"
            )}
          >
            <time
              dateTime={day.date}
              className={classNames(
                "flex items-center justify-center rounded-full",
                compact ? "size-5 text-[10px]" : "size-6 text-xs",
                day.isToday &&
                  "bg-stone-900 font-semibold text-white dark:bg-white dark:text-stone-900",
                !day.isToday && day.isCurrentMonth && "text-stone-900 dark:text-white",
                !day.isToday && !day.isCurrentMonth && "text-stone-400 dark:text-stone-500"
              )}
            >
              {day.day}
            </time>
            {day.hasEvents && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                <div className="h-1 w-1 rounded-full bg-blue-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Meeting item component
  const MeetingItem = ({ event, compact = false }: { event: CalendarEvent; compact?: boolean }) => (
    <li className={classNames("flex gap-x-3", compact ? "py-2" : "py-3")}>
      {event.attendees?.[0]?.avatar ? (
        <img
          alt=""
          src={event.attendees[0].avatar}
          className={classNames(
            "flex-none rounded-full ring-1 ring-stone-200 dark:ring-stone-700",
            compact ? "size-8" : "size-10"
          )}
        />
      ) : (
        <div
          className={classNames(
            "flex-none rounded-full flex items-center justify-center",
            compact ? "size-8" : "size-10",
            EVENT_TYPE_COLORS[event.type]
          )}
        >
          <CalendarIcon className="size-4 text-white" />
        </div>
      )}
      <div className="flex-auto min-w-0">
        <p
          className={classNames(
            "font-medium text-stone-900 dark:text-white truncate",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {event.title}
        </p>
        <div
          className={classNames(
            "flex items-center gap-x-1.5 text-stone-500 dark:text-stone-400 mt-0.5",
            compact ? "text-[10px]" : "text-xs"
          )}
        >
          <CalendarIcon className="size-3.5 text-stone-400 dark:text-stone-500 flex-shrink-0" />
          <span className="truncate">{formatEventDate(event.date, event.time)}</span>
        </div>
      </div>
    </li>
  );

  return (
    <div className="@container h-full w-full overflow-hidden">
      {/* Narrow: Meetings list only */}
      <div className="block @[20rem]:hidden h-full overflow-y-auto px-4 py-2">
        {upcomingEvents.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-stone-500 dark:text-stone-400">
            No upcoming events
          </div>
        ) : (
          <ol className="divide-y divide-stone-100 dark:divide-stone-800">
            {upcomingEvents.map((event) => (
              <MeetingItem key={event.id} event={event} compact />
            ))}
          </ol>
        )}
      </div>

      {/* Medium: Calendar grid + meetings list stacked */}
      <div className="hidden @[20rem]:flex @[32rem]:hidden flex-col h-full overflow-y-auto px-4 py-3 gap-4">
        <CalendarGrid compact />
        <div className="border-t border-stone-200 dark:border-stone-700 pt-3">
          <h3 className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
            Upcoming
          </h3>
          {upcomingEvents.length === 0 ? (
            <div className="text-xs text-stone-500 dark:text-stone-400">
              No upcoming events
            </div>
          ) : (
            <ol className="divide-y divide-stone-100 dark:divide-stone-800">
              {upcomingEvents.slice(0, 3).map((event) => (
                <MeetingItem key={event.id} event={event} compact />
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* Wide: Meetings + Calendar side by side */}
      <div className="hidden @[32rem]:grid grid-cols-12 gap-x-4 h-full overflow-hidden px-4 py-3">
        {/* Meetings list on left */}
        <div className="col-span-7 overflow-y-auto">
          <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
            Upcoming
          </h3>
          {upcomingEvents.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-stone-500 dark:text-stone-400">
              No upcoming events
            </div>
          ) : (
            <ol className="divide-y divide-stone-100 dark:divide-stone-800">
              {upcomingEvents.map((event) => (
                <MeetingItem key={event.id} event={event} />
              ))}
            </ol>
          )}
        </div>

        {/* Calendar on right */}
        <div className="col-span-5">
          <CalendarGrid />
        </div>
      </div>
    </div>
  );
}
