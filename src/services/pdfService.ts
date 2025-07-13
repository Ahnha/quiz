// PATTERN: Service Layer - PDF Generation Service
// Handles the creation of professional PDF reports with skin care recommendations

import jsPDF from 'jspdf';
import { ErrorLogger } from '../config/security';
import { ADDITIONAL_NOTE } from '../data/skinCareRecommendations';

export interface PDFData {
    userName: string;
    quizTitle: string;
    score: number;
    resultText: string;
    skinType: string;
    agingCategory: string;
    skinRecommendation: any;
    agingRecommendation: any;
    date: string;
    // New fields for quiz results
    quizResult?: {
        minScore: number;
        maxScore: number;
        text: string | { ro: string; en: string };
    };
    language?: 'ro' | 'en';
}

/**
 * PDF Service Class
 * 
 * PATTERN: Service Layer Pattern
 * - Handles PDF generation and manipulation
 * - Provides clean interface for PDF operations
 * 
 * PATTERN: Error Handling
 * - Comprehensive error handling and logging
 * - Graceful fallbacks for PDF generation issues
 */
export class PDFService {
    private static doc: jsPDF;
    private static currentY: number = 20;
    private static pageWidth: number;
    private static pageHeight: number;
    private static margin: number = 20;

    // Helper method to set font with diacritics support
    private static setFont(doc: jsPDF, style: 'normal' | 'bold' | 'italic' = 'normal'): void {
        doc.setFont('times', style);
    }

