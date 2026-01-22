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

// Conversation Activity types for WidgetFeed
export type ActivityChannel =
  | "linkedin"
  | "sales_navigator"
  | "email"
  | "call"
  | "meeting"
  | "slack"
  | "note";

export type ActivityDirection = "inbound" | "outbound";

export interface ConversationActivity {
  id: string;
  channel: ActivityChannel;
  direction: ActivityDirection;
  contact: {
    id: string;
    name: string;
    avatar?: string;
    company?: string;
    role?: string;
  };
  title: string;
  content: string;
  summary?: string;
  timestamp: string;
  duration?: string;
  highlights?: {
    decisionPoints?: string[];
    followUpTasks?: string[];
    nextSteps?: string[];
    sentiment?: "positive" | "neutral" | "negative";
  };
  dealId?: string;
  companyId?: string;
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

// Helper to get timestamps relative to today
const getRelativeTimestamp = (daysAgo: number, hours: number = 12): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hours, 0, 0, 0);
  return date.toISOString();
};

// Sarah Chen's conversation history - a complete relationship arc
const sarahChen = {
  id: "1",
  name: "Sarah Chen",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  company: "Acme Corp",
  role: "VP of Engineering",
};

export const mockSarahChenHistory: ConversationActivity[] = [
  {
    id: "sarah-1",
    channel: "linkedin",
    direction: "outbound",
    contact: sarahChen,
    title: "Connection Request",
    content: "Hi Sarah, I saw your post about the challenges of scaling infrastructure while maintaining team velocity. At Unboxed, we've helped companies like yours solve exactly this. Would love to connect and share some ideas.",
    summary: "Sent connection request referencing her post about scaling challenges.",
    timestamp: getRelativeTimestamp(21, 9),
    companyId: "acme",
  },
  {
    id: "sarah-2",
    channel: "linkedin",
    direction: "inbound",
    contact: sarahChen,
    title: "LinkedIn Message",
    content: "Thanks for reaching out! Always happy to connect with people in the space. What's Unboxed's approach to managing technical debt during rapid scaling? That's our biggest pain point right now.",
    summary: "Sarah accepted, asking about Unboxed's approach to technical debt.",
    timestamp: getRelativeTimestamp(21, 14),
    highlights: {
      decisionPoints: ["Technical debt during scaling is main pain point"],
      sentiment: "positive",
    },
    companyId: "acme",
  },
  {
    id: "sarah-3",
    channel: "email",
    direction: "outbound",
    contact: sarahChen,
    title: "Intro Email - Case Study",
    content: "Hi Sarah,\n\nGreat chatting on LinkedIn! As promised, I'm sharing a case study from a similar company that faced the same scaling challenges.\n\nThey reduced their technical debt backlog by 40% while shipping 2x more features. Happy to walk you through how we approached it.\n\nWould you have 30 minutes next week for a quick call?\n\nBest,\nJo",
    summary: "Sent intro email with case study. Requested 30-min call.",
    timestamp: getRelativeTimestamp(18, 10),
    companyId: "acme",
  },
  {
    id: "sarah-4",
    channel: "email",
    direction: "inbound",
    contact: sarahChen,
    title: "Re: Intro Email - Case Study",
    content: "Jo,\n\nThanks for the case study - impressive results! I've shared it with my team lead.\n\nYes, let's set up a call. How about Thursday at 2pm? We're actively looking for solutions before Q2 planning kicks in.\n\nSarah",
    summary: "Sarah interested, shared with team. Wants call Thursday 2pm. Q2 deadline mentioned.",
    timestamp: getRelativeTimestamp(14, 15),
    highlights: {
      decisionPoints: ["Q2 planning deadline", "Team lead involved"],
      nextSteps: ["Schedule Thursday 2pm call"],
      sentiment: "positive",
    },
    companyId: "acme",
  },
  {
    id: "sarah-5",
    channel: "call",
    direction: "outbound",
    contact: sarahChen,
    title: "Discovery Call",
    content: "Great conversation with Sarah. Current situation:\n- Team of 12 engineers, grew from 5 last year\n- Using legacy monolith, want to move to microservices\n- Budget is around $50k for initial engagement\n- Decision needs CFO approval for anything over $30k\n- Want to decide before Q2 (end of March)\n\nShe mentioned their CEO is pushing for faster delivery and they're struggling to balance new features with platform work.",
    summary: "Discovery call: 12 engineers, $50k budget, CFO approval needed >$30k. Q2 deadline.",
    timestamp: getRelativeTimestamp(12, 14),
    duration: "28 min",
    highlights: {
      decisionPoints: ["$50k budget", "CFO approval needed >$30k", "Q2 deadline"],
      followUpTasks: ["Send ROI calculator", "Draft proposal outline"],
      sentiment: "positive",
    },
    dealId: "1",
    companyId: "acme",
  },
  {
    id: "sarah-6",
    channel: "note",
    direction: "outbound",
    contact: sarahChen,
    title: "Internal Note",
    content: "Strong fit for our Enterprise License tier. Sarah is the champion but CFO is final decision maker for budget. Key to winning: demonstrate clear ROI and fast time-to-value. Follow up with ROI calculator and keep proposal under $50k initially - can expand later.",
    summary: "Strong fit. Sarah is champion, CFO decides. Focus on ROI and fast time-to-value.",
    timestamp: getRelativeTimestamp(12, 16),
    highlights: {
      nextSteps: ["Send ROI doc", "Keep initial proposal under $50k"],
    },
    dealId: "1",
    companyId: "acme",
  },
  {
    id: "sarah-7",
    channel: "email",
    direction: "outbound",
    contact: sarahChen,
    title: "ROI Calculator + Proposal Outline",
    content: "Hi Sarah,\n\nThanks again for the great call! As discussed, I've put together:\n\n1. ROI Calculator (attached) - customized with your team size and current velocity metrics\n2. Proposal Outline - showing how we'd approach the first 3 months\n\nBased on similar engagements, you could see 30% productivity gains within the first quarter.\n\nLet me know if you'd like me to walk your CFO through the numbers.\n\nBest,\nJo",
    summary: "Sent ROI calculator and 3-month proposal outline. Offered CFO walkthrough.",
    timestamp: getRelativeTimestamp(10, 11),
    dealId: "1",
    companyId: "acme",
  },
  {
    id: "sarah-8",
    channel: "slack",
    direction: "inbound",
    contact: sarahChen,
    title: "Slack DM",
    content: "Quick question - does your platform support SSO with Okta? Our security team just flagged this as a hard requirement for any new vendor.",
    summary: "Asking about Okta SSO - security team requirement.",
    timestamp: getRelativeTimestamp(8, 10),
    highlights: {
      followUpTasks: ["Confirm Okta SSO support"],
    },
    dealId: "1",
    companyId: "acme",
  },
  {
    id: "sarah-9",
    channel: "slack",
    direction: "outbound",
    contact: sarahChen,
    title: "Slack DM",
    content: "Great question! Yes, we fully support Okta SSO (SAML 2.0). Here's our integration doc: [link]\n\nWe can have it set up in under an hour during onboarding. Happy to do a quick security review call with your team if helpful.",
    summary: "Confirmed Okta SSO support. Shared integration docs. Offered security review call.",
    timestamp: getRelativeTimestamp(8, 11),
    dealId: "1",
    companyId: "acme",
  },
  {
    id: "sarah-10",
    channel: "meeting",
    direction: "outbound",
    contact: sarahChen,
    title: "Product Demo",
    content: "Demo with Sarah and her technical lead (Tom). Walked through:\n- Dashboard and reporting features (they loved the real-time metrics)\n- Integration workflow with their existing tools\n- Security and compliance features\n\nTom had concerns about the 6-week implementation timeline - they need to show results by end of Q1. Agreed to explore a 3-week accelerated pilot option.\n\nSarah mentioned she'll present to CFO next week.",
    summary: "Demo went well. Tom concerned about 6-week timeline. Exploring 3-week pilot. CFO presentation next week.",
    timestamp: getRelativeTimestamp(5, 11),
    duration: "45 min",
    highlights: {
      decisionPoints: ["Implementation timeline concern", "CFO presentation next week"],
      followUpTasks: ["Draft accelerated pilot proposal"],
      nextSteps: ["Send 3-week pilot option by Friday"],
      sentiment: "positive",
    },
    dealId: "1",
    companyId: "acme",
  },
  {
    id: "sarah-11",
    channel: "email",
    direction: "inbound",
    contact: sarahChen,
    title: "Re: Demo Follow-up",
    content: "Jo,\n\nGreat news! CFO approved the pilot budget. He was impressed by the ROI projections.\n\nCan we set up a call this week to discuss the timeline? We'd like to kick off as soon as possible.\n\nTom will join to go through the technical requirements.\n\nSarah",
    summary: "CFO approved pilot! Wants call this week to discuss kickoff. Tom joining for technical reqs.",
    timestamp: getRelativeTimestamp(2, 9),
    highlights: {
      decisionPoints: ["CFO approved pilot budget"],
      nextSteps: ["Schedule kickoff planning call"],
      sentiment: "positive",
    },
    dealId: "1",
    companyId: "acme",
  },
  {
    id: "sarah-12",
    channel: "email",
    direction: "outbound",
    contact: sarahChen,
    title: "Pilot Proposal + Kickoff Plan",
    content: "Hi Sarah,\n\nFantastic news! Congrats on getting approval.\n\nI've attached our accelerated pilot proposal with a 2-week kickoff plan:\n\nWeek 1: Environment setup, SSO integration, team onboarding\nWeek 2: Initial workflow migration, baseline metrics\n\nAvailable Thursday or Friday for the planning call. Let me know what works for you and Tom.\n\nExcited to get started!\n\nJo",
    summary: "Sent 2-week pilot proposal. Available Thursday/Friday for planning call.",
    timestamp: getRelativeTimestamp(1, 14),
    highlights: {
      nextSteps: ["Schedule planning call Thu/Fri", "Begin pilot kickoff"],
      sentiment: "positive",
    },
    dealId: "1",
    companyId: "acme",
  },
];

// Preset asks for the AI chat interface
export interface WidgetAsk {
  id: string;
  label: string;
  keywords: string[];
  contentType: "contacts" | "deals" | "calendar" | "activity";
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
  {
    id: "activity",
    label: "Show conversation history",
    keywords: ["activity", "history", "conversations", "timeline", "feed", "messages", "emails", "calls"],
    contentType: "activity",
    title: "Conversation History",
  },
];
