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
export interface SemanticSectionProps {
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
export declare const Main: React.FC<SemanticSectionProps>;
/**
 * Article content component.
 * Renders an `<article>` element for self-contained content.
 *
 * @param props - Semantic section props
 * @returns An article element
 */
export declare const Article: React.FC<SemanticSectionProps>;
/**
 * Section component for thematic grouping of content.
 * Renders a `<section>` element.
 *
 * @param props - Semantic section props
 * @returns A section element
 */
export declare const Section: React.FC<SemanticSectionProps>;
/** Props for the Nav component. Requires `aria-label` for accessibility. */
export interface NavProps extends SemanticSectionProps {
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
export declare const Nav: React.FC<NavProps>;
/**
 * Header/banner component.
 * Renders a `<header>` element with `role="banner"`.
 *
 * @param props - Semantic section props
 * @returns A header element
 */
export declare const Header: React.FC<SemanticSectionProps>;
/**
 * Footer/content info component.
 * Renders a `<footer>` element with `role="contentinfo"`.
 *
 * @param props - Semantic section props
 * @returns A footer element
 */
export declare const Footer: React.FC<SemanticSectionProps>;
/**
 * Aside/complementary content component (sidebars, related content).
 * Renders an `<aside>` element with `role="complementary"`.
 *
 * @param props - Semantic section props
 * @returns An aside element
 */
export declare const Aside: React.FC<SemanticSectionProps>;
/** Props for the Figure component. */
export interface FigureProps {
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
export declare const Figure: React.FC<FigureProps>;
/** Props for heading components (H1-H4). */
export interface HeadingProps {
    /** Heading text or content */
    children: React.ReactNode;
    /** Optional CSS class name */
    className?: string;
    /** Optional element ID */
    id?: string;
    /** ARIA heading level override */
    'aria-level'?: number;
}
export declare const H1: React.FC<HeadingProps>;
export declare const H2: React.FC<HeadingProps>;
export declare const H3: React.FC<HeadingProps>;
export declare const H4: React.FC<HeadingProps>;
/** Props for list components (OrderedList, UnorderedList). */
export interface ListProps {
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
}
export declare const OrderedList: React.FC<ListProps>;
export declare const UnorderedList: React.FC<ListProps>;
/** Props for the SemanticButton component. Extends native button attributes. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
export declare const SemanticButton: React.FC<ButtonProps>;
/** Props for the SemanticLink component. Extends native anchor attributes. */
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
export declare const SemanticLink: React.FC<LinkProps>;
/**
 * Skip navigation link for keyboard accessibility.
 * Visually hidden until focused, then positions absolutely at the top-left.
 *
 * @param props - Props containing the target href (typically "#main-content")
 * @returns A skip-to-content link element
 */
export declare const SkipLink: React.FC<{
    href: string;
}>;
/** Props for ARIA landmark region components. */
export interface LandmarkProps {
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
}
export declare const SearchRegion: React.FC<LandmarkProps>;
export declare const BannerRegion: React.FC<LandmarkProps>;
export declare const ComplementaryRegion: React.FC<LandmarkProps>;
/** Props for the SemanticForm component. Extends native form attributes. */
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    'aria-label'?: string;
    'aria-labelledby'?: string;
}
/**
 * Semantic form component with ARIA label support.
 *
 * @param props - Form props including optional aria-label
 * @returns A form element
 */
export declare const SemanticForm: React.FC<FormProps>;
/** Props for the SemanticInput component. Extends native input attributes. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
export declare const SemanticInput: React.FC<InputProps>;
/**
 * Screen reader only text component.
 * Renders visually hidden text using the `.sr-only` CSS class.
 *
 * @param props - Props containing children text
 * @returns A visually hidden span element
 */
export declare const ScreenReaderOnly: React.FC<{
    children: React.ReactNode;
}>;
/** Props for the SemanticLoading component. */
export interface LoadingProps {
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
export declare const SemanticLoading: React.FC<LoadingProps>;
