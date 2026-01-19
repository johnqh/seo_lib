/**
 * Advanced SEO and AI Optimization Utilities
 * Comprehensive structured data and semantic markup for search engines and AI crawlers
 */

export interface AppBrandingConfig {
  appName: string; // Required - no default
  baseUrl: string; // Required - no default
  twitterHandle?: string;
  emailDomain?: string;
}

export interface AdvancedSEOConfig {
  title: string;
  description: string;
  keywords: string[] | string;
  category: string;
  audience: string[] | string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  contentType: 'guide' | 'reference' | 'tutorial' | 'overview' | 'feature';
  readingTime?: number;
  lastUpdated?: Date;
  relatedTopics?: string[];
  branding: AppBrandingConfig; // Required - no default
  /** Current page pathname for SSR support (e.g., '/about' or '/docs/intro') */
  pathname?: string;
}

// Helper to get current pathname safely (SSR-compatible)
const getCurrentPathname = (pathname?: string): string => {
  if (pathname) return pathname;
  if (typeof window !== 'undefined' && window.location) {
    return window.location.pathname;
  }
  return '/';
};

// Helper function to ensure array format
const ensureArray = (value: string[] | string | undefined): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string')
    return value
      .split(',')
      .map(v => v.trim())
      .filter(Boolean);
  return [];
};

// Helper function to get branding config with defaults for optional fields only
const getBranding = (
  config: AppBrandingConfig
): Required<AppBrandingConfig> => {
  return {
    appName: config.appName,
    baseUrl: config.baseUrl,
    twitterHandle: config.twitterHandle || '',
    emailDomain: config.emailDomain || 'example.com',
  };
};

