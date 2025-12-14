---
name: tailwind-patterns
description: Expert-level Tailwind CSS patterns for building modern, responsive, maintainable UIs. Use when working with Tailwind configuration, component patterns, responsive design, or design system implementation.
---

# Tailwind CSS Patterns & Best Practices

## Philosophy

Utility-first doesn't mean utility-only. Master the utilities, then extract components. Every class should earn its place. Consistency over creativity in systems, creativity within constraints.

---

## 1. Project Setup

### Installation
```bash
# Vite + Tailwind
npm create vite@latest my-project -- --template vanilla
cd my-project
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Minimal Config
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### CSS Entry Point
```css
/* src/styles/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  html {
    @apply scroll-smooth antialiased;
  }
  
  body {
    @apply bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100;
  }
  
  /* Focus visible for accessibility */
  :focus-visible {
    @apply outline-none ring-2 ring-violet-500 ring-offset-2;
  }
}
```

---

## 2. Configuration Avancée

### Design Tokens
```javascript
// tailwind.config.js
export default {
  theme: {
    // Override defaults completely
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      
      // Brand colors with full scale
      brand: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87',
        950: '#3b0764',
      },
      
      // Semantic colors
      success: {
        light: '#ecfdf5',
        DEFAULT: '#10b981',
        dark: '#065f46',
      },
      warning: {
        light: '#fffbeb',
        DEFAULT: '#f59e0b',
        dark: '#92400e',
      },
      error: {
        light: '#fef2f2',
        DEFAULT: '#ef4444',
        dark: '#991b1b',
      },
      
      // Neutral scale
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
    },
    
    // Extend (add to defaults)
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter var', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.1)',
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'url("/mesh-gradient.svg")',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
      },
      
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      zIndex: {
        'dropdown': '100',
        'sticky': '200',
        'overlay': '300',
        'modal': '400',
        'popover': '500',
        'tooltip': '600',
      },
    },
  },
}
```

### Custom Plugins
```javascript
// tailwind.config.js
import plugin from 'tailwindcss/plugin'

export default {
  plugins: [
    // Text balance
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
      })
    }),
    
    // Scrollbar hide
    plugin(function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    }),
    
    // Animation delay utilities
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animation-delay': (value) => ({
            'animation-delay': value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),
    
    // Fluid typography
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-fluid-xs': {
          'font-size': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        },
        '.text-fluid-sm': {
          'font-size': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        },
        '.text-fluid-base': {
          'font-size': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        },
        '.text-fluid-lg': {
          'font-size': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        },
        '.text-fluid-xl': {
          'font-size': 'clamp(1.25rem, 1rem + 1.25vw, 1.875rem)',
        },
        '.text-fluid-2xl': {
          'font-size': 'clamp(1.5rem, 1rem + 2.5vw, 2.5rem)',
        },
        '.text-fluid-3xl': {
          'font-size': 'clamp(1.875rem, 1rem + 4vw, 3.75rem)',
        },
        '.text-fluid-4xl': {
          'font-size': 'clamp(2.25rem, 1rem + 6vw, 5rem)',
        },
      })
    }),
  ],
}
```

---

## 3. Component Patterns

### Buttons
```css
@layer components {
  /* Base button */
  .btn {
    @apply inline-flex items-center justify-center gap-2
           font-medium rounded-lg
           transition-all duration-200
           focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
           disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none;
  }
  
  /* Sizes */
  .btn-sm {
    @apply px-3 py-1.5 text-sm;
  }
  
  .btn-md {
    @apply px-4 py-2 text-sm;
  }
  
  .btn-lg {
    @apply px-6 py-3 text-base;
  }
  
  .btn-xl {
    @apply px-8 py-4 text-lg;
  }
  
  /* Variants */
  .btn-primary {
    @apply bg-brand-600 text-white
           hover:bg-brand-700
           active:bg-brand-800
           focus-visible:ring-brand-500;
  }
  
  .btn-secondary {
    @apply bg-gray-100 text-gray-900
           hover:bg-gray-200
           active:bg-gray-300
           focus-visible:ring-gray-500
           dark:bg-gray-800 dark:text-gray-100
           dark:hover:bg-gray-700;
  }
  
  .btn-outline {
    @apply border-2 border-brand-600 text-brand-600 bg-transparent
           hover:bg-brand-600 hover:text-white
           active:bg-brand-700
           focus-visible:ring-brand-500;
  }
  
  .btn-ghost {
    @apply text-gray-600 bg-transparent
           hover:bg-gray-100 hover:text-gray-900
           active:bg-gray-200
           focus-visible:ring-gray-500
           dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100;
  }
  
  .btn-danger {
    @apply bg-error text-white
           hover:bg-red-600
           active:bg-red-700
           focus-visible:ring-red-500;
  }
  
  /* With glow effect */
  .btn-glow {
    @apply shadow-lg shadow-brand-500/25
           hover:shadow-xl hover:shadow-brand-500/40
           hover:scale-105
           active:scale-95;
  }
  
  /* Icon only */
  .btn-icon {
    @apply p-2 aspect-square;
  }
}
```

```html
<!-- Usage -->
<button class="btn btn-md btn-primary btn-glow">
  Get Started
