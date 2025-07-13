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

        // Parse result text to separate skin type and description
        const lines = localizedResult.split('\n');
        const skinTypeLine = lines[0] || 'No skin type information available';
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

        // Create a simple test HTML to see if basic generation works
        const simpleTestHTML = `
<!DOCTYPE html>
<html lang="${data.language || 'ro'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skin Studio - ${data.quizTitle || 'Quiz'} Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #9c27b0;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #9c27b0;
            margin: 0;
        }
        .section {
            margin-bottom: 25px;
        }
        .section h2 {
            color: #9c27b0;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }
        .info-box {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #9c27b0;
        }
        .actions {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        .btn {
            padding: 10px 20px;
            margin: 0 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        .btn-primary {
            background-color: #9c27b0;
            color: white;
        }
        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }
        .btn-success {
            background-color: #28a745;
            color: white;
        }
        .btn-info {
            background-color: #17a2b8;
            color: white;
        }
        .btn:hover {
            opacity: 0.8;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        .modal-content {
            background-color: white;
            margin: 15% auto;
            padding: 20px;
            border-radius: 10px;
            width: 80%;
            max-width: 500px;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .close {
            color: #aaa;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
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
            font-weight: bold;
        }
        .form-group input, .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .form-group textarea {
            height: 100px;
            resize: vertical;
        }
        .modal-actions {
            text-align: right;
            margin-top: 20px;
        }
        .modal-actions .btn {
            margin-left: 10px;
        }
        .message {
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
            text-align: center;
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Skin Studio</h1>
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
            <div class="info-box">
                <h3>${skinTypeLine}</h3>
                ${descriptionLines.length > 0 ? `<p>${descriptionLines.join(' ')}</p>` : '<p>No detailed description available.</p>'}
            </div>
        </div>

        <div class="section">
            <h2>${currentT.scientificRefs}</h2>
            <div class="info-box">
                <ul>
                    <li>Journal of Clinical and Aesthetic Dermatology, 2021</li>
                    <li>International Journal of Cosmetic Science, 2020</li>
                    <li>Journal of the American Academy of Dermatology, 2021</li>
                    <li>British Journal of Dermatology, 2020</li>
                </ul>
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
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="sendReportToEmail"> ${data.language === 'ro' ? 'Trimite-mi raportul pe email' : 'Send me the report by email'}
                    </label>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">${currentT.closeWindow}</button>
                    <button type="submit" class="btn btn-primary">${currentT.sendButton}</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Show Skin Studio modal
        function showSkinStudioModal() {
            document.getElementById('skinStudioModal').style.display = 'block';
        }

        // Close modal
        function closeModal() {
            document.getElementById('skinStudioModal').style.display = 'none';
            document.getElementById('modalMessage').innerHTML = '';
            document.getElementById('contactForm').reset();
        }

        // Handle form submission
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const message = document.getElementById('contactMessage').value;
            const sendReportToEmail = document.getElementById('sendReportToEmail').checked;
            
            if (!name || !email) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            showMessage('Sending to Skin Studio...', 'success');
            
            try {
                // Prepare the data to send
                const contactData = {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    subscribeUpdates: false,
                    userName: '${data.userName}',
                    quizTitle: '${data.quizTitle}',
                    score: ${data.score},
                    date: '${data.date}',
                    language: '${data.language || 'ro'}',
                    htmlContent: document.documentElement.outerHTML
                };

                // Send contact information to Skin Studio
                await sendContactToSkinStudio(contactData);
                
                // If user requested the report by email, send it
                if (sendReportToEmail) {
                    showMessage('Sending report to your email...', 'success');
                    await sendReportToUser(email);
                }
                
                showMessage('Message sent successfully to Skin Studio!' + (sendReportToEmail ? ' Report also sent to your email.' : ''), 'success');
                
                setTimeout(() => {
                    closeModal();
                }, 3000);
                
            } catch (error) {
                console.error('Error sending:', error);
                showMessage('Error sending message. Please try again.', 'error');
            }
        });

        // Function to send contact to Skin Studio
        async function sendContactToSkinStudio(data) {
            try {
                // Import the EmailService dynamically
                const { EmailService } = await import('./emailService');
                
                await EmailService.sendContactToSkinStudio(data);
                console.log('Contact sent to Skin Studio successfully');
            } catch (error) {
                console.error('Error sending contact to Skin Studio:', error);
                throw error;
            }
        }

        // Function to send report to user's email
        async function sendReportToUser(email) {
            try {
                // Import the EmailService dynamically
                const { EmailService } = await import('./emailService');
                
                const emailData = {
                    to: email,
                    htmlContent: document.documentElement.outerHTML,
                    userName: '${data.userName}',
                    quizTitle: '${data.quizTitle}',
                    score: ${data.score},
                    date: '${data.date}',
                    language: '${data.language || 'ro'}'
                };
                
                await EmailService.sendToUser(emailData);
                console.log('Report sent to user email successfully');
            } catch (error) {
                console.error('Error sending report to user:', error);
                throw error;
            }
        }

        // Show message in modal
        function showMessage(text, type) {
            const messageDiv = document.getElementById('modalMessage');
            messageDiv.innerHTML = '<div class="message ' + type + '">' + text + '</div>';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('skinStudioModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Download report as HTML file
        function downloadReport() {
            const htmlContent = document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'skin-studio-report.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
        `;

        return simpleTestHTML;
    }
} 