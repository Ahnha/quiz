// PATTERN: Data Layer - Centralized skin care recommendations
// Contains detailed information for PDF generation and email content

export interface SkinCareRecommendation {
    title: string;
    description: string;
    dailyRoutine: string[];
    recommendedProducts: string[];
    lifestyleTips: string[];
    ingredients: string[];
    avoidIngredients: string[];
    professionalAdvice: string;
}

export interface AgingRecommendation {
    title: string;
    description: string;
    antiAgingRoutine: string[];
    lifestyleChanges: string[];
    professionalTreatments: string[];
    preventionTips: string[];
}

// Skin Type Recommendations
export const SKIN_TYPE_RECOMMENDATIONS: Record<string, SkinCareRecommendation> = {
    'dry': {
        title: 'Piele Uscată - Ghid Complet de Îngrijire',
        description: 'Pielea ta are nevoie de hidratare intensă și protecție suplimentară. Iată cum să o îngrijești corect.',
        dailyRoutine: [
            'Curățare delicată cu un cleanser hidratant, fără sulfați',
            'Tonifiere cu un toner hidratant, fără alcool',
            'Ser cu acid hialuronic pentru hidratare profundă',
            'Cremă hidratantă bogată cu ceramide și uleiuri naturale',
            'Protecție solară SPF 30+ dimineața',
            'Mască hidratantă de 2-3 ori pe săptămână'
        ],
        recommendedProducts: [
            'Cleanser cremos hidratant',
            'Ser cu acid hialuronic',
            'Cremă hidratantă cu ceramide',
            'Ulei facial (jojoba, argan)',
            'Mască hidratantă intensă',
            'Protecție solară minerală'
        ],
        lifestyleTips: [
            'Bea cel puțin 2L de apă zilnic',
            'Evită să faci duș prea fierbinte',
            'Folosește un umidificator în cameră',
            'Protejează-te de vânt și frig',
            'Evită să exfoliezi prea des'
        ],
        ingredients: [
            'Acid hialuronic',
            'Ceramide',
            'Glicerină',
            'Ulei de jojoba',
            'Ulei de argan',
            'Vitamina E',
            'Panthenol'
        ],
        avoidIngredients: [
            'Sulfați (SLS, SLES)',
            'Alcool denaturat',
            'Parfumuri sintetice',
            'Exfolianți fizici agresivi',
            'Retinol (în exces)'
        ],
        professionalAdvice: 'Consultă un dermatolog pentru o rutină personalizată și pentru a exclude afecțiuni cutanate care pot cauza uscăciunea.'
    },
    'normal-mixed': {
        title: 'Piele Normală/Mixtă - Menține Echilibrul Perfect',
        description: 'Pielea ta este echilibrată! Menține această stare cu o rutină adaptată nevoilor tale.',
        dailyRoutine: [
            'Curățare cu un cleanser echilibrat',
            'Tonifiere cu un toner ușor',
            'Ser cu vitamina C dimineața',
            'Cremă hidratantă ușoară',
            'Protecție solară SPF 30+',
            'Exfoliere delicată de 1-2 ori pe săptămână'
        ],
        recommendedProducts: [
            'Cleanser gel echilibrat',
            'Ser cu vitamina C',
            'Cremă hidratantă ușoară',
            'Exfoliant chimic (AHA/BHA)',
            'Mască de hidratare',
            'Protecție solară ușoară'
        ],
        lifestyleTips: [
            'Menține o rutină consistentă',
            'Adaptează produsele în funcție de sezon',
            'Monitorizează schimbările pielii',
            'Protejează-te de stresul oxidativ',
            'Dormi suficient pentru regenerare'
        ],
        ingredients: [
            'Vitamina C',
            'Niacinamidă',
            'Acid hialuronic',
            'Peptide',
            'Antioxidanți',
            'Glicerină'
        ],
        avoidIngredients: [
            'Produse prea grase',
            'Produse prea uscate',
            'Exfolianți agresivi',
            'Parfumuri puternice'
        ],
        professionalAdvice: 'Pielea normală/mixtă poate schimba în timp. Monitorizează schimbările și adaptează rutina în consecință.'
    },
    'oily': {
        title: 'Piele Grasă - Ghid pentru Controlul Sebumului',
        description: 'Pielea ta produce exces de sebum. Iată cum să o controlezi fără să o iritezi.',
        dailyRoutine: [
            'Curățare cu un cleanser pentru piele grasă',
            'Tonifiere cu un toner cu acid salicilic',
            'Ser cu niacinamidă pentru controlul sebumului',
            'Cremă hidratantă ușoară, fără uleiuri',
            'Protecție solară matifiantă',
            'Exfoliere cu BHA de 2-3 ori pe săptămână'
        ],
        recommendedProducts: [
            'Cleanser cu acid salicilic',
            'Ser cu niacinamidă',
            'Cremă hidratantă ușoară',
            'Exfoliant cu acid salicilic',
            'Mască cu argilă',
            'Protecție solară matifiantă'
        ],
        lifestyleTips: [
            'Nu supra-curăța pielea (maxim 2x pe zi)',
            'Evită să atingi fața cu mâinile',
            'Schimbă pernele des',
            'Folosește hârtie absorbantă pentru sebum',
            'Menține o dietă echilibrată'
        ],
        ingredients: [
            'Acid salicilic',
            'Niacinamidă',
            'Zinc PCA',
            'Acid azelaic',
            'Tea tree oil',
            'Argilă'
        ],
        avoidIngredients: [
            'Uleiuri minerale',
            'Produse comedogenice',
            'Cremă hidratantă prea grasă',
            'Exfolianți fizici agresivi'
        ],
        professionalAdvice: 'Dacă acneea persistă, consultă un dermatolog pentru tratament medicamentos specific.'
    }
};

