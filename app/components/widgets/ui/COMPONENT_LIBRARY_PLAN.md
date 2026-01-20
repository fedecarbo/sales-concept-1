# Widget UI Component Library Plan

This document guides the creation of container-responsive components for widgets. Use this as a reference when adding new components from TailwindPlus (tcp skill).

---

## Quick Reference (38 Components)

| Category | Components | Priority |
|----------|------------|----------|
| **Data Display** | Table ✅, StackedList, Stats, Feed, GridList, DescriptionList | High |
| **Calendars** | Calendar, Schedule | High |
| **Forms** | Form, Input, Select, Textarea, CheckboxGroup, RadioGroup, Toggle | High |
| **Navigation** | Tabs, ButtonGroup, Pagination | Medium |
| **Elements** | Avatar, Badge, Button, Dropdown | Medium |
| **Feedback** | Alert, EmptyState, Progress | Medium |
| **Layout** | Card, Divider, MediaObject | Low |
| **Overlays** | Modal, SlideOver, Notification | Low |
| **Sales Composites** | DealCard, ContactCard, MeetingCard, TaskList, EmailPreview, QuickNote, PipelineStages | Medium |

**✅ = Implemented**

---

## Architecture Overview

### Directory Structure
```
app/components/widgets/ui/
├── index.ts              # Export all components
├── mockData.ts           # Mock data for demos
├── WidgetTable.tsx       # ✅ Implemented
├── WidgetStackedList.tsx # TODO
├── WidgetStats.tsx       # TODO
├── WidgetFeed.tsx        # TODO
└── COMPONENT_LIBRARY_PLAN.md
```

### Key Principle: Container Queries

**Problem:** TailwindPlus uses viewport breakpoints (`sm:`, `md:`, `lg:`).
**Solution:** We use CSS Container Queries (`@container`) so components adapt to widget width.

```tsx
// Widget content area marked as container
<div className="@container h-full">
  {/* Child components use @[size]: variants */}
</div>

// Container query breakpoints (widget width)
@[20rem]:   // ~320px - narrow widget (2-3 grid columns)
@[32rem]:   // ~512px - medium widget (4-5 grid columns)
@[44rem]:   // ~704px - wide widget (6+ grid columns)
```

### Conversion Pattern

| TailwindPlus (viewport) | Widget UI (container) |
|------------------------|----------------------|
| `sm:block`             | `@[20rem]:block`     |
| `md:flex`              | `@[32rem]:flex`      |
| `lg:grid-cols-3`       | `@[44rem]:grid-cols-3` |
| `hidden sm:table-cell` | `hidden @[20rem]:table-cell` |

---

## How to Add a New Component

### Step 1: Find the TailwindPlus Component

Use the `tcp` or `tailwindplus-components` skill:
```
Show me stacked list components from TailwindPlus
```

Browse categories:
- **Lists** → Tables, Stacked Lists, Feeds, Grid Lists
- **Data Display** → Stats, Description Lists, Calendars
- **Elements** → Badges, Avatars, Buttons
- **Feedback** → Alerts, Empty States

### Step 2: Read the Component Code

Ask for the specific component:
```
Show me the code for "stacked lists with badges"
```

### Step 3: Adapt for Container Queries

1. **Wrap in `@container`** at the root
2. **Replace viewport breakpoints** with container query equivalents
3. **Simplify for widget context** (remove page-level padding, headers)
4. **Match the stone color palette** (replace gray-* with stone-*)

### Step 4: Create Generic Props Interface

```tsx
export interface WidgetComponentProps<T> {
  data: T[];
  // Column/field config with visibility levels
  columns?: ColumnConfig<T>[];
  // Common options
  hoverable?: boolean;
  keyExtractor?: (item: T, index: number) => string;
}
```

### Step 5: Add to Exports and Mock Data

1. Export from `index.ts`
2. Add relevant mock data to `mockData.ts`
3. Add a preset "ask" in `widgetAsks` array
4. Update `GenericWidget.tsx` to render the new component

---

## Component Categories

### DATA DISPLAY

#### 1. WidgetTable ✅ (Implemented)
**Use case:** Contacts, deals, tasks, any structured data
**TailwindPlus source:** `lists/tables/`

#### 2. WidgetStackedList (High Priority)
**Use case:** Activity feed, notifications, simple lists
**TailwindPlus source:** `lists/stacked-lists/`

