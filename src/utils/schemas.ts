/**
 * Generic Schema.org structured data builders.
 *
 * Pure functions that return JSON-LD objects. Designed for use in both
 * React components (SEOHead) and build-time generators (generate-seo-assets).
 */

export interface OrganizationSchemaConfig {
  /** Organization display name (e.g., 'Sudobility Inc.'). */
  name: string;
  /** Organization website URL without trailing slash. */
  url: string;
  /** Full URL to the organization logo image. */
  logoUrl: string;
  /** Localized description of the organization. */
  description: string;
  /** Support contact email address. */
  supportEmail?: string;
  /** Founding year or ISO date string. */
  foundingDate?: string;
  /** Languages supported by customer service. */
  supportedLanguages?: readonly string[];
}

/**
 * Build a Schema.org Organization JSON-LD object.
 *
 * @example
 * ```ts
 * const schema = buildOrganizationSchema({
 *   name: 'Acme Inc.',
 *   url: 'https://acme.com',
 *   logoUrl: 'https://acme.com/logo.png',
 *   description: t('organization.description'),
 *   supportEmail: 'support@acme.com',
 *   foundingDate: '2024',
 * });
 * ```
 */
export function buildOrganizationSchema(
  config: OrganizationSchemaConfig
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${config.url}/#organization`,
    name: config.name,
    url: config.url,
    logo: {
      '@type': 'ImageObject',
      url: config.logoUrl,
      width: 512,
      height: 512,
    },
    description: config.description,
  };

  if (config.foundingDate) {
    schema.foundingDate = config.foundingDate;
  }

  if (config.supportEmail || config.supportedLanguages) {
    const contactPoint: Record<string, unknown> = {
      '@type': 'ContactPoint',
      contactType: 'customer support',
    };
    if (config.supportEmail) {
      contactPoint.email = config.supportEmail;
    }
    if (config.supportedLanguages && config.supportedLanguages.length > 0) {
      contactPoint.availableLanguage = [...config.supportedLanguages];
    }
    schema.contactPoint = contactPoint;
  }

  return schema;
}

export interface SoftwareApplicationSchemaConfig {
  /** Application display name. */
  name: string;
  /** Application website URL. */
  url: string;
  /** Localized description of the application. */
  description: string;
  /** Schema.org applicationCategory (e.g., 'DeveloperApplication'). */
  applicationCategory: string | string[];
  /** Schema.org applicationSubCategory. */
  applicationSubCategory?: string;
  /** Localized feature list. */
  featureList?: string[];
  /** Organization name for author/publisher. */
  organizationName?: string;
  /** Organization URL. */
  organizationUrl?: string;
  /** ISO date for dateModified. Defaults to today. */
  dateModified?: string;
  /** Price offers. */
  offers?: {
    lowPrice?: string;
    highPrice?: string;
    priceCurrency?: string;
    offerCount?: string;
  };
}

/**
 * Build a Schema.org SoftwareApplication JSON-LD object.
 *
 * @example
 * ```ts
 * const schema = buildSoftwareApplicationSchema({
 *   name: 'MyApp',
 *   url: 'https://myapp.com',
 *   description: t('app.description'),
 *   applicationCategory: 'DeveloperApplication',
 *   featureList: t('app.features', { returnObjects: true }),
 * });
 * ```
 */
export function buildSoftwareApplicationSchema(
  config: SoftwareApplicationSchemaConfig
): Record<string, unknown> {
  const orgName = config.organizationName || config.name;
  const orgUrl = config.organizationUrl || config.url;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    applicationCategory: config.applicationCategory,
    operatingSystem: 'Web',
    description: config.description,
    url: config.url,
    author: {
      '@type': 'Organization',
      name: orgName,
      url: orgUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: orgName,
      url: orgUrl,
    },
    dateModified: config.dateModified || new Date().toISOString().split('T')[0],
  };

  if (config.applicationSubCategory) {
    schema.applicationSubCategory = config.applicationSubCategory;
  }

  if (config.offers) {
    schema.offers = {
      '@type': 'AggregateOffer',
      lowPrice: config.offers.lowPrice || '0',
      highPrice: config.offers.highPrice || '0',
      priceCurrency: config.offers.priceCurrency || 'USD',
      offerCount: config.offers.offerCount || '1',
    };
  }

  if (config.featureList && config.featureList.length > 0) {
    schema.featureList = config.featureList;
  }

  schema.softwareRequirements = 'Modern web browser';

  return schema;
}
