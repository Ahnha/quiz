import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Checkbox,
    FormControlLabel,
    Alert,
    CircularProgress,
    Paper,
    Divider
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// PATTERN: Service Layer - Import services
import { PDFService, PDFData } from '../../services/pdfService';
import { generatePDFContent } from '../../data/skinCareRecommendations';

// PATTERN: Security - Import security utilities
import { SECURITY_CONFIG, SecurityUtils, ErrorLogger } from '../../config/security';

// PATTERN: Styles - Import component-specific styles
import '../../styles/emailForm.css';

interface ResultEmailFormProps {
    quizTitle: string;
    score: number;
    resultText: string;
}

/**
 * Enhanced ResultEmailForm Component
 * 
 * PATTERN: Single Responsibility Principle
 * - Handles email form submission with PDF generation
 * - Manages user consent for product recommendations
 * 
 * PATTERN: Service Layer Integration
 * - Uses PDFService for report generation
 * - Uses skin care recommendations data
 * 
 * PATTERN: Security First
 * - Input validation and sanitization
 * - Secure configuration management
 * - Error handling and logging
 */
const ResultEmailForm: React.FC<ResultEmailFormProps> = ({
    quizTitle,
    score,
    resultText
}) => {
    // PATTERN: State Management - Organized by purpose
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: ''
    });
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [sendToOwner, setSendToOwner] = useState<boolean>(false);

    // Loading states
    const [sending, setSending] = useState(false);
    const [generatingPDF, setGeneratingPDF] = useState(false);

    // Feedback states
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [pdfGenerated, setPdfGenerated] = useState(false);

    const navigate = useNavigate();

    // PATTERN: Input Validation - Centralized validation logic
    const validateForm = (): { isValid: boolean; errors: string[] } => {
        const errors: string[] = [];

        if (!captchaToken) {
            errors.push('Te rugăm să completezi captcha.');
        }

        if (!formData.userEmail) {
            errors.push('Te rugăm să introduci un email.');
        } else if (!SecurityUtils.isValidEmail(formData.userEmail)) {
            errors.push('Te rugăm să introduci o adresă de email validă.');
        }

        if (!formData.userName) {
            errors.push('Te rugăm să introduci numele tău.');
        } else if (!SecurityUtils.isValidName(formData.userName)) {
            errors.push('Numele trebuie să conțină între 2 și 50 de caractere și să nu conțină caractere speciale.');
        }

        if (!SecurityUtils.isValidQuizScore(score)) {
            errors.push('Scorul quiz-ului nu este valid.');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    };

    // PATTERN: Event Handlers - Clean and focused
    const handleInputChange = (field: keyof typeof formData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const sanitizedValue = SecurityUtils.sanitizeInput(event.target.value);
        setFormData(prev => ({
            ...prev,
            [field]: sanitizedValue
        }));
        setError(''); // Clear error when user starts typing
    };

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
        setError('');
    };

    // PATTERN: PDF Generation - Separate concern with error handling
    const generateAndDownloadPDF = async () => {
        setGeneratingPDF(true);
        setError('');

        try {
            const pdfContent = generatePDFContent(quizTitle, score, resultText, formData.userName);

            const pdfData: PDFData = {
                userName: formData.userName,
                quizTitle,
                score,
                resultText,
                skinType: pdfContent.skinType,
                agingCategory: pdfContent.agingCategory,
                skinRecommendation: pdfContent.skinRecommendation,
                agingRecommendation: pdfContent.agingRecommendation,
                date: new Date().toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            await PDFService.generatePDF(pdfData);
            PDFService.downloadPDF(pdfData, `skin-care-report-${formData.userName}.pdf`);
            setPdfGenerated(true);

        } catch (error) {
            const errorMessage = 'Eroare la generarea PDF-ului. Te rugăm să încerci din nou.';
            setError(errorMessage);
            ErrorLogger.log(error as Error, 'PDF Generation');
        } finally {
            setGeneratingPDF(false);
        }
    };

    // PATTERN: Email Submission - Business logic with security
    const handleSubmit = async () => {
        const validation = validateForm();

        if (!validation.isValid) {
            setError(validation.errors.join(' '));
            return;
        }

        setSending(true);
        setError('');

        try {
            // Generate PDF content for email
            const pdfContent = generatePDFContent(quizTitle, score, resultText, formData.userName);

            // Prepare email template data with sanitized inputs
            const emailData = {
                from_email: formData.userEmail,
                user_name: formData.userName,
                quiz_title: quizTitle,
                quiz_score: score,
                quiz_result: resultText,
                skin_type: pdfContent.skinRecommendation.title,
                aging_category: pdfContent.agingRecommendation.title,
                daily_routine: pdfContent.skinRecommendation.dailyRoutine.join('\n• '),
                recommended_products: pdfContent.skinRecommendation.recommendedProducts.join('\n• '),
                lifestyle_tips: pdfContent.skinRecommendation.lifestyleTips.join('\n• '),
                send_to_owner: sendToOwner ? 'Da' : 'Nu',
                from_page: 'Skin Studio Quiz App',
                'g-recaptcha-response': captchaToken
            };

            // Send email to user using secure configuration
            await emailjs.send(
                SECURITY_CONFIG.emailService.serviceId,
                SECURITY_CONFIG.emailService.templates.userNotification,
                emailData,
                SECURITY_CONFIG.emailService.publicKey
            );

            // Send to owner if requested
            if (sendToOwner) {
                await emailjs.send(
                    SECURITY_CONFIG.emailService.serviceId,
                    SECURITY_CONFIG.emailService.templates.ownerNotification,
                    {
                        user_name: formData.userName,
                        user_email: formData.userEmail,
                        quiz_title: quizTitle,
                        quiz_score: score,
                        skin_type: pdfContent.skinRecommendation.title,
                        aging_category: pdfContent.agingRecommendation.title,
                        from_page: 'Skin Studio Quiz App'
                    },
                    SECURITY_CONFIG.emailService.publicKey
                );
            }

            setShowSuccess(true);
            setTimeout(() => navigate('/'), 3000);

        } catch (error) {
            const errorMessage = 'A apărut o eroare la trimiterea emailului. Te rugăm să încerci din nou.';
            setError(errorMessage);
            ErrorLogger.log(error as Error, 'Email Submission');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="result-email-form">
            <Paper elevation={3} className="form-container">
                <Typography variant="h4" component="h2" className="form-title">
                    Trimite Rezultatele Quizului
                </Typography>

                <Typography variant="body1" className="form-subtitle">
                    Primește un raport detaliat pe email și opțional trimite rezultatele către Skin Studio site-ului.
                </Typography>

                <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="form-content">
                    <TextField
                        fullWidth
                        label="Numele tău"
                        value={formData.userName}
                        onChange={handleInputChange('userName')}
                        margin="normal"
                        required
                        error={!!error && !formData.userName}
                        helperText={!formData.userName && error ? 'Numele este obligatoriu' : ''}
                    />

                    <TextField
                        fullWidth
                        label="Adresa de email"
                        type="email"
                        value={formData.userEmail}
                        onChange={handleInputChange('userEmail')}
                        margin="normal"
                        required
                        error={!!error && !SecurityUtils.isValidEmail(formData.userEmail)}
                        helperText={!SecurityUtils.isValidEmail(formData.userEmail) && formData.userEmail ? 'Adresa de email nu este validă' : ''}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={sendToOwner}
                                onChange={(e) => setSendToOwner(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Trimite rezultate către Skin Studio"
                        className="checkbox-field"
                    />

                    <div className="captcha-container">
                        <ReCAPTCHA
                            sitekey={SECURITY_CONFIG.captcha.siteKey}
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    {error && (
                        <Alert severity="error" className="error-alert">
                            {error}
                        </Alert>
                    )}

                    <div className="form-actions">
                        <Button
                            variant="outlined"
                            onClick={generateAndDownloadPDF}
                            disabled={generatingPDF}
                            className="action-button"
                        >
                            {generatingPDF ? (
                                <>
                                    <CircularProgress size={20} className="button-spinner" />
                                    Generare PDF...
                                </>
                            ) : (
                                'Descarcă Raport PDF'
                            )}
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={sending || !formData.userName || !formData.userEmail || !captchaToken}
                            className="action-button primary"
                        >
                            {sending ? (
                                <>
                                    <CircularProgress size={20} className="button-spinner" />
                                    Trimitere...
                                </>
                            ) : (
                                'Trimite Rezultate'
                            )}
                        </Button>
                    </div>
                </Box>
            </Paper>

            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
            >
                <MuiAlert elevation={6} variant="filled" severity="success">
                    Rezultatele au fost trimise cu succes! Vei fi redirecționat în câteva secunde.
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default ResultEmailForm;
