"use client";

import { WidgetType } from "@/app/types";
import { ClientSelector } from "./types/ClientSelector";
import { ContextViewer } from "./types/ContextViewer";
import { EmailComposer } from "./types/EmailComposer";
import { EmailSender } from "./types/EmailSender";
import { ActivityFeed } from "./types/ActivityFeed";

interface WidgetRendererProps {
  widgetId: string;
  type: WidgetType;
  stepNumber?: number;
}

export function WidgetRenderer({ widgetId, type, stepNumber }: WidgetRendererProps) {
  switch (type) {
    case "client-selector":
      return <ClientSelector widgetId={widgetId} stepNumber={stepNumber} />;
    case "context-viewer":
      return <ContextViewer widgetId={widgetId} stepNumber={stepNumber} />;
    case "email-composer":
      return <EmailComposer widgetId={widgetId} stepNumber={stepNumber} />;
    case "email-sender":
      return <EmailSender widgetId={widgetId} stepNumber={stepNumber} />;
    case "activity-feed":
      return <ActivityFeed widgetId={widgetId} stepNumber={stepNumber} />;
    default:
      return (
        <div className="flex h-full items-center justify-center text-stone-400">
          Unknown widget type
        </div>
      );
  }
}
