import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import Navbar from './components/Navbar';
import AppFooter from '../components/AppFooter';
import '../styles/global.css';
import '../styles/features.css';

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    skinTypes: string[];
    ingredients: string[];
    benefits: string[];
}

const products: Product[] = [
    {
        id: '1',
        name: 'Lavender Dream Soap',
        description: 'A gentle, calming soap made with pure lavender essential oil and natural ingredients.',
        image: '🌸',
        category: 'soap',
        skinTypes: ['sensitive', 'dry', 'normal'],
        ingredients: ['Olive Oil', 'Coconut Oil', 'Lavender Essential Oil', 'Shea Butter'],
        benefits: ['Calming', 'Moisturizing', 'Antibacterial']
    },
    {
        id: '2',
        name: 'Tea Tree Fresh Soap',
        description: 'Invigorating soap with tea tree oil for clear, healthy skin.',
        image: '🌿',
        category: 'soap',
        skinTypes: ['oily', 'acne-prone', 'combination'],
        ingredients: ['Olive Oil', 'Tea Tree Essential Oil', 'Activated Charcoal', 'Aloe Vera'],
        benefits: ['Antibacterial', 'Purifying', 'Oil Control']
    },
    {
        id: '3',
        name: 'Rose Garden Soap',
        description: 'Luxurious soap with rose petals and rose essential oil for delicate skin.',
        image: '🌹',
        category: 'soap',
        skinTypes: ['dry', 'mature', 'sensitive'],
        ingredients: ['Olive Oil', 'Rose Essential Oil', 'Rose Petals', 'Jojoba Oil'],
        benefits: ['Anti-aging', 'Hydrating', 'Soothing']
    },
    {
        id: '4',
        name: 'Citrus Burst Soap',
        description: 'Energizing soap with citrus essential oils for a refreshing experience.',
        image: '🍊',
        category: 'soap',
        skinTypes: ['normal', 'combination', 'oily'],
        ingredients: ['Olive Oil', 'Orange Essential Oil', 'Lemon Essential Oil', 'Grapefruit Essential Oil'],
        benefits: ['Energizing', 'Antioxidant', 'Brightening']
    }
];

const categories = ['all', 'soap', 'cream', 'shampoo', 'moisturizer'];
const skinTypes = ['all', 'dry', 'oily', 'combination', 'sensitive', 'normal', 'acne-prone', 'mature'];

const FeaturesPage: React.FC = () => {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const toggleSkinType = (skinType: string) => {
        if (skinType === 'all') {
            setSelectedSkinTypes([]);
            return;
        }

        setSelectedSkinTypes(prev =>
            prev.includes(skinType)
                ? prev.filter(type => type !== skinType)
                : [...prev, skinType]
        );
    };

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const skinTypeMatch = selectedSkinTypes.length === 0 ||
            selectedSkinTypes.some(type => product.skinTypes.includes(type));

        return categoryMatch && skinTypeMatch;
    });

    const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + selectedSkinTypes.length;

    return (
        <div className="artisan-page-futuristic">
            <SEO
                title="Natural Artisan Skincare Products - Handcrafted Beauty Solutions | Skin Studio"
                description="Discover our handcrafted natural skincare products. From gentle soaps to luxurious creams, each product is made with pure ingredients and tailored for different skin types."
                keywords="natural skincare products, artisan soap, handcrafted beauty, natural ingredients, organic skincare, handmade soap, natural beauty products, skin care solutions"
                url="/artisan"
            />

            <Navbar />

            <main className="artisan-main">
                <div className="container-futuristic">
                    <div className="artisan-header">
                        <h1 className="artisan-title">{t.artisan.title}</h1>
                        <p className="artisan-subtitle">
                            {t.artisan.subtitle}
                        </p>
                    </div>

                    <div className="filters-section">
                        <button
                            className="filters-toggle btn-minimal"
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        >
                            <span>{t.artisan.filters}</span>
                            {activeFiltersCount > 0 && (
                                <span className="filter-count">{activeFiltersCount}</span>
                            )}
                            <span className="toggle-icon">{isFiltersOpen ? '−' : '+'}</span>
                        </button>

                        {isFiltersOpen && (
                            <div className="filters-content glass-card">
                                <div className="filter-group">
                                    <h4>{t.artisan.category}</h4>
                                    <div className="filter-options">
                                        {categories.map(category => (
                                            <button
                                                key={category}
                                                className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                                                onClick={() => setSelectedCategory(category)}
                                            >
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter-group">
                                    <h4>{t.artisan.skinType}</h4>
                                    <div className="filter-options">
                                        {skinTypes.map(skinType => (
                                            <button
                                                key={skinType}
                                                className={`filter-chip ${selectedSkinTypes.includes(skinType) ? 'active' : ''}`}
                                                onClick={() => toggleSkinType(skinType)}
                                            >
                                                {skinType.charAt(0).toUpperCase() + skinType.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product-card glass-card">
                                <div className="product-image">
                                    <div className="image-placeholder">
                                        <span className="product-emoji">{product.image}</span>
                                    </div>
                                </div>

                                <div className="product-content">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>

                                    <div className="product-meta">
                                        <div className="product-tags">
                                            {product.skinTypes.map(type => (
                                                <span key={type} className="product-tag">{type}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="product-ingredients">
                                        <h4>Ingredients</h4>
                                        <div className="ingredients-list">
                                            {product.ingredients.map(ingredient => (
                                                <span key={ingredient} className="ingredient">{ingredient}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="product-benefits">
                                        <h4>Benefits</h4>
                                        <div className="benefits-list">
                                            {product.benefits.map(benefit => (
                                                <span key={benefit} className="benefit">{benefit}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="no-results">
                            <h3>{t.artisan.noProducts}</h3>
                            <p>{t.artisan.noProductsSubtitle}</p>
                        </div>
                    )}
                </div>
            </main>

            <AppFooter />
        </div>
    );
};

export default FeaturesPage; 