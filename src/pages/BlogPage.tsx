import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import Navbar from './components/Navbar';
import AppFooter from '../components/AppFooter';
import '../styles/global.css';
import '../styles/blog.css';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    image: string;
    category: string;
    readTime: string;
}

const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Art of Natural Skincare',
        excerpt: 'Discover the ancient wisdom behind natural skincare and how to incorporate it into your daily routine.',
        content: 'Natural skincare has been practiced for centuries, with cultures around the world developing their own unique approaches to maintaining healthy, radiant skin...',
        author: 'Sarah Johnson',
        date: '2024-01-15',
        image: '🌿',
        category: 'Skincare',
        readTime: '5 min read'
    },
    {
        id: '2',
        title: 'Understanding Your Skin Type',
        excerpt: 'Learn how to identify your skin type and choose the right products for your unique needs.',
        content: 'Every person\'s skin is unique, and understanding your specific skin type is the first step toward creating an effective skincare routine...',
        author: 'Dr. Maria Chen',
        date: '2024-01-10',
        image: '🔍',
        category: 'Education',
        readTime: '7 min read'
    },
    {
        id: '3',
        title: 'The Benefits of Handmade Soaps',
        excerpt: 'Explore why handmade soaps are superior to commercial alternatives and how they benefit your skin.',
        content: 'Handmade soaps offer numerous advantages over mass-produced commercial soaps, from their natural ingredients to their gentle cleansing properties...',
        author: 'Emma Rodriguez',
        date: '2024-01-05',
        image: '🧼',
        category: 'Products',
        readTime: '4 min read'
    },
    {
        id: '4',
        title: 'Seasonal Skincare: Winter Edition',
        excerpt: 'Adapt your skincare routine for the cold winter months and keep your skin healthy and hydrated.',
        content: 'Winter weather can be harsh on your skin, causing dryness, irritation, and other issues. Here\'s how to protect and nourish your skin during the coldest months...',
        author: 'Lisa Thompson',
        date: '2023-12-28',
        image: '❄️',
        category: 'Seasonal',
        readTime: '6 min read'
    },
    {
        id: '5',
        title: 'Essential Oils in Skincare',
        excerpt: 'A comprehensive guide to using essential oils safely and effectively in your skincare routine.',
        content: 'Essential oils have been used in skincare for thousands of years, offering natural solutions for various skin concerns...',
        author: 'Dr. James Wilson',
        date: '2023-12-20',
        image: '🌸',
        category: 'Natural',
        readTime: '8 min read'
    },
    {
        id: '6',
        title: 'Creating a Sustainable Beauty Routine',
        excerpt: 'Learn how to build an eco-friendly skincare routine that\'s good for your skin and the planet.',
        content: 'Sustainability in beauty is more important than ever. Discover how to create a skincare routine that benefits both your skin and the environment...',
        author: 'Green Beauty Collective',
        date: '2023-12-15',
        image: '🌱',
        category: 'Sustainability',
        readTime: '9 min read'
    }
];

const BlogPage: React.FC = () => {
    const { t } = useLanguage();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="blog-page-futuristic">
            <SEO
                title="Natural Skincare Blog - Expert Beauty Tips & Skincare Advice | Skin Studio"
                description="Discover expert skincare tips, natural beauty advice, and in-depth articles about natural skincare. Learn about skin types, ingredients, and sustainable beauty practices."
                keywords="skincare blog, natural beauty tips, skincare advice, beauty articles, natural skincare, skin care tips, beauty blog, skincare education, natural ingredients, beauty routine"
                url="/blog"
            />

            <Navbar />

            <main className="blog-main">
                <div className="container-futuristic">
                    <div className="blog-header">
                        <h1 className="blog-title">{t.blog.title}</h1>
                        <p className="blog-subtitle">
                            {t.blog.subtitle}
                        </p>
                    </div>

                    <div className="blog-grid">
                        {blogPosts.map(post => (
                            <article key={post.id} className="blog-card glass-card">
                                <div className="blog-image">
                                    <div className="image-placeholder">
                                        <span className="blog-emoji">{post.image}</span>
                                    </div>
                                    <div className="blog-category">{post.category}</div>
                                </div>

                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <span className="blog-date">{formatDate(post.date)}</span>
                                        <span className="blog-read-time">{post.readTime}</span>
                                    </div>

                                    <h2 className="blog-post-title">{post.title}</h2>
                                    <p className="blog-excerpt">{post.excerpt}</p>

                                    <div className="blog-author">
                                        <span>{t.blog.by} {post.author}</span>
                                    </div>

                                    <button className="btn-minimal">
                                        {t.blog.readMore}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="blog-newsletter">
                        <div className="newsletter-content glass-card">
                            <h2>{t.blog.newsletter.title}</h2>
                            <p>{t.blog.newsletter.subtitle}</p>
                            <div className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder={t.blog.newsletter.placeholder}
                                    className="newsletter-input"
                                />
                                <button className="btn-minimal primary">
                                    {t.blog.newsletter.subscribe}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AppFooter />
        </div>
    );
};

export default BlogPage; 