import { ReactNode, CSSProperties } from "react";
import { WorkflowBadge } from "./WorkflowBadge";

interface WidgetCardProps {
  children: ReactNode;
  className?: string;
  stepNumber?: number;
  animationDelay?: number;
}

export function WidgetCard({
  children,
  className = "",
  stepNumber,
  animationDelay,
}: WidgetCardProps) {
  const isAnimating = animationDelay !== undefined;

  const animationStyle: CSSProperties = isAnimating
    ? {
        animationName: "widgetPopIn",
        animationDuration: "500ms",
        animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        animationDelay: `${animationDelay}ms`,
        animationFillMode: "backwards",
      }
    : {};

  return (
    <div className="relative h-full" style={animationStyle}>
      {stepNumber !== undefined && <WorkflowBadge step={stepNumber} />}
      <div
        className={`flex h-full flex-col divide-y divide-stone-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:divide-white/10 dark:bg-stone-900 dark:shadow-none dark:ring-white/10 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
