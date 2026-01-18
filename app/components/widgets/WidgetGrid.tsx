"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { WidgetCard } from "./WidgetCard";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetFooter } from "./WidgetFooter";
import { CircleButton } from "../ui";
import {
  PlusIcon,
  StarIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";

interface WidgetGridProps {
  className?: string;
  layout?: Layout[];
  pageId?: string;
}

const defaultLayout: Layout[] = [
  { i: "dashboard", x: 0, y: 0, w: 6, h: 5, minW: 2, minH: 2 },
  { i: "analytics", x: 6, y: 0, w: 6, h: 2, minW: 2, minH: 2 },
  { i: "stats", x: 6, y: 2, w: 3, h: 3, minW: 2, minH: 2 },
  { i: "activity", x: 9, y: 2, w: 3, h: 3, minW: 2, minH: 2 },
];

// Widget titles for each type
const widgetTitles: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  stats: "Stats",
  activity: "Activity",
  reports: "Reports",
  trends: "Trends",
  forecast: "Forecast",
  pipeline: "Pipeline",
  leaderboard: "Leaderboard",
  targets: "Targets",
  meetings: "Meetings",
  tasks: "Tasks",
};

export function WidgetGrid({ className = "", layout: propLayout, pageId }: WidgetGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
  const [layout, setLayout] = useState<Layout[]>(propLayout || defaultLayout);

  const cols = 12;
  const rows = 6;
  const margin: [number, number] = [0, 0];

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Row height calculated from container height to fill available space
  const rowHeight = Math.floor(dimensions.height / rows);

  const onLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
  }, []);

  const renderWidgetContent = (id: string) => {
    const placeholderContent = (
      <div
        className="h-full w-full rounded border border-dashed border-zinc-300 dark:border-zinc-600"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(161,161,170,0.1) 8px, rgba(161,161,170,0.1) 16px)",
        }}
      />
    );

    // Get title from map or capitalize the id
    const title = widgetTitles[id] || id.charAt(0).toUpperCase() + id.slice(1);

    return (
      <>
        <WidgetHeader
          title={title}
          action={
            <CircleButton
              variant="ghost"
              icon={EllipsisHorizontalIcon}
              label="Options"
              size="sm"
            />
          }
        />
        <div className="flex-1 overflow-hidden p-4">{placeholderContent}</div>
        <WidgetFooter>
          <CircleButton variant="soft" icon={PlusIcon} label="Add" />
          <CircleButton variant="soft-gray" icon={StarIcon} label="Favorite" />
          <CircleButton
            variant="soft-gray"
            icon={EllipsisHorizontalIcon}
            label="More"
          />
        </WidgetFooter>
      </>
    );
  };

  // Generate grid cell layout for background (memoized)
  const gridCellLayout = useMemo(() => {
    const cells: Layout[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        cells.push({
          i: `cell-${row}-${col}`,
          x: col,
          y: row,
          w: 1,
          h: 1,
          static: true,
        });
      }
    }
    return cells;
  }, [rows, cols]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${className}`}
    >
      {/* Background grid cells - wrapped in absolute container */}
      <div className="pointer-events-none absolute top-0 left-0 w-full">
        <GridLayout
          className="layout"
          layout={gridCellLayout}
          cols={cols}
          rowHeight={rowHeight}
          width={dimensions.width}
          margin={margin}
          containerPadding={[0, 0]}
          isDraggable={false}
          isResizable={false}
          useCSSTransforms={true}
        >
          {gridCellLayout.map((cell) => (
            <div
              key={cell.i}
              className="rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50"
            />
          ))}
        </GridLayout>
      </div>

      {/* Actual widgets */}
      <GridLayout
        className="layout"
        layout={layout}
        cols={cols}
        rowHeight={rowHeight}
        width={dimensions.width}
        margin={margin}
        containerPadding={[0, 0]}
        onLayoutChange={onLayoutChange}
        draggableHandle=".widget-drag-handle"
        resizeHandles={["se", "sw", "ne", "nw", "e", "w", "n", "s"]}
        useCSSTransforms={true}
        compactType={null}
        preventCollision={true}
        isBounded={true}
        maxRows={rows}
        autoSize={false}
      >
        {layout.map((item) => (
          <div key={item.i}>
            <WidgetCard className="h-full">
              {renderWidgetContent(item.i)}
            </WidgetCard>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
