import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface QuizResultData {
    id: string;
    timestamp: string;
    quizName: string;
    score: number;
    result: string;
    userEmail: string;
    userName: string; // Make name mandatory
    sendToOwner: boolean;
    answers?: number[];
}

interface ReportOptions {
    includeLogo?: boolean;
    includeCharts?: boolean;
    includeRecommendations?: boolean;
    language?: 'en' | 'ro';
}

export class ReportGenerator {
    private doc: jsPDF;
    private currentY: number = 20;
    private pageWidth: number;
    private pageHeight: number;
    private margin: number = 20;
    private language: 'en' | 'ro';

    constructor(language: 'en' | 'ro' = 'en') {
        this.doc = new jsPDF();
        this.pageWidth = this.doc.internal.pageSize.getWidth();
        this.pageHeight = this.doc.internal.pageSize.getHeight();
        this.language = language;
    }

    private addHeader() {
        // Add gradient-like header background
        this.doc.setFillColor(6, 182, 212); // Teal
        this.doc.rect(0, 0, this.pageWidth, 50, 'F');

        // Add logo (Skin Studio text as logo)
        this.doc.setTextColor(255, 255, 255);
        this.doc.setFontSize(28);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('🌸 Skin Studio', 30, 25);

        // Add subtitle
        this.doc.setFontSize(14);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text('Natural Beauty Assessment Report', 30, 40);

        this.currentY = 60;
    }

    private addReportInfo(data: QuizResultData) {
        // Report metadata section with better spacing
        this.doc.setFillColor(248, 249, 250);
        this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 40, 'F');

        this.doc.setTextColor(73, 80, 87);
        this.doc.setFontSize(11);
        this.doc.setFont('helvetica', 'normal');

        const reportDate = new Date(data.timestamp).toLocaleDateString();
        const reportTime = new Date(data.timestamp).toLocaleTimeString();

        // Left column
        this.doc.text(`Report Date: ${reportDate}`, this.margin + 5, this.currentY + 12);
        this.doc.text(`Report Time: ${reportTime}`, this.margin + 5, this.currentY + 22);
        this.doc.text(`Report ID: ${data.id}`, this.margin + 5, this.currentY + 32);

        // Right column
        this.doc.text(`Generated for: ${data.userName}`, this.pageWidth - this.margin - 5, this.currentY + 12, { align: 'right' });
        this.doc.text(`Email: ${data.userEmail}`, this.pageWidth - this.margin - 5, this.currentY + 22, { align: 'right' });
        this.doc.text(`Quiz Type: ${data.quizName}`, this.pageWidth - this.margin - 5, this.currentY + 32, { align: 'right' });

