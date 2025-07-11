// PATTERN: Service Layer - PDF Generation Service
// Handles the creation of professional PDF reports with skin care recommendations

import jsPDF from 'jspdf';
import { ErrorLogger } from '../config/security';

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

    private static formatDate(): string {
        const now = new Date();
        return now.toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    private static async addHeader(doc: jsPDF, data: PDFData): Promise<void> {
        try {
            // Load and add the logo
            const logoResponse = await fetch('/logo.png');
            const logoBlob = await logoResponse.blob();
            const logoUrl = URL.createObjectURL(logoBlob);

            // Add logo image (40x40 pixels)
            doc.addImage(logoUrl, 'PNG', 20, 20, 40, 40);

            // Clean up the URL
            URL.revokeObjectURL(logoUrl);
        } catch (error) {
            // Fallback to colored rectangle if logo loading fails
            doc.setFillColor(156, 39, 176);
            doc.rect(20, 20, 40, 40, 'F');
        }

        doc.setTextColor(156, 39, 176);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('Skin Studio', 70, 35);

        // Add subtitle
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('Raport Personalizat de Îngrijire a Pielii', 70, 45);

        // Add date
        doc.text(`Data: ${data.date}`, 70, 55);

        // Add line separator
        doc.setDrawColor(156, 39, 176);
        doc.setLineWidth(0.5);
        doc.line(20, 70, 190, 70);
    }

    private static addUserInfo(doc: jsPDF, data: PDFData): number {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text(`Raport pentru: ${data.userName}`, 20, 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`Test completat: ${data.quizTitle}`, 20, 105);
        doc.text(`Scor obținut: ${data.score}`, 20, 115);

        return 125; // Return the Y position after user info
    }

    private static addQuizResultSection(doc: jsPDF, data: PDFData, startY: number): number {
        let currentY = startY;

        // Section title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text('Rezultatul Testului:', 20, currentY);
        currentY += 15;

        // Result text
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);

        let resultText = data.resultText;
        if (data.quizResult && typeof data.quizResult.text === 'object') {
            resultText = data.language === 'en' ? data.quizResult.text.en : data.quizResult.text.ro;
        }

        const resultLines = doc.splitTextToSize(resultText, 170);
        doc.text(resultLines, 20, currentY);
        currentY += (resultLines.length * 5) + 10;

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
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text('📚 Referințe Științifice:', 20, currentY);
        currentY += 12;

        // Extract scientific references from result text
        let resultText = data.resultText;
        if (data.quizResult && typeof data.quizResult.text === 'object') {
            resultText = data.language === 'en' ? data.quizResult.text.en : data.quizResult.text.ro;
        }

        // Look for scientific references in the result text
        const scientificRefs = this.extractScientificReferences(resultText);

        if (scientificRefs.length > 0) {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 50, 50);

            scientificRefs.forEach((ref, index) => {
                doc.text(`• ${ref}`, 25, currentY);
                currentY += 6;
            });
            currentY += 5;
        } else {
            // Default scientific references
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 50, 50);
            doc.text('• Journal of Clinical and Aesthetic Dermatology, 2021', 25, currentY);
            currentY += 6;
            doc.text('• International Journal of Cosmetic Science, 2020', 25, currentY);
            currentY += 6;
            doc.text('• Journal of the American Academy of Dermatology, 2021', 25, currentY);
            currentY += 6;
            doc.text('• British Journal of Dermatology, 2020', 25, currentY);
            currentY += 10;
        }

        return currentY;
    }

    private static extractScientificReferences(text: string): string[] {
        const references: string[] = [];

        // Look for patterns like "Journal of..." or "British Journal of..."
        const refPattern = /([A-Z][a-zA-Z\s&]+Journal[^,\n]*|British Journal[^,\n]*|International Journal[^,\n]*|Clinical[^,\n]*|Dermatology[^,\n]*)/g;
        const matches = text.match(refPattern);

        if (matches) {
            matches.forEach(match => {
                const cleanRef = match.trim().replace(/^[•\s]+/, '');
                if (cleanRef.length > 10) {
                    references.push(cleanRef);
                }
            });
        }

        // If no references found, look for the "📚 Referințe științifice:" section
        if (references.length === 0) {
            const refSection = text.match(/📚 Referințe științifice:\s*\n([\s\S]*?)(?=\n\n|$)/);
            if (refSection) {
                const refLines = refSection[1].split('\n').filter(line => line.trim().startsWith('•'));
                refLines.forEach(line => {
                    const cleanRef = line.trim().replace(/^•\s*/, '');
                    if (cleanRef.length > 5) {
                        references.push(cleanRef);
                    }
                });
            }
        }

        return references;
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
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text('✔ Recomandări de Produse:', 20, currentY);
        currentY += 12;

        // Extract recommendations from result text
        let resultText = data.resultText;
        if (data.quizResult && typeof data.quizResult.text === 'object') {
            resultText = data.language === 'en' ? data.quizResult.text.en : data.quizResult.text.ro;
        }

        const recommendations = this.extractRecommendations(resultText);

        if (recommendations.length > 0) {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 50, 50);

            recommendations.forEach((rec, index) => {
                doc.text(`• ${rec}`, 25, currentY);
                currentY += 6;
            });
            currentY += 5;
        }

        return currentY;
    }

    private static extractRecommendations(text: string): string[] {
        const recommendations: string[] = [];

        // Look for soap recommendations
        const soapPattern = /Săpun[^•\n]*|soap[^•\n]*/gi;
        const matches = text.match(soapPattern);

        if (matches) {
            matches.forEach(match => {
                const cleanRec = match.trim().replace(/^[•\s]+/, '');
                if (cleanRec.length > 5) {
                    recommendations.push(cleanRec);
                }
            });
        }

        // If no recommendations found, look for the "✔ Săpunuri recomandate:" section
        if (recommendations.length === 0) {
            const recSection = text.match(/✔ Săpunuri recomandate:\s*\n([\s\S]*?)(?=\n\n|📚|$)/);
            if (recSection) {
                const recLines = recSection[1].split('\n').filter(line => line.trim().startsWith('•'));
                recLines.forEach(line => {
                    const cleanRec = line.trim().replace(/^•\s*/, '');
                    if (cleanRec.length > 5) {
                        recommendations.push(cleanRec);
                    }
                });
            }
        }

        return recommendations;
    }

    private static addSkinTypeSection(doc: jsPDF, data: PDFData, startY: number): number {
        const skinRec = data.skinRecommendation;
        let currentY = startY;

        // Check if we need a new page
        if (currentY > 250) {
            doc.addPage();
            currentY = 30;
        }

        // Section title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text(skinRec.title, 20, currentY);
        currentY += 15;

        // Description
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(skinRec.description, 170);
        doc.text(descLines, 20, currentY);
        currentY += (descLines.length * 5) + 10;

        // Daily routine
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text('Rutina Zilnică:', 20, currentY);
        currentY += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        skinRec.dailyRoutine.forEach((step: string, index: number) => {
            doc.text(`• ${step}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

        // Recommended products
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text('Produse Recomandate:', 20, currentY);
        currentY += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        skinRec.recommendedProducts.forEach((product: string, index: number) => {
            doc.text(`• ${product}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

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

        // Section title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text(agingRec.title, 20, currentY);
        currentY += 15;

        // Description
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(agingRec.description, 170);
        doc.text(descLines, 20, currentY);
        currentY += (descLines.length * 5) + 10;

        // Anti-aging routine
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text('Rutina Anti-Îmbătrânire:', 20, currentY);
        currentY += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        agingRec.antiAgingRoutine.forEach((step: string, index: number) => {
            doc.text(`• ${step}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

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
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text('Sfaturi de Stil de Viață:', 20, currentY);
        currentY += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        skinRec.lifestyleTips.forEach((tip: string, index: number) => {
            doc.text(`• ${tip}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

        // Lifestyle changes for aging
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text('Schimbări de Stil de Viață:', 20, currentY);
        currentY += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        agingRec.lifestyleChanges.forEach((change: string, index: number) => {
            doc.text(`• ${change}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

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
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text('Ingrediente Benefice:', 20, currentY);
        currentY += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        skinRec.ingredients.forEach((ingredient: string, index: number) => {
            doc.text(`• ${ingredient}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

        // Avoid ingredients
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 100);
        doc.text('Ingrediente de Evitat:', 20, currentY);
        currentY += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        skinRec.avoidIngredients.forEach((ingredient: string, index: number) => {
            doc.text(`• ${ingredient}`, 25, currentY);
            currentY += 6;
        });
        currentY += 5;

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
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text('Skin Studio - Raport Personalizat de Îngrijire a Pielii', 20, 290);
            doc.text(`Pagina ${i} din ${pageCount}`, 150, 290);
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

            // Add professional advice
            if (currentY > 250) {
                this.doc.addPage();
                currentY = 30;
            }

            this.doc.setFontSize(13);
            this.doc.setFont('helvetica', 'bold');
            this.doc.setTextColor(100, 100, 100);
            this.doc.text('Sfaturi Profesionale:', 20, currentY);
            currentY += 10;

            this.doc.setFontSize(10);
            this.doc.setFont('helvetica', 'normal');
            this.doc.setTextColor(50, 50, 50);
            const adviceLines = this.doc.splitTextToSize(data.skinRecommendation.professionalAdvice, 170);
            this.doc.text(adviceLines, 20, currentY);

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