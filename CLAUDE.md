# CLAUDE.md - Contexte du Projet Sqwad

## Vue d'ensemble

**Sqwad** est une plateforme web présentant des agents IA spécialisés pour le développement. Le site vitrine met en avant des agents Claude Code qui codent "comme des seniors", avec un focus sur le clean code, les bonnes pratiques et la performance.

## Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Astro** | 5.16.5 | Framework SSG (Static Site Generator) |
| **Tailwind CSS** | 4.1.18 | Styling utility-first |
| **TypeScript** | Strict | Typage statique |
| **Vite** | via Astro | Build tool & dev server |

## Architecture du Projet

```
sqwad-website/
├── .claude/
│   ├── agents/              # Personas des agents IA
│   │   ├── marco-astro.md   # Expert Astro (raccoon orange)
│   │   └── marco-tailwind.md # Expert CSS/Tailwind (raccoon rouge)
│   └── skills/              # Bases de connaissances
│       ├── astro-conventions/
│       ├── tailwind-patterns/
│       ├── css-mastery/
│       └── clean-code/
├── public/
│   ├── favicon.svg
│   └── images/
│       └── agent-placeholder.png
├── src/
│   ├── assets/images/       # Images optimisées (marco.png, marco-bg.png)
│   ├── components/
│   │   ├── layout/          # Composants de structure
│   │   │   ├── Navbar.astro
│   │   │   └── Footer.astro     # Footer réutilisable
│   │   ├── sections/        # Sections de page
│   │   │   ├── Hero.astro
│   │   │   └── agent/           # Sections page agent (barrel export)
│   │   │       ├── index.ts         # Barrel export
│   │   │       ├── AgentHero.astro
│   │   │       ├── AgentAbout.astro
│   │   │       ├── AgentSpecialties.astro
│   │   │       ├── AgentSkills.astro
│   │   │       ├── AgentUseCases.astro
│   │   │       ├── AgentExamples.astro
│   │   │       ├── AgentDosDonts.astro
│   │   │       ├── AgentConfig.astro
│   │   │       ├── AgentPhilosophy.astro
│   │   │       └── AgentCTA.astro
│   │   └── ui/              # Composants UI atomiques (barrel export)
│   │       ├── index.ts         # Barrel export
│   │       ├── Badge.astro
│   │       ├── CodeBlock.astro
│   │       └── AgentCard.astro
│   ├── content/             # Content Collections (Astro)
│   │   ├── config.ts            # Schéma Zod des collections
│   │   └── agents/              # Données agents en JSON
│   │       └── marco-astro.json
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── AgentLayout.astro
│   ├── lib/                 # Utilitaires partagés
│   │   ├── types.ts             # Interfaces TypeScript
│   │   └── constants.ts         # Constantes (AGENTS_LIST)
│   ├── pages/
│   │   ├── index.astro
│   │   └── agents/
│   │       ├── index.astro
│   │       └── marco-astro.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tsconfig.json            # Inclut path aliases
└── package.json
```

## Path Aliases (tsconfig.json)

```json
{
  "paths": {
    "@/*": ["src/*"],
    "@components/*": ["src/components/*"],
    "@layouts/*": ["src/layouts/*"],
    "@lib/*": ["src/lib/*"],
    "@assets/*": ["src/assets/*"],
    "@content/*": ["src/content/*"]
  }
}
```

## Content Collections

Les données des agents sont gérées via Astro Content Collections :

```typescript
// src/content/config.ts
const agents = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    description: z.string(),
    accentColor: z.string(),
    about: z.array(z.string()),
    specialties: z.array(z.string()),
    skills: z.array(skillSchema),
    useCases: z.array(useCaseSchema),
    codeExamples: z.array(codeExampleSchema),
    does: z.array(z.string()),
    doesNot: z.array(z.string()),
    mcpTools: z.array(z.string()).optional(),
    philosophy: philosophySchema,
    draft: z.boolean().default(false),
    order: z.number().default(999),
  }),
});
```

Usage dans les pages :
```typescript
import { getEntry } from 'astro:content';
const agent = await getEntry('agents', 'marco-astro');
```

## Commandes

```bash
npm run dev      # Serveur de dev (localhost:4321)
npm run build    # Build production → ./dist/
npm run preview  # Preview du build
```

## Pages

### Page d'accueil (`/`)
- Hero section avec titre, features, CTAs
- Mockup VS Code avec structure de projet
- Mascotte Marco animée

### Page liste des agents (`/agents`)
- Titre : "Rencontrez la Sqwad"
- Grille responsive de cartes agents
- Données centralisées via `AGENTS_LIST` constant

### Page Marco Astro (`/agents/marco-astro`)
- Données chargées depuis Content Collection
- 10 sections modulaires via barrel import
- ~78 lignes de code (refactorisé depuis 350+)

## Design System

### Palette de Couleurs

