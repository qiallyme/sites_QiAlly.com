/**
 * SEO & Meta Tag Utilities
 * Generates consistent meta tags, Open Graph, and JSON-LD structured data
 */

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateMetaTags(props: SEOProps) {
  const {
    title,
    description,
    canonical = 'https://qially.com',
    ogImage = 'https://qially.com/og-default.png',
    ogType = 'website',
    publishedTime,
    modifiedTime,
    author,
    tags = [],
  } = props;

  const fullTitle = title.includes('Qi Ally') ? title : `${title} | Qi Ally`;

  return {
    // Basic Meta
    title: fullTitle,
    description,
    
    // Canonical
    canonical,
    
    // Open Graph
    'og:title': fullTitle,
    'og:description': description,
    'og:url': canonical,
    'og:image': ogImage,
    'og:type': ogType,
    'og:site_name': 'Qi Ally',
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': fullTitle,
    'twitter:description': description,
    'twitter:image': ogImage,
    
    // Article-specific
    ...(ogType === 'article' && publishedTime && {
      'article:published_time': publishedTime,
    }),
    ...(ogType === 'article' && modifiedTime && {
      'article:modified_time': modifiedTime,
    }),
    ...(ogType === 'article' && author && {
      'article:author': author,
    }),
    ...(ogType === 'article' && tags.length && {
      'article:tag': tags.join(', '),
    }),
  };
}

export function generateBreadcrumbs(path: string) {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Home', url: 'https://qially.com' },
  ];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      url: `https://qially.com${currentPath}`,
    });
  });

  return breadcrumbs;
}

export function generateJSONLD(
  type: 'WebPage' | 'Article' | 'BlogPosting' | 'AboutPage' | 'ContactPage' | 'SupportPage' | 'CollectionPage' | 'Service' | 'Product' | 'WebApplication',
  data: any
) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  return JSON.stringify({ ...baseSchema, ...data });
}

