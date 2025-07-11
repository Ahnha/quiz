import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getQuizById } from '../quiz/quizzes';
import Navbar from './components/Navbar';
import AppFooter from '../components/AppFooter';
import QuizResultForm from './components/QuizResultForm';
import '../styles/global.css';
import '../styles/quizPage.css';

const QuizPage: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [showResultForm, setShowResultForm] = useState(false);

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

    const getResult = () => {
        return quiz.results.find(result =>
            score >= result.minScore && score <= result.maxScore
        ) || quiz.results[0];
    };

    const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100;

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
                                    {quiz.questions[currentQuestion].question}
                                </h2>

                                <div className="options-grid">
                                    {quiz.questions[currentQuestion].options.map((option, index) => (
                                        <button
                                            key={index}
                                            className="option-button btn-minimal"
                                            onClick={() => handleAnswer(option.score)}
                                        >
                                            {option.text}
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
                                <h1 className="result-title">🎉 {t.quiz.resultTitle || 'Your Result'}</h1>
                                <div className="result-score">
                                    {t.quiz.score || 'Score'}: {score}
                                </div>
                            </div>

                            <div className="result-content">
                                <p className="result-text">{getResult().text}</p>
                            </div>

                            <div className="result-actions">
                                <button
                                    className="btn-minimal primary"
                                    onClick={() => setShowResultForm(true)}
                                >
                                    📧 {t.quizResultForm?.send || 'Send Results'}
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
                                    🔄 {t.quiz.restart || 'Restart Quiz'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <AppFooter />

            {showResultForm && (
                <QuizResultForm
                    quizName={quiz.title}
                    score={score}
                    result={getResult().text}
                    onClose={() => setShowResultForm(false)}
                />
            )}
        </div>
    );
};

export default QuizPage; 