/**
 * @fileoverview SEO-optimized heading utility for consistent semantic structure.
 *
 * Provides functions to create heading elements with SEO-friendly IDs,
 * contextual Tailwind CSS styling, and ARIA attributes. Includes preset
 * patterns for common Web3 email page layouts and a heading hierarchy validator.
 */
import React from 'react';
/**
 * Configuration for creating a semantic heading element.
 */
export interface HeadingConfig {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
    className?: string;
    id?: string;
    semanticContext?: 'page-title' | 'section' | 'subsection' | 'feature' | 'benefit' | 'step';
}
/**
 * Create an SEO-optimized React heading element (h1-h6).
 *
 * Applies Tailwind CSS classes based on heading level and semantic context,
 * auto-generates slug IDs from text when not provided, and sets aria-level.
 *
 * @param config - Heading configuration including level, text, and optional styling
 * @returns A React element for the heading (h1-h6)
 */
export declare const createSemanticHeading: (config: HeadingConfig) => React.ReactElement;
/**
 * Predefined heading configuration factory functions for common Web3 contexts.
 *
 * Each function returns a HeadingConfig with appropriate level and semantic context.
 */
export declare const WEB3_HEADING_PATTERNS: {
    pageTitle: (text: string, className?: string) => HeadingConfig;
    majorSection: (text: string, className?: string) => HeadingConfig;
    feature: (text: string, className?: string) => HeadingConfig;
    benefit: (text: string, className?: string) => HeadingConfig;
    step: (text: string, stepNumber?: number, className?: string) => HeadingConfig;
    subFeature: (text: string, className?: string) => HeadingConfig;
};
/**
 * Validate heading hierarchy for SEO compliance.
 *
 * Checks for: single H1 per page, no heading level skips (e.g., H1 to H3),
 * and descriptive text length (min 3 chars, warns over 70 chars).
 *
 * @param headings - Array of HeadingConfig objects representing the page heading structure
 * @returns Object with isValid boolean, errors array, and suggestions array
 */
export declare const validateHeadingStructure: (headings: HeadingConfig[]) => {
    isValid: boolean;
    errors: string[];
    suggestions: string[];
};
export declare const WEB3_EMAIL_HEADINGS: {
    walletConnection: HeadingConfig;
    emailBenefits: HeadingConfig;
    securityFeature: HeadingConfig;
    ensIntegration: HeadingConfig;
    multiChain: HeadingConfig;
    passwordless: HeadingConfig;
    setupStep1: HeadingConfig;
    setupStep2: HeadingConfig;
    setupStep3: HeadingConfig;
};
declare const _default: {
    createSemanticHeading: (config: HeadingConfig) => React.ReactElement;
    WEB3_HEADING_PATTERNS: {
        pageTitle: (text: string, className?: string) => HeadingConfig;
        majorSection: (text: string, className?: string) => HeadingConfig;
        feature: (text: string, className?: string) => HeadingConfig;
        benefit: (text: string, className?: string) => HeadingConfig;
        step: (text: string, stepNumber?: number, className?: string) => HeadingConfig;
        subFeature: (text: string, className?: string) => HeadingConfig;
    };
    validateHeadingStructure: (headings: HeadingConfig[]) => {
        isValid: boolean;
        errors: string[];
        suggestions: string[];
    };
    WEB3_EMAIL_HEADINGS: {
        walletConnection: HeadingConfig;
        emailBenefits: HeadingConfig;
        securityFeature: HeadingConfig;
        ensIntegration: HeadingConfig;
        multiChain: HeadingConfig;
        passwordless: HeadingConfig;
        setupStep1: HeadingConfig;
        setupStep2: HeadingConfig;
        setupStep3: HeadingConfig;
    };
};
export default _default;
