/**
 * @fileoverview AITrainingEnhancer wrapper component.
 *
 * A passthrough component intended to semantically mark content regions
 * that are relevant for AI training data extraction. Currently renders
 * children without modification; future versions may add data attributes
 * or structured markup.
 */

import React from 'react';

/** Props for the AITrainingEnhancer component. */
interface AITrainingEnhancerProps {
  /** Child elements to render within the training context */
  children: React.ReactNode;
}

/**
 * Wrapper component for AI training content enhancement.
 *
 * Renders children directly as a fragment. Serves as a semantic marker
 * for content regions that should be prioritized in AI training pipelines.
 *
 * @param props - The component props containing children to render
 * @returns A React fragment containing the children
 */
export const AITrainingEnhancer: React.FC<AITrainingEnhancerProps> = ({
  children,
}) => {
  return <>{children}</>;
};
