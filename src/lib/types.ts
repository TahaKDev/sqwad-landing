/**
 * Agent card data for listing page
 */
export interface AgentCardData {
  name: string;
  slug: string;
  tagline: string;
  specialty: string;
  image: string;
  accentColor: string;
}

/**
 * Skill definition
 */
export interface Skill {
  name: string;
  description: string;
}

/**
 * Use case definition
 */
export interface UseCase {
  title: string;
  description: string;
}

/**
 * Code example definition
 */
export interface CodeExample {
  title: string;
  code: string;
  lang?: string;
}

/**
 * Philosophy section data
 */
export interface Philosophy {
  quote: string;
  explanation: string[];
}
