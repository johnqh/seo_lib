/**
 * React 19 + react-helmet-async workaround hook.
 *
 * react-helmet-async v2 does not reliably update meta tags on re-renders
 * with React 19. This hook writes document.title and key meta tags directly
 * to the DOM via useEffect, ensuring they stay in sync when page content
 * changes without a full route transition (e.g., master-detail selection,
 * tab switches, filtered views).
 *
 * Use this hook in any page component where SEO metadata changes based on
 * in-page selection. It complements — not replaces — the <SEO> component,
 * which still handles hreflang, canonical, and structured data.
 */

import { useEffect } from 'react';

export interface UseSEOUpdateOptions {
  /** Page-specific title (without app name suffix). */
  title: string;
  /** Meta description for search engines. */
  description: string;
  /** App name appended to the title (e.g., "| AppName"). */
  appName?: string;
  /** Comma-separated or array keywords for the meta keywords tag. */
  keywords?: string;
  /** Open Graph image URL. */
  ogImage?: string;
  /** Canonical URL for the page. */
  canonical?: string;
}

/**
 * Force-updates document.title and meta tags when values change.
 *
 * @example
 * ```tsx
 * const seoTitle = hasSlug
 *   ? t(`seo.items.${selectedSlug}.title`)
 *   : t('seo.items.index.title');
 * const seoDescription = t(`seo.items.${selectedSlug}.description`);
 *
 * useSEOUpdate({
 *   title: seoTitle,
 *   description: seoDescription,
 *   appName: 'MyApp',
 *   keywords: t(`seo.items.${selectedSlug}.keywords`),
 * });
 * ```
 */
export function useSEOUpdate({
  title,
  description,
  appName,
  keywords,
  ogImage,
  canonical,
}: UseSEOUpdateOptions): void {
  useEffect(() => {
    const fullTitle = appName ? `${title} | ${appName}` : title;
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(
        `meta[${attr}="${key}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      el.setAttribute('data-rh', 'true');
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
      el.setAttribute('data-rh', 'true');
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image:alt', fullTitle);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);

    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }
    if (ogImage) {
      setMeta('property', 'og:image', ogImage);
    }
    if (canonical) {
      setLink('canonical', canonical);
      setMeta('property', 'og:url', canonical);
    }
  }, [title, description, appName, keywords, ogImage, canonical]);
}
