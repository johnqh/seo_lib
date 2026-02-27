/**
 * Advanced SEO and AI Optimization Utilities
 * Comprehensive structured data and semantic markup for search engines and AI crawlers
 */
/**
 * Branding configuration for SEO generators.
 * Provides app identity used across all schema generators.
 */
export interface AppBrandingConfig {
    /** Application name (required) */
    appName: string;
    /** Base URL of the application (required, e.g., 'https://example.com') */
    baseUrl: string;
    /** Twitter handle for social cards (e.g., '@myapp') */
    twitterHandle?: string;
    /** Email domain for contact references */
    emailDomain?: string;
}
/**
 * Configuration for advanced SEO generation functions.
 * Used by all schema generators, OpenGraph, Twitter Card, and AI meta tag creators.
 */
export interface AdvancedSEOConfig {
    title: string;
    description: string;
    keywords: string[] | string;
    category: string;
    audience: string[] | string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
    contentType: 'guide' | 'reference' | 'tutorial' | 'overview' | 'feature';
    readingTime?: number;
    lastUpdated?: Date;
    relatedTopics?: string[];
    branding: AppBrandingConfig;
    /** Current page pathname for SSR support (e.g., '/about' or '/docs/intro') */
    pathname?: string;
}
/**
 * Generate a Schema.org SoftwareApplication schema for a Web3 product.
 *
 * Includes offers, feature lists, blockchain network support, wallet compatibility,
 * and audience targeting.
 *
 * @param config - Advanced SEO configuration with branding and content details
 * @returns A Schema.org SoftwareApplication JSON-LD object
 */
export declare const createWeb3ProductSchema: (config: AdvancedSEOConfig) => {
    '@context': string;
    '@type': string;
    name: string;
    applicationCategory: string;
    operatingSystem: string;
    description: string;
    url: string;
    downloadUrl: string;
    installUrl: string;
    screenshot: string;
    aggregateRating: {
        '@type': string;
        ratingValue: string;
        reviewCount: string;
        bestRating: string;
        worstRating: string;
    };
    offers: ({
        '@type': string;
        name: string;
        description: string;
        price: string;
        priceCurrency: string;
        availability: string;
        billingIncrement?: undefined;
    } | {
        '@type': string;
        name: string;
        description: string;
        price: string;
        priceCurrency: string;
        billingIncrement: string;
        availability: string;
    })[];
    featureList: string[];
    applicationSubCategory: string;
    audience: {
        '@type': string;
        audienceType: string;
        geographicArea: string;
    };
    creator: {
        '@type': string;
        name: string;
        url: string;
    };
    datePublished: string;
    dateModified: string;
    version: string;
    softwareRequirements: string;
    storageRequirements: string;
    memoryRequirements: string;
    supportingData: {
        blockchainNetworks: string[];
        supportedWallets: string[];
        smartContractSupport: boolean;
        ensCompatible: boolean;
        snsCompatible: boolean;
    };
};
/**
 * Generate a Schema.org TechnicalArticle schema for guides and documentation.
 *
 * Includes author/publisher organization, educational level, reading time,
 * and learning resource type.
 *
 * @param config - Advanced SEO configuration with branding and content details
 * @returns A Schema.org TechnicalArticle JSON-LD object
 */
