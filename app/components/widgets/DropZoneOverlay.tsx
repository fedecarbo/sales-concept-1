"use client";

import { motion, AnimatePresence } from "framer-motion";
import { springConfigs } from "@/app/lib/animations";
import { LayoutItem } from "@/app/types";

interface DropZoneOverlayProps {
  isVisible: boolean;
  layout: LayoutItem[];
  cols: number;
  rows: number;
  cellWidth: number;
  rowHeight: number;
  droppingItemSize?: { w: number; h: number };
}

interface CellState {
  x: number;
  y: number;
  valid: boolean;
}

function getOccupiedCells(layout: LayoutItem[]): Set<string> {
  const occupied = new Set<string>();
  for (const item of layout) {
    for (let x = item.x; x < item.x + item.w; x++) {
      for (let y = item.y; y < item.y + item.h; y++) {
        occupied.add(`${x}-${y}`);
      }
    }
  }
  return occupied;
}

function canPlaceWidget(
  x: number,
  y: number,
  w: number,
  h: number,
  cols: number,
  rows: number,
  occupied: Set<string>
): boolean {
  // Check bounds
  if (x + w > cols || y + h > rows) return false;

  // Check collision
  for (let dx = 0; dx < w; dx++) {
    for (let dy = 0; dy < h; dy++) {
      if (occupied.has(`${x + dx}-${y + dy}`)) {
        return false;
      }
    }
  }
  return true;
}

export function DropZoneOverlay({
  isVisible,
  layout,
  cols,
  rows,
  cellWidth,
  rowHeight,
  droppingItemSize = { w: 4, h: 4 },
}: DropZoneOverlayProps) {
  if (!isVisible) return null;

  const occupied = getOccupiedCells(layout);
  const cells: CellState[] = [];

  // Generate all grid cells and determine validity
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const isOccupied = occupied.has(`${x}-${y}`);
      const canPlace = canPlaceWidget(
        x,
        y,
        droppingItemSize.w,
        droppingItemSize.h,
        cols,
        rows,
        occupied
      );

      cells.push({
        x,
        y,
        valid: !isOccupied && canPlace,
      });
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="pointer-events-none absolute inset-0 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {cells.map((cell) => (
          <motion.div
            key={`drop-${cell.x}-${cell.y}`}
            className={`absolute rounded-2xl border-2 border-dashed transition-colors ${
              cell.valid
                ? "border-primary-400/40 bg-primary-500/5"
                : "border-transparent bg-transparent"
            }`}
            style={{
              left: cell.x * cellWidth,
              top: cell.y * rowHeight,
              width: cellWidth,
              height: rowHeight,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: cell.valid ? 1 : 0,
              scale: 1,
            }}
            transition={springConfigs.micro}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
