export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: "active" | "inactive" | "lead";
  avatar?: string;
}

export interface Deal {
  id: string;
  name: string;
  company: string;
  value: string;
  stage: "prospecting" | "qualification" | "proposal" | "negotiation" | "closed";
  owner: string;
  probability: number;
}

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@acmecorp.com",
    company: "Acme Corp",
    role: "VP of Engineering",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@techstart.io",
    company: "TechStart",
    role: "CTO",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@globalinc.com",
    company: "Global Inc",
    role: "Director of IT",
    status: "lead",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "David Kim",
    email: "dkim@innovate.co",
    company: "Innovate Co",
    role: "Product Manager",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@nexgen.com",
    company: "NexGen Solutions",
    role: "CEO",
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "jwilson@enterprise.io",
    company: "Enterprise Solutions",
    role: "Head of Procurement",
    status: "lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

export const mockDeals: Deal[] = [
  {
    id: "1",
    name: "Enterprise License Renewal",
    company: "Acme Corp",
    value: "$125,000",
    stage: "negotiation",
    owner: "You",
    probability: 75,
  },
  {
    id: "2",
    name: "Platform Migration",
    company: "TechStart",
    value: "$85,000",
    stage: "proposal",
    owner: "You",
    probability: 50,
  },
  {
    id: "3",
    name: "Annual Support Contract",
    company: "Global Inc",
    value: "$45,000",
    stage: "qualification",
    owner: "You",
    probability: 30,
  },
  {
    id: "4",
    name: "Custom Integration",
    company: "Innovate Co",
    value: "$200,000",
    stage: "prospecting",
    owner: "You",
    probability: 15,
  },
  {
    id: "5",
    name: "Security Audit Package",
    company: "NexGen Solutions",
    value: "$32,000",
    stage: "closed",
    owner: "You",
    probability: 100,
  },
];

// Preset asks for the AI chat interface
export interface WidgetAsk {
  id: string;
  label: string;
  keywords: string[];
  contentType: "contacts" | "deals";
  title: string;
}

export const widgetAsks: WidgetAsk[] = [
  {
    id: "contacts",
    label: "Show my contacts",
    keywords: ["contacts", "people", "clients", "customers"],
    contentType: "contacts",
    title: "My Contacts",
  },
  {
    id: "deals",
    label: "Show my deals",
    keywords: ["deals", "pipeline", "opportunities", "sales"],
    contentType: "deals",
    title: "My Deals",
  },
];
