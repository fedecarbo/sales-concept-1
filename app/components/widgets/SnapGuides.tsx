"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface SnapGuide {
  type: "vertical" | "horizontal";
  position: number; // pixel position
  alignedWith: string[]; // widget IDs
}

interface SnapGuidesProps {
  guides: SnapGuide[];
  width: number;
  height: number;
}

export function SnapGuides({ guides, width, height }: SnapGuidesProps) {
  if (guides.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-50"
      width={width}
      height={height}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Glow filter for the guides */}
        <filter id="snapGuideGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <AnimatePresence>
        {guides.map((guide, index) => {
          const key = `${guide.type}-${Math.round(guide.position)}-${index}`;

          if (guide.type === "vertical") {
            return (
              <motion.line
                key={key}
                x1={guide.position}
                y1={0}
                x2={guide.position}
                y2={height}
                stroke="oklch(0.62 0.075 242)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.8, pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                filter="url(#snapGuideGlow)"
              />
            );
          } else {
            return (
              <motion.line
                key={key}
                x1={0}
                y1={guide.position}
                x2={width}
                y2={guide.position}
                stroke="oklch(0.62 0.075 242)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.8, pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                filter="url(#snapGuideGlow)"
              />
            );
          }
        })}
      </AnimatePresence>
    </svg>
  );
}
