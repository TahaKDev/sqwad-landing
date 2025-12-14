---
name: css-mastery
description: Modern CSS patterns, advanced selectors, layout techniques, and browser-native features. Use when working with custom CSS, complex layouts, CSS architecture, or when Tailwind isn't enough.
---

# CSS Mastery - Modern CSS Patterns & Techniques

## Philosophy

CSS is not a limitation, it's a superpower. Master the platform before reaching for abstractions. Modern CSS can do things that required JavaScript five years ago. Write CSS that's maintainable, performant, and delightful.

---

## 1. Modern Selectors

### :has() - The Parent Selector (Game Changer)
```css
/* Style parent based on child */
.card:has(img) {
  padding: 0;
}

/* Form validation styling */
.form-group:has(input:invalid) {
  border-color: var(--color-error);
}

/* Conditional layouts */
.grid:has(> :nth-child(4)) {
  grid-template-columns: repeat(2, 1fr);
}

/* Style based on sibling state */
label:has(+ input:focus) {
  color: var(--color-brand);
}
```

### :is() and :where() - Selector Grouping
```css
/* :is() - takes highest specificity of its arguments */
:is(h1, h2, h3, h4):hover {
  color: var(--color-brand);
}

/* :where() - zero specificity (easy to override) */
:where(article, section, aside) p {
  line-height: 1.7;
}

/* Complex selectors simplified */
:is(.card, .panel, .box):is(:hover, :focus-within) {
  box-shadow: var(--shadow-lg);
}
```

### :not() - Enhanced Negation
```css
/* Multiple arguments */
button:not(.primary, .secondary, .ghost) {
  background: var(--color-gray-100);
}

/* Complex negations */
.nav-item:not(:last-child):not(.active) {
  border-right: 1px solid var(--color-border);
}
```

### Attribute Selectors
```css
/* Contains */
[class*="btn-"] { /* matches btn-primary, btn-secondary */ }

/* Starts with */
[href^="https://"] { /* external links */ }

/* Ends with */
[href$=".pdf"] { /* PDF links */ }

/* Case insensitive */
[type="submit" i] { /* matches Submit, SUBMIT, submit */ }
```

---

## 2. CSS Custom Properties (Variables)

### Design Tokens System
```css
:root {
  /* Colors */
  --color-brand-50: #faf5ff;
  --color-brand-100: #f3e8ff;
  --color-brand-500: #a855f7;
  --color-brand-600: #9333ea;
  --color-brand-900: #581c87;
  
  /* Semantic colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-bg-primary: white;
  --color-bg-secondary: var(--color-gray-50);
  
  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Cal Sans', var(--font-sans);
  --font-mono: 'JetBrains Mono', monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Borders */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
  
  /* Z-index scale */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-popover: 400;
  --z-tooltip: 500;
}

/* Dark mode override */
[data-theme="dark"] {
  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-400);
  --color-bg-primary: var(--color-gray-950);
  --color-bg-secondary: var(--color-gray-900);
}
```

### Dynamic Values
```css
/* Component-scoped variables */
.btn {
  --btn-padding-x: var(--space-4);
  --btn-padding-y: var(--space-2);
  --btn-bg: var(--color-brand-600);
  --btn-color: white;
  
  padding: var(--btn-padding-y) var(--btn-padding-x);
  background: var(--btn-bg);
  color: var(--btn-color);
}

.btn--sm {
  --btn-padding-x: var(--space-3);
  --btn-padding-y: var(--space-1);
}

.btn--lg {
  --btn-padding-x: var(--space-6);
  --btn-padding-y: var(--space-3);
}

/* Dynamic color manipulation */
.card {
  --card-hue: 250;
  background: hsl(var(--card-hue) 50% 95%);
  border-color: hsl(var(--card-hue) 50% 80%);
}
```

---

## 3. Modern Layout

### CSS Grid - Advanced Patterns

#### Auto-Fill vs Auto-Fit
```css
/* auto-fill: creates empty tracks */
.grid-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-6);
}

/* auto-fit: collapses empty tracks */
.grid-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}
```

#### Subgrid
```css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.child-grid {
  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid; /* Inherits parent columns */
}
```

#### Named Grid Areas
```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive change */
@media (max-width: 768px) {
  .layout {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
  }
  
  .sidebar, .aside { display: none; }
}
```

