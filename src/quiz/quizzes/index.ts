import { QuizDef } from '../type';
import agingQuiz from './agingQuiz';
import nonToxicLifeQuiz from './nonToxicQuiz';
import skinTypeQuiz from './skinTypeQuiz';

export const quizzes: QuizDef[] = [
    agingQuiz,
    skinTypeQuiz,
    nonToxicLifeQuiz
];

export const allQuizzes = [skinTypeQuiz];

export const getQuizById = (id: string) =>
    allQuizzes.find((quiz) => quiz.id === id);