export declare const createTechnicalArticleSchema: (config: AdvancedSEOConfig) => {
    '@context': string;
    '@type': string;
    headline: string;
    description: string;
    author: {
        '@type': string;
        name: string;
        url: string;
        logo: {
            '@type': string;
            url: string;
        };
    };
    publisher: {
        '@type': string;
        name: string;
        logo: {
            '@type': string;
            url: string;
            width: number;
            height: number;
        };
    };
    datePublished: string;
    dateModified: string;
    mainEntityOfPage: {
        '@type': string;
        '@id': string;
    };
    image: {
        '@type': string;
        url: string;
        width: number;
        height: number;
    };
    keywords: string;
    about: {
        '@type': string;
        name: string;
    }[];
    audience: {
        '@type': string;
        audienceType: string;
        educationalLevel: "intermediate" | "beginner" | "advanced";
    };
    educationalLevel: "intermediate" | "beginner" | "advanced";
    proficiencyLevel: "intermediate" | "beginner" | "advanced";
    learningResourceType: "guide" | "reference" | "tutorial" | "overview" | "feature";
    timeRequired: string;
    inLanguage: string;
    isAccessibleForFree: boolean;
    license: string;
    teaches: string[];
};
/**
 * Generate a Schema.org FAQPage schema from an array of Q&A entries.
 *
 * Each FAQ item may include an optional `upvoteCount`. When provided, it is
 * included in the schema output. When omitted, the field is excluded entirely
 * (it is not required by Schema.org).
 *
 * @param faqs - Array of FAQ objects with question, answer, optional category and upvoteCount
 * @param branding - App branding configuration for author attribution
 * @returns A Schema.org FAQPage JSON-LD object
 */
export declare const createEnhancedFAQSchema: (faqs: Array<{
    question: string;
    answer: string;
    category?: string;
    upvoteCount?: number;
}>, branding: AppBrandingConfig) => {
    '@context': string;
    '@type': string;
    mainEntity: {
        dateCreated: string;
        category: string;
        upvoteCount?: number | undefined;
        '@type': string;
        name: string;
        acceptedAnswer: {
            '@type': string;
            text: string;
            dateCreated: string;
            author: {
                '@type': string;
                name: string;
            };
        };
        answerCount: number;
    }[];
};
/**
 * Generate a Schema.org WebPage schema optimized for AI/LLM crawlers.
 *
 * Includes significant links, related links, mentions of tools/services,
 * and interaction targets for better LLM understanding.
 *
 * @param config - Advanced SEO configuration with branding and content details
 * @returns A Schema.org WebPage JSON-LD object with AI-optimized metadata
 */
export declare const createAIOptimizedSchema: (config: AdvancedSEOConfig) => {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    url: string;
    primaryImageOfPage: {
        '@type': string;
        url: string;
    };
    significantLink: string[];
    relatedLink: string[];
    about: {
        '@type': string;
        name: string;
        description: string;
        sameAs: string[];
    };
    mentions: {
        '@type': string;
        name: string;
    }[];
    isPartOf: {
        '@type': string;
        '@id': string;
        name: string;
    };
    potentialAction: {
        '@type': string;
        target: {
            '@type': string;
            urlTemplate: string;
            actionPlatform: string[];
        };
        name: string;
    };
};
/**
 * Generate Open Graph meta tag key-value pairs for social sharing.
 *
 * @param config - Advanced SEO configuration with branding and content details
 * @returns An object of Open Graph property-value pairs (e.g., 'og:title', 'og:description')
 */
export declare const createEnhancedOpenGraph: (config: AdvancedSEOConfig) => {
    'og:title': string;
    'og:description': string;
    'og:type': string;
    'og:url': string;
    'og:image': string;
    'og:image:width': string;
    'og:image:height': string;
    'og:image:alt': string;
    'og:site_name': string;
    'og:locale': string;
    'article:author': string;
    'article:section': string;
    'article:tag': string;
    'article:published_time': string;
    'article:modified_time': string;
};
/**
 * Generate Twitter Card meta tag key-value pairs.
 *
 * @param config - Advanced SEO configuration with branding and content details
 * @returns An object of Twitter Card property-value pairs (e.g., 'twitter:card', 'twitter:title')
 */
