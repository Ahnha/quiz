import { QuizDef } from '../type';
import agingQuiz from './agingQuiz';
import nonToxicQuiz from './nonToxicQuiz';
import skinTypeQuiz from './skinTypeQuiz';

export const quizzes: QuizDef[] = [
    agingQuiz,
    skinTypeQuiz,
    nonToxicQuiz
];

export const allQuizzes = [agingQuiz, skinTypeQuiz, nonToxicQuiz];

export const getQuizById = (id: string) =>
    allQuizzes.find((quiz) => quiz.id === id);