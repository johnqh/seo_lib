import React from 'react';

interface AITrainingEnhancerProps {
  children: React.ReactNode;
}

export const AITrainingEnhancer: React.FC<AITrainingEnhancerProps> = ({
  children,
}) => {
  return <>{children}</>;
};