- **Primary** : Bleu-teal (#b8dbe4 → #1a2e37)
- **Secondary** : Rose/coral (#ecbdb8 → #371916)
- **Neutral** : Échelle de gris complète (50-950)
- **Accent** : Emerald pour les états de succès
- **Orange** : #f97316 - Couleur accent Marco Astro

### Variables CSS Principales

```css
--color-primary-*     /* Couleurs principales */
--color-secondary-*   /* Couleurs secondaires */
--color-neutral-*     /* Gris/neutres */
--shadow-navbar       /* Ombre navigation */
--shadow-card         /* Ombre cartes */
--radius-*            /* Border radius */
--font-size-hero      /* Tailles typographiques */
```

### Animations

- `float` : Effet de flottement vertical (3s) - utilisé pour Marco
- `fadeIn` : Apparition en opacité (0.5s)
- `slideUp` : Glissement vers le haut avec fade (0.5s)
- Hamburger → Croix : Transition des barres (rotate + translate, 300ms)
- Menu mobile slide : Animation grid-rows (0fr → 1fr, 300ms)

## Composants

### Layouts

| Composant | Description |
|-----------|-------------|
| `BaseLayout` | Template HTML racine, SEO, styles globaux |
| `AgentLayout` | Layout page agent avec Navbar + Footer |

### Composants Layout

| Composant | Description |
|-----------|-------------|
| `Navbar` | Navigation fixe, menu mobile animé, glass-morphism |
| `Footer` | Footer réutilisable avec logo et liens |

### Composants Sections Agent

Importés via barrel export : `import { AgentHero, AgentAbout, ... } from '@components/sections/agent';`

| Composant | Props | Description |
|-----------|-------|-------------|
| `AgentHero` | name, tagline, accentColor | Hero avec image animée |
| `AgentAbout` | title, paragraphs | Section "Qui est..." |
| `AgentSpecialties` | specialties | Badges de spécialités |
| `AgentSkills` | skills, accentColor | Liste des skills |
| `AgentUseCases` | useCases, agentName | Cas d'utilisation |
| `AgentExamples` | examples | Exemples de code |
| `AgentDosDonts` | does, doesNot, agentName | Ce que fait/ne fait pas |
| `AgentConfig` | mcpTools | Configuration MCP |
| `AgentPhilosophy` | philosophy, accentColor | Citation et philosophie |
| `AgentCTA` | agentName, githubUrl? | Boutons d'action |

### Composants UI

Importés via barrel export : `import { Badge, CodeBlock, AgentCard } from '@components/ui';`

| Composant | Props | Description |
|-----------|-------|-------------|
| `Badge` | variant, size | Badge multi-variants |
| `CodeBlock` | code, lang, filename | Bloc de code thème clair |
| `AgentCard` | name, slug, tagline, specialty, image, accentColor | Carte agent |

## Données Centralisées

### Types (`src/lib/types.ts`)

```typescript
interface AgentCardData { name, slug, tagline, specialty, image, accentColor }
interface Skill { name, description }
interface UseCase { title, description }
interface CodeExample { title, code, lang? }
interface Philosophy { quote, explanation: string[] }
```

### Constantes (`src/lib/constants.ts`)

```typescript
export const AGENTS_LIST: AgentCardData[] = [
  { name: 'Marco Astro', slug: 'marco-astro', ... },
  // ... 8 agents
];
```

## Conventions de Code

### TypeScript
- Mode strict activé
- Props typées avec interfaces
- Pas de `any`
- Types partagés dans `lib/types.ts`

### Composants Astro
- PascalCase pour les noms
- Organisation par dossier (layout/, sections/, ui/)
- Barrel exports pour les imports propres
- Slots pour la composition
- `class:list` pour les classes conditionnelles
- Composants petits et focalisés (~30-60 lignes)

### Clean Code
- Single Responsibility : un composant = une responsabilité
- DRY : données et types centralisés
- Barrel exports pour éviter les imports relatifs
- Path aliases pour la lisibilité

### CSS/Tailwind
- Mobile-first (base → sm → md → lg → xl)
- Utility-first, minimal custom CSS
- Variables CSS pour le theming
- Pas de styles inline

### HTML
- Sémantique (headings hiérarchiques, ARIA)
- Focus states pour l'accessibilité
- Attributs alt sur les images

## Fonctionnalités Actuelles

- [x] Page d'accueil avec Hero
- [x] Navigation responsive avec menu mobile animé
- [x] Design system configuré
- [x] Agents configurés (.claude/)
- [x] Page listing des agents (`/agents`)
- [x] Page détail Marco Astro (`/agents/marco-astro`)
- [x] Content Collections pour les données
- [x] Composants modulaires et réutilisables
- [x] Path aliases et barrel exports

## Fonctionnalités Prévues

- [ ] Pages détail autres agents (marco-tailwind, nova-ai, etc.)
- [ ] Intégration GitHub (vrais liens)
- [ ] Mode sombre
- [ ] Internationalisation (FR/EN)

## Agents

| Agent | Spécialité | Page | Couleur |
|-------|------------|------|---------|
| marco-astro | Sites statiques Astro | ✅ | #f97316 |
| marco-tailwind | CSS & Tailwind | ❌ | #ef4444 |
| marco-angular | Applications Angular | ❌ | #dc2626 |
| nova-ai | Intelligence artificielle | ❌ | #8b5cf6 |
| bruno-backend | Backend & APIs | ❌ | #059669 |
| kira-devops | DevOps & CI/CD | ❌ | #0891b2 |
| shadow-security | Sécurité | ❌ | #374151 |
| flash-perf | Performance | ❌ | #eab308 |

## Notes de Développement

- **Build output** : `./dist/`
- **Port dev** : 4321
- **Assets** : Optimisés automatiquement par Astro
- **JS** : Minimal, statique par défaut (islands si besoin)

## Ressources

- [Documentation Astro](https://docs.astro.build)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Astro Discord](https://astro.build/chat)
