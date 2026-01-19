import { WidgetDefinition, WidgetType } from "@/app/types";

export const widgetRegistry: Record<WidgetType, WidgetDefinition> = {
  "client-selector": {
    type: "client-selector",
    label: "Client Selector",
    description: "Search and select clients from your CRM",
    icon: "UserGroupIcon",
    inputs: [],
    outputs: ["client"],
    defaultSize: { w: 3, h: 5 },
    minSize: { w: 2, h: 3 },
  },
  "context-viewer": {
    type: "context-viewer",
    label: "Client Context",
    description: "View background information and history",
    icon: "DocumentTextIcon",
    inputs: ["client"],
    outputs: ["context"],
    defaultSize: { w: 4, h: 3 },
    minSize: { w: 3, h: 2 },
  },
  "email-composer": {
    type: "email-composer",
    label: "AI Email Composer",
    description: "Draft emails with AI assistance",
    icon: "EnvelopeIcon",
    inputs: ["client", "context"],
    outputs: ["email"],
    defaultSize: { w: 5, h: 5 },
    minSize: { w: 4, h: 4 },
  },
  "email-sender": {
    type: "email-sender",
    label: "Send Email",
    description: "Review and send composed emails",
    icon: "PaperAirplaneIcon",
    inputs: ["email"],
    outputs: ["action"],
    defaultSize: { w: 4, h: 2 },
    minSize: { w: 3, h: 2 },
  },
  "activity-feed": {
    type: "activity-feed",
    label: "Activity Feed",
    description: "Recent interactions across channels",
    icon: "BellIcon",
    inputs: ["client"],
    outputs: [],
    defaultSize: { w: 3, h: 4 },
    minSize: { w: 2, h: 3 },
  },
  "ai-canvas": {
    type: "ai-canvas",
    label: "AI Canvas",
    description: "A blank canvas - ask AI to display anything",
    icon: "SparklesIcon",
    inputs: [],
    outputs: [],
    defaultSize: { w: 4, h: 4 },
    minSize: { w: 2, h: 3 },
  },
};

export function getWidgetDefinition(type: WidgetType): WidgetDefinition {
  return widgetRegistry[type];
}
