import { describe, expect, it } from 'vitest';
import {
  createWeb3ProductSchema,
  createTechnicalArticleSchema,
  createEnhancedFAQSchema,
  createAIOptimizedSchema,
  createEnhancedOpenGraph,
  createEnhancedTwitterCard,
  createAIMetaTags,
  generateAdvancedSEO,
  pageSEOConfigs,
  AdvancedSEOConfig,
  AppBrandingConfig,
} from './advancedSEO';

const mockBranding: AppBrandingConfig = {
  appName: 'TestApp',
  baseUrl: 'https://test.com',
  twitterHandle: '@testapp',
  emailDomain: 'test.com',
};

const mockConfig: AdvancedSEOConfig = {
  title: 'Test Page',
  description: 'Test description for the page',
  keywords: ['web3', 'email', 'blockchain'],
  category: 'Technology',
  audience: ['developers', 'crypto users'],
  complexity: 'intermediate',
  contentType: 'guide',
  readingTime: 10,
  lastUpdated: new Date('2024-06-15'),
  relatedTopics: ['wallet', 'authentication'],
  branding: mockBranding,
  pathname: '/test-page',
};

describe('advancedSEO utilities', () => {
  describe('createWeb3ProductSchema', () => {
    it('should create valid product schema', () => {
      const schema = createWeb3ProductSchema(mockConfig);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('SoftwareApplication');
      expect(schema.name).toBe('TestApp');
      expect(schema.applicationCategory).toBe('CommunicationApplication');
      expect(schema.url).toBe('https://test.com');
    });

    it('should include feature list', () => {
      const schema = createWeb3ProductSchema(mockConfig);

      expect(schema.featureList).toBeDefined();
      expect(Array.isArray(schema.featureList)).toBe(true);
      expect(schema.featureList.length).toBeGreaterThan(0);
    });

    it('should include offers', () => {
      const schema = createWeb3ProductSchema(mockConfig);

      expect(schema.offers).toBeDefined();
      expect(Array.isArray(schema.offers)).toBe(true);
      expect(schema.offers.length).toBe(2);
    });

    it('should include audience information', () => {
      const schema = createWeb3ProductSchema(mockConfig);

      expect(schema.audience).toBeDefined();
      expect(schema.audience['@type']).toBe('Audience');
      expect(schema.audience.audienceType).toContain('developers');
    });
  });

  describe('createTechnicalArticleSchema', () => {
    it('should create valid article schema', () => {
      const schema = createTechnicalArticleSchema(mockConfig);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('TechnicalArticle');
      expect(schema.headline).toBe('Test Page');
      expect(schema.description).toBe('Test description for the page');
    });

    it('should include author information', () => {
      const schema = createTechnicalArticleSchema(mockConfig);

      expect(schema.author).toBeDefined();
      expect(schema.author['@type']).toBe('Organization');
      expect(schema.author.name).toBe('TestApp');
    });

    it('should include publisher information', () => {
      const schema = createTechnicalArticleSchema(mockConfig);

      expect(schema.publisher).toBeDefined();
      expect(schema.publisher['@type']).toBe('Organization');
      expect(schema.publisher.logo).toBeDefined();
    });

    it('should include educational level', () => {
      const schema = createTechnicalArticleSchema(mockConfig);

      expect(schema.educationalLevel).toBe('intermediate');
      expect(schema.proficiencyLevel).toBe('intermediate');
    });

    it('should include reading time', () => {
      const schema = createTechnicalArticleSchema(mockConfig);

      expect(schema.timeRequired).toBe('PT10M');
    });

    it('should use provided pathname', () => {
      const schema = createTechnicalArticleSchema(mockConfig);

      expect(schema.mainEntityOfPage['@id']).toBe(
        'https://test.com/test-page'
      );
    });
  });

  describe('createEnhancedFAQSchema', () => {
    const faqs = [
      {
        question: 'What is Web3 email?',
        answer: 'Web3 email uses blockchain for authentication.',
        category: 'General',
      },
      {
        question: 'How do I connect my wallet?',
        answer: 'Click the connect button and approve the connection.',
        category: 'Setup',
      },
    ];

    it('should create valid FAQ schema', () => {
      const schema = createEnhancedFAQSchema(faqs, mockBranding);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toBeDefined();
      expect(schema.mainEntity.length).toBe(2);
    });

    it('should include questions and answers', () => {
      const schema = createEnhancedFAQSchema(faqs, mockBranding);

      const firstQuestion = schema.mainEntity[0];
      expect(firstQuestion['@type']).toBe('Question');
      expect(firstQuestion.name).toBe('What is Web3 email?');
      expect(firstQuestion.acceptedAnswer).toBeDefined();
      expect(firstQuestion.acceptedAnswer['@type']).toBe('Answer');
    });

    it('should include category information', () => {
      const schema = createEnhancedFAQSchema(faqs, mockBranding);

      expect(schema.mainEntity[0].category).toBe('General');
      expect(schema.mainEntity[1].category).toBe('Setup');
    });
  });

  describe('createAIOptimizedSchema', () => {
    it('should create valid AI-optimized schema', () => {
      const schema = createAIOptimizedSchema(mockConfig);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebPage');
      expect(schema.name).toBe('Test Page');
      expect(schema.description).toBe('Test description for the page');
    });

    it('should include URL with pathname', () => {
      const schema = createAIOptimizedSchema(mockConfig);

      expect(schema.url).toBe('https://test.com/test-page');
    });

    it('should include significant links', () => {
      const schema = createAIOptimizedSchema(mockConfig);

      expect(schema.significantLink).toBeDefined();
      expect(Array.isArray(schema.significantLink)).toBe(true);
    });

    it('should include related links from relatedTopics', () => {
      const schema = createAIOptimizedSchema(mockConfig);

      expect(schema.relatedLink).toBeDefined();
      expect(Array.isArray(schema.relatedLink)).toBe(true);
    });

    it('should include mentions of wallets', () => {
      const schema = createAIOptimizedSchema(mockConfig);

      expect(schema.mentions).toBeDefined();
      expect(Array.isArray(schema.mentions)).toBe(true);
    });
  });

  describe('createEnhancedOpenGraph', () => {
    it('should create valid Open Graph metadata', () => {
      const og = createEnhancedOpenGraph(mockConfig);

      expect(og['og:title']).toBe('Test Page');
      expect(og['og:description']).toBe('Test description for the page');
      expect(og['og:type']).toBe('website');
      expect(og['og:url']).toBe('https://test.com/test-page');
    });

    it('should include image metadata', () => {
      const og = createEnhancedOpenGraph(mockConfig);

      expect(og['og:image']).toContain('https://test.com/og-images/');
      expect(og['og:image:width']).toBe('1200');
      expect(og['og:image:height']).toBe('630');
    });

    it('should include site name', () => {
      const og = createEnhancedOpenGraph(mockConfig);

      expect(og['og:site_name']).toBe('TestApp');
    });

    it('should include article tags', () => {
      const og = createEnhancedOpenGraph(mockConfig);

      expect(og['article:section']).toBe('Technology');
      expect(og['article:tag']).toContain('web3');
    });
  });

  describe('createEnhancedTwitterCard', () => {
    it('should create valid Twitter Card metadata', () => {
      const tc = createEnhancedTwitterCard(mockConfig);

      expect(tc['twitter:card']).toBe('summary_large_image');
      expect(tc['twitter:title']).toBe('Test Page');
      expect(tc['twitter:description']).toBe('Test description for the page');
    });

    it('should include Twitter handle', () => {
      const tc = createEnhancedTwitterCard(mockConfig);

      expect(tc['twitter:site']).toBe('@testapp');
      expect(tc['twitter:creator']).toBe('@testapp');
    });

    it('should include reading time label', () => {
      const tc = createEnhancedTwitterCard(mockConfig);

      expect(tc['twitter:label2']).toBe('Reading Time');
      expect(tc['twitter:data2']).toBe('10 min');
    });

    it('should default reading time to 5 min', () => {
      const configWithoutReadingTime = { ...mockConfig, readingTime: undefined };
      const tc = createEnhancedTwitterCard(configWithoutReadingTime);

      expect(tc['twitter:data2']).toBe('5 min');
    });
  });

  describe('createAIMetaTags', () => {
    it('should create AI-specific meta tags', () => {
      const tags = createAIMetaTags(mockConfig);

      expect(tags['ai:content-type']).toBe('guide');
      expect(tags['ai:complexity']).toBe('intermediate');
      expect(tags['ai:category']).toBe('Technology');
    });

    it('should include audience information', () => {
      const tags = createAIMetaTags(mockConfig);

      expect(tags['ai:audience']).toContain('developers');
      expect(tags['ai:audience']).toContain('crypto users');
    });

    it('should include Web3-specific tags', () => {
      const tags = createAIMetaTags(mockConfig);

      expect(tags['web3:platform']).toBe('Email');
      expect(tags['web3:networks']).toContain('ethereum');
      expect(tags['web3:wallets']).toContain('metamask');
    });

    it('should include LLM context tags', () => {
      const tags = createAIMetaTags(mockConfig);

      expect(tags['llm:context']).toBeDefined();
      expect(tags['llm:domain']).toBeDefined();
      expect(tags['llm:use-case']).toBeDefined();
    });

    it('should include content classification', () => {
      const tags = createAIMetaTags(mockConfig);

      expect(tags['content:freshness']).toBeDefined();
      expect(tags['content:authority']).toBe('high');
      expect(tags['content:expertise']).toBe('technical');
    });
  });

  describe('generateAdvancedSEO', () => {
    it('should generate comprehensive SEO data', () => {
      const seo = generateAdvancedSEO(mockConfig);

      expect(seo.structuredData).toBeDefined();
      expect(seo.openGraph).toBeDefined();
      expect(seo.twitterCard).toBeDefined();
      expect(seo.aiMetaTags).toBeDefined();
      expect(seo.jsonLD).toBeDefined();
    });

    it('should include all structured data types', () => {
      const seo = generateAdvancedSEO(mockConfig);

      expect(seo.structuredData.product).toBeDefined();
      expect(seo.structuredData.article).toBeDefined();
      expect(seo.structuredData.aiOptimized).toBeDefined();
    });

    it('should include JSON-LD array', () => {
      const seo = generateAdvancedSEO(mockConfig);

      expect(Array.isArray(seo.jsonLD)).toBe(true);
      expect(seo.jsonLD.length).toBe(3);
    });
  });

  describe('pageSEOConfigs', () => {
    it('should have homepage config', () => {
      expect(pageSEOConfigs.homepage).toBeDefined();
      expect(pageSEOConfigs.homepage.title).toBeDefined();
      expect(pageSEOConfigs.homepage.complexity).toBe('beginner');
    });

    it('should have documentation config', () => {
      expect(pageSEOConfigs.documentation).toBeDefined();
      expect(pageSEOConfigs.documentation.complexity).toBe('intermediate');
    });

    it('should have earnPoints config', () => {
      expect(pageSEOConfigs.earnPoints).toBeDefined();
      expect(pageSEOConfigs.earnPoints.contentType).toBe('tutorial');
    });
  });

  describe('string/array handling', () => {
    it('should handle keywords as string', () => {
      const configWithStringKeywords = {
        ...mockConfig,
        keywords: 'web3, email, blockchain',
      };
      const tags = createAIMetaTags(configWithStringKeywords);

      expect(tags['ai:keywords']).toContain('web3');
    });

    it('should handle audience as string', () => {
      const configWithStringAudience = {
        ...mockConfig,
        audience: 'developers, crypto users',
      };
      const tags = createAIMetaTags(configWithStringAudience);

      expect(tags['ai:audience']).toContain('developers');
    });
  });

  describe('branding defaults', () => {
    it('should handle missing optional branding fields', () => {
      const minimalBranding: AppBrandingConfig = {
        appName: 'MinApp',
        baseUrl: 'https://min.com',
      };
      const minimalConfig = {
        ...mockConfig,
        branding: minimalBranding,
      };

      const tc = createEnhancedTwitterCard(minimalConfig);
      expect(tc['twitter:site']).toBe('');
    });
  });
});