Recommended variants:
- `05-with-badges-button-and-actions-menu.md` - Status badges
- `15-narrow-with-badges.md` - Compact with status indicators

**Responsive behavior:**
- Narrow: Avatar + title only
- Medium: Add subtitle/description
- Wide: Full content with actions

#### 3. WidgetStats (High Priority)
**Use case:** KPIs, metrics, pipeline value, conversion rates
**TailwindPlus source:** `data-display/stats/`

Recommended variants:
- `01-simple.md` - Basic stat cards
- `03-with-trending.md` - With trend indicators
- `05-with-shared-borders.md` - Compact grid

**Responsive behavior:**
- Narrow: Single stat, large number
- Medium: 2-column grid
- Wide: 3-4 column grid

#### 4. WidgetFeed (Medium Priority)
**Use case:** Activity timeline, comments, interaction history
**TailwindPlus source:** `lists/feeds/`

Recommended variants:
- `01-simple-with-icons.md` - Icon badges with timeline
- `03-with-multiple-item-types.md` - Mixed content types

#### 5. WidgetGridList (Medium Priority)
**Use case:** Contact cards, deal cards, team members
**TailwindPlus source:** `lists/grid-lists/`

Recommended variants:
- `01-contact-cards-with-small-portraits.md`
- `03-simple-cards.md`
- `07-logos-cards-with-description-list.md` - Company cards

#### 6. WidgetDescriptionList
**Use case:** Contact details, deal info, key-value data
**TailwindPlus source:** `data-display/description-lists/`

Recommended variants:
- `01-left-aligned.md` - Simple key-value
- `03-left-aligned-striped.md` - With visual separation

---

### CALENDARS & SCHEDULING

#### 7. WidgetCalendar (High Priority)
**Use case:** Meeting schedule, availability, task due dates
**TailwindPlus source:** `data-display/calendars/`

Recommended variants:
- `01-small-with-meetings.md` - Compact month view with dots
- `02-month-view.md` - Full month grid
- `03-week-view.md` - Week schedule

**Responsive behavior:**
- Narrow: List of upcoming events only
- Medium: Small month view
- Wide: Full calendar grid

#### 8. WidgetSchedule
**Use case:** Daily agenda, time slots, booking
**TailwindPlus source:** `data-display/calendars/`

Recommended variants:
- `04-day-view.md` - Hourly schedule

---

### FORMS & INPUTS

#### 9. WidgetForm (High Priority)
**Use case:** Quick data entry, log a call, add note
**TailwindPlus source:** `forms/form-layouts/`

Recommended variants:
- `01-stacked.md` - Simple stacked form
- `05-labels-on-left.md` - Horizontal labels

#### 10. WidgetInput
**Use case:** Search, quick entry, notes
**TailwindPlus source:** `forms/input-groups/`

Recommended variants:
- `01-input-with-label.md`
- `05-input-with-inline-add-on.md` - With prefix/suffix
- `07-input-with-keyboard-shortcut.md`

#### 11. WidgetSelect
**Use case:** Dropdowns, status selection, filters
**TailwindPlus source:** `forms/select-menus/`

Recommended variants:
- `01-simple-native.md` - Native select
- `02-simple-custom.md` - Custom styled
- `04-custom-with-check.md` - With checkmarks

#### 12. WidgetTextarea
**Use case:** Notes, email drafts, comments
**TailwindPlus source:** `forms/textareas/`

#### 13. WidgetCheckboxGroup
**Use case:** Task lists, multi-select options
**TailwindPlus source:** `forms/checkboxes/`

#### 14. WidgetRadioGroup
**Use case:** Single selection, status updates
**TailwindPlus source:** `forms/radio-groups/`

Recommended variants:
- `01-simple-list.md`
- `04-cards.md` - Card-style selection
- `05-small-cards.md` - Compact cards

#### 15. WidgetToggle
**Use case:** Settings, on/off states
**TailwindPlus source:** `forms/toggles/`

---

### NAVIGATION & ACTIONS

#### 16. WidgetTabs
**Use case:** Switch between views within a widget
**TailwindPlus source:** `navigation/tabs/`

Recommended variants:
- `01-bar-with-underline.md` - Simple underline tabs
- `04-pills.md` - Pill-style tabs
- `08-full-width-underline.md`