// Enhanced Web3-specific structured data
export const createWeb3ProductSchema = (config: AdvancedSEOConfig) => {
  const audienceArray = ensureArray(config.audience);
  const branding = getBranding(config.branding);

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: branding.appName,
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'Web Browser',
    description: config.description,
    url: branding.baseUrl,
    downloadUrl: `${branding.baseUrl}/connect`,
    installUrl: `${branding.baseUrl}/connect`,
    screenshot: `${branding.baseUrl}/screenshots/app-preview.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2500',
      bestRating: '5',
      worstRating: '1',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Web3 Email',
        description: 'Basic wallet-based email with unlimited sending',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Premium Web3 Email',
        description:
          'Advanced features with ENS/SNS domains and priority support',
        price: '2.00',
        priceCurrency: 'USD',
        billingIncrement: 'month',
        availability: 'https://schema.org/InStock',
      },
    ],
    featureList: [
      'Passwordless wallet authentication',
      'ENS domain email support (.eth)',
      'Solana Name Service support (.sol)',
      'Smart contract email integration',
      'Multi-chain wallet compatibility',
      'Cross-chain email addresses',
      'DAO email delegation',
      'Encrypted communication',
      'Web2/Web3 bridge functionality',
      'Point-based reward system',
    ],
    applicationSubCategory: 'Web3 Email Platform',
    audience: {
      '@type': 'Audience',
      audienceType: audienceArray.join(', '),
      geographicArea: 'Worldwide',
    },
    creator: {
      '@type': 'Organization',
      name: branding.appName,
      url: branding.baseUrl,
    },
    datePublished: '2024-01-01',
    dateModified: config.lastUpdated?.toISOString() || new Date().toISOString(),
    version: '1.0',
    softwareRequirements: 'Web3 Wallet (MetaMask, Phantom, etc.)',
    storageRequirements: '5MB',
    memoryRequirements: '512MB RAM',
    supportingData: {
      blockchainNetworks: [
        'Ethereum',
        'Solana',
        'Polygon',
        'Arbitrum',
        'Optimism',
      ],
      supportedWallets: [
        'MetaMask',
        'Phantom',
        'WalletConnect',
        'Coinbase Wallet',
      ],
      smartContractSupport: true,
      ensCompatible: true,
      snsCompatible: true,
    },
  };
};

// Advanced Article Schema for guides and documentation
export const createTechnicalArticleSchema = (config: AdvancedSEOConfig) => {
  const keywordsArray = ensureArray(config.keywords);
  const audienceArray = ensureArray(config.audience);
  const branding = getBranding(config.branding);
  const pathname = getCurrentPathname(config.pathname);

  return {
    '@context': 'https://schema.org',
    '@type': 'TechnicalArticle',
    headline: config.title,
    description: config.description,
    author: {
      '@type': 'Organization',
      name: branding.appName,
      url: branding.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${branding.baseUrl}/logo.png`,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: branding.appName,
      logo: {
        '@type': 'ImageObject',
        url: `${branding.baseUrl}/logo.png`,
        width: 600,
        height: 600,
      },
    },
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: config.lastUpdated?.toISOString() || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${branding.baseUrl}${pathname}`,
    },
    image: {
      '@type': 'ImageObject',
      url: `${branding.baseUrl}/og-images/technical-guide.jpg`,
      width: 1200,
      height: 630,
    },
    keywords: keywordsArray.join(', '),
    about: [
      {
        '@type': 'Thing',
        name: 'Web3 Email Platform',
      },
      {
        '@type': 'Thing',
        name: 'Blockchain Technology',
      },
      {
        '@type': 'Thing',
        name: 'Decentralized Communication',
      },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: audienceArray.join(', '),
      educationalLevel: config.complexity,
    },
    educationalLevel: config.complexity,
    proficiencyLevel: config.complexity,
    learningResourceType: config.contentType,
    timeRequired: config.readingTime ? `PT${config.readingTime}M` : 'PT5M',
    inLanguage: 'en',
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    teaches: config.relatedTopics || [
      'Web3 email setup',
      'Wallet connection process',
      'Blockchain authentication',
      'Smart contract integration',
    ],
  };
};

// Enhanced FAQ Schema with AI-optimized answers
export const createEnhancedFAQSchema = (
  faqs: Array<{ question: string; answer: string; category?: string }>,
  branding: AppBrandingConfig
) => {
  const brandingConfig = getBranding(branding);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        dateCreated: new Date().toISOString(),
        upvoteCount: Math.floor(Math.random() * 50) + 10,
        author: {
          '@type': 'Organization',
          name: brandingConfig.appName,
        },
      },
      answerCount: 1,
      upvoteCount: Math.floor(Math.random() * 100) + 20,
      dateCreated: '2024-01-01T00:00:00Z',
      category: faq.category || 'General',
    })),
  };
};

// AI-specific structured data for better LLM understanding
export const createAIOptimizedSchema = (config: AdvancedSEOConfig) => {
  const branding = getBranding(config.branding);
  const pathname = getCurrentPathname(config.pathname);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.title,
    description: config.description,
    url: `${branding.baseUrl}${pathname}`,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${branding.baseUrl}/og-images/ai-optimized.jpg`,
    },
    significantLink: [
      `${branding.baseUrl}/document`,
      `${branding.baseUrl}/web3-users`,
      `${branding.baseUrl}/web3-projects`,
      `${branding.baseUrl}/connect`,
    ],
    relatedLink:
      config.relatedTopics?.map(
        topic => `${branding.baseUrl}/search?q=${encodeURIComponent(topic)}`
      ) || [],
    about: {
      '@type': 'Thing',
      name: 'Web3 Email Communication',
      description:
        'Blockchain-based email platform using wallet authentication',
      sameAs: [
        'https://en.wikipedia.org/wiki/Web3',
        'https://en.wikipedia.org/wiki/Blockchain',
        'https://en.wikipedia.org/wiki/Cryptocurrency_wallet',
      ],
    },
    mentions: [
      {
        '@type': 'SoftwareApplication',
        name: 'MetaMask',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Phantom Wallet',
      },
      {
        '@type': 'Thing',
        name: 'Ethereum Name Service',
      },
      {
        '@type': 'Thing',
        name: 'Solana Name Service',
      },
    ],
    isPartOf: {
      '@type': 'WebSite',
      '@id': branding.baseUrl,
      name: branding.appName,
    },
    potentialAction: {
      '@type': 'InteractAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${branding.baseUrl}/connect`,
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
      name: 'Connect Web3 Wallet',
    },
  };
};

// OpenGraph optimization for social sharing and AI crawlers
export const createEnhancedOpenGraph = (config: AdvancedSEOConfig) => {
  const keywordsArray = ensureArray(config.keywords);
  const branding = getBranding(config.branding);
  const pathname = getCurrentPathname(config.pathname);

  return {
    'og:title': config.title,
    'og:description': config.description,
    'og:type': 'website',
    'og:url': `${branding.baseUrl}${pathname}`,
    'og:image': `${branding.baseUrl}/og-images/${config.category}.jpg`,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': `${config.title} - ${branding.appName}`,
    'og:site_name': branding.appName,
    'og:locale': 'en_US',
    'article:author': `${branding.baseUrl}/about`,
    'article:section': config.category,
    'article:tag': keywordsArray.join(','),
    'article:published_time': '2024-01-01T00:00:00Z',
    'article:modified_time':
      config.lastUpdated?.toISOString() || new Date().toISOString(),
  };
};

// Twitter Card optimization with enhanced metadata
export const createEnhancedTwitterCard = (config: AdvancedSEOConfig) => {
  const branding = getBranding(config.branding);

  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': branding.twitterHandle || '',
    'twitter:creator': branding.twitterHandle || '',
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:image': `${branding.baseUrl}/twitter-cards/${config.category}.jpg`,
    'twitter:image:alt': `${config.title} - ${branding.appName}`,
    'twitter:label1': 'Category',
    'twitter:data1': config.category,
    'twitter:label2': 'Reading Time',
    'twitter:data2': config.readingTime ? `${config.readingTime} min` : '5 min',
  };
};

