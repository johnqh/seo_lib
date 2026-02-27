import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
import React, { useId } from "react";
const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  noIndex = false,
  structuredData,
  twitterCard = "summary_large_image",
  twitterSite,
  config,
  meta = [],
  links = []
}) => {
  const {
    appName,
    baseUrl,
    defaultDescription,
    defaultOgImage,
    defaultTwitterSite
  } = config;
  const fullTitle = title ? `${title} | ${appName}` : appName;
  const metaDescription = description || defaultDescription;
  const metaOgImage = ogImage || defaultOgImage || `${baseUrl}/og-image.png`;
  const metaTwitterSite = twitterSite || defaultTwitterSite;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : void 0;
  const keywordsString = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  const structuredDataArray = structuredData ? Array.isArray(structuredData) ? structuredData : [structuredData] : [];
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "title", content: fullTitle }),
    metaDescription && /* @__PURE__ */ jsx("meta", { name: "description", content: metaDescription }),
    keywordsString && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywordsString }),
    noIndex && /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" }),
    canonicalUrl && /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    canonicalUrl && /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    metaDescription && /* @__PURE__ */ jsx("meta", { property: "og:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: metaOgImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: appName }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: twitterCard }),
    metaTwitterSite && /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: metaTwitterSite }),
    canonicalUrl && /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    metaDescription && /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: metaDescription }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: metaOgImage }),
    meta.map((tag, index) => /* @__PURE__ */ jsx("meta", { ...tag }, index)),
    links.map((link, index) => /* @__PURE__ */ jsx("link", { ...link }, index)),
    structuredDataArray.map((data, index) => /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(data) }, index))
  ] });
};
const AIMeta = ({
  contentType,
  aiSummary,
  technicalComplexity = "intermediate",
  blockchainNetworks,
  tokenSupported,
  walletRequired,
  useCase,
  targetAudience,
  integrations,
  features,
  dataFlow,
  businessValue,
  securityConsiderations,
  learningOutcomes
}) => {
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("meta", { name: "ai:content-type", content: contentType }),
    /* @__PURE__ */ jsx("meta", { name: "ai:summary", content: aiSummary }),
    /* @__PURE__ */ jsx("meta", { name: "ai:complexity", content: technicalComplexity }),
    blockchainNetworks && blockchainNetworks.length > 0 && /* @__PURE__ */ jsx(
      "meta",
      {
        name: "ai:blockchain-networks",
        content: blockchainNetworks.join(",")
      }
    ),
    tokenSupported != null && /* @__PURE__ */ jsx("meta", { name: "ai:token-support", content: String(tokenSupported) }),
    walletRequired != null && /* @__PURE__ */ jsx("meta", { name: "ai:wallet-requirements", content: String(walletRequired) }),
    useCase && useCase.length > 0 && /* @__PURE__ */ jsx("meta", { name: "ai:use-case", content: useCase.join(",") }),
    targetAudience && targetAudience.length > 0 && /* @__PURE__ */ jsx("meta", { name: "ai:audience", content: targetAudience.join(",") }),
    integrations && integrations.length > 0 && /* @__PURE__ */ jsx("meta", { name: "ai:integrations", content: integrations.join(",") }),
    features && features.length > 0 && /* @__PURE__ */ jsx("meta", { name: "ai:features", content: features.join(",") }),
    dataFlow && dataFlow.length > 0 && /* @__PURE__ */ jsx("meta", { name: "ai:data-flow", content: dataFlow.join(",") }),
    businessValue && businessValue.length > 0 && /* @__PURE__ */ jsx("meta", { name: "ai:business-value", content: businessValue.join(",") }),
    securityConsiderations && securityConsiderations.length > 0 && /* @__PURE__ */ jsx(
      "meta",
      {
        name: "ai:security-considerations",
        content: securityConsiderations.join(",")
      }
    ),
    learningOutcomes && learningOutcomes.length > 0 && /* @__PURE__ */ jsx(
      "meta",
      {
        name: "ai:learning-outcomes",
        content: learningOutcomes.join(",")
      }
    )
  ] });
};
const Main = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("main", { className, ...props, role: "main", children });
const Article = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("article", { className, ...props, children });
const Section = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("section", { className, ...props, children });
const Nav = ({ children, className, ...props }) => /* @__PURE__ */ jsx("nav", { className, ...props, role: "navigation", children });
const Header = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("header", { className, ...props, role: "banner", children });
const Footer = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("footer", { className, ...props, role: "contentinfo", children });
const Aside = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("aside", { className, ...props, role: "complementary", children });
const Figure = ({
  children,
  caption,
  className,
  ...props
}) => /* @__PURE__ */ jsxs("figure", { className, ...props, children: [
  children,
  caption && /* @__PURE__ */ jsx("figcaption", { children: caption })
] });
const H1 = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("h1", { className, ...props, children });
const H2 = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("h2", { className, ...props, children });
const H3 = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("h3", { className, ...props, children });
const H4 = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("h4", { className, ...props, children });
const OrderedList = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("ol", { className, ...props, children });
const UnorderedList = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("ul", { className, ...props, children });
const SemanticButton = ({
  children,
  className = "",
  variant = "primary",
  disabled,
  ...props
}) => {
  const baseClasses = "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: `${baseClasses} ${variantClasses[variant]} ${className}`,
      "aria-disabled": disabled,
      ...props,
      children
    }
  );
};
const SemanticLink = ({
  children,
  external,
  className = "",
  href,
  ...props
}) => {
  const linkProps = external ? {
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-describedby": "external-link-desc"
  } : {};
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "a",
      {
        className: `text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`,
        href,
        ...linkProps,
        ...props,
        children: [
          children,
          external && /* @__PURE__ */ jsx("span", { className: "sr-only", children: " (opens in new tab)" })
        ]
      }
    ),
    external && /* @__PURE__ */ jsx("span", { id: "external-link-desc", className: "sr-only", children: "External links open in a new tab" })
  ] });
};
const SkipLink = ({ href }) => /* @__PURE__ */ jsx(
  "a",
  {
    href,
    className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50",
    children: "Skip to main content"
  }
);
const SearchRegion = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("div", { role: "search", className, ...props, children });
const BannerRegion = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("div", { role: "banner", className, ...props, children });
const ComplementaryRegion = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("div", { role: "complementary", className, ...props, children });
const SemanticForm = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx("form", { className, ...props, children });
const SemanticInput = ({
  label,
  error,
  helpText,
  id,
  className = "",
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const errorId = error ? `${inputId}-error` : void 0;
  const helpId = helpText ? `${inputId}-help` : void 0;
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "block text-sm font-medium mb-2", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id: inputId,
        className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`,
        "aria-describedby": [helpId, errorId].filter(Boolean).join(" ") || void 0,
        "aria-invalid": error ? "true" : "false",
        ...props
      }
    ),
    helpText && /* @__PURE__ */ jsx("p", { id: helpId, className: "mt-1 text-sm text-gray-600", children: helpText }),
    error && /* @__PURE__ */ jsx("p", { id: errorId, className: "mt-1 text-sm text-red-600", role: "alert", children: error })
  ] });
};
const ScreenReaderOnly = ({
  children
}) => /* @__PURE__ */ jsx("span", { className: "sr-only", children });
const SemanticLoading = ({
  message = "Loading...",
  size = "md"
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: "flex items-center justify-center space-x-2",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: message })
      ]
    }
  );
};
const AITrainingEnhancer = ({
  children
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children });
};
const getCurrentPathname = (pathname) => {
  if (pathname) return pathname;
  if (typeof window !== "undefined" && window.location) {
    return window.location.pathname;
  }
  return "/";
};
const ensureArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string")
    return value.split(",").map((v) => v.trim()).filter(Boolean);
  return [];
};
const getBranding = (config) => {
  return {
    appName: config.appName,
    baseUrl: config.baseUrl,
    twitterHandle: config.twitterHandle || "",
    emailDomain: config.emailDomain || "example.com"
  };
};
const createWeb3ProductSchema = (config) => {
  const audienceArray = ensureArray(config.audience);
  const branding = getBranding(config.branding);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: branding.appName,
    applicationCategory: "CommunicationApplication",
    operatingSystem: "Web Browser",
    description: config.description,
    url: branding.baseUrl,
    downloadUrl: `${branding.baseUrl}/connect`,
    installUrl: `${branding.baseUrl}/connect`,
    screenshot: `${branding.baseUrl}/screenshots/app-preview.jpg`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2500",
      bestRating: "5",
      worstRating: "1"
    },
    offers: [
      {
        "@type": "Offer",
        name: "Free Web3 Email",
        description: "Basic wallet-based email with unlimited sending",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Premium Web3 Email",
        description: "Advanced features with ENS/SNS domains and priority support",
        price: "2.00",
        priceCurrency: "USD",
        billingIncrement: "month",
        availability: "https://schema.org/InStock"
      }
    ],
    featureList: [
      "Passwordless wallet authentication",
      "ENS domain email support (.eth)",
      "Solana Name Service support (.sol)",
      "Smart contract email integration",
      "Multi-chain wallet compatibility",
      "Cross-chain email addresses",
      "DAO email delegation",
      "Encrypted communication",
      "Web2/Web3 bridge functionality",
      "Point-based reward system"
    ],
    applicationSubCategory: "Web3 Email Platform",
    audience: {
      "@type": "Audience",
      audienceType: audienceArray.join(", "),
      geographicArea: "Worldwide"
    },
    creator: {
      "@type": "Organization",
      name: branding.appName,
      url: branding.baseUrl
    },
    datePublished: "2024-01-01",
    dateModified: config.lastUpdated?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
    version: "1.0",
    softwareRequirements: "Web3 Wallet (MetaMask, Phantom, etc.)",
    storageRequirements: "5MB",
    memoryRequirements: "512MB RAM",
    supportingData: {
      blockchainNetworks: [
        "Ethereum",
        "Solana",
        "Polygon",
        "Arbitrum",
        "Optimism"
      ],
      supportedWallets: [
        "MetaMask",
        "Phantom",
        "WalletConnect",
        "Coinbase Wallet"
      ],
      smartContractSupport: true,
      ensCompatible: true,
      snsCompatible: true
    }
  };
};
const createTechnicalArticleSchema = (config) => {
  const keywordsArray = ensureArray(config.keywords);
  const audienceArray = ensureArray(config.audience);
  const branding = getBranding(config.branding);
  const pathname = getCurrentPathname(config.pathname);
  return {
    "@context": "https://schema.org",
    "@type": "TechnicalArticle",
    headline: config.title,
    description: config.description,
    author: {
      "@type": "Organization",
      name: branding.appName,
      url: branding.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${branding.baseUrl}/logo.png`
      }
    },
    publisher: {
      "@type": "Organization",
      name: branding.appName,
      logo: {
        "@type": "ImageObject",
        url: `${branding.baseUrl}/logo.png`,
        width: 600,
        height: 600
      }
    },
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: config.lastUpdated?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${branding.baseUrl}${pathname}`
    },
    image: {
      "@type": "ImageObject",
      url: `${branding.baseUrl}/og-images/technical-guide.jpg`,
      width: 1200,
      height: 630
    },
    keywords: keywordsArray.join(", "),
    about: [
      {
        "@type": "Thing",
        name: "Web3 Email Platform"
      },
      {
        "@type": "Thing",
        name: "Blockchain Technology"
      },
      {
        "@type": "Thing",
        name: "Decentralized Communication"
      }
    ],
    audience: {
      "@type": "Audience",
      audienceType: audienceArray.join(", "),
      educationalLevel: config.complexity
    },
    educationalLevel: config.complexity,
    proficiencyLevel: config.complexity,
    learningResourceType: config.contentType,
    timeRequired: config.readingTime ? `PT${config.readingTime}M` : "PT5M",
    inLanguage: "en",
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    teaches: config.relatedTopics || [
      "Web3 email setup",
      "Wallet connection process",
      "Blockchain authentication",
      "Smart contract integration"
    ]
  };
};
const createEnhancedFAQSchema = (faqs, branding) => {
  const brandingConfig = getBranding(branding);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
        dateCreated: (/* @__PURE__ */ new Date()).toISOString(),
        author: {
          "@type": "Organization",
          name: brandingConfig.appName
        }
      },
      answerCount: 1,
      ...faq.upvoteCount != null && { upvoteCount: faq.upvoteCount },
      dateCreated: "2024-01-01T00:00:00Z",
      category: faq.category || "General"
    }))
  };
};
const createAIOptimizedSchema = (config) => {
  const branding = getBranding(config.branding);
  const pathname = getCurrentPathname(config.pathname);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    description: config.description,
    url: `${branding.baseUrl}${pathname}`,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${branding.baseUrl}/og-images/ai-optimized.jpg`
    },
    significantLink: [
      `${branding.baseUrl}/document`,
      `${branding.baseUrl}/web3-users`,
      `${branding.baseUrl}/web3-projects`,
      `${branding.baseUrl}/connect`
    ],
    relatedLink: config.relatedTopics?.map(
      (topic) => `${branding.baseUrl}/search?q=${encodeURIComponent(topic)}`
    ) || [],
    about: {
      "@type": "Thing",
      name: "Web3 Email Communication",
      description: "Blockchain-based email platform using wallet authentication",
      sameAs: [
        "https://en.wikipedia.org/wiki/Web3",
        "https://en.wikipedia.org/wiki/Blockchain",
        "https://en.wikipedia.org/wiki/Cryptocurrency_wallet"
      ]
    },
    mentions: [
      {
        "@type": "SoftwareApplication",
        name: "MetaMask"
      },
      {
        "@type": "SoftwareApplication",
        name: "Phantom Wallet"
      },
      {
        "@type": "Thing",
        name: "Ethereum Name Service"
      },
      {
        "@type": "Thing",
        name: "Solana Name Service"
      }
    ],
    isPartOf: {
      "@type": "WebSite",
      "@id": branding.baseUrl,
      name: branding.appName
    },
    potentialAction: {
      "@type": "InteractAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${branding.baseUrl}/connect`,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform"
        ]
      },
      name: "Connect Web3 Wallet"
    }
  };
};
const createEnhancedOpenGraph = (config) => {
  const keywordsArray = ensureArray(config.keywords);
  const branding = getBranding(config.branding);
  const pathname = getCurrentPathname(config.pathname);
  return {
    "og:title": config.title,
    "og:description": config.description,
    "og:type": "website",
    "og:url": `${branding.baseUrl}${pathname}`,
    "og:image": `${branding.baseUrl}/og-images/${config.category}.jpg`,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": `${config.title} - ${branding.appName}`,
    "og:site_name": branding.appName,
    "og:locale": "en_US",
    "article:author": `${branding.baseUrl}/about`,
    "article:section": config.category,
    "article:tag": keywordsArray.join(","),
    "article:published_time": "2024-01-01T00:00:00Z",
    "article:modified_time": config.lastUpdated?.toISOString() || (/* @__PURE__ */ new Date()).toISOString()
  };
};
const createEnhancedTwitterCard = (config) => {
  const branding = getBranding(config.branding);
  return {
    "twitter:card": "summary_large_image",
    "twitter:site": branding.twitterHandle || "",
    "twitter:creator": branding.twitterHandle || "",
    "twitter:title": config.title,
    "twitter:description": config.description,
    "twitter:image": `${branding.baseUrl}/twitter-cards/${config.category}.jpg`,
    "twitter:image:alt": `${config.title} - ${branding.appName}`,
    "twitter:label1": "Category",
    "twitter:data1": config.category,
    "twitter:label2": "Reading Time",
    "twitter:data2": config.readingTime ? `${config.readingTime} min` : "5 min"
  };
};
const createAIMetaTags = (config) => {
  const keywordsArray = ensureArray(config.keywords);
  const audienceArray = ensureArray(config.audience);
  const branding = getBranding(config.branding);
  return {
    // General AI optimization
    "ai:content-type": config.contentType,
    "ai:complexity": config.complexity,
    "ai:category": config.category,
    "ai:audience": audienceArray.join(","),
    "ai:keywords": keywordsArray.join(","),
    "ai:reading-time": config.readingTime?.toString() || "5",
    // Web3 specific
    "web3:platform": "Email",
    "web3:networks": "ethereum,solana,polygon",
    "web3:wallets": "metamask,phantom,walletconnect",
    "web3:features": "ens,sns,smart-contracts,multi-chain",
    // LLM context
    "llm:context": "Web3 email platform documentation and user guides",
    "llm:domain": "blockchain,cryptocurrency,decentralized-communication",
    "llm:use-case": "email,authentication,wallet-integration,smart-contracts",
    // Semantic markers
    "semantic:topic": config.category,
    "semantic:intent": "inform,guide,educate",
    "semantic:entities": `${branding.appName},Web3,blockchain,email,wallet`,
    // Content classification
    "content:freshness": config.lastUpdated?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
    "content:authority": "high",
    "content:expertise": "technical",
    "content:trustworthiness": "verified"
  };
};
const generateAdvancedSEO = (config) => ({
  structuredData: {
    product: createWeb3ProductSchema(config),
    article: createTechnicalArticleSchema(config),
    aiOptimized: createAIOptimizedSchema(config)
  },
  openGraph: createEnhancedOpenGraph(config),
  twitterCard: createEnhancedTwitterCard(config),
  aiMetaTags: createAIMetaTags(config),
  jsonLD: [
    createWeb3ProductSchema(config),
    createTechnicalArticleSchema(config),
    createAIOptimizedSchema(config)
  ]
});
const pageSEOConfigs = {
  homepage: {
    title: "Revolutionary Web3 Email Platform | Wallet-Based Authentication",
    description: "Transform your email experience - the first Web3 email platform using wallet authentication. No passwords, enhanced security, ENS/SNS domain support, and smart contract integration.",
    keywords: [
      "Web3 email",
      "blockchain email",
      "wallet authentication",
      "ENS email",
      "SNS email",
      "decentralized email",
      "smart contract integration"
    ],
    category: "Web3 Platform",
    audience: ["Crypto Users", "Web3 Developers", "DeFi Users", "DAO Members"],
    complexity: "beginner",
    contentType: "overview",
    readingTime: 3,
    relatedTopics: [
      "Web3 authentication",
      "Blockchain communication",
      "Decentralized identity"
    ]
  },
  documentation: {
    title: "Documentation - Complete Web3 Email Setup Guide",
    description: "Comprehensive documentation for Web3 email platform. Learn wallet connection, ENS/SNS setup, smart contract integration, and advanced features.",
    keywords: [
      "Web3 email guide",
      "wallet connection",
      "ENS setup",
      "SNS configuration",
      "smart contract email",
      "blockchain documentation"
    ],
    category: "Technical Documentation",
    audience: ["Developers", "Technical Users", "Web3 Enthusiasts"],
    complexity: "intermediate",
    contentType: "guide",
    readingTime: 15,
    relatedTopics: [
      "Wallet integration",
      "Blockchain protocols",
      "Email security"
    ]
  },
  earnPoints: {
    title: "How to Earn Points - Web3 Email Rewards Guide",
    description: "Master the points system. Earn rewards through email activities, referrals, smart contract interactions, and prepare for future token distribution.",
    keywords: [
      "Web3 rewards",
      "email points",
      "blockchain rewards",
      "referral program",
      "token preparation",
      "crypto incentives"
    ],
    category: "Rewards Guide",
    audience: ["Token Farmers", "Crypto Users", "Web3 Users"],
    complexity: "beginner",
    contentType: "tutorial",
    readingTime: 8,
    relatedTopics: ["Token economics", "Reward systems", "Referral marketing"]
  }
};
const createSemanticHeading = (config) => {
  const {
    level,
    text,
    className = "",
    id,
    semanticContext = "section"
  } = config;
  const tagName = `h${level}`;
  const seoClassMapping = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
    // Page titles
    2: "text-3xl md:text-4xl font-bold leading-tight",
    // Major sections
    3: "text-2xl md:text-3xl font-bold leading-tight",
    // Subsections
    4: "text-xl md:text-2xl font-semibold leading-tight",
    // Features/Benefits
    5: "text-lg md:text-xl font-semibold leading-tight",
    // Sub-features
    6: "text-base md:text-lg font-medium leading-tight"
    // Details
  };
  const contextualStyling = {
    "page-title": "text-gray-900 dark:text-white mb-6",
    section: "text-gray-900 dark:text-white mb-4",
    subsection: "text-gray-900 dark:text-white mb-3",
    feature: "text-gray-900 dark:text-white mb-2",
    benefit: "text-blue-600 dark:text-blue-400 mb-2",
    step: "text-green-600 dark:text-green-400 mb-2"
  };
  const finalClassName = [
    seoClassMapping[level],
    contextualStyling[semanticContext],
    className
  ].filter(Boolean).join(" ");
  const headingId = id || text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return React.createElement(
    tagName,
    {
      id: headingId,
      className: finalClassName,
      "aria-level": level
    },
    text
  );
};
const WEB3_HEADING_PATTERNS = {
  pageTitle: (text, className) => ({
    level: 1,
    text,
    className,
    semanticContext: "page-title"
  }),
  majorSection: (text, className) => ({
    level: 2,
    text,
    className,
    semanticContext: "section"
  }),
  feature: (text, className) => ({
    level: 3,
    text,
    className,
    semanticContext: "feature"
  }),
  benefit: (text, className) => ({
    level: 3,
    text,
    className,
    semanticContext: "benefit"
  }),
  step: (text, stepNumber, className) => ({
    level: 3,
    text: stepNumber ? `Step ${stepNumber}: ${text}` : text,
    className,
    semanticContext: "step"
  }),
  subFeature: (text, className) => ({
    level: 4,
    text,
    className,
    semanticContext: "feature"
  })
};
const validateHeadingStructure = (headings) => {
  const errors = [];
  const suggestions = [];
  const h1Count = headings.filter((h) => h.level === 1).length;
  if (h1Count === 0) {
    errors.push("Missing H1 tag - every page should have exactly one H1");
  } else if (h1Count > 1) {
    errors.push(
      `Multiple H1 tags found (${h1Count}) - use only one H1 per page`
    );
  }
  for (let i = 1; i < headings.length; i++) {
    const current = headings[i];
    const previous = headings[i - 1];
    if (current.level > previous.level + 1) {
      errors.push(
        `Heading level jump from H${previous.level} to H${current.level} - avoid skipping levels`
      );
    }
  }
  headings.forEach((heading, index) => {
    if (heading.text.length < 3) {
      errors.push(`Heading ${index + 1} is too short - use descriptive text`);
    }
    if (heading.text.length > 70) {
      suggestions.push(
        `Heading "${heading.text.substring(0, 30)}..." is long - consider shortening for better SEO`
      );
    }
  });
  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  };
};
const WEB3_EMAIL_HEADINGS = {
  walletConnection: WEB3_HEADING_PATTERNS.pageTitle("Connect Your Web3 Wallet"),
  emailBenefits: WEB3_HEADING_PATTERNS.majorSection("Why Choose Web3 Email?"),
  securityFeature: WEB3_HEADING_PATTERNS.feature("Secure & Private"),
  ensIntegration: WEB3_HEADING_PATTERNS.feature("ENS Domain Support"),
  multiChain: WEB3_HEADING_PATTERNS.feature("Multi-Chain Compatibility"),
  passwordless: WEB3_HEADING_PATTERNS.benefit("No Passwords Required"),
  setupStep1: WEB3_HEADING_PATTERNS.step("Connect Your Wallet", 1),
  setupStep2: WEB3_HEADING_PATTERNS.step("Verify Your Identity", 2),
  setupStep3: WEB3_HEADING_PATTERNS.step("Access Your Emails", 3)
};
const WEB3_CONCEPTS = [
  {
    term: "Web3 Email",
    definition: "Email system that uses blockchain wallet addresses as authentication instead of traditional passwords",
    category: "Web3 Communication",
    synonyms: ["blockchain email", "decentralized email", "crypto email"],
    relatedTerms: ["wallet authentication", "ENS email", "SNS email"],
    examples: ["vitalik.eth@example.com", "alice.sol@example.com"],
    context: "Web3 email revolutionizes digital communication by eliminating passwords and using cryptographic signatures for authentication"
  },
  {
    term: "Wallet Authentication",
    definition: "Authentication method using cryptographic signatures from blockchain wallets instead of passwords",
    category: "Security",
    synonyms: [
      "wallet-based auth",
      "signature authentication",
      "passwordless authentication"
    ],
    relatedTerms: ["EIP-712", "SIWE", "message signing"],
    examples: [
      "MetaMask signature",
      "Phantom wallet auth",
      "WalletConnect login"
    ],
    context: "Wallet authentication provides superior security through cryptographic proofs that cannot be phished or stolen like passwords"
  },
  {
    term: "ENS Email",
    definition: "Email addresses using Ethereum Name Service domains (.eth) as identifiers",
    category: "Naming Systems",
    synonyms: ["Ethereum name email", ".eth email"],
    relatedTerms: ["ENS", "Ethereum domains", "blockchain domains"],
    examples: ["vitalik.eth", "ethereum.eth"],
    context: "ENS emails provide human-readable addresses that resolve to Ethereum wallet addresses"
  },
  {
    term: "SNS Email",
    definition: "Email addresses using Solana Name Service domains (.sol) as identifiers",
    category: "Naming Systems",
    synonyms: ["Solana name email", ".sol email"],
    relatedTerms: ["SNS", "Solana domains", "SPL domains"],
    examples: ["anatoly.sol", "solana.sol"],
    context: "SNS emails provide human-readable addresses for Solana ecosystem users"
  },
  {
    term: "Smart Contract Integration",
    definition: "Ability to send and receive emails triggered by blockchain smart contract events",
    category: "Blockchain Integration",
    synonyms: ["contract notifications", "on-chain email triggers"],
    relatedTerms: ["event listeners", "webhooks", "contract automation"],
    examples: [
      "DAO proposal notifications",
      "DeFi alert emails",
      "NFT sale confirmations"
    ],
    context: "Smart contract integration enables automated communication based on blockchain events"
  },
  {
    term: "Multi-Chain Support",
    definition: "Compatibility with multiple blockchain networks for wallet authentication and email services",
    category: "Interoperability",
    synonyms: ["cross-chain support", "blockchain agnostic"],
    relatedTerms: ["EVM chains", "Solana", "Layer 2"],
    examples: ["Ethereum, Polygon, Arbitrum, Solana support"],
    context: "Multi-chain support ensures users from any blockchain ecosystem can use the email service"
  },
  {
    term: "DAO Email Delegation",
    definition: "System allowing DAOs to manage email communications through delegated authorities",
    category: "Governance",
    synonyms: ["governance email", "multi-sig email"],
    relatedTerms: ["DAO governance", "multi-signature", "delegation"],
    examples: ["Treasury notifications", "Proposal alerts", "Voting reminders"],
    context: "DAO email delegation enables decentralized organizations to manage communications efficiently"
  },
  {
    term: "Web2/Web3 Bridge",
    definition: "Technology enabling communication between traditional email systems and blockchain-based email",
    category: "Interoperability",
    synonyms: ["email bridge", "legacy integration"],
    relatedTerms: ["SMTP gateway", "email forwarding", "protocol bridge"],
    examples: ["Gmail to Web3 email", "Outlook integration"],
    context: "Web2/Web3 bridge ensures compatibility with existing email infrastructure"
  }
];
const generateAIMetadata = (config) => {
  return {
    // Semantic markup for AI understanding
    "@context": "https://schema.org",
    "@type": "LearningResource",
    educationalLevel: config.difficulty,
    learningResourceType: "Technical Documentation",
    timeRequired: config.estimatedTime ? `PT${config.estimatedTime}M` : void 0,
    teaches: config.learningObjectives,
    requires: config.prerequisites,
    about: {
      "@type": "Thing",
      name: config.domain,
      category: config.category,
      subcategory: config.subcategory
    },
    keywords: config.concepts,
    applicationExample: config.practicalApplications,
    isRelatedTo: config.relatedConcepts
  };
};
const generateConceptGraph = (concepts) => {
  const graph = {
    nodes: concepts.map((c) => ({
      id: c.term,
      label: c.term,
      category: c.category,
      definition: c.definition
    })),
    edges: []
  };
  concepts.forEach((concept) => {
    concept.relatedTerms?.forEach((related) => {
      const targetConcept = concepts.find((c) => c.term === related);
      if (targetConcept) {
        graph.edges.push({
          source: concept.term,
          target: related,
          relationship: "related_to"
        });
      }
    });
    concept.synonyms?.forEach((synonym) => {
      graph.edges.push({
        source: concept.term,
        target: synonym,
        relationship: "synonym_of"
      });
    });
  });
  return graph;
};
const generateTrainingExamples = (concept) => {
  const examples = [];
  concept.examples?.forEach((example) => {
    examples.push({
      text: example,
      label: concept.term,
      type: "positive",
      confidence: 1
    });
  });
  if (concept.context) {
    examples.push({
      text: concept.context,
      label: concept.term,
      type: "contextual",
      confidence: 0.8
    });
  }
  examples.push({
    text: `${concept.term} is ${concept.definition}`,
    label: concept.term,
    type: "definition",
    confidence: 1
  });
  return examples;
};
const generateQAPairs = (concepts) => {
  const qaPairs = [];
  concepts.forEach((concept) => {
    qaPairs.push({
      question: `What is ${concept.term}?`,
      answer: concept.definition,
      category: concept.category,
      difficulty: "basic"
    });
    if (concept.context) {
      qaPairs.push({
        question: `How does ${concept.term} work?`,
        answer: concept.context,
        category: concept.category,
        difficulty: "intermediate"
      });
    }
    if (concept.examples && concept.examples.length > 0) {
      qaPairs.push({
        question: `What are examples of ${concept.term}?`,
        answer: concept.examples.join(", "),
        category: concept.category,
        difficulty: "basic"
      });
    }
    if (concept.relatedTerms && concept.relatedTerms.length > 0) {
      qaPairs.push({
        question: `What is ${concept.term} related to?`,
        answer: `${concept.term} is related to ${concept.relatedTerms.join(", ")}`,
        category: concept.category,
        difficulty: "intermediate"
      });
    }
  });
  return qaPairs;
};
const AI_TRAINING_CONFIGS = {
  homepage: {
    domain: "Web3 Email Platform",
    category: "Web3 Communication",
    concepts: [
      "Web3 email",
      "wallet authentication",
      "passwordless login",
      "blockchain messaging"
    ],
    prerequisites: [
      "Basic blockchain knowledge",
      "Understanding of crypto wallets"
    ],
    learningObjectives: [
      "Understand Web3 email concepts",
      "Learn wallet authentication",
      "Explore blockchain communication"
    ],
    difficulty: "beginner",
    estimatedTime: 5,
    practicalApplications: [
      "Secure email communication",
      "DAO governance",
      "DeFi notifications"
    ]
  },
  documentation: {
    domain: "Web3 Email Technical Documentation",
    category: "Technical Guide",
    concepts: [
      "API integration",
      "smart contracts",
      "wallet connection",
      "email protocols"
    ],
    prerequisites: [
      "JavaScript/TypeScript",
      "Web3 development basics",
      "REST APIs"
    ],
    learningObjectives: [
      "Implement Web3 email",
      "Integrate wallet authentication",
      "Build on email API"
    ],
    difficulty: "intermediate",
    estimatedTime: 30,
    practicalApplications: [
      "dApp integration",
      "Email automation",
      "Smart contract notifications"
    ]
  },
  governance: {
    domain: "DAO Governance Communication",
    category: "Governance Tools",
    concepts: [
      "DAO email",
      "voting notifications",
      "proposal tracking",
      "multi-sig coordination"
    ],
    prerequisites: [
      "DAO basics",
      "Governance understanding",
      "Multi-signature wallets"
    ],
    learningObjectives: [
      "Setup DAO email",
      "Configure voting alerts",
      "Manage team communication"
    ],
    difficulty: "advanced",
    estimatedTime: 20,
    practicalApplications: [
      "DAO operations",
      "Treasury management",
      "Governance participation"
    ]
  }
};
export {
  AIMeta,
  AITrainingEnhancer,
  AI_TRAINING_CONFIGS,
  Article,
  Aside,
  BannerRegion,
  ComplementaryRegion,
  Figure,
  Footer,
  H1,
  H2,
  H3,
  H4,
  Header,
  Main,
  Nav,
  OrderedList,
  SEO,
  ScreenReaderOnly,
  SearchRegion,
  Section,
  SemanticButton,
  SemanticForm,
  SemanticInput,
  SemanticLink,
  SemanticLoading,
  SkipLink,
  UnorderedList,
  WEB3_CONCEPTS,
  WEB3_EMAIL_HEADINGS,
  WEB3_HEADING_PATTERNS,
  createAIMetaTags,
  createAIOptimizedSchema,
  createEnhancedFAQSchema,
  createEnhancedOpenGraph,
  createEnhancedTwitterCard,
  createSemanticHeading,
  createTechnicalArticleSchema,
  createWeb3ProductSchema,
  generateAIMetadata,
  generateAdvancedSEO,
  generateConceptGraph,
  generateQAPairs,
  generateTrainingExamples,
  pageSEOConfigs,
  validateHeadingStructure
};
//# sourceMappingURL=index.js.map
