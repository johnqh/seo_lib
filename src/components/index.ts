/**
 * SEO Components
 */

// Core SEO Component
export { SEO, type SEOProps, type SEOConfig } from './SEO';

// Per-route SEO Head
export { SEOHead, type SEOHeadProps } from './SEOHead';
export {
  SEOHeadProvider,
  useSEOHeadConfig,
  type SEOHeadConfig,
} from './SEOHeadContext';

// AI-optimized Meta
export { AIMeta, type AIMetaProps } from './AIMeta';

// Semantic HTML Elements
export * from './SemanticHTML';

// AI Training Enhancer
export { AITrainingEnhancer } from './AITrainingEnhancer';
