import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { AIMeta, AIMetaProps } from './AIMeta';

// Track meta tags rendered by Helmet
let capturedMetaTags: Array<{ name: string; content: string }> = [];

vi.mock('react-helmet-async', () => ({
  Helmet: ({
    children,
  }: {
    children: React.ReactNode | React.ReactNode[];
  }) => {
    // Extract meta tag props from the children React elements
    const childArray = Array.isArray(children) ? children : [children];
    capturedMetaTags = [];
    const flatten = (items: unknown[]) => {
      for (const child of items) {
        if (Array.isArray(child)) {
          flatten(child);
        } else if (
          child &&
          typeof child === 'object' &&
          'props' in (child as Record<string, unknown>) &&
          'type' in (child as Record<string, unknown>)
        ) {
          const el = child as { type: string; props: Record<string, string> };
          if (el.type === 'meta' && el.props?.name && el.props?.content) {
            capturedMetaTags.push({
              name: el.props.name,
              content: el.props.content,
            });
          }
        }
      }
    };
    flatten(childArray);
    return null;
  },
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const getMetaTag = (name: string): string | undefined => {
  const tag = capturedMetaTags.find(t => t.name === name);
  return tag?.content;
};

describe('AIMeta', () => {
  const baseProps: AIMetaProps = {
    contentType: 'documentation',
    aiSummary: 'This is a test summary for AI crawlers',
  };

  beforeEach(() => {
    capturedMetaTags = [];
  });

  describe('required props', () => {
    it('should render content-type meta tag', () => {
      render(<AIMeta {...baseProps} />);
      expect(getMetaTag('ai:content-type')).toBe('documentation');
    });

    it('should render summary meta tag', () => {
      render(<AIMeta {...baseProps} />);
      expect(getMetaTag('ai:summary')).toBe(
        'This is a test summary for AI crawlers'
      );
    });

    it('should use provided contentType', () => {
      render(
        <AIMeta contentType="tutorial" aiSummary="Tutorial summary" />
      );
      expect(getMetaTag('ai:content-type')).toBe('tutorial');
    });

    it('should use provided aiSummary', () => {
      render(
        <AIMeta
          contentType="guide"
          aiSummary="Comprehensive guide summary"
        />
      );
      expect(getMetaTag('ai:summary')).toBe(
        'Comprehensive guide summary'
      );
    });
  });

  describe('optional props', () => {
    it('should use default technicalComplexity of intermediate', () => {
      render(<AIMeta {...baseProps} />);
      expect(getMetaTag('ai:complexity')).toBe('intermediate');
    });

    it('should use provided technicalComplexity', () => {
      render(
        <AIMeta {...baseProps} technicalComplexity="advanced" />
      );
      expect(getMetaTag('ai:complexity')).toBe('advanced');
    });

    it('should accept beginner complexity', () => {
      render(
        <AIMeta {...baseProps} technicalComplexity="beginner" />
      );
      expect(getMetaTag('ai:complexity')).toBe('beginner');
    });
  });

  describe('blockchain and web3 props', () => {
    it('should render blockchain-networks when provided', () => {
      render(
        <AIMeta
          {...baseProps}
          blockchainNetworks={['Ethereum', 'Solana', 'Polygon']}
        />
      );
      expect(getMetaTag('ai:blockchain-networks')).toBe(
        'Ethereum,Solana,Polygon'
      );
    });

    it('should not render blockchain-networks when empty array', () => {
      render(<AIMeta {...baseProps} blockchainNetworks={[]} />);
      expect(getMetaTag('ai:blockchain-networks')).toBeUndefined();
    });

    it('should not render blockchain-networks when not provided', () => {
      render(<AIMeta {...baseProps} />);
      expect(getMetaTag('ai:blockchain-networks')).toBeUndefined();
    });

    it('should render token-support as true', () => {
      render(<AIMeta {...baseProps} tokenSupported={true} />);
      expect(getMetaTag('ai:token-support')).toBe('true');
    });

    it('should render token-support as false', () => {
      render(<AIMeta {...baseProps} tokenSupported={false} />);
      expect(getMetaTag('ai:token-support')).toBe('false');
    });

    it('should not render token-support when not provided', () => {
      render(<AIMeta {...baseProps} />);
      expect(getMetaTag('ai:token-support')).toBeUndefined();
    });

    it('should render wallet-requirements as true', () => {
      render(<AIMeta {...baseProps} walletRequired={true} />);
      expect(getMetaTag('ai:wallet-requirements')).toBe('true');
    });

    it('should render wallet-requirements as false', () => {
      render(<AIMeta {...baseProps} walletRequired={false} />);
      expect(getMetaTag('ai:wallet-requirements')).toBe('false');
    });

    it('should not render wallet-requirements when not provided', () => {
      render(<AIMeta {...baseProps} />);
      expect(getMetaTag('ai:wallet-requirements')).toBeUndefined();
    });
  });

  describe('array props', () => {
    it('should render use-case when provided', () => {
      render(
        <AIMeta {...baseProps} useCase={['DeFi', 'NFT']} />
      );
      expect(getMetaTag('ai:use-case')).toBe('DeFi,NFT');
    });

    it('should not render use-case when empty', () => {
      render(<AIMeta {...baseProps} useCase={[]} />);
      expect(getMetaTag('ai:use-case')).toBeUndefined();
    });

    it('should render audience when provided', () => {
      render(
        <AIMeta
          {...baseProps}
          targetAudience={['developers', 'traders']}
        />
      );
      expect(getMetaTag('ai:audience')).toBe('developers,traders');
    });

    it('should render integrations when provided', () => {
      render(
        <AIMeta
          {...baseProps}
          integrations={['MetaMask', 'Phantom']}
        />
      );
      expect(getMetaTag('ai:integrations')).toBe('MetaMask,Phantom');
    });

    it('should render features when provided', () => {
      render(
        <AIMeta
          {...baseProps}
          features={['wallet-auth', 'ens-support']}
        />
      );
      expect(getMetaTag('ai:features')).toBe(
        'wallet-auth,ens-support'
      );
    });

    it('should render data-flow when provided', () => {
      render(
        <AIMeta
          {...baseProps}
          dataFlow={['user', 'wallet', 'blockchain']}
        />
      );
      expect(getMetaTag('ai:data-flow')).toBe(
        'user,wallet,blockchain'
      );
    });

    it('should render business-value when provided', () => {
      render(
        <AIMeta
          {...baseProps}
          businessValue={['security', 'convenience']}
        />
      );
      expect(getMetaTag('ai:business-value')).toBe(
        'security,convenience'
      );
    });

    it('should render security-considerations when provided', () => {
      render(
        <AIMeta
          {...baseProps}
          securityConsiderations={['private-key', 'phishing']}
        />
      );
      expect(getMetaTag('ai:security-considerations')).toBe(
        'private-key,phishing'
      );
    });

    it('should render learning-outcomes when provided', () => {
      render(
        <AIMeta
          {...baseProps}
          learningOutcomes={['understand-web3', 'connect-wallet']}
        />
      );
      expect(getMetaTag('ai:learning-outcomes')).toBe(
        'understand-web3,connect-wallet'
      );
    });
  });

  describe('all optional props', () => {
    it('should render all meta tags when all props provided', () => {
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

      expect(getMetaTag('ai:content-type')).toBe('documentation');
      expect(getMetaTag('ai:summary')).toBe('Full summary');
      expect(getMetaTag('ai:complexity')).toBe('expert');
      expect(getMetaTag('ai:blockchain-networks')).toBe(
        'Ethereum,Solana'
      );
      expect(getMetaTag('ai:token-support')).toBe('true');
      expect(getMetaTag('ai:wallet-requirements')).toBe('true');
      expect(getMetaTag('ai:use-case')).toBe('DeFi,NFT');
      expect(getMetaTag('ai:audience')).toBe('developers,traders');
      expect(getMetaTag('ai:integrations')).toBe('MetaMask,Phantom');
      expect(getMetaTag('ai:features')).toBe(
        'wallet-auth,ens-support'
      );
      expect(getMetaTag('ai:data-flow')).toBe(
        'user,wallet,blockchain'
      );
      expect(getMetaTag('ai:business-value')).toBe(
        'security,convenience'
      );
      expect(getMetaTag('ai:security-considerations')).toBe(
        'private-key,phishing'
      );
      expect(getMetaTag('ai:learning-outcomes')).toBe(
        'understand-web3,connect-wallet'
      );
    });
  });

  describe('component behavior', () => {
    it('should render Helmet component with meta tags', () => {
      const { container } = render(<AIMeta {...baseProps} />);
      expect(container).toBeDefined();
    });

    it('should only render tags for provided props', () => {
      render(<AIMeta {...baseProps} />);
      // Only content-type, summary, complexity (default)
      expect(capturedMetaTags.length).toBe(3);
    });
  });
});
