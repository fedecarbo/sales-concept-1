import { ReactNode } from "react";

interface WidgetFooterProps {
  children: ReactNode;
  className?: string;
}

export function WidgetFooter({ children, className = "" }: WidgetFooterProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 bg-gray-50 px-4 py-3 dark:bg-gray-800/50 ${className}`}
    >
      {children}
    </div>
  );
}
