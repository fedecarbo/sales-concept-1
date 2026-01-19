"use client";

import { WidgetType } from "@/app/types";
import { ClientSelector } from "./types/ClientSelector";
import { ContextViewer } from "./types/ContextViewer";
import { EmailComposer } from "./types/EmailComposer";
import { EmailSender } from "./types/EmailSender";
import { ActivityFeed } from "./types/ActivityFeed";
import { AICanvas } from "./types/AICanvas";

interface WidgetRendererProps {
  widgetId: string;
  type: WidgetType;
  stepNumber?: number;
  animationDelay?: number;
  isDragging?: boolean;
}

export function WidgetRenderer({ widgetId, type, stepNumber, animationDelay, isDragging }: WidgetRendererProps) {
  const commonProps = { widgetId, stepNumber, animationDelay, isDragging };

  switch (type) {
    case "client-selector":
      return <ClientSelector {...commonProps} />;
    case "context-viewer":
      return <ContextViewer {...commonProps} />;
    case "email-composer":
      return <EmailComposer {...commonProps} />;
    case "email-sender":
      return <EmailSender {...commonProps} />;
    case "activity-feed":
      return <ActivityFeed {...commonProps} />;
    case "ai-canvas":
      return <AICanvas {...commonProps} />;
    default:
      return (
        <div className="flex h-full items-center justify-center text-stone-400">
          Unknown widget type
        </div>
      );
  }
}
