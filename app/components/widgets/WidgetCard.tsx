import { ReactNode } from "react";

interface WidgetCardProps {
  children: ReactNode;
  className?: string;
}

export function WidgetCard({ children, className = "" }: WidgetCardProps) {
  return (
    <div
      className={`flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10 ${className}`}
    >
      {children}
    </div>
  );
}