export declare const createEnhancedTwitterCard: (config: AdvancedSEOConfig) => {
    'twitter:card': string;
    'twitter:site': string;
    'twitter:creator': string;
    'twitter:title': string;
    'twitter:description': string;
    'twitter:image': string;
    'twitter:image:alt': string;
    'twitter:label1': string;
    'twitter:data1': string;
    'twitter:label2': string;
    'twitter:data2': string;
};
/**
 * Generate custom AI/LLM/Web3/semantic meta tags for enhanced AI understanding.
 *
 * Returns meta tags in namespaces: ai:*, web3:*, llm:*, semantic:*, content:*.
 *
 * @param config - Advanced SEO configuration with branding and content details
 * @returns An object of AI meta tag key-value pairs
 */
export declare const createAIMetaTags: (config: AdvancedSEOConfig) => {
    'ai:content-type': "guide" | "reference" | "tutorial" | "overview" | "feature";
    'ai:complexity': "intermediate" | "beginner" | "advanced";
    'ai:category': string;
    'ai:audience': string;
    'ai:keywords': string;
    'ai:reading-time': string;
    'web3:platform': string;
    'web3:networks': string;
    'web3:wallets': string;
    'web3:features': string;
    'llm:context': string;
    'llm:domain': string;
    'llm:use-case': string;
    'semantic:topic': string;
    'semantic:intent': string;
    'semantic:entities': string;
    'content:freshness': string;
    'content:authority': string;
    'content:expertise': string;
    'content:trustworthiness': string;
};
/**
 * All-in-one SEO generation function.
 *
 * Combines all schema generators, OpenGraph, Twitter Card, and AI meta tag
 * creators into a single output object.
 *
 * @param config - Advanced SEO configuration with branding and content details
 * @returns Object containing structuredData, openGraph, twitterCard, aiMetaTags, and jsonLD arrays
 */
