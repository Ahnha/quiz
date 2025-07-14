// PATTERN: Data Layer - Centralized skin care recommendations
// Contains detailed information for PDF generation and email content

export interface AdditionalNoteEntry {
  title: string;
  description: string;
  tool: {
    name: string;
    url: string;
  };
  howTo: string[];
  disclaimer: string;
}

export interface AdditionalNote {
  ro: AdditionalNoteEntry;
  en: AdditionalNoteEntry;
}

export interface Source {
  name: string;
  url: string;
}

export interface SkinCareRecommendationEntry {
  type: string;
  title: string;
  description: string;
  dailyRoutine: string[];
  recommendedProducts: string[];
  lifestyleTips: string[];
  ingredients: string[];
  avoidIngredients: string[];
  professionalAdvice: string;
  sources?: Source[];
}

export interface SkinCareRecommendation {
  ro: SkinCareRecommendationEntry;
  en: SkinCareRecommendationEntry;
}

export interface AgingRecommendationEntry {
  title: string;
  description: string;
  antiAgingRoutine: string[];
  lifestyleChanges: string[];
  professionalTreatments: string[];
  preventionTips: string[];
}

export interface AgingRecommendation {
  ro: AgingRecommendationEntry;
  en: AgingRecommendationEntry;
}

// Common additional note for ingredient checking
export const ADDITIONAL_NOTE: AdditionalNote = {
  ro: {
    title: "🔍 Verifică ingredientele produselor tale",
    description:
      'Nu toate produsele "curate" sunt la fel — iar ambalajele pot fi înșelătoare. Dacă vrei să înțelegi mai bine ce conține un produs cosmetic, poți analiza ingredientele cu ajutorul unui instrument gratuit:',
    tool: {
      name: "INCIdecoder",
      url: "https://incidecoder.com/",
    },
    howTo: [
      "Caută produsul după nume",
      "Sau copiază lista de ingrediente de pe etichetă",
      "Află ce ingrediente sunt sigure, iritante sau fără funcție dovedită",
    ],
    disclaimer:
      "Este o unealtă educativă, nu medicală. Dar un punct excelent de pornire pentru alegeri mai conștiente.",
  },
  en: {
    title: "🔍 Check the Ingredients in Your Products",
    description:
      "Not all 'clean' products are created equal — and packaging can be misleading. If you'd like to better understand what a cosmetic contains, you can analyze the ingredient list using this free tool:",
    tool: {
      name: "INCIdecoder",
      url: "https://incidecoder.com/",
    },
    howTo: [
      "Search for the product by name",
      "Or paste the ingredient list from the label",
      "See which ingredients are safe, irritating, or of low proven benefit",
    ],
    disclaimer:
      "This is an educational tool, not a medical source — but it's a great starting point for more conscious choices.",
  },
};

