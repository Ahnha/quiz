import React, { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { quizzes } from '../quiz/quizzes';
import Quiz from './components/Quiz';
import Navbar from './components/Navbar';
import '../styles/themeStyles.css'; 

const QuizzesPage: React.FC = () => {
    const [selectedQuiz, setSelectedQuiz] = useState<typeof quizzes[0] | null>(null);

    const handleQuizChange = (e: SelectChangeEvent<string>) => {
        const index = parseInt(e.target.value, 10);
        if (!isNaN(index) && quizzes[index]) {
            setSelectedQuiz(quizzes[index]);
        }
    };

    return (
        <div className="quiz-page min-h-screen flex flex-col">
            <Navbar />
            <main className="quiz-content flex-1 flex justify-center items-center px-4">
                {!selectedQuiz ? (
                    <div className="quiz-selection-container">
                        <h2 className="section-title">Alege un Quiz</h2>
                        <div className="quiz-card">
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
                            <p className="quiz-description">
                                Selectează unul dintre quizuri pentru a afla mai multe despre pielea ta,
                                obiceiurile tale și recomandări personalizate.
                            </p>
                        </div>
                    </div>
                ) : (
                    <Quiz quiz={selectedQuiz} />
                )}
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Skin Studio. Toate drepturile rezervate.</p>
            </footer>
        </div>
      );
    }
export default QuizzesPage;
