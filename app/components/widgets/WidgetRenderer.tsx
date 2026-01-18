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
  animationDelay?: number;
}

export function WidgetRenderer({ widgetId, type, stepNumber, animationDelay }: WidgetRendererProps) {
  switch (type) {
    case "client-selector":
      return <ClientSelector widgetId={widgetId} stepNumber={stepNumber} animationDelay={animationDelay} />;
    case "context-viewer":
      return <ContextViewer widgetId={widgetId} stepNumber={stepNumber} animationDelay={animationDelay} />;
    case "email-composer":
      return <EmailComposer widgetId={widgetId} stepNumber={stepNumber} animationDelay={animationDelay} />;
    case "email-sender":
      return <EmailSender widgetId={widgetId} stepNumber={stepNumber} animationDelay={animationDelay} />;
    case "activity-feed":
      return <ActivityFeed widgetId={widgetId} stepNumber={stepNumber} animationDelay={animationDelay} />;
    default:
      return (
        <div className="flex h-full items-center justify-center text-stone-400">
          Unknown widget type
        </div>
      );
  }
}
