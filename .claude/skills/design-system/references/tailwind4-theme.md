# Tailwind CSS 4.x @theme Reference

Tailwind 4.x uses CSS-first configuration. Design tokens are defined using the `@theme` directive directly in your CSS file.

## Setup

```css
@import "tailwindcss";

@theme {
  /* Your design tokens here */
}
```

No `tailwind.config.js` required for most projects.

## Namespace Reference

### Colors (`--color-*`)

Generates: `bg-*`, `text-*`, `border-*`, `ring-*`, `outline-*`, `fill-*`, `stroke-*`, `accent-*`, `caret-*`, `decoration-*`, `shadow-*` (color), `divide-*`

```css
@theme {
  /* Semantic colors */
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.15 0 0);
  --color-primary: oklch(0.55 0.2 260);
  --color-primary-foreground: oklch(0.98 0 0);
  --color-secondary: oklch(0.85 0.03 260);
  --color-accent: oklch(0.65 0.18 150);
  --color-muted: oklch(0.92 0.01 260);
  --color-muted-foreground: oklch(0.55 0.02 260);
  
  /* Status colors */
  --color-success: oklch(0.65 0.2 145);
  --color-warning: oklch(0.75 0.18 80);
  --color-error: oklch(0.6 0.22 25);
  --color-info: oklch(0.6 0.15 240);
  
  /* Brand scale */
  --color-brand-50: oklch(0.97 0.02 260);
  --color-brand-100: oklch(0.93 0.04 260);
  --color-brand-200: oklch(0.87 0.08 260);
  --color-brand-300: oklch(0.78 0.12 260);
  --color-brand-400: oklch(0.68 0.16 260);
  --color-brand-500: oklch(0.55 0.2 260);
  --color-brand-600: oklch(0.48 0.18 260);
  --color-brand-700: oklch(0.40 0.15 260);
  --color-brand-800: oklch(0.33 0.12 260);
  --color-brand-900: oklch(0.27 0.09 260);
  --color-brand-950: oklch(0.20 0.07 260);
}
```

Usage: `bg-background`, `text-foreground`, `border-primary`, `bg-brand-500`

### Font Family (`--font-*`)

