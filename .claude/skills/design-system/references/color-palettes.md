# Color Palette Reference

## Starter Palettes

### Neutral Foundations

**Slate** (cool, professional)
```
50: #f8fafc, 100: #f1f5f9, 200: #e2e8f0, 300: #cbd5e1, 400: #94a3b8
500: #64748b, 600: #475569, 700: #334155, 800: #1e293b, 900: #0f172a, 950: #020617
```

**Zinc** (pure neutral)
```
50: #fafafa, 100: #f4f4f5, 200: #e4e4e7, 300: #d4d4d8, 400: #a1a1aa
500: #71717a, 600: #52525b, 700: #3f3f46, 800: #27272a, 900: #18181b, 950: #09090b
```

**Stone** (warm neutral)
```
50: #fafaf9, 100: #f5f5f4, 200: #e7e5e4, 300: #d6d3d1, 400: #a8a29e
500: #78716c, 600: #57534e, 700: #44403c, 800: #292524, 900: #1c1917, 950: #0c0a09
```

### Accent Colors

**Blue** (trust, calm, professional)
```
500: #3b82f6, 600: #2563eb, 700: #1d4ed8
```

**Indigo** (creative, modern)
```
500: #6366f1, 600: #4f46e5, 700: #4338ca
```

**Violet** (premium, innovative)
```
500: #8b5cf6, 600: #7c3aed, 700: #6d28d9
```

**Emerald** (growth, health, success)
```
500: #10b981, 600: #059669, 700: #047857
```

**Amber** (energy, warmth, warning)
```
500: #f59e0b, 600: #d97706, 700: #b45309
```

**Rose** (bold, energetic, playful)
```
500: #f43f5e, 600: #e11d48, 700: #be123c
```

## Semantic Color Mapping

```
Success:  emerald-500 / green-500
Warning:  amber-500 / yellow-500
Error:    red-500 / rose-500
Info:     blue-500 / sky-500
```

## Palette Generation Techniques

### Monochromatic
Single hue, vary saturation and lightness. Safe, cohesive, can feel flat.

### Complementary
Opposite on color wheel (blue + orange). High contrast, use accent sparingly.

### Analogous
Adjacent hues (blue + indigo + violet). Harmonious, low tension.

### Split-Complementary
Base + two colors adjacent to complement. Balanced contrast.

### Triadic
Three equidistant hues. Vibrant, needs careful balance.

## Dark Mode Adjustments

1. **Don't pure invert** — #000 bg is harsh; use gray-900 or gray-950
2. **Reduce contrast** — White on black is harder to read; use gray-100/200 for text
3. **Desaturate slightly** — Vivid colors feel harsh on dark; reduce saturation 10-20%
4. **Elevation = lighter** — Surfaces closer to user should be lighter (opposite of light mode shadows)
5. **Maintain semantic meaning** — Error is still red, success still green

## Contrast Checking

WCAG AA requirements:
- **4.5:1** minimum for normal text
- **3:1** minimum for large text (18px+ or 14px+ bold)
- **3:1** minimum for UI components and graphics

Tools: WebAIM Contrast Checker, Stark, Polypane
