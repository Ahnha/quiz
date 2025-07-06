import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Stack } from '@mui/material';
import { QuizData } from '../quiz.ts/quiz';
import ResultEmailForm from './ResultEmailForm';

interface QuizProps {
    quiz: QuizData;
}

const Quiz: React.FC<QuizProps> = ({ quiz }) => {
    const { title, questions, results } = quiz;

    const [current, setCurrent] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [answers, setAnswers] = useState<number[]>([]);

    const handleAnswer = (scoreValue: number) => {
        setAnswers((prev) => [...prev, scoreValue]);
        setScore((prev) => prev + scoreValue);

        const next = current + 1;
        if (next < questions.length) {
            setCurrent(next);
        } else {
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (current > 0) {
            const lastScore = answers[answers.length - 1];
            setAnswers((prev) => prev.slice(0, -1));
            setScore((prev) => prev - lastScore);
            setCurrent((prev) => prev - 1);
        }
    };

    const getResultText = (): string => {
        const result = results.find(r => score >= r.minScore && score <= r.maxScore);
        return result ? result.text : 'Nicio interpretare disponibilă.';
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
            <Card sx={{ maxWidth: 600, width: '90%', boxShadow: 3 }}>
                <CardContent>
                    {!showResult ? (
                        <>
                            <Typography variant="h4" mb={2}>
                                {title}
                            </Typography>
                            <Typography variant="h5" mb={2}>
                                {questions[current].question}
                            </Typography>
                            <Stack spacing={2}>
                                {questions[current].options.map((option, idx) => (
                                    <Button
                                        key={idx}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAnswer(option.score)}
                                    >
                                        {option.text}
                                    </Button>
                                ))}
                            </Stack>
                            <Box mt={2} display="flex" justifyContent="space-between">
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    disabled={current === 0}
                                    onClick={handleBack}
                                >
                                    Înapoi
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Box textAlign="center">
                            <Typography variant="h4" gutterBottom>
                                Rezultatul tău
                            </Typography>
                            <Typography variant="h6" mb={2}>
                                Scor total: {score}
                            </Typography>
                            <Typography variant="body1" mb={2}>
                                {getResultText()}
                            </Typography>
                            <ResultEmailForm
                                quizTitle={title}
                                score={score}
                                resultText={getResultText()}
                                onSent={() => window.alert('Email trimis cu succes!')}
                            />
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => window.location.reload()}
                                sx={{ mt: 2 }}
                            >
                                Reîncepe
                            </Button>
                        </Box>
                    )}
                </CardContent>

            </Card>
        </Box>
    );
};

export default Quiz;