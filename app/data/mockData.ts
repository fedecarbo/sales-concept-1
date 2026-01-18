import { Client, ClientContext, Interaction, Deal } from "@/app/types";

export const mockClients: Client[] = [
  {
    id: "client-1",
    name: "Sarah Chen",
    email: "sarah.chen@techcorp.io",
    company: "TechCorp",
    role: "VP of Engineering",
    phone: "+1 (415) 555-0123",
    tags: ["enterprise", "high-priority"],
  },
  {
    id: "client-2",
    name: "Marcus Johnson",
    email: "m.johnson@growthly.com",
    company: "Growthly",
    role: "Head of Product",
    phone: "+1 (628) 555-0456",
    tags: ["startup", "series-b"],
  },
  {
    id: "client-3",
    name: "Elena Rodriguez",
    email: "elena@innovatehq.co",
    company: "InnovateHQ",
    role: "CEO",
    phone: "+1 (510) 555-0789",
    tags: ["founder", "decision-maker"],
  },
  {
    id: "client-4",
    name: "David Kim",
    email: "david.kim@scaleup.io",
    company: "ScaleUp",
    role: "CTO",
    phone: "+1 (650) 555-0321",
    tags: ["technical", "enterprise"],
  },
  {
    id: "client-5",
    name: "Aisha Patel",
    email: "aisha@nextwavetech.com",
    company: "NextWave Tech",
    role: "Director of Operations",
    phone: "+1 (408) 555-0654",
    tags: ["operations", "mid-market"],
  },
];

const mockInteractions: Record<string, Interaction[]> = {
  "client-1": [
    {
      id: "int-1",
      type: "email",
      date: "2025-01-15",
      summary: "Discussed Q1 roadmap and integration timeline",
      sentiment: "positive",
    },
    {
      id: "int-2",
      type: "call",
      date: "2025-01-10",
      summary: "Demo of new dashboard features",
      sentiment: "positive",
    },
    {
      id: "int-3",
      type: "slack",
      date: "2025-01-08",
      summary: "Quick question about API rate limits",
      sentiment: "neutral",
    },
  ],
  "client-2": [
    {
      id: "int-4",
      type: "meeting",
      date: "2025-01-14",
      summary: "Quarterly business review",
      sentiment: "positive",
    },
    {
      id: "int-5",
      type: "email",
      date: "2025-01-12",
      summary: "Sent proposal for expanded license",
      sentiment: "neutral",
    },
  ],
  "client-3": [
    {
      id: "int-6",
      type: "call",
      date: "2025-01-16",
      summary: "Initial discovery call - great fit",
      sentiment: "positive",
    },
    {
      id: "int-7",
      type: "note",
      date: "2025-01-16",
      summary: "Follow up with case studies from similar companies",
      sentiment: "neutral",
    },
  ],
  "client-4": [
    {
      id: "int-8",
      type: "email",
      date: "2025-01-13",
      summary: "Technical deep-dive documentation sent",
      sentiment: "neutral",
    },
    {
      id: "int-9",
      type: "slack",
      date: "2025-01-11",
      summary: "Debugging session for webhook integration",
      sentiment: "positive",
    },
  ],
  "client-5": [
    {
      id: "int-10",
      type: "meeting",
      date: "2025-01-09",
      summary: "Onboarding kickoff meeting",
      sentiment: "positive",
    },
  ],
};

const mockDeals: Record<string, Deal[]> = {
  "client-1": [
    {
      id: "deal-1",
      name: "TechCorp Enterprise License",
      value: 85000,
      stage: "negotiation",
      probability: 75,
    },
  ],
  "client-2": [
    {
      id: "deal-2",
      name: "Growthly Team Plan",
      value: 24000,
      stage: "proposal",
      probability: 60,
    },
  ],
  "client-3": [
    {
      id: "deal-3",
      name: "InnovateHQ Pilot",
      value: 12000,
      stage: "qualified",
      probability: 40,
    },
  ],
  "client-4": [
    {
      id: "deal-4",
      name: "ScaleUp API Access",
      value: 48000,
      stage: "closed-won",
      probability: 100,
    },
  ],
  "client-5": [
    {
      id: "deal-5",
      name: "NextWave Operations Suite",
      value: 36000,
      stage: "lead",
      probability: 20,
    },
  ],
};

const mockNotes: Record<string, string[]> = {
  "client-1": [
    "Key stakeholder in the engineering org",
    "Prefers async communication via email",
    "Budget approved for Q1",
  ],
  "client-2": [
    "Looking to consolidate tools",
    "Has existing contract with competitor ending in March",
  ],
  "client-3": [
    "Founder-led company, decisions made quickly",
    "Referred by David Kim at ScaleUp",
  ],
  "client-4": [
    "Very technical, appreciates deep-dive sessions",
    "Already a happy customer, expansion opportunity",
  ],
  "client-5": [
    "New in role, building out her team",
    "Interested in automation features",
  ],
};

export function getClientContext(clientId: string): ClientContext | null {
  const client = mockClients.find((c) => c.id === clientId);
  if (!client) return null;

  return {
    client,
    recentInteractions: mockInteractions[clientId] || [],
    deals: mockDeals[clientId] || [],
    notes: mockNotes[clientId] || [],
    lastContact: mockInteractions[clientId]?.[0]?.date,
  };
}

export function getAllInteractions(): Interaction[] {
  return Object.values(mockInteractions)
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
