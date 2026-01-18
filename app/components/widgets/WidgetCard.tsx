import { ReactNode } from "react";
import { WorkflowBadge } from "./WorkflowBadge";

interface WidgetCardProps {
  children: ReactNode;
  className?: string;
  stepNumber?: number;
}

export function WidgetCard({
  children,
  className = "",
  stepNumber,
}: WidgetCardProps) {
  return (
    <div className="relative h-full">
      {stepNumber !== undefined && <WorkflowBadge step={stepNumber} />}
      <div
        className={`flex h-full flex-col divide-y divide-stone-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:divide-white/10 dark:bg-stone-900 dark:shadow-none dark:ring-white/10 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
