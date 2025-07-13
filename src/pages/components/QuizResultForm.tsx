import React, { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { HTMLReportService, HTMLReportData } from '../../services/htmlReportService';
import { generatePDFContent, ADDITIONAL_NOTE } from '../../data/skinCareRecommendations';
import { SecurityUtils, ErrorLogger } from '../../config/security';
import '../../styles/quizResultForm.css';

interface QuizResultFormProps {
    quizName: string;
    score: number;
    result: string;
    quizResult?: {
        minScore: number;
        maxScore: number;
        text: string | { ro: string; en: string };
    };
    language?: 'ro' | 'en';
    onClose: () => void;
}

/**
 * Quiz Result Form Component
 * 
 * PATTERN: Single Responsibility Principle
 * - Handles quiz result display and PDF generation
 * - Manages CAPTCHA validation for PDF generation
 * 
 * PATTERN: Security First
 * - Input validation and sanitization
 * - Secure data handling
 * - Error logging and handling
 */
const QuizResultForm: React.FC<QuizResultFormProps> = ({
    quizName,
    score,
    result,
    quizResult,
    language: propLanguage = 'ro',
    onClose
}) => {
    const { t } = useLanguage();
    const [userName, setUserName] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');
    const [userCaptchaDownload, setUserCaptchaDownload] = useState('');
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [downloadMessage, setDownloadMessage] = useState('');
    const [downloadCaptchaError, setDownloadCaptchaError] = useState('');
    const [downloadedSuccessfully, setDownloadedSuccessfully] = useState(false);

    // Generate a simple math CAPTCHA
    const generateCaptcha = useCallback(() => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const answer = num1 + num2;
        setCaptchaValue(answer.toString());
        return `${num1} + ${num2} = ?`;
    }, []);

    const [captchaQuestion, setCaptchaQuestion] = useState('');

    // Generate CAPTCHA on component mount
    useEffect(() => {
        const question = generateCaptcha();
        setCaptchaQuestion(question);
    }, [generateCaptcha]);

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // PATTERN: Event Handlers - Clean and focused
    const handleCaptchaDownloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedCaptcha = SecurityUtils.sanitizeInput(e.target.value);
        setUserCaptchaDownload(sanitizedCaptcha);
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedName = SecurityUtils.sanitizeInput(e.target.value);
        setUserName(sanitizedName);
        setDownloadMessage(''); // Clear error when user starts typing
    };

    const generateAndDownloadPDF = async () => {
        // Validate name is required
        if (!userName || userName.trim() === '') {
            setDownloadMessage('Please enter your name to generate the report.');
            return;
        }

        // Validate CAPTCHA for download
        if (!userCaptchaDownload) {
            setDownloadCaptchaError('Please complete the security check');
            return;
        }
        if (userCaptchaDownload !== captchaValue) {
            setDownloadCaptchaError('Incorrect CAPTCHA answer');
            setUserCaptchaDownload('');
            const question = generateCaptcha();
            setCaptchaQuestion(question);
            return;
        }

        setIsGeneratingPDF(true);
        setDownloadMessage('');
        setDownloadCaptchaError('');

        try {
            const pdfContent = generatePDFContent(quizName, score, result, '', quizResult, propLanguage);

            const reportData: HTMLReportData = {
                userName: userName.trim(),
                quizTitle: quizName,
                score,
                resultText: result,
                skinType: pdfContent.skinType,
                agingCategory: pdfContent.agingCategory,
                skinRecommendation: pdfContent.skinRecommendation,
                agingRecommendation: pdfContent.agingRecommendation,
                quizResult,
                language: propLanguage,
                date: new Date().toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                // Add your logo here - choose one of the options below:
                // Option 1: Base64 encoded logo (recommended)
                // logoUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...', // Replace with your base64 string
                // logoAlt: 'Skin Studio Logo',

                // Option 2: URL to logo file in public folder
                // logoUrl: '/logo.png', // Place your logo in the public folder
                // logoAlt: 'Skin Studio Logo',

                // Option 3: External URL (not recommended for offline reports)
                // logoUrl: 'https://yourdomain.com/logo.png',
                // logoAlt: 'Skin Studio Logo'
            };

            // Generate and open the report
            await HTMLReportService.generateReport(reportData);

            // Also send the report to Skin Studio
            try {
                await HTMLReportService.sendToSkinStudio(reportData);
                setDownloadMessage('Report opened successfully and sent to Skin Studio!');
            } catch (skinStudioError) {
                // If sending to Skin Studio fails, still show success for opening the report
                console.warn('Failed to send to Skin Studio:', skinStudioError);
                setDownloadMessage('Report opened successfully! (Note: Could not send to Skin Studio)');
            }

            setDownloadedSuccessfully(true);

            // Clear CAPTCHA after successful generation
            setUserCaptchaDownload('');
            const question = generateCaptcha();
            setCaptchaQuestion(question);
        } catch (error) {
            ErrorLogger.log(error as Error, 'HTML Report Generation');
            setDownloadMessage('Error generating report. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    // Helper to split result and references
    function parseResultText(text: string) {
        if (!text) return { main: '', references: '' };
        const refMarker = /📚 (Scientific references|Referințe științifice):/;
        const parts = text.split(refMarker);
        if (parts.length >= 3) {
            // [main, marker, refs]
            return { main: parts[0].trim(), references: parts[2].trim() };
        }
        return { main: text.trim(), references: '' };
    }

    const { main: resultMain, references: resultReferences } = parseResultText(result);

    return (
        <div className="quiz-result-form-overlay theme-modal-overlay">
            <div className="quiz-result-form-modal glass-card theme-modal">
                <div className="quiz-result-form-header">
                    <h2>{t.quizResultForm?.title || 'Quiz Results'}</h2>
                    <button
                        className="close-button theme-modal-close"
                        onClick={onClose}
                        aria-label="Close"
                        type="button"
                    >
                        ×
                    </button>
                </div>
                <div className="quiz-result-form-content modal-scrollable-content">
                    {/* Section 1: Open Report */}
                    <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'var(--background-light)', borderRadius: '8px' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <strong style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                                📄 Open Report
                            </strong>
                        </div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '16px' }}>
                            Open your quiz results as a printable report in a new tab.
                        </div>

                        {/* Name Input (Required) */}
                        <div className="form-group">
                            <label htmlFor="userName" style={{ color: 'var(--text-color)', fontSize: '0.9rem', marginBottom: '4px' }}>
                                Your Name <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={handleUserNameChange}
                                placeholder="Enter your name for the PDF report"
                                required
                                className="form-input"
                                style={{ marginTop: '4px', backgroundColor: 'var(--background-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                            />
                        </div>

                        {/* Security Check for Download */}
                        <div className="form-group">
                            <label htmlFor="captcha-download" style={{ color: 'var(--text-color)', fontSize: '0.9rem', marginBottom: '4px' }}>
                                Security Check <span style={{ color: 'red' }}>*</span>
                            </label>
                            <div className="captcha-container">
                                <span className="captcha-question" style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>{captchaQuestion}</span>
                                <input
                                    type="text"
                                    id="captcha-download"
                                    value={userCaptchaDownload}
                                    onChange={handleCaptchaDownloadChange}
                                    placeholder="Enter answer"
                                    required
                                    className="form-input captcha-input"
                                    style={{ backgroundColor: 'var(--background-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                                />
                            </div>
                            {downloadCaptchaError && (
                                <div className="message error" style={{ marginTop: '8px', fontSize: '0.9rem', backgroundColor: 'rgba(255,107,107,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', padding: '8px', borderRadius: '4px' }}>
                                    {downloadCaptchaError}
                                </div>
                            )}
                            {downloadMessage && (
                                <div className={`message ${downloadMessage.includes('successfully') ? 'success' : 'error'}`} style={{
                                    marginTop: '8px',
                                    fontSize: '0.9rem',
                                    backgroundColor: downloadMessage.includes('successfully') ? 'rgba(127,176,105,0.1)' : 'rgba(255,107,107,0.1)',
                                    color: downloadMessage.includes('successfully') ? 'var(--primary-color)' : '#ff6b6b',
                                    border: `1px solid ${downloadMessage.includes('successfully') ? 'rgba(127,176,105,0.3)' : 'rgba(255,107,107,0.3)'}`,
                                    padding: '8px',
                                    borderRadius: '4px'
                                }}>
                                    {downloadMessage}
                                </div>
                            )}
                        </div>

                        {/* Download Button */}
                        <div style={{ marginTop: '16px' }}>
                            {!downloadedSuccessfully ? (
                                <button
                                    type="button"
                                    className="btn-minimal secondary"
                                    disabled={isGeneratingPDF || !userName.trim()}
                                    onClick={generateAndDownloadPDF}
                                    style={{
                                        backgroundColor: 'var(--primary-color)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        opacity: (isGeneratingPDF || !userName.trim()) ? 0.6 : 1
                                    }}
                                >
                                    {isGeneratingPDF ? (
                                        <>
                                            <span className="spinner"></span>
                                            Opening Report...
                                        </>
                                    ) : (
                                        'Open Report'
                                    )}
                                </button>
                            ) : (
                                <div className="downloaded-confirmation-animation" style={{
                                    color: 'var(--success-color)',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    backgroundColor: 'rgba(127,176,105,0.1)',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(127,176,105,0.3)'
                                }}>
                                    <span className="downloaded-checkmark" style={{ fontSize: '1.5rem' }}>📄</span>
                                    Report opened successfully!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Result Preview */}
                    <div className="quiz-result-preview" style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--background-light)', borderRadius: '8px' }}>
                        <div className="quiz-result-main">
                            <strong>{t.quizResultForm?.result || 'Result'}:</strong>
                            <div style={{ marginTop: 8 }}>
                                {/* Skin Type Title */}
                                <div style={{ fontWeight: 500, fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: 8 }}>
                                    {resultMain.split('\n')[0]}
                                </div>
                                {/* Description */}
                                <div style={{ color: 'var(--text-color)', fontWeight: 300, marginBottom: 12 }}>
                                    {resultMain.split('\n').slice(1).join(' ')}
                                </div>
                                {/* Recommendations */}
                                {resultMain.includes('✔') && (() => {
                                    const recommendations = resultMain.split('✔')[1]?.split('📚')[0] || '';
                                    const lines = recommendations.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                                    const intro = lines.find(line => !line.startsWith('•'));
                                    const bullets = lines.filter(line => line.startsWith('•'));
                                    return (
                                        <div style={{ margin: '12px 0', padding: '12px', background: 'rgba(127,176,105,0.07)', borderRadius: 8 }}>
                                            <div style={{ fontWeight: 500, color: 'var(--primary-color)', marginBottom: 4 }}>💡 {propLanguage === 'ro' ? 'Recomandări personalizate' : 'Personalized Recommendations'}:</div>
                                            {intro && <div style={{ color: 'var(--text-color)', fontWeight: 300, marginBottom: bullets.length ? 4 : 0 }}>{intro}</div>}
                                            {bullets.length > 0 && (
                                                <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
                                                    {bullets.map((item, idx) => (
                                                        <li key={idx} style={{ color: 'var(--text-color)', fontSize: '1rem', marginBottom: 2, fontWeight: 400 }}>{item.replace(/^•\s*/, '')}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })()}
                                {/* Scientific References */}
                                {resultReferences && (
                                    <div style={{ margin: '12px 0', padding: '12px', background: 'rgba(156,39,176,0.07)', borderRadius: 8 }}>
                                        <div style={{ fontWeight: 500, color: 'var(--accent-color)', marginBottom: 4 }}>📚 {propLanguage === 'ro' ? 'Bazat pe cercetări științifice' : 'Based on Scientific Research'}:</div>
                                        <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
                                            {resultReferences.split('\n').map((ref, idx) => (
                                                ref.trim() && (
                                                    <li key={idx} style={{ color: 'var(--text-light)', fontSize: '0.98rem', marginBottom: 2, fontWeight: 400 }}>
                                                        <span style={{ marginRight: 6, fontSize: '1.1em' }}>📖</span>{ref.trim()}
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="additional-note" style={{ marginTop: 24, padding: 16, background: 'var(--background-light)', borderRadius: 8 }}>
                        <div style={{ fontWeight: 600, color: 'var(--accent-color)', marginBottom: 8 }}>
                            {ADDITIONAL_NOTE[propLanguage].title}
                        </div>
                        <div style={{ color: 'var(--text-color)', marginBottom: 8 }}>
                            {ADDITIONAL_NOTE[propLanguage].description}
                        </div>
                        <div style={{ color: 'var(--primary-color)', fontWeight: 500, marginBottom: 4 }}>
                            <a href={ADDITIONAL_NOTE[propLanguage].tool.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
                                {ADDITIONAL_NOTE[propLanguage].tool.name}
                            </a>
                        </div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                            {ADDITIONAL_NOTE[propLanguage].disclaimer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResultForm; 