</button>

<button class="btn btn-lg btn-outline">
  Learn More
</button>

<button class="btn btn-icon btn-ghost">
  <IconMenu class="w-5 h-5" />
</button>
```

### Cards
```css
@layer components {
  .card {
    @apply rounded-2xl bg-white
           border border-gray-200
           shadow-sm
           dark:bg-gray-900 dark:border-gray-800;
  }
  
  .card-hover {
    @apply transition-all duration-300
           hover:shadow-lg hover:border-gray-300
           hover:-translate-y-1
           dark:hover:border-gray-700;
  }
  
  .card-glass {
    @apply bg-white/80 backdrop-blur-xl
           border border-white/20
           shadow-xl
           dark:bg-gray-900/80 dark:border-gray-700/50;
  }
  
  .card-gradient {
    @apply bg-gradient-to-br from-brand-500/10 to-purple-500/10
           border border-brand-200/50
           dark:from-brand-500/20 dark:to-purple-500/20
           dark:border-brand-500/20;
  }
  
  .card-padding {
    @apply p-6 sm:p-8;
  }
}
```

### Inputs
```css
@layer components {
  .input {
    @apply w-full px-4 py-2.5 rounded-lg
           bg-white border border-gray-300
           text-gray-900 placeholder:text-gray-400
           transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
           disabled:bg-gray-50 disabled:cursor-not-allowed
           dark:bg-gray-900 dark:border-gray-700
           dark:text-gray-100 dark:placeholder:text-gray-500
           dark:focus:ring-brand-500/30;
  }
  
  .input-error {
    @apply border-error focus:ring-error/20 focus:border-error;
  }
  
  .input-success {
    @apply border-success focus:ring-success/20 focus:border-success;
  }
  
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1.5
           dark:text-gray-300;
  }
  
  .helper-text {
    @apply text-sm text-gray-500 mt-1.5
           dark:text-gray-400;
  }
  
  .error-text {
    @apply text-sm text-error mt-1.5;
  }
}
```

### Badges
```css
@layer components {
  .badge {
    @apply inline-flex items-center gap-1
           px-2.5 py-0.5 rounded-full
           text-xs font-medium;
  }
  
  .badge-gray {
    @apply bg-gray-100 text-gray-700
           dark:bg-gray-800 dark:text-gray-300;
  }
  
  .badge-brand {
    @apply bg-brand-100 text-brand-700
           dark:bg-brand-900/50 dark:text-brand-300;
  }
  
  .badge-success {
    @apply bg-green-100 text-green-700
           dark:bg-green-900/50 dark:text-green-300;
  }
  
  .badge-warning {
    @apply bg-amber-100 text-amber-700
           dark:bg-amber-900/50 dark:text-amber-300;
  }
  
  .badge-error {
    @apply bg-red-100 text-red-700
           dark:bg-red-900/50 dark:text-red-300;
  }
  
  /* With dot indicator */
  .badge-dot::before {
    content: '';
    @apply w-1.5 h-1.5 rounded-full bg-current;
  }
}
```

---

## 4. Layout Patterns

### Container
```css
@layer components {
  .container-custom {
    @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .container-narrow {
    @apply w-full max-w-3xl mx-auto px-4 sm:px-6;
  }
  
  .container-wide {
    @apply w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

### Section Spacing
```css
@layer components {
  .section {
    @apply py-16 sm:py-20 lg:py-24;
  }
  
  .section-sm {
    @apply py-8 sm:py-12 lg:py-16;
  }
  
  .section-lg {
    @apply py-24 sm:py-32 lg:py-40;
  }
}
```

### Bento Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  <!-- Large card spanning 2 columns -->
  <div class="card card-padding md:col-span-2 lg:row-span-2">
    Featured content
  </div>
  
  <!-- Regular cards -->
  <div class="card card-padding">Card 1</div>
  <div class="card card-padding">Card 2</div>
  <div class="card card-padding">Card 3</div>
  
  <!-- Wide card -->
  <div class="card card-padding lg:col-span-2">Wide content</div>
</div>
```

### Holy Grail Layout
```html
<div class="min-h-screen flex flex-col">
  <header class="sticky top-0 z-sticky">
    <!-- Header -->
  </header>
  
  <main class="flex-1">
    <!-- Content -->
  </main>
  
  <footer>
    <!-- Footer -->
  </footer>
</div>
```

### Sidebar Layout
```html
<div class="flex min-h-screen">
  <!-- Sidebar -->
  <aside class="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800">
    <!-- Sidebar content -->
  </aside>
  
  <!-- Main content -->
  <main class="flex-1 overflow-auto">
    <!-- Page content -->
  </main>
</div>
```

---

## 5. Responsive Patterns

### Mobile-First Breakpoints
```html
<!-- Mobile first: base styles, then add complexity -->
<div class="
  flex flex-col          /* Mobile: stack */
  md:flex-row            /* Tablet+: row */
  gap-4 md:gap-8         /* Responsive gap */
">
  <div class="
    w-full                /* Mobile: full width */
    md:w-1/2              /* Tablet: half */
    lg:w-1/3              /* Desktop: third */
  ">
    Content
  </div>
</div>
```

### Responsive Typography
```html
<h1 class="
  text-2xl              /* Mobile */
  sm:text-3xl           /* Small screens */
  md:text-4xl           /* Medium */
  lg:text-5xl           /* Large */
  xl:text-6xl           /* Extra large */
  font-bold tracking-tight
">
  Responsive Heading
</h1>

<!-- Or use fluid typography -->
<h1 class="text-fluid-3xl font-bold tracking-tight">
  Fluid Heading
</h1>
```

### Responsive Spacing
```html
<section class="
  py-12                 /* Mobile */
  sm:py-16              /* Small */
  md:py-20              /* Medium */
  lg:py-24              /* Large */
  px-4 sm:px-6 lg:px-8  /* Horizontal padding */
">
  Content
</section>
```

### Hide/Show by Breakpoint
```html
<!-- Mobile only -->
<div class="block md:hidden">Mobile menu</div>

<!-- Desktop only -->
<nav class="hidden md:flex">Desktop nav</nav>

<!-- Show on specific range -->
<div class="hidden sm:block lg:hidden">Tablet only</div>
```

### Responsive Grid
```html
<div class="
  grid
  grid-cols-1           /* Mobile: 1 column */
  sm:grid-cols-2        /* Small: 2 columns */
  lg:grid-cols-3        /* Large: 3 columns */
  xl:grid-cols-4        /* XL: 4 columns */
  gap-4 sm:gap-6 lg:gap-8
">
  <!-- Cards -->
</div>
```

---

## 6. Dark Mode

### Setup
```javascript
// tailwind.config.js
export default {
  darkMode: 'class', // or 'media' for system preference
}
```

### Toggle Script
```javascript
// Check preference and set initial state
if (localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Toggle function
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.theme = isDark ? 'dark' : 'light'
}
```

### Pattern Usage
```html
<div class="
  bg-white              /* Light mode */
  dark:bg-gray-950      /* Dark mode */
  text-gray-900
  dark:text-gray-100
  border-gray-200
  dark:border-gray-800
">
  Content adapts to theme
</div>
```

### Dark Mode First (for dark apps)
```css
@layer base {
  :root {
    --bg-primary: theme('colors.gray.950');
    --text-primary: theme('colors.gray.100');
  }
  
  .light {
    --bg-primary: theme('colors.white');
    --text-primary: theme('colors.gray.900');
  }
}
```

---

## 7. Animation Patterns

### Transitions
```html
<!-- Smooth all properties -->
<div class="transition-all duration-300 ease-out">

<!-- Specific properties (better performance) -->
<button class="transition-colors duration-200">
<div class="transition-transform duration-300">
<div class="transition-opacity duration-200">

<!-- Custom easing -->
<div class="transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
```

### Hover States
```html
<!-- Scale on hover -->
<div class="hover:scale-105 transition-transform duration-200">

<!-- Lift on hover -->
<div class="hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

<!-- Color change -->
<a class="text-gray-600 hover:text-brand-600 transition-colors duration-200">

<!-- Background change -->
<button class="bg-brand-600 hover:bg-brand-700 transition-colors duration-200">
```

### Entrance Animations
```html
<!-- Fade in -->
<div class="animate-fade-in">

<!-- Fade in with delay -->
<div class="animate-fade-in animation-delay-100">
<div class="animate-fade-in animation-delay-200">
<div class="animate-fade-in animation-delay-300">

<!-- Slide up on load -->
<div class="animate-fade-in-up">

<!-- Scale in -->
<div class="animate-scale-in">
```

### Staggered Animations
```html
<div class="space-y-4">
  <div class="animate-fade-in-up" style="animation-delay: 0ms">Item 1</div>
  <div class="animate-fade-in-up" style="animation-delay: 100ms">Item 2</div>
  <div class="animate-fade-in-up" style="animation-delay: 200ms">Item 3</div>
  <div class="animate-fade-in-up" style="animation-delay: 300ms">Item 4</div>
</div>
```

### Reduced Motion
```html
<!-- Respect user preference -->
<div class="
  animate-bounce
  motion-reduce:animate-none
">
  Bouncing (unless reduced motion)
</div>

<!-- Safe animation (opacity only) -->
<div class="
  motion-safe:animate-fade-in-up
  motion-reduce:animate-fade-in
">
  Slides up or just fades
</div>
```

---

## 8. Glassmorphism & Effects

### Glass Card
```html
<div class="
  bg-white/10
  backdrop-blur-xl
  border border-white/20
  rounded-2xl
  shadow-xl
">
  Glass content
</div>
```

### Gradient Border
```html
<div class="relative p-[1px] rounded-2xl bg-gradient-to-r from-brand-500 to-purple-500">
  <div class="bg-gray-950 rounded-2xl p-6">
    Content with gradient border
  </div>
</div>
```

### Glow Effect
```html
<div class="
  shadow-lg shadow-brand-500/25
  hover:shadow-xl hover:shadow-brand-500/40
  transition-shadow duration-300
">
  Glowing element
</div>

<!-- Animated glow -->
<div class="animate-glow-pulse">
  Pulsing glow
</div>
```

### Mesh Gradient Background
```html
<div class="
  relative overflow-hidden
  bg-gradient-to-br from-brand-500 via-purple-500 to-pink-500
">
  <!-- Mesh overlay -->
  <div class="
    absolute inset-0
    bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_40%)]
  "></div>
  <div class="
    absolute inset-0
    bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.2),transparent_40%)]
  "></div>
  
  <div class="relative">Content</div>
