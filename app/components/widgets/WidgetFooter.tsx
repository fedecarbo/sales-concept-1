import { ComponentType, ReactNode } from "react";

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

interface ActionButton {
  label: string;
  icon?: IconComponent;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface WidgetFooterProps {
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
  children?: ReactNode;
  className?: string;
}

export function WidgetFooter({
  primaryAction,
  secondaryAction,
  children,
  className = "",
}: WidgetFooterProps) {
  const hasActions = primaryAction || secondaryAction;

  return (
    <div
      className={`flex items-center gap-2.5 bg-stone-50 px-4 py-3 dark:bg-stone-800/50 ${
        hasActions ? "justify-center" : ""
      } ${className}`}
    >
      {children}

      {secondaryAction && (
        <button
          type="button"
          onClick={secondaryAction.onClick}
          disabled={secondaryAction.disabled}
          className="inline-flex items-center justify-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/10 dark:text-stone-300 dark:hover:bg-white/20"
        >
          {secondaryAction.icon && (
            <secondaryAction.icon aria-hidden className="size-3.5" />
          )}
          {secondaryAction.label}
        </button>
      )}

      {primaryAction && (
        <button
          type="button"
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled || primaryAction.loading}
          className="inline-flex items-center justify-center gap-1 rounded-full bg-stone-900 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-100"
        >
          {primaryAction.loading ? (
            <svg
              className="size-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            primaryAction.icon && (
              <primaryAction.icon aria-hidden className="size-3.5" />
            )
          )}
          {primaryAction.label}
        </button>
      )}
    </div>
  );
}
