---
name: design-system
description: Establish foundational design systems, themes, and token architecture before building UI. Use when the user wants to define a cohesive visual language including color palettes, typography scales, spacing systems, and design tokens. Also use when setting up Tailwind CSS 4.x @theme configuration, CSS custom properties, or creating style guides. Complements frontend-design by handling the systematic foundation that informs component-level aesthetics.
---

# Design System Skill

Establish the foundational design language before building components. This skill creates cohesive, systematic theming that ensures consistency across an entire project.

## References

- **[references/color-palettes.md](references/color-palettes.md)**: Starter palettes, semantic mappings, dark mode guidance, contrast requirements
- **[references/scales.md](references/scales.md)**: Typography ratios, spacing scales, border radius, shadows, transitions
- **[references/tailwind4-theme.md](references/tailwind4-theme.md)**: Complete Tailwind 4.x @theme namespace reference and examples

## Design Token Architecture

Build tokens in layers:

**Primitives** → Raw values (gray-500, blue-600)
**Semantic** → Meaning-based (background, accent, error)
**Component** → Specific use (button-bg, card-border)

## Core Token Categories

### Colors
- 60-30-10 rule: dominant/secondary/accent
- Minimum 4.5:1 contrast for text (WCAG AA)
- Dark mode: don't invert—use lighter surfaces for elevation, desaturate colors
- Use OKLCH for better perceptual uniformity

### Typography
- Choose a modular ratio (1.2–1.333 for most projects)
- Limit to 2–3 font families (display + body)
- Pair line heights: tight for headings (1.1–1.25), relaxed for body (1.5–1.75)

### Spacing
- Use consistent base unit (4px or 8px)
- Scale: 4, 8, 12, 16, 24, 32, 48, 64...

### Other Tokens
- Border radius (sharp → pill based on aesthetic)
- Shadows (elevation system, 4–5 levels)
- Transitions (75ms hover, 150ms normal, 300ms modals)

## Tailwind CSS 4.x Implementation

Tailwind 4.x uses **CSS-first configuration** with the `@theme` directive. No `tailwind.config.js` required.

### Basic Setup

```css
@import "tailwindcss";

@theme {
  /* Colors - generates bg-*, text-*, border-* utilities */
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.15 0.02 260);
  --color-primary: oklch(0.55 0.2 260);
  --color-accent: oklch(0.65 0.18 150);
  
  /* Typography - generates font-* utilities */
  --font-display: "Satoshi", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  
  /* Font sizes - generates text-* utilities */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  
  /* Spacing - extends default spacing utilities */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;
  
  /* Border radius - generates rounded-* utilities */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-pill: 9999px;
  
  /* Shadows - generates shadow-* utilities */
  --shadow-soft: 0 2px 8px oklch(0 0 0 / 0.08);
  --shadow-elevated: 0 8px 24px oklch(0 0 0 / 0.12);
  
  /* Breakpoints - generates responsive variants */
  --breakpoint-xs: 30rem;
  --breakpoint-3xl: 100rem;
  
  /* Easings - generates ease-* utilities */
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

### Key Namespaces

| Namespace | Generates | Example |
|-----------|-----------|---------|
| `--color-*` | `bg-*`, `text-*`, `border-*` | `--color-brand` → `bg-brand` |
| `--font-*` | `font-*` | `--font-display` → `font-display` |
| `--text-*` | `text-*` (sizes) | `--text-xl` → `text-xl` |
| `--spacing-*` | spacing utilities | `--spacing-18` → `p-18`, `m-18` |
| `--radius-*` | `rounded-*` | `--radius-lg` → `rounded-lg` |
| `--shadow-*` | `shadow-*` | `--shadow-soft` → `shadow-soft` |
| `--breakpoint-*` | responsive variants | `--breakpoint-3xl` → `3xl:` |
| `--ease-*` | `ease-*` | `--ease-snappy` → `ease-snappy` |

### Resetting Defaults

Clear default values before defining custom ones:

```css
@theme {
  /* Clear all default colors, define only custom */
  --color-*: initial;
  
  --color-white: #fff;
  --color-black: #000;
  --color-background: oklch(0.98 0 0);
  --color-foreground: oklch(0.15 0 0);
  --color-primary: oklch(0.6 0.2 250);
}
```

### Dark Mode

Use `@custom-variant` for class-based dark mode:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

@layer base {
  :root {
    --background: oklch(0.98 0 0);
    --foreground: oklch(0.15 0 0);
  }
  
  .dark {
    --background: oklch(0.15 0 0);
    --foreground: oklch(0.95 0 0);
  }
}
```

### Legacy Config (if needed)

For complex plugins or migrations, you can still use JS config:

```css
@config "./tailwind.config.js";
```

Note: `corePlugins`, `safelist`, and `separator` options are not supported in v4.

## Workflow

1. **Gather requirements**: Brand colors? Mood? Audience?
2. **Define primitives**: Raw palette, fonts (see references/color-palettes.md)
3. **Create semantic layer**: Map primitives to tokens
4. **Set up scales**: Type, spacing, other tokens (see references/scales.md)
5. **Implement with @theme**: See references/tailwind4-theme.md for full namespace reference
6. **Document**: Generate style guide if needed
7. **Validate**: Check contrast, test dark mode

## Output Formats

- `app.css` / `globals.css` — Tailwind 4.x with @theme
- `variables.css` — standalone CSS custom properties
- `theme.ts` — CSS-in-JS theme object (if needed)
- Style guide document (markdown or HTML)

## Relationship to frontend-design

This skill = **systematic foundation** (the rules)
frontend-design = **creative execution** (applying the rules memorably)

Use this skill first to define tokens and scales, then frontend-design to build distinctive UI within those constraints.
