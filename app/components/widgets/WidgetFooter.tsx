import { ReactNode } from "react";

interface WidgetFooterProps {
  children: ReactNode;
  className?: string;
}

export function WidgetFooter({ children, className = "" }: WidgetFooterProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2.5 bg-stone-50 px-4 py-2.5 dark:bg-stone-800/50 ${className}`}
    >
      {children}
    </div>
  );
}
