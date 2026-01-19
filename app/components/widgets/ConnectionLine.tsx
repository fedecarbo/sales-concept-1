"use client";

import { useMemo } from "react";
import { DataPort, WidgetConnection, LayoutItem } from "@/app/types";

interface ConnectionLineProps {
  connection: WidgetConnection;
  layout: LayoutItem[];
  containerWidth: number;
  containerHeight: number;
  cols: number;
  rows: number;
}

const portColors: Record<DataPort, string> = {
  client: "#3b82f6",   // blue-500
  context: "#f59e0b",  // amber-500
  email: "#22c55e",    // green-500
  action: "#a855f7",   // purple-500
};

export function ConnectionLine({
  connection,
  layout,
  containerWidth,
  containerHeight,
  cols,
  rows,
}: ConnectionLineProps) {
  const path = useMemo(() => {
    const sourceLayout = layout.find((l) => l.i === connection.sourceWidgetId);
    const targetLayout = layout.find((l) => l.i === connection.targetWidgetId);

    if (!sourceLayout || !targetLayout) return null;

    const cellWidth = containerWidth / cols;
    const cellHeight = containerHeight / rows;

    // Calculate widget center positions
    const sourceX = (sourceLayout.x + sourceLayout.w) * cellWidth;
    const sourceY = (sourceLayout.y + sourceLayout.h / 2) * cellHeight;
    const targetX = sourceLayout.x * cellWidth;
    const targetY = (targetLayout.y + targetLayout.h / 2) * cellHeight;

    // Determine connection points based on relative positions
    const isTargetRight = targetLayout.x >= sourceLayout.x + sourceLayout.w;
    const isTargetLeft = targetLayout.x + targetLayout.w <= sourceLayout.x;
    const isTargetBelow = targetLayout.y >= sourceLayout.y + sourceLayout.h;

    let startX: number, startY: number, endX: number, endY: number;

    if (isTargetRight) {
      // Target is to the right
      startX = (sourceLayout.x + sourceLayout.w) * cellWidth;
      startY = (sourceLayout.y + sourceLayout.h / 2) * cellHeight;
      endX = targetLayout.x * cellWidth;
      endY = (targetLayout.y + targetLayout.h / 2) * cellHeight;
    } else if (isTargetLeft) {
      // Target is to the left
      startX = sourceLayout.x * cellWidth;
      startY = (sourceLayout.y + sourceLayout.h / 2) * cellHeight;
      endX = (targetLayout.x + targetLayout.w) * cellWidth;
      endY = (targetLayout.y + targetLayout.h / 2) * cellHeight;
    } else if (isTargetBelow) {
      // Target is below
      startX = (sourceLayout.x + sourceLayout.w / 2) * cellWidth;
      startY = (sourceLayout.y + sourceLayout.h) * cellHeight;
      endX = (targetLayout.x + targetLayout.w / 2) * cellWidth;
      endY = targetLayout.y * cellHeight;
    } else {
      // Target is above or overlapping - default to right edge
      startX = (sourceLayout.x + sourceLayout.w) * cellWidth;
      startY = (sourceLayout.y + sourceLayout.h / 2) * cellHeight;
      endX = targetLayout.x * cellWidth;
      endY = (targetLayout.y + targetLayout.h / 2) * cellHeight;
    }

    // Calculate control points for a smooth bezier curve
    const dx = endX - startX;
    const dy = endY - startY;
    const controlOffset = Math.min(Math.abs(dx) * 0.5, 80);

    const c1x = startX + controlOffset;
    const c1y = startY;
    const c2x = endX - controlOffset;
    const c2y = endY;

    return {
      d: `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`,
      startX,
      startY,
      endX,
      endY,
    };
  }, [connection, layout, containerWidth, containerHeight, cols, rows]);

  if (!path) return null;

  const color = portColors[connection.sourcePort];

  return (
    <g>
      {/* Connection line */}
      <path
        d={path.d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      {/* Animated dash overlay */}
      <path
        d={path.d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeDasharray="8 12"
        className="animate-dash"
      />
      {/* Start dot */}
      <circle
        cx={path.startX}
        cy={path.startY}
        r="4"
        fill={color}
        opacity="0.8"
      />
      {/* End dot */}
      <circle
        cx={path.endX}
        cy={path.endY}
        r="4"
        fill={color}
        opacity="0.8"
      />
    </g>
  );
}

interface ConnectionLayerProps {
  connections: WidgetConnection[];
  layout: LayoutItem[];
  containerWidth: number;
  containerHeight: number;
  cols: number;
  rows: number;
}

export function ConnectionLayer({
  connections,
  layout,
  containerWidth,
  containerHeight,
  cols,
  rows,
}: ConnectionLayerProps) {
  if (connections.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10"
      width={containerWidth}
      height={containerHeight}
      style={{ overflow: "visible" }}
    >
      <defs>
        <style>
          {`
            @keyframes dash {
              to {
                stroke-dashoffset: -20;
              }
            }
            .animate-dash {
              animation: dash 1s linear infinite;
            }
          `}
        </style>
      </defs>
      {connections.map((connection) => (
        <ConnectionLine
          key={connection.id}
          connection={connection}
          layout={layout}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          cols={cols}
          rows={rows}
        />
      ))}
    </svg>
  );
}
