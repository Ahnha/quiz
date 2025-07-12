import React, { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PDFService, PDFData } from '../../services/pdfService';
import { generatePDFContent } from '../../data/skinCareRecommendations';
import { SecurityUtils, ErrorLogger } from '../../config/security';
import '../../styles/quizResultForm.css';
import { ADDITIONAL_NOTE } from '../../data/skinCareRecommendations';

interface QuizResultData {
    id: string;
    timestamp: string;
    quizName: string;
    score: number;
    result: string;
    sendToSkinStudio: boolean;
    skinStudioEmail: string;
}

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
 * - Handles quiz result submission and email sending
 * - Manages CAPTCHA validation and PDF generation
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
    const [skinStudioEmail, setSkinStudioEmail] = useState('');
    const [sendToSkinStudio, setSendToSkinStudio] = useState(false);
    const [captchaValue, setCaptchaValue] = useState('');
    const [userCaptcha, setUserCaptcha] = useState('');
    const [userCaptchaDownload, setUserCaptchaDownload] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [downloadMessage, setDownloadMessage] = useState('');
    const [sendCaptchaError, setSendCaptchaError] = useState('');
    const [downloadCaptchaError, setDownloadCaptchaError] = useState('');

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

    // PATTERN: Input Validation - Centralized validation
    const validateForm = (): { isValid: boolean; errors: string[] } => {
        const errors: string[] = [];

        // Validate Skin Studio email if checkbox is checked
        if (sendToSkinStudio && !skinStudioEmail) {
            errors.push('Please enter your email address for Skin Studio recommendations');
        } else if (sendToSkinStudio && !SecurityUtils.isValidEmail(skinStudioEmail)) {
            errors.push('Please enter a valid email address for Skin Studio recommendations');
        }

        if (!userCaptcha) {
            errors.push(t.quizResultForm?.fillAllFields || 'Please fill all fields');
        } else if (userCaptcha !== captchaValue) {
            errors.push(t.quizResultForm?.captchaError || 'Incorrect CAPTCHA answer');
        }

        if (!SecurityUtils.isValidQuizScore(score)) {
            errors.push('Invalid quiz score');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    };

    // PATTERN: Event Handlers - Clean and focused
    const handleSkinStudioEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedEmail = SecurityUtils.sanitizeInput(e.target.value);
        setSkinStudioEmail(sanitizedEmail);
        setMessage(''); // Clear error when user starts typing
    };

    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedCaptcha = SecurityUtils.sanitizeInput(e.target.value);
        setUserCaptcha(sanitizedCaptcha);
        setMessage(''); // Clear error when user starts typing
    };

    const handleCaptchaDownloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedCaptcha = SecurityUtils.sanitizeInput(e.target.value);
        setUserCaptchaDownload(sanitizedCaptcha);
        setMessage(''); // Clear error when user starts typing
    };

    const generateAndDownloadPDF = async () => {
        try {
            const pdfContent = generatePDFContent(quizName, score, result, '', quizResult, propLanguage);

            const pdfData: PDFData = {
                userName: '', // No longer needed
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
                })
            };

            await PDFService.generatePDF(pdfData);
            PDFService.downloadPDF(pdfData, `skin-care-report-${quizName}.pdf`);
            setDownloadMessage('PDF generated successfully!');
        } catch (error) {
            ErrorLogger.log(error as Error, 'PDF Generation');
            setDownloadMessage('Error generating PDF. Please try again.');
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
        return { main: text, references: '' };
    }

    // Get localized result text
    let localizedResult = result;
    if (quizResult && quizResult.text) {
        if (typeof quizResult.text === 'string') {
            localizedResult = quizResult.text;
        } else {
            localizedResult = quizResult.text[propLanguage] || result;
        }
    }
    const { main: resultMain, references: resultReferences } = parseResultText(localizedResult);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        const validation = validateForm();

        if (!validation.isValid) {
            setMessage(validation.errors.join(' '));
            if (validation.errors.some(err => err.includes('CAPTCHA'))) {
                setUserCaptcha('');
                setUserCaptchaDownload('');
                const question = generateCaptcha();
                setCaptchaQuestion(question);
            }
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            // Create result data with secure ID
            const resultData: QuizResultData = {
                id: SecurityUtils.generateSecureId(),
                timestamp: new Date().toISOString(),
                quizName,
                score,
                result,
                sendToSkinStudio,
                skinStudioEmail: sendToSkinStudio ? skinStudioEmail : '',
            };

            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Store in localStorage using secure utilities
            const existingResults = SecurityUtils.safeLocalStorageGet('quizResults', []);
            existingResults.push(resultData);
            SecurityUtils.safeLocalStorageSet('quizResults', existingResults);

            setMessage(t.quizResultForm?.successMessage || 'Results sent successfully!');
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            const errorMessage = t.quizResultForm?.errorMessage || 'Error sending results. Please try again.';
            setMessage(errorMessage);
            ErrorLogger.log(error as Error, 'Quiz Result Submission');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="quiz-result-form-overlay">
            <div className="quiz-result-form glass-card">
                <div className="form-header">
                    <h2>{t.quizResultForm?.title || 'Send Quiz Results'}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="form-content">
                    {/* Section 1: Get Future Recommendations */}
                    <div className="form-section">
                        <h3 style={{ marginBottom: '16px', color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                            🌟 Get Future Recommendations from Skin Studio
                        </h3>
                        <p style={{ marginBottom: '16px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                            Receive personalized skincare recommendations and updates based on your quiz results.
                        </p>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={sendToSkinStudio}
                                onChange={(e) => setSendToSkinStudio(e.target.checked)}
                                className="checkbox-input"
                            />
                            <span className="checkbox-text">
                                Send my results to Skin Studio for future recommendations
                            </span>
                        </label>

                        {sendToSkinStudio && (
                            <div style={{ marginTop: '12px' }}>
                                <label htmlFor="skinStudioEmail">Email for recommendations <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="email"
                                    id="skinStudioEmail"
                                    value={skinStudioEmail}
                                    onChange={handleSkinStudioEmailChange}
                                    placeholder="Enter your email for future recommendations"
                                    required={sendToSkinStudio}
                                    className="form-input"
                                    style={{ marginTop: '8px' }}
                                />
                            </div>
                        )}

                        {/* Security Check for Send */}
                        <div className="form-group" style={{ marginTop: '16px' }}>
                            <label htmlFor="captcha-send">Security Check <span style={{ color: 'red' }}>*</span></label>
                            <div className="captcha-container">
                                <span className="captcha-question">{captchaQuestion}</span>
                                <input
                                    type="text"
                                    id="captcha-send"
                                    value={userCaptcha}
                                    onChange={handleCaptchaChange}
                                    placeholder="Enter answer"
                                    required
                                    className="form-input captcha-input"
                                />
                            </div>
                            {sendCaptchaError && (
                                <div className="message error" style={{ marginTop: '8px', fontSize: '0.9rem' }}>
                                    {sendCaptchaError}
                                </div>
                            )}
                        </div>

                        {/* Send Button */}
                        <div className="form-actions" style={{ marginTop: '20px' }}>
                            <button
                                type="button"
                                className="btn-minimal primary"
                                disabled={isSubmitting}
                                onClick={() => {
                                    // Validate form fields
                                    const errors: string[] = [];
                                    setSendCaptchaError('');

                                    // Validate Skin Studio email if checkbox is checked
                                    if (sendToSkinStudio && !skinStudioEmail) {
                                        errors.push('Please enter your email address for Skin Studio recommendations');
                                    } else if (sendToSkinStudio && !SecurityUtils.isValidEmail(skinStudioEmail)) {
                                        errors.push('Please enter a valid email address for Skin Studio recommendations');
                                    }

                                    if (!userCaptcha) {
                                        setSendCaptchaError('Please complete the security check');
                                        errors.push('Please complete the security check');
                                    } else if (userCaptcha !== captchaValue) {
                                        setSendCaptchaError('Incorrect CAPTCHA answer');
                                        errors.push('Incorrect CAPTCHA answer');
                                    }

                                    if (!SecurityUtils.isValidQuizScore(score)) {
                                        errors.push('Invalid quiz score');
                                    }

                                    if (errors.length > 0) {
                                        setMessage(errors.join(' '));
                                        if (errors.some(err => err.includes('CAPTCHA'))) {
                                            setUserCaptcha('');
                                            const question = generateCaptcha();
                                            setCaptchaQuestion(question);
                                        }
                                        return;
                                    }

                                    // If validation passes, submit the form
                                    handleSubmit();
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        {t.quizResultForm?.sending || 'Sending...'}
                                    </>
                                ) : (
                                    'Send Results to Skin Studio'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Section Divider */}
                    <div className="form-section-divider" style={{ margin: '32px 0', borderTop: '2px solid #eee' }}></div>

                    {/* Section 2: Download Report */}
                    <div className="form-section">
                        <h3 style={{ marginBottom: '16px', color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                            📄 Download Your Results
                        </h3>
                        <p style={{ marginBottom: '16px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                            Download your quiz results as a PDF report for your own records.
                        </p>

                        {/* Security Check for Download */}
                        <div className="form-group">
                            <label htmlFor="captcha-download">Security Check <span style={{ color: 'red' }}>*</span></label>
                            <div className="captcha-container">
                                <span className="captcha-question">{captchaQuestion}</span>
                                <input
                                    type="text"
                                    id="captcha-download"
                                    value={userCaptchaDownload}
                                    onChange={handleCaptchaDownloadChange}
                                    placeholder="Enter answer"
                                    required
                                    className="form-input captcha-input"
                                />
                            </div>
                            {downloadCaptchaError && (
                                <div className="message error" style={{ marginTop: '8px', fontSize: '0.9rem' }}>
                                    {downloadCaptchaError}
                                </div>
                            )}
                            {downloadMessage && downloadMessage.includes('successfully') && (
                                <div className={`message success`} style={{ marginTop: '8px' }}>
                                    {downloadMessage}
                                </div>
                            )}
                        </div>

                        {/* Download Button */}
                        <div className="form-actions" style={{ marginTop: '20px' }}>
                            <button
                                type="button"
                                className="btn-minimal secondary"
                                disabled={isSubmitting}
                                onClick={() => {
                                    // Validate download CAPTCHA
                                    setDownloadCaptchaError('');
                                    if (!userCaptchaDownload) {
                                        setDownloadCaptchaError('Please complete the security check to download');
                                        return;
                                    } else if (userCaptchaDownload !== captchaValue) {
                                        setDownloadCaptchaError('Incorrect CAPTCHA answer');
                                        return;
                                    }
                                    setDownloadMessage('');
                                    generateAndDownloadPDF();
                                }}
                            >
                                📄 {t.quizResultForm?.downloadReport || 'Download PDF Report'}
                            </button>
                        </div>

                        {/* Result Preview */}
                        <div className="quiz-result-preview" style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
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
                        <div className="additional-note" style={{ marginTop: 24, padding: 16, background: '#f3f0fa', borderRadius: 8 }}>
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
                            <div style={{ fontWeight: 500, marginBottom: 4 }}>
                                {propLanguage === 'ro' ? 'Cum să folosești:' : 'How to use:'}
                            </div>
                            <ul style={{ paddingLeft: '1.2em', margin: 0, marginBottom: 8 }}>
                                {ADDITIONAL_NOTE[propLanguage].howTo.map((step, idx) => (
                                    <li key={idx} style={{ color: 'var(--text-color)', fontSize: '0.98rem', marginBottom: 2 }}>{step}</li>
                                ))}
                            </ul>
                            <div style={{ color: 'var(--text-light)', fontSize: '0.95rem', fontStyle: 'italic' }}>
                                {ADDITIONAL_NOTE[propLanguage].disclaimer}
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default QuizResultForm; 