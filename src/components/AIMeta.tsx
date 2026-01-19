import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface AIMetaProps {
  contentType: string;
  blockchainNetworks?: string[];
  tokenSupported?: boolean;
  walletRequired?: boolean;
  aiSummary: string;
  technicalComplexity?: string;
  useCase?: string[];
  targetAudience?: string[];
  integrations?: string[];
  features?: string[];
  dataFlow?: string[];
  businessValue?: string[];
  securityConsiderations?: string[];
  learningOutcomes?: string[];
}

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
