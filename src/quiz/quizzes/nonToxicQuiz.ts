import { QuizDef } from "../type";

const nonToxicQuiz: QuizDef = {
  icon: "",
  id: "non-toxic-lifestyle",
  title: {
    ro: "Cât de non‑toxic e stilul tău de viață?",
    en: "How Non-Toxic Is Your Life?",
  },
  description: {
    ro: "Evaluăm expunerea ta la substanțe chimice și toxine din viața de zi cu zi.",
    en: "This quiz evaluates your exposure to toxins in home, food, water, cosmetics, and lifestyle.",
  },
  questions: [
    {
      question: {
        ro: "Cât de des gătești cu vase antiaderente (Teflon etc.)?",
        en: "How often do you cook with non-stick cookware (Teflon)?",
      },
      options: [
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 4 },
        { text: { ro: "Ocazional", en: "Sometimes" }, score: 3 },
        { text: { ro: "Des", en: "Often" }, score: 1 },
        { text: { ro: "Zilnic", en: "Daily" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Folosești containere din plastic pentru alimente fierbinți?",
        en: "Do you use plastic containers for hot food?",
      },
      options: [
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 4 },
        { text: { ro: "Uneori", en: "Sometimes" }, score: 3 },
        { text: { ro: "Des", en: "Often" }, score: 1 },
        { text: { ro: "Zilnic", en: "Daily" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Vinerea faci curățenie cu detergenți puternici fără ventilare?",
        en: "Do you clean with strong chemical cleaners without ventilation?",
      },
      options: [
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 4 },
        { text: { ro: "Uneori", en: "Sometimes" }, score: 3 },
        { text: { ro: "Des, fără aerisire", en: "Often" }, score: 1 },
        { text: { ro: "Zilnic, fără ventilație", en: "Daily" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Locuiești într-o casă nouă, cu mobilă/plăci recent instalate?",
        en: "Do you live in a recently renovated home (new furniture/flooring)?",
      },
      options: [
        { text: { ro: "Nu", en: "No" }, score: 5 },
        {
          text: {
            ro: "Da, dar am aerisit intens",
            en: "Yes, with good ventilation",
          },
          score: 4,
        },
        {
          text: { ro: "Da, fără aerisire", en: "Yes, without airing out" },
          score: 0,
        },
      ],
    },
    {
      question: {
        ro: "Folosești cosmetice/parfumuri fără etichetă clară (–phthalates etc.)?",
        en: "Do you use cosmetics/perfume without clear ingredient labeling?",
      },
      options: [
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 4 },
        { text: { ro: "Uneori", en: "Sometimes" }, score: 3 },
        { text: { ro: "Des", en: "Often" }, score: 1 },
        { text: { ro: "Zilnic", en: "Daily" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Utilizezi produse parfumate pentru casă (spray-uri, odorizante)?",
        en: "Do you use synthetic air fresheners (sprays, plugins)?",
      },
      options: [
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 4 },
        { text: { ro: "Ocazional", en: "Sometimes" }, score: 3 },
        { text: { ro: "Des", en: "Often" }, score: 1 },
        { text: { ro: "Zilnic", en: "Daily" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Porți haine noi (tricou, saltea etc.) înainte de prima spălare?",
        en: "Do you wear clothes or sleep on bedding before first wash?",
      },
      options: [
        { text: { ro: "Niciodată", en: "Never" }, score: 5 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 4 },
        { text: { ro: "Uneori", en: "Sometimes" }, score: 3 },
        { text: { ro: "Des", en: "Often" }, score: 1 },
        { text: { ro: "Zilnic", en: "Always" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Câte alimente organice consumi pe zi?",
        en: "How often do you eat organic foods?",
      },
      options: [
        { text: { ro: "Majoritatea", en: "Most of the time" }, score: 5 },
        { text: { ro: "50%", en: "About 50%" }, score: 4 },
        { text: { ro: "25%", en: "Occasionally" }, score: 3 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 1 },
        { text: { ro: "Niciodată", en: "Never" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Folosești filtru pentru apă de la robinet?",
        en: "Do you filter your tap water?",
      },
      options: [
        {
          text: {
            ro: "Da, cu certificare NSF (5pts)",
            en: "Yes, NSF-certified filter",
          },
          score: 5,
        },
        { text: { ro: "Da, simplu", en: "Basic filter" }, score: 4 },
        { text: { ro: "Ocazional", en: "Occasionally" }, score: 3 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 1 },
        { text: { ro: "Niciodată", en: "Never" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Mănânci pește sau fructe de mare des (posibil contaminate)?",
        en: "How often do you eat fish/seafood?",
      },
      options: [
        { text: { ro: "Nu", en: "Rarely" }, score: 5 },
        { text: { ro: "Ocazional", en: "Occasionally" }, score: 4 },
        { text: { ro: "1x/săptămână", en: "Weekly" }, score: 3 },
        { text: { ro: "De 2‑3x/săptămână", en: "2–3x/week" }, score: 1 },
        { text: { ro: "Zilnic", en: "Daily" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Ai aerisire adecvată în casă (depănări, ferestre)?",
        en: "Do you ventilate your home daily?",
      },
      options: [
        { text: { ro: "Sigur, deschis zilnic", en: "Always" }, score: 5 },
        { text: { ro: "Ocazional", en: "Occasionally" }, score: 3 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 1 },
        { text: { ro: "Niciodată", en: "Never" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Ai plante de interior sau ventilator HEPA?",
        en: "Do you use indoor plants or HEPA filters?",
      },
      options: [
        { text: { ro: "Da, plante/se filtre", en: "Both" }, score: 5 },
        { text: { ro: "Doar plante", en: "Only plants" }, score: 4 },
        { text: { ro: "Niciuna", en: "None" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Folosești uleiuri esențiale cu ozon în cameră?",
        en: "Do you diffuse essential oils near electronics or in closed rooms?",
      },
      options: [
        { text: { ro: "Nu", en: "Never" }, score: 5 },
        { text: { ro: "Rareori", en: "Occasionally" }, score: 4 },
        { text: { ro: "Frecvent", en: "Frequently" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Folosești produse din plastic fin (ex. băuturi comerciale, gloss, unt de corp)?",
        en: "Do you use plastic-based personal care (lip gloss, body oil, bottled drinks)?",
      },
      options: [
        { text: { ro: "Nu", en: "No" }, score: 5 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 4 },
        { text: { ro: "Ocazional", en: "Occasionally" }, score: 3 },
        { text: { ro: "Des", en: "Often" }, score: 1 },
        { text: { ro: "Zilnic", en: "Daily" }, score: 0 },
      ],
    },
    {
      question: {
        ro: "Folosești praf uscat sau spray-uri cu nanoparticule (spray, deodorant)?",
        en: "Do you use aerosol sprays (dry shampoo, air fresheners)?",
      },
      options: [
        { text: { ro: "Nu", en: "Never" }, score: 5 },
        { text: { ro: "Rareori", en: "Rarely" }, score: 4 },
        { text: { ro: "Uneori", en: "Occasionally" }, score: 3 },
        { text: { ro: "Des", en: "Often" }, score: 1 },
        { text: { ro: "Zilnic", en: "Daily" }, score: 0 },
      ],
    },
  ],
  results: [
    {
      minScore: 0,
      maxScore: 39,
      text: {
        ro: "Expunere Mare la Toxine. \n\nStilul tău de viață prezintă o expunere ridicată la substanțe chimice și toxine. Recomandăm schimbări urgente:\n\n• Înlocuiește vasele antiaderente cu ceramică sau oțel inoxidabil\n• Folosește doar containere de sticlă pentru alimente\n• Optează pentru detergenți naturali și aerisire adecvată\n• Consumă mai multe alimente organice\n• Instalează filtre de apă și aer\n• Evită produsele parfumate sintetice\n\nReferințe științifice:\n• Global Mortality Burden Attributable to Di(2-ethylhexyl) Phthalate (DEHP) Exposure, 2025\n•Volatile Organic Compounds in Indoor Environments: Sources, Risks, and Mitigation Strategies, 2020\n• Fragranced consumer products: Effects on asthmatics and other sensitive populations, 2016",
        en: "High toxin exposure – time to make changes.\n\nYour lifestyle shows high exposure to chemicals and toxins. We recommend urgent changes:\n\n• Replace non-stick cookware with ceramic or stainless steel\n• Use only glass containers for food\n• Opt for natural detergents and proper ventilation\n• Consume more organic foods\n• Install water and air filters\n• Avoid synthetic fragrances\n\nScientific references:\n• Global Mortality Burden Attributable to Di(2-ethylhexyl) Phthalate (DEHP) Exposure, 2025\n•Volatile Organic Compounds in Indoor Environments: Sources, Risks, and Mitigation Strategies, 2020\n• Fragranced consumer products: Effects on asthmatics and other sensitive populations, 2016",
      },
    },
    {
      minScore: 40,
      maxScore: 59,
      text: {
        ro: "Stil de Viață Acceptabil. \n\nAi o abordare moderată, dar există loc pentru îmbunătățiri:\n\n• Reduce utilizarea plasticului pentru alimente fierbinți\n• Implementează o rutină de aerisire zilnică\n• Adaugă mai multe alimente organice în dietă\n• Consideră filtre de apă și aer\n• Înlocuiește produsele parfumate cu alternative naturale\n• Spală hainele noi înainte de purtare\n\nReferințe științifice:\n• Volatile organic compounds emitted by conventional and “green” cleaning products in the U.S. market, 2023\n• Does green mean clean? Volatile organic emissions from regular versus green cleaning products, 2024\n•  LUCIR Intervention Study: Changes in Latina women’s exposure to cleaning chemicals associated with switching from conventional to “green” cleaning products, 2021",
        en: "You're doing okay, but there's room for improvement.\n\nYou have a moderate approach, but there's room for improvement:\n\n• Reduce plastic use for hot foods\n• Implement a daily ventilation routine\n• Add more organic foods to your diet\n• Consider water and air filters\n• Replace fragranced products with natural alternatives\n• Wash new clothes before wearing\n\nScientific references:\n•  Volatile organic compounds emitted by conventional and “green” cleaning products in the U.S. market, 2023\n• Does green mean clean? Volatile organic emissions from regular versus green cleaning products, 2024\n•  LUCIR Intervention Study: Changes in Latina women’s exposure to cleaning chemicals associated with switching from conventional to “green” cleaning products, 2021",
      },
    },
    {
      minScore: 60,
      maxScore: 75,
      text: {
        ro: "Stil de Viață Foarte Non-Toxic\n\nFelicitări! Ai un stil de viață excepțional de curat și non-toxic. Continuă să:\n\n• Menții rutina actuală de alimente organice\n• Folosești produse naturale pentru casă\n• Aerisești regulat spațiile\n• Evită expunerea la toxine\n• Educi pe alții despre stilul de viață non-toxic\n\nReferințe științifice:\n•  Assessing Volatile Organic Compound Exposure and Associated Health Risks in Indoor Environments, 2024\n• Exposure to Household Air Pollution from Indoor Cooking and Its Health Impacts in Europe, 2023\n• Chemical Emissions from Cleaning Products: A Comprehensive Characterization of Indoor Air Pollutants, 2024",
        en: "You live a very low-toxin lifestyle. Well done!\n\nCongratulations! You have an exceptionally clean and non-toxic lifestyle. Continue to:\n\n• Maintain your current organic food routine\n• Use natural products for home\n• Ventilate spaces regularly\n• Avoid toxin exposure\n• Educate others about non-toxic lifestyle\n\nScientific references:\n•  Assessing Volatile Organic Compound Exposure and Associated Health Risks in Indoor Environments, 2024\n• Exposure to Household Air Pollution from Indoor Cooking and Its Health Impacts in Europe, 2023\n• Chemical Emissions from Cleaning Products: A Comprehensive Characterization of Indoor Air Pollutants, 2024",
      },
    },
  ],
};

export default nonToxicQuiz;