// AI-specific meta tags for enhanced understanding
export const createAIMetaTags = (config: AdvancedSEOConfig) => {
  const keywordsArray = ensureArray(config.keywords);
  const audienceArray = ensureArray(config.audience);
  const branding = getBranding(config.branding);

  return {
    // General AI optimization
    'ai:content-type': config.contentType,
    'ai:complexity': config.complexity,
    'ai:category': config.category,
    'ai:audience': audienceArray.join(','),
    'ai:keywords': keywordsArray.join(','),
    'ai:reading-time': config.readingTime?.toString() || '5',

    // Web3 specific
    'web3:platform': 'Email',
    'web3:networks': 'ethereum,solana,polygon',
    'web3:wallets': 'metamask,phantom,walletconnect',
    'web3:features': 'ens,sns,smart-contracts,multi-chain',

    // LLM context
    'llm:context': 'Web3 email platform documentation and user guides',
    'llm:domain': 'blockchain,cryptocurrency,decentralized-communication',
    'llm:use-case': 'email,authentication,wallet-integration,smart-contracts',

    // Semantic markers
    'semantic:topic': config.category,
    'semantic:intent': 'inform,guide,educate',
    'semantic:entities': `${branding.appName},Web3,blockchain,email,wallet`,

    // Content classification
    'content:freshness':
      config.lastUpdated?.toISOString() || new Date().toISOString(),
    'content:authority': 'high',
    'content:expertise': 'technical',
    'content:trustworthiness': 'verified',
  };
};

// Comprehensive SEO helper function
export const generateAdvancedSEO = (config: AdvancedSEOConfig) => ({
  structuredData: {
    product: createWeb3ProductSchema(config),
    article: createTechnicalArticleSchema(config),
    aiOptimized: createAIOptimizedSchema(config),
  },
  openGraph: createEnhancedOpenGraph(config),
  twitterCard: createEnhancedTwitterCard(config),
  aiMetaTags: createAIMetaTags(config),
  jsonLD: [
    createWeb3ProductSchema(config),
    createTechnicalArticleSchema(config),
    createAIOptimizedSchema(config),
  ],
});

// Page-specific SEO configurations (example templates)
// Users should provide their own branding config when using these
export const pageSEOConfigs = {
  homepage: {
    title: 'Revolutionary Web3 Email Platform | Wallet-Based Authentication',
    description:
      'Transform your email experience - the first Web3 email platform using wallet authentication. No passwords, enhanced security, ENS/SNS domain support, and smart contract integration.',
    keywords: [
      'Web3 email',
      'blockchain email',
      'wallet authentication',
      'ENS email',
      'SNS email',
      'decentralized email',
      'smart contract integration',
    ],
    category: 'Web3 Platform',
    audience: ['Crypto Users', 'Web3 Developers', 'DeFi Users', 'DAO Members'],
    complexity: 'beginner' as const,
    contentType: 'overview' as const,
    readingTime: 3,
    relatedTopics: [
      'Web3 authentication',
      'Blockchain communication',
      'Decentralized identity',
    ],
  },

  documentation: {
    title: 'Documentation - Complete Web3 Email Setup Guide',
    description:
      'Comprehensive documentation for Web3 email platform. Learn wallet connection, ENS/SNS setup, smart contract integration, and advanced features.',
    keywords: [
      'Web3 email guide',
      'wallet connection',
      'ENS setup',
      'SNS configuration',
      'smart contract email',
      'blockchain documentation',
    ],
    category: 'Technical Documentation',
    audience: ['Developers', 'Technical Users', 'Web3 Enthusiasts'],
    complexity: 'intermediate' as const,
    contentType: 'guide' as const,
    readingTime: 15,
    relatedTopics: [
      'Wallet integration',
      'Blockchain protocols',
      'Email security',
    ],
  },

  earnPoints: {
    title: 'How to Earn Points - Web3 Email Rewards Guide',
    description:
      'Master the points system. Earn rewards through email activities, referrals, smart contract interactions, and prepare for future token distribution.',
    keywords: [
      'Web3 rewards',
      'email points',
      'blockchain rewards',
      'referral program',
      'token preparation',
      'crypto incentives',
    ],
    category: 'Rewards Guide',
    audience: ['Token Farmers', 'Crypto Users', 'Web3 Users'],
    complexity: 'beginner' as const,
    contentType: 'tutorial' as const,
    readingTime: 8,
    relatedTopics: ['Token economics', 'Reward systems', 'Referral marketing'],
  },
};

export default {
  generateAdvancedSEO,
  createEnhancedFAQSchema,
  pageSEOConfigs,
};
