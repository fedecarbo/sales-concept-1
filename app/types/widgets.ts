// Re-export types from react-grid-layout/legacy for compatibility
import type { LayoutItem as RGLLayoutItem, Layout as RGLLayout } from "react-grid-layout/legacy";
export type LayoutItem = RGLLayoutItem;
export type Layout = RGLLayout;

export type WidgetType = "generic";

export interface WidgetDefinition {
  type: WidgetType;
  label: string;
  description: string;
  icon: string;
  defaultSize: { w: number; h: number };
  minSize: { w: number; h: number };
}

export interface WidgetInstance {
  id: string;
  type: WidgetType;
}

export interface Page {
  id: string;
  name: string;
  layout: LayoutItem[];
  widgets: WidgetInstance[];
}

export interface Persona {
  id: string;
  name: string;
  initials: string;
  pages: Page[];
}
