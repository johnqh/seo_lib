import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  meta?: Array<{ name?: string; property?: string; content: string }>;
  /** Additional link tags */
  links?: Array<{ rel: string; href: string; [key: string]: string }>;
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
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage,
  noIndex = false,
  structuredData,
  twitterCard = 'summary_large_image',
  twitterSite,
  config,
  meta = [],
  links = [],
}) => {
  const {
    appName,
    baseUrl,
    defaultDescription,
    defaultOgImage,
    defaultTwitterSite,
  } = config;

  // Build full title
  const fullTitle = title ? `${title} | ${appName}` : appName;

  // Use provided or default values
  const metaDescription = description || defaultDescription;
  const metaOgImage = ogImage || defaultOgImage || `${baseUrl}/og-image.png`;
  const metaTwitterSite = twitterSite || defaultTwitterSite;

  // Build canonical URL
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;

  // Format keywords
  const keywordsString = Array.isArray(keywords)
    ? keywords.join(', ')
    : keywords;

  // Format structured data
  const structuredDataArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      {metaDescription && <meta name="description" content={metaDescription} />}
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:site_name" content={appName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      {metaTwitterSite && (
        <meta name="twitter:site" content={metaTwitterSite} />
      )}
      {canonicalUrl && <meta name="twitter:url" content={canonicalUrl} />}
      <meta name="twitter:title" content={fullTitle} />
      {metaDescription && (
        <meta name="twitter:description" content={metaDescription} />
      )}
      <meta name="twitter:image" content={metaOgImage} />

      {/* Additional meta tags */}
      {meta.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}

      {/* Additional link tags */}
      {links.map((link, index) => (
        <link key={index} {...link} />
      ))}

      {/* Structured Data */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
