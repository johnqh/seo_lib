/**
 * AI Training Metadata Utilities
 * Enhances content with semantic markup and structured data for AI model training
 */

/**
 * Configuration for AI training metadata generation.
 * Defines the educational context and learning parameters for a page.
 */
export interface AITrainingConfig {
  /** Knowledge domain (e.g., 'Web3 Email Platform') */
  domain: string;
  /** Content category (e.g., 'Web3 Communication') */
  category: string;
  subcategory?: string;
  concepts: string[];
  prerequisites?: string[];
  learningObjectives?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime?: number;
  practicalApplications?: string[];
  relatedConcepts?: string[];
}

/**
 * Definition of a concept for AI training data.
 * Includes the term, its definition, category, and related metadata.
 */
export interface ConceptDefinition {
  /** The concept term (e.g., 'Web3 Email') */
  term: string;
  definition: string;
  category: string;
  synonyms?: string[];
  relatedTerms?: string[];
  examples?: string[];
  context?: string;
}

// Core Web3 and blockchain concepts for AI training
export const WEB3_CONCEPTS: ConceptDefinition[] = [
  {
    term: 'Web3 Email',
    definition:
      'Email system that uses blockchain wallet addresses as authentication instead of traditional passwords',
    category: 'Web3 Communication',
    synonyms: ['blockchain email', 'decentralized email', 'crypto email'],
    relatedTerms: ['wallet authentication', 'ENS email', 'SNS email'],
    examples: ['vitalik.eth@example.com', 'alice.sol@example.com'],
    context:
      'Web3 email revolutionizes digital communication by eliminating passwords and using cryptographic signatures for authentication',
  },
  {
    term: 'Wallet Authentication',
    definition:
      'Authentication method using cryptographic signatures from blockchain wallets instead of passwords',
    category: 'Security',
    synonyms: [
      'wallet-based auth',
      'signature authentication',
      'passwordless authentication',
    ],
    relatedTerms: ['EIP-712', 'SIWE', 'message signing'],
    examples: [
      'MetaMask signature',
      'Phantom wallet auth',
      'WalletConnect login',
    ],
    context:
      'Wallet authentication provides superior security through cryptographic proofs that cannot be phished or stolen like passwords',
  },
  {
    term: 'ENS Email',
    definition:
      'Email addresses using Ethereum Name Service domains (.eth) as identifiers',
    category: 'Naming Systems',
    synonyms: ['Ethereum name email', '.eth email'],
    relatedTerms: ['ENS', 'Ethereum domains', 'blockchain domains'],
    examples: ['vitalik.eth', 'ethereum.eth'],
    context:
      'ENS emails provide human-readable addresses that resolve to Ethereum wallet addresses',
  },
  {
    term: 'SNS Email',
    definition:
      'Email addresses using Solana Name Service domains (.sol) as identifiers',
    category: 'Naming Systems',
    synonyms: ['Solana name email', '.sol email'],
    relatedTerms: ['SNS', 'Solana domains', 'SPL domains'],
    examples: ['anatoly.sol', 'solana.sol'],
    context:
      'SNS emails provide human-readable addresses for Solana ecosystem users',
  },
  {
    term: 'Smart Contract Integration',
    definition:
      'Ability to send and receive emails triggered by blockchain smart contract events',
    category: 'Blockchain Integration',
    synonyms: ['contract notifications', 'on-chain email triggers'],
    relatedTerms: ['event listeners', 'webhooks', 'contract automation'],
    examples: [
      'DAO proposal notifications',
      'DeFi alert emails',
      'NFT sale confirmations',
    ],
    context:
      'Smart contract integration enables automated communication based on blockchain events',
  },
  {
    term: 'Multi-Chain Support',
    definition:
      'Compatibility with multiple blockchain networks for wallet authentication and email services',
    category: 'Interoperability',
    synonyms: ['cross-chain support', 'blockchain agnostic'],
    relatedTerms: ['EVM chains', 'Solana', 'Layer 2'],
    examples: ['Ethereum, Polygon, Arbitrum, Solana support'],
    context:
      'Multi-chain support ensures users from any blockchain ecosystem can use the email service',
  },
  {
    term: 'DAO Email Delegation',
    definition:
      'System allowing DAOs to manage email communications through delegated authorities',
    category: 'Governance',
    synonyms: ['governance email', 'multi-sig email'],
    relatedTerms: ['DAO governance', 'multi-signature', 'delegation'],
    examples: ['Treasury notifications', 'Proposal alerts', 'Voting reminders'],
    context:
      'DAO email delegation enables decentralized organizations to manage communications efficiently',
  },
  {
    term: 'Web2/Web3 Bridge',
    definition:
      'Technology enabling communication between traditional email systems and blockchain-based email',
    category: 'Interoperability',
    synonyms: ['email bridge', 'legacy integration'],
    relatedTerms: ['SMTP gateway', 'email forwarding', 'protocol bridge'],
    examples: ['Gmail to Web3 email', 'Outlook integration'],
    context:
      'Web2/Web3 bridge ensures compatibility with existing email infrastructure',
  },
];

