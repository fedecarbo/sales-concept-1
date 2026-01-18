# Sales Concept - Project Brief

## Vision

A 360-degree AI-powered sales workspace that connects all your channels (Slack, Email, CRM, Excel) into a unified interface. Unlike traditional dashboards, widgets are **interconnected** - data flows between them, enabling fluid workflows.

## Core Concept

**AI-Designed Pages**: Instead of manually configuring dashboards, describe what you want to do:
- "I want to write emails to my clients"
- "Help me review a client's history"
- "Show me recent activity"

The AI intelligently suggests and arranges the right widgets, pre-connected for your workflow.

## Key Differentiator: Interconnected Widgets

Widgets aren't isolated panels - they communicate:

```
[Client Selector] → [Context Viewer] → [Email Composer] → [Email Sender]
     ↓                    ↓                   ↓
  selects            shows info          pre-fills
  client             & history           recipient
```

When you select a client, their context automatically appears. When you draft an email, the sender widget updates. This connected flow is what makes this more than a dashboard - it's a **workflow engine**.

## Current Implementation

### Widget Types
1. **Client Selector** - Search/select contacts from CRM
2. **Context Viewer** - Client details, deals, interactions, notes
3. **Email Composer** - AI-assisted drafting with quick actions
4. **Email Sender** - Review and send
5. **Activity Feed** - Cross-channel interaction timeline

### AI Templates
- **Email Workflow** - Full email composition flow
- **Client Review** - Deep dive into client history
- **Activity Overview** - Monitor all interactions

### Tech Stack
- Next.js 16 with React 19
- Tailwind CSS 4 with OKLCH colors
- react-grid-layout for drag/resize
- React Context for widget communication

## Design Philosophy

- **Warm, human aesthetic** - Stone/clay color palette, not cold grays
- **Placeholder patterns** - Diagonal stripes indicate prototype areas
- **Simple to imagine** - Focus on the concept, not polished content
- **AI-first** - Every interaction can be AI-assisted

## Future Possibilities

- Real channel integrations (Gmail, Slack, Salesforce)
- Custom widget creation via AI
- Widget marketplace
- Saved workflow templates
- Multi-user collaboration
- Real-time sync across devices

## This is a Prototype

Everything shown is for demonstration purposes. The goal is to validate the interconnected widget concept and AI-assisted page design before building production integrations.
