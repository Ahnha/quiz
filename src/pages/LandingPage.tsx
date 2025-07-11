import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import Navbar from './components/Navbar';
import AppFooter from '../components/AppFooter';
import '../styles/global.css';
import '../styles/landing.css';

const LandingPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="landing-futuristic">
            <SEO
                title="Skin Studio - Natural Skincare Quiz & Personalized Beauty Recommendations"
                description="Reinterpretarea tradițiilor prin creații artizanale naturale, lucrate manual, care valorifică beneficiile 🌻plantelor medicinale🌹, pentru a evidenția frumusețea naturală și autentică. Discover your perfect natural skincare routine with our personalized quiz."
                keywords="natural skincare, skin type quiz, personalized beauty, anti-aging products, natural beauty, skincare routine, dermatological products, organic skincare, beauty quiz, skin care recommendations, plante medicinale, creații artizanale"
                url="/"
            />

            <Navbar />

            <main className="hero-section">
                <div className="container-futuristic">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                {t.landing.hero.title.split(' ').slice(0, 2).join(' ')}
                                <span className="highlight"> {t.landing.hero.title.split(' ').slice(2).join(' ')}</span>
                            </h1>
                            <p className="hero-subtitle">
                                {t.landing.hero.subtitle}
                            </p>
                            <div className="hero-actions">
                                <Link to="/quiz" className="btn-minimal primary">
                                    {t.landing.hero.startJourney}
                                </Link>
                                <Link to="/artisan" className="btn-minimal">
                                    {t.landing.hero.exploreProducts}
                                </Link>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="floating-elements">
                                <div className="floating-circle circle-1"></div>
                                <div className="floating-circle circle-2"></div>
                                <div className="floating-circle circle-3"></div>
                            </div>
                            <div className="hero-image">
                                <div className="image-placeholder">
                                    <div className="placeholder-content">
                                        <div className="placeholder-icon">🌸</div>
                                        <span>Natural Beauty</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <section className="features-section section-minimal">
                <div className="container-futuristic">
                    <div className="section-header">
                        <h2 className="section-title">{t.landing.features.title}</h2>
                        <p className="section-subtitle">
                            {t.landing.features.subtitle}
                        </p>
                    </div>

                    <div className="grid-futuristic cols-3">
                        <div className="feature-card glass-card">
                            <div className="feature-icon">
                                <div className="icon-circle">🌿</div>
                            </div>
                            <h3>{t.landing.features.natural.title}</h3>
                            <p>{t.landing.features.natural.description}</p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-icon">
                                <div className="icon-circle">✨</div>
                            </div>
                            <h3>{t.landing.features.handcrafted.title}</h3>
                            <p>{t.landing.features.handcrafted.description}</p>
                        </div>

                        <div className="feature-card glass-card">
                            <div className="feature-icon">
                                <div className="icon-circle">💚</div>
                            </div>
                            <h3>{t.landing.features.personalized.title}</h3>
                            <p>{t.landing.features.personalized.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section section-minimal small">
                <div className="container-futuristic">
                    <div className="cta-content glass-card">
                        <h2>{t.landing.cta.title}</h2>
                        <p>{t.landing.cta.subtitle}</p>
                        <Link to="/quiz" className="btn-minimal primary">
                            {t.landing.cta.button}
                        </Link>
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
};

export default LandingPage;