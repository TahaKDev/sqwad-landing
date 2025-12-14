---
name: astro-conventions
description: Expert-level Astro patterns for building fast, maintainable static sites. Use when working with Astro projects, component architecture, content collections, islands, or performance optimization.
---

# Astro Conventions & Best Practices

## Philosophy

Ship less JavaScript. Content is king. Static by default, dynamic when necessary. Every byte matters. Simplicity scales better than complexity.

---

## 1. Project Setup

### Installation
```bash
# Create new project
npm create astro@latest my-site

# Recommended options:
# - Empty template (start clean)
# - TypeScript: Strict
# - Install dependencies: Yes

# Add integrations
npx astro add tailwind react sitemap
```

### Essential Config

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com', // Required for sitemap
  
  integrations: [
    tailwind({
      applyBaseStyles: false, // Control base styles yourself
    }),
    react(), // For interactive islands
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
  
  // Image optimization
  image: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'],
    remotePatterns: [{ protocol: 'https' }],
  },
  
  // Build optimization
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
  
  // Prefetch links on hover (performance)
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
```

### TypeScript Config

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@content/*": ["src/content/*"],
      "@lib/*": ["src/lib/*"],
      "@assets/*": ["src/assets/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

---

## 2. Project Structure

### Recommended Architecture

```
src/
├── assets/                 # Processed assets (images, fonts)
│   ├── images/
│   │   ├── hero.jpg
│   │   └── team/
│   └── fonts/
│
├── components/             # All components
│   ├── ui/                # Primitive components
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Badge.astro
│   │   └── index.ts       # Barrel export
│   │
│   ├── layout/            # Layout components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   └── MobileMenu.tsx  # Interactive island
│   │
│   ├── sections/          # Page sections
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Testimonials.astro
│   │   └── CTA.astro
│   │
│   └── islands/           # React interactive components
│       ├── SearchDialog.tsx
│       ├── ThemeToggle.tsx
│       └── ContactForm.tsx
│
├── content/               # Content Collections
│   ├── config.ts          # Collection schemas
│   ├── docs/
│   │   ├── getting-started.mdx
│   │   └── installation.mdx
│   └── blog/
│       └── first-post.mdx
│
├── layouts/               # Page layouts
│   ├── BaseLayout.astro   # Root layout (html, head, body)
│   ├── PageLayout.astro   # Standard page
│   ├── DocsLayout.astro   # Documentation
│   └── BlogLayout.astro   # Blog posts
│
├── lib/                   # Utilities & business logic
│   ├── utils.ts           # Generic helpers
│   ├── constants.ts       # Site constants
│   └── seo.ts            # SEO helpers
│
├── pages/                 # File-based routing
│   ├── index.astro
│   ├── about.astro
│   ├── 404.astro
│   ├── docs/
│   │   └── [...slug].astro
│   └── blog/
│       ├── index.astro
│       └── [slug].astro
│
└── styles/
    └── global.css         # Global styles (Tailwind + custom)

public/                    # Static assets (not processed)
├── favicon.svg
├── robots.txt
├── og-image.png
└── fonts/                 # Self-hosted fonts
```

### Barrel Exports

```typescript
// src/components/ui/index.ts
export { default as Button } from './Button.astro';
export { default as Card } from './Card.astro';
export { default as Badge } from './Badge.astro';

// Usage
import { Button, Card, Badge } from '@components/ui';
```

---

## 3. Component Patterns

### Astro Component Anatomy

```astro
---
/**
 * Card component with optional featured styling
 * @example
 * <Card title="Hello" description="World" variant="featured" />
 */

// 1. Imports
import { Image } from 'astro:assets';
import { Badge } from '@components/ui';

// 2. Props interface (always typed)
interface Props {
  title: string;
  description?: string;
  image?: ImageMetadata;
  variant?: 'default' | 'featured';
  class?: string;
}

// 3. Destructure with defaults
const { 
  title, 
  description, 
  image,
  variant = 'default',
  class: className,
} = Astro.props;

// 4. Computed values
const isFeatured = variant === 'featured';
---

<!-- 5. Template with class:list for conditionals -->
<article 
  class:list={[
    'rounded-xl border p-6 transition-all',
    isFeatured 
      ? 'bg-brand-50 border-brand-200 shadow-lg' 
      : 'bg-white border-gray-200 hover:shadow-md',
    className,
  ]}
