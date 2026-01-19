import { ComponentType, ReactNode } from "react";

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

interface PillButtonProps {
  children: ReactNode;
  icon?: IconComponent;
  iconPosition?: "left" | "right";
  variant?: "primary" | "soft" | "soft-gray" | "ghost";
  size?: "sm" | "md";
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
  sm: "px-2.5 py-1 text-xs gap-1",
  md: "px-3 py-1.5 text-sm gap-1.5",
};

const iconSizes = {
  sm: "size-3.5",
  md: "size-4",
};

export function PillButton({
  children,
  icon: Icon,
  iconPosition = "left",
  variant = "soft-gray",
  size = "sm",
  onClick,
  disabled = false,
  className = "",
}: PillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {Icon && iconPosition === "left" && (
        <Icon aria-hidden={true} className={iconSizes[size]} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon aria-hidden={true} className={iconSizes[size]} />
      )}
    </button>
  );
}
