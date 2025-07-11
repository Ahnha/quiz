import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ErrorLogger } from '../config/security';
import { gdprManager } from '../utils/gdprManager';
import '../styles/gdprConsent.css';

/**
 * GDPR Consent Component
 * 
 * PATTERN: Single Responsibility Principle
 * - Handles GDPR consent management
 * - Manages cookie preferences
 * - Stores consent data securely
 * 
 * PATTERN: Security First
 * - Secure localStorage operations
 * - Input validation and sanitization
 * - Error handling and logging
 */
const GDPRConsent: React.FC = () => {
    const { t, language } = useLanguage();
    const [showConsent, setShowConsent] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [consentPreferences, setConsentPreferences] = useState({
        necessary: true, // Always true, cannot be disabled
        analytics: false,
        marketing: false,
        thirdParty: false
    });

    // Check if consent has been given
    useEffect(() => {
        const hasConsent = gdprManager.hasConsent();
        const needsRenewal = gdprManager.needsRenewal();

        if (!hasConsent || needsRenewal) {
            setShowConsent(true);

            // Load existing preferences if available
            const existingConsent = gdprManager.getConsent();
            if (existingConsent) {
                setConsentPreferences({
                    necessary: existingConsent.necessary,
                    analytics: existingConsent.analytics,
                    marketing: existingConsent.marketing,
                    thirdParty: existingConsent.thirdParty
                });
            }
        }
    }, []);

    // Handle consent acceptance
    const handleAcceptAll = () => {
        const success = gdprManager.saveConsent({
            necessary: true,
            analytics: true,
            marketing: true,
            thirdParty: true,
            language: language
        });

        if (success) {
            setShowConsent(false);
            ErrorLogger.log(new Error('GDPR Consent: All accepted'), 'GDPR Consent');
        } else {
            ErrorLogger.log(new Error('GDPR Consent: Failed to save all consent'), 'GDPR Consent');
        }
    };

    // Handle necessary only acceptance
    const handleAcceptNecessary = () => {
        const success = gdprManager.saveConsent({
            necessary: true,
            analytics: false,
            marketing: false,
            thirdParty: false,
            language: language
        });

        if (success) {
            setShowConsent(false);
            ErrorLogger.log(new Error('GDPR Consent: Necessary only'), 'GDPR Consent');
        } else {
            ErrorLogger.log(new Error('GDPR Consent: Failed to save necessary consent'), 'GDPR Consent');
        }
    };

    // Handle rejection of all non-necessary cookies
    const handleRejectAll = () => {
        const success = gdprManager.saveConsent({
            necessary: true,
            analytics: false,
            marketing: false,
            thirdParty: false,
            language: language
        });

        if (success) {
            setShowConsent(false);
            ErrorLogger.log(new Error('GDPR Consent: All rejected'), 'GDPR Consent');
        } else {
            ErrorLogger.log(new Error('GDPR Consent: Failed to save rejection'), 'GDPR Consent');
        }
    };

    // Handle custom preferences
    const handleSavePreferences = () => {
        const success = gdprManager.saveConsent({
            ...consentPreferences,
            language: language
        });

        if (success) {
            setShowConsent(false);
            ErrorLogger.log(new Error('GDPR Consent: Custom preferences saved'), 'GDPR Consent');
        } else {
            ErrorLogger.log(new Error('GDPR Consent: Failed to save custom preferences'), 'GDPR Consent');
        }
    };

    // Handle preference change
    const handlePreferenceChange = (type: keyof typeof consentPreferences) => {
        if (type === 'necessary') return; // Cannot disable necessary cookies

        setConsentPreferences(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    // Handle privacy policy link
    const handlePrivacyPolicy = () => {
        // In a real app, this would navigate to privacy policy page
        window.open('/privacy-policy', '_blank');
    };

    // Handle cookie policy link
    const handleCookiePolicy = () => {
        // In a real app, this would navigate to cookie policy page
        window.open('/cookie-policy', '_blank');
    };

    // Handle consent data export (GDPR right to data portability)
    const handleExportData = () => {
        const consentData = gdprManager.exportConsentData();
        if (consentData) {
            const blob = new Blob([consentData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `gdpr-consent-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    if (!showConsent) {
        return null;
    }

    return (
        <div className="gdpr-consent-overlay">
            <div className="gdpr-consent-modal glass-card">
                <div className="gdpr-header">
                    <h2>{t.gdpr?.title}</h2>
                    <p className="gdpr-subtitle">{t.gdpr?.subtitle}</p>
                </div>

                <div className="gdpr-content">
                    <p className="gdpr-description">{t.gdpr?.description}</p>

                    {showDetails && (
                        <div className="gdpr-preferences">
                            {/* Necessary Cookies - Always enabled */}
                            <div className="preference-item necessary">
                                <div className="preference-header">
                                    <label className="preference-label">
                                        <input
                                            type="checkbox"
                                            checked={consentPreferences.necessary}
                                            disabled
                                            className="preference-checkbox"
                                        />
                                        <span className="checkbox-custom"></span>
                                        <div className="preference-info">
                                            <h4>{t.gdpr?.necessary?.title}</h4>
                                            <span className="always-active">{t.gdpr?.necessary?.alwaysActive}</span>
                                        </div>
                                    </label>
                                </div>
                                <p className="preference-description">
                                    {t.gdpr?.necessary?.description}
                                </p>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="preference-item">
                                <div className="preference-header">
                                    <label className="preference-label">
                                        <input
                                            type="checkbox"
                                            checked={consentPreferences.analytics}
                                            onChange={() => handlePreferenceChange('analytics')}
                                            className="preference-checkbox"
                                        />
                                        <span className="checkbox-custom"></span>
                                        <div className="preference-info">
                                            <h4>{t.gdpr?.analytics?.title}</h4>
                                            <span className="purpose">{t.gdpr?.analytics?.purpose}</span>
                                        </div>
                                    </label>
                                </div>
                                <p className="preference-description">
                                    {t.gdpr?.analytics?.description}
                                </p>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="preference-item">
                                <div className="preference-header">
                                    <label className="preference-label">
                                        <input
                                            type="checkbox"
                                            checked={consentPreferences.marketing}
                                            onChange={() => handlePreferenceChange('marketing')}
                                            className="preference-checkbox"
                                        />
                                        <span className="checkbox-custom"></span>
                                        <div className="preference-info">
                                            <h4>{t.gdpr?.marketing?.title}</h4>
                                            <span className="purpose">{t.gdpr?.marketing?.purpose}</span>
                                        </div>
                                    </label>
                                </div>
                                <p className="preference-description">
                                    {t.gdpr?.marketing?.description}
                                </p>
                            </div>

                            {/* Third Party Cookies */}
                            <div className="preference-item">
                                <div className="preference-header">
                                    <label className="preference-label">
                                        <input
                                            type="checkbox"
                                            checked={consentPreferences.thirdParty}
                                            onChange={() => handlePreferenceChange('thirdParty')}
                                            className="preference-checkbox"
                                        />
                                        <span className="checkbox-custom"></span>
                                        <div className="preference-info">
                                            <h4>{t.gdpr?.thirdParty?.title}</h4>
                                            <span className="purpose">{t.gdpr?.thirdParty?.purpose}</span>
                                        </div>
                                    </label>
                                </div>
                                <p className="preference-description">
                                    {t.gdpr?.thirdParty?.description}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="gdpr-links">
                        <button
                            type="button"
                            className="link-button"
                            onClick={handlePrivacyPolicy}
                        >
                            {t.gdpr?.privacyPolicy}
                        </button>
                        <button
                            type="button"
                            className="link-button"
                            onClick={handleCookiePolicy}
                        >
                            {t.gdpr?.cookiePolicy}
                        </button>
                        <button
                            type="button"
                            className="link-button"
                            onClick={handleExportData}
                        >
                            Export My Data
                        </button>
                    </div>
                </div>

                <div className="gdpr-actions">
                    {!showDetails ? (
                        <>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setShowDetails(true)}
                            >
                                {t.gdpr?.learnMore}
                            </button>
                            <div className="action-buttons">
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={handleAcceptAll}
                                >
                                    {t.gdpr?.acceptAll}
                                </button>
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={handleAcceptNecessary}
                                >
                                    {t.gdpr?.acceptNecessary}
                                </button>
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={handleRejectAll}
                                >
                                    {t.gdpr?.rejectAll}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="action-buttons">
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setShowDetails(false)}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={handleSavePreferences}
                            >
                                {t.gdpr?.savePreferences}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GDPRConsent; 