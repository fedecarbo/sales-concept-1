import { WidgetInstance, WidgetConnection, Page, LayoutItem } from "@/app/types";

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  widgets: WidgetInstance[];
  layout: LayoutItem[];
  connections: WidgetConnection[];
}

export const pageTemplates: PageTemplate[] = [
  {
    id: "email-workflow",
    name: "Email Workflow",
    description: "Select a client, review their context, compose an AI-assisted email, and send",
    keywords: ["email", "write", "send", "message", "reach out", "contact", "outreach"],
    widgets: [
      { id: "w1", type: "client-selector" },
      { id: "w2", type: "context-viewer" },
      { id: "w3", type: "email-composer" },
      { id: "w4", type: "email-sender" },
    ],
    layout: [
      { i: "w1", x: 0, y: 0, w: 3, h: 4, minW: 2, minH: 2 },
      { i: "w2", x: 3, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
      { i: "w3", x: 7, y: 0, w: 5, h: 4, minW: 4, minH: 2 },
      { i: "w4", x: 3, y: 2, w: 4, h: 2, minW: 3, minH: 2 },
    ],
    connections: [
      { id: "c1", sourceWidgetId: "w1", sourcePort: "client", targetWidgetId: "w2", targetPort: "client" },
      { id: "c2", sourceWidgetId: "w1", sourcePort: "client", targetWidgetId: "w3", targetPort: "client" },
      { id: "c3", sourceWidgetId: "w2", sourcePort: "context", targetWidgetId: "w3", targetPort: "context" },
      { id: "c4", sourceWidgetId: "w3", sourcePort: "email", targetWidgetId: "w4", targetPort: "email" },
    ],
  },
  {
    id: "client-review",
    name: "Client Review",
    description: "Deep dive into a client's history, deals, and recent activity",
    keywords: ["review", "client", "history", "activity", "deals", "research"],
    widgets: [
      { id: "w1", type: "client-selector" },
      { id: "w2", type: "context-viewer" },
      { id: "w3", type: "activity-feed" },
    ],
    layout: [
      { i: "w1", x: 0, y: 0, w: 3, h: 4, minW: 2, minH: 2 },
      { i: "w2", x: 3, y: 0, w: 5, h: 4, minW: 3, minH: 2 },
      { i: "w3", x: 8, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
    ],
    connections: [
      { id: "c1", sourceWidgetId: "w1", sourcePort: "client", targetWidgetId: "w2", targetPort: "client" },
      { id: "c2", sourceWidgetId: "w1", sourcePort: "client", targetWidgetId: "w3", targetPort: "client" },
    ],
  },
  {
    id: "activity-overview",
    name: "Activity Overview",
    description: "Monitor all recent interactions and activity across your accounts",
    keywords: ["activity", "feed", "monitor", "interactions", "updates"],
    widgets: [
      { id: "w1", type: "activity-feed" },
    ],
    layout: [
      { i: "w1", x: 0, y: 0, w: 12, h: 4, minW: 4, minH: 2 },
    ],
    connections: [],
  },
];

export function matchTemplate(query: string): PageTemplate | null {
  const normalizedQuery = query.toLowerCase();

  for (const template of pageTemplates) {
    for (const keyword of template.keywords) {
      if (normalizedQuery.includes(keyword)) {
        return template;
      }
    }
  }

  return null;
}

export function applyTemplate(template: PageTemplate, pageId: string): Partial<Page> {
  // Generate unique IDs based on page ID
  const widgetIdMap = new Map<string, string>();

  const widgets = template.widgets.map((w) => {
    const newId = `${pageId}-${w.id}`;
    widgetIdMap.set(w.id, newId);
    return { ...w, id: newId };
  });

  const layout = template.layout.map((l) => ({
    ...l,
    i: widgetIdMap.get(l.i) || l.i,
  }));

  const connections = template.connections.map((c) => ({
    ...c,
    id: `${pageId}-${c.id}`,
    sourceWidgetId: widgetIdMap.get(c.sourceWidgetId) || c.sourceWidgetId,
    targetWidgetId: widgetIdMap.get(c.targetWidgetId) || c.targetWidgetId,
  }));

  return {
    layout,
    widgets,
    connections,
  };
}
