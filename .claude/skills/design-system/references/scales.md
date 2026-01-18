# Design Scales Reference

## Typography Scales

### Common Ratios

| Name | Ratio | Character |
|------|-------|-----------|
| Minor Second | 1.067 | Subtle, tight |
| Major Second | 1.125 | Gentle progression |
| Minor Third | 1.200 | Balanced, versatile |
| Major Third | 1.250 | Clear hierarchy |
| Perfect Fourth | 1.333 | Strong contrast |
| Augmented Fourth | 1.414 | Dramatic |
| Perfect Fifth | 1.500 | Bold jumps |
| Golden Ratio | 1.618 | Classical harmony |

### Recommended by Context

**Dense UI / Dashboards**: Minor Second (1.067) or Major Second (1.125)
```
12 → 13 → 14 → 15 → 16 → 17 → 18
```

**General Web / Apps**: Minor Third (1.2) or Major Third (1.25)
```
12 → 14 → 16 → 19 → 23 → 28 → 33
```

**Marketing / Editorial**: Perfect Fourth (1.333) or higher
```
12 → 16 → 21 → 28 → 37 → 50 → 67
```

### Pre-built Type Scale (1.25 ratio, 16px base)

```css
--text-xs:   0.75rem;    /* 12px */
--text-sm:   0.875rem;   /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg:   1.125rem;   /* 18px */
--text-xl:   1.25rem;    /* 20px */
--text-2xl:  1.5rem;     /* 24px */
--text-3xl:  1.875rem;   /* 30px */
--text-4xl:  2.25rem;    /* 36px */
--text-5xl:  3rem;       /* 48px */
--text-6xl:  3.75rem;    /* 60px */
```

### Line Height Pairing

| Text Size | Line Height | Use Case |
|-----------|-------------|----------|
| xs–sm | 1.5–1.6 | Captions, labels |
| base–lg | 1.5–1.75 | Body text |
| xl–2xl | 1.3–1.4 | Subheadings |
| 3xl+ | 1.1–1.25 | Display headings |

## Spacing Scales

### 4px Base (Tailwind default)

```
1:  0.25rem   (4px)
2:  0.5rem    (8px)
3:  0.75rem   (12px)
4:  1rem      (16px)
5:  1.25rem   (20px)
6:  1.5rem    (24px)
8:  2rem      (32px)
10: 2.5rem    (40px)
12: 3rem      (48px)
16: 4rem      (64px)
20: 5rem      (80px)
24: 6rem      (96px)
```

### 8px Base (Material Design)

```
1:  8px
2:  16px
3:  24px
4:  32px
5:  40px
6:  48px
8:  64px
10: 80px
12: 96px
```

### Spacing Application Guidelines

| Context | Recommended Scale Steps |
|---------|------------------------|
| Inline elements (icon + text) | 1–2 (4–8px) |
| Form field padding | 2–3 (8–12px) |
| Card padding | 4–6 (16–24px) |
| Section padding | 8–16 (32–64px) |
| Page margins | 4–8 on mobile, 12–24 on desktop |

## Border Radius Scale

```css
--radius-none: 0;
--radius-sm:   0.125rem;  /* 2px - subtle */
--radius-md:   0.375rem;  /* 6px - default */
--radius-lg:   0.5rem;    /* 8px - cards */
--radius-xl:   0.75rem;   /* 12px - modals */
--radius-2xl:  1rem;      /* 16px - large cards */
--radius-3xl:  1.5rem;    /* 24px - hero elements */
--radius-full: 9999px;    /* pills, avatars */
```

### Radius by Aesthetic

| Style | Typical Radius |
|-------|---------------|
| Sharp / Brutalist | 0 |
| Corporate / Professional | sm–md (2–6px) |
| Friendly / Modern | lg–xl (8–12px) |
| Soft / Playful | 2xl–3xl (16–24px) |
| Pills / Tags | full |

## Shadow / Elevation Scale

```css
/* Subtle elevation */
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Default cards */
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Raised elements */
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/* Dropdowns, popovers */
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* Modals */
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* High emphasis */
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

## Transition Timing

```css
--duration-fast:   75ms;
--duration-normal: 150ms;
--duration-slow:   300ms;
--duration-slower: 500ms;

--ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
--ease-in:         cubic-bezier(0.4, 0, 1, 1);
--ease-out:        cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce:     cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Timing by Interaction

| Action | Duration |
|--------|----------|
| Hover states | 75–150ms |
| Button clicks | 100–150ms |
| Dropdowns/tooltips | 150–200ms |
| Modals/drawers | 200–300ms |
| Page transitions | 300–500ms |
