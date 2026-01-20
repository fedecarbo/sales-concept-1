import { WidgetDefinition, WidgetType } from "@/app/types";

export const widgetRegistry: Record<WidgetType, WidgetDefinition> = {
  generic: {
    type: "generic",
    label: "Widget",
    description: "A generic widget shell",
    icon: "Squares2X2Icon",
    defaultSize: { w: 3, h: 3 },
    minSize: { w: 2, h: 2 },
  },
};

export function getWidgetDefinition(type: WidgetType): WidgetDefinition {
  return widgetRegistry[type];
}
