import React from 'react';
export interface SEOProps {
    /** Page title (will be suffixed with appName if provided) */
    title?: string;
    /** Meta description */
    description?: string;
    /** Meta keywords */
    keywords?: string | string[];
    /** Canonical URL path (will be prefixed with baseUrl) */
    canonical?: string;
    /** Open Graph type */
    ogType?: 'website' | 'article' | 'product' | 'profile';
    /** Open Graph image URL */
    ogImage?: string;
    /** Whether to add noindex meta tag */
    noIndex?: boolean;
    /** JSON-LD structured data */
    structuredData?: object | object[];
    /** Twitter card type */
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    /** Twitter handle (e.g., @company) */
    twitterSite?: string;
    /** App configuration */
    config: SEOConfig;
    /** Additional meta tags */
    meta?: Array<{
        name?: string;
        property?: string;
        content: string;
    }>;
    /** Additional link tags */
    links?: Array<{
        rel: string;
        href: string;
        [key: string]: string;
    }>;
}
export interface SEOConfig {
    /** Application name */
    appName: string;
    /** Base URL (e.g., https://example.com) */
    baseUrl: string;
    /** Default meta description */
    defaultDescription?: string;
    /** Default OG image */
    defaultOgImage?: string;
    /** Default Twitter handle */
    defaultTwitterSite?: string;
}
/**
 * SEO Component
 *
 * A comprehensive SEO component for managing meta tags, Open Graph,
 * Twitter cards, and structured data using react-helmet-async.
 *
 * @example
 * ```tsx
 * const seoConfig: SEOConfig = {
 *   appName: 'MyApp',
 *   baseUrl: 'https://myapp.com',
 *   defaultDescription: 'My awesome application',
 *   defaultOgImage: 'https://myapp.com/og-image.png',
 * };
 *
 * <SEO
 *   config={seoConfig}
 *   title="Dashboard"
 *   description="Manage your account"
 *   canonical="/dashboard"
 * />
 * ```
 */
export declare const SEO: React.FC<SEOProps>;
export default SEO;
