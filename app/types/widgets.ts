// Re-export types from react-grid-layout/legacy for compatibility
import type { LayoutItem as RGLLayoutItem, Layout as RGLLayout } from "react-grid-layout/legacy";
export type LayoutItem = RGLLayoutItem;
export type Layout = RGLLayout;

export type WidgetType =
  | "client-selector"
  | "context-viewer"
  | "email-composer"
  | "email-sender"
  | "activity-feed"
  | "ai-canvas";

export type DataPort = "client" | "context" | "email" | "action";

export interface WidgetDefinition {
  type: WidgetType;
  label: string;
  description: string;
  icon: string;
  inputs: DataPort[];
  outputs: DataPort[];
  defaultSize: { w: number; h: number };
  minSize: { w: number; h: number };
}

export interface WidgetInstance {
  id: string;
  type: WidgetType;
}

export interface WidgetConnection {
  id: string;
  sourceWidgetId: string;
  sourcePort: DataPort;
  targetWidgetId: string;
  targetPort: DataPort;
}

export interface Page {
  id: string;
  name: string;
  layout: LayoutItem[];
  widgets: WidgetInstance[];
  connections: WidgetConnection[];
}

export interface Persona {
  id: string;
  name: string;
  initials: string;
  pages: Page[];
}
