import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getQuizById } from '../quiz/quizzes';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { HTMLReportService, HTMLReportData } from '../services/htmlReportService';
import { generatePDFContent } from '../data/skinCareRecommendations';
import { ErrorLogger } from '../config/security';
import Navbar from './components/Navbar';
import AppFooter from '../components/AppFooter';
import '../styles/quizPage.css';

// Helper function to get localized text
const getLocalizedText = (text: string | { ro: string; en: string }, language: 'en' | 'ro'): string => {
    if (typeof text === 'string') {
        return text;
    }
    return text[language];
};

const QuizPage: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    // Auto scroll to top when navigating to quiz
    useScrollToTop();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    const quiz = getQuizById(quizId || '');

    if (!quiz) {
        return (
            <div className="quiz-page-futuristic">
                <Navbar />
                <main className="quiz-main">
                    <div className="container-futuristic">
                        <div className="quiz-error">
                            <h1>Quiz not found</h1>
                            <p>The quiz you're looking for doesn't exist.</p>
                            <button
                                className="btn-minimal primary"
                                onClick={() => navigate('/quiz')}
                            >
                                Back to Quizzes
                            </button>
                        </div>
                    </div>
                </main>
                <AppFooter />
            </div>
        );
    }

    const handleAnswer = (scoreValue: number) => {
        const newAnswers = [...answers, scoreValue];
        const newScore = score + scoreValue;
        const nextQuestion = currentQuestion + 1;

        setAnswers(newAnswers);
        setScore(newScore);

        if (nextQuestion >= quiz.questions.length) {
            setShowResult(true);
        } else {
            setCurrentQuestion(nextQuestion);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            const lastScore = answers[answers.length - 1];
            const newAnswers = answers.slice(0, -1);

            setAnswers(newAnswers);
            setScore(score - lastScore);
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setAnswers([]);
        setShowResult(false);
    };

    const openReport = async () => {
        setIsGeneratingReport(true);

        try {
            const pdfContent = generatePDFContent(quizTitle, score, resultText, '', quizResult, language);

            const reportData: HTMLReportData = {
                userName: 'User', // Default name for report display
                quizTitle: quizTitle,
                score,
                resultText: resultText,
                skinType: pdfContent.skinType,
                agingCategory: pdfContent.agingCategory,
                skinRecommendation: pdfContent.skinRecommendation,
                agingRecommendation: pdfContent.agingRecommendation,
                quizResult,
                language,
                date: new Date().toLocaleDateString(language === 'ro' ? 'ro-RO' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            // Generate and open the report
            await HTMLReportService.generateReport(reportData);
        } catch (error) {
            ErrorLogger.log(error as Error, 'HTML Report Generation');
            console.error('Error generating report:', error);
        } finally {
            setIsGeneratingReport(false);
        }
    };

    const getResult = () => {
        return quiz.results.find(result =>
            score >= result.minScore && score <= result.maxScore
        ) || quiz.results[0];
    };

    const getQuizResult = () => {
        return quiz.results.find(result =>
            score >= result.minScore && score <= result.maxScore
        ) || quiz.results[0];
    };

    const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100;

    // Get localized content
    const currentQuestionData = quiz.questions[currentQuestion];
    const questionText = getLocalizedText(currentQuestionData.question, language);
    const resultData = getResult();
    const resultText = getLocalizedText(resultData.text, language);
    const quizTitle = getLocalizedText(quiz.title, language);
    const quizResult = getQuizResult();

    return (
        <div className="quiz-page-futuristic">
            <Navbar />

            <main className="quiz-main">
                <div className="container-futuristic">
                    {!showResult ? (
                        <div className="quiz-container glass-card">
                            {/* Progress Bar */}
                            <div className="quiz-progress">
                                <div
                                    className="quiz-progress-bar"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>

                            {/* Question Counter */}
                            <div className="question-counter">
                                {t.quiz.questions} {currentQuestion + 1} / {quiz.questions.length}
                            </div>

                            {/* Question */}
                            <div className="question-content">
                                <h2 className="question-title">
                                    {questionText}
                                </h2>

                                <div className="options-grid">
                                    {currentQuestionData.options.map((option, index) => (
                                        <button
                                            key={index}
                                            className="option-button btn-minimal"
                                            onClick={() => handleAnswer(option.score)}
                                        >
                                            {getLocalizedText(option.text, language)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="quiz-navigation">
                                <button
                                    className="btn-minimal"
                                    disabled={currentQuestion === 0}
                                    onClick={handleBack}
                                >
                                    ← {t.quiz.back || 'Back'}
                                </button>

                                <span className="question-number">
                                    {currentQuestion + 1} / {quiz.questions.length}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="result-container glass-card">
                            <div className="result-header">
                                <h1 className="result-title">{t.quiz.resultTitle || 'Your Result'}</h1>
                                <div className="result-score">
                                    {t.quiz.score || 'Score'}: {score}
                                </div>
                            </div>

                            <div className="result-content">
                                <p className="result-text">{resultText}</p>
                            </div>

                            <div className="result-actions">
                                <button
                                    className="btn-minimal primary"
                                    onClick={openReport}
                                    disabled={isGeneratingReport}
                                >
                                    {isGeneratingReport ? 'Opening Report...' : t.quizResultForm?.openReport || 'Open Report'}
                                </button>

                                <button
                                    className="btn-minimal"
                                    onClick={() => navigate('/quiz')}
                                >
                                    {t.quiz.backToQuizzes || 'Back to Quizzes'}
                                </button>

                                <button
                                    className="btn-minimal"
                                    onClick={resetQuiz}
                                >
                                    {t.quiz.restart || 'Restart Quiz'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <AppFooter />
        </div>
    );
};

export default QuizPage; 