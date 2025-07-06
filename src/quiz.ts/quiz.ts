export type QuestionOption = {
    text: string;
    score: number;
};

export type Question = {
    question: string;
    options: QuestionOption[];
};

export type Result = {
    minScore: number;
    maxScore: number;
    text: string;
};

export type QuizData = {
    title: string;
    questions: Question[];
    results: Result[];
};
