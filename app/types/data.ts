export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  role?: string;
  phone?: string;
  avatar?: string;
  tags?: string[];
}

export interface Interaction {
  id: string;
  type: "email" | "call" | "meeting" | "slack" | "note";
  date: string;
  summary: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export interface Deal {
  id: string;
  name: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
  probability: number;
}

export interface ClientContext {
  client: Client;
  recentInteractions: Interaction[];
  deals: Deal[];
  notes: string[];
  lastContact?: string;
}

export interface EmailDraft {
  id: string;
  to: string;
  toName: string;
  subject: string;
  body: string;
  status: "draft" | "ready" | "sent";
}
