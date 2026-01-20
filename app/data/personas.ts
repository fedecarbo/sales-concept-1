import { Persona, Page } from "@/app/types";

// FC (Fede Carbo) - Default user with empty workspace
const fcPages: Page[] = [
  {
    id: "fc-page-1",
    name: "Overview",
    layout: [],
    widgets: [],
  },
];

// Jo Oliveira - Sales persona with pre-configured workspace
const joPages: Page[] = [
  {
    id: "jo-page-1",
    name: "Dashboard",
    layout: [
      { i: "jo-page-1-w1", x: 0, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
      { i: "jo-page-1-w2", x: 4, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
      { i: "jo-page-1-w3", x: 8, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
    ],
    widgets: [
      { id: "jo-page-1-w1", type: "generic" },
      { id: "jo-page-1-w2", type: "generic" },
      { id: "jo-page-1-w3", type: "generic" },
    ],
  },
  {
    id: "jo-page-2",
    name: "Workspace",
    layout: [
      { i: "jo-page-2-w1", x: 0, y: 0, w: 6, h: 4, minW: 2, minH: 2 },
      { i: "jo-page-2-w2", x: 6, y: 0, w: 6, h: 4, minW: 2, minH: 2 },
    ],
    widgets: [
      { id: "jo-page-2-w1", type: "generic" },
      { id: "jo-page-2-w2", type: "generic" },
    ],
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
