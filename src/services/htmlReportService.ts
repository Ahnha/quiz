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
        let localizedResult = data.resultText;
        if (data.quizResult && typeof data.quizResult.text !== 'undefined') {
            if (typeof data.quizResult.text === 'string') {
                localizedResult = data.quizResult.text;
            } else {
                localizedResult = data.quizResult.text[data.language || 'ro'] || data.resultText;
            }
        }

        // Parse result text to separate skin type and description
        const lines = localizedResult.split('\n');
        const skinTypeLine = lines[0] || '';
        const descriptionLines = lines.slice(1).filter(line => line.trim() && !line.includes('✔') && !line.includes('📚'));

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
                contactInfoRequired: 'Informațiile de contact sunt obligatorii.'
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
                contactInfoRequired: 'Contact information is required.'
            }
        };

        const currentT = t[data.language || 'ro'];

        return `
<!DOCTYPE html>
<html lang="${data.language || 'ro'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skin Studio - ${data.quizTitle} Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            border-bottom: 3px solid #9c27b0;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #9c27b0, #e91e63);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }
        
        .header-text h1 {
            color: #9c27b0;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        
        .header-text p {
            color: #666;
            margin: 5px 0 0 0;
            font-size: 14px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            color: #9c27b0;
            font-size: 20px;
            margin-bottom: 15px;
            font-weight: bold;
        }
        
        .section h3 {
            color: #333;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        
        .info-box {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #9c27b0;
            margin-bottom: 15px;
        }
        
        .info-box p {
            color: #555;
            margin: 8px 0;
            font-size: 16px;
        }
        
        .info-box strong {
            color: #333;
        }
        
        .scientific-refs ul {
            margin: 0;
            padding-left: 20px;
            color: #555;
            font-size: 14px;
        }
        
        .scientific-refs li {
            margin-bottom: 5px;
        }
        
        .footer {
            border-top: 2px solid #9c27b0;
            padding-top: 20px;
            margin-top: 40px;
            text-align: center;
        }
        
        .footer p {
            color: #666;
            margin: 0;
            font-size: 12px;
        }
        
        .actions {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
            z-index: 1000;
            flex-direction: column;
        }
        
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-primary {
            background-color: #9c27b0;
            color: white;
        }
        
        .btn-primary:hover {
            background-color: #7b1fa2;
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background-color: #5a6268;
            transform: translateY(-2px);
        }

        .btn-success {
            background-color: #28a745;
            color: white;
        }
        
        .btn-success:hover {
            background-color: #218838;
            transform: translateY(-2px);
        }

        .btn-info {
            background-color: #17a2b8;
            color: white;
        }
        
        .btn-info:hover {
            background-color: #138496;
            transform: translateY(-2px);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #333;
        }
        
        .form-group label input[type="checkbox"] {
            margin-right: 8px;
            transform: scale(1.2);
        }
        
        .email-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        textarea.email-input {
            resize: vertical;
            min-height: 80px;
        }
        
        .email-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.45);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .email-modal.show {
            display: flex;
        }
        
        .email-modal-content {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18);
            padding: 32px 24px 24px 24px;
            max-width: 400px;
            width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .email-modal h3 {
            color: #9c27b0;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .email-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        .email-input:focus {
            outline: none;
            border-color: #9c27b0;
        }
        
        .email-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        
        .message {
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 15px;
            text-align: center;
            font-weight: 500;
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
        
        /* Mobile responsive styles for the modal */
        @media (max-width: 768px) {
            .email-modal {
                padding: 10px;
                align-items: flex-start;
                padding-top: 20px;
            }
            
            .email-modal-content {
                padding: 20px;
                max-height: calc(100vh - 40px);
                max-height: calc(100dvh - 40px);
                margin: 0;
                border-radius: 8px;
            }
            
            .email-modal h3 {
                font-size: 18px;
                margin-bottom: 15px;
            }
            
            .email-input {
                font-size: 16px; /* Prevents zoom on iOS */
                padding: 12px;
            }
            
            .email-actions {
                flex-direction: column;
                gap: 8px;
            }
            
            .email-actions .btn {
                width: 100%;
                padding: 12px;
                font-size: 16px;
            }
        }
        
        @media (max-width: 480px) {
            .email-modal {
                padding: 5px;
                padding-top: 10px;
            }
            
            .email-modal-content {
                padding: 15px;
                max-height: calc(100vh - 20px);
                max-height: calc(100dvh - 20px);
                overflow-y: auto;
                -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
            }
            
            .form-group {
                margin-bottom: 12px;
            }
            
            .form-group label {
                font-size: 14px;
                margin-bottom: 4px;
            }
            
            /* Ensure inputs don't cause zoom on iOS */
            input[type="text"], input[type="email"], input[type="tel"], textarea {
                font-size: 16px !important;
            }
        }
        
        @media print {
            .actions {
                display: none;
            }
            
            body {
                background-color: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
                border-radius: 0;
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="actions">
        <button class="btn btn-primary" onclick="window.print()">${currentT.printReport}</button>
        <button class="btn btn-info" onclick="showSkinStudioModal()">${currentT.sendToSkinStudio}</button>
        <button class="btn btn-secondary" onclick="window.close()">${currentT.closeWindow}</button>
    </div>



    <!-- Skin Studio Modal -->
    <div id="skinStudioModal" class="email-modal">
        <div class="email-modal-content">
            <div style="position: relative;">
                <button onclick="hideSkinStudioModal()" style="position: absolute; top: -10px; right: -10px; background: #ff4757; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;">×</button>
                <h3>${currentT.sendToSkinStudio}</h3>
            <div id="skinStudioMessage"></div>
            <div class="form-group">
                <label for="contactName">${currentT.nameLabel} <span style="color: red;">*</span></label>
                <input type="text" id="contactName" class="email-input" placeholder="${currentT.nameLabel}" />
            </div>
            <div class="form-group">
                <label for="contactEmail">${currentT.emailLabel} <span style="color: red;">*</span></label>
                <input type="email" id="contactEmail" class="email-input" placeholder="${currentT.emailLabel}" />
            </div>
            <div class="form-group">
                <label for="contactPhone">${currentT.phoneLabel}</label>
                <input type="tel" id="contactPhone" class="email-input" placeholder="${currentT.phoneLabel}" />
            </div>
            <div class="form-group">
                <label for="contactMessage">${currentT.messageLabel}</label>
                <textarea id="contactMessage" class="email-input" rows="3" placeholder="${currentT.messageLabel}"></textarea>
            </div>
            <div class="form-group">
                <label for="subscribeUpdates">
                    <input type="checkbox" id="subscribeUpdates" /> ${currentT.subscribeUpdates}
                </label>
            </div>
            <div class="email-actions">
                <button class="btn btn-primary" onclick="sendToSkinStudio()" id="sendSkinStudioBtn">${currentT.sendButton}</button>
                <button class="btn btn-secondary" onclick="hideSkinStudioModal()">${currentT.closeWindow}</button>
            </div>
        </div>
    </div>
    
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                ${data.logoUrl ?
                `<img src="${data.logoUrl}" alt="${data.logoAlt || 'Skin Studio Logo'}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;">` :
                'SS'
            }
            </div>
            <div class="header-text">
                <h1>Skin Studio</h1>
                <p>${currentT.subtitle}</p>
                <p>${currentT.date} ${data.date}</p>
            </div>
        </div>

        <!-- Medical Disclaimer -->
        <div class="section" style="margin-bottom: 20px;">
            <div style="background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <h3 style="color: #856404; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                    <span>⚠️</span>
                    ${data.language === 'ro' ? 'Disclaimer Medical' : 'Medical Disclaimer'}
                </h3>
                <p style="color: #856404; font-size: 14px; line-height: 1.4; margin: 0;">
                    ${data.language === 'ro'
                ? 'Această informație se bazează pe propria mea cercetare și nu reprezintă sfaturi medicale. Recomandările furnizate sunt doar în scop educațional și nu ar trebui să înlocuiască consultația medicală profesională. Consultă întotdeauna cu un furnizor de îngrijire medicală calificat sau dermatolog pentru probleme medicale, afecțiuni ale pielii sau înainte de a începe orice rutină nouă de îngrijire a pielii.'
                : 'This information is based on my own research and does not represent medical advice. The recommendations provided are for educational purposes only and should not replace professional medical consultation. Always consult with a qualified healthcare provider or dermatologist for medical concerns, skin conditions, or before starting any new skincare routine.'
            }
                </p>
            </div>
        </div>

        <!-- User Information -->
        <div class="section">
            <h2>${currentT.reportFor} ${data.userName}</h2>
            <div class="info-box">
                <p><strong>${currentT.testCompleted}</strong> ${data.quizTitle}</p>
                <p><strong>${currentT.scoreObtained}</strong> ${data.score}</p>
            </div>
        </div>

        <!-- Test Result -->
        <div class="section">
            <h2>${currentT.testResult}</h2>
            <div class="info-box">
                <h3>${skinTypeLine.replace(/[🟢🟡🔵🟠⚪]/g, '').trim()}</h3>
                ${descriptionLines.length > 0 ? `<p>${descriptionLines.join(' ')}</p>` : ''}
            </div>
        </div>

        <!-- Scientific References -->
        <div class="section">
            <h2>${currentT.scientificRefs}</h2>
            <div class="info-box scientific-refs">
                <ul>
                    <li>Journal of Clinical and Aesthetic Dermatology, 2021</li>
                    <li>International Journal of Cosmetic Science, 2020</li>
                    <li>Journal of the American Academy of Dermatology, 2021</li>
                    <li>British Journal of Dermatology, 2020</li>
                    <li>Clinical, Cosmetic and Investigational Dermatology, 2021</li>
                    <li>Journal of Dermatological Science, 2020</li>
                </ul>
            </div>
        </div>

        ${data.skinRecommendation ? `
        <!-- Skin Type Section -->
        <div class="section">
            <h2>${currentT.skinType}</h2>
            <div class="info-box">
                <p><strong>${data.skinRecommendation[data.language || 'ro'].title}</strong></p>
                ${data.skinRecommendation[data.language || 'ro'].description ? `<p>${data.skinRecommendation[data.language || 'ro'].description}</p>` : ''}
            </div>
        </div>
        ` : ''}

        ${data.agingRecommendation ? `
        <!-- Aging Section -->
        <div class="section">
            <h2>${currentT.aging}</h2>
            <div class="info-box">
                <p><strong>${data.agingRecommendation[data.language || 'ro'].title}</strong></p>
                ${data.agingRecommendation[data.language || 'ro'].description ? `<p>${data.agingRecommendation[data.language || 'ro'].description}</p>` : ''}
            </div>
        </div>
        ` : ''}

        <!-- Additional Notes -->
        <div class="section">
            <h2>${currentT.additionalNotes}</h2>
            <div class="info-box">
                <p style="font-style: italic;">
                    ${data.language === 'ro'
                ? 'Acest raport este generat automat pe baza răspunsurilor tale la test. Pentru recomandări personalizate și consultații profesionale, te invităm să contactezi Skin Studio.'
                : 'This report is automatically generated based on your test responses. For personalized recommendations and professional consultations, we invite you to contact Skin Studio.'
            }
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>© 2024 Skin Studio. ${data.language === 'ro' ? 'Toate drepturile rezervate.' : 'All rights reserved.'}</p>
        </div>
    </div>

    <script>
        function showSkinStudioModal() {
            const modal = document.getElementById('skinStudioModal');
            modal.classList.add('show');
            
            // Prevent body scroll on mobile
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            
            // Focus on first input
            document.getElementById('contactName').focus();
            
            // Ensure modal is visible on mobile
            setTimeout(() => {
                modal.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        
        function hideSkinStudioModal() {
            const modal = document.getElementById('skinStudioModal');
            modal.classList.remove('show');
            
            // Restore body scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            
            // Clear form
            document.getElementById('skinStudioMessage').innerHTML = '';
            document.getElementById('contactName').value = '';
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactPhone').value = '';
            document.getElementById('contactMessage').value = '';
            document.getElementById('subscribeUpdates').checked = false; // Reset checkbox
        }
        
        function isValidEmail(email) {
            // Simple email validation without regex escaping issues
            const atIndex = email.indexOf('@');
            const dotIndex = email.lastIndexOf('.');
            return atIndex > 0 && dotIndex > atIndex && dotIndex < email.length - 1;
        }
        
        async function sendToSkinStudio() {
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            const subscribeUpdates = document.getElementById('subscribeUpdates').checked;
            const messageDiv = document.getElementById('skinStudioMessage');
            const sendBtn = document.getElementById('sendSkinStudioBtn');
            
            if (!name) {
                messageDiv.innerHTML = '<div class="message error">${currentT.nameRequired}</div>';
                return;
            }
            
            if (!email) {
                messageDiv.innerHTML = '<div class="message error">${currentT.emailRequired}</div>';
                return;
            }
            
            if (!isValidEmail(email)) {
                messageDiv.innerHTML = '<div class="message error">${data.language === 'ro' ? 'Adresa de email nu este validă.' : 'Invalid email address.'}</div>';
                return;
            }
            
            sendBtn.disabled = true;
            sendBtn.textContent = '${currentT.sending}';
            messageDiv.innerHTML = '';
            
            try {
                // Simulate sending to Skin Studio
                console.log('Sending contact form to Skin Studio:', {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    subscribeUpdates: subscribeUpdates,
                    userName: '${data.userName}',
                    quizTitle: '${data.quizTitle}',
                    score: ${data.score},
                    date: '${data.date}',
                    language: '${data.language || 'ro'}'
                });

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                messageDiv.innerHTML = '<div class="message success">${currentT.sentSuccess}</div>';
                
                // Clear form
                document.getElementById('contactName').value = '';
                document.getElementById('contactEmail').value = '';
                document.getElementById('contactPhone').value = '';
                document.getElementById('contactMessage').value = '';
                document.getElementById('subscribeUpdates').checked = false; // Reset checkbox
                
                setTimeout(() => {
                    hideSkinStudioModal();
                }, 2000);

                // In a real implementation, you would make a fetch call like this:
                // const response = await fetch('/api/send-to-skin-studio', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         name: name,
                //         email: email,
                //         phone: phone,
                //         message: message,
                //         subscribeUpdates: subscribeUpdates,
                //         userName: '${data.userName}',
                //         quizTitle: '${data.quizTitle}',
                //         score: ${data.score},
                //         date: '${data.date}',
                //         language: '${data.language || 'ro'}',
                //         htmlContent: document.documentElement.outerHTML
                //     })
                // });
                
                // if (response.ok) {
                //     const result = await response.json();
                //     if (result.success) {
                //         messageDiv.innerHTML = '<div class="message success">${currentT.sentSuccess}</div>';
                //         // Clear form and close modal...
                //     } else {
                //         throw new Error(result.error || 'Failed to send to Skin Studio');
                //     }
                // } else {
                //     throw new Error('Failed to send to Skin Studio');
                // }
            } catch (error) {
                console.error('Skin Studio sending error:', error);
                messageDiv.innerHTML = '<div class="message error">${currentT.sentError}</div>';
            } finally {
                sendBtn.disabled = false;
                sendBtn.textContent = '${currentT.sendButton}';
            }
        }
        
        // Close modal when clicking outside
        document.getElementById('skinStudioModal').addEventListener('click', function(e) {
            if (e.target === this) {
                hideSkinStudioModal();
            }
        });
        
        // Handle Enter key in contact form
        document.getElementById('contactName').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('contactEmail').focus();
            }
        });
        
        document.getElementById('contactEmail').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('contactPhone').focus();
            }
        });
        
        document.getElementById('contactPhone').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('contactMessage').focus();
            }
        });
        
        document.getElementById('contactMessage').addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                sendToSkinStudio();
            }
        });
    </script>
</body>
</html>
        `;
    }
} 