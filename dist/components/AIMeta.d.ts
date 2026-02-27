/**
 * @fileoverview AIMeta component for rendering AI-specific meta tags.
 *
 * Provides meta tags that help AI crawlers and LLMs understand page content,
 * including content type classification, summaries, complexity levels,
 * blockchain networks, features, use cases, audience, and more.
 * Uses react-helmet-async to inject tags into the document head.
 */
import React from 'react';
/**
 * Props for the AIMeta component.
 *
 * All optional props are rendered as meta tags when provided.
 * Array values are joined with commas. Boolean values are rendered
 * as "true" or "false".
 */
export interface AIMetaProps {
    /** The type of content on the page (e.g., 'tutorial', 'reference', 'overview') */
    contentType: string;
    /** Blockchain networks relevant to this page */
    blockchainNetworks?: string[];
    /** Whether the page describes token-supported features */
    tokenSupported?: boolean;
    /** Whether the page requires wallet connectivity */
    walletRequired?: boolean;
    /** A concise AI-readable summary of the page content */
    aiSummary: string;
    /** Technical complexity level for AI classification */
    technicalComplexity?: string;
    /** Use cases described on the page */
    useCase?: string[];
    /** Target audience segments */
    targetAudience?: string[];
    /** Third-party integrations referenced */
    integrations?: string[];
    /** Features described on the page */
    features?: string[];
    /** Data flow descriptions */
    dataFlow?: string[];
    /** Business value propositions */
    businessValue?: string[];
    /** Security considerations mentioned */
    securityConsiderations?: string[];
    /** Learning outcomes for the reader */
    learningOutcomes?: string[];
}
/**
 * AIMeta component that renders AI-specific meta tags into the document head.
 *
 * Renders meta tags for all provided props: `ai:content-type`, `ai:summary`,
 * `ai:complexity`, `ai:blockchain-networks`, `ai:token-support`,
 * `ai:wallet-requirements`, `ai:use-case`, `ai:audience`, `ai:integrations`,
 * `ai:features`, `ai:data-flow`, `ai:business-value`,
 * `ai:security-considerations`, and `ai:learning-outcomes`.
 *
 * @param props - The AIMeta component props
 * @returns A Helmet component containing AI meta tags
 */
export declare const AIMeta: React.FC<AIMetaProps>;
