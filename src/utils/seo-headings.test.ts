import { describe, expect, it } from 'vitest';
import {
  createSemanticHeading,
  WEB3_HEADING_PATTERNS,
  validateHeadingStructure,
  WEB3_EMAIL_HEADINGS,
  HeadingConfig,
} from './seo-headings';

interface HeadingProps {
  id: string;
  className: string;
  'aria-level': number;
  children: string;
}

describe('seo-headings utilities', () => {
  describe('createSemanticHeading', () => {
    it('should create heading element with correct level', () => {
      const config: HeadingConfig = {
        level: 1,
        text: 'Test Heading',
      };
      const element = createSemanticHeading(config);
      const props = element.props as HeadingProps;

      expect(element.type).toBe('h1');
      expect(props.children).toBe('Test Heading');
    });

    it('should generate SEO-friendly ID from text', () => {
      const config: HeadingConfig = {
        level: 2,
        text: 'My Test Heading Here',
      };
      const element = createSemanticHeading(config);
      const props = element.props as HeadingProps;

      expect(props.id).toBe('my-test-heading-here');
    });

    it('should use provided ID instead of generated one', () => {
      const config: HeadingConfig = {
        level: 2,
        text: 'Test Heading',
        id: 'custom-id',
      };
      const element = createSemanticHeading(config);
      const props = element.props as HeadingProps;

      expect(props.id).toBe('custom-id');
    });

    it('should apply correct classes for each level', () => {
      const levels = [1, 2, 3, 4, 5, 6] as const;

      levels.forEach(level => {
        const config: HeadingConfig = {
          level,
          text: `Heading ${level}`,
        };
        const element = createSemanticHeading(config);
        const props = element.props as HeadingProps;

        expect(props.className).toBeDefined();
        expect(element.type).toBe(`h${level}`);
      });
    });

    it('should apply contextual styling', () => {
      const contexts = [
        'page-title',
        'section',
        'subsection',
        'feature',
        'benefit',
        'step',
      ] as const;

      contexts.forEach(context => {
        const config: HeadingConfig = {
          level: 2,
          text: 'Test',
          semanticContext: context,
        };
        const element = createSemanticHeading(config);
        const props = element.props as HeadingProps;

        expect(props.className).toBeDefined();
      });
    });

    it('should merge custom className with default classes', () => {
      const config: HeadingConfig = {
        level: 1,
        text: 'Test',
        className: 'my-custom-class',
      };
      const element = createSemanticHeading(config);
      const props = element.props as HeadingProps;

      expect(props.className).toContain('my-custom-class');
    });

    it('should set aria-level attribute', () => {
      const config: HeadingConfig = {
        level: 3,
        text: 'Test',
      };
      const element = createSemanticHeading(config);
      const props = element.props as HeadingProps;

      expect(props['aria-level']).toBe(3);
    });

    it('should sanitize ID by removing special characters', () => {
      const config: HeadingConfig = {
        level: 2,
        text: 'Test & Heading! With @Special# Chars',
      };
      const element = createSemanticHeading(config);
      const props = element.props as HeadingProps;

      expect(props.id).toBe('test-heading-with-special-chars');
    });
  });

  describe('WEB3_HEADING_PATTERNS', () => {
    it('should create page title config', () => {
      const config = WEB3_HEADING_PATTERNS.pageTitle('My Page Title');

      expect(config.level).toBe(1);
      expect(config.text).toBe('My Page Title');
      expect(config.semanticContext).toBe('page-title');
    });

    it('should create major section config', () => {
      const config = WEB3_HEADING_PATTERNS.majorSection('Major Section');

      expect(config.level).toBe(2);
      expect(config.semanticContext).toBe('section');
    });

    it('should create feature config', () => {
      const config = WEB3_HEADING_PATTERNS.feature('Feature Name');

      expect(config.level).toBe(3);
      expect(config.semanticContext).toBe('feature');
    });

    it('should create benefit config', () => {
      const config = WEB3_HEADING_PATTERNS.benefit('Benefit Name');

      expect(config.level).toBe(3);
      expect(config.semanticContext).toBe('benefit');
    });

    it('should create step config with number', () => {
      const config = WEB3_HEADING_PATTERNS.step('Connect Wallet', 1);

      expect(config.level).toBe(3);
      expect(config.text).toBe('Step 1: Connect Wallet');
      expect(config.semanticContext).toBe('step');
    });

    it('should create step config without number', () => {
      const config = WEB3_HEADING_PATTERNS.step('Connect Wallet');

      expect(config.text).toBe('Connect Wallet');
    });

    it('should create subFeature config', () => {
      const config = WEB3_HEADING_PATTERNS.subFeature('Sub Feature');

      expect(config.level).toBe(4);
      expect(config.semanticContext).toBe('feature');
    });

    it('should accept optional className', () => {
      const config = WEB3_HEADING_PATTERNS.pageTitle('Title', 'custom-class');

      expect(config.className).toBe('custom-class');
    });
  });

  describe('validateHeadingStructure', () => {
    it('should validate correct heading structure', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'Page Title' },
        { level: 2, text: 'Section One' },
        { level: 3, text: 'Subsection' },
        { level: 2, text: 'Section Two' },
      ];

      const result = validateHeadingStructure(headings);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing H1', () => {
      const headings: HeadingConfig[] = [
        { level: 2, text: 'Section One' },
        { level: 3, text: 'Subsection' },
      ];

      const result = validateHeadingStructure(headings);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Missing H1 tag - every page should have exactly one H1'
      );
    });

    it('should detect multiple H1 tags', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'First Title' },
        { level: 1, text: 'Second Title' },
      ];

      const result = validateHeadingStructure(headings);

      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Multiple H1 tags');
    });

    it('should detect heading level jumps', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'Title' },
        { level: 4, text: 'Jumped to H4' },
      ];

      const result = validateHeadingStructure(headings);

      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Heading level jump');
    });

    it('should detect too short headings', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'OK' },
        { level: 2, text: 'Hi' },
      ];

      const result = validateHeadingStructure(headings);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('too short'))).toBe(true);
    });

    it('should suggest shortening long headings', () => {
      const longText =
        'This is a very long heading that probably should be shortened for better SEO and user experience';
      const headings: HeadingConfig[] = [{ level: 1, text: longText }];

      const result = validateHeadingStructure(headings);

      expect(result.suggestions.some(s => s.includes('long'))).toBe(true);
    });

    it('should allow valid level decreases', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'Title' },
        { level: 2, text: 'Section' },
        { level: 3, text: 'Subsection' },
        { level: 2, text: 'Another Section' },
      ];

      const result = validateHeadingStructure(headings);

      expect(result.isValid).toBe(true);
    });
  });

  describe('WEB3_EMAIL_HEADINGS', () => {
    it('should have walletConnection heading', () => {
      expect(WEB3_EMAIL_HEADINGS.walletConnection).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.walletConnection.text).toBe(
        'Connect Your Web3 Wallet'
      );
    });

    it('should have emailBenefits heading', () => {
      expect(WEB3_EMAIL_HEADINGS.emailBenefits).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.emailBenefits.level).toBe(2);
    });

    it('should have security feature heading', () => {
      expect(WEB3_EMAIL_HEADINGS.securityFeature).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.securityFeature.semanticContext).toBe(
        'feature'
      );
    });

    it('should have setup step headings', () => {
      expect(WEB3_EMAIL_HEADINGS.setupStep1.text).toContain('Step 1');
      expect(WEB3_EMAIL_HEADINGS.setupStep2.text).toContain('Step 2');
      expect(WEB3_EMAIL_HEADINGS.setupStep3.text).toContain('Step 3');
    });

    it('should have passwordless benefit heading', () => {
      expect(WEB3_EMAIL_HEADINGS.passwordless.semanticContext).toBe('benefit');
    });
  });
});