>
  {image && (
    <Image 
      src={image} 
      alt={title}
      class="rounded-lg mb-4 w-full"
      widths={[400, 800]}
      sizes="(max-width: 768px) 100vw, 400px"
    />
  )}
  
  <h3 class="text-lg font-semibold text-gray-900">
    {title}
  </h3>
  
  {description && (
    <p class="mt-2 text-gray-600 line-clamp-3">
      {description}
    </p>
  )}
  
  <!-- Named slot -->
  <slot name="footer" />
  
  <!-- Default slot -->
  <slot />
</article>

<!-- 6. Scoped styles (if needed, prefer Tailwind) -->
<style>
  /* Scoped by default - only use for complex animations */
</style>
```

### Component Size Rules

```astro
---
// ✅ Good: < 100 lines, single responsibility
interface Props {
  items: string[];
}
const { items } = Astro.props;
---

<ul class="space-y-2">
  {items.map((item) => (
    <li class="text-gray-700">{item}</li>
  ))}
</ul>
```

```astro
---
// ❌ Bad: Too many responsibilities, too long
// SPLIT INTO: PageHeader, Navigation, MobileMenu, UserMenu
---
<!-- 200+ lines of header, nav, mobile menu, user dropdown... -->
```

### Slots Pattern

```astro
---
// CardWithSlots.astro
interface Props {
  title: string;
}
const { title } = Astro.props;

const hasFooter = Astro.slots.has('footer');
---

<article class="card">
  <header>
    <slot name="icon" />
    <h3>{title}</h3>
  </header>
  
  <div class="card-body">
    <slot /> <!-- Default slot -->
  </div>
  
  {hasFooter && (
    <footer class="card-footer">
      <slot name="footer" />
    </footer>
  )}
</article>
```

```astro
<!-- Usage -->
<CardWithSlots title="Features">
  <Icon slot="icon" name="star" />
  <p>Main content goes here</p>
  <div slot="footer">
    <Button>Learn more</Button>
  </div>
</CardWithSlots>
```

---

## 4. Layouts

### Base Layout (Root)

```astro
---
// src/layouts/BaseLayout.astro
import '@/styles/global.css';
import { SEO } from '@lib/seo';

interface Props {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

const { title, description, image, noIndex = false } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    {noIndex && <meta name="robots" content="noindex, nofollow" />}
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={new URL(image, Astro.site)} />}
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={new URL(image, Astro.site)} />}
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    
    <!-- Fonts (preload critical) -->
    <link rel="preconnect" href="https://rsms.me/" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    
    <!-- Slot for page-specific head content -->
    <slot name="head" />
  </head>
  
  <body class="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
    <slot />
  </body>
</html>
```

### Page Layout (with Header/Footer)

```astro
---
// src/layouts/PageLayout.astro
import BaseLayout from './BaseLayout.astro';
import Header from '@components/layout/Header.astro';
import Footer from '@components/layout/Footer.astro';

interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<BaseLayout title={title} description={description} image={image}>
  <slot name="head" slot="head" />
  
  <Header />
  
  <main>
    <slot />
  </main>
  
  <Footer />
</BaseLayout>
```

---

## 5. Content Collections

### Schema Definition

```typescript
// src/content/config.ts
import { defineCollection, z, reference } from 'astro:content';

// Documentation collection
const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(999),
    draft: z.boolean().default(false),
    updatedAt: z.coerce.date().optional(),
  }),
});

// Blog collection with image support
const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string().max(60), // SEO limit
    excerpt: z.string().max(160), // Meta description limit
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: reference('authors'), // Reference another collection
    cover: image().refine(
      (img) => img.width >= 1200,
      { message: 'Cover image must be at least 1200px wide' }
    ),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Authors collection (data collection)
const authors = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    avatar: image(),
    twitter: z.string().optional(),
    github: z.string().optional(),
  }),
});

export const collections = { docs, blog, authors };
```

### Querying Collections

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import PageLayout from '@layouts/PageLayout.astro';
import BlogCard from '@components/BlogCard.astro';

// Get all non-draft posts, sorted by date
const posts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});

const sortedPosts = posts.sort(
  (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
);
---

<PageLayout title="Blog" description="Latest articles">
  <section class="py-20">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold mb-12">Blog</h1>
      
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <BlogCard post={post} />
        ))}
      </div>
    </div>
  </section>
</PageLayout>
```

