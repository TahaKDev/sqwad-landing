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
│   └── favicon.svg
├── src/
│   ├── assets/images/       # Images (marco.png, marco-bg.png)
│   ├── components/
│   │   ├── layout/          # Composants de structure
│   │   │   └── Navbar.astro
│   │   ├── sections/        # Sections de page
│   │   │   └── Hero.astro
│   │   └── ui/              # Composants UI atomiques
│   ├── layouts/
│   │   └── BaseLayout.astro # Template de base
│   ├── pages/
│   │   └── index.astro      # Page d'accueil
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

## Design System

### Palette de Couleurs

- **Primary** : Bleu-teal (#b8dbe4 → #1a2e37) - Style PocketBase
- **Secondary** : Rose/coral (#ecbdb8 → #371916)
- **Neutral** : Échelle de gris complète (50-950)
- **Accent** : Emerald pour les états de succès

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

- `float` : Effet de flottement vertical (3s)
- `fadeIn` : Apparition en opacité (0.5s)
- `slideUp` : Glissement vers le haut avec fade (0.5s)
- Hamburger → Croix : Transition des barres (rotate + translate, 300ms)
- Menu mobile slide : Animation grid-rows (0fr → 1fr, 300ms)

## Composants Clés

### BaseLayout.astro
- Wrapper HTML racine
- Gestion SEO et meta tags
- Import des styles globaux
- Langue : Français (`lang="fr"`)

### Navbar.astro
- Navigation fixe en haut
- Logo Sqwad + barre de recherche
- Menu hamburger mobile animé (→ croix avec transition 300ms)
- Menu mobile avec animation slide (grid-rows transition)
- Effet glass-morphism (backdrop-blur)
- Liens : Agents, GitHub, Documentation
- Attributs ARIA pour l'accessibilité (aria-expanded)

### Hero.astro
- Section d'accroche principale
- Headline : "Des agents IA qui codent comme des seniors"
- Liste de features avec checkmarks
- 2 CTA : "Voir les agents" + "Documentation GitHub"
- Mockup VS Code avec structure de projet
- Mascotte Marco animée (effet float)
  - Mobile : centrée au-dessus du VS Code mockup
  - Desktop : positionnée au coin haut gauche du VS Code

## Agents IA Disponibles

### Marco Astro (raccoon orange)
- Spécialiste Astro et sites statiques
- Performance, SSG, islands architecture
- SEO et optimisation

### Marco Tailwind (raccoon rouge)
- Expert CSS et Tailwind
- Design responsive, animations
- Design systems, accessibilité

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

## Fonctionnalités Prévues

- [ ] Page listing des agents
- [ ] Pages détail par agent
- [ ] Section skills/compétences
- [ ] Intégration GitHub
- [ ] Mode sombre
- [ ] Internationalisation (FR/EN)

## Agents Mentionnés dans le Hero

| Agent | Spécialité |
|-------|------------|
| marco-astro | Sites statiques Astro |
| marco-tailwind | CSS & Tailwind |
| marco-angular | Applications Angular |
| nova-ai | Intelligence artificielle |
| bruno-backend | Backend & APIs |
| kira-devops | DevOps & CI/CD |
| shadow-security | Sécurité |
| flash-perf | Performance |

## Notes de Développement

- **Build output** : `./dist/`
- **Port dev** : 4321
- **Assets** : Optimisés automatiquement par Astro
- **JS** : Minimal, statique par défaut (islands si besoin)

## Ressources

- [Documentation Astro](https://docs.astro.build)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Astro Discord](https://astro.build/chat)