#### Masonry-like with Grid
```css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
  gap: var(--space-4);
}

.masonry-item {
  /* JS calculates span based on content height */
  grid-row: span var(--row-span, 20);
}
```

### Container Queries
```css
/* Define container */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Query container width */
@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: var(--space-4);
  }
  
  .card-image {
    width: 40%;
  }
}

@container card (min-width: 600px) {
  .card {
    padding: var(--space-8);
  }
  
  .card-title {
    font-size: var(--text-2xl);
  }
}

/* Container query units */
.card-title {
  font-size: clamp(1rem, 5cqi, 2rem); /* cqi = container query inline */
}
```

### Flexbox Modern Patterns
```css
/* Gap (finally!) */
.flex-row {
  display: flex;
  gap: var(--space-4);
}

/* Wrap with gap */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* Sticky footer */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

/* Equal height cards */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1; /* Fills available space */
}
```

---

## 4. Typography

### Fluid Typography with clamp()
```css
:root {
  /* Fluid type scale */
  --text-fluid-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-fluid-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-fluid-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-fluid-xl: clamp(1.25rem, 1rem + 1.25vw, 1.875rem);
  --text-fluid-2xl: clamp(1.5rem, 1rem + 2.5vw, 2.5rem);
  --text-fluid-3xl: clamp(1.875rem, 1rem + 4.375vw, 3.75rem);
  --text-fluid-4xl: clamp(2.25rem, 1rem + 6.25vw, 5rem);
}

h1 {
  font-size: var(--text-fluid-4xl);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

### Text Wrap Control
```css
/* Balance - even line lengths */
.headline {
  text-wrap: balance;
  max-width: 20ch;
}

/* Pretty - avoid orphans */
.body-text {
  text-wrap: pretty;
}
```

### Advanced Text Styling
```css
/* Multi-line truncation */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Text gradient */
.gradient-text {
  background: linear-gradient(135deg, var(--color-brand-500), var(--color-purple-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Text stroke */
.outline-text {
  -webkit-text-stroke: 2px var(--color-brand-500);
  -webkit-text-fill-color: transparent;
}

/* Variable fonts */
.variable-font {
  font-variation-settings: 'wght' 600, 'wdth' 100;
  transition: font-variation-settings 0.3s ease;
}

.variable-font:hover {
  font-variation-settings: 'wght' 800, 'wdth' 110;
}
```

---

## 5. Colors & Gradients

### Modern Color Functions
```css
/* oklch - perceptually uniform */
:root {
  --brand-l: 65%;
  --brand-c: 0.25;
  --brand-h: 280;
  
  --color-brand: oklch(var(--brand-l) var(--brand-c) var(--brand-h));
  --color-brand-light: oklch(calc(var(--brand-l) + 20%) var(--brand-c) var(--brand-h));
  --color-brand-dark: oklch(calc(var(--brand-l) - 20%) var(--brand-c) var(--brand-h));
}

/* color-mix() */
.overlay {
  background: color-mix(in oklch, var(--color-brand) 20%, transparent);
}

/* Relative color syntax */
.hover-state {
  --base-color: oklch(60% 0.2 280);
  background: oklch(from var(--base-color) calc(l + 10%) c h);
}
```

### Advanced Gradients
```css
/* Mesh gradient simulation */
.mesh-bg {
  background:
    radial-gradient(at 40% 20%, hsla(280, 100%, 74%, 0.8) 0, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.6) 0, transparent 50%),
    radial-gradient(at 0% 50%, hsla(355, 85%, 63%, 0.5) 0, transparent 50%),
    radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.4) 0, transparent 50%),
    radial-gradient(at 0% 100%, hsla(269, 100%, 77%, 0.4) 0, transparent 50%),
    linear-gradient(180deg, var(--color-gray-950), var(--color-gray-900));
}

/* Animated gradient */
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.animated-gradient {
  --gradient-angle: 0deg;
  background: conic-gradient(
    from var(--gradient-angle),
    var(--color-brand-500),
    var(--color-purple-500),
    var(--color-pink-500),
    var(--color-brand-500)
  );
  animation: rotate-gradient 3s linear infinite;
}

@keyframes rotate-gradient {
  to { --gradient-angle: 360deg; }
}