// Skin Type Recommendations
export const SKIN_TYPE_RECOMMENDATIONS: Record<string, SkinCareRecommendation> =
  {
    dry: {
      ro: {
        type: "dry",
        title: "Piele Uscată – Îngrijire Naturală și Profundă",
        description:
          "Pielea uscată are nevoie de îngrijire delicată, emolientă și bogată în ingrediente naturale. Mai jos găsești sugestii inspirate din fitoterapie și cosmetologie blândă.",
        dailyRoutine: [
          "Curățare delicată cu un lapte demachiant sau săpun vegetal",
          "Tonifiere cu apă florală (ex. lavandă, mușețel)",
          "Aplicare de ser hidratant pe bază de aloe vera sau extract de nalbă",
          "Ulei facial hrănitor aplicat pe pielea umedă (ex. jojoba, cătină, argan)",
          "Cremă hidratantă cu unturi vegetale (shea, cacao)",
          "Protecție solară minerală cu oxid de zinc",
        ],
        recommendedProducts: [
          "Apă florală calmantă (lavandă, trandafir, mușețel)",
          "Ser hidratant cu extracte botanice",
          "Ulei facial (jojoba, argan, cătină)",
          "Cremă cu unt de shea și ulei de migdale",
          "Mască din argilă albă + miere + lapte vegetal",
          "Protecție solară fizică, fără filtre chimice",
        ],
        lifestyleTips: [
          "Consumă zilnic 1.5-2L apă",
          "Evită dușurile fierbinți și frecarea excesivă a pielii",
          "Aplică uleiuri imediat după baie pe pielea umedă",
          "Aerisește des și folosește un umidificator în sezonul rece",
          "Consumă grăsimi sănătoase (nuci, semințe, uleiuri presate la rece)",
        ],
        ingredients: [
          "Aloe vera",
          "Extract de nalbă",
          "Ulei de cătină",
          "Unt de shea",
          "Ulei de jojoba",
          "Vitamina E din surse naturale",
          "Panthenol",
        ],
        avoidIngredients: [
          "Sulfați și detergenți agresivi",
          "Alcool denaturat",
          "Parfumuri sintetice",
          "Uleiuri minerale și parafină",
          "Acizi exfolianți (AHA, BHA), retinoizi",
        ],
        professionalAdvice:
          "Dacă pielea rămâne foarte uscată și sensibilă în ciuda îngrijirii, consultă un dermatolog pentru a exclude o afecțiune precum dermatita atopică.",
        sources: [
          {
            name: "Herbal Medicine for Skin Health – NCBI",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8701212/",
          },
          {
            name: "American Botanical Council – Traditional Uses of Plant Oils",
            url: "https://www.herbalgram.org/resources/herbalgram/issues/93/table-of-contents/hg93-feat-plant-oils/",
          },
        ],
      },
      en: {
        type: "dry",
        title: "Dry Skin – Natural and Deep Care",
        description:
          "Dry skin needs gentle, emollient care enriched with natural ingredients. Below are suggestions inspired by herbal traditions and gentle cosmetology.",
        dailyRoutine: [
          "Gently cleanse with a botanical cleansing milk or natural soap",
          "Tone with floral water (e.g., lavender, chamomile)",
          "Apply a hydrating serum based on aloe vera or marshmallow root extract",
          "Use a nourishing facial oil on damp skin (e.g., jojoba, sea buckthorn, argan)",
          "Apply a moisturizer with plant butters (shea, cocoa)",
          "Use a mineral sunscreen with zinc oxide",
        ],
        recommendedProducts: [
          "Soothing floral water (lavender, rose, chamomile)",
          "Hydrating serum with botanical extracts",
          "Facial oil (jojoba, argan, sea buckthorn)",
          "Cream with shea butter and sweet almond oil",
          "Mask made with white clay + honey + plant milk",
          "Physical sunscreen without chemical filters",
        ],
        lifestyleTips: [
          "Drink 1.5–2 liters of water daily",
          "Avoid hot showers and excessive scrubbing",
          "Apply oils right after bathing on damp skin",
          "Ventilate rooms regularly and use a humidifier during cold seasons",
          "Eat healthy fats (nuts, seeds, cold-pressed oils)",
        ],
        ingredients: [
          "Aloe vera",
          "Marshmallow root extract",
          "Sea buckthorn oil",
          "Shea butter",
          "Jojoba oil",
          "Naturally derived vitamin E",
          "Botanical panthenol",
        ],
        avoidIngredients: [
          "Harsh sulfates and detergents",
          "Denatured alcohol",
          "Synthetic fragrances",
          "Mineral oils and paraffin",
          "Exfoliating acids (AHA, BHA), retinoids",
        ],
        professionalAdvice:
          "If your skin remains very dry and sensitive despite proper care, consult a dermatologist to rule out conditions like atopic dermatitis.",
        sources: [
          {
            name: "Herbal Medicine for Skin Health – NCBI",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8701212/",
          },
          {
            name: "American Botanical Council – Traditional Uses of Plant Oils",
            url: "https://www.herbalgram.org/resources/herbalgram/issues/93/table-of-contents/hg93-feat-plant-oils/",
          },
        ],
      },
    },
    "normal-mixed": {
      ro: {
        type: "normal-mixed",
        title: "Piele Normală/Mixtă – Echilibru Natural",
        description:
          "Pielea normală sau mixtă are nevoie de o rutină blândă și adaptabilă. Prin îngrijire naturală, poți menține acest echilibru în mod sănătos și durabil.",
        dailyRoutine: [
          "Curățare cu un gel vegetal delicat sau săpun cu plante calmante (ex. gălbenele, rozmarin)",
          "Tonifiere cu apă florală (trandafir pentru echilibru, hamamelis pentru zona T)",
          "Aplicare de ser cu niacinamidă vegetală (din orez fermentat sau drojdie)",
          "Cremă lejeră pe bază de aloe vera, extract de ceai verde sau ulei de sâmburi de struguri",
          "Protecție solară minerală ușoară",
          "Mască echilibrantă (argilă roz sau albă + iaurt vegetal)",
        ],
        recommendedProducts: [
          "Apă florală (trandafir, hamamelis)",
          "Ser ușor cu extracte antioxidante (ceai verde, nalbă)",
          "Ulei lejer (sâmburi de struguri, castravete, pepene)",
          "Cremă hidratantă fără parfum și conservanți agresivi",
          "Mască echilibrantă cu argilă și miere",
          "Protecție solară minerală, fără filtre chimice",
        ],
        lifestyleTips: [
          "Adaptează rutina în funcție de sezon (mai bogată iarna, mai lejeră vara)",
          "Bea apă și ceaiuri din plante antioxidante (ex. urzică, frunze de zmeur)",
          "Redu stresul oxidativ prin plimbări zilnice în natură",
          "Dormi suficient și fă mișcare regulată",
          "Nu schimba des produsele – lasă pielea să se adapteze",
        ],
        ingredients: [
          "Aloe vera",
          "Ceai verde",
          "Niacinamidă naturală",
          "Extract de nalbă",
          "Ulei de sâmburi de struguri",
          "Panthenol vegetal",
          "Glicerină vegetală",
        ],
        avoidIngredients: [
          "Alcool denaturat",
          "Parfumuri sintetice intense",
          "Uleiuri grele (ex. cocos în exces pe zona T)",
          "Acizi exfolianți (AHA/BHA)",
          "Retinoizi și derivate farmaceutice",
        ],
        professionalAdvice:
          "Dacă pielea se dezechilibrează frecvent (ex. zona T devine grasă, obrajii uscați), poate fi util să ajustezi alimentația sau să consulți un specialist în îngrijire holistică.",
        sources: [
          {
            name: "Journal of Herbal Medicine – Balancing Botanicals for Mixed Skin",
            url: "https://www.sciencedirect.com/science/article/pii/S2210803317300742",
          },
          {
            name: "European Journal of Integrative Medicine – Niacinamide from Natural Sources",
            url: "https://www.sciencedirect.com/science/article/pii/S1876382020301535",
          },
        ],
      },
      en: {
        type: "normal-mixed",
        title: "Normal/Combination Skin – Natural Balance",
        description:
          "Normal or combination skin needs a gentle and adaptable routine. With natural care, you can maintain this balance in a healthy and sustainable way.",
        dailyRoutine: [
          "Cleanse with a gentle plant-based gel or soap with calming herbs (e.g., calendula, rosemary)",
          "Tone with floral water (rose for balance, witch hazel for the T-zone)",
          "Apply a serum with natural niacinamide (from fermented rice or yeast)",
          "Use a lightweight cream with aloe vera, green tea extract, or grape seed oil",
          "Apply light mineral sunscreen",
          "Use a balancing mask (pink or white clay + plant-based yogurt)",
        ],
        recommendedProducts: [
          "Floral water (rose, witch hazel)",
          "Light serum with antioxidant extracts (green tea, mallow)",
          "Lightweight oil (grape seed, cucumber, melon)",
          "Moisturizer without fragrance or harsh preservatives",
          "Balancing mask with clay and honey",
          "Mineral sunscreen without chemical filters",
        ],
        lifestyleTips: [
          "Adjust your routine by season (richer in winter, lighter in summer)",
          "Drink water and antioxidant herbal teas (e.g., nettle, raspberry leaf)",
          "Reduce oxidative stress with daily walks in nature",
          "Get enough sleep and move regularly",
          "Avoid frequent product changes – give your skin time to adapt",
        ],
        ingredients: [
          "Aloe vera",
          "Green tea",
          "Natural niacinamide",
          "Mallow extract",
          "Grape seed oil",
          "Botanical panthenol",
          "Plant-derived glycerin",
        ],
        avoidIngredients: [
          "Denatured alcohol",
          "Strong synthetic fragrances",
          "Heavy oils (e.g., coconut oil on the T-zone)",
          "Exfoliating acids (AHA/BHA)",
          "Retinoids and pharmaceutical derivatives",
        ],
        professionalAdvice:
          "If your skin frequently shifts (e.g., oily T-zone, dry cheeks), it may help to adjust your diet or consult a holistic skincare specialist.",
        sources: [
          {
            name: "Journal of Herbal Medicine – Balancing Botanicals for Mixed Skin",
            url: "https://www.sciencedirect.com/science/article/pii/S2210803317300742",
          },
          {
            name: "European Journal of Integrative Medicine – Niacinamide from Natural Sources",
            url: "https://www.sciencedirect.com/science/article/pii/S1876382020301535",
          },
        ],
      },
    },
    oily: {
      ro: {
        type: "oily",
        title: "Piele Grasă – Echilibru Natural fără Agresivitate",
        description:
          "Pielea grasă are nevoie de curățare eficientă, dar blândă, și de ingrediente care să regleze sebumul fără a distruge bariera naturală. Remediile naturale pot ajuta semnificativ la menținerea clarității și prospețimii pielii.",
        dailyRoutine: [
          "Curățare de 2 ori pe zi cu geluri blânde pe bază de plante (ex. tea tree, salvie, busuioc sfânt)",
          "Tonifiere cu apă florală astringentă (ex. hamamelis, salvie, mentă)",
          "Aplicare de ser cu extract de bambus sau niacinamidă vegetală (reglare sebum)",
          "Cremă lejeră cu aloe vera, extract de castravete sau ulei de perilla",
          "Protecție solară minerală, matifiantă",
          "Mască cu argilă verde sau neem o dată pe săptămână",
        ],
        recommendedProducts: [
          "Gel de curățare cu extracte antiseptice naturale",
          "Apă florală de hamamelis sau mentă",
          "Ser cu plante purificatoare (bambus, urzică, brusture)",
          "Uleiuri dry-touch: perilla, pepene, jojoba",
          "Cremă lejeră, fără emulsifianți ocluzivi",
          "Mască cu argilă + infuzie de ceai verde",
        ],
        lifestyleTips: [
          "Evită curățarea excesivă – poate stimula și mai mult sebumul",
          "Nu atinge fața cu mâinile – bacteriile pot agrava problemele",
          "Consumă alimente antiinflamatoare (verdețuri, pește gras, semințe de in)",
          "Evită lactatele și zahărul în exces, dacă observi corelații cu pielea",
          "Hidratarea este importantă chiar și pentru pielea grasă – nu o ignora",
        ],
        ingredients: [
          "Apă de hamamelis",
          "Niacinamidă vegetală",
          "Extract de urzică",
          "Argilă verde",
          "Ulei de perilla",
          "Ceai verde",
          "Aloe vera",
        ],
        avoidIngredients: [
          "Săpunuri alcaline",
          "Alcool denaturat",
          "Parfumuri sintetice",
          "Uleiuri grele (ex. cocos, avocado în exces)",
          "Acizi exfolianți (AHA, BHA), retinoizi",
        ],
        professionalAdvice:
          "Dacă apar erupții persistente sau inflamații frecvente, poți consulta un dermatolog sau fitoterapeut pentru o abordare personalizată, combinând plante interne și externe.",
        sources: [
          {
            name: "Journal of Ethnopharmacology – Medicinal plants in acne treatment",
            url: "https://www.sciencedirect.com/science/article/pii/S0378874111007221",
          },
          {
            name: "International Journal of Cosmetic Science – Plant-based sebum regulators",
            url: "https://onlinelibrary.wiley.com/doi/full/10.1111/ics.12604",
          },
        ],
      },
      en: {
        type: "oily",
        title: "Oily Skin – Natural Balance Without Aggression",
        description:
          "Oily skin needs efficient but gentle cleansing and ingredients that regulate sebum without destroying the natural barrier. Natural remedies can significantly help maintain skin clarity and freshness.",
        dailyRoutine: [
          "Cleanse twice daily with gentle plant-based gels (e.g., tea tree, sage, holy basil)",
          "Tone with astringent floral water (e.g., witch hazel, sage, mint)",
          "Apply serum with bamboo extract or natural niacinamide (sebum regulation)",
          "Use lightweight cream with aloe vera, cucumber extract, or perilla oil",
          "Apply mineral, mattifying sunscreen",
          "Use green clay or neem mask once a week",
        ],
        recommendedProducts: [
          "Cleansing gel with natural antiseptic extracts",
          "Witch hazel or mint floral water",
          "Serum with purifying plants (bamboo, nettle, burdock)",
          "Dry-touch oils: perilla, melon, jojoba",
          "Lightweight cream without occlusive emulsifiers",
          "Clay mask + green tea infusion",
        ],
        lifestyleTips: [
          "Avoid over-cleansing – it can stimulate even more sebum",
          "Don't touch your face with your hands – bacteria can worsen problems",
          "Eat anti-inflammatory foods (greens, fatty fish, flax seeds)",
          "Avoid dairy and excess sugar if you notice correlations with your skin",
          "Hydration is important even for oily skin – don't ignore it",
        ],
        ingredients: [
          "Witch hazel water",
          "Natural niacinamide",
          "Nettle extract",
          "Green clay",
          "Perilla oil",
          "Green tea",
          "Aloe vera",
        ],
        avoidIngredients: [
          "Alkaline soaps",
          "Denatured alcohol",
          "Synthetic fragrances",
          "Heavy oils (e.g., coconut, avocado in excess)",
          "Exfoliating acids (AHA, BHA), retinoids",
        ],
        professionalAdvice:
          "If persistent breakouts or frequent inflammation occur, you can consult a dermatologist or herbalist for a personalized approach, combining internal and external plants.",
        sources: [
          {
            name: "Journal of Ethnopharmacology – Medicinal plants in acne treatment",
            url: "https://www.sciencedirect.com/science/article/pii/S0378874111007221",
          },
          {
            name: "International Journal of Cosmetic Science – Plant-based sebum regulators",
            url: "https://onlinelibrary.wiley.com/doi/full/10.1111/ics.12604",
          },
        ],
      },
    },
    sensitive: {
      ro: {
        type: "sensitive",
        title: "Piele Sensibilă – Îngrijire Blândă și Conștientă",
        description:
          "Pielea sensibilă reacționează ușor la factori externi precum vântul, temperaturile extreme, poluarea sau anumite ingrediente cosmetice. Poate înțepa, ustura, înroși sau deveni iritată chiar și atunci când este îngrijită cu intenții bune.\n\nSensibilitatea nu este un tip de piele în sine, ci o stare care poate apărea la piele uscată, mixtă sau chiar grasă. De aceea, alegerea produselor blânde, fără parfumuri și iritanți, este esențială.\n\nCu rutină simplă, ingrediente calmante din plante și puțină răbdare, pielea sensibilă poate deveni din nou echilibrată și confortabilă.",
        dailyRoutine: [
          "Curățare cu un lapte vegetal sau gel blând, fără parfum",
          "Tonifiere cu apă florală calmantă (ex. mușețel, lavandă, roiniță)",
          "Aplicare de ser simplu, cu puține ingrediente, pe bază de aloe vera sau nalbă",
          "Ulei facial calmant (ex. orez, ovăz, cânepă), aplicat pe pielea umedă",
          "Cremă lejeră sau balsam protector cu extracte calmante",
          "Evită exfolierea frecventă sau tratamentele intense",
        ],
        recommendedProducts: [
          "Apă florală calmantă (mușețel, lavandă, roiniță)",
          "Ser cu aloe vera sau nalbă",
          "Ulei facial cu orez sau ovăz",
          "Balsam protector cu plante antiinflamatoare",
          "Cremă simplă, fără parfum",
          "Comprese cu infuzii din plante calmante",
        ],
        lifestyleTips: [
          "Evită schimbările bruște de temperatură",
          "Folosește textile moi pentru față (bumbac organic, tifon)",
          "Spală fața cu apă călduță, nu fierbinte",
          "Redu stresul – inflamația internă influențează pielea",
          "Fii atent(ă) la reacțiile pielii la produse noi – introdu-le treptat",
        ],
        ingredients: [
          "Aloe vera",
          "Extract de mușețel",
          "Extract de nalbă",
          "Ulei de ovăz",
          "Ulei de orez",
          "Panthenol vegetal",
          "Bisabolol natural",
        ],
        avoidIngredients: [
          "Parfumuri sintetice sau naturale iritante (ex. ulei esențial de mentă)",
          "Alcool denaturat",
          "Acizi exfolianți",
          "Retinoizi",
          "Săpunuri alcaline",
          "Particule abrazive (scruburi fizice)",
        ],
        professionalAdvice:
          "Dacă sensibilitatea persistă sau se agravează, consultă un dermatolog sau fitoterapeut pentru o abordare personalizată, blândă și fără iritanți.",
        sources: [
          {
            name: "Dermatitis: Types, Causes, and Natural Remedies – NCBI",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7603389/",
          },
          {
            name: "Soothing Botanicals for Sensitive Skin – Phytotherapy Research",
            url: "https://onlinelibrary.wiley.com/doi/10.1002/ptr.6871",
          },
        ],
      },
      en: {
        type: "sensitive",
        title: "Sensitive Skin – Gentle and Mindful Care",
        description:
          "Sensitive skin reacts easily to external factors such as wind, temperature changes, pollution, or certain cosmetic ingredients. It may sting, burn, flush, or become irritated — even when treated with care and good intentions.\n\nSensitivity is not a skin type but rather a condition that can occur in dry, combination, or even oily skin. That's why choosing gentle products, free of fragrances and irritants, is essential.\n\nWith a simple routine, calming plant-based ingredients, and a bit of patience, sensitive skin can return to a more balanced and comfortable state.",
        dailyRoutine: [
          "Cleanse with a gentle, fragrance-free botanical milk or gel",
          "Tone with calming floral water (e.g., chamomile, lavender, lemon balm)",
          "Apply a simple serum with few ingredients (e.g., aloe vera or mallow)",
          "Use a calming facial oil (e.g., rice, oat, hemp) on damp skin",
          "Apply a light cream or protective balm with soothing plant extracts",
          "Avoid frequent exfoliation or intense treatments",
        ],
        recommendedProducts: [
          "Calming floral water (chamomile, lavender, lemon balm)",
          "Serum with aloe vera or mallow",
          "Facial oil with rice or oat",
          "Protective balm with anti-inflammatory herbs",
          "Simple, fragrance-free cream",
          "Compresses with calming herbal infusions",
        ],
        lifestyleTips: [
          "Avoid sudden temperature changes",
          "Use soft face textiles (organic cotton, gauze)",
          "Wash your face with lukewarm water, not hot",
          "Reduce stress – internal inflammation affects the skin",
          "Introduce new products gradually and observe reactions",
        ],
        ingredients: [
          "Aloe vera",
          "Chamomile extract",
          "Mallow extract",
          "Oat oil",
          "Rice oil",
          "Botanical panthenol",
          "Natural bisabolol",
        ],
        avoidIngredients: [
          "Synthetic or irritating natural fragrances (e.g., peppermint essential oil)",
          "Denatured alcohol",
          "Exfoliating acids",
          "Retinoids",
          "Alkaline soaps",
          "Abrasive particles (physical scrubs)",
        ],
        professionalAdvice:
          "If sensitivity persists or worsens, consult a dermatologist or herbal practitioner for a personalized, gentle, and irritant-free approach.",
        sources: [
          {
            name: "Dermatitis: Types, Causes, and Natural Remedies – NCBI",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7603389/",
          },
          {
            name: "Soothing Botanicals for Sensitive Skin – Phytotherapy Research",
            url: "https://onlinelibrary.wiley.com/doi/10.1002/ptr.6871",
          },
        ],
      },
    },
  };

