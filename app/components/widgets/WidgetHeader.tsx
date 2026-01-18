import { ReactNode } from "react";

interface WidgetHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  isDraggable?: boolean;
}

export function WidgetHeader({ title, subtitle, action, isDraggable = true }: WidgetHeaderProps) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${isDraggable ? "widget-drag-handle" : ""}`}>
      <div>
        <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