/* Gradient border */
.gradient-border {
  position: relative;
  background: var(--color-bg-primary);
  border-radius: var(--radius-lg);
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, var(--color-brand-500), var(--color-purple-500));
  border-radius: inherit;
  z-index: -1;
}
```

---

## 6. Animations & Transitions

### View Transitions API
```css
/* Page transition */
::view-transition-old(root) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}

/* Named transitions */
.card {
  view-transition-name: card;
}

::view-transition-old(card) {
  animation: scale-out 0.3s ease-out;
}

::view-transition-new(card) {
  animation: scale-in 0.3s ease-in;
}
```

### Scroll-Driven Animations
```css
/* Animation timeline */
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-on-scroll {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

/* Progress bar on scroll */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--color-brand-500);
  transform-origin: left;
  animation: grow-progress linear;
  animation-timeline: scroll();
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

### @starting-style (Entry Animations)
```css
/* Animate from display: none */
.modal {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s, transform 0.3s, display 0.3s allow-discrete;
}

.modal[hidden] {
  opacity: 0;
  transform: scale(0.95);
  display: none;
}

@starting-style {
  .modal {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

### Performant Animations
```css
/* Only animate transform and opacity for 60fps */
.animate-safe {
  will-change: transform, opacity;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Avoid layout thrashing */
.bad {
  transition: width 0.3s; /* Causes reflow */
}

.good {
  transition: transform 0.3s; /* Composited */
  transform: scaleX(0);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Visual Effects

### backdrop-filter
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Frosted glass header */
.header-glass {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
```

### Filters
```css
/* Image treatments */
.grayscale-hover {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.grayscale-hover:hover {
  filter: grayscale(0%);
}

/* Glow effect */
.glow {
  filter: drop-shadow(0 0 10px var(--color-brand-500));
}

/* Duotone effect */
.duotone {
  filter: grayscale(100%) contrast(1.2);
  position: relative;
}

.duotone::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-brand-500);
  mix-blend-mode: multiply;
}
```

### Blend Modes
```css
/* Text over image */
.blend-overlay {
  background: linear-gradient(var(--color-brand-900), var(--color-brand-900));
  background-blend-mode: multiply;
}

/* Creative effects */
.blend-text {
  color: white;
  mix-blend-mode: difference;
}
```

### Masks & Clip Paths
```css
/* Gradient mask for fade effect */
.fade-mask {
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}

/* Shape clipping */
.diagonal-clip {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

.circle-clip {
  clip-path: circle(50%);
}

/* Animated clip-path */
.reveal-clip {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.6s ease;
}

.reveal-clip.visible {
  clip-path: inset(0 0 0 0);
}
```

---

## 8. Responsive Design

### Modern Responsive Units
```css
/* Viewport units */
.full-height {
  height: 100dvh; /* Dynamic viewport height - accounts for mobile UI */
}

/* Container query units */
.responsive-text {
  font-size: clamp(1rem, 2cqi + 0.5rem, 2rem);
}

/* Logical properties */
.card {
  margin-inline: auto; /* left/right in LTR */
  padding-block: var(--space-4); /* top/bottom */
  border-inline-start: 3px solid var(--color-brand-500); /* left in LTR */
}
```

### Fluid Spacing
```css
:root {
  --space-fluid-1: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-fluid-2: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  --space-fluid-4: clamp(1rem, 0.8rem + 1vw, 2rem);
  --space-fluid-8: clamp(2rem, 1.5rem + 2.5vw, 4rem);
  --space-fluid-16: clamp(4rem, 3rem + 5vw, 8rem);
}

.section {
  padding-block: var(--space-fluid-16);
}
```

### Responsive Images
```css
/* Object-fit */
.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Aspect ratio */
.thumbnail {
  aspect-ratio: 16 / 9;
}

.avatar {
  aspect-ratio: 1;
  border-radius: 50%;
}

/* Art direction with picture */
.responsive-img {
  width: 100%;
  height: auto;
}
```

---

## 9. Accessibility

### Focus Management
```css
/* Modern focus-visible */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-brand-500);
  outline-offset: 2px;
}

/* Focus within */
.input-group:focus-within {
  border-color: var(--color-brand-500);
  box-shadow: 0 0 0 3px var(--color-brand-500-alpha);
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Provide alternative */
.animated-element {
  animation: bounce 1s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    /* Maybe a subtle opacity change instead */
    opacity: 0.9;
  }
}
```

### Color Contrast
```css
/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --color-text-primary: black;
    --color-bg-primary: white;
    --color-border: black;
  }
  
  .btn {
    border: 2px solid currentColor;
  }
}

