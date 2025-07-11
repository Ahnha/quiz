import { QuizDef } from '../type';

const skinTypeQuiz: QuizDef = {
    icon: "🌱",
    id: "skin-type",
    title: 'What Is Your Skin Type?',
    description:
        "Află ce tip de piele ai pentru a primi recomandări personalizate despre îngrijire, produse și rutină.",
    questions: [
        {
            question: "Cum se simte pielea ta la câteva ore după curățare?",
            options: [
                { text: "Lucioasă și uleioasă", score: 3 },
                { text: "Tensionată și uscată", score: 0 },
                { text: "Se simte confortabil, echilibrată", score: 1 },
            ],
        },
        {
            question: "Cât de des apar coșuri/imperfecțiuni?",
            options: [
                { text: "Frecvent", score: 3 },
                { text: "Foarte rar", score: 0 },
                { text: "Ocazional", score: 1 },
            ],
        },
        {
            question: "Ai zone care se descuamează sau se irită ușor?",
            options: [
                { text: "Da, des", score: 0 },
                { text: "Foarte rar sau deloc", score: 3 },
                { text: "Doar iarna", score: 1 },
            ],
        },
        {
            question: "Cum reacționează pielea ta la creme hidratante?",
            options: [
                { text: "Devine și mai grasă", score: 3 },
                { text: "Se simte mai bine imediat", score: 0 },
                { text: "Depinde de produs", score: 1 },
            ],
        },
    ],
    results: [
        {
            minScore: 0,
            maxScore: 2,
            text: "Piele uscată – are nevoie de hidratare intensă și protecție suplimentară. 💧",
        },
        {
            minScore: 3,
            maxScore: 5,
            text: "Piele normală sau mixtă – menține rutina de echilibrare! 😊",
        },
        {
            minScore: 6,
            maxScore: 12,
            text: "Piele grasă – ai nevoie de produse care reglează sebumul și curăță delicat. ✨",
        },
    ],
};

export default skinTypeQuiz;
