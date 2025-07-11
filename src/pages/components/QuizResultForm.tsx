import React, { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ReportGenerator from '../../utils/reportGenerator';
import { SecurityUtils, ErrorLogger } from '../../config/security';
import '../../styles/quizResultForm.css';

interface QuizResultData {
    id: string;
    timestamp: string;
    quizName: string;
    score: number;
    result: string;
    userEmail: string;
    sendToOwner: boolean;
}

interface QuizResultFormProps {
    quizName: string;
    score: number;
    result: string;
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
const QuizResultForm: React.FC<QuizResultFormProps> = ({ quizName, score, result, onClose }) => {
    const { t, language } = useLanguage();
    const [email, setEmail] = useState('');
    const [sendToOwner, setSendToOwner] = useState(false);
    const [captchaValue, setCaptchaValue] = useState('');
    const [userCaptcha, setUserCaptcha] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

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

        if (!email) {
            errors.push(t.quizResultForm?.fillAllFields || 'Please fill all fields');
        } else if (!SecurityUtils.isValidEmail(email)) {
            errors.push('Please enter a valid email address');
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
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedEmail = SecurityUtils.sanitizeInput(e.target.value);
        setEmail(sanitizedEmail);
        setMessage(''); // Clear error when user starts typing
    };

    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedCaptcha = SecurityUtils.sanitizeInput(e.target.value);
        setUserCaptcha(sanitizedCaptcha);
        setMessage(''); // Clear error when user starts typing
    };

    const downloadResult = () => {
        const resultData: QuizResultData = {
            id: SecurityUtils.generateSecureId(),
            timestamp: new Date().toISOString(),
            quizName,
            score,
            result,
            userEmail: email,
            sendToOwner,
        };

        // Create downloadable JSON file
        const dataStr = JSON.stringify(resultData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `quiz-result-${quizName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const generateBeautifulReport = () => {
        const resultData: QuizResultData = {
            id: SecurityUtils.generateSecureId(),
            timestamp: new Date().toISOString(),
            quizName,
            score,
            result,
            userEmail: email,
            sendToOwner,
        };

        try {
            const reportGenerator = new ReportGenerator(language as 'en' | 'ro');
            reportGenerator.downloadReport(resultData, {
                includeLogo: true,
                includeCharts: true,
                includeRecommendations: true,
                language: language as 'en' | 'ro'
            });
        } catch (error) {
            ErrorLogger.log(error as Error, 'Report Generation');
            setMessage('Error generating report. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateForm();

        if (!validation.isValid) {
            setMessage(validation.errors.join(' '));
            if (validation.errors.some(err => err.includes('CAPTCHA'))) {
                setUserCaptcha('');
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
                userEmail: email,
                sendToOwner,
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

                <form onSubmit={handleSubmit} className="form-content">
                    <div className="form-group">
                        <label htmlFor="email">{t.quizResultForm?.emailLabel || 'Email Address'}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder={t.quizResultForm?.emailPlaceholder || 'Enter your email'}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={sendToOwner}
                                onChange={(e) => setSendToOwner(e.target.checked)}
                                className="checkbox-input"
                            />
                            <span className="checkbox-text">
                                {t.quizResultForm?.sendToOwner || 'Send results to site owner'}
                            </span>
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="captcha">{t.quizResultForm?.captchaLabel || 'Security Check'}</label>
                        <div className="captcha-container">
                            <span className="captcha-question">{captchaQuestion}</span>
                            <input
                                type="text"
                                id="captcha"
                                value={userCaptcha}
                                onChange={handleCaptchaChange}
                                placeholder={t.quizResultForm?.captchaPlaceholder || 'Enter answer'}
                                required
                                className="form-input captcha-input"
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={generateBeautifulReport}
                            className="btn-minimal secondary"
                            disabled={isSubmitting}
                        >
                            📄 {t.quizResultForm?.downloadReport || 'Download Beautiful Report'}
                        </button>
                        <button
                            type="button"
                            onClick={downloadResult}
                            className="btn-minimal secondary"
                            disabled={isSubmitting}
                        >
                            📥 {t.quizResultForm?.download || 'Download Data'}
                        </button>
                        <button
                            type="submit"
                            className="btn-minimal primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    {t.quizResultForm?.sending || 'Sending...'}
                                </>
                            ) : (
                                t.quizResultForm?.send || 'Send Results'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuizResultForm; 