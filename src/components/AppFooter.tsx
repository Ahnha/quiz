import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import FacebookIcon from '@mui/icons-material/Facebook';
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
                    </div>

                    <div className="footer-section">
                        <h4>{t.footer.quickLinks}</h4>
                        <ul>
                            <li><Link to="/">{t.nav.home}</Link></li>
                            <li><Link to="/quiz">{t.nav.quiz}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>{t.footer.legal}</h4>
                        <ul>
                            <li><Link to="/privacy-policy">{t.footer.privacyPolicy}</Link></li>
                            <li><Link to="/terms-of-service">{t.footer.termsOfService}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>{t.footer.contact}</h4>
                        <p className="contact-info">
                            {t.footer.connectWithUs}
                        </p>
                        <div className="contact-social">
                            <a
                                href="https://www.facebook.com/skin.studio.the/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-link"
                                aria-label="Contact us on Facebook"
                            >
                                <FacebookIcon className="contact-icon" />
                                <span>Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{t.footer.rightsReserved}</p>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter; 