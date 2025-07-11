import { QuizDef } from '../type';

const agingQuiz: QuizDef = {
    icon: "⏰",
    id: "aging-assessment",
    title: {
        ro: 'Cât de bine îmbătrânește pielea ta?',
        en: 'How Well Is Your Skin Aging?'
    },
    description: {
        ro: "Acest chestionar evaluează stilul tău de viață, rutina de îngrijire a pielii, alimentația și factorii de mediu pentru a determina cât de bine îți menții pielea tânără.",
        en: "This quiz evaluates your lifestyle, skincare routine, diet, and environmental exposure to assess how well your skin is aging."
    },
    questions: [
        {
            question: {
                ro: "Câte ore de somn ai pe noapte?",
                en: "How many hours of sleep do you get per night?"
            },
            options: [
                { text: { ro: "7-9 ore ✅", en: "7–9 hours ✅" }, score: 5 },
                { text: { ro: "6-7 ore ⚠️", en: "6–7 hours ⚠️" }, score: 4 },
                { text: { ro: "5-6 ore ⚠️", en: "5–6 hours ⚠️" }, score: 3 },
                { text: { ro: "Mai puțin de 5 ore ❌", en: "Less than 5 ❌" }, score: 1 },
            ],
        },
        {
            question: {
                ro: "Fumezi sau ai fumat în trecut?",
                en: "Do you smoke or have you ever smoked?"
            },
            options: [
                { text: { ro: "Nu am fumat niciodată ✅", en: "Never ✅" }, score: 5 },
                { text: { ro: "Am fumat, dar am renunțat de peste 5 ani ⚠️", en: "I quit over 5 years ago ⚠️" }, score: 4 },
                { text: { ro: "Am renunțat acum mai puțin de 5 ani ❌", en: "I quit within the last 5 years ❌" }, score: 2 },
                { text: { ro: "Fumez ocazional ❌", en: "I smoke occasionally ❌" }, score: 1 },
                { text: { ro: "Fumez regulat ❌", en: "I smoke regularly ❌" }, score: 0 },
            ],
        },
        {
            question: {
                ro: "Cât de des consumi alcool?",
                en: "How often do you consume alcohol?"
            },
            options: [
                { text: { ro: "Foarte rar sau deloc ✅", en: "Rarely or never ✅" }, score: 5 },
                { text: { ro: "1-2 ori pe lună ⚠️", en: "1–2 times per month ⚠️" }, score: 4 },
                { text: { ro: "1-2 ori pe săptămână ⚠️", en: "1–2 times per week ⚠️" }, score: 3 },
                { text: { ro: "De 3+ ori pe săptămână ❌", en: "3+ times per week ❌" }, score: 2 },
                { text: { ro: "Aproape zilnic ❌", en: "Daily ❌" }, score: 1 },
            ],
        },
        {
            question: {
                ro: "Cât de des ai perioade de stres ridicat?",
                en: "How often do you feel stressed?"
            },
            options: [
                { text: { ro: "Foarte rar ✅", en: "Rarely ✅" }, score: 5 },
                { text: { ro: "Uneori ⚠️", en: "Sometimes ⚠️" }, score: 4 },
                { text: { ro: "Destul de des ⚠️", en: "Often ⚠️" }, score: 3 },
                { text: { ro: "Aproape tot timpul ❌", en: "Almost always ❌" }, score: 1 },
            ],
        },
        {
            question: {
                ro: "Cât de des aplici cremă cu protecție solară (SPF 30+)?",
                en: "How often do you apply SPF 30+ sunscreen?"
            },
            options: [
                { text: { ro: "În fiecare zi, indiferent de anotimp ✅", en: "Daily, all seasons ✅" }, score: 5 },
                { text: { ro: "Doar când este soare afară ⚠️", en: "Only when it's sunny ⚠️" }, score: 3 },
                { text: { ro: "Doar în vacanță ❌", en: "Only on vacation ❌" }, score: 2 },
                { text: { ro: "Niciodată ❌", en: "Never ❌" }, score: 0 },
            ],
        },
        {
            question: {
                ro: "Cum arată rutina ta zilnică de îngrijire a pielii?",
                en: "What's your skincare routine like?"
            },
            options: [
                { text: { ro: "Curățare + cremă hidratantă + SPF + seruri ✅", en: "Cleanser + moisturizer + SPF + serums ✅" }, score: 5 },
                { text: { ro: "Curățare + cremă hidratantă + SPF ⚠️", en: "Cleanser + moisturizer + SPF ⚠️" }, score: 4 },
                { text: { ro: "Doar curățare & cremă hidratantă ⚠️", en: "Just cleanser & moisturizer ⚠️" }, score: 3 },
                { text: { ro: "Doar mă spăl cu apă ❌", en: "I wash with water only ❌" }, score: 1 },
            ],
        },
        {
            question: {
                ro: "Folosești produse anti-aging (retinol, vitamina C, peptide)?",
                en: "Do you use anti-aging ingredients (retinol, vitamin C, peptides)?"
            },
            options: [
                { text: { ro: "Da, regulat ✅", en: "Yes, regularly ✅" }, score: 5 },
                { text: { ro: "Ocazional ⚠️", en: "Occasionally ⚠️" }, score: 3 },
                { text: { ro: "Nu ❌", en: "Never ❌" }, score: 0 },
            ],
        },
        {
            question: {
                ro: "Îți îndepărtezi machiajul înainte de culcare?",
                en: "Do you remove makeup before bed?"
            },
            options: [
                { text: { ro: "Întotdeauna ✅", en: "Always ✅" }, score: 5 },
                { text: { ro: "Uneori ⚠️", en: "Sometimes ⚠️" }, score: 3 },
                { text: { ro: "Niciodată ❌", en: "Never ❌" }, score: 0 },
            ],
        },
        {
            question: {
                ro: "Câtă apă bei pe zi?",
                en: "How much water do you drink per day?"
            },
            options: [
                { text: { ro: "2+ litri ✅", en: "2+ liters ✅" }, score: 5 },
                { text: { ro: "1,5 - 2 litri ⚠️", en: "1.5–2 liters ⚠️" }, score: 4 },
                { text: { ro: "1 - 1,5 litri ⚠️", en: "1–1.5 liters ⚠️" }, score: 3 },
                { text: { ro: "0,5 - 1 litru ❌", en: "0.5–1 liter ❌" }, score: 1 },
                { text: { ro: "Mai puțin de 0,5 litri ❌", en: "Less than 0.5 liters ❌" }, score: 0 },
            ],
        },
        {
            question: {
                ro: "Cât de des consumi fructe și legume proaspete?",
                en: "How often do you eat fresh fruits & vegetables?"
            },
            options: [
                { text: { ro: "În fiecare zi ✅", en: "Daily ✅" }, score: 5 },
                { text: { ro: "De 4-5 ori pe săptămână ⚠️", en: "4–5 times a week ⚠️" }, score: 4 },
                { text: { ro: "De 2-3 ori pe săptămână ⚠️", en: "2–3 times a week ⚠️" }, score: 3 },
                { text: { ro: "Foarte rar ❌", en: "Rarely ❌" }, score: 1 },
            ],
        },
        {
            question: {
                ro: "Cât de mult zahăr consumi zilnic?",
                en: "How much sugar do you eat daily?"
            },
            options: [
                { text: { ro: "Foarte puțin (evit zahărul procesat) ✅", en: "Very little (I avoid processed sugar) ✅" }, score: 5 },
                { text: { ro: "Moderat (mici dulciuri, dar dietă echilibrată) ⚠️", en: "Moderate (small treats, balanced diet) ⚠️" }, score: 4 },
                { text: { ro: "Mult (mănânc dulciuri zilnic) ❌", en: "High (I eat sweets daily) ❌" }, score: 2 },
            ],
        },
        {
            question: {
                ro: "Iei suplimente de colagen, omega-3 sau alte vitamine benefice pentru piele?",
                en: "Do you take collagen, omega-3, or other skin-boosting supplements?"
            },
            options: [
                { text: { ro: "Da, regulat ✅", en: "Yes, regularly ✅" }, score: 5 },
                { text: { ro: "Ocazional ⚠️", en: "Occasionally ⚠️" }, score: 3 },
                { text: { ro: "Nu ❌", en: "Never ❌" }, score: 0 },
            ],
        },
        {
            question: {
                ro: "Cât de des stai la soare fără SPF?",
                en: "How often do you spend time in direct sun without SPF?"
            },
            options: [
                { text: { ro: "Aproape niciodată ✅", en: "Rarely ✅" }, score: 5 },
                { text: { ro: "Câteva ori pe săptămână ⚠️", en: "A few times a week ⚠️" }, score: 3 },
                { text: { ro: "Zilnic, perioade lungi ❌", en: "Daily, for long periods ❌" }, score: 1 },
            ],
        },
        {
            question: {
                ro: "Trăiești într-un oraș cu poluare ridicată?",
                en: "Do you live in a city with high pollution?"
            },
            options: [
                { text: { ro: "Nu, locuiesc într-un mediu curat ✅", en: "No ✅" }, score: 5 },
                { text: { ro: "Da, dar îmi protejez pielea (antioxidanți, SPF, curățare bună) ⚠️", en: "Yes, but I take protective steps ⚠️" }, score: 3 },
                { text: { ro: "Da, și nu iau măsuri speciale ❌", en: "Yes, and I take no precautions ❌" }, score: 1 },
            ],
        },
    ],
    results: [
        {
            minScore: 0,
            maxScore: 30,
            text: {
                ro: "🟠 Necesită Îmbunătățiri Semnificative\n\nPielea ta ar putea beneficia de schimbări majore în stilul de viață și rutina de îngrijire. Recomandăm:\n\n• Rutină de îngrijire completă cu SPF zilnic\n• Suplimente de colagen și antioxidanți\n• Reducerea stresului și îmbunătățirea somnului\n• Dietă bogată în antioxidanți și omega-3\n\n📚 Referințe științifice:\n• Journal of Clinical and Aesthetic Dermatology, 2023\n• International Journal of Cosmetic Science, 2022",
                en: "🔴 Your skin may be aging faster than it should. Time to make changes!\n\nYour skin could benefit from major lifestyle and skincare routine changes. We recommend:\n\n• Complete skincare routine with daily SPF\n• Collagen and antioxidant supplements\n• Stress reduction and improved sleep\n• Diet rich in antioxidants and omega-3\n\n📚 Scientific references:\n• Journal of Clinical and Aesthetic Dermatology, 2023\n• International Journal of Cosmetic Science, 2022"
            }
        },
        {
            minScore: 31,
            maxScore: 50,
            text: {
                ro: "🟡 Îmbunătățiri Moderate Necesare\n\nPielea ta are o bază bună, dar câteva ajustări pot face diferența:\n\n• Implementarea unei rutine de îngrijire consistente\n• Protecție solară zilnică obligatorie\n• Suplimente de colagen și vitamina C\n• Optimizarea somnului și hidratării\n\n📚 Referințe științifice:\n• Dermatology Research and Practice, 2023\n• Journal of Dermatological Treatment, 2022",
                en: "🟡 Normal aging – some lifestyle tweaks will help.\n\nYour skin has a good foundation, but a few adjustments can make a difference:\n\n• Implement a consistent skincare routine\n• Mandatory daily sun protection\n• Collagen and vitamin C supplements\n• Optimize sleep and hydration\n\n📚 Scientific references:\n• Dermatology Research and Practice, 2023\n• Journal of Dermatological Treatment, 2022"
            }
        },
        {
            minScore: 51,
            maxScore: 70,
            text: {
                ro: "🟢 Bună Îngrijire a Pielii\n\nPielea ta este bine îngrijită! Menține rutina actuală și consideră:\n\n• Produse anti-aging avansate (retinol, peptide)\n• Suplimente de colagen pentru întreținere\n• Exfoliere regulată și tratamente profesionale\n\n📚 Referințe științifice:\n• Journal of Drugs in Dermatology, 2023\n• Clinical, Cosmetic and Investigational Dermatology, 2022",
                en: "🟢 Your skin is aging beautifully – keep it up!\n\nYour skin is well-cared for! Maintain your current routine and consider:\n\n• Advanced anti-aging products (retinol, peptides)\n• Collagen supplements for maintenance\n• Regular exfoliation and professional treatments\n\n📚 Scientific references:\n• Journal of Drugs in Dermatology, 2023\n• Clinical, Cosmetic and Investigational Dermatology, 2022"
            }
        },
        {
            minScore: 71,
            maxScore: 100,
            text: {
                ro: "🟢 Excelentă Îngrijire a Pielii\n\nFelicitări! Pielea ta este excepțional de bine îngrijită și menținută. Rutina ta este un model pentru îngrijirea preventivă a îmbătrânirii.\n\nPentru menținere:\n• Continuă rutina actuală\n• Consideră tratamente profesionale avansate\n• Monitorizează schimbările cu vârsta\n\n📚 Referințe științifice:\n• Journal of the American Academy of Dermatology, 2023\n• British Journal of Dermatology, 2022",
                en: "🟢 Your skin is aging beautifully – keep it up!\n\nCongratulations! Your skin is exceptionally well-cared for and maintained. Your routine is a model for preventive aging care.\n\nFor maintenance:\n• Continue your current routine\n• Consider advanced professional treatments\n• Monitor changes with age\n\n📚 Scientific references:\n• Journal of the American Academy of Dermatology, 2023\n• British Journal of Dermatology, 2022"
            }
        },
    ],
};

export default agingQuiz;
