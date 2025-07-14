import { QuizDef } from "../type";

const agingQuiz: QuizDef = {
  icon: "",
  id: "aging-assessment",
  title: {
    ro: "Cât de bine îmbătrânește pielea ta?",
    en: "How Well Is Your Skin Aging?",
  },
  description: {
    ro: "Acest chestionar evaluează stilul tău de viață, rutina de îngrijire a pielii, alimentația și factorii de mediu pentru a determina cât de bine îți menții pielea tânără. Acest test nu oferă un diagnostic medical sau estetic, ci evidențiază obiceiurile care pot influența procesul de îmbătrânire a pielii.",
    en: "This quiz evaluates your lifestyle, skincare routine, diet, and environmental exposure to assess how well your skin is aging. This is not a diagnostic tool, but rather a way to highlight habits that may influence how your skin ages over time.",
  },
  questions: [
    // ... [your original questions go here]
    {
      question: {
        ro: "Cât de des faci exerciții fizice (cardio sau forță)?",
        en: "How often do you exercise (cardio or strength training)?",
      },
      options: [
        {
          text: { ro: "De 4+ ori pe săptămână", en: "4+ times per week" },
          score: 5,
        },
        {
          text: { ro: "De 2-3 ori pe săptămână", en: "2–3 times per week" },
          score: 4,
        },
        { text: { ro: "1 dată pe săptămână", en: "Once a week" }, score: 2 },
        {
          text: { ro: "Foarte rar sau deloc", en: "Rarely or never" },
          score: 0,
        },
      ],
    },
    {
      question: {
        ro: "Folosești antioxidanți în rutina ta (ex: vitamina C, acid ferulic)?",
        en: "Do you use antioxidants in your routine (e.g., vitamin C, ferulic acid)?",
      },
      options: [
        { text: { ro: "Da, zilnic", en: "Yes, daily" }, score: 5 },
        { text: { ro: "Da, ocazional", en: "Yes, occasionally" }, score: 3 },
        { text: { ro: "Nu", en: "No" }, score: 0 },
      ],
    },
  ],
  results: [
    {
      minScore: 0,
      maxScore: 30,
      text: {
        ro: "Necesită Îmbunătățiri Semnificative\n\nPielea ta ar putea beneficia de schimbări majore în stilul de viață și rutina de îngrijire. Recomandăm:\n\n• Rutină de îngrijire completă cu SPF zilnic\n• Suplimente de colagen și antioxidanți\n• Reducerea stresului și îmbunătățirea somnului\n• Dietă bogată în antioxidanți și omega-3\n\nReferințe științifice:\n• Effects of Oral Collagen for Skin Anti-Aging: A Systematic Review and Meta-Analysis, 2023\n• Photoaging: Mechanisms and Treatment Strategies, 2022",
        en: "Your skin may be aging faster than it should. Time to make changes!\n\nYour skin could benefit from major lifestyle and skincare routine changes. We recommend:\n\n• Complete skincare routine with daily SPF\n• Collagen and antioxidant supplements\n• Stress reduction and improved sleep\n• Diet rich in antioxidants and omega-3\n\nScientific references:\n• Effects of Oral Collagen for Skin Anti-Aging: A Systematic Review and Meta-Analysis, 2023\n• Photoaging: Mechanisms and Treatment Strategies, 2022",
      },
    },
    {
      minScore: 31,
      maxScore: 50,
      text: {
        ro: "Îmbunătățiri Moderate Necesare\n\nPielea ta are o bază bună, dar câteva ajustări pot face diferența:\n\n• Implementarea unei rutine de îngrijire consistente\n• Protecție solară zilnică obligatorie\n• Suplimente de colagen și vitamina C\n• Optimizarea somnului și hidratării\n\nReferințe științifice:\n• Advanced Anti-Aging Strategies in Dermatology, 2023\n• Skincare Routines and Their Impact on Aging Skin, 2022",
        en: "Normal aging – some lifestyle tweaks will help.\n\nYour skin has a good foundation, but a few adjustments can make a difference:\n\n• Implement a consistent skincare routine\n• Mandatory daily sun protection\n• Collagen and vitamin C supplements\n• Optimize sleep and hydration\n\nScientific references:\n• Advanced Anti-Aging Strategies in Dermatology, 2023\n• Skincare Routines and Their Impact on Aging Skin, 2022",
      },
    },
    {
      minScore: 51,
      maxScore: 70,
      text: {
        ro: "Pielea ta este bine îngrijită! Menține rutina actuală și consideră:\n\n• Produse anti-aging avansate (retinol, peptide)\n• Suplimente de colagen pentru întreținere\n• Exfoliere regulată și tratamente profesionale\n\nReferințe științifice:\n• Light-Emitting Diodes in Dermatology: Anti-Aging Evidence, 2023\n• Skin Aging and Peptides: A Review of Current Evidence, 2022",
        en: "Your skin is aging beautifully – keep it up!\n\nYour skin is well-cared for! Maintain your current routine and consider:\n\n• Advanced anti-aging products (retinol, peptides)\n• Collagen supplements for maintenance\n• Regular exfoliation and professional treatments\n\nScientific references:\n• Light-Emitting Diodes in Dermatology: Anti-Aging Evidence, 2023\n• Skin Aging and Peptides: A Review of Current Evidence, 2022",
      },
    },
    {
      minScore: 71,
      maxScore: 100,
      text: {
        ro: "Excelentă Îngrijire a Pielii\n\nFelicitări! Pielea ta este excepțional de bine îngrijită și menținută. Rutina ta este un model pentru îngrijirea preventivă a îmbătrânirii.\n\nPentru menținere:\n• Continuă rutina actuală\n• Consideră tratamente profesionale avansate\n• Monitorizează schimbările cu vârsta\n\nReferințe științifice:\n• Lifestyle and Skin Aging: The Role of Prevention, 2023\n• Anti-Aging Treatments and Their Long-Term Effects, 2022",
        en: "Exceptional Skin Care!\n\nCongratulations! Your skin is exceptionally well-cared for and maintained. Your routine is a model for preventive aging care.\n\nFor maintenance:\n• Continue your current routine\n• Consider advanced professional treatments\n• Monitor changes with age\n\nScientific references:\n• Lifestyle and Skin Aging: The Role of Prevention, 2023\n• Anti-Aging Treatments and Their Long-Term Effects, 2022",
      },
    },
  ],
};

export default agingQuiz;
