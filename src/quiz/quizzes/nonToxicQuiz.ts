import { QuizDef } from '../type';

const nonToxicLifeQuiz: QuizDef = {
    id: "non-toxic",
    title: 'Non-Toxic Lifestyle',
    description:
        "Descoperă cât de non-toxic este stilul tău de viață și primește sfaturi pentru o tranziție graduală.",
    icon: "🌱",
    questions: [
        {
            question: "Cât de des folosești protecție solară?",
            options: [
                { text: "Zilnic, indiferent de vreme", score: 0 },
                { text: "Doar vara sau la plajă", score: 2 },
                { text: "Foarte rar sau niciodată", score: 4 },
            ],
        },
        {
            question: "Cât de mult dormi pe noapte?",
            options: [
                { text: "7-8 ore", score: 0 },
                { text: "5-6 ore", score: 2 },
                { text: "<5 ore", score: 4 },
            ],
        },
        {
            question: "Bei suficientă apă zilnic?",
            options: [
                { text: "Da, cel puțin 1.5-2L", score: 0 },
                { text: "1L sau mai puțin", score: 2 },
                { text: "Foarte puțină apă", score: 4 },
            ],
        },
        {
            question: "Fumezi sau consumi alcool frecvent?",
            options: [
                { text: "Nu", score: 0 },
                { text: "Ocazional", score: 2 },
                { text: "Des", score: 4 },
            ],
        },
        {
            question: "Cât de des experimentezi stres intens?",
            options: [
                { text: "Foarte rar", score: 0 },
                { text: "Ocazional", score: 2 },
                { text: "Des", score: 4 },
            ],
        },
        {
            question: "Dieta ta este bogată în legume și fructe?",
            options: [
                { text: "Da, zilnic", score: 0 },
                { text: "Uneori", score: 2 },
                { text: "Foarte rar", score: 4 },
            ],
        },
        {
            question: "Faci exerciții fizice regulat?",
            options: [
                { text: "Da, de cel puțin 3 ori pe săptămână", score: 0 },
                { text: "Mai rar de o dată pe săptămână", score: 2 },
                { text: "Deloc", score: 4 },
            ],
        },
        {
            question: "Îți hidratezi pielea zilnic cu cremă?",
            options: [
                { text: "Da, dimineața și seara", score: 0 },
                { text: "Doar o dată pe zi", score: 2 },
                { text: "Foarte rar sau niciodată", score: 4 },
            ],
        },
    ],
    results: [
        {
            minScore: 0,
            maxScore: 6,
            text: "Felicitări! Pielea ta arată mai tânără decât vârsta reală. Continuă obiceiurile sănătoase! 🌟",
        },
        {
            minScore: 7,
            maxScore: 14,
            text: "Pielea ta arată conform vârstei tale. Îmbunătățește obiceiurile pentru un aspect mai tânăr. 😊",
        },
        {
            minScore: 15,
            maxScore: 32,
            text: "Semne de îmbătrânire accelerată. E timpul să schimbi rutina și stilul de viață pentru a-ți proteja pielea! 🕒",
        },
    ],
};

export default nonToxicLifeQuiz;
