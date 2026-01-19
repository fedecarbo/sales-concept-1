import { Persona, Page } from "@/app/types";

// FC (Fede Carbo) - Default user with empty workspace
const fcPages: Page[] = [
  {
    id: "fc-page-1",
    name: "Overview",
    layout: [],
    widgets: [],
    connections: [],
  },
];

// Jo Oliveira - Sales persona with pre-configured workspace
const joPages: Page[] = [
  // Page 1: Account Research
  {
    id: "jo-page-1",
    name: "Account Research",
    layout: [
      { i: "jo-page-1-w1", x: 0, y: 0, w: 3, h: 3, minW: 2, minH: 2 },
      { i: "jo-page-1-w2", x: 0, y: 3, w: 4, h: 3, minW: 3, minH: 2 },
      { i: "jo-page-1-w3", x: 4, y: 0, w: 5, h: 6, minW: 3, minH: 3 },
    ],
    widgets: [
      { id: "jo-page-1-w1", type: "client-selector" },
      { id: "jo-page-1-w2", type: "context-viewer" },
      { id: "jo-page-1-w3", type: "activity-feed" },
    ],
    connections: [
      {
        id: "jo-page-1-c1",
        sourceWidgetId: "jo-page-1-w1",
        sourcePort: "client",
        targetWidgetId: "jo-page-1-w2",
        targetPort: "client",
      },
      {
        id: "jo-page-1-c2",
        sourceWidgetId: "jo-page-1-w1",
        sourcePort: "client",
        targetWidgetId: "jo-page-1-w3",
        targetPort: "client",
      },
    ],
  },
  // Page 2: Outreach
  {
    id: "jo-page-2",
    name: "Outreach",
    layout: [
      { i: "jo-page-2-w1", x: 0, y: 0, w: 3, h: 5, minW: 2, minH: 2 },
      { i: "jo-page-2-w2", x: 3, y: 0, w: 6, h: 4, minW: 4, minH: 2 },
      { i: "jo-page-2-w3", x: 3, y: 4, w: 6, h: 2, minW: 3, minH: 2 },
    ],
    widgets: [
      { id: "jo-page-2-w1", type: "client-selector" },
      { id: "jo-page-2-w2", type: "email-composer" },
      { id: "jo-page-2-w3", type: "email-sender" },
    ],
    connections: [
      {
        id: "jo-page-2-c1",
        sourceWidgetId: "jo-page-2-w1",
        sourcePort: "client",
        targetWidgetId: "jo-page-2-w2",
        targetPort: "client",
      },
      {
        id: "jo-page-2-c2",
        sourceWidgetId: "jo-page-2-w2",
        sourcePort: "email",
        targetWidgetId: "jo-page-2-w3",
        targetPort: "email",
      },
    ],
  },
  // Page 3: Company Insights
  {
    id: "jo-page-3",
    name: "Company Insights",
    layout: [
      { i: "jo-page-3-w1", x: 0, y: 0, w: 9, h: 6, minW: 4, minH: 3 },
    ],
    widgets: [
      { id: "jo-page-3-w1", type: "ai-canvas" },
    ],
    connections: [],
  },
];

export const fcPersona: Persona = {
  id: "fc",
  name: "Fede Carbo",
  initials: "FC",
  pages: fcPages,
};

export const joPersona: Persona = {
  id: "jo",
  name: "Jo Oliveira",
  initials: "JO",
  pages: joPages,
};

export const personas: Persona[] = [fcPersona, joPersona];

export function getPersonaById(id: string): Persona | undefined {
  return personas.find((p) => p.id === id);
}