</div>
```

### Noise Texture
```css
@layer utilities {
  .bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    opacity: 0.03;
  }
}
```

```html
<div class="relative">
  <div class="absolute inset-0 bg-noise pointer-events-none"></div>
  <div class="relative">Content with noise texture</div>
</div>
```

---

## 9. Typography Patterns

### Prose Styling
```html
<!-- Use @tailwindcss/typography plugin -->
<article class="
  prose prose-lg
  prose-gray
  dark:prose-invert
  prose-headings:font-display
  prose-a:text-brand-600
  prose-a:no-underline
  prose-a:hover:underline
  max-w-none
">
  <h1>Article Title</h1>
  <p>Article content with beautiful typography...</p>
</article>
```

### Heading Hierarchy
```html
<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
  Page Title
</h1>

<h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">
  Section Title
</h2>

<h3 class="text-xl font-semibold">
  Subsection Title
</h3>

<p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
  Body text with good readability
</p>

<p class="text-sm text-gray-500 dark:text-gray-500">
  Secondary/meta text
</p>
```

### Text Gradients
```html
<span class="
  bg-gradient-to-r from-brand-500 to-purple-500
  bg-clip-text text-transparent
">
  Gradient Text
</span>
```

### Text Balance
```html
<h1 class="text-balance">
  This heading will balance across lines nicely
