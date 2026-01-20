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

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: "meeting" | "deadline" | "reminder" | "follow-up";
  attendees?: { name: string; avatar?: string }[];
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

// Helper to get dates relative to today
const getRelativeDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
};

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Discovery call with Acme Corp",
    date: getRelativeDate(0),
    time: "10:00 AM",
    type: "meeting",
    attendees: [
      { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
    ],
  },
  {
    id: "2",
    title: "Proposal deadline - TechStart",
    date: getRelativeDate(1),
    type: "deadline",
  },
  {
    id: "3",
    title: "Follow up with Marcus Johnson",
    date: getRelativeDate(2),
    time: "2:00 PM",
    type: "follow-up",
    attendees: [
      { name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    ],
  },
  {
    id: "4",
    title: "Quarterly review prep",
    date: getRelativeDate(3),
    type: "reminder",
  },
  {
    id: "5",
    title: "Demo for Global Inc",
    date: getRelativeDate(5),
    time: "11:00 AM",
    type: "meeting",
    attendees: [
      { name: "Emily Rodriguez", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      { name: "David Kim", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    ],
  },
  {
    id: "6",
    title: "Contract review - Innovate Co",
    date: getRelativeDate(7),
    time: "3:30 PM",
    type: "meeting",
  },
  {
    id: "7",
    title: "Send pricing update to NexGen",
    date: getRelativeDate(10),
    type: "follow-up",
  },
  {
    id: "8",
    title: "End of quarter deadline",
    date: getRelativeDate(14),
    type: "deadline",
  },
];

// Preset asks for the AI chat interface
export interface WidgetAsk {
  id: string;
  label: string;
  keywords: string[];
  contentType: "contacts" | "deals" | "calendar";
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
  {
    id: "calendar",
    label: "Show my calendar",
    keywords: ["calendar", "schedule", "meetings", "events", "agenda"],
    contentType: "calendar",
    title: "My Calendar",
  },
];
