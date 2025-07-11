import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Stack } from '@mui/material';
import { QuizDef } from '../../quiz/type';
import ResultEmailForm from './ResultEmailForm';
import { QuizService } from '../../services/quizService';
import { UI, QUIZ } from '../../utils/constants';
import '../../styles/quiz.css';

// PATTERN: Interface Segregation - Only expose what's needed
interface QuizProps {
    quiz: QuizDef;
}

/**
 * Quiz Component
 * 
 * PATTERN: Single Responsibility Principle
 * - Only responsible for quiz UI and state management
 * - Business logic delegated to QuizService
 * 
 * PATTERN: Service Layer Integration
 * - Uses QuizService for calculations and validations
 * - Clean separation between UI and business logic
 * 
 * PATTERN: State Management
 * - Clear state structure
 * - Immutable state updates
 */
const Quiz: React.FC<QuizProps> = ({ quiz }) => {
    // PATTERN: State Organization - Group related state
    const [quizState, setQuizState] = useState({
        current: 0,
        score: 0,
        showResult: false,
        answers: [] as number[]
    });

    // PATTERN: Computed Values - Derived from state
    const progressPercentage = QuizService.calculateProgress(
        quizState.current,
        quiz.questions.length
    );

    const resultText = QuizService.findResult(quiz, quizState.score);

    /**
     * Handle answer selection
     * 
     * PATTERN: Command Pattern
     * - Encapsulates answer selection logic
     * - Clear action and state update
     */
    const handleAnswer = (scoreValue: number) => {
        setQuizState(prev => {
            const newAnswers = [...prev.answers, scoreValue];
            const newScore = prev.score + scoreValue;
            const nextQuestion = prev.current + 1;

            return {
                ...prev,
                answers: newAnswers,
                score: newScore,
                current: nextQuestion,
                showResult: nextQuestion >= quiz.questions.length
            };
        });
    };

    /**
     * Handle navigation back
     * 
     * PATTERN: Command Pattern
     * - Encapsulates back navigation logic
     * - Validates state before update
     */
    const handleBack = () => {
        if (quizState.current > 0) {
            setQuizState(prev => {
                const lastScore = prev.answers[prev.answers.length - 1];
                const newAnswers = prev.answers.slice(0, -1);

                return {
                    ...prev,
                    answers: newAnswers,
                    score: prev.score - lastScore,
                    current: prev.current - 1
                };
            });
        }
    };

    /**
     * Reset quiz state
     * 
     * PATTERN: Factory Pattern
     * - Creates new quiz state
     * - Reusable reset logic
     */
    const resetQuiz = () => {
        window.location.reload();
    };

    return (
        <Box className="quiz-inner-wrapper" width="100%" display="flex" justifyContent="center" alignItems="center" flex="1">
            <Card sx={{
                maxWidth: UI.MAX_WIDTH.QUIZ_CARD,
                width: '95%',
                boxShadow: 'var(--shadow-heavy)',
                borderRadius: UI.BORDER_RADIUS.CARD,
                border: '1px solid var(--border-color)'
            }}>
                <CardContent sx={{ padding: '2rem' }}>
                    {!quizState.showResult ? (
                        <>
                            {/* Progress Bar */}
                            <div className="quiz-progress">
                                <div
                                    className="quiz-progress-bar"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>

                            {/* Question Counter */}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'var(--text-light)',
                                    marginBottom: '1rem',
                                    textAlign: 'center',
                                    fontWeight: 500
                                }}
                            >
                                Întrebarea {quizState.current + 1} din {quiz.questions.length}
                            </Typography>

                            <Typography variant="h4" className="quiz-question-title" sx={{ marginBottom: '2rem' }}>
                                {quiz.questions[quizState.current].question}
                            </Typography>

                            <Stack spacing={2} className="quiz-options">
                                {quiz.questions[quizState.current].options.map((option, idx) => (
                                    <Button
                                        key={idx}
                                        className="quiz-button"
                                        onClick={() => handleAnswer(option.score)}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                            padding: '1.25rem 1.5rem',
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            color: 'white !important',
                                            backgroundColor: 'transparent',
                                            backgroundImage: 'linear-gradient(45deg, var(--primary-color), var(--primary-dark))',
                                            '&:hover': {
                                                color: 'white !important',
                                                backgroundColor: 'transparent',
                                                backgroundImage: 'linear-gradient(45deg, var(--primary-dark), var(--primary-color))',
                                                transform: 'translateY(-2px)',
                                                boxShadow: 'var(--shadow-medium)'
                                            },
                                            '&:focus': {
                                                outline: '2px solid var(--accent-color)',
                                                outlineOffset: '2px'
                                            }
                                        }}
                                    >
                                        {option.text}
                                    </Button>
                                ))}
                            </Stack>

                            <div className="quiz-navigation">
                                <Button
                                    variant="outlined"
                                    className="nav-button"
                                    disabled={quizState.current === 0}
                                    onClick={handleBack}
                                    sx={{
                                        borderColor: 'var(--border-color)',
                                        color: 'var(--text-color)',
                                        '&:hover': {
                                            borderColor: 'var(--primary-color)',
                                            backgroundColor: 'var(--primary-light)'
                                        }
                                    }}
                                >
                                    ← Înapoi
                                </Button>

                                <Typography variant="body2" sx={{ color: 'var(--text-light)' }}>
                                    {quizState.current + 1} / {quiz.questions.length}
                                </Typography>
                            </div>
                        </>
                    ) : (
                        <Box className="quiz-result">
                            <Typography variant="h3" className="result-title" gutterBottom>
                                🎉 Rezultatul tău
                            </Typography>
                            <Typography variant="h5" className="result-score" sx={{ marginBottom: '2rem' }}>
                                Scor total: {quizState.score}
                            </Typography>
                            <Typography variant="body1" className="result-text" sx={{ marginBottom: '3rem' }}>
                                {resultText}
                            </Typography>

                            <ResultEmailForm
                                quizTitle={quiz.title}
                                score={quizState.score}
                                resultText={resultText}
                            />

                            <Button
                                variant="outlined"
                                className="nav-button"
                                onClick={resetQuiz}
                                sx={{
                                    marginTop: '2rem',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-color)',
                                    '&:hover': {
                                        borderColor: 'var(--primary-color)',
                                        backgroundColor: 'var(--primary-light)'
                                    }
                                }}
                            >
                                🔄 Reîncepe Quiz-ul
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Quiz;