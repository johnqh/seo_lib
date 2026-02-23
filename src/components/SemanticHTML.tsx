/**
 * @fileoverview Semantic HTML Enhancement Components.
 *
 * Provides a collection of 20+ React components that wrap standard HTML elements
 * with proper ARIA roles, accessibility attributes, and Tailwind CSS styling.
 * Designed to enforce semantic HTML best practices for improved SEO and accessibility.
 */

import React from 'react';

/**
 * Shared props interface for semantic section components.
 *
 * Provides common properties accepted by landmark and sectioning components
 * such as Main, Article, Section, Header, Footer, Nav, and Aside.
 */
interface SemanticSectionProps {
  /** Child elements to render within the section */
  children: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
  /** Optional element ID */
  id?: string;
  /** Accessible label for the section */
  'aria-label'?: string;
  /** ID of the element that labels this section */
  'aria-labelledby'?: string;
}

/**
 * Main content section component.
 * Renders a `<main>` element with `role="main"`.
 *
 * @param props - Semantic section props
 * @returns A main landmark element
 */
export const Main: React.FC<SemanticSectionProps> = ({
  children,
  className,
  ...props
}) => (
  <main className={className} {...props} role="main">
    {children}
  </main>
);

/**
 * Article content component.
 * Renders an `<article>` element for self-contained content.
 *
 * @param props - Semantic section props
 * @returns An article element
 */
export const Article: React.FC<SemanticSectionProps> = ({
  children,
  className,
  ...props
}) => (
  <article className={className} {...props}>
    {children}
  </article>
);

/**
 * Section component for thematic grouping of content.
 * Renders a `<section>` element.
 *
 * @param props - Semantic section props
 * @returns A section element
 */
export const Section: React.FC<SemanticSectionProps> = ({
  children,
  className,
  ...props
}) => (
  <section className={className} {...props}>
    {children}
  </section>
);

/** Props for the Nav component. Requires `aria-label` for accessibility. */
interface NavProps extends SemanticSectionProps {
  /** Required accessible label for the navigation landmark */
  'aria-label': string;
}

/**
 * Navigation landmark component.
 * Renders a `<nav>` element with `role="navigation"`.
 *
 * @param props - Nav props (aria-label is required)
 * @returns A nav landmark element
 */
export const Nav: React.FC<NavProps> = ({ children, className, ...props }) => (
  <nav className={className} {...props} role="navigation">
    {children}
  </nav>
);

/**
 * Header/banner component.
 * Renders a `<header>` element with `role="banner"`.
 *
 * @param props - Semantic section props
 * @returns A header element
 */
export const Header: React.FC<SemanticSectionProps> = ({
  children,
  className,
  ...props
}) => (
  <header className={className} {...props} role="banner">
    {children}
  </header>
);

/**
 * Footer/content info component.
 * Renders a `<footer>` element with `role="contentinfo"`.
 *
 * @param props - Semantic section props
 * @returns A footer element
 */
export const Footer: React.FC<SemanticSectionProps> = ({
  children,
  className,
  ...props
}) => (
  <footer className={className} {...props} role="contentinfo">
    {children}
  </footer>
);

/**
 * Aside/complementary content component (sidebars, related content).
 * Renders an `<aside>` element with `role="complementary"`.
 *
 * @param props - Semantic section props
 * @returns An aside element
 */
export const Aside: React.FC<SemanticSectionProps> = ({
  children,
  className,
  ...props
}) => (
  <aside className={className} {...props} role="complementary">
    {children}
  </aside>
);

/** Props for the Figure component. */
interface FigureProps {
  /** Child elements (typically an image or illustration) */
  children: React.ReactNode;
  /** Optional caption text rendered as a `<figcaption>` */
  caption?: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional element ID */
  id?: string;
}

/**
 * Figure component with optional caption.
 * Renders a `<figure>` element with an optional `<figcaption>`.
 *
 * @param props - Figure props including optional caption
 * @returns A figure element with optional figcaption
 */
export const Figure: React.FC<FigureProps> = ({
  children,
  caption,
  className,
  ...props
}) => (
  <figure className={className} {...props}>
    {children}
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

/** Props for heading components (H1-H4). */
interface HeadingProps {
  /** Heading text or content */
  children: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
  /** Optional element ID */
  id?: string;
  /** ARIA heading level override */
  'aria-level'?: number;
}

export const H1: React.FC<HeadingProps> = ({
  children,
  className,
  ...props
}) => (
  <h1 className={className} {...props}>
    {children}
  </h1>
);

export const H2: React.FC<HeadingProps> = ({
  children,
  className,
  ...props
}) => (
  <h2 className={className} {...props}>
    {children}
  </h2>
);

export const H3: React.FC<HeadingProps> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={className} {...props}>
    {children}
  </h3>
);

