// PATTERN: Service Layer - HTML Report Service
// Handles the creation of HTML reports that open in new tabs with print functionality

import { ErrorLogger } from '../config/security';
import { EmailService, EmailData } from './emailService';

export interface HTMLReportData {
    userName: string;
    quizTitle: string;
    score: number;
    resultText: string;
    skinType: string;
    agingCategory: string;
    skinRecommendation: any;
    agingRecommendation: any;
    date: string;
    quizResult?: {
        minScore: number;
        maxScore: number;
        text: string | { ro: string; en: string };
    };
    language?: 'ro' | 'en';
    logoUrl?: string; // Optional: URL or base64 string for custom logo
    logoAlt?: string; // Optional: Alt text for the logo
}

/**
 * HTML Report Service Class
 * 
 * PATTERN: Service Layer Pattern
 * - Handles HTML report generation and opening in new tabs
 * - Provides clean interface for report operations
 * 
 * PATTERN: Error Handling
 * - Comprehensive error handling and logging
 * - Graceful fallbacks for report generation issues
 */
export class HTMLReportService {
    /**
     * Generate HTML report and open in new tab
     * @param data - Report data
     */
    public static async generateReport(data: HTMLReportData): Promise<void> {
        try {
            // Validate required data
            if (!data.userName || data.userName.trim() === '') {
                throw new Error('User name is required for report generation');
            }

            if (!data.quizTitle || !data.resultText) {
                throw new Error('Quiz title and result text are required');
            }

            // Generate HTML content
            const htmlContent = this.generateHTMLContent(data);

            // Open in new tab and write HTML directly
            const newWindow = window.open('', '_blank');
            if (!newWindow) {
                throw new Error('Failed to open new window. Please allow popups for this site.');
            }

            newWindow.document.open();
            newWindow.document.write(htmlContent);
            newWindow.document.close();

        } catch (error) {
            ErrorLogger.log(error as Error, 'HTML Report Generation');
            throw new Error(`Failed to generate report: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Send report to Skin Studio email
     * @param data - Report data
     */
    public static async sendToSkinStudio(data: HTMLReportData): Promise<void> {
        try {
            // For now, we'll simulate sending to Skin Studio
            // In a real implementation, this would send an email
            console.log('Sending report to Skin Studio:', {
                userName: data.userName,
                quizTitle: data.quizTitle,
                score: data.score,
                date: data.date,
                language: data.language
            });

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real implementation, you would call:
            // const emailData: EmailData = {
            //     to: '', // Will be set by EmailService
            //     subject: `Quiz Report - ${data.userName} - ${data.quizTitle}`,
            //     htmlContent: this.generateHTMLContent(data),
            //     userName: data.userName,
            //     quizTitle: data.quizTitle,
            //     score: data.score,
            //     date: data.date,
            //     language: data.language
            // };
            // await EmailService.sendToSkinStudio(emailData);

        } catch (error) {
            ErrorLogger.log(error as Error, 'Send Report to Skin Studio');
            throw new Error(`Failed to send report to Skin Studio: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Send report to user's email
     * @param data - Report data
     * @param userEmail - User's email address
     */
    public static async sendToUserEmail(data: HTMLReportData, userEmail: string): Promise<void> {
        try {
            // Generate HTML content
            const htmlContent = this.generateHTMLContent(data);

            // Create email data
            const emailData: EmailData = {
                to: userEmail,
                subject: `${data.language === 'ro' ? 'Raportul tău de îngrijire a pielii' : 'Your Skin Care Report'} - Skin Studio`,
                htmlContent: htmlContent,
                userName: data.userName,
                quizTitle: data.quizTitle,
                score: data.score,
                date: data.date,
                language: data.language
            };

            // Send to user
            await EmailService.sendToUser(emailData);

        } catch (error) {
            ErrorLogger.log(error as Error, 'Send Report to User Email');
            throw new Error(`Failed to send report to user email: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Generate HTML content for the report
     * @param data - Report data
     * @returns HTML string
     */
    private static generateHTMLContent(data: HTMLReportData): string {
        // Get localized result text
        let localizedResult = data.resultText || 'No result text available';
        if (data.quizResult && typeof data.quizResult.text !== 'undefined') {
            if (typeof data.quizResult.text === 'string') {
                localizedResult = data.quizResult.text;
            } else {
                localizedResult = data.quizResult.text[data.language || 'ro'] || data.resultText || 'No result text available';
            }
        }

        // Parse result text to separate sections
        const lines = localizedResult.split('\n');
        const skinTypeLine = lines[0] || 'No skin type information available';

        // Parse the result text into structured sections
        const resultSections = this.parseResultText(localizedResult);

        // Import translations for medical disclaimer and scientific references
        const { translations } = require('../translations');
        const currentTranslations = translations[data.language || 'ro'];

        const t = {
            ro: {
                reportFor: 'Raport pentru:',
                testCompleted: 'Test completat:',
                scoreObtained: 'Scor obținut:',
                testResult: 'Rezultatul Testului:',
                scientificRefs: '📚 Referințe Științifice:',
                skinType: 'Tipul de Piele:',
                aging: 'Îmbătrânirea Pielii:',
                lifestyle: 'Stilul de Viață:',
                ingredients: 'Ingrediente Recomandate:',
                additionalNotes: 'Note Adiționale:',
                professionalAdvice: 'Sfaturi Profesionale:',
                date: 'Data:',
                subtitle: 'Raport Personalizat de Îngrijire a Pielii',
                printReport: 'Imprimați Raportul',
                closeWindow: 'Închideți Fereastra',
                sendToEmail: 'Trimiteți pe Email',
                sendToSkinStudio: 'Trimiteți la Skin Studio',
                enterEmail: 'Introduceți adresa de email:',
                enterContactInfo: 'Informații de contact:',
                nameLabel: 'Numele complet:',
                emailLabel: 'Email:',
                phoneLabel: 'Telefon (opțional):',
                messageLabel: 'Mesaj (opțional):',
                subscribeUpdates: 'Vreau să primesc actualizări și oferte de la Skin Studio',
                sendButton: 'Trimiteți',
                sending: 'Se trimite...',
                sentSuccess: 'Raport trimis cu succes!',
                sentError: 'Eroare la trimiterea raportului.',
                emailRequired: 'Adresa de email este obligatorie.',
                nameRequired: 'Numele este obligatoriu.',
                contactInfoRequired: 'Informațiile de contact sunt obligatorii.',
                recommendations: 'Recomandări Personalizate:',
                naturalProducts: 'Produse Naturale Recomandate:',
                dailyRoutine: 'Rutina Zilnică:',
                lifestyleTips: 'Sfaturi pentru Stilul de Viață:',
                ingredientsToAvoid: 'Ingrediente de Evitat:',
                medicalDisclaimer: currentTranslations.quizResultForm.medicalDisclaimer.title,
                medicalDisclaimerText: currentTranslations.quizResultForm.medicalDisclaimer.text,
                scientificReferences: currentTranslations.quiz.scientificReferences.title,
                agingStudies: currentTranslations.quiz.scientificReferences.agingStudies,
                skinTypeStudies: currentTranslations.quiz.scientificReferences.skinTypeStudies
            },
            en: {
                reportFor: 'Report for:',
                testCompleted: 'Test completed:',
                scoreObtained: 'Score obtained:',
                testResult: 'Test Result:',
                scientificRefs: '📚 Scientific References:',
                skinType: 'Skin Type:',
                aging: 'Skin Aging:',
                lifestyle: 'Lifestyle:',
                ingredients: 'Recommended Ingredients:',
                additionalNotes: 'Additional Notes:',
                professionalAdvice: 'Professional Advice:',
                date: 'Date:',
                subtitle: 'Personalized Skin Care Report',
                printReport: 'Print Report',
                closeWindow: 'Close Window',
                sendToEmail: 'Send to Email',
                sendToSkinStudio: 'Send to Skin Studio',
                enterEmail: 'Enter email address:',
                enterContactInfo: 'Contact Information:',
                nameLabel: 'Full Name:',
                emailLabel: 'Email:',
                phoneLabel: 'Phone (optional):',
                messageLabel: 'Message (optional):',
                subscribeUpdates: 'I want to receive updates and offers from Skin Studio',
                sendButton: 'Send',
                sending: 'Sending...',
                sentSuccess: 'Report sent successfully!',
                sentError: 'Error sending report.',
                emailRequired: 'Email address is required.',
                nameRequired: 'Name is required.',
                contactInfoRequired: 'Contact information is required.',
                recommendations: 'Personalized Recommendations:',
                naturalProducts: 'Recommended Natural Products:',
                dailyRoutine: 'Daily Routine:',
                lifestyleTips: 'Lifestyle Tips:',
                ingredientsToAvoid: 'Ingredients to Avoid:',
                medicalDisclaimer: currentTranslations.quizResultForm.medicalDisclaimer.title,
                medicalDisclaimerText: currentTranslations.quizResultForm.medicalDisclaimer.text,
                scientificReferences: currentTranslations.quiz.scientificReferences.title,
                agingStudies: currentTranslations.quiz.scientificReferences.agingStudies,
                skinTypeStudies: currentTranslations.quiz.scientificReferences.skinTypeStudies
            }
        };

        const currentT = t[data.language || 'ro'];

        // Create a simple test HTML to see if basic generation works
        const simpleTestHTML = `
<!DOCTYPE html>
<html lang="${data.language || 'ro'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skin Studio - ${data.quizTitle || 'Quiz'} Report</title>
    
    <!-- EmailJS for email functionality -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    
    <!-- reCAPTCHA for EmailJS security -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    
    <script type="text/javascript">
        (function () {
            emailjs.init(window.EMAILJS_CONFIG.PUBLIC_KEY);
        })();
    </script>
    
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            text-align: center;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        .section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }
        
        .section h2 {
            color: #2c3e50;
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 1.5em;
        }
        
        .section h3 {
            color: #34495e;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 1.3em;
        }
        
        .info-box {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        
        .result-section {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        
        .recommendations-section {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        
        .natural-products-section {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        
        .lifestyle-section {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        
        .scientific-refs {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        
        .actions {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 5px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background-color: #3498db;
            color: white;
        }
        
        .btn-success {
            background-color: #27ae60;
            color: white;
        }
        
        .btn-info {
            background-color: #17a2b8;
            color: white;
        }
        
        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        ul {
            padding-left: 20px;
        }
        
        li {
            margin-bottom: 8px;
        }
        
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
            background-color: white;
            margin: 2% auto;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .close {
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            color: #aaa;
        }
        
        .close:hover {
            color: #000;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .form-group textarea {
            height: 100px;
            resize: vertical;
        }
        
        .checkbox-group {
            margin: 15px 0;
        }
        
        .checkbox-label {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            cursor: pointer;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .checkbox-label input[type="checkbox"] {
            width: auto;
            margin: 0;
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        .checkbox-text {
            color: #333;
        }
        
        .modal-actions {
            text-align: right;
            margin-top: 20px;
        }
        
        .message {
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
            font-weight: 600;
        }
        
        .message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        @media print {
            .actions, .modal {
                display: none !important;
            }
            
            body {
                background: white;
            }
            
            .container {
                box-shadow: none;
            }
        }
        
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .container {
                padding: 20px;
            }
            
            .section {
                padding: 15px;
                margin-bottom: 20px;
            }
            
            .section h2 {
                font-size: 1.3em;
            }
            
            .section h3 {
                font-size: 1.1em;
            }
            
            .result-section,
            .recommendations-section,
            .natural-products-section,
            .lifestyle-section,
            .scientific-refs {
                padding: 12px;
                margin-bottom: 15px;
            }
            
            .btn {
                display: block;
                width: 100%;
                margin: 5px 0;
                padding: 15px;
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <img src="/logo.png" alt="Skin Studio Logo" style="height: 60px; width: auto; margin-right: 15px;">
                <h1 style="margin: 0;">Skin Studio</h1>
            </div>
            <p>${currentT.subtitle}</p>
            <p>${currentT.date} ${data.date || new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
            <h2>${currentT.reportFor} ${data.userName || 'User'}</h2>
            <div class="info-box">
                <p><strong>${currentT.testCompleted}</strong> ${data.quizTitle || 'Quiz'}</p>
                <p><strong>${currentT.scoreObtained}</strong> ${data.score || 0}</p>
            </div>
        </div>

        <div class="section">
            <h2>${currentT.testResult}</h2>
            
            <!-- Skin Type Result -->
            <div class="result-section">
                <h3>${skinTypeLine}</h3>
                ${resultSections.description ? `<p>${resultSections.description}</p>` : ''}
            </div>
            
            <!-- Recommendations from Quiz Result -->
            ${resultSections.recommendations ? `
            <div class="recommendations-section">
                <h3>${currentT.recommendations}</h3>
                <ul>
                    ${resultSections.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            <!-- Natural Products Recommendations (only for relevant quiz types) -->
            ${this.generateNaturalProductsSection(data, currentT)}
            
            <!-- Scientific References from Quiz Result (only if not already in dedicated section) -->
            ${resultSections.references && !this.shouldShowDedicatedScientificSection(data) ? `
            <div class="scientific-refs">
                <h3>${currentT.scientificRefs}</h3>
                <ul>
                    ${resultSections.references.map(ref => `<li>${ref}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>

        <!-- Dedicated Scientific References Section (only for specific quiz types) -->
        ${this.shouldShowDedicatedScientificSection(data) ? `
        <div class="section">
            <h2>${currentT.scientificReferences}</h2>
            <div class="info-box">
                ${this.generateScientificReferencesSection(data, currentT)}
            </div>
        </div>
        ` : ''}

        <!-- Medical Disclaimer Section -->
        <div class="section">
            <h2>${currentT.medicalDisclaimer}</h2>
            <div class="info-box" style="background-color: #fff3cd; border-left: 4px solid #ffc107;">
                <p style="margin: 0; color: #856404; font-size: 0.95rem; line-height: 1.5;">
                    ${currentT.medicalDisclaimerText}
                </p>
            </div>
        </div>

        <div class="actions">
            <button class="btn btn-success" onclick="downloadReport()">📥 Download</button>
            <button class="btn btn-primary" onclick="window.print()">🖨️ Print</button>
            <button class="btn btn-info" onclick="showSkinStudioModal()">📧 ${currentT.sendToSkinStudio}</button>
            <button class="btn btn-secondary" onclick="window.close()">❌ Cancel</button>
        </div>
    </div>

    <!-- Skin Studio Contact Modal -->
    <div id="skinStudioModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>${currentT.sendToSkinStudio}</h3>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div id="modalMessage"></div>
            <form id="contactForm">
                <div class="form-group">
                    <label for="contactName">${currentT.nameLabel} *</label>
                    <input type="text" id="contactName" required>
                </div>
                <div class="form-group">
                    <label for="contactEmail">${currentT.emailLabel} *</label>
                    <input type="email" id="contactEmail" required>
                </div>
                <div class="form-group">
                    <label for="contactPhone">${currentT.phoneLabel}</label>
                    <input type="tel" id="contactPhone">
                </div>
                <div class="form-group">
                    <label for="contactMessage">${currentT.messageLabel}</label>
                    <textarea id="contactMessage" placeholder="Tell us about your skin care needs..."></textarea>
                </div>
                <div class="form-group checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="subscribeUpdates">
                        <span class="checkbox-text">${data.language === 'ro' ? 'Accept să primesc conținut personalizat de la Skin Studio' : 'I accept to receive personalized content from Skin Studio'}</span>
                    </label>
                </div>
                <div class="form-group">
                    <div class="g-recaptcha" data-sitekey="6Ld7ZTYUAAAAAGgBvCrSeiQrUBLw55jP8hetKuer"></div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">${currentT.closeWindow}</button>
                    <button type="submit" class="btn btn-primary">${currentT.sendButton}</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // EmailJS Configuration
        window.EMAILJS_CONFIG = {
            SERVICE_ID: 'service_b0eycgy',
            TEMPLATE_ID: 'template_cursor',
            PUBLIC_KEY: 'qpMdCwldZeAqODpQR' // ✅ Updated to your EmailJS public key
        };

        // Show Skin Studio modal
        function showSkinStudioModal() {
            document.getElementById('skinStudioModal').style.display = 'block';
        }

        // Close modal
        function closeModal() {
            document.getElementById('skinStudioModal').style.display = 'none';
            document.getElementById('modalMessage').innerHTML = '';
            document.getElementById('contactForm').reset();
            // Reset reCAPTCHA
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
        }

        // Handle form submission
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const message = document.getElementById('contactMessage').value;
            const subscribeUpdates = document.getElementById('subscribeUpdates').checked;
            
            if (!name || !email) {
                showMessage('${currentT.nameRequired}', 'error');
                return;
            }

            showMessage('${currentT.sending}', 'success');
            
            try {
                // Prepare the data to send
                const contactData = {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    subscribeUpdates: subscribeUpdates,
                    userName: '${data.userName}',
                    quizTitle: '${data.quizTitle}',
                    score: ${data.score},
                    date: '${data.date}',
                    language: '${data.language || 'ro'}',
                    htmlContent: document.documentElement.outerHTML
                };

                // Send contact information to Skin Studio
                await sendContactToSkinStudio(contactData);
                
                showMessage('${currentT.sentSuccess}', 'success');
                
                setTimeout(() => {
                    closeModal();
                }, 3000);
                
            } catch (error) {
                console.error('Error sending:', error);
                showMessage('${currentT.sentError}', 'error');
            }
        });

        // Function to send contact to Skin Studio
        async function sendContactToSkinStudio(data) {
            try {
                console.log('Starting to send contact to Skin Studio...');
                console.log('EmailJS available:', typeof emailjs !== 'undefined');
                console.log('EmailJS config:', window.EMAILJS_CONFIG);
                
                // Use EmailJS directly since we're in a generated HTML file
                if (typeof emailjs === 'undefined') {
                    throw new Error('EmailJS is not available. Please check if it is properly loaded.');
                }

                // Get reCAPTCHA response
                const recaptchaResponse = grecaptcha.getResponse();
                if (!recaptchaResponse) {
                    showMessage(data.language === 'ro' ? 'Vă rugăm să completați verificarea reCAPTCHA' : 'Please complete the reCAPTCHA verification', 'error');
                    return;
                }

                // Create a clean report content without scripts and unnecessary elements
                const reportContent = document.querySelector('.container').innerHTML;
                
                const templateParams = {
                    from_page: 'Skin Studio Quiz App',
                    user_name: data.userName,
                    from_email: data.email,
                    quiz_title: data.quizTitle,
                    quiz_score: data.score,
                    quiz_result: reportContent,
                    name: data.name,
                    email: data.email,
                    phone: data.phone || '',
                    message: data.message || '',
                    date: data.date,
                    language: data.language || 'ro',
                    user_accepts_subscription: data.subscribeUpdates,
                    'g-recaptcha-response': recaptchaResponse
                };

                console.log('Sending with template params:', templateParams);
                console.log('User accepts subscription:', data.subscribeUpdates);

                const response = await emailjs.send(
                    window.EMAILJS_CONFIG.SERVICE_ID,
                    window.EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams,
                    window.EMAILJS_CONFIG.PUBLIC_KEY
                );

                console.log('EmailJS response:', response);
                return response;

            } catch (error) {
                console.error('EmailJS error:', error);
                throw new Error('Failed to send contact information: ' + error.message);
            }
        }

        // Function to send report to user email
        async function sendReportToUser(email) {
            try {
                // Get reCAPTCHA response
                const recaptchaResponse = grecaptcha.getResponse();
                if (!recaptchaResponse) {
                    throw new Error('Please complete the reCAPTCHA verification.');
                }

                const reportContent = document.querySelector('.container').innerHTML;
                
                const templateParams = {
                    from_page: 'Skin Studio Quiz App',
                    user_name: '${data.userName}',
                    from_email: 'noreply@skinstudio.app',
                    to_email: email,
                    quiz_title: '${data.quizTitle}',
                    quiz_score: ${data.score},
                    quiz_result: reportContent,
                    date: '${data.date}',
                    language: '${data.language || 'ro'}',
                    'g-recaptcha-response': recaptchaResponse
                };

                const response = await emailjs.send(
                    window.EMAILJS_CONFIG.SERVICE_ID,
                    'template_user_report', // You'll need to create this template
                    templateParams,
                    window.EMAILJS_CONFIG.PUBLIC_KEY
                );

                console.log('Report sent to user:', response);
                return response;

            } catch (error) {
                console.error('Error sending report to user:', error);
                throw new Error('Failed to send report to user: ' + error.message);
            }
        }

        // Function to show messages
        function showMessage(message, type) {
            const messageDiv = document.getElementById('modalMessage');
            messageDiv.innerHTML = '<div class="message ' + type + '">' + message + '</div>';
        }

        // Function to download report as HTML
        function downloadReport() {
            const content = document.documentElement.outerHTML;
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'skin-studio-report-${data.userName}-${new Date().toISOString().split('T')[0]}.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('skinStudioModal');
            if (event.target === modal) {
                closeModal();
            }
        }
    </script>
</body>
</html>`;

        return simpleTestHTML;
    }

    /**
     * Parse result text into structured sections
     */
    private static parseResultText(resultText: string): {
        description: string;
        recommendations: string[];
        references: string[];
    } {
        const lines = resultText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        let description = '';
        const recommendations: string[] = [];
        const references: string[] = [];

        let currentSection = 'description';

        for (const line of lines) {
            if (line.includes('•') && !line.includes('📚')) {
                // This is a recommendation
                recommendations.push(line.replace(/^•\s*/, ''));
            } else if (line.includes('📚') || line.includes('Scientific references') || line.includes('Referințe științifice')) {
                currentSection = 'references';
            } else if (currentSection === 'references' && line.includes('•')) {
                // This is a reference
                references.push(line.replace(/^•\s*/, ''));
            } else if (currentSection === 'description' && !line.includes('📚') && !line.includes('Scientific references') && !line.includes('Referințe științifice')) {
                // This is part of the description
                if (description) {
                    description += ' ' + line;
                } else {
                    description = line;
                }
            }
        }

        return {
            description,
            recommendations,
            references
        };
    }

    /**
     * Generate natural products recommendations section
     */
    private static generateNaturalProductsSection(data: HTMLReportData, currentT: any): string {
        // Import the recommendations data
        const { SKIN_TYPE_RECOMMENDATIONS, AGING_RECOMMENDATIONS, getAgingCategoryFromScore } = require('../data/skinCareRecommendations');

        let skinRecommendation = null;
        let agingRecommendation = null;

        // Determine quiz type and get appropriate recommendations
        const isAgingQuiz = data.quizTitle?.toLowerCase().includes('aging') || data.quizTitle?.toLowerCase().includes('îmbătrânire');
        const isSkinTypeQuiz = data.quizTitle?.toLowerCase().includes('skin type') || data.quizTitle?.toLowerCase().includes('tip de piele');

        // Only show skin type recommendations for skin type quiz
        if (isSkinTypeQuiz) {
            const skinType = this.getSkinTypeFromResult(data.resultText);
            skinRecommendation = SKIN_TYPE_RECOMMENDATIONS[skinType]?.[data.language || 'ro'];
        }

        // Only show aging recommendations for aging quiz
        if (isAgingQuiz) {
            const agingCategory = getAgingCategoryFromScore(data.score);
            agingRecommendation = AGING_RECOMMENDATIONS[agingCategory]?.[data.language || 'ro'];
        }

        let html = '';

        // Show skin type recommendations only for skin type quiz
        if (skinRecommendation && isSkinTypeQuiz) {
            html += `
            <div class="natural-products-section">
                <h3>${currentT.naturalProducts} - ${currentT.skinType}</h3>
                
                <div class="recommendations-section">
                    <h4>${currentT.dailyRoutine}</h4>
                    <ul>
                        ${skinRecommendation.dailyRoutine.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="recommendations-section">
                    <h4>${currentT.ingredients}</h4>
                    <ul>
                        ${skinRecommendation.ingredients.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="lifestyle-section">
                    <h4>${currentT.lifestyleTips}</h4>
                    <ul>
                        ${skinRecommendation.lifestyleTips.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="lifestyle-section">
                    <h4>${currentT.ingredientsToAvoid}</h4>
                    <ul>
                        ${skinRecommendation.avoidIngredients.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>`;
        }

        // Show aging recommendations only for aging quiz
        if (agingRecommendation && isAgingQuiz) {
            html += `
            <div class="natural-products-section">
                <h3>${currentT.naturalProducts} - ${currentT.aging}</h3>
                
                <div class="recommendations-section">
                    <h4>${currentT.dailyRoutine}</h4>
                    <ul>
                        ${agingRecommendation.antiAgingRoutine.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="lifestyle-section">
                    <h4>${currentT.lifestyleTips}</h4>
                    <ul>
                        ${agingRecommendation.lifestyleChanges.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                ${agingRecommendation.professionalTreatments ? `
                <div class="lifestyle-section">
                    <h4>${data.language === 'ro' ? 'Tratamente Profesionale' : 'Professional Treatments'}</h4>
                    <ul>
                        ${agingRecommendation.professionalTreatments.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${agingRecommendation.preventionTips ? `
                <div class="lifestyle-section">
                    <h4>${data.language === 'ro' ? 'Sfaturi de Prevenție' : 'Prevention Tips'}</h4>
                    <ul>
                        ${agingRecommendation.preventionTips.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>`;
        }

        return html;
    }

    /**
     * Generate scientific references section
     */
    private static generateScientificReferencesSection(data: HTMLReportData, currentT: any): string {
        let html = '';

        // Determine which studies to show based on quiz type
        const isAgingQuiz = data.quizTitle?.toLowerCase().includes('aging') || data.quizTitle?.toLowerCase().includes('îmbătrânire');
        const isSkinTypeQuiz = data.quizTitle?.toLowerCase().includes('skin type') || data.quizTitle?.toLowerCase().includes('tip de piele');

        // Show aging studies only for aging quiz
        if (isAgingQuiz) {
            html += `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px;">${data.language === 'ro' ? 'Studii de Îmbătrânire' : 'Aging Studies'}</h4>
                <ul style="padding-left: 20px;">
                    ${currentT.agingStudies.map((study: string) => `<li style="margin-bottom: 8px; color: #555;">${study}</li>`).join('')}
                </ul>
            </div>`;
        }

        // Show skin type studies only for skin type quiz
        if (isSkinTypeQuiz) {
            html += `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px;">${data.language === 'ro' ? 'Studii de Tip de Piele' : 'Skin Type Studies'}</h4>
                <ul style="padding-left: 20px;">
                    ${currentT.skinTypeStudies.map((study: string) => `<li style="margin-bottom: 8px; color: #555;">${study}</li>`).join('')}
                </ul>
            </div>`;
        }

        // For other quiz types (like non-toxic), show a general scientific reference
        if (!isAgingQuiz && !isSkinTypeQuiz) {
            html += `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px;">${data.language === 'ro' ? 'Studii Științifice' : 'Scientific Studies'}</h4>
                <ul style="padding-left: 20px;">
                    <li style="margin-bottom: 8px; color: #555;">${data.language === 'ro' ? 'Studii de siguranță a ingredientelor cosmetice' : 'Cosmetic ingredient safety studies'}</li>
                    <li style="margin-bottom: 8px; color: #555;">${data.language === 'ro' ? 'Cercetări despre efectele ingredientelor naturale asupra pielii' : 'Research on natural ingredient effects on skin'}</li>
                </ul>
            </div>`;
        }

        return html;
    }

    /**
     * Determine if a dedicated scientific references section should be shown.
     * This is true if the quiz is an aging quiz or a skin type quiz.
     */
    private static shouldShowDedicatedScientificSection(data: HTMLReportData): boolean {
        return data.quizTitle?.toLowerCase().includes('aging') || data.quizTitle?.toLowerCase().includes('îmbătrânire') ||
            data.quizTitle?.toLowerCase().includes('skin type') || data.quizTitle?.toLowerCase().includes('tip de piele');
    }

    /**
     * Get skin type from result text
     */
    private static getSkinTypeFromResult(resultText: string): string {
        const lowerText = resultText.toLowerCase();

        if (lowerText.includes('dry') || lowerText.includes('uscat')) return 'dry';
        if (lowerText.includes('oily') || lowerText.includes('gras')) return 'oily';
        if (lowerText.includes('combination') || lowerText.includes('mixt')) return 'normal-mixed';
        if (lowerText.includes('sensitive') || lowerText.includes('sensibil')) return 'sensitive';
        if (lowerText.includes('normal') || lowerText.includes('normal')) return 'normal-mixed';

        return 'normal-mixed'; // default
    }

} 