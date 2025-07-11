// PATTERN: Service Layer - PDF Generation Service
// Handles the creation of professional PDF reports with skin care recommendations

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

    private static addHeader(doc: jsPDF, data: PDFData): void {
        // Add logo placeholder
        doc.setFillColor(156, 39, 176);
        doc.rect(20, 20, 40, 40, 'F');
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

    private static addUserInfo(doc: jsPDF, data: PDFData): void {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text(`Raport pentru: ${data.userName}`, 20, 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`Test completat: ${data.quizTitle}`, 20, 105);
        doc.text(`Scor obținut: ${data.score}`, 20, 115);

        // Add result text
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(156, 39, 176);
        doc.text('Rezultat:', 20, 135);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        const resultLines = doc.splitTextToSize(data.resultText, 170);
        doc.text(resultLines, 20, 145);
    }

    private static addSkinTypeSection(doc: jsPDF, data: PDFData, startY: number): number {
        const skinRec = data.skinRecommendation;
        let currentY = startY;

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
        return new Promise((resolve, reject) => {
            try {
                this.doc = new jsPDF();
                this.pageWidth = this.doc.internal.pageSize.getWidth();
                this.pageHeight = this.doc.internal.pageSize.getHeight();

                // Add header
                this.addHeader(this.doc, data);

                // Add user info and results
                this.addUserInfo(this.doc, data);

                // Add skin type section
                let currentY = this.addSkinTypeSection(this.doc, data, 160);

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
                resolve(pdfBlob);

            } catch (error) {
                ErrorLogger.log(error as Error, 'PDF Generation');
                reject(error);
            }
        });
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