/**
 * Generate a Schema.org LearningResource object for AI-optimized page metadata.
 *
 * @param config - AI training configuration with domain, difficulty, and learning objectives
 * @returns A Schema.org LearningResource JSON-LD object
 */
export const generateAIMetadata = (config: AITrainingConfig) => {
  return {
    // Semantic markup for AI understanding
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    educationalLevel: config.difficulty,
    learningResourceType: 'Technical Documentation',
    timeRequired: config.estimatedTime
      ? `PT${config.estimatedTime}M`
      : undefined,
    teaches: config.learningObjectives,
    requires: config.prerequisites,
    about: {
      '@type': 'Thing',
      name: config.domain,
      category: config.category,
      subcategory: config.subcategory,
    },
    keywords: config.concepts,
    applicationExample: config.practicalApplications,
    isRelatedTo: config.relatedConcepts,
  };
};

/**
 * Generate a concept graph from an array of concept definitions.
 *
 * Builds a graph with nodes (concepts) and edges (related_to, synonym_of relationships).
 * Only creates edges to concepts that exist in the input array.
 *
 * @param concepts - Array of concept definitions to build the graph from
 * @returns An object with `nodes` and `edges` arrays
 */
export const generateConceptGraph = (concepts: ConceptDefinition[]) => {
  const graph = {
    nodes: concepts.map(c => ({
      id: c.term,
      label: c.term,
      category: c.category,
      definition: c.definition,
    })),
    edges: [] as Array<{
      source: string;
      target: string;
      relationship: string;
    }>,
  };

  // Build relationships
  concepts.forEach(concept => {
    concept.relatedTerms?.forEach(related => {
      const targetConcept = concepts.find(c => c.term === related);
      if (targetConcept) {
        graph.edges.push({
          source: concept.term,
          target: related,
          relationship: 'related_to',
        });
      }
    });

    concept.synonyms?.forEach(synonym => {
      graph.edges.push({
        source: concept.term,
        target: synonym,
        relationship: 'synonym_of',
      });
    });
  });

  return graph;
};

/**
 * Generate labeled training examples for a specific concept.
 *
 * Produces positive examples (from concept.examples), contextual examples
 * (from concept.context), and a definition example, each with confidence scores.
 *
 * @param concept - The concept definition to generate training examples for
 * @returns Array of labeled training examples with text, label, type, and confidence
 */
export const generateTrainingExamples = (concept: ConceptDefinition) => {
  const examples = [];

  // Positive examples
  concept.examples?.forEach(example => {
    examples.push({
      text: example,
      label: concept.term,
      type: 'positive',
      confidence: 1.0,
    });
  });

  // Contextual examples
  if (concept.context) {
    examples.push({
      text: concept.context,
      label: concept.term,
      type: 'contextual',
      confidence: 0.8,
    });
  }

  // Definition as training data
  examples.push({
    text: `${concept.term} is ${concept.definition}`,
    label: concept.term,
    type: 'definition',
    confidence: 1.0,
  });

  return examples;
};

