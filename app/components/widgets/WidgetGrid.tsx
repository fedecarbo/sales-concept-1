"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import GridLayout, { Layout, LayoutItem } from "react-grid-layout/legacy";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { WidgetInstance, WidgetConnection, WidgetType } from "@/app/types";
import { WidgetRenderer } from "./WidgetRenderer";
import { pageTemplates } from "@/app/lib/aiTemplates";
import { calculateWorkflowSteps } from "@/app/lib/workflowUtils";
import { SnapGuides, SnapGuide } from "./SnapGuides";

interface WidgetGridProps {
  className?: string;
  layout?: LayoutItem[];
  widgets?: WidgetInstance[];
  connections?: WidgetConnection[];
  pageId?: string;
  onApplyTemplate?: (
    widgets: WidgetInstance[],
    layout: LayoutItem[],
    connections: WidgetConnection[]
  ) => void;
  onRemoveWidget?: (widgetId: string) => void;
  onAddWidgetAtPosition?: (widgetType: WidgetType, x: number, y: number) => void;
  onLayoutChange?: (layout: LayoutItem[]) => void;
}

export function WidgetGrid({
  className = "",
  layout: propLayout,
  widgets: propWidgets,
  connections: propConnections = [],
  pageId,
  onApplyTemplate,
  onRemoveWidget,
  onAddWidgetAtPosition,
  onLayoutChange: onLayoutChangeProp,
}: WidgetGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
  const [layout, setLayout] = useState<LayoutItem[]>(propLayout || []);
  const [aiQuery, setAiQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Drag state for visual feedback
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [snapGuides, setSnapGuides] = useState<SnapGuide[]>([]);

  const cols = 12;
  const rows = 6;
  const margin: [number, number] = [12, 12];

  // Sync layout from props
  useEffect(() => {
    setLayout(propLayout || []);
  }, [propLayout]);

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

  // Cleanup animation timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  // Account for margins: total = rows * rowHeight + (rows - 1) * margin
  const rowHeight = Math.floor((dimensions.height - (rows - 1) * margin[1]) / rows);
  const cellWidth = (dimensions.width - (cols - 1) * margin[0]) / cols;

  // Calculate snap guides when dragging
  // Grid position to pixel: position * (cellSize + margin)
  const gridToPixelX = useCallback((gridX: number) => gridX * (cellWidth + margin[0]), [cellWidth, margin]);
  const gridToPixelY = useCallback((gridY: number) => gridY * (rowHeight + margin[1]), [rowHeight, margin]);

  const calculateSnapGuides = useCallback(
    (draggingItem: LayoutItem, currentLayout: LayoutItem[]): SnapGuide[] => {
      const guides: SnapGuide[] = [];
      const threshold = 0.5; // Grid units threshold for snapping

      const otherItems = currentLayout.filter((item) => item.i !== draggingItem.i);

      // Calculate dragging item edges
      const dragLeft = draggingItem.x;
      const dragRight = draggingItem.x + draggingItem.w;
      const dragTop = draggingItem.y;
      const dragBottom = draggingItem.y + draggingItem.h;
      const dragCenterX = draggingItem.x + draggingItem.w / 2;
      const dragCenterY = draggingItem.y + draggingItem.h / 2;

      for (const item of otherItems) {
        const itemLeft = item.x;
        const itemRight = item.x + item.w;
        const itemTop = item.y;
        const itemBottom = item.y + item.h;
        const itemCenterX = item.x + item.w / 2;
        const itemCenterY = item.y + item.h / 2;

        // Vertical guides (left/right edge alignment)
        if (Math.abs(dragLeft - itemLeft) < threshold) {
          guides.push({ type: "vertical", position: gridToPixelX(itemLeft), alignedWith: [item.i] });
        }
        if (Math.abs(dragRight - itemRight) < threshold) {
          guides.push({ type: "vertical", position: gridToPixelX(itemRight), alignedWith: [item.i] });
        }
        if (Math.abs(dragLeft - itemRight) < threshold) {
          guides.push({ type: "vertical", position: gridToPixelX(itemRight), alignedWith: [item.i] });
        }
        if (Math.abs(dragRight - itemLeft) < threshold) {
          guides.push({ type: "vertical", position: gridToPixelX(itemLeft), alignedWith: [item.i] });
        }
        // Center X alignment
        if (Math.abs(dragCenterX - itemCenterX) < threshold) {
          guides.push({ type: "vertical", position: gridToPixelX(itemCenterX), alignedWith: [item.i] });
        }

        // Horizontal guides (top/bottom edge alignment)
        if (Math.abs(dragTop - itemTop) < threshold) {
          guides.push({ type: "horizontal", position: gridToPixelY(itemTop), alignedWith: [item.i] });
        }
        if (Math.abs(dragBottom - itemBottom) < threshold) {
          guides.push({ type: "horizontal", position: gridToPixelY(itemBottom), alignedWith: [item.i] });
        }
        if (Math.abs(dragTop - itemBottom) < threshold) {
          guides.push({ type: "horizontal", position: gridToPixelY(itemBottom), alignedWith: [item.i] });
        }
        if (Math.abs(dragBottom - itemTop) < threshold) {
          guides.push({ type: "horizontal", position: gridToPixelY(itemTop), alignedWith: [item.i] });
        }
        // Center Y alignment
        if (Math.abs(dragCenterY - itemCenterY) < threshold) {
          guides.push({ type: "horizontal", position: gridToPixelY(itemCenterY), alignedWith: [item.i] });
        }
      }

      // Deduplicate guides by position (within 2px)
      const uniqueGuides: SnapGuide[] = [];
      for (const guide of guides) {
        const exists = uniqueGuides.some(
          (g) => g.type === guide.type && Math.abs(g.position - guide.position) < 2
        );
        if (!exists) {
          uniqueGuides.push(guide);
        }
      }

      return uniqueGuides;
    },
    [gridToPixelX, gridToPixelY]
  );

  // Drag event handlers
  const handleDragStart = useCallback(
    (_layout: Layout, _oldItem: LayoutItem | null, newItem: LayoutItem | null) => {
      if (newItem) setDraggingItemId(newItem.i);
    },
    []
  );

  const handleDrag = useCallback(
    (currentLayout: Layout, _oldItem: LayoutItem | null, newItem: LayoutItem | null) => {
      if (newItem) {
        const guides = calculateSnapGuides(newItem, [...currentLayout]);
        setSnapGuides(guides);
      }
    },
    [calculateSnapGuides]
  );

  const handleDragStop = useCallback(() => {
    setDraggingItemId(null);
    setSnapGuides([]);
  }, []);

  const onLayoutChange = useCallback((newLayout: Layout) => {
    // Convert readonly Layout to mutable array for state
    const mutableLayout = [...newLayout];
    setLayout(mutableLayout);
    // Propagate layout changes to parent
    onLayoutChangeProp?.(mutableLayout);
  }, [onLayoutChangeProp]);

  // Get widget type by layout item ID
  const getWidgetType = useCallback(
    (layoutId: string) => {
      const widget = propWidgets?.find((w) => w.id === layoutId);
      return widget?.type;
    },
    [propWidgets]
  );

  // Handle AI query submission
  const handleAiSubmit = async () => {
    if (!aiQuery.trim() || !onApplyTemplate) return;

    setIsThinking(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find matching template
    const normalizedQuery = aiQuery.toLowerCase();
    let matchedTemplate = pageTemplates.find((template) =>
      template.keywords.some((keyword) => normalizedQuery.includes(keyword))
    );

    // Default to email workflow if no match
    if (!matchedTemplate) {
      matchedTemplate = pageTemplates[0];
    }

    // Generate unique IDs for this page
    const widgetIdMap = new Map<string, string>();
    const widgets = matchedTemplate.widgets.map((w) => {
      const newId = `${pageId}-${w.id}`;
      widgetIdMap.set(w.id, newId);
      return { ...w, id: newId };
    });

    const newLayout = matchedTemplate.layout.map((l) => ({
      ...l,
      i: widgetIdMap.get(l.i) || l.i,
    }));

    const connections = matchedTemplate.connections.map((c) => ({
      ...c,
      id: `${pageId}-${c.id}`,
      sourceWidgetId: widgetIdMap.get(c.sourceWidgetId) || c.sourceWidgetId,
      targetWidgetId: widgetIdMap.get(c.targetWidgetId) || c.targetWidgetId,
    }));

    onApplyTemplate(widgets, newLayout, connections);
    setAiQuery("");
    setIsThinking(false);

    // Trigger staggered animation
    setIsAnimating(true);
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => setIsAnimating(false), 1500);
  };

  // Handle preset selection
  const handlePresetClick = (templateId: string) => {
    const template = pageTemplates.find((t) => t.id === templateId);
    if (!template || !onApplyTemplate) return;

    setIsThinking(true);

    setTimeout(() => {
      const widgetIdMap = new Map<string, string>();
      const widgets = template.widgets.map((w) => {
        const newId = `${pageId}-${w.id}`;
        widgetIdMap.set(w.id, newId);
        return { ...w, id: newId };
      });

      const newLayout = template.layout.map((l) => ({
        ...l,
        i: widgetIdMap.get(l.i) || l.i,
      }));

      const connections = template.connections.map((c) => ({
        ...c,
        id: `${pageId}-${c.id}`,
        sourceWidgetId: widgetIdMap.get(c.sourceWidgetId) || c.sourceWidgetId,
        targetWidgetId: widgetIdMap.get(c.targetWidgetId) || c.targetWidgetId,
      }));

      onApplyTemplate(widgets, newLayout, connections);
      setIsThinking(false);

      // Trigger staggered animation
      setIsAnimating(true);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = setTimeout(() => setIsAnimating(false), 1500);
    }, 600);
  };

  // Generate grid cell layout for background
  const gridCellLayout = useMemo(() => {
    const cells: LayoutItem[] = [];
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

  // Calculate workflow step numbers from connections
  const workflowSteps = useMemo(() => {
    const widgetIds = propWidgets?.map((w) => w.id) || [];
    return calculateWorkflowSteps(widgetIds, propConnections);
  }, [propWidgets, propConnections]);

  const isEmpty = layout.length === 0;

  return (
    <div ref={containerRef} className={`relative h-full w-full ${className}`}>
      {/* Background grid cells */}
      <div className="pointer-events-none absolute inset-0">
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
              className="rounded-xl border border-stone-200/40 dark:border-stone-700/40"
            />
          ))}
        </GridLayout>
      </div>

      {/* Empty state with AI input - positioned at bottom, z-20 but pointer-events-none */}
      {isEmpty && (
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end pb-8">
          <div className="pointer-events-auto flex flex-col items-center gap-5 text-center max-w-lg px-6 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm p-8 shadow-lg ring-1 ring-stone-200/50 dark:ring-stone-700/50">
            {/* AI sparkle icon */}
            <div className="relative">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40 flex items-center justify-center">
                <SparklesIcon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
              </div>
              {isThinking && (
                <div className="absolute inset-0 rounded-2xl border-2 border-primary-400 animate-ping opacity-50" />
              )}
            </div>

            <div>
              <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200">
                What do you want to do?
              </h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Describe your task and AI will set up the right widgets
              </p>
            </div>

            {/* AI Input */}
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAiSubmit();
                  }}
                  placeholder="e.g., I want to write emails to my clients"
                  disabled={isThinking}
                  className="w-full px-4 py-3 pr-12 text-sm bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500 disabled:opacity-50"
                />
                <button
                  onClick={handleAiSubmit}
                  disabled={!aiQuery.trim() || isThinking}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isThinking ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <SparklesIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick presets */}
            <div className="flex flex-wrap justify-center gap-2">
              {pageTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handlePresetClick(template.id)}
                  disabled={isThinking}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors disabled:opacity-50"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actual widgets - always rendered for drop support */}
      <div className="absolute inset-0 z-10">
        <GridLayout
          className="layout"
          style={{ minHeight: dimensions.height, height: "100%" }}
          layout={layout}
          cols={cols}
          rowHeight={rowHeight}
          width={dimensions.width}
          margin={margin}
          containerPadding={[0, 0]}
          onLayoutChange={onLayoutChange}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          draggableHandle=".widget-drag-handle"
          resizeHandles={["se"]}
          useCSSTransforms={true}
          compactType={null}
          preventCollision={true}
          isBounded={true}
          maxRows={rows}
          autoSize={false}
          isDroppable={true}
          droppingItem={{ i: "__dropping-elem__", x: 0, y: 0, w: 4, h: 4 }}
          onDrop={(_layout, layoutItem, event) => {
            if (!layoutItem) return;
            const widgetType = (event as DragEvent).dataTransfer?.getData("widgetType") as WidgetType;
            if (widgetType && onAddWidgetAtPosition) {
              onAddWidgetAtPosition(widgetType, layoutItem.x, layoutItem.y);
            }
          }}
        >
          {layout.map((item) => {
            const widgetType = getWidgetType(item.i);
            const stepNumber = workflowSteps.get(item.i);
            // Stagger animation delay based on step number (150ms per step)
            const animationDelay = isAnimating && stepNumber !== undefined
              ? (stepNumber - 1) * 150
              : undefined;
            return (
              <div key={item.i} className="group/widget relative">
                {widgetType ? (
                  <WidgetRenderer
                    widgetId={item.i}
                    type={widgetType}
                    stepNumber={stepNumber}
                    animationDelay={animationDelay}
                    isDragging={draggingItemId === item.i}
                  />
                ) : (
                  <div className="h-full rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <span className="text-sm text-stone-400">Unknown widget</span>
                  </div>
                )}
                {/* Remove widget button - appears on hover */}
                {onRemoveWidget && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveWidget(item.i);
                    }}
                    className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-white opacity-0 shadow-lg transition-opacity hover:bg-red-600 group-hover/widget:opacity-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-red-500 dark:hover:text-white"
                    aria-label="Remove widget"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </GridLayout>

        {/* Snap guides overlay */}
        <SnapGuides
          guides={snapGuides}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
}
