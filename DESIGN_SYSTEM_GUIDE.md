# ID8Labs Design System - Quick Reference

## Color System

### CSS Variables
```css
/* Light Mode */
--bg-primary: #FFFFFF
--bg-secondary: #FAFAFA
--bg-tertiary: #F5F5F5
--text-primary: #0A0A0A
--text-secondary: #737373
--text-tertiary: #A3A3A3
--border: #E5E5E5

/* Brand Orange */
--id8-orange: #FF6B35
--id8-orange-hover: #E85A28
--id8-orange-light: #FFE8DF
--id8-orange-dark: #D14D1F

/* Accent Colors */
--accent-blue: #3B82F6
--accent-purple: #A855F7
--accent-green: #10B981
--accent-amber: #F59E0B
```

### Usage in Components
```jsx
// CSS Variable (preferred)
<div className="bg-[var(--bg-primary)] text-[var(--text-primary)]">

// Utility Classes
<div className="text-id8-orange bg-id8-orange-light">
```

---

## Typography Scale

### Heading Sizes
```jsx
// H1 - Hero Headlines
<h1 className="text-[clamp(3.5rem,10vw,7rem)]">
  // Scales from 56px to 112px

// H2 - Section Headers
<h2 className="text-5xl md:text-6xl lg:text-7xl">
  // 3rem → 4rem → 4.5rem

// H3 - Subsection Headers
<h3 className="text-2xl md:text-3xl">
  // 1.5rem → 1.875rem
```

### Text Effects
```jsx
// Gradient Text
<span className="text-gradient-orange">id8Labs</span>

// Text Shadow
<h1 className="text-shadow-md">Headline</h1>

// Outlined Text (available but not used yet)
<span className="text-outline">BOLD</span>
```

---

## Shadow System

### Multi-Layer Shadows
```jsx
// Small - Subtle elevation
box-shadow: var(--shadow-sm)

// Medium - Card hover
box-shadow: var(--shadow-md)

// Large - Featured items
box-shadow: var(--shadow-lg)

// Extra Large - Popovers
box-shadow: var(--shadow-xl)

// 2XL - Modals, major emphasis
box-shadow: var(--shadow-2xl)
```

### Glow Effects (Hover)
```jsx
// Orange Glow
box-shadow: var(--glow-orange)

// Blue Glow
box-shadow: var(--glow-blue)

// Combined with shadow
box-shadow: var(--shadow-xl), var(--glow-orange)
```

---

## Card System

### Base Card
```jsx
<div className="card">
  // Standard card with hover lift
</div>
```

**Result**:
- White/dark background
- 1px border
- 1rem border-radius
- Hover: Lifts 4px + xl shadow

### Featured Card
```jsx
<div className="card-featured">
  // Hero/featured content
</div>
```

**Result**:
- 2px orange border
- 4px gradient accent bar on top
- 3rem padding
- Hover: Lifts 8px + scale 1.02 + glow

### Interactive Card
```jsx
<div className="card card-interactive">
  // Clickable card
</div>
```

**Result**:
- Base card styles
- Cursor pointer
- Active: Scale down to 0.98

---

## Button System

### Primary Button
```jsx
<button className="btn btn-primary">
  Launch App
</button>
```

**Result**: Orange fill, white text, glow on hover

### Secondary Button
```jsx
<button className="btn btn-secondary">
  Learn More
</button>
```

**Result**: Orange outline, orange text, fills on hover

### Ghost Button
```jsx
<button className="btn btn-ghost">
  Cancel
</button>
```

**Result**: Gray outline, text color, subtle hover

### Button with Icon
```jsx
<button className="btn btn-primary group">
  Launch
  <svg className="group-hover:translate-x-1 transition-transform">
    {/* arrow icon */}
  </svg>
</button>
```

---

## Badge System

### Status Badges
```jsx
// Shipping (Orange)
<span className="badge badge-shipping">
  <div className="w-1.5 h-1.5 bg-[var(--id8-orange)] rounded-full animate-pulse" />
  v0.8.1 • Live
</span>

// Development (Blue)
<span className="badge badge-development">
  Technical architecture complete
</span>

// Exploration (Purple)
<span className="badge badge-exploration">
  Early exploration
</span>

// Personal (Green)
<span className="badge badge-personal">
  Foundation sprint active
</span>
```

---

## Layout System

### Container
```jsx
// Standard container (1400px max)
<div className="container">

// Narrow container (1140px max)
<div className="container-narrow">
```

### Section Spacing
```jsx
// Standard section spacing
<section className="section-spacing">
  // 5rem → 10rem padding

// Small section spacing
<section className="section-spacing-sm">
  // 3rem → 6rem padding

// Large section spacing
<section className="section-spacing-lg">
  // 8rem → 15rem padding
```

---

## Animation Utilities

### Hover Effects
```jsx
// Lift on hover
<div className="hover-lift">

// Scale on hover
<div className="hover-scale">
```

### Keyframe Animations
```jsx
// Floating effect
<div className="animate-float">

// Pulsing glow
<div className="animate-pulse-glow">

// Gradient shift
<div className="animate-gradient">
```

---

## Common Patterns

