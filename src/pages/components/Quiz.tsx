import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Stack } from '@mui/material';
import { QuizDef } from '../../quiz/type';
import ResultEmailForm from './ResultEmailForm';

interface QuizProps {
    quiz: QuizDef;
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
        <Box className="quiz-inner-wrapper" width="100%" display="flex" justifyContent="center" alignItems="center" flex="1">
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
                                        className="quiz-button"
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