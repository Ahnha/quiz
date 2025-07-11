import React from 'react';
import { Helmet } from 'react-helmet-async';

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

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:site_name" content="Skin Studio" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImageUrl} />

            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
};

export default SEO; 