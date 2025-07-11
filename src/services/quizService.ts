import { QuizDef } from '../quiz/type';
import { QUIZ } from '../utils/constants';

// PATTERN: Service Layer - Business logic separation
// PATTERN: Single Responsibility - Only handles quiz operations
// PATTERN: Dependency Inversion - Depends on abstractions, not concretions

/**
 * Helper function to get localized text
 */
const getLocalizedText = (text: string | { ro: string; en: string }, language: 'en' | 'ro'): string => {
    if (typeof text === 'string') {
        return text;
    }
    return text[language];
};

/**
 * Quiz Service
 * 
 * PATTERN: Service Pattern
 * - Encapsulates business logic for quiz operations
 * - Provides a clean interface for quiz-related functionality
 * 
 * PATTERN: Single Responsibility Principle
 * - Only responsible for quiz business logic
 * 
 * PATTERN: Dependency Inversion Principle
 * - Depends on interfaces, not concrete implementations
 */
export class QuizService {
    /**
     * Calculate quiz progress percentage
     * 
     * PATTERN: Pure Function
     * - No side effects
     * - Always returns the same output for the same input
     */
    static calculateProgress(currentQuestion: number, totalQuestions: number): number {
        if (totalQuestions === 0) return 0;
        return Math.round(((currentQuestion + 1) / totalQuestions) * 100);
    }

    /**
     * Find quiz result based on score
     * 
     * PATTERN: Strategy Pattern
     * - Different strategies for finding results
     * - Easy to extend with new result types
     */
    static findResult(quiz: QuizDef, score: number, language: 'en' | 'ro' = 'en'): string {
        const result = quiz.results.find(r =>
            score >= r.minScore && score <= r.maxScore
        );

        if (result) {
            return getLocalizedText(result.text, language);
        }

        return typeof QUIZ.DEFAULT_RESULT === 'string'
            ? QUIZ.DEFAULT_RESULT
            : getLocalizedText(QUIZ.DEFAULT_RESULT, language);
    }

    /**
     * Find quiz result object based on score
     * 
     * PATTERN: Strategy Pattern
     * - Returns the complete result object for PDF generation
     */
    static findResultObject(quiz: QuizDef, score: number) {
        const result = quiz.results.find(r =>
            score >= r.minScore && score <= r.maxScore
        );

        return result || quiz.results[0];
    }

    /**
     * Validate quiz score
     * 
     * PATTERN: Validation Pattern
     * - Centralized validation logic
     * - Reusable across components
     */
    static validateScore(score: number): boolean {
        return score >= QUIZ.MIN_SCORE && Number.isFinite(score);
    }

    /**
     * Calculate total possible score for a quiz
     * 
     * PATTERN: Utility Function
     * - Pure function for calculations
     * - No side effects
     */
    static calculateMaxScore(quiz: QuizDef): number {
        return quiz.questions.reduce((max, question) => {
            const maxOptionScore = Math.max(...question.options.map(option => option.score));
            return max + maxOptionScore;
        }, 0);
    }

    /**
     * Get quiz statistics
     * 
     * PATTERN: Data Transfer Object
     * - Returns structured data
     * - Clear interface for consumers
     */
    static getQuizStats(quiz: QuizDef) {
        return {
            totalQuestions: quiz.questions.length,
            maxScore: this.calculateMaxScore(quiz),
            averageScore: this.calculateMaxScore(quiz) / 2, // Rough estimate
            difficulty: this.calculateDifficulty(quiz)
        };
    }

    /**
     * Calculate quiz difficulty based on question complexity
     * 
     * PATTERN: Algorithm Pattern
     * - Encapsulates complex calculation logic
     * - Easy to modify difficulty calculation
     */
    private static calculateDifficulty(quiz: QuizDef): 'easy' | 'medium' | 'hard' {
        const totalQuestions = quiz.questions.length;
        const avgOptionsPerQuestion = quiz.questions.reduce((sum, q) => sum + q.options.length, 0) / totalQuestions;

        if (totalQuestions <= 5 && avgOptionsPerQuestion <= 3) return 'easy';
        if (totalQuestions <= 8 && avgOptionsPerQuestion <= 4) return 'medium';
        return 'hard';
    }
} 