interface WorkflowBadgeProps {
  step: number;
  className?: string;
}

export function WorkflowBadge({ step, className = "" }: WorkflowBadgeProps) {
  return (
    <div
      className={`absolute -top-2 -left-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-white shadow-md ring-2 ring-white dark:bg-white dark:text-stone-900 dark:ring-stone-900 ${className}`}
    >
      {step}
    </div>
  );
}
