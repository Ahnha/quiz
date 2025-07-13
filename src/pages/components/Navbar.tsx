import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ThemeToggle from '../../components/ThemeToggle';
import '../../styles/navbar.css';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { t } = useLanguage();
    const menuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    const isActive = (path: string) => location.pathname === path;

    // Close menu when location changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Handle clicks outside the menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="navbar-futuristic">
            <div className="navbar-container">
                <div className="navbar-left">
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
                    <ThemeToggle />
                </div>

                <nav
                    ref={menuRef}
                    className={`navbar-nav ${isMenuOpen ? 'nav-open' : ''}`}
                >
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
                </nav>

                <div className="navbar-actions">
                    <LanguageSwitcher />
                    <button
                        ref={hamburgerRef}
                        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Backdrop overlay for mobile menu */}
            {isMenuOpen && (
                <div
                    className="menu-backdrop"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Navbar;
