import { ReactNode } from "react";

interface WidgetCardProps {
  children: ReactNode;
  className?: string;
}

export function WidgetCard({ children, className = "" }: WidgetCardProps) {
  return (
    <div
      className={`flex flex-col divide-y divide-zinc-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:divide-white/10 dark:bg-zinc-900 dark:shadow-none dark:ring-white/10 ${className}`}
    >
      {children}
    </div>
  );
}
