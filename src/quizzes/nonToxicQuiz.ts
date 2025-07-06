import { QuizData } from '../quiz.ts/quiz';

const nonToxicLifeQuiz: QuizData = {
    title: 'Cât de non-toxică este viața ta?',
    questions: [
        {
            question: "Ce produse folosești pentru curățenie?",
            options: [
                { text: "Doar produse ecologice, certificate", score: 0 },
                { text: "Produse obișnuite din supermarket", score: 2 },
                { text: "Le aleg doar după preț, nu contează eticheta", score: 4 },
            ],
        },
        {
            question: "Folosesti odorizante de cameră sintetice?",
            options: [
                { text: "Nu, prefer aerisirea sau soluții naturale", score: 0 },
                { text: "Da, ocazional", score: 2 },
                { text: "Da, zilnic", score: 4 },
            ],
        },
        {
            question: "Ce produse de îngrijire personală folosești?",
            options: [
                { text: "Cosmetice certificate organic sau naturale", score: 0 },
                { text: "Orice produs din magazine, fără să citesc ingredientele", score: 4 },
                { text: "Le aleg uneori atent, alteori nu", score: 2 },
            ],
        },
        {
            question: "Ai obiecte din plastic care intră în contact cu alimente fierbinți?",
            options: [
                { text: "Nu, folosesc sticlă, ceramică sau inox", score: 0 },
                { text: "Da, dar doar ocazional", score: 2 },
                { text: "Da, zilnic", score: 4 },
            ],
        },
        {
            question: "Cât de des aerisești locuința?",
            options: [
                { text: "În fiecare zi, dimineața și seara", score: 0 },
                { text: "De câteva ori pe săptămână", score: 2 },
                { text: "Foarte rar", score: 4 },
            ],
        },
        {
            question: "Cât de des citești etichetele produselor de curățenie sau igienă?",
            options: [
                { text: "Întotdeauna", score: 0 },
                { text: "Doar când cumpăr un produs nou", score: 2 },
                { text: "Niciodată", score: 4 },
            ],
        },
    ],
    results: [
        {
            minScore: 0,
            maxScore: 4,
            text: "Felicitări! Viața ta este deja foarte non-toxică! Continuă pe acest drum! 🌿",
        },
        {
            minScore: 5,
            maxScore: 10,
            text: "Ești pe calea cea bună, dar mai ai câteva schimbări de făcut pentru un mediu mai sănătos. 😊",
        },
        {
            minScore: 11,
            maxScore: 24,
            text: "Casa și rutina ta ascund multe toxine. Începe să faci schimbări treptat pentru a-ți proteja sănătatea! ⚠️",
        },
    ],
};

export default nonToxicLifeQuiz;
