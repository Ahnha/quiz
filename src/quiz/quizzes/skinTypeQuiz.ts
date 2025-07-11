import { QuizDef } from '../type';

const skinTypeQuiz: QuizDef = {
    icon: "🌱",
    id: "skin-type",
    title: {
        ro: 'Ce tip de piele ai?',
        en: 'What Is Your Skin Type?'
    },
    description: {
        ro: "Acest chestionar te ajută să îți identifici tipul real de piele, analizând nivelul de hidratare, producția de sebum, sensibilitatea și reacția la factori externi.",
        en: "This quiz helps you identify your true skin type based on hydration, oil production, sensitivity, and reactions to environment."
    },
    questions: [
        {
            question: {
                ro: "Cum se simte pielea ta imediat după ce te speli pe față?",
                en: "How does your skin feel right after washing?"
            },
            options: [
                { text: { ro: "Strânsă și uscată ❌", en: "Tight and dry ❌" }, score: 0 },
                { text: { ro: "Puțin uscată, dar își revine după aplicarea cremei ⚠️", en: "Slightly dry ⚠️" }, score: 2 },
                { text: { ro: "Normală, confortabilă ✅", en: "Comfortable ✅" }, score: 4 },
                { text: { ro: "Ușor lucioasă ✅", en: "Slightly oily ✅" }, score: 5 },
                { text: { ro: "Foarte grasă, uleioasă ✅", en: "Very oily ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Ai porțiuni de piele care se descuamează sau sunt aspre?",
                en: "Do you get flaking or rough patches?"
            },
            options: [
                { text: { ro: "Da, tot timpul ❌", en: "Often ❌" }, score: 0 },
                { text: { ro: "Uneori, iarna ⚠️", en: "Sometimes ⚠️" }, score: 2 },
                { text: { ro: "Rar ✅", en: "Rarely ✅" }, score: 4 },
                { text: { ro: "Niciodată ✅", en: "Never ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Cum îți absoarbe pielea crema hidratantă?",
                en: "How does your skin absorb moisturizer?"
            },
            options: [
                { text: { ro: "Imediat, parcă dispare în piele ❌", en: "Instantly ❌" }, score: 0 },
                { text: { ro: "Se absoarbe bine, dar trebuie să reaplic uneori ⚠️", en: "Absorbs but I need to reapply ⚠️" }, score: 2 },
                { text: { ro: "Se simte hidratată pentru mult timp ✅", en: "Feels hydrated long after ✅" }, score: 4 },
                { text: { ro: "Crema rămâne la suprafață și pielea se simte uleioasă ✅", en: "It sits on my skin, feels greasy ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Cum se simte pielea ta la prânz (după câteva ore de la spălare)?",
                en: "How does your skin feel by midday?"
            },
            options: [
                { text: { ro: "Foarte uscată, strânsă ❌", en: "Dry ❌" }, score: 0 },
                { text: { ro: "Confortabilă ✅", en: "Comfortable ✅" }, score: 4 },
                { text: { ro: "Ușor lucioasă în zona T ✅", en: "Shiny in T-zone ✅" }, score: 5 },
                { text: { ro: "Foarte grasă peste tot ✅", en: "Very oily all over ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Cât de des trebuie să folosești șervețele matifiante sau pudră?",
                en: "How often do you blot or use powder?"
            },
            options: [
                { text: { ro: "Niciodată ❌", en: "Never ❌" }, score: 0 },
                { text: { ro: "O dată sau de două ori pe zi ✅", en: "Once/twice a day ✅" }, score: 4 },
                { text: { ro: "De mai multe ori pe zi ✅", en: "Multiple times a day ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Cum arată porii tăi?",
                en: "What do your pores look like?"
            },
            options: [
                { text: { ro: "Aproape invizibili ❌", en: "Barely visible ❌" }, score: 0 },
                { text: { ro: "Mici și rafinați ⚠️", en: "Small ⚠️" }, score: 3 },
                { text: { ro: "Destul de vizibili în zona T ✅", en: "Noticeable in T-zone ✅" }, score: 4 },
                { text: { ro: "Mari și evidenți pe toată fața ✅", en: "Large everywhere ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Cum reacționează pielea ta la produse cosmetice noi?",
                en: "How does your skin react to new products?"
            },
            options: [
                { text: { ro: "Se irită, apare roșeața sau coșuri ❌", en: "Always irritated ❌" }, score: 0 },
                { text: { ro: "Uneori mă irită puțin ⚠️", en: "Sometimes sensitive ⚠️" }, score: 3 },
                { text: { ro: "Nu am niciodată reacții negative ✅", en: "Never ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Cât de des pielea ta devine roșie sau iritată?",
                en: "Does your skin get red or inflamed often?"
            },
            options: [
                { text: { ro: "Foarte des, chiar și din cauza vremii ❌", en: "Yes ❌" }, score: 0 },
                { text: { ro: "Uneori, dar nu este extrem ⚠️", en: "Occasionally ⚠️" }, score: 3 },
                { text: { ro: "Foarte rar ✅", en: "Rarely ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Simți pielea că te mănâncă sau înțeapă după spălare?",
                en: "Does your skin feel itchy or tingly after washing?"
            },
            options: [
                { text: { ro: "Mereu ❌", en: "Yes ❌" }, score: 0 },
                { text: { ro: "Uneori ⚠️", en: "Sometimes ⚠️" }, score: 3 },
                { text: { ro: "Niciodată ✅", en: "Never ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Cum se simte pielea ta în zilele foarte calde și umede?",
                en: "How does your skin react in heat/humidity?"
            },
            options: [
                { text: { ro: "Și mai uscată ❌", en: "Drier ❌" }, score: 0 },
                { text: { ro: "Confortabilă ✅", en: "Comfortable ✅" }, score: 4 },
                { text: { ro: "Lucioasă, uleioasă ✅", en: "Oily ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Cum se simte pielea ta iarna?",
                en: "How does it feel in cold weather?"
            },
            options: [
                { text: { ro: "Se usucă extrem de tare, crăpă ❌", en: "Very dry/cracked ❌" }, score: 0 },
                { text: { ro: "Trebuie să aplic cremă mai des ⚠️", en: "Needs extra moisture ⚠️" }, score: 3 },
                { text: { ro: "Nu observ nicio schimbare ✅", en: "Unchanged ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Apar coșuri când mănânci alimente grase sau dulci?",
                en: "Do you break out from greasy/sugary food?"
            },
            options: [
                { text: { ro: "Da, de fiecare dată ❌", en: "Yes ❌" }, score: 0 },
                { text: { ro: "Uneori ⚠️", en: "Sometimes ⚠️" }, score: 3 },
                { text: { ro: "Niciodată ✅", en: "Never ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Există antecedente familiale de afecțiuni ale pielii (de exemplu, acnee, eczeme)?",
                en: "Do family members have skin issues (acne, eczema)?"
            },
            options: [
                { text: { ro: "Da ❌", en: "Yes ❌" }, score: 0 },
                { text: { ro: "Nu ✅", en: "No ✅" }, score: 5 },
            ],
        },
        {
            question: {
                ro: "Ai observat schimbări în tipul pielii tale în funcție de ciclul menstrual sau alte fluctuații hormonale?",
                en: "Does your skin change with your cycle or hormones?"
            },
            options: [
                { text: { ro: "Da, pielea devine mai grasă/uscată ❌", en: "Yes ❌" }, score: 0 },
                { text: { ro: "Nu observ nicio schimbare ✅", en: "No ✅" }, score: 5 },
            ],
        },
    ],
    results: [
        {
            minScore: 0,
            maxScore: 30,
            text: {
                ro: "🟢 Ten Uscat\n\nPielea ta are nevoie de hidratare intensă.\n\n✔ Săpunuri recomandate:\n• Săpun cu avocado\n• Săpun cu unt de shea\n• Săpun cu ovăz și miere\n\n📚 Referințe științifice:\n• Journal of Clinical and Aesthetic Dermatology, 2021\n• International Journal of Cosmetic Science, 2020",
                en: "🟢 Dry Skin\n\nYour skin needs intensive hydration.\n\n✔ Recommended soaps:\n• Avocado soap\n• Shea butter soap\n• Oatmeal and honey soap\n\n📚 Scientific references:\n• Journal of Clinical and Aesthetic Dermatology, 2021\n• International Journal of Cosmetic Science, 2020"
            }
        },
        {
            minScore: 31,
            maxScore: 50,
            text: {
                ro: "🟡 Ten Gras\n\nPielea ta produce prea mult sebum și poate avea tendință acneică.\n\n✔ Săpunuri recomandate:\n• Săpun cu cărbune activ și arbore de ceai (absorbție de sebum și curățare profundă)\n• Săpun cu argilă verde și lămâiță (reglează producția de sebum)\n• Săpun cu sare de mare (exfoliere blândă și efect antiseptic)\n\n📚 Referințe științifice:\n• Journal of Dermatological Science, 2020\n• Clinical, Cosmetic and Investigational Dermatology, 2021",
                en: "🟡 Oily Skin\n\nYour skin produces too much sebum and may have acne-prone tendencies.\n\n✔ Recommended soaps:\n• Activated charcoal and tea tree soap (sebum absorption and deep cleansing)\n• Green clay and lemon soap (regulates sebum production)\n• Sea salt soap (gentle exfoliation and antiseptic effect)\n\n📚 Scientific references:\n• Journal of Dermatological Science, 2020\n• Clinical, Cosmetic and Investigational Dermatology, 2021"
            }
        },
        {
            minScore: 51,
            maxScore: 70,
            text: {
                ro: "🔵 Ten Mixt\n\nPielea ta este grasă în zona T și uscată în alte zone.\n\n✔ Săpunuri recomandate:\n• Săpun cu lapte de capră și miere (hidratare echilibrată)\n• Săpun cu lavandă și ulei de jojoba (reglează sebumul fără a usca pielea)\n• Săpun cu cărbune activ și argilă roz (purificare delicată)\n\n📚 Referințe științifice:\n• Dermatology Research and Practice, 2021\n• Journal of Drugs in Dermatology, 2020",
                en: "🔵 Combination Skin\n\nYour skin is oily in the T-zone and dry in other areas.\n\n✔ Recommended soaps:\n• Goat milk and honey soap (balanced hydration)\n• Lavender and jojoba oil soap (regulates sebum without drying)\n• Activated charcoal and pink clay soap (gentle purification)\n\n📚 Scientific references:\n• Dermatology Research and Practice, 2021\n• Journal of Drugs in Dermatology, 2020"
            }
        },
        {
            minScore: 71,
            maxScore: 90,
            text: {
                ro: "🟠 Ten Sensibil\n\nPielea ta reacționează ușor la factori externi și are nevoie de îngrijire delicată.\n\n✔ Săpunuri recomandate:\n• Săpun cu gălbenele și mușețel (calmează iritațiile și roșeața)\n• Săpun cu aloe vera și castravete (efect răcoritor și hidratant)\n• Săpun cu unt de shea, fără parfum (fără iritanți, potrivit pentru pielea reactivă)\n\n📚 Referințe științifice:\n• Contact Dermatitis, 2021\n• Journal of the European Academy of Dermatology, 2020",
                en: "🟠 Sensitive Skin\n\nYour skin reacts easily to external factors and needs gentle care.\n\n✔ Recommended soaps:\n• Calendula and chamomiles soap (soothes irritation and redness)\n• Aloe vera and cucumber soap (cooling and hydrating effect)\n• Shea butter soap, fragrance-free (no irritants, suitable for reactive skin)\n\n📚 Scientific references:\n• Contact Dermatitis, 2021\n• Journal of the European Academy of Dermatology, 2020"
            }
        },
        {
            minScore: 91,
            maxScore: 100,
            text: {
                ro: "⚪ Ten Normal\n\nPielea ta este echilibrată și sănătoasă.\n\n✔ Săpunuri recomandate:\n• Săpun cu lapte de capră și miere (menține echilibrul pielii)\n• Săpun cu lavandă și ulei de măsline (curățare blândă și hrănire)\n• Săpun cu lapte de cocos și citrice (revitalizant și delicat parfumat)\n\n📚 Referințe științifice:\n• Journal of the American Academy of Dermatology, 2021\n• British Journal of Dermatology, 2020",
                en: "⚪ Normal Skin\n\nYour skin is balanced and healthy.\n\n✔ Recommended soaps:\n• Goat milk and honey soap (maintains skin balance)\n• Lavender and olive oil soap (gentle cleansing and nourishment)\n• Coconut milk and citrus soap (revitalizing and delicately scented)\n\n📚 Scientific references:\n• Journal of the American Academy of Dermatology, 2021\n• British Journal of Dermatology, 2020"
            }
        },
    ],
};

export default skinTypeQuiz;
