import { ComponentType } from "react";

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

interface CircleButtonProps {
  icon: IconComponent;
  label: string;
  variant?: "primary" | "soft" | "soft-gray" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary:
    "bg-indigo-600 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500",
  soft: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400 dark:hover:bg-indigo-500/30",
  "soft-gray":
    "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20",
  ghost:
    "text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-white/10",
};

const sizeStyles = {
  sm: "p-1",
  md: "p-1.5",
  lg: "p-2",
};

const iconSizes = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export function CircleButton({
  icon: Icon,
  label,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
}: CircleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`rounded-full transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <Icon aria-hidden="true" className={iconSizes[size]} />
    </button>
  );
}