// Aging Recommendations
export const AGING_RECOMMENDATIONS: Record<string, AgingRecommendation> = {
  young: {
    ro: {
      title: "Piele Tânără - Menține Vitalitatea",
      description:
        "Felicitări! Pielea ta arată mai tânără decât vârsta reală. Continuă obiceiurile sănătoase!",
      antiAgingRoutine: [
        "Curățare delicată zilnică",
        "Ser cu vitamina C dimineața",
        "Cremă hidratantă cu SPF 30+",
        "Ser cu retinol seara (începe cu concentrații mici)",
        "Mască hidratantă de 1-2 ori pe săptămână",
        "Exfoliere delicată săptămânal",
      ],
      lifestyleChanges: [
        "Continuă să folosești protecție solară zilnic",
        "Menține o dietă bogată în antioxidanți",
        "Fă exerciții fizice regulat",
        "Dormi 7-8 ore pe noapte",
        "Bea suficientă apă",
        "Evită fumatul și alcoolul în exces",
      ],
      professionalTreatments: [
        "Consultatii regulate cu dermatologul",
        "Tratamente preventive cu laser",
        "Mascări profesionale ocazionale",
        "Peeling-uri chimice ușoare",
      ],
      preventionTips: [
        "Protejează-te de soare încă de acum",
        "Folosește produse cu antioxidanți",
        "Menține o rutină consistentă",
        "Monitorizează schimbările pielii",
        "Investește în produse de calitate",
      ],
    },
    en: {
      title: "Young Skin - Maintain Vitality",
      description:
        "Congratulations! Your skin looks younger than your actual age. Keep up the healthy habits!",
      antiAgingRoutine: [
        "Daily gentle cleansing",
        "Vitamin C serum in the morning",
        "Moisturizer with SPF 30+",
        "Retinol serum in the evening (start with low concentrations)",
        "Hydrating mask 1-2 times per week",
        "Gentle weekly exfoliation",
      ],
      lifestyleChanges: [
        "Continue using daily sun protection",
        "Maintain an antioxidant-rich diet",
        "Exercise regularly",
        "Sleep 7-8 hours per night",
        "Drink enough water",
        "Avoid smoking and excessive alcohol",
      ],
      professionalTreatments: [
        "Regular consultations with dermatologist",
        "Preventive laser treatments",
        "Occasional professional facials",
        "Light chemical peels",
      ],
      preventionTips: [
        "Protect yourself from the sun starting now",
        "Use products with antioxidants",
        "Maintain a consistent routine",
        "Monitor skin changes",
        "Invest in quality products",
      ],
    },
  },
  "normal-aging": {
    ro: {
      title: "Îmbătrânire Normală - Optimizează Rutina",
      description:
        "Pielea ta arată conform vârstei tale. Iată cum să optimizezi rutina pentru un aspect mai tânăr.",
      antiAgingRoutine: [
        "Curățare cu un cleanser hidratant",
        "Ser cu vitamina C dimineața",
        "Cremă hidratantă cu SPF 30+",
        "Ser cu retinol seara",
        "Cremă hidratantă bogată seara",
        "Mască anti-aging săptămânal",
      ],
      lifestyleChanges: [
        "Începe să folosești protecție solară zilnic",
        "Îmbunătățește dieta cu mai multe legume și fructe",
        "Fă exerciții fizice de 3-4 ori pe săptămână",
        "Încearcă să dormi mai mult",
        "Bea mai multă apă",
        "Reduce stresul prin meditație sau yoga",
      ],
      professionalTreatments: [
        "Consultatii cu dermatologul",
        "Peeling-uri chimice",
        "Tratamente cu laser pentru riduri fine",
        "Injectări cu acid hialuronic (dacă e necesar)",
      ],
      preventionTips: [
        "Nu e prea târziu să începi protecția solară",
        "Folosește produse anti-aging",
        "Menține o rutină consistentă",
        "Protejează-te de stresul oxidativ",
        "Investește în produse de calitate",
      ],
    },
    en: {
      title: "Normal Aging - Optimize Your Routine",
      description:
        "Your skin looks appropriate for your age. Here's how to optimize your routine for a younger appearance.",
      antiAgingRoutine: [
        "Cleanse with a hydrating cleanser",
        "Vitamin C serum in the morning",
        "Moisturizer with SPF 30+",
        "Retinol serum in the evening",
        "Rich moisturizer in the evening",
        "Weekly anti-aging mask",
      ],
      lifestyleChanges: [
        "Start using daily sun protection",
        "Improve diet with more vegetables and fruits",
        "Exercise 3-4 times per week",
        "Try to sleep more",
        "Drink more water",
        "Reduce stress through meditation or yoga",
      ],
      professionalTreatments: [
        "Consultations with dermatologist",
        "Chemical peels",
        "Laser treatments for fine lines",
        "Hyaluronic acid injections (if needed)",
      ],
      preventionTips: [
        "It's not too late to start sun protection",
        "Use anti-aging products",
        "Maintain a consistent routine",
        "Protect yourself from oxidative stress",
        "Invest in quality products",
      ],
    },
  },
  "accelerated-aging": {
    ro: {
      title: "Îmbătrânire Accelerată - Acțiune Imediată",
      description:
        "Semne de îmbătrânire accelerată. E timpul să schimbi rutina și stilul de viață pentru a-ți proteja pielea!",
      antiAgingRoutine: [
        "Curățare delicată cu un cleanser hidratant",
        "Ser cu vitamina C dimineața",
        "Cremă hidratantă cu SPF 50+",
        "Ser cu retinol seara (începe cu concentrații mici)",
        "Cremă hidratantă bogată seara",
        "Mască hidratantă de 2-3 ori pe săptămână",
      ],
      lifestyleChanges: [
        "Începe imediat să folosești protecție solară zilnic",
        "Schimbă dieta - mai multe legume, fructe, proteine",
        "Începe un program de exerciții fizice",
        "Încearcă să dormi 7-8 ore pe noapte",
        "Bea cel puțin 2L de apă zilnic",
        "Reduce stresul și fumatul",
        "Evită alcoolul în exces",
      ],
      professionalTreatments: [
        "Consultatii urgente cu dermatologul",
        "Tratamente profesionale anti-aging",
        "Peeling-uri chimice intensive",
        "Tratamente cu laser",
        "Injectări cu acid hialuronic",
        "Tratamente cu toxina botulinică (dacă e necesar)",
      ],
      preventionTips: [
        "Nu e prea târziu să faci schimbări",
        "Începe cu schimbările de stil de viață",
        "Investește în produse anti-aging de calitate",
        "Fii consistent cu rutina",
        "Monitorizează progresul lunar",
      ],
    },
    en: {
      title: "Accelerated Aging - Immediate Action Required",
      description:
        "Signs of accelerated aging. It's time to change your routine and lifestyle to protect your skin!",
      antiAgingRoutine: [
        "Gentle cleansing with a hydrating cleanser",
        "Vitamin C serum in the morning",
        "Moisturizer with SPF 50+",
        "Retinol serum in the evening (start with low concentrations)",
        "Rich moisturizer in the evening",
        "Hydrating mask 2-3 times per week",
      ],
      lifestyleChanges: [
        "Start using daily sun protection immediately",
        "Change diet - more vegetables, fruits, protein",
        "Start an exercise program",
        "Try to sleep 7-8 hours per night",
        "Drink at least 2L of water daily",
        "Reduce stress and smoking",
        "Avoid excessive alcohol",
      ],
      professionalTreatments: [
        "Urgent consultations with dermatologist",
        "Professional anti-aging treatments",
        "Intensive chemical peels",
        "Laser treatments",
        "Hyaluronic acid injections",
        "Botulinum toxin treatments (if needed)",
      ],
      preventionTips: [
        "It's not too late to make changes",
        "Start with lifestyle changes",
        "Invest in quality anti-aging products",
        "Be consistent with your routine",
        "Monitor progress monthly",
      ],
    },
  },
};

// Helper function to get skin type from score
export const getSkinTypeFromScore = (score: number): string => {
  if (score <= 2) return "dry";
  if (score <= 5) return "normal-mixed";
  return "oily";
};

// Helper function to get aging category from score
export const getAgingCategoryFromScore = (score: number): string => {
  if (score <= 6) return "young";
  if (score <= 14) return "normal-aging";
  return "accelerated-aging";
};

// PDF content generator
export const generatePDFContent = (
  quizTitle: string,
  score: number,
  resultText: string,
  userName: string,
  quizResult?: {
    minScore: number;
    maxScore: number;
    text: string | { ro: string; en: string };
  },
  language: "ro" | "en" = "ro",
) => {
  const skinType = getSkinTypeFromScore(score);
  const agingCategory = getAgingCategoryFromScore(score);

  const skinRecommendation = SKIN_TYPE_RECOMMENDATIONS[skinType];
  const agingRecommendation = AGING_RECOMMENDATIONS[agingCategory];

  return {
    skinType,
    agingCategory,
    skinRecommendation,
    agingRecommendation,
    score,
    resultText,
    userName,
    quizTitle,
    quizResult,
    language,
  };
};
