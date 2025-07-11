import React, { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    author?: string;
}

/**
 * SEO Component for dynamic meta tag management
 * 
 * PATTERN: Single Responsibility Principle
 * - Handles SEO meta tags for each page
 * - Provides consistent SEO structure
 * - Supports dynamic content
 * 
 * PATTERN: React 19 Compatibility
 * - Uses native DOM manipulation instead of react-helmet-async
 * - Manually manages document head elements
 * - Compatible with React 19 and future versions
 */
const SEO: React.FC<SEOProps> = ({
    title = 'Skin Studio - Natural Skincare Quiz & Personalized Beauty Recommendations',
    description = 'Reinterpretarea tradițiilor prin creații artizanale naturale, lucrate manual, care valorifică beneficiile 🌻plantelor medicinale🌹, pentru a evidenția frumusețea naturală și autentică. Discover your perfect natural skincare routine with our personalized quiz.',
    keywords = 'natural skincare, skin type quiz, personalized beauty, anti-aging products, natural beauty, skincare routine, dermatological products, organic skincare, beauty quiz, skin care recommendations, plante medicinale, creații artizanale',
    image = '/logo.png',
    url = 'https://skinstudio.app',
    type = 'website',
    author = 'Skin Studio'
}) => {
    const fullUrl = url.startsWith('http') ? url : `https://skinstudio.app${url}`;
    const fullImageUrl = image.startsWith('http') ? image : `https://skinstudio.app${image}`;

    useEffect(() => {
        // Update document title
        document.title = title;

        // Helper function to update or create meta tags
        const updateMetaTag = (name: string, content: string, property?: string) => {
            const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
            let metaTag = document.querySelector(selector) as HTMLMetaElement;

            if (!metaTag) {
                metaTag = document.createElement('meta');
                if (property) {
                    metaTag.setAttribute('property', property);
                } else {
                    metaTag.setAttribute('name', name);
                }
                document.head.appendChild(metaTag);
            }

            metaTag.setAttribute('content', content);
        };

        // Update primary meta tags
        updateMetaTag('title', title);
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);
        updateMetaTag('author', author);

        // Update Open Graph / Facebook meta tags
        updateMetaTag('og:type', type, 'og:type');
        updateMetaTag('og:url', fullUrl, 'og:url');
        updateMetaTag('og:title', title, 'og:title');
        updateMetaTag('og:description', description, 'og:description');
        updateMetaTag('og:image', fullImageUrl, 'og:image');
        updateMetaTag('og:site_name', 'Skin Studio', 'og:site_name');

        // Update Twitter meta tags
        updateMetaTag('twitter:card', 'summary_large_image', 'twitter:card');
        updateMetaTag('twitter:url', fullUrl, 'twitter:url');
        updateMetaTag('twitter:title', title, 'twitter:title');
        updateMetaTag('twitter:description', description, 'twitter:description');
        updateMetaTag('twitter:image', fullImageUrl, 'twitter:image');

        // Update canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', fullUrl);

        // Cleanup function to restore original title if needed
        return () => {
            // Optionally restore a default title when component unmounts
            // document.title = 'Skin Studio - Natural Skincare';
        };
    }, [title, description, keywords, fullUrl, fullImageUrl, type, author]);

    // This component doesn't render anything visible
    // It only manages the document head
    return null;
};

export default SEO; 