export const H4: React.FC<HeadingProps> = ({
  children,
  className,
  ...props
}) => (
  <h4 className={className} {...props}>
    {children}
  </h4>
);

/** Props for list components (OrderedList, UnorderedList). */
interface ListProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const OrderedList: React.FC<ListProps> = ({
  children,
  className,
  ...props
}) => (
  <ol className={className} {...props}>
    {children}
  </ol>
);

export const UnorderedList: React.FC<ListProps> = ({
  children,
  className,
  ...props
}) => (
  <ul className={className} {...props}>
    {children}
  </ul>
);

/** Props for the SemanticButton component. Extends native button attributes. */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  'aria-describedby'?: string;
}

/**
 * Semantically enhanced button with variant styling and ARIA support.
 * Supports `primary`, `secondary`, and `danger` variants with Tailwind classes.
 *
 * @param props - Button props including variant and standard button attributes
 * @returns A styled button element with aria-disabled support
 */
export const SemanticButton: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  disabled,
  ...props
}) => {
  const baseClasses =
    'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

/** Props for the SemanticLink component. Extends native anchor attributes. */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  'aria-describedby'?: string;
}

/**
 * Semantically enhanced link with accessibility features.
 * When `external` is true, adds `target="_blank"`, `rel="noopener noreferrer"`,
 * and a screen-reader-only "(opens in new tab)" notice.
 *
 * @param props - Link props including external flag
 * @returns An anchor element with accessibility enhancements
 */
export const SemanticLink: React.FC<LinkProps> = ({
  children,
  external,
  className = '',
  href,
  ...props
}) => {
  const linkProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-describedby': 'external-link-desc',
      }
    : {};

  return (
    <>
      <a
        className={`text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        href={href}
        {...linkProps}
        {...props}
      >
        {children}
        {external && <span className="sr-only"> (opens in new tab)</span>}
      </a>
      {external && (
        <span id="external-link-desc" className="sr-only">
          External links open in a new tab
        </span>
      )}
    </>
  );
};

/**
 * Skip navigation link for keyboard accessibility.
 * Visually hidden until focused, then positions absolutely at the top-left.
 *
 * @param props - Props containing the target href (typically "#main-content")
 * @returns A skip-to-content link element
 */
export const SkipLink: React.FC<{ href: string }> = ({ href }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
  >
    Skip to main content
  </a>
);

/** Props for ARIA landmark region components. */
interface LandmarkProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const SearchRegion: React.FC<LandmarkProps> = ({
  children,
  className,
  ...props
}) => (
  <div role="search" className={className} {...props}>
    {children}
  </div>
);

export const BannerRegion: React.FC<LandmarkProps> = ({
  children,
  className,
  ...props
}) => (
  <div role="banner" className={className} {...props}>
    {children}
  </div>
);

export const ComplementaryRegion: React.FC<LandmarkProps> = ({
  children,
  className,
  ...props
}) => (
  <div role="complementary" className={className} {...props}>
    {children}
  </div>
);

/** Props for the SemanticForm component. Extends native form attributes. */
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

/**
 * Semantic form component with ARIA label support.
 *
 * @param props - Form props including optional aria-label
 * @returns A form element
 */
export const SemanticForm: React.FC<FormProps> = ({
  children,
  className,
  ...props
}) => (
  <form className={className} {...props}>
    {children}
  </form>
);

/** Props for the SemanticInput component. Extends native input attributes. */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label: string;
  /** Error message displayed below the input; sets aria-invalid when present */
  error?: string;
  /** Help text displayed below the input */
  helpText?: string;
}

/**
 * Semantic input component with auto-generated label, error, and help text.
 * Generates unique IDs for label-input association and ARIA describedby references.
 *
 * @param props - Input props including label, error, and helpText
 * @returns A labeled input with optional error and help text
 */
export const SemanticInput: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpId = helpText ? `${inputId}-help` : undefined;

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        aria-describedby={
          [helpId, errorId].filter(Boolean).join(' ') || undefined
        }
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      {helpText && (
        <p id={helpId} className="mt-1 text-sm text-gray-600">
          {helpText}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Screen reader only text component.
 * Renders visually hidden text using the `.sr-only` CSS class.
 *
 * @param props - Props containing children text
 * @returns A visually hidden span element
 */
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span className="sr-only">{children}</span>;

/** Props for the SemanticLoading component. */
interface LoadingProps {
  /** Screen-reader message (defaults to "Loading...") */
  message?: string;
  /** Spinner size: 'sm' (16px), 'md' (32px), or 'lg' (48px) */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Accessible loading indicator with spinner animation.
 * Uses `role="status"` and `aria-live="polite"` for screen reader announcements.
 *
 * @param props - Loading props including message and size
 * @returns A loading indicator with screen-reader support
 */
export const SemanticLoading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center space-x-2"
    >
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
        aria-hidden="true"
      />
      <span className="sr-only">{message}</span>
    </div>
  );
};