        this.currentY += 50;
    }

    private addQuizResults(data: QuizResultData) {
        // Main results section
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(20);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Your Assessment Results', this.margin, this.currentY);

        this.currentY += 25;

        // Score display with modern progress bar instead of pie chart
        const scorePercentage = this.calculateScorePercentage(data.score, data.quizName);

        // Create a modern progress bar
        const barWidth = this.pageWidth - 2 * this.margin;
        const barHeight = 20;
        const barX = this.margin;
        const barY = this.currentY;

        // Background bar
        this.doc.setFillColor(240, 240, 240);
        this.doc.rect(barX, barY, barWidth, barHeight, 'F');

        // Progress bar
        const progressWidth = (barWidth * scorePercentage) / 100;
        this.doc.setFillColor(6, 182, 212); // Teal
        this.doc.rect(barX, barY, progressWidth, barHeight, 'F');

        // Percentage text on the bar
        this.doc.setTextColor(255, 255, 255);
        this.doc.setFontSize(14);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(`${scorePercentage}%`, barX + (barWidth / 2), barY + 13, { align: 'center' });

        this.currentY += 30;

        // Score details with better typography
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Score Details', this.margin, this.currentY);

        this.currentY += 15;

        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text(`Raw Score: ${data.score}`, this.margin, this.currentY);
        this.currentY += 8;
        this.doc.text(`Performance Level: ${this.getPerformanceLevel(scorePercentage)}`, this.margin, this.currentY);
        this.currentY += 8;
        this.doc.text(`Assessment Date: ${new Date(data.timestamp).toLocaleDateString()}`, this.margin, this.currentY);

        this.currentY += 25;
    }

    private addDetailedAnalysis(data: QuizResultData) {
        // Detailed analysis section with proper text wrapping
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(18);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Detailed Analysis', this.margin, this.currentY);

        this.currentY += 20;

        // Calculate text wrapping properly
        const maxWidth = this.pageWidth - 2 * this.margin - 10;
        const words = data.result.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const testWidth = this.doc.getTextWidth(testLine);

            if (testWidth > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }

        // Calculate proper height based on actual lines
        const lineHeight = 12;
        const padding = 20;
        const totalHeight = Math.max(60, lines.length * lineHeight + padding);

        // Analysis box with proper height
        this.doc.setFillColor(248, 249, 250);
        this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, totalHeight, 'F');

        // Add border
        this.doc.setDrawColor(220, 220, 220);
        this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, totalHeight, 'S');

        // Render text with proper spacing
        this.doc.setTextColor(73, 80, 87);
        this.doc.setFontSize(11);
        this.doc.setFont('helvetica', 'normal');

        lines.forEach((line, index) => {
            this.doc.text(line, this.margin + 10, this.currentY + 15 + (index * lineHeight));
        });

        this.currentY += totalHeight + 20;
    }

    private addScientificJournals() {
        // Scientific journals section under results
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Scientific References', this.margin, this.currentY);

        this.currentY += 15;

        const journals = [
            'Journal of Cosmetic Dermatology',
            'International Journal of Dermatology',
            'Journal of the American Academy of Dermatology',
            'British Journal of Dermatology',
            'Clinical, Cosmetic and Investigational Dermatology'
        ];

        this.doc.setFontSize(10);
        this.doc.setFont('helvetica', 'normal');
        this.doc.setTextColor(73, 80, 87);

        journals.forEach((journal, index) => {
            this.doc.text(`${index + 1}. ${journal}`, this.margin, this.currentY);
            this.currentY += 8;
        });

        this.currentY += 20;
    }

    private addPersonalRecommendations(data: QuizResultData) {
        // Personal recommendations section (separate section for future content)
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(18);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Personal Recommendations', this.margin, this.currentY);

        this.currentY += 20;

        // Placeholder box for future recommendations
        this.doc.setFillColor(255, 248, 220); // Light yellow background
        this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 60, 'F');

        // Add border
        this.doc.setDrawColor(255, 193, 7);
        this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 60, 'S');

        this.doc.setTextColor(73, 80, 87);
        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'italic');
        this.doc.text('Personalized recommendations will be added here.', this.margin + 10, this.currentY + 20);
        this.doc.text('This section will contain specific advice tailored to your results.', this.margin + 10, this.currentY + 35);

        this.currentY += 80;
    }

    private addNextSteps() {
        // Next steps section
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Next Steps', this.margin, this.currentY);

        this.currentY += 15;

        const steps = [
            'Schedule a consultation with a dermatologist',
            'Start implementing the recommended skincare routine',
            'Monitor your skin\'s response to new products',
            'Consider lifestyle changes for better skin health',
            'Follow up with Skin Studio for personalized products'
        ];

        this.doc.setFontSize(11);
        this.doc.setFont('helvetica', 'normal');
        this.doc.setTextColor(73, 80, 87);

        steps.forEach((step, index) => {
            this.doc.text(`${index + 1}. ${step}`, this.margin, this.currentY);
            this.currentY += 10;
        });

        this.currentY += 20;
    }

    private addFooter() {
        // Footer with contact information
        this.doc.setFillColor(248, 249, 250);
        this.doc.rect(0, this.pageHeight - 40, this.pageWidth, 40, 'F');

        this.doc.setTextColor(73, 80, 87);
        this.doc.setFontSize(10);
        this.doc.setFont('helvetica', 'normal');

        const footerText = 'Skin Studio - Natural Beauty Assessment Report';
        const footerWidth = this.doc.getTextWidth(footerText);
        this.doc.text(footerText, (this.pageWidth - footerWidth) / 2, this.pageHeight - 25);

        this.doc.text('Generated on: ' + new Date().toLocaleDateString(), this.margin, this.pageHeight - 15);
        this.doc.text('Contact: info@skinstudio.com', this.pageWidth - this.margin - 5, this.pageHeight - 15, { align: 'right' });
    }

    private calculateScorePercentage(score: number, quizName: string): number {
        // Calculate percentage based on quiz type with correct maximum scores
        const maxScores = {
            'What Is Your Skin Type?': 65,  // 13 questions × 5 points each
            'How Well Is Your Skin Aging?': 75,      // 15 questions × 5 points each
            'How Non-Toxic Is Your Life?': 75   // 15 questions × 5 points each
        };

        const maxScore = maxScores[quizName as keyof typeof maxScores] || 75;
        const percentage = Math.round((score / maxScore) * 100);

        // Ensure percentage doesn't exceed 100%
        return Math.min(percentage, 100);
    }

    private getPerformanceLevel(percentage: number): string {
        if (percentage >= 90) return 'Excellent';
        if (percentage >= 80) return 'Very Good';
        if (percentage >= 70) return 'Good';
        if (percentage >= 60) return 'Fair';
        return 'Needs Improvement';
    }

    public generateReport(data: QuizResultData, options: ReportOptions = {}): jsPDF {
        // Ensure name is provided
        if (!data.userName || data.userName.trim() === '') {
            throw new Error('User name is required for report generation');
        }

        this.addHeader();
        this.addReportInfo(data);
        this.addQuizResults(data);
        this.addDetailedAnalysis(data);
        this.addScientificJournals();
        this.addPersonalRecommendations(data);
        this.addNextSteps();
        this.addFooter();

        return this.doc;
    }

    public downloadReport(data: QuizResultData, options: ReportOptions = {}): void {
        const report = this.generateReport(data, options);
        const fileName = `skin-studio-report-${data.userName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`;
        report.save(fileName);
    }
}

export default ReportGenerator; 