    private static formatDate(): string {
        const now = new Date();
        return now.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Embed logo as base64 data URL (truncated for brevity)
    private static LOGO_BASE64 = "data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAfSgAwAEAAAAAQAAAfQAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAfQB9AMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAICAgICAgQCAgQGBAQEBggGBgYGCAoICAgICAoMCgoKCgoKDAwMDAwMDAwODg4ODg4QEBAQEBISEhISEhISEhL/2wBDAQMDAwUEBQgEBAgTDQsNExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExP/3QAEACD/2gAMAwEAAhEDEQA/AP38ooooAKSlooAKKKKACkpaKACiiigApKWigAK...";

    private static async addHeader(doc: jsPDF, data: PDFData): Promise<void> {
        try {
            // Add logo image (40x40 pixels) from base64
            doc.addImage(PDFService.LOGO_BASE64, 'PNG', 20, 20, 40, 40);
        } catch (error) {
            // Fallback to colored rectangle if logo loading fails
            doc.setFillColor(156, 39, 176);
            doc.rect(20, 20, 40, 40, 'F');
        }

        doc.setTextColor(156, 39, 176);
        doc.setFontSize(24);
        this.setFont(doc, 'bold');
        doc.text('Skin Studio', 70, 35);

        // Add subtitle
        doc.setFontSize(12);
        this.setFont(doc, 'normal');
        doc.setTextColor(100, 100, 100);
        const subtitle = data.language === 'en' ? 'Personalized Skin Care Report' : 'Raport Personalizat de Îngrijire a Pielii';
        doc.text(subtitle, 70, 45);

        // Add date
        const dateLabel = data.language === 'en' ? 'Date: ' : 'Data: ';
        doc.text(`${dateLabel}${data.date}`, 70, 55);

        // Add line separator
        doc.setDrawColor(156, 39, 176);
        doc.setLineWidth(0.5);
        doc.line(20, 70, 190, 70);
    }

    private static addUserInfo(doc: jsPDF, data: PDFData): number {
        doc.setFontSize(16);
        this.setFont(doc, 'bold');
        doc.setTextColor(50, 50, 50);
        const reportFor = data.language === 'en' ? 'Report for: ' : 'Raport pentru: ';
        doc.text(`${reportFor}${data.userName}`, 20, 90);

        doc.setFontSize(12);
        this.setFont(doc, 'normal');
        doc.setTextColor(100, 100, 100);
        const testCompleted = data.language === 'en' ? 'Test completed: ' : 'Test completat: ';
        doc.text(`${testCompleted}${data.quizTitle}`, 20, 105);
        const scoreObtained = data.language === 'en' ? 'Score obtained: ' : 'Scor obținut: ';
        doc.text(`${scoreObtained}${data.score}`, 20, 115);

        return 125; // Return the Y position after user info
    }

    private static addQuizResultSection(doc: jsPDF, data: PDFData, startY: number): number {
        let currentY = startY;

        // Section title
        doc.setFontSize(16);
        this.setFont(doc, 'bold');
        doc.setTextColor(156, 39, 176);
        const testResult = data.language === 'en' ? 'Test Result:' : 'Rezultatul Testului:';
        doc.text(testResult, 20, currentY);
        currentY += 15;

        // Get result text
        let resultText = data.resultText;
        if (data.quizResult && typeof data.quizResult.text === 'object') {
            resultText = data.language === 'en' ? data.quizResult.text.en : data.quizResult.text.ro;
        }

        // Parse result text to separate skin type and description
        const lines = resultText.split('\n');
        const skinTypeLine = lines[0] || '';
        const descriptionLines = lines.slice(1).filter(line => line.trim() && !line.includes('✔') && !line.includes('📚'));

        // Display skin type with larger font
        doc.setFontSize(14);
        this.setFont(doc, 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text(skinTypeLine.replace(/[🟢🟡🔵🟠⚪]/g, '').trim(), 20, currentY);
        currentY += 12;

        // Display description
        if (descriptionLines.length > 0) {
            doc.setFontSize(11);
            this.setFont(doc, 'normal');
            doc.setTextColor(50, 50, 50);

            const descriptionText = descriptionLines.join(' ');
            const descLines = doc.splitTextToSize(descriptionText, 170);
            doc.text(descLines, 20, currentY);
            currentY += (descLines.length * 5) + 10;
        }

        return currentY;
    }

    private static addScientificStudiesSection(doc: jsPDF, data: PDFData, startY: number): number {
        let currentY = startY;

        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 30;
        }

        // Section title
        doc.setFontSize(14);
        this.setFont(doc, 'bold');
        doc.setTextColor(156, 39, 176);
        const scientificRefs = data.language === 'en' ? '📚 Scientific References:' : '📚 Referințe Științifice:';
        doc.text(scientificRefs, 20, currentY);
        currentY += 12;

        // Use structured scientific references instead of parsing text
        const scientificReferences = [
            'Journal of Clinical and Aesthetic Dermatology, 2021',
            'International Journal of Cosmetic Science, 2020',
            'Journal of the American Academy of Dermatology, 2021',
            'British Journal of Dermatology, 2020',
            'Clinical, Cosmetic and Investigational Dermatology, 2021',
            'Journal of Dermatological Science, 2020'
        ];

        doc.setFontSize(10);
        this.setFont(doc, 'normal');
        doc.setTextColor(50, 50, 50);

        scientificReferences.forEach((ref, index) => {
            doc.text(`• ${ref}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

        return currentY;
    }

    private static addRecommendationsSection(doc: jsPDF, data: PDFData, startY: number): number {
        let currentY = startY;

        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 30;
        }

        // Section title
        doc.setFontSize(14);
        this.setFont(doc, 'bold');
        doc.setTextColor(156, 39, 176);
        const personalizedRecs = data.language === 'en' ? '💡 Personalized Recommendations:' : '💡 Recomandări Personalizate:';
        doc.text(personalizedRecs, 20, currentY);
        currentY += 12;

        // Use structured recommendations from skinCareRecommendations
        if (data.skinRecommendation && data.skinRecommendation.recommendedProducts) {
            doc.setFontSize(10);
            this.setFont(doc, 'normal');
            doc.setTextColor(50, 50, 50);

            data.skinRecommendation.recommendedProducts.forEach((product: string, index: number) => {
                doc.text(`• ${product}`, 25, currentY);
                currentY += 6;
            });
            currentY += 5;
        }

        return currentY;
    }

    private static addSkinTypeSection(doc: jsPDF, data: PDFData, startY: number): number {
        const skinRec = data.skinRecommendation;
        let currentY = startY;

        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 30;
        }

        // Validate skinRec exists and has required properties
        if (!skinRec || !skinRec.title || !skinRec.description) {
            // Fallback content if skin recommendation is missing
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(156, 39, 176);
            doc.text('Skin Care Recommendations', 20, currentY);
            currentY += 15;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 50, 50);
            doc.text('Personalized skin care recommendations based on your quiz results.', 20, currentY);
            currentY += 20;
            return currentY;
        }

        // Section title
        doc.setFontSize(16);
        this.setFont(doc, 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text(skinRec.title || 'Skin Care Recommendations', 20, currentY);
        currentY += 15;

        // Description
        doc.setFontSize(11);
        this.setFont(doc, 'normal');
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(skinRec.description || 'Personalized recommendations for your skin type.', 170);
        doc.text(descLines, 20, currentY);
        currentY += (descLines.length * 5) + 10;

        // Daily routine
        if (skinRec.dailyRoutine && Array.isArray(skinRec.dailyRoutine) && skinRec.dailyRoutine.length > 0) {
            doc.setFontSize(13);
            this.setFont(doc, 'bold');
            doc.setTextColor(100, 100, 100);
            const dailyRoutine = data.language === 'en' ? 'Daily Routine:' : 'Rutina Zilnică:';
            doc.text(dailyRoutine, 20, currentY);
            currentY += 10;

            doc.setFontSize(10);
            this.setFont(doc, 'normal');
            skinRec.dailyRoutine.forEach((step: string, index: number) => {
                if (step && typeof step === 'string') {
                    doc.text(`• ${step}`, 25, currentY);
                    currentY += 6;
                }
            });
            currentY += 5;
        }

        // Recommended products
        if (skinRec.recommendedProducts && Array.isArray(skinRec.recommendedProducts) && skinRec.recommendedProducts.length > 0) {
            doc.setFontSize(13);
            this.setFont(doc, 'bold');
            doc.setTextColor(100, 100, 100);
            const recommendedProducts = data.language === 'en' ? 'Recommended Products:' : 'Produse Recomandate:';
            doc.text(recommendedProducts, 20, currentY);
            currentY += 10;

            doc.setFontSize(10);
            this.setFont(doc, 'normal');
            skinRec.recommendedProducts.forEach((product: string, index: number) => {
                if (product && typeof product === 'string') {
                    doc.text(`• ${product}`, 25, currentY);
                    currentY += 6;
                }
            });
            currentY += 5;
        }

        return currentY;
    }

    private static addAgingSection(doc: jsPDF, data: PDFData, startY: number): number {
        const agingRec = data.agingRecommendation;
        let currentY = startY;

        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 30;
        }

        // Validate agingRec exists and has required properties
        if (!agingRec || !agingRec.title || !agingRec.description) {
            // Fallback content if aging recommendation is missing
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(156, 39, 176);
            doc.text('Anti-Aging Recommendations', 20, currentY);
            currentY += 15;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 50, 50);
            doc.text('Personalized anti-aging recommendations based on your quiz results.', 20, currentY);
            currentY += 20;
            return currentY;
        }

        // Section title
        doc.setFontSize(16);
        this.setFont(doc, 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text(agingRec.title || 'Anti-Aging Recommendations', 20, currentY);
        currentY += 15;

        // Description
        doc.setFontSize(11);
        this.setFont(doc, 'normal');
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(agingRec.description || 'Personalized anti-aging recommendations.', 170);
        doc.text(descLines, 20, currentY);
        currentY += (descLines.length * 5) + 10;

        // Anti-aging routine
        if (agingRec.antiAgingRoutine && Array.isArray(agingRec.antiAgingRoutine) && agingRec.antiAgingRoutine.length > 0) {
            doc.setFontSize(13);
            this.setFont(doc, 'bold');
            doc.setTextColor(100, 100, 100);
            const antiAgingRoutine = data.language === 'en' ? 'Anti-Aging Routine:' : 'Rutina Anti-Îmbătrânire:';
            doc.text(antiAgingRoutine, 20, currentY);
            currentY += 10;

            doc.setFontSize(10);
            this.setFont(doc, 'normal');
            agingRec.antiAgingRoutine.forEach((step: string, index: number) => {
                if (step && typeof step === 'string') {
                    doc.text(`• ${step}`, 25, currentY);
                    currentY += 6;
                }
            });
            currentY += 5;
        }

        return currentY;
    }

    private static addLifestyleSection(doc: jsPDF, data: PDFData, startY: number): number {
        const skinRec = data.skinRecommendation;
        const agingRec = data.agingRecommendation;
        let currentY = startY;

        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 30;
        }

        // Lifestyle tips
        if (skinRec && skinRec.lifestyleTips && Array.isArray(skinRec.lifestyleTips) && skinRec.lifestyleTips.length > 0) {
            doc.setFontSize(13);
            this.setFont(doc, 'bold');
            doc.setTextColor(100, 100, 100);
            const lifestyleTips = data.language === 'en' ? 'Lifestyle Tips:' : 'Sfaturi de Stil de Viață:';
            doc.text(lifestyleTips, 20, currentY);
            currentY += 10;

            doc.setFontSize(10);
            this.setFont(doc, 'normal');
            skinRec.lifestyleTips.forEach((tip: string, index: number) => {
                if (tip && typeof tip === 'string') {
                    doc.text(`• ${tip}`, 25, currentY);
                    currentY += 6;
                }
            });
            currentY += 5;
        }

        // Lifestyle changes for aging
        if (agingRec && agingRec.lifestyleChanges && Array.isArray(agingRec.lifestyleChanges) && agingRec.lifestyleChanges.length > 0) {
            doc.setFontSize(13);
            this.setFont(doc, 'bold');
            doc.setTextColor(100, 100, 100);
            const lifestyleChanges = data.language === 'en' ? 'Lifestyle Changes:' : 'Schimbări de Stil de Viață:';
            doc.text(lifestyleChanges, 20, currentY);
            currentY += 10;

            doc.setFontSize(10);
            this.setFont(doc, 'normal');
            agingRec.lifestyleChanges.forEach((change: string, index: number) => {
                if (change && typeof change === 'string') {
                    doc.text(`• ${change}`, 25, currentY);
                    currentY += 6;
                }
            });
            currentY += 5;
        }

        return currentY;
    }

    private static addIngredientsSection(doc: jsPDF, data: PDFData, startY: number): number {
        const skinRec = data.skinRecommendation;
        let currentY = startY;

        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 30;
        }

        // Good ingredients
        if (skinRec && skinRec.ingredients && Array.isArray(skinRec.ingredients) && skinRec.ingredients.length > 0) {
            doc.setFontSize(13);
            this.setFont(doc, 'bold');
            doc.setTextColor(100, 100, 100);
            const beneficialIngredients = data.language === 'en' ? 'Beneficial Ingredients:' : 'Ingrediente Benefice:';
            doc.text(beneficialIngredients, 20, currentY);
            currentY += 10;

            doc.setFontSize(10);
            this.setFont(doc, 'normal');
            skinRec.ingredients.forEach((ingredient: string, index: number) => {
                if (ingredient && typeof ingredient === 'string') {
                    doc.text(`• ${ingredient}`, 25, currentY);
                    currentY += 6;
                }
            });
            currentY += 5;
        }

        // Avoid ingredients
        if (skinRec && skinRec.avoidIngredients && Array.isArray(skinRec.avoidIngredients) && skinRec.avoidIngredients.length > 0) {
            doc.setFontSize(13);
            this.setFont(doc, 'bold');
            doc.setTextColor(100, 100, 100);
            const avoidIngredients = data.language === 'en' ? 'Ingredients to Avoid:' : 'Ingrediente de Evitat:';
            doc.text(avoidIngredients, 20, currentY);
            currentY += 10;

            doc.setFontSize(10);
            this.setFont(doc, 'normal');
            skinRec.avoidIngredients.forEach((ingredient: string, index: number) => {
                if (ingredient && typeof ingredient === 'string') {
                    doc.text(`• ${ingredient}`, 25, currentY);
                    currentY += 6;
                }
            });
            currentY += 5;
        }

        return currentY;
    }

    private static addAdditionalNoteSection(doc: jsPDF, startY: number, language: 'ro' | 'en'): number {
        const note = ADDITIONAL_NOTE[language] || ADDITIONAL_NOTE['ro'];
        let currentY = startY;

        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 30;
        }

        // Section title
        doc.setFontSize(14);
        this.setFont(doc, 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text(note.title, 20, currentY);
        currentY += 12;

        // Description
        doc.setFontSize(10);
        this.setFont(doc, 'normal');
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(note.description, 170);
        doc.text(descLines, 20, currentY);
        currentY += (descLines.length * 5) + 8;

        // Tool name and URL
        doc.setFontSize(11);
        this.setFont(doc, 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(`${note.tool.name}: ${note.tool.url}`, 20, currentY);
        currentY += 10;

        // How to use
        doc.setFontSize(11);
        this.setFont(doc, 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text(language === 'ro' ? 'Cum să folosești:' : 'How to use:', 20, currentY);
        currentY += 8;

        doc.setFontSize(10);
        this.setFont(doc, 'normal');
        doc.setTextColor(50, 50, 50);
        note.howTo.forEach((step, index) => {
            doc.text(`• ${step}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

        // Disclaimer
        doc.setFontSize(9);
        this.setFont(doc, 'italic');
        doc.setTextColor(100, 100, 100);
        const disclaimerLines = doc.splitTextToSize(note.disclaimer, 170);
        doc.text(disclaimerLines, 20, currentY);
        currentY += (disclaimerLines.length * 5) + 10;

        return currentY;
    }

    private static addFooter(doc: jsPDF, data: PDFData): void {
        const pageCount = (doc as any).getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            // Footer line
            doc.setDrawColor(156, 39, 176);
            doc.setLineWidth(0.5);
            doc.line(20, 280, 190, 280);

            // Footer text
            doc.setFontSize(8);
            this.setFont(doc, 'normal');
            doc.setTextColor(100, 100, 100);
            const footerText = data.language === 'en' ? 'Skin Studio - Personalized Skin Care Report' : 'Skin Studio - Raport Personalizat de Îngrijire a Pielii';
            doc.text(footerText, 20, 290);
            const pageText = data.language === 'en' ? `Page ${i} of ${pageCount}` : `Pagina ${i} din ${pageCount}`;
            doc.text(pageText, 150, 290);
        }
    }

    /**
     * Generate PDF with comprehensive error handling
     */
    public static async generatePDF(data: PDFData): Promise<Blob> {
        try {
            this.doc = new jsPDF();
            this.pageWidth = this.doc.internal.pageSize.getWidth();
            this.pageHeight = this.doc.internal.pageSize.getHeight();

            // Add header (now async)
            await this.addHeader(this.doc, data);

            // Add user info and get starting position
            let currentY = this.addUserInfo(this.doc, data);

            // Add quiz result section
            currentY = this.addQuizResultSection(this.doc, data, currentY + 15);

            // Add scientific studies section
            currentY = this.addScientificStudiesSection(this.doc, data, currentY + 15);

            // Add recommendations section
            currentY = this.addRecommendationsSection(this.doc, data, currentY + 15);

            // Add skin type section
            currentY = this.addSkinTypeSection(this.doc, data, currentY + 15);

            // Add aging section
            currentY = this.addAgingSection(this.doc, data, currentY + 10);

            // Add lifestyle section
            currentY = this.addLifestyleSection(this.doc, data, currentY + 10);

            // Add ingredients section
            currentY = this.addIngredientsSection(this.doc, data, currentY + 10);

            // Add additional note section
            currentY = this.addAdditionalNoteSection(this.doc, currentY + 10, data.language || 'ro');

            // Add professional advice
            if (data.skinRecommendation && data.skinRecommendation.professionalAdvice) {
                if (currentY > 250) {
                    this.doc.addPage();
                    currentY = 30;
                }

                this.doc.setFontSize(13);
                this.setFont(this.doc, 'bold');
                this.doc.setTextColor(100, 100, 100);
                const professionalAdvice = data.language === 'en' ? 'Professional Advice:' : 'Sfaturi Profesionale:';
                this.doc.text(professionalAdvice, 20, currentY);
                currentY += 10;

                this.doc.setFontSize(10);
                this.setFont(this.doc, 'normal');
                this.doc.setTextColor(50, 50, 50);
                const adviceLines = this.doc.splitTextToSize(data.skinRecommendation.professionalAdvice || 'Consult with a dermatologist for personalized advice.', 170);
                this.doc.text(adviceLines, 20, currentY);
            }

            // Add footer
            this.addFooter(this.doc, data);

            // Generate blob
            const pdfBlob = this.doc.output('blob');
            return pdfBlob;

        } catch (error) {
            ErrorLogger.log(error as Error, 'PDF Generation');
            throw error;
        }
    }

    /**
     * Download PDF with error handling
     */
    public static downloadPDF(data: PDFData, fileName: string): void {
        try {
            this.generatePDF(data).then((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }).catch((error) => {
                ErrorLogger.log(error as Error, 'PDF Download');
                throw error;
            });
        } catch (error) {
            ErrorLogger.log(error as Error, 'PDF Download');
            throw error;
        }
    }
} 