### Dynamic Routes

```astro
---
// src/pages/blog/[slug].astro
import { getCollection, type CollectionEntry } from 'astro:content';
import BlogLayout from '@layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { Content, headings } = await post.render();
---

<BlogLayout post={post}>
  <Content />
</BlogLayout>
```

---

## 6. Islands Architecture

### When to Use Islands

| Scenario | Directive | JavaScript |
|----------|-----------|------------|
| Above the fold, critical | `client:load` | Immediate |
| Below the fold | `client:visible` | Lazy |
| Non-critical (analytics) | `client:idle` | After load |
| Device-specific | `client:media` | Conditional |
| Never hydrate | `client:only` | CSR only |

### React Island Example

```tsx
// src/components/islands/SearchDialog.tsx
import { useState } from 'react';

interface Props {
  placeholder?: string;
}

export default function SearchDialog({ placeholder = 'Search...' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="text-gray-500">{placeholder}</span>
        <kbd className="ml-auto text-xs bg-white px-2 py-0.5 rounded">⌘K</kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 text-lg border-b"
              autoFocus
            />
            {/* Results... */}
          </div>
        </div>
      )}
    </>
  );
}
```

```astro
---
// Usage in Astro
import SearchDialog from '@components/islands/SearchDialog';
---

<!-- Hydrate immediately (header search is critical) -->
<SearchDialog client:load placeholder="Search docs..." />
```

### Passing Data to Islands

```astro
---
import Counter from '@components/islands/Counter';

const initialCount = 5;
const config = { min: 0, max: 10, step: 1 };
---

<!-- Primitives work directly -->
<Counter client:visible initialCount={initialCount} />

<!-- Objects are serialized automatically -->
<Counter client:visible config={config} />

<!-- Functions DON'T work (can't serialize) -->
<!-- <Counter client:visible onUpdate={handleUpdate} /> ❌ -->
```

---

## 7. Image Optimization

### Using astro:assets

```astro
---
import { Image, getImage } from 'astro:assets';
import heroImage from '@assets/images/hero.jpg';

// For background images or CSS
const optimizedBg = await getImage({ src: heroImage, format: 'webp' });
---

<!-- Responsive image with multiple sizes -->
<Image
  src={heroImage}
  alt="Hero description"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  class="rounded-lg"
  loading="eager" <!-- Above the fold -->
/>

<!-- Lazy loaded image -->
<Image
  src={heroImage}
  alt="Feature"
  width={600}
  height={400}
  loading="lazy"
  decoding="async"
/>

<!-- Background image -->
<div style={`background-image: url(${optimizedBg.src})`}>
```

### Remote Images

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src="https://avatars.githubusercontent.com/u/12345"
  alt="User avatar"
  width={100}
  height={100}
  inferSize <!-- Fetch dimensions automatically -->
/>
```

---

## 8. Performance Patterns

### Critical CSS Inlining

```astro
---
// For critical above-the-fold styles
---

<style is:inline>
  /* Critical CSS inlined in head */
  .hero { min-height: 100vh; }
</style>
```

### Prefetching

```javascript
// astro.config.mjs
export default defineConfig({
  prefetch: {
    prefetchAll: true, // Prefetch all links
    defaultStrategy: 'hover', // or 'viewport', 'load'
  },
});
```

```astro
<!-- Override per-link -->
<a href="/about" data-astro-prefetch="viewport">About</a>
<a href="/heavy-page" data-astro-prefetch="false">Heavy</a>
```

### Font Loading

```astro
---
// In BaseLayout.astro head
---

<!-- Preconnect to font origin -->
<link rel="preconnect" href="https://rsms.me/" crossorigin />

<!-- Preload critical font -->
<link 
  rel="preload" 
  href="/fonts/inter-var.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin 
/>

<!-- Font CSS -->
<style is:inline>
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('/fonts/inter-var.woff2') format('woff2');
  }
</style>
```

### Script Loading

```astro
<!-- Inline small scripts -->
<script is:inline>
  // Theme detection (must run before paint)
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
</script>

<!-- Module scripts (processed by Vite) -->
<script>
  import { initAnalytics } from '@lib/analytics';
  initAnalytics();
</script>

