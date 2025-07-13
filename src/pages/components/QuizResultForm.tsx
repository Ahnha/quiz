import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { HTMLReportService, HTMLReportData } from '../../services/htmlReportService';
import { generatePDFContent, ADDITIONAL_NOTE } from '../../data/skinCareRecommendations';
import { ErrorLogger } from '../../config/security';
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
 * - Handles quiz result display and report generation
 * - Manages user input validation
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
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [downloadMessage, setDownloadMessage] = useState('');
    const [downloadedSuccessfully, setDownloadedSuccessfully] = useState(false);

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // PATTERN: Event Handlers - Clean and focused

    const openReport = async () => {
        setIsGeneratingPDF(true);
        setDownloadMessage('');

        try {
            const pdfContent = generatePDFContent(quizName, score, result, '', quizResult, propLanguage);

            const reportData: HTMLReportData = {
                userName: 'User', // Default name for report display
                quizTitle: quizName,
                score,
                resultText: result,
                skinType: pdfContent.skinType,
                agingCategory: pdfContent.agingCategory,
                skinRecommendation: pdfContent.skinRecommendation,
                agingRecommendation: pdfContent.agingRecommendation,
                quizResult,
                language: propLanguage,
                date: new Date().toLocaleDateString(propLanguage === 'ro' ? 'ro-RO' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            // Generate and open the report
            await HTMLReportService.generateReport(reportData);
            setDownloadMessage(t.quizResultForm?.successMessage || 'Report opened successfully!');
            setDownloadedSuccessfully(true);
        } catch (error) {
            ErrorLogger.log(error as Error, 'HTML Report Generation');
            setDownloadMessage(t.quizResultForm?.errorMessage || 'Error generating report. Please try again.');
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
                    {/* Result Preview */}
                    <div className="quiz-result-preview" style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'var(--background-light)', borderRadius: '8px' }}>
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
                                                        {ref.trim()}
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Open Report Button */}
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        {downloadMessage && (
                            <div className={`message ${downloadMessage.includes('successfully') ? 'success' : 'error'}`} style={{
                                marginBottom: '16px',
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

                        {!downloadedSuccessfully ? (
                            <button
                                type="button"
                                className="btn-minimal secondary"
                                disabled={isGeneratingPDF}
                                onClick={openReport}
                                style={{
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '16px 32px',
                                    borderRadius: '8px',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    opacity: isGeneratingPDF ? 0.6 : 1,
                                    boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {isGeneratingPDF ? (
                                    <>
                                        <span className="spinner"></span>
                                        {t.quizResultForm?.sending || 'Opening Report...'}
                                    </>
                                ) : (
                                    `📄 ${t.quizResultForm?.downloadReport || 'Open Report'}`
                                )}
                            </button>
                        ) : (
                            <div className="downloaded-confirmation-animation" style={{
                                color: 'var(--success-color)',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                backgroundColor: 'rgba(127,176,105,0.1)',
                                padding: '16px',
                                borderRadius: '8px',
                                border: '1px solid rgba(127,176,105,0.3)'
                            }}>
                                <span className="downloaded-checkmark" style={{ fontSize: '1.5rem' }}>📄</span>
                                {t.quizResultForm?.successMessage || 'Report opened successfully!'}
                            </div>
                        )}
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