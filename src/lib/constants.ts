import type { AgentCardData } from './types';

/**
 * Site metadata
 */
export const SITE = {
  name: 'Sqwad',
  description: 'Collection open source d\'agents Claude Code ultra-spécialisés',
  url: import.meta.env.SITE || 'https://sqwad.dev',
} as const;

/**
 * Default placeholder image for agents
 */
export const AGENT_PLACEHOLDER_IMAGE = '/images/agent-placeholder.png';

/**
 * All agents data for listing page
 * This is used when we don't have full content collection entries yet
 */
export const AGENTS_LIST: AgentCardData[] = [
  {
    name: 'Marco Astro',
    slug: 'marco-astro',
    tagline: 'Le meilleur JavaScript, c\'est celui qu\'on n\'envoie pas au client.',
    specialty: 'Astro & Sites Statiques',
    image: AGENT_PLACEHOLDER_IMAGE,
    accentColor: '#f97316',
  },
  {
    name: 'Marco Tailwind',
    slug: 'marco-tailwind',
    tagline: 'Pixel-perfect, responsive, et maintenable. Toujours.',
    specialty: 'CSS & Tailwind',
    image: AGENT_PLACEHOLDER_IMAGE,
    accentColor: '#ef4444',
  },
  {
    name: 'Marco Angular',
    slug: 'marco-angular',
    tagline: 'Enterprise-ready applications avec architecture solide.',
    specialty: 'Angular',
    image: AGENT_PLACEHOLDER_IMAGE,
    accentColor: '#dc2626',
  },
  {
    name: 'Nova AI',
    slug: 'nova-ai',
    tagline: 'Intelligence artificielle et machine learning intégrés.',
    specialty: 'IA & ML',
    image: AGENT_PLACEHOLDER_IMAGE,
    accentColor: '#8b5cf6',
  },
  {
    name: 'Bruno Backend',
    slug: 'bruno-backend',
    tagline: 'APIs robustes, scalables et sécurisées.',
    specialty: 'Backend & APIs',
    image: AGENT_PLACEHOLDER_IMAGE,
    accentColor: '#059669',
  },
  {
    name: 'Kira DevOps',
    slug: 'kira-devops',
    tagline: 'CI/CD, infrastructure as code, et déploiement continu.',
    specialty: 'DevOps & CI/CD',
    image: AGENT_PLACEHOLDER_IMAGE,
    accentColor: '#0891b2',
  },
  {
    name: 'Shadow Security',
    slug: 'shadow-security',
    tagline: 'Sécurité applicative et protection des données.',
    specialty: 'Sécurité',
    image: AGENT_PLACEHOLDER_IMAGE,
    accentColor: '#374151',
  },
  {
    name: 'Flash Perf',
    slug: 'flash-perf',
    tagline: 'Optimisation et performance à tous les niveaux.',
    specialty: 'Performance',
    image: AGENT_PLACEHOLDER_IMAGE,
    accentColor: '#eab308',
  },
];
