import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/footer.css';

const AppFooter: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="footer-futuristic">
            <div className="container-futuristic">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Skin Studio</h3>
                        <p>{t.footer.description}</p>
                        <div className="social-links">
                            <a
                                href="https://www.facebook.com/skin.studio.the/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Follow us on Facebook"
                            >
                                📘 Facebook
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>{t.footer.quickLinks}</h4>
                        <ul>
                            <li><Link to="/">{t.nav.home}</Link></li>
                            <li><Link to="/quiz">{t.nav.quiz}</Link></li>
                            <li><Link to="/artisan">{t.nav.artisan}</Link></li>
                            <li><Link to="/blog">{t.nav.blog}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>{t.footer.legal}</h4>
                        <ul>
                            <li><Link to="/privacy-policy">{t.footer.privacyPolicy}</Link></li>
                            <li><Link to="/terms">{t.footer.termsOfService}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>{t.footer.contact}</h4>
                        <p>{t.footer.email}</p>
                        <p>{t.footer.phone}</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Skin Studio. {t.footer.rightsReserved}</p>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter; 