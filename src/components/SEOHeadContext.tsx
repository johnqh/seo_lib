import { createContext, type ReactNode, useContext } from 'react';

export interface SEOHeadConfig {
  /** App display name (used in og:site_name, schema). */
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
  /** Schema.org applicationCategory for WebApplication schema. */
  applicationCategory: string | string[];
  /** Schema.org applicationSubCategory for WebApplication schema. */
  applicationSubCategory?: string;
  /** i18n namespace for howto translations. Defaults to 'howto'. */
  howtoNamespace?: string;
}

const SEOHeadConfigContext = createContext<SEOHeadConfig | null>(null);

export function useSEOHeadConfig(): SEOHeadConfig {
  const config = useContext(SEOHeadConfigContext);
  if (!config) {
    throw new Error('SEOHead must be used within a <SEOHeadProvider>');
  }
  return config;
}

export function SEOHeadProvider({
  config,
  children,
}: {
  config: SEOHeadConfig;
  children: ReactNode;
}) {
  return (
    <SEOHeadConfigContext.Provider value={config}>
      {children}
    </SEOHeadConfigContext.Provider>
  );
}