**Responsive behavior:**
- Narrow: Dropdown or scrollable
- Wide: Full tab bar

#### 17. WidgetButtonGroup
**Use case:** Actions, view toggles, filters
**TailwindPlus source:** `elements/button-groups/`

Recommended variants:
- `01-basic.md`
- `03-with-dropdown.md`

#### 18. WidgetPagination
**Use case:** Navigate through data pages
**TailwindPlus source:** `navigation/pagination/`

Recommended variants:
- `01-simple-card-footer.md`
- `04-centered-page-numbers.md`

---

### ELEMENTS & UI PRIMITIVES

#### 19. WidgetAvatar
**Use case:** User/contact display, stacked groups
**TailwindPlus source:** `elements/avatars/`

Recommended variants:
- `01-circular.md`
- `05-avatar-group-stacked.md` - Overlapping group

#### 20. WidgetBadge
**Use case:** Status indicators, tags, counts
**TailwindPlus source:** `elements/badges/`

Recommended variants:
- `01-flat.md`
- `02-flat-pill.md`
- `05-with-border.md`

#### 21. WidgetButton
**Use case:** Actions, CTAs
**TailwindPlus source:** `elements/buttons/`

#### 22. WidgetDropdown
**Use case:** Action menus, more options
**TailwindPlus source:** `elements/dropdowns/`

---

### FEEDBACK & STATES

#### 23. WidgetAlert
**Use case:** Notifications, warnings, success messages
**TailwindPlus source:** `feedback/alerts/`

Recommended variants:
- `01-accent-border.md`
- `05-with-description.md`

#### 24. WidgetEmptyState
**Use case:** No data, onboarding, placeholder
**TailwindPlus source:** `feedback/empty-states/`

Recommended variants:
- `01-simple.md`
- `04-with-dashed-border.md`

#### 25. WidgetProgress
**Use case:** Deal progress, quota tracking
**TailwindPlus source:** `navigation/progress-bars/`

Recommended variants:
- `01-simple.md`
- `04-with-steps.md` - Pipeline stages

---

### LAYOUT & CONTAINERS

#### 26. WidgetCard
**Use case:** Wrapper for nested content
**TailwindPlus source:** `layout/cards/`

#### 27. WidgetDivider
**Use case:** Separate content sections
**TailwindPlus source:** `layout/dividers/`

#### 28. WidgetMediaObject
**Use case:** Icon/avatar + content layout
**TailwindPlus source:** `layout/media-objects/`

---

### OVERLAYS (Use sparingly in widgets)

#### 29. WidgetModal (Special)
**Use case:** Quick actions without leaving widget
**TailwindPlus source:** `overlays/modal-dialogs/`
**Note:** May need portal to escape widget bounds

#### 30. WidgetSlideOver
**Use case:** Detail views, forms
**TailwindPlus source:** `overlays/drawers/`

#### 31. WidgetNotification
**Use case:** Toast messages within widget
**TailwindPlus source:** `overlays/notifications/`

---

### SALES-SPECIFIC COMPOSITES

These combine multiple primitives for common sales workflows:

#### 32. WidgetDealCard
**Combines:** Card + Stats + Progress + Badge
**Use case:** Single deal overview with stage, value, probability

#### 33. WidgetContactCard
**Combines:** MediaObject + Badge + ButtonGroup
**Use case:** Contact quick view with actions (email, call, note)

#### 34. WidgetMeetingCard
**Combines:** Card + Avatar + Badge
**Use case:** Upcoming meeting with attendees

#### 35. WidgetTaskList
**Combines:** CheckboxGroup + Badge + Avatar
**Use case:** To-do list with assignees and due dates

#### 36. WidgetEmailPreview
**Combines:** MediaObject + Textarea + ButtonGroup
**Use case:** Draft email with quick send actions

#### 37. WidgetQuickNote
**Combines:** Textarea + Select + Button
**Use case:** Log a note with type selection (call, meeting, email)

#### 38. WidgetPipelineStages
**Combines:** Progress + Stats
**Use case:** Visual deal pipeline with counts per stage

---

## Color Palette Reference

Replace TailwindPlus gray colors with stone:

