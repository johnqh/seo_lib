import { afterEach, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePageSEO, type PageSEOConfig, type PageSEOData } from './usePageSEO';

const config: PageSEOConfig = {
  appName: 'Sudojo',
  baseUrl: 'https://sudojo.com',
  defaultOgImage: 'https://sudojo.com/og.png',
  supportedLanguages: ['en', 'de', 'ja'],
  defaultLanguage: 'en',
};

function baseData(overrides: Partial<PageSEOData> = {}): PageSEOData {
  return {
    title: 'X-Wing',
    description: 'Learn the X-Wing technique.',
    canonical: 'https://sudojo.com/en/techniques/x-wing/',
    lang: 'en',
    pathWithoutLang: '/techniques/x-wing/',
    ...overrides,
  };
}

function hreflangLinks(): HTMLLinkElement[] {
  return Array.from(
    document.querySelectorAll('link[rel="alternate"][hreflang]')
  );
}

afterEach(() => {
  document.head.innerHTML = '';
  document.title = '';
});

describe('usePageSEO hreflang / canonical consistency', () => {
  it('emits one hreflang per language plus x-default with no duplicates', () => {
    renderHook(() => usePageSEO(baseData(), config));
    // 3 languages + x-default
    expect(hreflangLinks()).toHaveLength(4);
  });

  it('keeps the self-referencing hreflang byte-for-byte identical to canonical', () => {
    renderHook(() => usePageSEO(baseData(), config));
    const self = document.querySelector(
      'link[rel="alternate"][hreflang="en"]'
    ) as HTMLLinkElement;
    const canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(canonical.href).toBe('https://sudojo.com/en/techniques/x-wing/');
    // A valid hreflang cluster requires self-hreflang === canonical.
    expect(self.href).toBe(canonical.href);
  });

  it('removes prerender-injected hreflang tags that carry data-rh (no doubled cluster)', () => {
    // Simulate the prerendered snapshot: 3 langs + x-default already in <head>,
    // all marked data-rh="true" (the old bug: the cleanup skipped these).
    for (const l of ['en', 'de', 'ja', 'x-default']) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l;
      link.href = `https://sudojo.com/${l === 'x-default' ? 'en' : l}/techniques/x-wing/`;
      link.setAttribute('data-rh', 'true');
      document.head.appendChild(link);
    }
    expect(hreflangLinks()).toHaveLength(4);

    renderHook(() => usePageSEO(baseData(), config));

    // Still 4, not 8 — the injected set was cleared before rebuilding.
    expect(hreflangLinks()).toHaveLength(4);
  });

  it('uses a single trailing-slash canonical for the language root', () => {
    renderHook(() =>
      usePageSEO(
        baseData({
          canonical: 'https://sudojo.com/en/',
          pathWithoutLang: '/',
        }),
        config
      )
    );
    const self = document.querySelector(
      'link[rel="alternate"][hreflang="en"]'
    ) as HTMLLinkElement;
    expect(self.href).toBe('https://sudojo.com/en/');
  });
});
