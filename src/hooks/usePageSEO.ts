/**
 * Comprehensive SEO hook for page components.
 *
 * Pages provide localized content (title, description, keywords, structured data).
 * This hook handles all DOM manipulation: document.title, meta tags, canonical,
 * og:*, twitter:*, hreflang, and structured data scripts.
 *
 * Replaces the need for pages to call useSEOUpdate, manage useEffects for
 * canonical/og:url, or worry about react-helmet-async v2 + React 19 issues.
 *
 * @example
 * ```tsx
 * usePageSEO({
 *   title: t('seo.detail.title', { name: localizedName }),
 *   description: t('seo.detail.description', { name: localizedName }),
 *   keywords: ['keyword1', 'keyword2'],
 *   canonical: `https://example.com/en/items/${itemPath}`,
 *   lang: 'en',
 *   ogType: 'article',
 *   structuredData: [articleSchema, breadcrumbSchema],
 * }, {
 *   appName: 'MyApp',
 *   baseUrl: 'https://example.com',
 *   defaultOgImage: 'https://example.com/logo.png',
 *   supportedLanguages: ['en', 'zh', 'ja'],
 *   defaultLanguage: 'en',
 * });
 * ```
 */

import { useEffect, useRef } from 'react';

export interface PageSEOData {
  /** Full page title (including app name suffix if desired). */
  title: string;
  /** Meta description for search engines. */
  description: string;
  /** Keywords array. */
  keywords?: string[];
  /** Full canonical URL for this page. */
  canonical: string;
  /** Current page language code (e.g., 'en', 'zh'). */
  lang: string;
  /** Path without the language prefix (e.g., '/techniques/hidden-pair'). Used for hreflang. */
  pathWithoutLang: string;
  /** Open Graph type. Defaults to 'website'. */
  ogType?: 'website' | 'article';
  /** Whether to set noindex. Defaults to false. */
  noIndex?: boolean;
  /** Structured data schemas to render as JSON-LD script tags. */
  structuredData?: Record<string, unknown>[];
}

export interface PageSEOConfig {
  /** App name for og:site_name. */
  appName: string;
  /** Base URL without trailing slash (e.g., 'https://example.com'). */
  baseUrl: string;
  /** Default Open Graph image URL. */
  defaultOgImage: string;
  /** Twitter handle without @ prefix. */
  twitterHandle?: string;
  /** All supported language codes. */
  supportedLanguages: readonly string[];
  /** Default/fallback language code. */
  defaultLanguage: string;
}

function setMeta(attr: string, key: string, content: string): void {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  el.setAttribute('data-rh', 'true');
}

function setLink(rel: string, href: string, attrs?: Record<string, string>): HTMLLinkElement {
  const selector = attrs
    ? `link[rel="${rel}"][${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join('][')}]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        el.setAttribute(k, v);
      }
    }
    document.head.appendChild(el);
  }
  el.href = href;
  el.setAttribute('data-rh', 'true');
  return el;
}

/**
 * Manages all SEO meta tags, canonical, hreflang, and structured data via direct DOM manipulation.
 * Works around react-helmet-async v2 + React 19 compatibility issues.
 */
export function usePageSEO(data: PageSEOData, config: PageSEOConfig): void {
  const {
    title,
    description,
    keywords,
    canonical,
    lang,
    pathWithoutLang,
    ogType = 'website',
    noIndex = false,
    structuredData,
  } = data;

  const {
    appName,
    baseUrl,
    defaultOgImage,
    twitterHandle,
    supportedLanguages,
    defaultLanguage,
  } = config;

  // Track managed hreflang elements for cleanup
  const hreflangRef = useRef<HTMLLinkElement[]>([]);

  // Title + meta tags
  useEffect(() => {
    document.title = title;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    if (keywords && keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join(', '));
    }

    // Open Graph
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', appName);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', defaultOgImage);
    setMeta('property', 'og:image:alt', title);
    setMeta('property', 'og:locale', lang);

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', defaultOgImage);
    if (twitterHandle) {
      setMeta('name', 'twitter:site', `@${twitterHandle}`);
    }
  }, [title, description, keywords, canonical, lang, ogType, noIndex, appName, defaultOgImage, twitterHandle]);

  // Canonical link
  useEffect(() => {
    setLink('canonical', canonical);
  }, [canonical]);

  // Hreflang tags
  useEffect(() => {
    // Remove previous managed hreflang links
    for (const el of hreflangRef.current) {
      el.remove();
    }
    const elements: HTMLLinkElement[] = [];

    // One link per supported language
    for (const lng of supportedLanguages) {
      const href = `${baseUrl}/${lng}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
      const el = document.createElement('link');
      el.rel = 'alternate';
      el.hreflang = lng;
      el.href = href;
      el.setAttribute('data-rh', 'true');
      document.head.appendChild(el);
      elements.push(el);
    }

    // x-default
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = `${baseUrl}/${defaultLanguage}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    xDefault.setAttribute('data-rh', 'true');
    document.head.appendChild(xDefault);
    elements.push(xDefault);

    hreflangRef.current = elements;

    return () => {
      for (const el of elements) {
        el.remove();
      }
    };
  }, [baseUrl, pathWithoutLang, supportedLanguages, defaultLanguage]);

  // Structured data scripts
  const schemasJson = JSON.stringify(structuredData ?? []);
  useEffect(() => {
    // Remove all previous managed structured data scripts
    document.querySelectorAll('script[data-seo-managed]').forEach(el => el.remove());

    if (!structuredData || structuredData.length === 0) return;

    for (const schema of structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-managed', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [schemasJson]); // eslint-disable-line react-hooks/exhaustive-deps
}
