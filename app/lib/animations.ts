import type { Transition } from "framer-motion";

/**
 * Spring animation configurations for the grid system.
 * Uses physics-based springs for natural motion.
 */

// Spring presets for different use cases
export const springConfigs = {
  // Snappy UI interactions (buttons, toggles)
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 30,
  } as Transition,

  // Widget appearance and general movement
  widget: {
    type: "spring",
    stiffness: 300,
    damping: 25,
  } as Transition,

  // Bouncy feedback (drop, snap)
  bouncy: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  } as Transition,

  // Gentle transitions (hover, fade)
  gentle: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 1.2,
  } as Transition,

  // Quick micro-interactions
  micro: {
    type: "spring",
    stiffness: 500,
    damping: 35,
  } as Transition,
} as const;

// Animation variants for widget cards
export const widgetCardVariants = {
  initial: {
    opacity: 0,
    scale: 0.85,
    y: 12,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -8,
  },
  dragging: {
    scale: 1.02,
    boxShadow: "0 12px 40px -8px rgba(0,0,0,0.25), 0 0 0 2px oklch(0.62 0.075 242 / 0.3)",
  },
};

// Drop zone animation variants
export const dropZoneVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: springConfigs.snappy,
  },
  valid: {
    backgroundColor: "oklch(0.62 0.075 242 / 0.1)",
    borderColor: "oklch(0.62 0.075 242 / 0.5)",
  },
  invalid: {
    backgroundColor: "oklch(0.65 0.15 25 / 0.1)",
    borderColor: "oklch(0.65 0.15 25 / 0.4)",
  },
  hover: {
    backgroundColor: "oklch(0.62 0.075 242 / 0.2)",
    borderColor: "oklch(0.62 0.075 242)",
    scale: 1.01,
  },
};

// Snap guide animation
export const snapGuideVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      opacity: { duration: 0.1 },
      pathLength: { duration: 0.2 },
    },
  },
};
