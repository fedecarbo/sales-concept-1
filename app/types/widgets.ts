import { Layout } from "react-grid-layout";

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
  layout: Layout[];
  widgets: WidgetInstance[];
  connections: WidgetConnection[];
}