</h1>

<p class="text-pretty max-w-prose">
  This paragraph will avoid orphans at the end
</p>
```

---

## 10. Accessibility Patterns

### Focus States
```html
<!-- Visible focus ring -->
<button class="
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-brand-500
  focus-visible:ring-offset-2
">
  Accessible button
</button>

<!-- Focus within container -->
<div class="
  rounded-lg border border-gray-200
  focus-within:ring-2 focus-within:ring-brand-500
  focus-within:border-brand-500
">
  <input class="border-none focus:ring-0" />
</div>
```

### Skip Link
```html
<a href="#main-content" class="
  sr-only focus:not-sr-only
  focus:absolute focus:top-4 focus:left-4
  focus:z-50 focus:px-4 focus:py-2
  focus:bg-brand-600 focus:text-white
  focus:rounded-lg
">
  Skip to content
</a>
```

### Screen Reader Only
```html
<!-- Hidden visually, available to screen readers -->
<span class="sr-only">Opens in new tab</span>

<!-- Icon button with label -->
<button>
  <IconClose class="w-5 h-5" />
  <span class="sr-only">Close menu</span>
</button>
```

### Reduced Motion
```html
<div class="
  motion-safe:transition-transform
  motion-safe:hover:scale-105
  motion-reduce:transition-none
