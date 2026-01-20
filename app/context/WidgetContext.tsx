"use client";

import { createContext, useContext, ReactNode } from "react";

interface WidgetContextValue {
  // Placeholder for future widget state
}

const WidgetContext = createContext<WidgetContextValue | null>(null);

export function WidgetProvider({ children }: { children: ReactNode }) {
  const value: WidgetContextValue = {};

  return (
    <WidgetContext.Provider value={value}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidget() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  return context;
}