Generates: `font-*`

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Lora", ui-serif, Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --font-display: "Satoshi", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
}
```

Usage: `font-sans`, `font-display`, `font-body`

### Font Size (`--text-*`)

Generates: `text-*` (font-size)

```css
@theme {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --text-7xl: 4.5rem;
}
```

Usage: `text-sm`, `text-xl`, `text-4xl`

### Font Weight (`--font-weight-*`)

Generates: `font-*` (weight)

```css
@theme {
  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
}
```

Usage: `font-medium`, `font-bold`

### Line Height (`--leading-*`)

Generates: `leading-*`

```css
@theme {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

Usage: `leading-tight`, `leading-relaxed`

### Letter Spacing (`--tracking-*`)

Generates: `tracking-*`

```css
@theme {
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

Usage: `tracking-tight`, `tracking-wide`

### Spacing (`--spacing-*`)

Generates: `p-*`, `m-*`, `gap-*`, `w-*`, `h-*`, `inset-*`, `space-*`, etc.

```css
@theme {
  /* Extend default scale with custom values */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;
  --spacing-30: 7.5rem;
  
  /* Named spacing */
  --spacing-page: 2rem;
  --spacing-section: 4rem;
  --spacing-card: 1.5rem;
}
```

Usage: `p-18`, `gap-section`, `mt-page`

### Border Radius (`--radius-*`)

Generates: `rounded-*`

```css
@theme {
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
}
```

Usage: `rounded-md`, `rounded-xl`, `rounded-full`

### Shadows (`--shadow-*`)

Generates: `shadow-*`

```css
@theme {
  --shadow-xs: 0 1px 2px oklch(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px oklch(0 0 0 / 0.1), 0 1px 2px oklch(0 0 0 / 0.06);
  --shadow-md: 0 4px 6px oklch(0 0 0 / 0.1), 0 2px 4px oklch(0 0 0 / 0.06);
  --shadow-lg: 0 10px 15px oklch(0 0 0 / 0.1), 0 4px 6px oklch(0 0 0 / 0.05);
  --shadow-xl: 0 20px 25px oklch(0 0 0 / 0.1), 0 8px 10px oklch(0 0 0 / 0.04);
  --shadow-2xl: 0 25px 50px oklch(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px oklch(0 0 0 / 0.06);
  
  /* Colored shadows */
  --shadow-glow: 0 0 20px oklch(0.6 0.2 260 / 0.4);
}
```

Usage: `shadow-md`, `shadow-xl`, `shadow-glow`

### Breakpoints (`--breakpoint-*`)

Generates: responsive variants like `sm:`, `md:`, `lg:`

```css
@theme {
  --breakpoint-xs: 30rem;    /* 480px */
  --breakpoint-sm: 40rem;    /* 640px */
  --breakpoint-md: 48rem;    /* 768px */
  --breakpoint-lg: 64rem;    /* 1024px */
  --breakpoint-xl: 80rem;    /* 1280px */
  --breakpoint-2xl: 96rem;   /* 1536px */
  --breakpoint-3xl: 120rem;  /* 1920px */
}
```

Usage: `sm:flex`, `lg:grid-cols-3`, `xl:text-xl`

### Easing (`--ease-*`)

Generates: `ease-*`

```css
@theme {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

Usage: `ease-snappy`, `ease-bounce`

### Z-Index (`--z-*`)

Generates: `z-*`

```css
@theme {
  --z-0: 0;
  --z-10: 10;
  --z-20: 20;
  --z-30: 30;
  --z-40: 40;
  --z-50: 50;
  --z-dropdown: 100;
  --z-modal: 200;
  --z-toast: 300;
}
```

Usage: `z-10`, `z-modal`, `z-toast`

## Resetting Defaults

Use `initial` to clear default theme values:

```css
@theme {
  /* Clear ALL default colors */
  --color-*: initial;
  
  /* Now define only your colors */
  --color-white: #fff;
  --color-black: #000;
  --color-background: oklch(0.98 0 0);
  --color-foreground: oklch(0.15 0 0);
}
```

Clear specific namespaces:
- `--color-*: initial;` — removes all default colors (red, blue, gray, etc.)
- `--font-*: initial;` — removes default font families
- `--breakpoint-*: initial;` — removes default breakpoints

## Dark Mode Setup

### Class-based dark mode

```css
@import "tailwindcss";

/* Enable class-based dark mode */
@custom-variant dark (&:where(.dark, .dark *));

/* Define CSS variables that change with theme */
@layer base {
  :root {
    --background: oklch(0.98 0 0);
    --foreground: oklch(0.15 0 0);
    --primary: oklch(0.55 0.2 260);
    --muted: oklch(0.92 0.01 260);
  }
  
  .dark {
    --background: oklch(0.12 0.02 260);
    --foreground: oklch(0.95 0 0);
    --primary: oklch(0.65 0.2 260);
    --muted: oklch(0.22 0.02 260);
  }
}

/* Reference variables in @theme */
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-muted: var(--muted);
}
```

Toggle dark mode by adding `.dark` class to `<html>` or `<body>`.

## Custom Utilities

Define custom utilities with `@utility`:

```css
@utility text-balance {
  text-wrap: balance;
}

@utility scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```

## Custom Variants

Define custom variants with `@custom-variant`:

```css
@custom-variant hocus (&:hover, &:focus);
@custom-variant group-hocus (:merge(.group):hover &, :merge(.group):focus &);
```

Usage: `hocus:bg-primary`, `group-hocus:text-white`

## Complete Example

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  :root {
    --bg: oklch(0.98 0 0);
    --fg: oklch(0.15 0.02 260);
    --primary: oklch(0.55 0.2 260);
    --primary-fg: oklch(0.98 0 0);
    --muted: oklch(0.92 0.01 260);
    --muted-fg: oklch(0.45 0.02 260);
    --border: oklch(0.88 0.01 260);
  }
  
  .dark {
    --bg: oklch(0.12 0.02 260);
    --fg: oklch(0.95 0 0);
    --primary: oklch(0.65 0.2 260);
    --primary-fg: oklch(0.12 0 0);
    --muted: oklch(0.22 0.02 260);
    --muted-fg: oklch(0.65 0.01 260);
    --border: oklch(0.28 0.02 260);
  }
}

@theme {
  /* Reset defaults if desired */
  /* --color-*: initial; */
  
  /* Semantic colors */
  --color-background: var(--bg);
  --color-foreground: var(--fg);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-fg);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-fg);
  --color-border: var(--border);
  
  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Satoshi", system-ui, sans-serif;
  
  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px oklch(0 0 0 / 0.08);
  --shadow-md: 0 4px 12px oklch(0 0 0 / 0.1);
}
```

Usage in HTML:
```html
<div class="bg-background text-foreground">
  <button class="bg-primary text-primary-foreground rounded-md shadow-sm">
    Click me
  </button>
  <p class="text-muted-foreground">Muted text</p>
</div>
```
