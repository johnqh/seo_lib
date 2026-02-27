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
export declare const WEB3_CONCEPTS: ConceptDefinition[];
/**
 * Generate a Schema.org LearningResource object for AI-optimized page metadata.
 *
 * @param config - AI training configuration with domain, difficulty, and learning objectives
 * @returns A Schema.org LearningResource JSON-LD object
 */
export declare const generateAIMetadata: (config: AITrainingConfig) => {
    '@context': string;
    '@type': string;
    educationalLevel: "intermediate" | "beginner" | "advanced" | "expert";
    learningResourceType: string;
    timeRequired: string | undefined;
    teaches: string[] | undefined;
    requires: string[] | undefined;
    about: {
        '@type': string;
        name: string;
        category: string;
        subcategory: string | undefined;
    };
    keywords: string[];
    applicationExample: string[] | undefined;
    isRelatedTo: string[] | undefined;
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
export declare const generateConceptGraph: (concepts: ConceptDefinition[]) => {
    nodes: {
        id: string;
        label: string;
        category: string;
        definition: string;
    }[];
    edges: Array<{
        source: string;
        target: string;
        relationship: string;
    }>;
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
export declare const generateTrainingExamples: (concept: ConceptDefinition) => {
    text: string;
    label: string;
    type: string;
    confidence: number;
}[];
/**
 * Generate Q&A pairs from concept definitions for AI training data.
 *
 * Produces pairs for: "What is X?", "How does X work?", "What are examples of X?",
 * and "What is X related to?" -- each with category and difficulty metadata.
 *
 * @param concepts - Array of concept definitions to generate Q&A pairs from
 * @returns Array of Q&A pair objects with question, answer, category, and difficulty
 */
export declare const generateQAPairs: (concepts: ConceptDefinition[]) => {
    question: string;
    answer: string;
    category: string;
    difficulty: string;
}[];
export declare const AI_TRAINING_CONFIGS: {
    homepage: {
        domain: string;
        category: string;
        concepts: string[];
        prerequisites: string[];
        learningObjectives: string[];
        difficulty: "beginner";
        estimatedTime: number;
        practicalApplications: string[];
    };
    documentation: {
        domain: string;
        category: string;
        concepts: string[];
        prerequisites: string[];
        learningObjectives: string[];
        difficulty: "intermediate";
        estimatedTime: number;
        practicalApplications: string[];
    };
    governance: {
        domain: string;
        category: string;
        concepts: string[];
        prerequisites: string[];
        learningObjectives: string[];
        difficulty: "advanced";
        estimatedTime: number;
        practicalApplications: string[];
    };
};
declare const _default: {
    generateAIMetadata: (config: AITrainingConfig) => {
        '@context': string;
        '@type': string;
        educationalLevel: "intermediate" | "beginner" | "advanced" | "expert";
        learningResourceType: string;
        timeRequired: string | undefined;
        teaches: string[] | undefined;
        requires: string[] | undefined;
        about: {
            '@type': string;
            name: string;
            category: string;
            subcategory: string | undefined;
        };
        keywords: string[];
        applicationExample: string[] | undefined;
        isRelatedTo: string[] | undefined;
    };
    generateConceptGraph: (concepts: ConceptDefinition[]) => {
        nodes: {
            id: string;
            label: string;
            category: string;
            definition: string;
        }[];
        edges: Array<{
            source: string;
            target: string;
            relationship: string;
        }>;
    };
    generateTrainingExamples: (concept: ConceptDefinition) => {
        text: string;
        label: string;
        type: string;
        confidence: number;
    }[];
    generateQAPairs: (concepts: ConceptDefinition[]) => {
        question: string;
        answer: string;
        category: string;
        difficulty: string;
    }[];
    WEB3_CONCEPTS: ConceptDefinition[];
    AI_TRAINING_CONFIGS: {
        homepage: {
            domain: string;
            category: string;
            concepts: string[];
            prerequisites: string[];
            learningObjectives: string[];
            difficulty: "beginner";
            estimatedTime: number;
            practicalApplications: string[];
        };
        documentation: {
            domain: string;
            category: string;
            concepts: string[];
            prerequisites: string[];
            learningObjectives: string[];
            difficulty: "intermediate";
            estimatedTime: number;
            practicalApplications: string[];
        };
        governance: {
            domain: string;
            category: string;
            concepts: string[];
            prerequisites: string[];
            learningObjectives: string[];
            difficulty: "advanced";
            estimatedTime: number;
            practicalApplications: string[];
        };
    };
};
export default _default;