export declare const generateAdvancedSEO: (config: AdvancedSEOConfig) => {
    structuredData: {
        product: {
            '@context': string;
            '@type': string;
            name: string;
            applicationCategory: string;
            operatingSystem: string;
            description: string;
            url: string;
            downloadUrl: string;
            installUrl: string;
            screenshot: string;
            aggregateRating: {
                '@type': string;
                ratingValue: string;
                reviewCount: string;
                bestRating: string;
                worstRating: string;
            };
            offers: ({
                '@type': string;
                name: string;
                description: string;
                price: string;
                priceCurrency: string;
                availability: string;
                billingIncrement?: undefined;
            } | {
                '@type': string;
                name: string;
                description: string;
                price: string;
                priceCurrency: string;
                billingIncrement: string;
                availability: string;
            })[];
            featureList: string[];
            applicationSubCategory: string;
            audience: {
                '@type': string;
                audienceType: string;
                geographicArea: string;
            };
            creator: {
                '@type': string;
                name: string;
                url: string;
            };
            datePublished: string;
            dateModified: string;
            version: string;
            softwareRequirements: string;
            storageRequirements: string;
            memoryRequirements: string;
            supportingData: {
                blockchainNetworks: string[];
                supportedWallets: string[];
                smartContractSupport: boolean;
                ensCompatible: boolean;
                snsCompatible: boolean;
            };
        };
        article: {
            '@context': string;
            '@type': string;
            headline: string;
            description: string;
            author: {
                '@type': string;
                name: string;
                url: string;
                logo: {
                    '@type': string;
                    url: string;
                };
            };
            publisher: {
                '@type': string;
                name: string;
                logo: {
                    '@type': string;
                    url: string;
                    width: number;
                    height: number;
                };
            };
            datePublished: string;
            dateModified: string;
            mainEntityOfPage: {
                '@type': string;
                '@id': string;
            };
            image: {
                '@type': string;
                url: string;
                width: number;
                height: number;
            };
            keywords: string;
            about: {
                '@type': string;
                name: string;
            }[];
            audience: {
                '@type': string;
                audienceType: string;
                educationalLevel: "intermediate" | "beginner" | "advanced";
            };
            educationalLevel: "intermediate" | "beginner" | "advanced";
            proficiencyLevel: "intermediate" | "beginner" | "advanced";
            learningResourceType: "guide" | "reference" | "tutorial" | "overview" | "feature";
            timeRequired: string;
            inLanguage: string;
            isAccessibleForFree: boolean;
            license: string;
            teaches: string[];
        };
        aiOptimized: {
            '@context': string;
            '@type': string;
            name: string;
            description: string;
            url: string;
            primaryImageOfPage: {
                '@type': string;
                url: string;
            };
            significantLink: string[];
            relatedLink: string[];
            about: {
                '@type': string;
                name: string;
                description: string;
                sameAs: string[];
            };
            mentions: {
                '@type': string;
                name: string;
            }[];
            isPartOf: {
                '@type': string;
                '@id': string;
                name: string;
            };
            potentialAction: {
                '@type': string;
                target: {
                    '@type': string;
                    urlTemplate: string;
                    actionPlatform: string[];
                };
                name: string;
            };
        };
    };
    openGraph: {
        'og:title': string;
        'og:description': string;
        'og:type': string;
        'og:url': string;
        'og:image': string;
        'og:image:width': string;
        'og:image:height': string;
        'og:image:alt': string;
        'og:site_name': string;
        'og:locale': string;
        'article:author': string;
        'article:section': string;
        'article:tag': string;
        'article:published_time': string;
        'article:modified_time': string;
    };
    twitterCard: {
        'twitter:card': string;
        'twitter:site': string;
        'twitter:creator': string;
        'twitter:title': string;
        'twitter:description': string;
        'twitter:image': string;
        'twitter:image:alt': string;
        'twitter:label1': string;
        'twitter:data1': string;
        'twitter:label2': string;
        'twitter:data2': string;
    };
    aiMetaTags: {
        'ai:content-type': "guide" | "reference" | "tutorial" | "overview" | "feature";
        'ai:complexity': "intermediate" | "beginner" | "advanced";
        'ai:category': string;
        'ai:audience': string;
        'ai:keywords': string;
        'ai:reading-time': string;
        'web3:platform': string;
        'web3:networks': string;
        'web3:wallets': string;
        'web3:features': string;
        'llm:context': string;
        'llm:domain': string;
        'llm:use-case': string;
        'semantic:topic': string;
        'semantic:intent': string;
        'semantic:entities': string;
        'content:freshness': string;
        'content:authority': string;
        'content:expertise': string;
        'content:trustworthiness': string;
    };
    jsonLD: ({
        '@context': string;
        '@type': string;
        name: string;
        applicationCategory: string;
        operatingSystem: string;
        description: string;
        url: string;
        downloadUrl: string;
        installUrl: string;
        screenshot: string;
        aggregateRating: {
            '@type': string;
            ratingValue: string;
            reviewCount: string;
            bestRating: string;
            worstRating: string;
        };
        offers: ({
            '@type': string;
            name: string;
            description: string;
            price: string;
            priceCurrency: string;
            availability: string;
            billingIncrement?: undefined;
        } | {
            '@type': string;
            name: string;
            description: string;
            price: string;
            priceCurrency: string;
            billingIncrement: string;
            availability: string;
        })[];
        featureList: string[];
        applicationSubCategory: string;
        audience: {
            '@type': string;
            audienceType: string;
            geographicArea: string;
        };
        creator: {
            '@type': string;
            name: string;
            url: string;
        };
        datePublished: string;
        dateModified: string;
        version: string;
        softwareRequirements: string;
        storageRequirements: string;
        memoryRequirements: string;
        supportingData: {
            blockchainNetworks: string[];
            supportedWallets: string[];
            smartContractSupport: boolean;
            ensCompatible: boolean;
            snsCompatible: boolean;
        };
    } | {
        '@context': string;
        '@type': string;
        headline: string;
        description: string;
        author: {
            '@type': string;
            name: string;
            url: string;
            logo: {
                '@type': string;
                url: string;
            };
        };
        publisher: {
            '@type': string;
            name: string;
            logo: {
                '@type': string;
                url: string;
                width: number;
                height: number;
            };
        };
        datePublished: string;
        dateModified: string;
        mainEntityOfPage: {
            '@type': string;
            '@id': string;
        };
        image: {
            '@type': string;
            url: string;
            width: number;
            height: number;
        };
        keywords: string;
        about: {
            '@type': string;
            name: string;
        }[];
        audience: {
            '@type': string;
            audienceType: string;
            educationalLevel: "intermediate" | "beginner" | "advanced";
        };
        educationalLevel: "intermediate" | "beginner" | "advanced";
        proficiencyLevel: "intermediate" | "beginner" | "advanced";
        learningResourceType: "guide" | "reference" | "tutorial" | "overview" | "feature";
        timeRequired: string;
        inLanguage: string;
        isAccessibleForFree: boolean;
        license: string;
        teaches: string[];
    } | {
        '@context': string;
        '@type': string;
        name: string;
        description: string;
        url: string;
        primaryImageOfPage: {
            '@type': string;
            url: string;
        };
        significantLink: string[];
        relatedLink: string[];
        about: {
            '@type': string;
            name: string;
            description: string;
            sameAs: string[];
        };
        mentions: {
            '@type': string;
            name: string;
        }[];
        isPartOf: {
            '@type': string;
            '@id': string;
            name: string;
        };
        potentialAction: {
            '@type': string;
            target: {
                '@type': string;
                urlTemplate: string;
                actionPlatform: string[];
            };
            name: string;
        };
    })[];
};
export declare const pageSEOConfigs: {
    homepage: {
        title: string;
        description: string;
        keywords: string[];
        category: string;
        audience: string[];
        complexity: "beginner";
        contentType: "overview";
        readingTime: number;
        relatedTopics: string[];
    };
    documentation: {
        title: string;
        description: string;
        keywords: string[];
        category: string;
        audience: string[];
        complexity: "intermediate";
        contentType: "guide";
        readingTime: number;
        relatedTopics: string[];
    };
    earnPoints: {
        title: string;
        description: string;
        keywords: string[];
        category: string;
        audience: string[];
        complexity: "beginner";
        contentType: "tutorial";
        readingTime: number;
        relatedTopics: string[];
    };
};
declare const _default: {
    generateAdvancedSEO: (config: AdvancedSEOConfig) => {
        structuredData: {
            product: {
                '@context': string;
                '@type': string;
                name: string;
                applicationCategory: string;
                operatingSystem: string;
                description: string;
                url: string;
                downloadUrl: string;
                installUrl: string;
                screenshot: string;
                aggregateRating: {
                    '@type': string;
                    ratingValue: string;
                    reviewCount: string;
                    bestRating: string;
                    worstRating: string;
                };
                offers: ({
                    '@type': string;
                    name: string;
                    description: string;
                    price: string;
                    priceCurrency: string;
                    availability: string;
                    billingIncrement?: undefined;
                } | {
                    '@type': string;
                    name: string;
                    description: string;
                    price: string;
                    priceCurrency: string;
                    billingIncrement: string;
                    availability: string;
                })[];
                featureList: string[];
                applicationSubCategory: string;
                audience: {
                    '@type': string;
                    audienceType: string;
                    geographicArea: string;
                };
                creator: {
                    '@type': string;
                    name: string;
                    url: string;
                };
                datePublished: string;
                dateModified: string;
                version: string;
                softwareRequirements: string;
                storageRequirements: string;
                memoryRequirements: string;
                supportingData: {
                    blockchainNetworks: string[];
                    supportedWallets: string[];
                    smartContractSupport: boolean;
                    ensCompatible: boolean;
                    snsCompatible: boolean;
                };
            };
            article: {
                '@context': string;
                '@type': string;
                headline: string;
                description: string;
                author: {
                    '@type': string;
                    name: string;
                    url: string;
                    logo: {
                        '@type': string;
                        url: string;
                    };
                };
                publisher: {
                    '@type': string;
                    name: string;
                    logo: {
                        '@type': string;
                        url: string;
                        width: number;
                        height: number;
                    };
                };
                datePublished: string;
                dateModified: string;
                mainEntityOfPage: {
                    '@type': string;
                    '@id': string;
                };
                image: {
                    '@type': string;
                    url: string;
                    width: number;
                    height: number;
                };
                keywords: string;
                about: {
                    '@type': string;
                    name: string;
                }[];
                audience: {
                    '@type': string;
                    audienceType: string;
                    educationalLevel: "intermediate" | "beginner" | "advanced";
                };
                educationalLevel: "intermediate" | "beginner" | "advanced";
                proficiencyLevel: "intermediate" | "beginner" | "advanced";
                learningResourceType: "guide" | "reference" | "tutorial" | "overview" | "feature";
                timeRequired: string;
                inLanguage: string;
                isAccessibleForFree: boolean;
                license: string;
                teaches: string[];
            };
            aiOptimized: {
                '@context': string;
                '@type': string;
                name: string;
                description: string;
                url: string;
                primaryImageOfPage: {
                    '@type': string;
                    url: string;
                };
                significantLink: string[];
                relatedLink: string[];
                about: {
                    '@type': string;
                    name: string;
                    description: string;
                    sameAs: string[];
                };
                mentions: {
                    '@type': string;
                    name: string;
                }[];
                isPartOf: {
                    '@type': string;
                    '@id': string;
                    name: string;
                };
                potentialAction: {
                    '@type': string;
                    target: {
                        '@type': string;
                        urlTemplate: string;
                        actionPlatform: string[];
                    };
                    name: string;
                };
            };
        };
        openGraph: {
            'og:title': string;
            'og:description': string;
            'og:type': string;
            'og:url': string;
            'og:image': string;
            'og:image:width': string;
            'og:image:height': string;
            'og:image:alt': string;
            'og:site_name': string;
            'og:locale': string;
            'article:author': string;
            'article:section': string;
            'article:tag': string;
            'article:published_time': string;
            'article:modified_time': string;
        };
        twitterCard: {
            'twitter:card': string;
            'twitter:site': string;
            'twitter:creator': string;
            'twitter:title': string;
            'twitter:description': string;
            'twitter:image': string;
            'twitter:image:alt': string;
            'twitter:label1': string;
            'twitter:data1': string;
            'twitter:label2': string;
            'twitter:data2': string;
        };
        aiMetaTags: {
            'ai:content-type': "guide" | "reference" | "tutorial" | "overview" | "feature";
            'ai:complexity': "intermediate" | "beginner" | "advanced";
            'ai:category': string;
            'ai:audience': string;
            'ai:keywords': string;
            'ai:reading-time': string;
            'web3:platform': string;
            'web3:networks': string;
            'web3:wallets': string;
            'web3:features': string;
            'llm:context': string;
            'llm:domain': string;
            'llm:use-case': string;
            'semantic:topic': string;
            'semantic:intent': string;
            'semantic:entities': string;
            'content:freshness': string;
            'content:authority': string;
            'content:expertise': string;
            'content:trustworthiness': string;
        };
        jsonLD: ({
            '@context': string;
            '@type': string;
            name: string;
            applicationCategory: string;
            operatingSystem: string;
            description: string;
            url: string;
            downloadUrl: string;
            installUrl: string;
            screenshot: string;
            aggregateRating: {
                '@type': string;
                ratingValue: string;
                reviewCount: string;
                bestRating: string;
                worstRating: string;
            };
            offers: ({
                '@type': string;
                name: string;
                description: string;
                price: string;
                priceCurrency: string;
                availability: string;
                billingIncrement?: undefined;
            } | {
                '@type': string;
                name: string;
                description: string;
                price: string;
                priceCurrency: string;
                billingIncrement: string;
                availability: string;
            })[];
            featureList: string[];
            applicationSubCategory: string;
            audience: {
                '@type': string;
                audienceType: string;
                geographicArea: string;
            };
            creator: {
                '@type': string;
                name: string;
                url: string;
            };
            datePublished: string;
            dateModified: string;
            version: string;
            softwareRequirements: string;
            storageRequirements: string;
            memoryRequirements: string;
            supportingData: {
                blockchainNetworks: string[];
                supportedWallets: string[];
                smartContractSupport: boolean;
                ensCompatible: boolean;
                snsCompatible: boolean;
            };
        } | {
            '@context': string;
            '@type': string;
            headline: string;
            description: string;
            author: {
                '@type': string;
                name: string;
                url: string;
                logo: {
                    '@type': string;
                    url: string;
                };
            };
            publisher: {
                '@type': string;
                name: string;
                logo: {
                    '@type': string;
                    url: string;
                    width: number;
                    height: number;
                };
            };
            datePublished: string;
            dateModified: string;
            mainEntityOfPage: {
                '@type': string;
                '@id': string;
            };
            image: {
                '@type': string;
                url: string;
                width: number;
                height: number;
            };
            keywords: string;
            about: {
                '@type': string;
                name: string;
            }[];
            audience: {
                '@type': string;
                audienceType: string;
                educationalLevel: "intermediate" | "beginner" | "advanced";
            };
            educationalLevel: "intermediate" | "beginner" | "advanced";
            proficiencyLevel: "intermediate" | "beginner" | "advanced";
            learningResourceType: "guide" | "reference" | "tutorial" | "overview" | "feature";
            timeRequired: string;
            inLanguage: string;
            isAccessibleForFree: boolean;
            license: string;
            teaches: string[];
        } | {
            '@context': string;
            '@type': string;
            name: string;
            description: string;
            url: string;
            primaryImageOfPage: {
                '@type': string;
                url: string;
            };
            significantLink: string[];
            relatedLink: string[];
            about: {
                '@type': string;
                name: string;
                description: string;
                sameAs: string[];
            };
            mentions: {
                '@type': string;
                name: string;
            }[];
            isPartOf: {
                '@type': string;
                '@id': string;
                name: string;
            };
            potentialAction: {
                '@type': string;
                target: {
                    '@type': string;
                    urlTemplate: string;
                    actionPlatform: string[];
                };
                name: string;
            };
        })[];
    };
    createEnhancedFAQSchema: (faqs: Array<{
        question: string;
        answer: string;
        category?: string;
        upvoteCount?: number;
    }>, branding: AppBrandingConfig) => {
        '@context': string;
        '@type': string;
        mainEntity: {
            dateCreated: string;
            category: string;
            upvoteCount?: number | undefined;
            '@type': string;
            name: string;
            acceptedAnswer: {
                '@type': string;
                text: string;
                dateCreated: string;
                author: {
                    '@type': string;
                    name: string;
                };
            };
            answerCount: number;
        }[];
    };
    pageSEOConfigs: {
        homepage: {
            title: string;
            description: string;
            keywords: string[];
            category: string;
            audience: string[];
            complexity: "beginner";
            contentType: "overview";
            readingTime: number;
            relatedTopics: string[];
        };
        documentation: {
            title: string;
            description: string;
            keywords: string[];
            category: string;
            audience: string[];
            complexity: "intermediate";
            contentType: "guide";
            readingTime: number;
            relatedTopics: string[];
        };
        earnPoints: {
            title: string;
            description: string;
            keywords: string[];
            category: string;
            audience: string[];
            complexity: "beginner";
            contentType: "tutorial";
            readingTime: number;
            relatedTopics: string[];
        };
    };
};
export default _default;