<!-- External scripts -->
<script src="https://example.com/widget.js" defer></script>
```

---

## 9. SEO Patterns

### SEO Component

```typescript
// src/lib/seo.ts
export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: {
    publishedTime: Date;
    modifiedTime?: Date;
    author: string;
    tags?: string[];
  };
}

export function generateMeta(props: SEOProps, site: URL, pathname: string) {
  const canonicalURL = new URL(pathname, site);
  const imageURL = props.image ? new URL(props.image, site).toString() : null;
  
  return {
    title: props.title,
    description: props.description,
    canonical: canonicalURL.toString(),
    openGraph: {
      type: props.article ? 'article' : 'website',
      url: canonicalURL.toString(),
      title: props.title,
      description: props.description,
      image: imageURL,
      ...(props.article && {
        article: {
          publishedTime: props.article.publishedTime.toISOString(),
          modifiedTime: props.article.modifiedTime?.toISOString(),
          author: props.article.author,
          tags: props.article.tags,
        },
      }),
    },
  };
}
```

### Structured Data

```astro
---
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sqwad',
  url: Astro.site,
  description: 'AI-powered development agents',
};
---

<script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
```

### Robots & Sitemap

```
// public/robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /draft/

Sitemap: https://sqwad.dev/sitemap-index.xml
```

---

## 10. Common Patterns

### Pagination

```astro
---
// src/pages/blog/[...page].astro
import type { GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths = (async ({ paginate }) => {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => 
    b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
  );
  
  return paginate(sortedPosts, { pageSize: 10 });
}) satisfies GetStaticPaths;

const { page } = Astro.props;
---

<ul>
  {page.data.map((post) => <li>{post.data.title}</li>)}
</ul>

<nav>
  {page.url.prev && <a href={page.url.prev}>Previous</a>}
  <span>Page {page.currentPage} of {page.lastPage}</span>
  {page.url.next && <a href={page.url.next}>Next</a>}
</nav>
```

### 404 Page

```astro
---
// src/pages/404.astro
import PageLayout from '@layouts/PageLayout.astro';
---

<PageLayout title="Page Not Found" description="The page you're looking for doesn't exist.">
  <section class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900">404</h1>
      <p class="mt-4 text-xl text-gray-600">Page not found</p>
      <a href="/" class="mt-8 inline-block btn btn-primary">
        Go home
      </a>
    </div>
  </section>
</PageLayout>
```

### Environment Variables

```typescript
// src/lib/constants.ts
export const SITE = {
  name: 'Sqwad',
  url: import.meta.env.SITE,
  description: 'AI-powered development agents',
};

// Access in components
// import.meta.env.PUBLIC_* - available client & server
// import.meta.env.* - server only
```

---

## 11. Testing & Quality

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - uses: treosh/lighthouse-ci-action@v10
        with:
          uploadArtifacts: true
          configPath: ./lighthouserc.json
```

```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

### Build Verification

```bash
# Check for errors
npm run build

# Preview locally
npm run preview

# Check bundle size
npx astro-bundle-analyzer
```

---

## Golden Rules

1. **Static by default** — Only add JS when absolutely necessary
2. **Content Collections** — For any structured content
3. **Small components** — < 100 lines, single responsibility
4. **Type everything** — Props interfaces, content schemas
5. **`client:visible`** — Default for islands (not `client:load`)
6. **Image optimization** — Always use `astro:assets`
7. **Semantic HTML** — Accessibility built-in
8. **Mobile-first** — Base styles = mobile
9. **Lighthouse 100** — The target, always
10. **YAGNI** — Don't over-engineer

---

## Quick Reference

### Client Directives
```
client:load      → Hydrate immediately
client:idle      → Hydrate when browser is idle
client:visible   → Hydrate when visible (IntersectionObserver)
client:media     → Hydrate on media query match
client:only      → Skip SSR, client render only
```

### class:list Syntax
```astro
<div class:list={[
  'always-applied',
  conditional && 'applied-if-true',
  { 'object-syntax': isActive },
  ['array', 'of', 'classes'],
]}></div>
```

### Content Collection Helpers
```typescript
import { getCollection, getEntry, getEntries } from 'astro:content';

// All entries
const posts = await getCollection('blog');

// Single entry
const post = await getEntry('blog', 'my-post');

// Multiple by reference
const authors = await getEntries(post.data.authors);
```