">
  Respects motion preferences
</div>
```

---

## 11. Performance Tips

### Optimize for Production
```javascript
// tailwind.config.js - already handles purging in v3+
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './index.html',
  ],
}
```

### Reduce Bundle Size
```css
/* Import only what you need */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Disable unused core plugins in config */
```

### Avoid Dynamic Classes
```javascript
// ❌ Bad - won't be purged correctly
const color = 'red'
className={`text-${color}-500`}

// ✅ Good - use complete class names
const colorClasses = {
  red: 'text-red-500',
  blue: 'text-blue-500',
}
className={colorClasses[color]}
```

### Use CSS Layers Properly
```css
@layer base {
  /* Lowest specificity - base styles */
}

@layer components {
  /* Medium specificity - component classes */
}

@layer utilities {
  /* Highest specificity - utility overrides */
}
```

---

## 12. Common Patterns Library

### Hero Section
```html
<section class="relative min-h-screen flex items-center overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-gray-950 to-brand-950"></div>
  
  <!-- Content -->
  <div class="relative container-custom py-20">
    <div class="max-w-3xl">
      <span class="badge badge-brand mb-4">New Release</span>
      <h1 class="text-fluid-4xl font-bold tracking-tight mb-6">
        Build amazing products faster
      </h1>
      <p class="text-xl text-gray-400 mb-8 leading-relaxed">
        A brief description that explains the value proposition clearly.
      </p>
      <div class="flex flex-wrap gap-4">
        <button class="btn btn-lg btn-primary btn-glow">Get Started</button>
        <button class="btn btn-lg btn-ghost">Learn More</button>
      </div>
    </div>
  </div>
