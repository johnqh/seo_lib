/**
 * @fileoverview AIMeta component for rendering AI-specific meta tags.
 *
 * Provides meta tags that help AI crawlers and LLMs understand page content,
 * including content type classification, summaries, and complexity levels.
 * Uses react-helmet-async to inject tags into the document head.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Props for the AIMeta component.
 *
 * Note: Many optional props (blockchainNetworks, features, useCase, etc.) are
 * defined for future expansion but are not currently rendered by the component.
 * Only contentType, aiSummary, and technicalComplexity are used.
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
 * Currently renders three meta tags: `ai:content-type`, `ai:summary`, and `ai:complexity`.
 *
 * @param props - The AIMeta component props
 * @returns A Helmet component containing AI meta tags
 */
export const AIMeta: React.FC<AIMetaProps> = ({
  contentType,
  aiSummary,
  technicalComplexity = 'intermediate',
}) => {
  return (
    <Helmet>
      <meta name="ai:content-type" content={contentType} />
      <meta name="ai:summary" content={aiSummary} />
      <meta name="ai:complexity" content={technicalComplexity} />
    </Helmet>
  );
};
