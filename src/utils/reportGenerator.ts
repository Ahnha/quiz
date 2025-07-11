import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface QuizResultData {
    id: string;
    timestamp: string;
    quizName: string;
    score: number;
    result: string;
    userEmail: string;
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
        this.doc.rect(0, 0, this.pageWidth, 40, 'F');

        // Add logo placeholder
        this.doc.setFillColor(255, 255, 255);
        this.doc.circle(30, 20, 8, 'F');

        // Add title
        this.doc.setTextColor(255, 255, 255);
        this.doc.setFontSize(24);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Skin Studio', 50, 25);

        // Add subtitle
        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text('Natural Beauty Assessment Report', 50, 35);

        this.currentY = 50;
    }

    private addReportInfo(data: QuizResultData) {
        // Report metadata section
        this.doc.setFillColor(248, 249, 250);
        this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 30, 'F');

        this.doc.setTextColor(73, 80, 87);
        this.doc.setFontSize(10);
        this.doc.setFont('helvetica', 'normal');

        const reportDate = new Date(data.timestamp).toLocaleDateString();
        const reportTime = new Date(data.timestamp).toLocaleTimeString();

        this.doc.text(`Report Date: ${reportDate}`, this.margin + 5, this.currentY + 10);
        this.doc.text(`Report Time: ${reportTime}`, this.margin + 5, this.currentY + 18);
        this.doc.text(`Report ID: ${data.id}`, this.margin + 5, this.currentY + 26);

        this.doc.text(`Generated for: ${data.userEmail}`, this.pageWidth - this.margin - 5, this.currentY + 10, { align: 'right' });
        this.doc.text(`Quiz Type: ${data.quizName}`, this.pageWidth - this.margin - 5, this.currentY + 18, { align: 'right' });

        this.currentY += 40;
    }

    private addQuizResults(data: QuizResultData) {
        // Main results section
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(18);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Your Assessment Results', this.margin, this.currentY);

        this.currentY += 20;

        // Score display with visual indicator
        const scorePercentage = this.calculateScorePercentage(data.score, data.quizName);

        // Score circle
        this.doc.setFillColor(6, 182, 212); // Teal
        this.doc.circle(this.margin + 30, this.currentY + 15, 25, 'F');

        this.doc.setTextColor(255, 255, 255);
        this.doc.setFontSize(16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(`${scorePercentage}%`, this.margin + 30, this.currentY + 20, { align: 'center' });

        // Score details
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(14);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Your Score', this.margin + 70, this.currentY + 10);

        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text(`Raw Score: ${data.score}`, this.margin + 70, this.currentY + 20);
        this.doc.text(`Performance: ${this.getPerformanceLevel(scorePercentage)}`, this.margin + 70, this.currentY + 30);

        this.currentY += 50;
    }

    private addDetailedAnalysis(data: QuizResultData) {
        // Detailed analysis section
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Detailed Analysis', this.margin, this.currentY);

        this.currentY += 15;

        // Analysis box
        this.doc.setFillColor(248, 249, 250);
        this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 40, 'F');

        this.doc.setTextColor(73, 80, 87);
        this.doc.setFontSize(11);
        this.doc.setFont('helvetica', 'normal');

        // Split result text into lines
        const words = data.result.split(' ');
        let line = '';
        let lineCount = 0;
        const maxWidth = this.pageWidth - 2 * this.margin - 10;

        for (const word of words) {
            const testLine = line + word + ' ';
            const testWidth = this.doc.getTextWidth(testLine);

            if (testWidth > maxWidth && line !== '') {
                this.doc.text(line, this.margin + 5, this.currentY + 10 + (lineCount * 8));
                line = word + ' ';
                lineCount++;
            } else {
                line = testLine;
            }
        }

        if (line) {
            this.doc.text(line, this.margin + 5, this.currentY + 10 + (lineCount * 8));
        }

        this.currentY += 50;
    }

    private addRecommendations(data: QuizResultData) {
        // Recommendations section
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Personalized Recommendations', this.margin, this.currentY);

        this.currentY += 15;

        const recommendations = this.getRecommendations(data);

        recommendations.forEach((rec, index) => {
            // Recommendation box
            this.doc.setFillColor(240, 248, 255);
            this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 25, 'F');

            // Icon
            this.doc.setFillColor(249, 115, 22); // Coral
            this.doc.circle(this.margin + 10, this.currentY + 12, 3, 'F');

            this.doc.setTextColor(33, 37, 41);
            this.doc.setFontSize(11);
            this.doc.setFont('helvetica', 'bold');
            this.doc.text(rec.title, this.margin + 20, this.currentY + 8);

            this.doc.setFontSize(10);
            this.doc.setFont('helvetica', 'normal');
            this.doc.text(rec.description, this.margin + 20, this.currentY + 18);

            this.currentY += 30;
        });
    }

    private addNextSteps() {
        // Next steps section
        this.doc.setTextColor(33, 37, 41);
        this.doc.setFontSize(16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Next Steps', this.margin, this.currentY);

        this.currentY += 15;

        const steps = [
            'Schedule a consultation with our skincare experts',
            'Explore our recommended natural products',
            'Follow your personalized skincare routine',
            'Track your progress and schedule follow-up assessments'
        ];

        steps.forEach((step, index) => {
            this.doc.setTextColor(73, 80, 87);
            this.doc.setFontSize(10);
            this.doc.setFont('helvetica', 'normal');

            // Step number
            this.doc.setFillColor(6, 182, 212); // Teal
            this.doc.circle(this.margin + 8, this.currentY + 5, 4, 'F');

            this.doc.setTextColor(255, 255, 255);
            this.doc.setFontSize(8);
            this.doc.setFont('helvetica', 'bold');
            this.doc.text((index + 1).toString(), this.margin + 8, this.currentY + 7, { align: 'center' });

            // Step text
            this.doc.setTextColor(33, 37, 41);
            this.doc.setFontSize(10);
            this.doc.setFont('helvetica', 'normal');
            this.doc.text(step, this.margin + 20, this.currentY + 10);

            this.currentY += 15;
        });
    }

    private addFooter() {
        // Footer
        this.doc.setFillColor(248, 249, 250);
        this.doc.rect(0, this.pageHeight - 30, this.pageWidth, 30, 'F');

        this.doc.setTextColor(108, 117, 125);
        this.doc.setFontSize(8);
        this.doc.setFont('helvetica', 'normal');

        this.doc.text('Skin Studio - Natural Beauty Assessment Report', this.margin, this.pageHeight - 15);
        this.doc.text('Generated with ❤️ for your natural beauty journey', this.pageWidth - this.margin, this.pageHeight - 15, { align: 'right' });

        // Page number - using proper type assertion for jsPDF
        try {
            const pageCount = (this.doc as any).getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                this.doc.setPage(i);
                this.doc.text(`Page ${i} of ${pageCount}`, this.pageWidth / 2, this.pageHeight - 5, { align: 'center' });
            }
        } catch (error) {
            // Fallback if getNumberOfPages is not available
            this.doc.text('Page 1', this.pageWidth / 2, this.pageHeight - 5, { align: 'center' });
        }
    }

    private calculateScorePercentage(score: number, quizName: string): number {
        // Calculate percentage based on quiz type
        const maxScores = {
            'Skin Type Quiz': 20,
            'Aging Quiz': 25,
            'Non-Toxic Quiz': 30
        };

        const maxScore = maxScores[quizName as keyof typeof maxScores] || 25;
        return Math.round((score / maxScore) * 100);
    }

    private getPerformanceLevel(percentage: number): string {
        if (percentage >= 90) return 'Excellent';
        if (percentage >= 80) return 'Very Good';
        if (percentage >= 70) return 'Good';
        if (percentage >= 60) return 'Fair';
        return 'Needs Improvement';
    }

    private getRecommendations(data: QuizResultData) {
        const recommendations = [
            {
                title: 'Personalized Skincare Routine',
                description: 'Based on your assessment, we recommend a customized daily routine.'
            },
            {
                title: 'Natural Product Selection',
                description: 'Choose products that align with your skin type and concerns.'
            },
            {
                title: 'Lifestyle Adjustments',
                description: 'Consider dietary and environmental factors that affect your skin health.'
            }
        ];

        return recommendations;
    }

    public generateReport(data: QuizResultData, options: ReportOptions = {}): jsPDF {
        this.doc = new jsPDF();
        this.pageWidth = this.doc.internal.pageSize.getWidth();
        this.pageHeight = this.doc.internal.pageSize.getHeight();

        this.addHeader();
        this.addReportInfo(data);
        this.addQuizResults(data);
        this.addDetailedAnalysis(data);
        this.addRecommendations(data);
        this.addNextSteps();
        this.addFooter();

        return this.doc;
    }

    public downloadReport(data: QuizResultData, options: ReportOptions = {}): void {
        const doc = this.generateReport(data, options);
        const fileName = `skin-studio-report-${data.quizName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`;
        doc.save(fileName);
    }
}

export default ReportGenerator; 