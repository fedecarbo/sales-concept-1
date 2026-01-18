"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Client, ClientContext as ClientContextType, EmailDraft } from "@/app/types";
import { mockClients, getClientContext } from "@/app/data/mockData";

interface WidgetState {
  selectedClient: Client | null;
  clientContext: ClientContextType | null;
  emailDraft: EmailDraft | null;
}

interface WidgetActions {
  selectClient: (client: Client | null) => void;
  updateEmailDraft: (draft: Partial<EmailDraft> | null) => void;
  sendEmail: () => void;
  resetEmail: () => void;
}

interface WidgetContextValue {
  state: WidgetState;
  actions: WidgetActions;
  clients: Client[];
}

const WidgetContext = createContext<WidgetContextValue | null>(null);

export function WidgetProvider({ children }: { children: ReactNode }) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientContext, setClientContext] = useState<ClientContextType | null>(null);
  const [emailDraft, setEmailDraft] = useState<EmailDraft | null>(null);

  const selectClient = useCallback((client: Client | null) => {
    setSelectedClient(client);
    if (client) {
      const context = getClientContext(client.id);
      setClientContext(context);
      // Pre-fill email draft with client info
      setEmailDraft({
        id: `draft-${Date.now()}`,
        to: client.email,
        toName: client.name,
        subject: "",
        body: "",
        status: "draft",
      });
    } else {
      setClientContext(null);
      setEmailDraft(null);
    }
  }, []);

  const updateEmailDraft = useCallback((draft: Partial<EmailDraft> | null) => {
    if (draft === null) {
      setEmailDraft(null);
    } else {
      setEmailDraft((prev) => {
        if (!prev) return null;
        return { ...prev, ...draft };
      });
    }
  }, []);

  const sendEmail = useCallback(() => {
    setEmailDraft((prev) => {
      if (!prev) return null;
      return { ...prev, status: "sent" };
    });
  }, []);

  const resetEmail = useCallback(() => {
    if (selectedClient) {
      setEmailDraft({
        id: `draft-${Date.now()}`,
        to: selectedClient.email,
        toName: selectedClient.name,
        subject: "",
        body: "",
        status: "draft",
      });
    }
  }, [selectedClient]);

  const value: WidgetContextValue = {
    state: {
      selectedClient,
      clientContext,
      emailDraft,
    },
    actions: {
      selectClient,
      updateEmailDraft,
      sendEmail,
      resetEmail,
    },
    clients: mockClients,
  };

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