/* Forced colors (Windows High Contrast) */
@media (forced-colors: active) {
  .btn {
    border: 2px solid ButtonText;
  }
}
```

### Screen Reader Utilities
```css
/* Visually hidden but accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-brand-500);
  color: white;
  padding: var(--space-2) var(--space-4);
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## 10. CSS Architecture

### CUBE CSS Methodology
```css
/* Composition - layout primitives */
.flow > * + * {
  margin-top: var(--flow-space, 1em);
}

.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-space, 1rem);
}

.sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sidebar-gap, 1rem);
}

.sidebar > :first-child {
  flex-basis: var(--sidebar-width, 20rem);
  flex-grow: 1;
}

.sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-width: var(--sidebar-min, 50%);
}

/* Utility - single purpose */
.text-center { text-align: center; }
.font-bold { font-weight: 700; }

/* Block - component specific */
.card { /* scoped styles */ }

/* Exception - state variations */
.card[data-featured] { /* featured state */ }
```

### Layer Organization
```css
@layer reset, base, layout, components, utilities;

@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

@layer base {
  :root {
    /* tokens */
  }
  
  body {
    font-family: var(--font-sans);
    line-height: 1.5;
  }
}

@layer layout {
  .container { /* ... */ }
  .grid { /* ... */ }
}

@layer components {
  .btn { /* ... */ }
  .card { /* ... */ }
}

@layer utilities {
  .sr-only { /* ... */ }
  .text-center { /* ... */ }
}
```

---

## 11. Performance

### Critical CSS Pattern
```css
/* Inline in <head> - above the fold only */
:root { /* essential tokens */ }
body { /* base styles */ }
.header { /* header styles */ }
.hero { /* hero section */ }

/* Load rest async */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Containment
```css
/* Isolate layout calculations */
.card {
  contain: layout style paint;
}

/* Full containment for off-screen content */
.virtualized-item {
  contain: strict;
  content-visibility: auto;
  contain-intrinsic-size: 0 200px;
}
```

### Will-Change (Use Sparingly)
```css
/* Only when needed, remove after */
.animate-soon {
  will-change: transform;
}

/* Don't do this */
* {
  will-change: transform, opacity; /* BAD - wastes memory */
}
```

---

## 12. Common Patterns

### Aspect Ratio Box
```css
.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-square {
  aspect-ratio: 1;
}

/* Fallback for old browsers */
.aspect-ratio-box {
  position: relative;
}

.aspect-ratio-box::before {
  content: '';
  display: block;
  padding-top: 56.25%; /* 16:9 */
}

.aspect-ratio-box > * {
  position: absolute;
  inset: 0;
}
```

### Truncation
```css
/* Single line */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Overlay
```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  z-index: var(--z-modal);
}
```

### Sticky Header with Shadow on Scroll
```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-bg-primary);
  transition: box-shadow 0.2s ease;
}

.header.scrolled {
  box-shadow: var(--shadow-md);
}
```

---

## Golden Rules

1. **Use modern CSS** — :has(), container queries, subgrid are ready
2. **Design tokens first** — Custom properties for everything configurable
3. **Mobile-first always** — Base styles = mobile, enhance up
4. **Logical properties** — Use inline/block for RTL support
5. **Fluid > fixed** — clamp() for typography and spacing
6. **Animate transforms** — Only transform and opacity for 60fps
7. **Accessibility built-in** — Focus states, reduced motion, contrast
8. **Performance matters** — Contain, content-visibility, critical CSS
9. **Progressive enhancement** — Works without latest features
10. **Keep it simple** — Complex CSS is hard to maintain

---

## Browser Support Check

Before using cutting-edge features, verify support:
- **:has()** — All modern browsers (2023+)
- **Container queries** — All modern browsers (2023+)
- **Subgrid** — All modern browsers (2023+)
- **oklch()** — All modern browsers (2023+)
- **@layer** — All modern browsers (2022+)
- **View Transitions** — Chrome/Edge (Safari coming)
- **Scroll-driven animations** — Chrome/Edge (limited elsewhere)

Use @supports for graceful degradation:
```css
@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
  }
}

@supports not (container-type: inline-size) {
  /* Fallback with media queries */
}
```