import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Main,
  Article,
  Section,
  Nav,
  Header,
  Footer,
  Aside,
  Figure,
  H1,
  H2,
  H3,
  H4,
  OrderedList,
  UnorderedList,
  SemanticButton,
  SemanticLink,
  SkipLink,
  SearchRegion,
  BannerRegion,
  ComplementaryRegion,
  SemanticForm,
  SemanticInput,
  ScreenReaderOnly,
  SemanticLoading,
} from './SemanticHTML';

describe('SemanticHTML Components', () => {
  describe('Main', () => {
    it('should render main element with role', () => {
      render(<Main>Content</Main>);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveTextContent('Content');
    });

    it('should accept className', () => {
      render(<Main className="custom-class">Content</Main>);
      const main = screen.getByRole('main');
      expect(main).toHaveClass('custom-class');
    });
  });

  describe('Article', () => {
    it('should render article element', () => {
      render(<Article>Article content</Article>);
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
    });
  });

  describe('Section', () => {
    it('should render section element', () => {
      render(<Section aria-label="Test section">Section content</Section>);
      const section = screen.getByRole('region', { name: 'Test section' });
      expect(section).toBeInTheDocument();
    });
  });

  describe('Nav', () => {
    it('should render nav element with required aria-label', () => {
      render(<Nav aria-label="Main navigation">Nav content</Nav>);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('should render header element with banner role', () => {
      render(<Header>Header content</Header>);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('should render footer element with contentinfo role', () => {
      render(<Footer>Footer content</Footer>);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Aside', () => {
    it('should render aside element with complementary role', () => {
      render(<Aside>Aside content</Aside>);
      const aside = screen.getByRole('complementary');
      expect(aside).toBeInTheDocument();
    });
  });

  describe('Figure', () => {
    it('should render figure element', () => {
      render(<Figure>Figure content</Figure>);
      const figure = screen.getByRole('figure');
      expect(figure).toBeInTheDocument();
    });

    it('should render figcaption when caption provided', () => {
      render(<Figure caption="Test caption">Figure content</Figure>);
      expect(screen.getByText('Test caption')).toBeInTheDocument();
    });

    it('should not render figcaption when no caption', () => {
      render(<Figure>Figure content</Figure>);
      expect(screen.queryByText('figcaption')).not.toBeInTheDocument();
    });
  });

  describe('Heading components', () => {
    it('should render H1', () => {
      render(<H1>Heading 1</H1>);
      expect(
        screen.getByRole('heading', { level: 1, name: 'Heading 1' })
      ).toBeInTheDocument();
    });

    it('should render H2', () => {
      render(<H2>Heading 2</H2>);
      expect(
        screen.getByRole('heading', { level: 2, name: 'Heading 2' })
      ).toBeInTheDocument();
    });

    it('should render H3', () => {
      render(<H3>Heading 3</H3>);
      expect(
        screen.getByRole('heading', { level: 3, name: 'Heading 3' })
      ).toBeInTheDocument();
    });

    it('should render H4', () => {
      render(<H4>Heading 4</H4>);
      expect(
        screen.getByRole('heading', { level: 4, name: 'Heading 4' })
      ).toBeInTheDocument();
    });
  });

  describe('List components', () => {
    it('should render OrderedList', () => {
      render(
        <OrderedList>
          <li>Item 1</li>
        </OrderedList>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should render UnorderedList', () => {
      render(
        <UnorderedList>
          <li>Item 1</li>
        </UnorderedList>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  describe('SemanticButton', () => {
    it('should render button with default variant', () => {
      render(<SemanticButton>Click me</SemanticButton>);
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
    });

    it('should render primary variant', () => {
      render(<SemanticButton variant="primary">Primary</SemanticButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600');
    });

    it('should render secondary variant', () => {
      render(<SemanticButton variant="secondary">Secondary</SemanticButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-200');
    });

    it('should render danger variant', () => {
      render(<SemanticButton variant="danger">Danger</SemanticButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600');
    });

    it('should set aria-disabled when disabled', () => {
      render(<SemanticButton disabled>Disabled</SemanticButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('SemanticLink', () => {
    it('should render internal link', () => {
      render(<SemanticLink href="/page">Internal</SemanticLink>);
      const link = screen.getByRole('link', { name: 'Internal' });
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute('target');
    });

    it('should render external link with proper attributes', () => {
      render(
        <SemanticLink href="https://external.com" external>
          External
        </SemanticLink>
      );
      const link = screen.getByRole('link', { name: /External/ });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should include screen reader text for external links', () => {
      render(
        <SemanticLink href="https://external.com" external>
          External
        </SemanticLink>
      );
      expect(screen.getByText('(opens in new tab)')).toBeInTheDocument();
    });
  });

  describe('SkipLink', () => {
    it('should render skip link', () => {
      render(<SkipLink href="#main" />);
      const link = screen.getByRole('link', { name: 'Skip to main content' });
      expect(link).toHaveAttribute('href', '#main');
    });
  });

  describe('Region components', () => {
    it('should render SearchRegion', () => {
      render(<SearchRegion>Search content</SearchRegion>);
      expect(screen.getByRole('search')).toBeInTheDocument();
    });

    it('should render BannerRegion', () => {
      render(<BannerRegion>Banner content</BannerRegion>);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should render ComplementaryRegion', () => {
      render(<ComplementaryRegion>Complementary content</ComplementaryRegion>);
      expect(screen.getByRole('complementary')).toBeInTheDocument();
    });
  });

  describe('SemanticForm', () => {
    it('should render form element', () => {
      render(
        <SemanticForm aria-label="Test form">Form content</SemanticForm>
      );
      expect(screen.getByRole('form', { name: 'Test form' })).toBeInTheDocument();
    });
  });

  describe('SemanticInput', () => {
    it('should render input with label', () => {
      render(<SemanticInput label="Email" type="email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('should render help text when provided', () => {
      render(
        <SemanticInput label="Email" helpText="Enter your email address" />
      );
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
      render(<SemanticInput label="Email" error="Invalid email" />);
      const errorText = screen.getByText('Invalid email');
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveAttribute('role', 'alert');
    });

    it('should set aria-invalid when error present', () => {
      render(<SemanticInput label="Email" error="Invalid" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('ScreenReaderOnly', () => {
    it('should render with sr-only class', () => {
      render(<ScreenReaderOnly>Hidden text</ScreenReaderOnly>);
      const element = screen.getByText('Hidden text');
      expect(element).toHaveClass('sr-only');
    });
  });

  describe('SemanticLoading', () => {
    it('should render with default message', () => {
      render(<SemanticLoading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render with custom message', () => {
      render(<SemanticLoading message="Please wait..." />);
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('should render small size', () => {
      const { container } = render(<SemanticLoading size="sm" />);
      expect(container.querySelector('.w-4')).toBeInTheDocument();
    });

    it('should render medium size by default', () => {
      const { container } = render(<SemanticLoading />);
      expect(container.querySelector('.w-8')).toBeInTheDocument();
    });

    it('should render large size', () => {
      const { container } = render(<SemanticLoading size="lg" />);
      expect(container.querySelector('.w-12')).toBeInTheDocument();
    });
  });
});