/**
 * Generate Q&A pairs from concept definitions for AI training data.
 *
 * Produces pairs for: "What is X?", "How does X work?", "What are examples of X?",
 * and "What is X related to?" -- each with category and difficulty metadata.
 *
 * @param concepts - Array of concept definitions to generate Q&A pairs from
 * @returns Array of Q&A pair objects with question, answer, category, and difficulty
 */
export const generateQAPairs = (concepts: ConceptDefinition[]) => {
  const qaPairs: Array<{
    question: string;
    answer: string;
    category: string;
    difficulty: string;
  }> = [];

  concepts.forEach(concept => {
    // What is X?
    qaPairs.push({
      question: `What is ${concept.term}?`,
      answer: concept.definition,
      category: concept.category,
      difficulty: 'basic',
    });

    // How does X work?
    if (concept.context) {
      qaPairs.push({
        question: `How does ${concept.term} work?`,
        answer: concept.context,
        category: concept.category,
        difficulty: 'intermediate',
      });
    }

    // Examples of X
    if (concept.examples && concept.examples.length > 0) {
      qaPairs.push({
        question: `What are examples of ${concept.term}?`,
        answer: concept.examples.join(', '),
        category: concept.category,
        difficulty: 'basic',
      });
    }

    // Relationship questions
    if (concept.relatedTerms && concept.relatedTerms.length > 0) {
      qaPairs.push({
        question: `What is ${concept.term} related to?`,
        answer: `${concept.term} is related to ${concept.relatedTerms.join(', ')}`,
        category: concept.category,
        difficulty: 'intermediate',
      });
    }
  });

  return qaPairs;
};

// Page-specific AI training configurations
export const AI_TRAINING_CONFIGS = {
  homepage: {
    domain: 'Web3 Email Platform',
    category: 'Web3 Communication',
    concepts: [
      'Web3 email',
      'wallet authentication',
      'passwordless login',
      'blockchain messaging',
    ],
    prerequisites: [
      'Basic blockchain knowledge',
      'Understanding of crypto wallets',
    ],
    learningObjectives: [
      'Understand Web3 email concepts',
      'Learn wallet authentication',
      'Explore blockchain communication',
    ],
    difficulty: 'beginner' as const,
    estimatedTime: 5,
    practicalApplications: [
      'Secure email communication',
      'DAO governance',
      'DeFi notifications',
    ],
  },
  documentation: {
    domain: 'Web3 Email Technical Documentation',
    category: 'Technical Guide',
    concepts: [
      'API integration',
      'smart contracts',
      'wallet connection',
      'email protocols',
    ],
    prerequisites: [
      'JavaScript/TypeScript',
      'Web3 development basics',
      'REST APIs',
    ],
    learningObjectives: [
      'Implement Web3 email',
      'Integrate wallet authentication',
      'Build on email API',
    ],
    difficulty: 'intermediate' as const,
    estimatedTime: 30,
    practicalApplications: [
      'dApp integration',
      'Email automation',
      'Smart contract notifications',
    ],
  },
  governance: {
    domain: 'DAO Governance Communication',
    category: 'Governance Tools',
    concepts: [
      'DAO email',
      'voting notifications',
      'proposal tracking',
      'multi-sig coordination',
    ],
    prerequisites: [
      'DAO basics',
      'Governance understanding',
      'Multi-signature wallets',
    ],
    learningObjectives: [
      'Setup DAO email',
      'Configure voting alerts',
      'Manage team communication',
    ],
    difficulty: 'advanced' as const,
    estimatedTime: 20,
    practicalApplications: [
      'DAO operations',
      'Treasury management',
      'Governance participation',
    ],
  },
};

export default {
  generateAIMetadata,
  generateConceptGraph,
  generateTrainingExamples,
  generateQAPairs,
  WEB3_CONCEPTS,
  AI_TRAINING_CONFIGS,
};