</section>
```

### Feature Grid
```html
<section class="section bg-gray-50 dark:bg-gray-900/50">
  <div class="container-custom">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-fluid-2xl font-bold mb-4">Features</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Everything you need to build modern applications
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card card-hover card-padding">
        <div class="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 
                    flex items-center justify-center mb-4">
          <IconZap class="w-6 h-6 text-brand-600 dark:text-brand-400" />
        </div>
        <h3 class="text-lg font-semibold mb-2">Lightning Fast</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Description of this feature and its benefits.
        </p>
      </div>
      <!-- More cards... -->
    </div>
  </div>
</section>
```

### Pricing Table
```html
<div class="grid md:grid-cols-3 gap-8">
  <!-- Basic -->
  <div class="card card-padding">
    <h3 class="text-lg font-semibold mb-2">Basic</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">For individuals</p>
    <div class="mb-6">
      <span class="text-4xl font-bold">$9</span>
      <span class="text-gray-500">/month</span>
    </div>
    <ul class="space-y-3 mb-8">
      <li class="flex items-center gap-2">
        <IconCheck class="w-5 h-5 text-success" />
        <span>Feature one</span>
      </li>
      <!-- More features... -->
    </ul>
    <button class="btn btn-md btn-secondary w-full">Get Started</button>
  </div>
  
  <!-- Pro (Featured) -->
  <div class="card card-padding ring-2 ring-brand-500 relative">
    <span class="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-brand">
      Popular
    </span>
    <!-- Same structure, different content -->
    <button class="btn btn-md btn-primary btn-glow w-full">Get Started</button>
  </div>
  
  <!-- Enterprise -->
  <div class="card card-padding">
    <!-- Same structure -->
  </div>
</div>
```

### Navigation Header
```html
<header class="
  sticky top-0 z-sticky
  bg-white/80 dark:bg-gray-950/80
  backdrop-blur-xl
  border-b border-gray-200 dark:border-gray-800
">
  <div class="container-custom">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="font-display font-bold text-xl">Logo</a>
      
      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="#" class="text-sm text-gray-600 hover:text-gray-900 
                          dark:text-gray-400 dark:hover:text-gray-100
                          transition-colors">
          Features
        </a>
        <!-- More links... -->
      </nav>
      
      <!-- CTA -->
      <div class="flex items-center gap-4">
        <button class="btn btn-sm btn-ghost hidden sm:flex">Sign In</button>
        <button class="btn btn-sm btn-primary">Get Started</button>
        
        <!-- Mobile menu button -->
        <button class="md:hidden btn btn-icon btn-ghost">
          <IconMenu class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</header>
```

---

## Golden Rules

1. **Mobile-first** — Always start with base (mobile) styles
2. **Utility-first** — Use utilities, extract components when repeated 3+ times
3. **Consistent spacing** — Stick to the scale (4, 8, 12, 16, 24, 32, 48, 64)
4. **Design tokens** — Colors, fonts, shadows from config, not arbitrary
5. **Semantic HTML** — Tailwind styles, not structure
6. **Accessible always** — Focus states, contrast, reduced motion
7. **Performance aware** — Avoid dynamic classes, use safelist sparingly
8. **Dark mode native** — Design for both from the start
9. **Responsive deliberately** — Each breakpoint should be intentional
10. **Document patterns** — Comment complex utility combinations

---

## Quick Reference

### Spacing Scale
```
0.5 = 0.125rem = 2px
1 = 0.25rem = 4px
2 = 0.5rem = 8px
3 = 0.75rem = 12px
4 = 1rem = 16px
5 = 1.25rem = 20px
6 = 1.5rem = 24px
8 = 2rem = 32px
10 = 2.5rem = 40px
12 = 3rem = 48px
16 = 4rem = 64px
20 = 5rem = 80px
24 = 6rem = 96px
```

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Common Combinations
```html
<!-- Centered flex -->
flex items-center justify-center

<!-- Centered absolute -->
absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2

<!-- Full screen overlay -->
fixed inset-0 bg-black/50 backdrop-blur-sm

<!-- Truncate text -->
truncate (or) line-clamp-2

<!-- Aspect ratio -->
aspect-video (or) aspect-square

<!-- Scrollable container -->
overflow-auto scrollbar-hide
```