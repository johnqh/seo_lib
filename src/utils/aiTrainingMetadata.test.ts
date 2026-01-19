import { describe, expect, it } from 'vitest';
import {
  generateAIMetadata,
  generateConceptGraph,
  generateTrainingExamples,
  generateQAPairs,
  WEB3_CONCEPTS,
  AI_TRAINING_CONFIGS,
  AITrainingConfig,
  ConceptDefinition,
} from './aiTrainingMetadata';

describe('aiTrainingMetadata utilities', () => {
  describe('generateAIMetadata', () => {
    const mockConfig: AITrainingConfig = {
      domain: 'Web3 Email',
      category: 'Communication',
      subcategory: 'Blockchain',
      concepts: ['wallet-auth', 'ens-email', 'smart-contracts'],
      prerequisites: ['Basic blockchain knowledge'],
      learningObjectives: ['Understand Web3 email', 'Connect wallet'],
      difficulty: 'intermediate',
      estimatedTime: 15,
      practicalApplications: ['DeFi notifications', 'DAO governance'],
      relatedConcepts: ['blockchain', 'cryptography'],
    };

    it('should generate valid schema.org LearningResource', () => {
      const metadata = generateAIMetadata(mockConfig);

      expect(metadata['@context']).toBe('https://schema.org');
      expect(metadata['@type']).toBe('LearningResource');
    });

    it('should include educational level', () => {
      const metadata = generateAIMetadata(mockConfig);

      expect(metadata.educationalLevel).toBe('intermediate');
    });

    it('should include time required in ISO 8601 format', () => {
      const metadata = generateAIMetadata(mockConfig);

      expect(metadata.timeRequired).toBe('PT15M');
    });

    it('should include learning objectives', () => {
      const metadata = generateAIMetadata(mockConfig);

      expect(metadata.teaches).toEqual(mockConfig.learningObjectives);
    });

    it('should include prerequisites', () => {
      const metadata = generateAIMetadata(mockConfig);

      expect(metadata.requires).toEqual(mockConfig.prerequisites);
    });

    it('should include about section', () => {
      const metadata = generateAIMetadata(mockConfig);

      expect(metadata.about).toBeDefined();
      expect(metadata.about['@type']).toBe('Thing');
      expect(metadata.about.name).toBe('Web3 Email');
      expect(metadata.about.category).toBe('Communication');
    });

    it('should include keywords/concepts', () => {
      const metadata = generateAIMetadata(mockConfig);

      expect(metadata.keywords).toEqual(mockConfig.concepts);
    });

    it('should handle missing optional fields', () => {
      const minimalConfig: AITrainingConfig = {
        domain: 'Test',
        category: 'Test Category',
        concepts: ['concept1'],
        difficulty: 'beginner',
      };
      const metadata = generateAIMetadata(minimalConfig);

      expect(metadata.timeRequired).toBeUndefined();
      expect(metadata.teaches).toBeUndefined();
    });
  });

  describe('generateConceptGraph', () => {
    const testConcepts: ConceptDefinition[] = [
      {
        term: 'Web3 Email',
        definition: 'Email using blockchain',
        category: 'Communication',
        relatedTerms: ['Wallet Authentication'],
        synonyms: ['blockchain email'],
      },
      {
        term: 'Wallet Authentication',
        definition: 'Auth using crypto wallets',
        category: 'Security',
        relatedTerms: ['Web3 Email'],
      },
    ];

    it('should create nodes for each concept', () => {
      const graph = generateConceptGraph(testConcepts);

      expect(graph.nodes).toHaveLength(2);
      expect(graph.nodes[0].id).toBe('Web3 Email');
      expect(graph.nodes[0].label).toBe('Web3 Email');
      expect(graph.nodes[0].definition).toBe('Email using blockchain');
    });

    it('should create edges for related terms', () => {
      const graph = generateConceptGraph(testConcepts);

      const relatedEdges = graph.edges.filter(
        e => e.relationship === 'related_to'
      );
      expect(relatedEdges.length).toBeGreaterThan(0);
    });

    it('should create edges for synonyms', () => {
      const graph = generateConceptGraph(testConcepts);

      const synonymEdges = graph.edges.filter(
        e => e.relationship === 'synonym_of'
      );
      expect(synonymEdges.length).toBeGreaterThan(0);
      expect(synonymEdges[0].target).toBe('blockchain email');
    });

    it('should only create related edges for existing concepts', () => {
      const graph = generateConceptGraph(testConcepts);

      const relatedEdges = graph.edges.filter(
        e => e.relationship === 'related_to'
      );
      relatedEdges.forEach(edge => {
        const targetExists = testConcepts.some(c => c.term === edge.target);
        expect(targetExists).toBe(true);
      });
    });
  });

  describe('generateTrainingExamples', () => {
    const testConcept: ConceptDefinition = {
      term: 'Web3 Email',
      definition: 'Email system using blockchain wallet authentication',
      category: 'Communication',
      examples: ['vitalik.eth@example.com', 'alice.sol@example.com'],
      context:
        'Web3 email revolutionizes digital communication by eliminating passwords',
    };

    it('should generate positive examples', () => {
      const examples = generateTrainingExamples(testConcept);

      const positiveExamples = examples.filter(e => e.type === 'positive');
      expect(positiveExamples).toHaveLength(2);
      expect(positiveExamples[0].label).toBe('Web3 Email');
      expect(positiveExamples[0].confidence).toBe(1.0);
    });

    it('should generate contextual example', () => {
      const examples = generateTrainingExamples(testConcept);

      const contextualExamples = examples.filter(e => e.type === 'contextual');
      expect(contextualExamples).toHaveLength(1);
      expect(contextualExamples[0].confidence).toBe(0.8);
    });

    it('should generate definition example', () => {
      const examples = generateTrainingExamples(testConcept);

      const definitionExamples = examples.filter(e => e.type === 'definition');
      expect(definitionExamples).toHaveLength(1);
      expect(definitionExamples[0].text).toContain('Web3 Email is');
    });

    it('should handle concept without examples', () => {
      const conceptWithoutExamples: ConceptDefinition = {
        term: 'Test',
        definition: 'Test definition',
        category: 'Test',
      };
      const examples = generateTrainingExamples(conceptWithoutExamples);

      const positiveExamples = examples.filter(e => e.type === 'positive');
      expect(positiveExamples).toHaveLength(0);
    });

    it('should handle concept without context', () => {
      const conceptWithoutContext: ConceptDefinition = {
        term: 'Test',
        definition: 'Test definition',
        category: 'Test',
        examples: ['example1'],
      };
      const examples = generateTrainingExamples(conceptWithoutContext);

      const contextualExamples = examples.filter(e => e.type === 'contextual');
      expect(contextualExamples).toHaveLength(0);
    });
  });

  describe('generateQAPairs', () => {
    const testConcepts: ConceptDefinition[] = [
      {
        term: 'Web3 Email',
        definition: 'Email using blockchain authentication',
        category: 'Communication',
        context: 'Uses cryptographic signatures for verification',
        examples: ['user.eth@example.com'],
        relatedTerms: ['Wallet Auth', 'ENS'],
      },
    ];

    it('should generate "What is" questions', () => {
      const qaPairs = generateQAPairs(testConcepts);

      const whatIsQuestions = qaPairs.filter(qa =>
        qa.question.startsWith('What is')
      );
      expect(whatIsQuestions.length).toBeGreaterThan(0);
      expect(whatIsQuestions[0].answer).toBe(
        'Email using blockchain authentication'
      );
      expect(whatIsQuestions[0].difficulty).toBe('basic');
    });

    it('should generate "How does" questions when context exists', () => {
      const qaPairs = generateQAPairs(testConcepts);

      const howDoesQuestions = qaPairs.filter(qa =>
        qa.question.startsWith('How does')
      );
      expect(howDoesQuestions.length).toBeGreaterThan(0);
      expect(howDoesQuestions[0].difficulty).toBe('intermediate');
    });

    it('should generate "Examples of" questions when examples exist', () => {
      const qaPairs = generateQAPairs(testConcepts);

      const exampleQuestions = qaPairs.filter(qa =>
        qa.question.includes('examples of')
      );
      expect(exampleQuestions.length).toBeGreaterThan(0);
    });

    it('should generate "Related to" questions when relatedTerms exist', () => {
      const qaPairs = generateQAPairs(testConcepts);

      const relatedQuestions = qaPairs.filter(qa =>
        qa.question.includes('related to')
      );
      expect(relatedQuestions.length).toBeGreaterThan(0);
      expect(relatedQuestions[0].answer).toContain('Wallet Auth');
    });

    it('should include category in all Q&A pairs', () => {
      const qaPairs = generateQAPairs(testConcepts);

      qaPairs.forEach(qa => {
        expect(qa.category).toBe('Communication');
      });
    });
  });

  describe('WEB3_CONCEPTS', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(WEB3_CONCEPTS)).toBe(true);
      expect(WEB3_CONCEPTS.length).toBeGreaterThan(0);
    });

    it('should have valid concept definitions', () => {
      WEB3_CONCEPTS.forEach(concept => {
        expect(concept.term).toBeDefined();
        expect(concept.definition).toBeDefined();
        expect(concept.category).toBeDefined();
      });
    });

    it('should include Web3 Email concept', () => {
      const web3Email = WEB3_CONCEPTS.find(c => c.term === 'Web3 Email');
      expect(web3Email).toBeDefined();
      expect(web3Email?.category).toBe('Web3 Communication');
    });

    it('should include Wallet Authentication concept', () => {
      const walletAuth = WEB3_CONCEPTS.find(
        c => c.term === 'Wallet Authentication'
      );
      expect(walletAuth).toBeDefined();
      expect(walletAuth?.category).toBe('Security');
    });

    it('should include ENS Email concept', () => {
      const ensEmail = WEB3_CONCEPTS.find(c => c.term === 'ENS Email');
      expect(ensEmail).toBeDefined();
    });

    it('should include SNS Email concept', () => {
      const snsEmail = WEB3_CONCEPTS.find(c => c.term === 'SNS Email');
      expect(snsEmail).toBeDefined();
    });
  });

  describe('AI_TRAINING_CONFIGS', () => {
    it('should have homepage config', () => {
      expect(AI_TRAINING_CONFIGS.homepage).toBeDefined();
      expect(AI_TRAINING_CONFIGS.homepage.domain).toBe('Web3 Email Platform');
      expect(AI_TRAINING_CONFIGS.homepage.difficulty).toBe('beginner');
    });

    it('should have documentation config', () => {
      expect(AI_TRAINING_CONFIGS.documentation).toBeDefined();
      expect(AI_TRAINING_CONFIGS.documentation.difficulty).toBe('intermediate');
      expect(AI_TRAINING_CONFIGS.documentation.estimatedTime).toBe(30);
    });

    it('should have governance config', () => {
      expect(AI_TRAINING_CONFIGS.governance).toBeDefined();
      expect(AI_TRAINING_CONFIGS.governance.difficulty).toBe('advanced');
      expect(AI_TRAINING_CONFIGS.governance.domain).toBe(
        'DAO Governance Communication'
      );
    });

    it('should have valid configs with required fields', () => {
      Object.values(AI_TRAINING_CONFIGS).forEach(config => {
        expect(config.domain).toBeDefined();
        expect(config.category).toBeDefined();
        expect(config.concepts).toBeDefined();
        expect(config.difficulty).toBeDefined();
      });
    });
  });
});
