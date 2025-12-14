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
│       └── agent-placeholder.png  # Image placeholder pour les agents
├── src/
│   ├── assets/images/       # Images (marco.png, marco-bg.png)
│   ├── components/
│   │   ├── layout/          # Composants de structure
│   │   │   └── Navbar.astro
│   │   ├── sections/        # Sections de page
│   │   │   └── Hero.astro
│   │   └── ui/              # Composants UI atomiques
│   │       ├── Badge.astro      # Badge réutilisable (variants: default, primary, secondary, orange, outline)
│   │       ├── CodeBlock.astro  # Bloc de code stylé (thème clair, bouton copy, numéros de ligne)
│   │       └── AgentCard.astro  # Carte agent pour la liste (image, nom, tagline, badge)
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Template de base
│   │   └── AgentLayout.astro    # Layout pour pages agent (hero + content + footer)
│   ├── pages/
│   │   ├── index.astro          # Page d'accueil
│   │   └── agents/
│   │       ├── index.astro      # Liste des agents (/agents)
│   │       └── marco-astro.astro # Page détail Marco Astro (/agents/marco-astro)
│   └── styles/
│       └── global.css       # Variables CSS & thème
├── astro.config.mjs
├── tsconfig.json
└── package.json
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
- Grille responsive de cartes agents (1 col mobile, 2 cols tablet, 3 cols desktop)
- 8 agents affichés avec image, nom, tagline, badge spécialité
- Lien vers la page détail de chaque agent

### Page Marco Astro (`/agents/marco-astro`)
- Hero : titre + tagline + image Marco animée (effet float)
- Section "Qui est Marco Astro ?" : description du personnage
- Spécialités : badges des compétences
- Skills intégrés : astro-conventions, tailwind-patterns, clean-code
- Cas d'utilisation : sites vitrine, documentation, blogs, marketing, open source
- Exemples d'utilisation : 5 exemples de prompts avec code blocks
- Ce que Marco fait / ne fait pas : listes comparatives
- Configuration : outils MCP utilisés
- Philosophie : citation + explication de l'approche
- CTA : liens GitHub et retour liste agents

## Design System

### Palette de Couleurs

- **Primary** : Bleu-teal (#b8dbe4 → #1a2e37) - Style PocketBase
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

## Composants Clés

### Layouts

#### BaseLayout.astro
- Wrapper HTML racine
- Gestion SEO et meta tags
- Import des styles globaux
- Langue : Français (`lang="fr"`)

#### AgentLayout.astro
- Layout spécifique aux pages agent
- Props : title, description, name, tagline, accentColor
- Inclut Navbar + slot content + Footer
- `pt-24` sur main pour compenser la navbar fixe

### Composants Layout

#### Navbar.astro
- Navigation fixe en haut (`h-16`)
- Logo Sqwad + barre de recherche
- Menu hamburger mobile animé (→ croix avec transition 300ms)
- Menu mobile avec animation slide (grid-rows transition)
- Effet glass-morphism (backdrop-blur)
- Liens : Agents, GitHub, Documentation
- Attributs ARIA pour l'accessibilité (aria-expanded)

### Composants Sections

#### Hero.astro
- Section d'accroche principale
- Headline : "Des agents IA qui codent comme des seniors"
- Liste de features avec checkmarks
- 2 CTA : "Voir les agents" + "Documentation GitHub"
- Mockup VS Code avec structure de projet
- Mascotte Marco animée (effet float)
  - Mobile : centrée au-dessus du VS Code mockup
  - Desktop : positionnée au coin haut gauche du VS Code

### Composants UI

#### Badge.astro
- Badge réutilisable avec variants
- Props : variant (default | primary | secondary | orange | outline), size (sm | md)
- Utilisé pour les spécialités et tags

#### CodeBlock.astro
- Bloc de code stylé thème clair
- Props : code, lang, filename
- Header avec boutons macOS (rouge/jaune/vert) + badge langage + bouton copy
- Numéros de ligne
- Highlight des `@mentions` en orange
- Commentaires en gris

#### AgentCard.astro
- Carte pour la liste des agents
- Props : name, slug, tagline, specialty, image, video?, accentColor
- Hover : élévation + shadow + scale image
- Support vidéo optionnel (autoplay, muted, loop)
- Lien vers `/agents/[slug]`

## Agents IA Disponibles

### Marco Astro (raccoon orange)
- Spécialiste Astro et sites statiques
- Performance, SSG, islands architecture
- SEO et optimisation
- Couleur accent : #f97316

### Marco Tailwind (raccoon rouge)
- Expert CSS et Tailwind
- Design responsive, animations
- Design systems, accessibilité
- Couleur accent : #ef4444

## Conventions de Code

### TypeScript
- Mode strict activé
- Props typées avec interfaces
- Pas de `any`

### Composants Astro
- PascalCase pour les noms
- Organisation par dossier (layout/, sections/, ui/)
- Slots pour la composition
- `class:list` pour les classes conditionnelles

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
- [x] Navigation responsive
- [x] Menu mobile animé (slide + hamburger → croix)
- [x] Animations d'entrée
- [x] Design system configuré
- [x] Agents configurés (.claude/)
- [x] Page listing des agents (`/agents`)
- [x] Page détail Marco Astro (`/agents/marco-astro`)
- [x] Composants UI réutilisables (Badge, CodeBlock, AgentCard)

## Fonctionnalités Prévues

- [ ] Pages détail autres agents (marco-tailwind, nova-ai, etc.)
- [ ] Section skills/compétences
- [ ] Intégration GitHub (vrais liens)
- [ ] Mode sombre
- [ ] Internationalisation (FR/EN)

## Agents Mentionnés

| Agent | Spécialité | Page | Couleur |
|-------|------------|------|---------|
| marco-astro | Sites statiques Astro | ✅ `/agents/marco-astro` | #f97316 |
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
- **Images agents** : Utiliser `agent-placeholder.png` en attendant les vraies images

## Ressources

- [Documentation Astro](https://docs.astro.build)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Astro Discord](https://astro.build/chat)
