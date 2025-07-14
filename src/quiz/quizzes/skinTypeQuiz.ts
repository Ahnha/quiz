import { QuizDef } from "../type";

const skinTypeQuiz: QuizDef = {
  icon: "",
  id: "skin-type",
  title: {
    ro: "Ce tip de piele ai?",
    en: "What Is Your Skin Type?",
  },
  description: {
    ro: "Acest chestionar te ajută să îți identifici tipul real de piele, analizând nivelul de hidratare, producția de sebum, sensibilitatea și reacția la factori externi. Nu înlocuiește consultul dermatologic.",
    en: "This quiz helps you identify your true skin type based on hydration, oil production, sensitivity, and environmental reactivity. It is not a substitute for professional diagnosis.",
  },
  questions: [
    {
      question: {
        ro: "Cum se simte pielea ta imediat după ce te speli pe față?",
        en: "How does your skin feel right after washing?",
      },
      options: [
        { text: { ro: "Strânsă și uscată", en: "Tight and dry" }, score: 0 },
        {
          text: {
            ro: "Puțin uscată, dar își revine după aplicarea cremei",
            en: "Slightly dry",
          },
          score: 2,
        },
        { text: { ro: "Normală, confortabilă", en: "Comfortable" }, score: 4 },
        { text: { ro: "Ușor lucioasă", en: "Slightly oily" }, score: 4 },
        { text: { ro: "Foarte grasă, uleioasă", en: "Very oily" }, score: 5 },
      ],
    },
    {
      question: {
        ro: "Ai porțiuni de piele care se descuamează sau sunt aspre?",
        en: "Do you get flaking or rough patches?",
      },
      options: [
        { text: { ro: "Da, tot timpul", en: "Often" }, score: 0 },
        { text: { ro: "Uneori, iarna", en: "Sometimes" }, score: 2 },
        { text: { ro: "Rar", en: "Rarely" }, score: 4 },
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
      ],
    },
    {
      question: {
        ro: "Cum îți absoarbe pielea crema hidratantă?",
        en: "How does your skin absorb moisturizer?",
      },
      options: [
        {
          text: { ro: "Imediat, parcă dispare în piele", en: "Instantly" },
          score: 0,
        },
        {
          text: {
            ro: "Se absoarbe bine, dar trebuie să reaplic uneori",
            en: "Absorbs but I need to reapply",
          },
          score: 2,
        },
        {
          text: {
            ro: "Se simte hidratată pentru mult timp",
            en: "Feels hydrated long after",
          },
          score: 4,
        },
        {
          text: {
            ro: "Crema rămâne la suprafață și pielea se simte uleioasă",
            en: "It sits on my skin, feels greasy",
          },
          score: 5,
        },
      ],
    },
    {
      question: {
        ro: "Cum se simte pielea ta la prânz (după câteva ore de la spălare)?",
        en: "How does your skin feel by midday?",
      },
      options: [
        { text: { ro: "Foarte uscată, strânsă", en: "Dry" }, score: 0 },
        { text: { ro: "Confortabilă", en: "Comfortable" }, score: 4 },
        {
          text: { ro: "Ușor lucioasă în zona T", en: "Shiny in T-zone" },
          score: 4,
        },
        {
          text: { ro: "Foarte grasă peste tot", en: "Very oily all over" },
          score: 5,
        },
      ],
    },
    {
      question: {
        ro: "Cât de des trebuie să folosești șervețele matifiante sau pudră?",
        en: "How often do you blot or use powder?",
      },
      options: [
        { text: { ro: "Niciodată", en: "Never" }, score: 0 },
        {
          text: { ro: "O dată sau de două ori pe zi", en: "Once/twice a day" },
          score: 4,
        },
        {
          text: { ro: "De mai multe ori pe zi", en: "Multiple times a day" },
          score: 5,
        },
      ],
    },
    {
      question: {
        ro: "Cum arată porii tăi?",
        en: "What do your pores look like?",
      },
      options: [
        { text: { ro: "Aproape invizibili", en: "Barely visible" }, score: 0 },
        { text: { ro: "Mici și rafinați", en: "Small" }, score: 3 },
        {
          text: {
            ro: "Destul de vizibili în zona T",
            en: "Noticeable in T-zone",
          },
          score: 4,
        },
        {
          text: {
            ro: "Mari și evidenți pe toată fața",
            en: "Large everywhere",
          },
          score: 5,
        },
      ],
    },
    {
      question: {
        ro: "Cum reacționează pielea ta la produse cosmetice noi?",
        en: "How does your skin react to new products?",
      },
      options: [
        {
          text: {
            ro: "Se irită, apare roșeața sau coșuri",
            en: "Always irritated",
          },
          score: 0,
        },
        {
          text: { ro: "Uneori mă irită puțin", en: "Sometimes sensitive" },
          score: 3,
        },
        {
          text: { ro: "Nu am niciodată reacții negative", en: "Never" },
          score: 5,
        },
      ],
    },
    {
      question: {
        ro: "Cât de des pielea ta devine roșie sau iritată?",
        en: "Does your skin get red or inflamed often?",
      },
      options: [
        {
          text: { ro: "Foarte des, chiar și din cauza vremii", en: "Yes" },
          score: 0,
        },
        {
          text: { ro: "Uneori, dar nu este extrem", en: "Occasionally" },
          score: 3,
        },
        { text: { ro: "Foarte rar", en: "Rarely" }, score: 5 },
      ],
    },
    {
      question: {
        ro: "Simți pielea că te mănâncă sau înțeapă după spălare?",
        en: "Does your skin feel itchy or tingly after washing?",
      },
      options: [
        { text: { ro: "Mereu", en: "Yes" }, score: 0 },
        { text: { ro: "Uneori", en: "Sometimes" }, score: 3 },
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
      ],
    },
    {
      question: {
        ro: "Cum se simte pielea ta în zilele foarte calde și umede?",
        en: "How does your skin react in heat/humidity?",
      },
      options: [
        { text: { ro: "Și mai uscată", en: "Drier" }, score: 0 },
        { text: { ro: "Confortabilă", en: "Comfortable" }, score: 4 },
        { text: { ro: "Lucioasă, uleioasă", en: "Oily" }, score: 5 },
      ],
    },
    {
      question: {
        ro: "Cum se simte pielea ta iarna?",
        en: "How does it feel in cold weather?",
      },
      options: [
        {
          text: {
            ro: "Se usucă extrem de tare, crăpă",
            en: "Very dry/cracked",
          },
          score: 0,
        },
        {
          text: {
            ro: "Trebuie să aplic cremă mai des",
            en: "Needs extra moisture",
          },
          score: 3,
        },
        {
          text: { ro: "Nu observ nicio schimbare", en: "Unchanged" },
          score: 5,
        },
      ],
    },
    {
      question: {
        ro: "Apar coșuri când mănânci alimente grase sau dulci?",
        en: "Do you break out from greasy/sugary food?",
      },
      options: [
        { text: { ro: "Da, de fiecare dată", en: "Yes" }, score: 0 },
        { text: { ro: "Uneori", en: "Sometimes" }, score: 3 },
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
      ],
    },
    {
      question: {
        ro: "Există antecedente familiale de afecțiuni ale pielii (de exemplu, acnee, eczeme)?",
        en: "Do family members have skin issues (acne, eczema)?",
      },
      options: [
        { text: { ro: "Da", en: "Yes" }, score: 0 },
        { text: { ro: "Nu", en: "No" }, score: 5 },
      ],
    },
    {
      question: {
        ro: "Ai observat schimbări în tipul pielii tale în funcție de ciclul menstrual sau alte fluctuații hormonale?",
        en: "Does your skin change with your cycle or hormones?",
      },
      options: [
        {
          text: { ro: "Da, pielea devine mai grasă/uscată", en: "Yes" },
          score: 0,
        },
        { text: { ro: "Nu observ nicio schimbare", en: "No" }, score: 5 },
      ],
    },
  ],
  results: [
    {
      minScore: 0,
      maxScore: 30,
      text: {
        ro: "Ten Uscat\n\nPielea ta are tendința de a pierde rapid hidratarea, se poate simți aspră, strânsă sau descuamată. Este important să o protejezi de factorii de mediu și să o hidratezi constant.\n\nReferințe științifice:\n• Skin Hydration by Natural Moisturizing Factors..., 2021, • The Skin Barrier and Moisturization: Function, Disruption, and Repair, 2022",
        en: "Dry Skin\n\nYour skin tends to lose moisture quickly and may feel tight, rough, or flaky. It’s important to protect it from environmental stressors and keep it consistently hydrated.\n\nScientific references:\n• Skin Hydration by Natural Moisturizing Factors..., 2021, • The Skin Barrier and Moisturization: Function, Disruption, and Repair, 2022",
      },
    },
    {
      minScore: 31,
      maxScore: 50,
      text: {
        ro: "Ten Gras\n\nPielea ta produce exces de sebum, ceea ce poate duce la luciu persistent, pori dilatați și potențial acnee. Echilibrul este cheia pentru a menține pielea curată și sănătoasă.\n\nReferințe științifice:\n• Sebum Production and Acne: A Comprehensive Review, 2020,• A Comprehensive Classification and Analysis of Oily Sensitive Facial Skin, 2024",
        en: "Oily Skin\n\nYour skin produces excess sebum, leading to shine, enlarged pores, and possibly acne. Balance is key to keeping oily skin healthy and clear.\n\nScientific references:\n• Sebum Production and Acne: A Comprehensive Review, 2020,\n• A Comprehensive Classification and Analysis of Oily Sensitive Facial Skin, 2024",
      },
    },
    {
      minScore: 51,
      maxScore: 70,
      text: {
        ro: "Ten Mixt\n\nPielea ta este o combinație de zone uscate și grase, cel mai adesea grasă în zona T și normală sau uscată pe obraji. Necesită o îngrijire echilibrată și adaptată.\n\nReferințe științifice:\n• Skin Type Classifications: Does the Perfect Assessment Exist?, 2024\n• An Overview of Methods to Characterize Skin Type..., 2022",
        en: "Combination Skin\n\nYour skin has both oily and dry areas—typically an oily T-zone with dry or normal cheeks. It requires balanced and targeted care.\n\nScientific references:\n• Skin Type Classifications: Does the Perfect Assessment Exist?, 2024\n• An Overview of Methods to Characterize Skin Type..., 2022",
      },
    },
    {
      minScore: 71,
      maxScore: 90,
      text: {
        ro: "Ten Sensibil\n\nPielea ta reacționează ușor la produse sau factori de mediu, fiind predispusă la roșeață, senzații de usturime sau mâncărime. Are nevoie de produse blânde și protecție constantă.\n\nReferințe științifice:\n• Sensitive Skin and Irritation Triggers: A Review, 2021\n• Fragrance‑Free Skincare: Benefits for Sensitive Skin, 2020",
        en: "Sensitive Skin\n\nYour skin reacts easily to products or environmental factors and may experience redness, stinging, or itching. It needs gentle products and ongoing protection.\n\nScientific references:\n• Sensitive Skin and Irritation Triggers, 2021\n• Fragrance-Free Skincare, 2020",
      },
    },
    {
      minScore: 91,
      maxScore: 100,
      text: {
        ro: "Ten Normal\n\nPielea ta este echilibrată, fără zone extrem de uscate sau grase, și nu reacționează ușor la factori externi. Este important să menții acest echilibru cu o rutină blândă.\n\nReferințe științifice:\n• Skin Homeostasis and Maintenance Mechanisms, 2021\n• What Are Skin Types? A Practical Summary, 2020",
        en: "Normal Skin\n\nYour skin is balanced, neither too oily nor too dry, and does not react easily to external triggers. Maintaining this balance with a gentle routine is essential.\n\nScientific references:\n• Skin Homeostasis and Maintenance Mechanisms, 2021\n• What Are Skin Types? A Practical Summary, 2020",
      },
    },
  ],
};

export default skinTypeQuiz;