| TailwindPlus | Widget UI |
|--------------|-----------|
| `gray-50`    | `stone-50` |
| `gray-100`   | `stone-100` |
| `gray-200`   | `stone-200` |
| `gray-500`   | `stone-500` |
| `gray-700`   | `stone-700` |
| `gray-900`   | `stone-900` |
| `bg-white`   | `bg-white` (keep) |

Status badge colors (keep as-is):
- Green: `bg-green-50 text-green-700 ring-green-600/20`
- Amber: `bg-amber-50 text-amber-700 ring-amber-600/20`
- Blue: `bg-blue-50 text-blue-700 ring-blue-600/20`
- Purple: `bg-purple-50 text-purple-700 ring-purple-600/20`

---

## Mock Data Patterns

### Contacts (existing)
```typescript
interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: "active" | "inactive" | "lead";
  avatar?: string;
}
```

### Deals (existing)
```typescript
interface Deal {
  id: string;
  name: string;
  company: string;
  value: string;
  stage: "prospecting" | "qualification" | "proposal" | "negotiation" | "closed";
  owner: string;
  probability: number;
}
```

### Activity (to add)
```typescript
interface Activity {
  id: string;
  type: "email" | "call" | "meeting" | "note" | "deal_update";
  title: string;
  description?: string;
  contact?: string;
  timestamp: string;
  icon?: string;
}
```

### Stats (to add)
```typescript
interface Stat {
  id: string;
  name: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease";
  icon?: string;
}
```

### Meeting (to add)
```typescript
interface Meeting {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: { name: string; avatar?: string }[];
  location?: string;
  type: "call" | "video" | "in-person";
  deal?: string;
}
```

### Task (to add)
```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  assignee?: { name: string; avatar?: string };
  contact?: string;
  deal?: string;
}
```

### CalendarEvent (to add)
```typescript
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: "meeting" | "deadline" | "reminder" | "follow-up";
  color?: string;
}
```

### Email (to add)
```typescript
interface Email {
  id: string;
  subject: string;
  from: { name: string; email: string; avatar?: string };
  to: { name: string; email: string }[];
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}
```

### Note (to add)
```typescript
interface Note {
  id: string;
  content: string;
  type: "call" | "meeting" | "email" | "general";
  contact?: string;
  deal?: string;
  author: { name: string; avatar?: string };
  timestamp: string;
}
```

### PipelineStage (to add)
```typescript
interface PipelineStage {
  id: string;
  name: string;
  count: number;
  value: number;
  color: string;
}
```

---

## Adding a Preset Ask

In `mockData.ts`, add to the `widgetAsks` array:

```typescript
{
  id: "activity",
  label: "Show recent activity",
  keywords: ["activity", "recent", "timeline", "feed"],
  contentType: "activity",
  title: "Recent Activity",
}
```

Then in `GenericWidget.tsx`, add the render case:

```typescript
if (contentType === "activity") {
  return (
    <WidgetFeed
      data={mockActivity}
      // ... props
    />
  );
}
```

---

## Component Template

Use this as a starting point:

```tsx
"use client";

import { ReactNode } from "react";

export interface WidgetXxxProps<T> {
  data: T[];
  keyExtractor?: (item: T, index: number) => string;
  // Add component-specific props
}

/**
 * Brief description of the component.
 *
 * Container query breakpoints:
 * - < 20rem: Compact view
 * - 20rem - 32rem: Medium view
 * - > 32rem: Full view
 */
export function WidgetXxx<T>({
  data,
  keyExtractor = (_, index) => String(index),
}: WidgetXxxProps<T>) {
  return (
    <div className="@container h-full w-full overflow-hidden">
      {/* Compact view for narrow containers */}
      <div className="block @[20rem]:hidden">
        {/* Simplified layout */}
      </div>

      {/* Full view for wider containers */}
      <div className="hidden @[20rem]:block">
        {/* Full layout */}
      </div>
    </div>
  );
}
```

---

## Checklist for Each Component

- [ ] Read TailwindPlus source component
- [ ] Create `WidgetXxx.tsx` with container queries
- [ ] Replace gray-* with stone-* colors
- [ ] Add TypeScript interface for props
- [ ] Export from `index.ts`
- [ ] Add mock data to `mockData.ts`
- [ ] Add preset ask to `widgetAsks`
- [ ] Update `GenericWidget.tsx` to render it
- [ ] Test at different widget sizes (2, 4, 6+ columns)