// Aging Recommendations
export const AGING_RECOMMENDATIONS: Record<string, AgingRecommendation> = {
    'young': {
        title: 'Piele Tânără - Menține Vitalitatea',
        description: 'Felicitări! Pielea ta arată mai tânără decât vârsta reală. Continuă obiceiurile sănătoase!',
        antiAgingRoutine: [
            'Curățare delicată zilnică',
            'Ser cu vitamina C dimineața',
            'Cremă hidratantă cu SPF 30+',
            'Ser cu retinol seara (începe cu concentrații mici)',
            'Mască hidratantă de 1-2 ori pe săptămână',
            'Exfoliere delicată săptămânal'
        ],
        lifestyleChanges: [
            'Continuă să folosești protecție solară zilnic',
            'Menține o dietă bogată în antioxidanți',
            'Fă exerciții fizice regulat',
            'Dormi 7-8 ore pe noapte',
            'Bea suficientă apă',
            'Evită fumatul și alcoolul în exces'
        ],
        professionalTreatments: [
            'Consultatii regulate cu dermatologul',
            'Tratamente preventive cu laser',
            'Mascări profesionale ocazionale',
            'Peeling-uri chimice ușoare'
        ],
        preventionTips: [
            'Protejează-te de soare încă de acum',
            'Folosește produse cu antioxidanți',
            'Menține o rutină consistentă',
            'Monitorizează schimbările pielii',
            'Investește în produse de calitate'
        ]
    },
    'normal-aging': {
        title: 'Îmbătrânire Normală - Optimizează Rutina',
        description: 'Pielea ta arată conform vârstei tale. Iată cum să optimizezi rutina pentru un aspect mai tânăr.',
        antiAgingRoutine: [
            'Curățare cu un cleanser hidratant',
            'Ser cu vitamina C dimineața',
            'Cremă hidratantă cu SPF 30+',
            'Ser cu retinol seara',
            'Cremă hidratantă bogată seara',
            'Mască anti-aging săptămânal'
        ],
        lifestyleChanges: [
            'Începe să folosești protecție solară zilnic',
            'Îmbunătățește dieta cu mai multe legume și fructe',
            'Fă exerciții fizice de 3-4 ori pe săptămână',
            'Încearcă să dormi mai mult',
            'Bea mai multă apă',
            'Reduce stresul prin meditație sau yoga'
        ],
        professionalTreatments: [
            'Consultatii cu dermatologul',
            'Peeling-uri chimice',
            'Tratamente cu laser pentru riduri fine',
            'Injectări cu acid hialuronic (dacă e necesar)'
        ],
        preventionTips: [
            'Nu e prea târziu să începi protecția solară',
            'Folosește produse anti-aging',
            'Menține o rutină consistentă',
            'Protejează-te de stresul oxidativ',
            'Investește în produse de calitate'
        ]
    },
    'accelerated-aging': {
        title: 'Îmbătrânire Accelerată - Acțiune Imediată',
        description: 'Semne de îmbătrânire accelerată. E timpul să schimbi rutina și stilul de viață pentru a-ți proteja pielea!',
        antiAgingRoutine: [
            'Curățare delicată cu un cleanser hidratant',
            'Ser cu vitamina C dimineața',
            'Cremă hidratantă cu SPF 50+',
            'Ser cu retinol seara (începe cu concentrații mici)',
            'Cremă hidratantă bogată seara',
            'Mască hidratantă de 2-3 ori pe săptămână'
        ],
        lifestyleChanges: [
            'Începe imediat să folosești protecție solară zilnic',
            'Schimbă dieta - mai multe legume, fructe, proteine',
            'Începe un program de exerciții fizice',
            'Încearcă să dormi 7-8 ore pe noapte',
            'Bea cel puțin 2L de apă zilnic',
            'Reduce stresul și fumatul',
            'Evită alcoolul în exces'
        ],
        professionalTreatments: [
            'Consultatii urgente cu dermatologul',
            'Tratamente profesionale anti-aging',
            'Peeling-uri chimice intensive',
            'Tratamente cu laser',
            'Injectări cu acid hialuronic',
            'Tratamente cu toxina botulinică (dacă e necesar)'
        ],
        preventionTips: [
            'Nu e prea târziu să faci schimbări',
            'Începe cu schimbările de stil de viață',
            'Investește în produse anti-aging de calitate',
            'Fii consistent cu rutina',
            'Monitorizează progresul lunar'
        ]
    }
};

// Helper function to get skin type from score
export const getSkinTypeFromScore = (score: number): string => {
    if (score <= 2) return 'dry';
    if (score <= 5) return 'normal-mixed';
    return 'oily';
};

// Helper function to get aging category from score
export const getAgingCategoryFromScore = (score: number): string => {
    if (score <= 6) return 'young';
    if (score <= 14) return 'normal-aging';
    return 'accelerated-aging';
};

// PDF content generator
export const generatePDFContent = (
    quizTitle: string,
    score: number,
    resultText: string,
    userName: string
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
        quizTitle
    };
}; 