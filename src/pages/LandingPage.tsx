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
                title="Skin Studio - Discover Your Perfect Natural Skincare Routine"
                description="Take our comprehensive skin type quiz to discover your perfect natural skincare routine. Get personalized recommendations for natural beauty products based on your skin concerns and lifestyle."
                keywords="skin type quiz, skincare quiz, natural skincare routine, skin analysis, beauty quiz, personalized skincare, skin concerns, natural beauty products, skincare recommendations"
                url="/"
            />

            <Navbar />

            <main className="hero-section">
                <div className="container-futuristic">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                {t.landing.hero.title.split(' ').slice(0, -2).join(' ')}
                                <span className="highlight"> {t.landing.hero.title.split(' ').slice(-2).join(' ')}</span>
                            </h1>
                            <p className="hero-subtitle">
                                {t.landing.hero.subtitle}
                            </p>
                            <div className="hero-actions">
                                <Link to="/quiz" className="btn-minimal primary">
                                    {t.landing.hero.startJourney}
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
                                        <div className="placeholder-icon animated-flower">🌸</div>
                                        <span className="placeholder-text">Natural Beauty</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AppFooter />
        </div>
    );
};

export default LandingPage;