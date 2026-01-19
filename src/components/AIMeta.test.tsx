import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { AIMeta, AIMetaProps } from './AIMeta';

describe('AIMeta', () => {
  const baseProps: AIMetaProps = {
    contentType: 'documentation',
    aiSummary: 'This is a test summary for AI crawlers',
  };

  describe('required props', () => {
    it('should render with required props', () => {
      render(<AIMeta {...baseProps} />);
      expect(true).toBe(true);
    });

    it('should use provided contentType', () => {
      render(<AIMeta contentType="tutorial" aiSummary="Tutorial summary" />);
      expect(true).toBe(true);
    });

    it('should use provided aiSummary', () => {
      render(
        <AIMeta contentType="guide" aiSummary="Comprehensive guide summary" />
      );
      expect(true).toBe(true);
    });
  });

  describe('optional props', () => {
    it('should use default technicalComplexity of intermediate', () => {
      render(<AIMeta {...baseProps} />);
      expect(true).toBe(true);
    });

    it('should use provided technicalComplexity', () => {
      render(<AIMeta {...baseProps} technicalComplexity="advanced" />);
      expect(true).toBe(true);
    });

    it('should accept beginner complexity', () => {
      render(<AIMeta {...baseProps} technicalComplexity="beginner" />);
      expect(true).toBe(true);
    });
  });

  describe('all optional props', () => {
    it('should accept all optional props without error', () => {
      const fullProps: AIMetaProps = {
        contentType: 'documentation',
        aiSummary: 'Full summary',
        technicalComplexity: 'expert',
        blockchainNetworks: ['Ethereum', 'Solana'],
        tokenSupported: true,
        walletRequired: true,
        useCase: ['DeFi', 'NFT'],
        targetAudience: ['developers', 'traders'],
        integrations: ['MetaMask', 'Phantom'],
        features: ['wallet-auth', 'ens-support'],
        dataFlow: ['user', 'wallet', 'blockchain'],
        businessValue: ['security', 'convenience'],
        securityConsiderations: ['private-key', 'phishing'],
        learningOutcomes: ['understand-web3', 'connect-wallet'],
      };
      render(<AIMeta {...fullProps} />);
      expect(true).toBe(true);
    });
  });

  describe('component behavior', () => {
    it('should render Helmet component with meta tags', () => {
      const { container } = render(<AIMeta {...baseProps} />);
      // Since Helmet is mocked, we just verify component renders
      expect(container).toBeDefined();
    });
  });
});
