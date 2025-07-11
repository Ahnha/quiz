import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import '../../styles/navbar.css';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { t } = useLanguage();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="navbar-futuristic">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="brand-logo">
                        <img
                            src="/logo.png"
                            alt="Skin Studio Logo"
                            className="logo-image"
                        />
                    </div>
                    <span className="brand-text">SKIN STUDIO</span>
                </Link>

                <nav className={`navbar-nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.nav.home}
                    </Link>
                    <Link
                        to="/quiz"
                        className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.nav.quiz}
                    </Link>
                    <Link
                        to="/artisan"
                        className={`nav-link ${isActive('/artisan') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.nav.artisan}
                    </Link>
                    <Link
                        to="/blog"
                        className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t.nav.blog}
                    </Link>
                </nav>

                <div className="navbar-actions">
                    <LanguageSwitcher />
                    <button
                        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
