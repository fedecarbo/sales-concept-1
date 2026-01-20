"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { springConfigs, widgetCardVariants } from "@/app/lib/animations";

interface WidgetCardProps {
  children: ReactNode;
  className?: string;
  animationDelay?: number;
  isDragging?: boolean;
}

export function WidgetCard({
  children,
  className = "",
  animationDelay,
  isDragging = false,
}: WidgetCardProps) {
  const shouldAnimate = animationDelay !== undefined;
  const delaySeconds = animationDelay ? animationDelay / 1000 : 0;

  return (
    <motion.div
      className="relative h-full"
      initial={shouldAnimate ? widgetCardVariants.initial : false}
      animate={{
        ...widgetCardVariants.animate,
        scale: isDragging ? 1.02 : 1,
      }}
      exit={widgetCardVariants.exit}
      transition={{
        ...springConfigs.widget,
        delay: delaySeconds,
      }}
    >
      <motion.div
        className={`flex h-full flex-col divide-y divide-stone-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:divide-white/10 dark:bg-stone-900 dark:shadow-none dark:ring-white/10 ${className}`}
        animate={{
          boxShadow: isDragging
            ? "0 12px 40px -8px rgba(0,0,0,0.25), 0 0 0 2px oklch(0.62 0.075 242 / 0.3)"
            : "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
        }}
        transition={springConfigs.snappy}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
