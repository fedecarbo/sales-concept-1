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
}

const initialLayout: Layout[] = [
  { i: "dashboard", x: 0, y: 0, w: 6, h: 6, minW: 2, minH: 2 },
  { i: "analytics", x: 6, y: 0, w: 6, h: 3, minW: 2, minH: 2 },
  { i: "stats", x: 6, y: 3, w: 3, h: 3, minW: 2, minH: 2 },
  { i: "activity", x: 9, y: 3, w: 3, h: 3, minW: 2, minH: 2 },
];

export function WidgetGrid({ className = "" }: WidgetGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [containerHeight, setContainerHeight] = useState(600);
  const [layout, setLayout] = useState<Layout[]>(initialLayout);

  const cols = 12;
  const margin: [number, number] = [0, 0];

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Calculate column width based on container width
  const colWidth = (containerWidth - margin[0] * (cols - 1)) / cols;

  // Use square cells: row height equals column width
  const rowHeight = colWidth;

  // Calculate rows based on widget layout (max y + h) or minimum container fit
  const layoutMaxRow = layout.reduce((max, item) => Math.max(max, item.y + item.h), 0);
  const containerRows = Math.max(1, Math.floor((containerHeight + margin[1]) / (rowHeight + margin[1])));
  const rows = Math.max(layoutMaxRow, containerRows);

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

    switch (id) {
      case "dashboard":
        return (
          <>
            <WidgetHeader
              title="Dashboard"
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
      case "analytics":
        return (
          <>
            <WidgetHeader
              title="Analytics"
              subtitle="Real-time data"
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
      case "stats":
        return (
          <>
            <WidgetHeader
              title="Stats"
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
      case "activity":
        return (
          <>
            <WidgetHeader
              title="Activity"
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
      default:
        return null;
    }
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
          width={containerWidth}
          margin={margin}
          containerPadding={[0, 0]}
          isDraggable={false}
          isResizable={false}
          useCSSTransforms={true}
        >
          {gridCellLayout.map((cell) => (
            <div
              key={cell.i}
              className="border border-zinc-200/50 dark:border-zinc-700/50"
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
        width={containerWidth}
        margin={margin}
        containerPadding={[0, 0]}
        onLayoutChange={onLayoutChange}
        draggableHandle=".widget-drag-handle"
        resizeHandles={["se", "sw", "ne", "nw", "e", "w", "n", "s"]}
        useCSSTransforms={true}
        compactType="vertical"
        preventCollision={false}
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