### Hero Section
```jsx
<section className="relative min-h-[90vh] flex items-center overflow-hidden">
  <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--id8-orange)]/10 via-transparent to-transparent blur-3xl" />
  </div>

  <div className="container relative z-10">
    {/* Hero content */}
  </div>
</section>
```

### Section Header (Asymmetric)
```jsx
<div className="mb-16 max-w-3xl">
  <h2 className="text-5xl md:text-6xl font-bold mb-6">
    What's Happening
    <br />
    <span className="text-gradient-orange">in the Lab</span>
  </h2>
  <p className="text-xl text-[var(--text-secondary)]">
    Descriptive subtitle
  </p>
</div>
```

### Two-Column Asymmetric
```jsx
<div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
  <div className="lg:sticky lg:top-24">
    {/* Left: Large headline (sticky) */}
  </div>
  <div>
    {/* Right: Content stack */}
  </div>
</div>
```

### Bullet List with Animated Dots
```jsx
<div className="space-y-6">
  <div className="group">
    <div className="flex items-start gap-4">
      <div className="w-2 h-2 bg-[var(--id8-orange)] rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
      <p className="text-xl md:text-2xl">
        Content with <span className="text-[var(--id8-orange)] font-semibold">orange accent</span>
      </p>
    </div>
  </div>
</div>
```

### Status Indicator
```jsx
<div className="flex items-center gap-2">
  <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse" />
  <span className="text-sm text-[var(--text-tertiary)]">Live</span>
</div>
```

---

## Responsive Breakpoints

```css
/* Mobile First */
Base: < 768px
md: >= 768px (tablet)
lg: >= 1024px (desktop)
xl: >= 1280px (large desktop)
```

### Usage
```jsx
<h1 className="text-4xl md:text-6xl lg:text-7xl">
  // 2.25rem → 3.75rem → 4.5rem

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  // 1 col → 2 cols → 3 cols
```

---

## Dark Mode

All colors automatically adapt via CSS variables:

```jsx
// In layout/header
<button onClick={toggleTheme}>
  Toggle Theme
</button>

// In HTML root
<html className={isDark ? 'dark' : ''}>
```

The `dark` class on `<html>` switches all `--var()` values automatically.

---

## Accessibility

### Focus States
All interactive elements have automatic focus styles:
```css
*:focus-visible {
  outline: 2px solid var(--id8-orange);
  outline-offset: 4px;
}
```

### ARIA Labels
```jsx
<button aria-label="Toggle theme">
  <svg>{/* icon */}</svg>
</button>
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
}
```

---

## Tips for Consistency

1. **Always use CSS variables** for colors: `var(--text-primary)` not hardcoded hex
2. **Use utility classes** from globals.css when possible: `.card`, `.btn`, `.badge`
3. **Leverage clamp()** for fluid typography: `text-[clamp(2rem,5vw,4rem)]`
4. **Add hover states** to all interactive elements
5. **Use the shadow system** instead of custom shadows
6. **Maintain the visual hierarchy**: Featured items should be noticeably larger
7. **Test in both light and dark mode** before committing
8. **Check mobile** - asymmetric layouts should stack gracefully

---

## Quick Copy-Paste Components

### CTA Button with Arrow
```jsx
<a
  href="/path"
  className="btn btn-primary hover-lift group"
>
  Action Text
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="transition-transform group-hover:translate-x-1"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
</a>
```

### Featured Card
```jsx
<a href="/product" className="block">
  <div className="card-featured group cursor-pointer">
    <div className="flex items-center gap-3 mb-6">
      <span className="badge badge-shipping">
        <div className="w-1.5 h-1.5 bg-[var(--id8-orange)] rounded-full animate-pulse" />
        Live
      </span>
    </div>

    <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-orange">
      Product Name
    </h3>

    <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8">
      Description text
    </p>

    <div className="flex items-center gap-3 text-[var(--id8-orange)] font-semibold text-lg group-hover:gap-4 transition-all">
      Launch App
      <svg>...</svg>
    </div>
  </div>
</a>
```

### Standard Card
```jsx
<div className="card group cursor-pointer h-full flex flex-col">
  <div className="mb-4">
    <span className="badge badge-development">
      In Development
    </span>
  </div>

  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[var(--id8-orange)] transition-colors">
    Product Name
  </h3>

  <p className="text-[var(--text-secondary)] mb-6 flex-grow">
    Description
  </p>

  <div className="flex items-center gap-2 text-[var(--id8-orange)] font-semibold group-hover:gap-3 transition-all">
    Learn more
    <svg>...</svg>
  </div>
</div>
```

---

## File Reference

- **Design System**: `/app/globals.css`
- **Tailwind Config**: `/tailwind.config.ts`
- **Components**: `/components/*.tsx`
- **Documentation**: `/REDESIGN_SUMMARY.md`, `/REDESIGN_CHECKLIST.md`

---

## Support

Questions? Check the component source code for implementation examples:
- Hero: `/components/Hero.tsx`
- ProductGrid: `/components/ProductGrid.tsx`
- Mission: `/components/Mission.tsx`
- Builder: `/components/Builder.tsx`
