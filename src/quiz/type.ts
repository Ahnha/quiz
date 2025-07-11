export type QuestionOption = {
  text: string | { ro: string; en: string };
  score: number;
};

export type Question = {
  question: string | { ro: string; en: string };
  options: QuestionOption[];
};

export type Result = {
  minScore: number;
  maxScore: number;
  text: string | { ro: string; en: string };
};

export type QuizDef = {
  id: string;
  title: string | { ro: string; en: string };
  description: string | { ro: string; en: string };
  icon: string;
  questions: Question[];
  results: Result[];
};