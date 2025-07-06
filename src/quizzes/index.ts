import { QuizData } from '../quiz.ts/quiz';
import agingQuiz from './agingQuiz';
import nonToxicLifeQuiz from './nonToxicQuiz';
import skinTypeQuiz from './skinTypeQuiz';

export const quizzes: QuizData[] = [
    agingQuiz,
    skinTypeQuiz,
    nonToxicLifeQuiz
];
