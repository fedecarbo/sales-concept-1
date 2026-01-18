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
    "bg-primary-500 text-white shadow-xs hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:shadow-none dark:hover:bg-primary-400",
  soft: "bg-primary-500/10 text-primary-600 hover:bg-primary-500/20 dark:bg-primary-500/20 dark:text-primary-400 dark:hover:bg-primary-500/30",
  "soft-gray":
    "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-white/10 dark:text-stone-300 dark:hover:bg-white/20",
  ghost:
    "text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-stone-300 dark:hover:bg-white/10",
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
