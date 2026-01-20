"use client";

import { WidgetType } from "@/app/types";
import { GenericWidget } from "./types/GenericWidget";
import { getWidgetDefinition } from "@/app/lib/widgetRegistry";

interface WidgetRendererProps {
  widgetId: string;
  type: WidgetType;
  animationDelay?: number;
  isDragging?: boolean;
}

export function WidgetRenderer({
  widgetId,
  type,
  animationDelay,
  isDragging,
}: WidgetRendererProps) {
  const definition = getWidgetDefinition(type);

  return (
    <GenericWidget
      widgetId={widgetId}
      title={definition?.label ?? "Widget"}
      animationDelay={animationDelay}
      isDragging={isDragging}
    />
  );
}
