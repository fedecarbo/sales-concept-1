import { WidgetInstance, Page, LayoutItem } from "@/app/types";

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  widgets: WidgetInstance[];
  layout: LayoutItem[];
}

export const pageTemplates: PageTemplate[] = [
  {
    id: "two-column",
    name: "Two Column Layout",
    description: "A simple two-column grid layout",
    keywords: ["two", "column", "side", "split"],
    widgets: [
      { id: "w1", type: "generic" },
      { id: "w2", type: "generic" },
    ],
    layout: [
      { i: "w1", x: 0, y: 0, w: 6, h: 4, minW: 2, minH: 2 },
      { i: "w2", x: 6, y: 0, w: 6, h: 4, minW: 2, minH: 2 },
    ],
  },
  {
    id: "three-column",
    name: "Three Column Layout",
    description: "A balanced three-column grid layout",
    keywords: ["three", "column", "grid", "triple"],
    widgets: [
      { id: "w1", type: "generic" },
      { id: "w2", type: "generic" },
      { id: "w3", type: "generic" },
    ],
    layout: [
      { i: "w1", x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
      { i: "w2", x: 4, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
      { i: "w3", x: 8, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard Layout",
    description: "A dashboard with multiple widget sizes",
    keywords: ["dashboard", "overview", "monitor"],
    widgets: [
      { id: "w1", type: "generic" },
      { id: "w2", type: "generic" },
      { id: "w3", type: "generic" },
      { id: "w4", type: "generic" },
    ],
    layout: [
      { i: "w1", x: 0, y: 0, w: 8, h: 3, minW: 2, minH: 2 },
      { i: "w2", x: 8, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
      { i: "w3", x: 0, y: 3, w: 4, h: 3, minW: 2, minH: 2 },
      { i: "w4", x: 4, y: 3, w: 8, h: 3, minW: 2, minH: 2 },
    ],
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

  return {
    layout,
    widgets,
  };
}
