import React, { useState } from 'react';
import { Box, Typography, Card, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { quizzes } from '../quizzes';
import Quiz from '../components/Quiz';
import { QuizData } from '../quiz.ts/quiz';

const QuizzesPage: React.FC = () => {
    const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

    const handleQuizChange = (e: SelectChangeEvent<string>) => {
        const index = parseInt(e.target.value, 10);
        if (!isNaN(index) && quizzes[index]) {
            setSelectedQuiz(quizzes[index]);
        }
    };

    return (
        <Box textAlign="center">
            {!selectedQuiz ? (
                <>
                    <Typography variant="h4" mb={4}>
                        Alege un Quiz
                    </Typography>
                    <Card sx={{ p: 4 }}>
                        <Select
                            value=""
                            displayEmpty
                            onChange={handleQuizChange}
                            fullWidth
                            sx={{ fontSize: '1.2rem' }}
                        >
                            <MenuItem value="" disabled>
                                Selectează un quiz din listă
                            </MenuItem>
                            {quizzes.map((quiz, index) => (
                                <MenuItem key={index} value={index.toString()}>
                                    {quiz.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </Card>
                </>
            ) : (
                <Quiz quiz={selectedQuiz} />
            )}
        </Box>
    );
};

export default QuizzesPage;
