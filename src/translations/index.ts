export type Language = "en" | "ro";

export interface Translations {
  // Navigation
  nav: {
    home: string;
    quiz: string;
  };

  // Landing Page
  landing: {
    hero: {
      title: string;
      subtitle: string;
      startJourney: string;
      exploreProducts: string;
    };
    features: {
      title: string;
      subtitle: string;
      natural: {
        title: string;
        description: string;
      };
      handcrafted: {
        title: string;
        description: string;
      };
      personalized: {
        title: string;
        description: string;
      };
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
    medicalDisclaimer: {
      title: string;
      text: string;
    };
  };

  // Quiz Page
  quiz: {
    title: string;
    subtitle: string;
    questions: string;
    minutes: string;
    startQuiz: string;
    back: string;
    resultTitle: string;
    score: string;
    backToQuizzes: string;
    restart: string;
    whyTakeQuiz: {
      title: string;
      benefits: string[];
    };
    scientificReferences: {
      title: string;
      agingStudies: string[];
      skinTypeStudies: string[];
    };
    medicalDisclaimer: {
      title: string;
      text: string;
    };
  };

  // Quiz Result Form
  quizResultForm: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    nameRequired: string;
    emailLabel: string;
    emailPlaceholder: string;
    sendToOwner: string;
    captchaLabel: string;
    captchaPlaceholder: string;
    fillAllFields: string;
    captchaError: string;
    successMessage: string;
    errorMessage: string;
    cancel: string;
    send: string;
    sending: string;
    download: string;
    downloadReport: string;
    openReport: string;
    preview: string;
    quizName: string;
    score: string;
    result: string;
    medicalDisclaimer: {
      title: string;
      text: string;
    };
  };

  // Owner Dashboard
  ownerDashboard: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allQuizzes: string;
    downloadAll: string;
    totalResults: string;
    filteredResults: string;
    uniqueQuizzes: string;
    noResults: string;
    noResultsSubtitle: string;
    score: string;
    download: string;
    sentToOwner: string;
  };

  // GDPR Consent
  gdpr: {
    title: string;
    subtitle: string;
    description: string;
    necessary: {
      title: string;
      description: string;
      alwaysActive: string;
    };
    analytics: {
      title: string;
      description: string;
      purpose: string;
    };
    marketing: {
      title: string;
      description: string;
      purpose: string;
    };
    thirdParty: {
      title: string;
      description: string;
      purpose: string;
    };
    acceptAll: string;
    acceptNecessary: string;
    rejectAll: string;
    savePreferences: string;
    privacyPolicy: string;
    cookiePolicy: string;
    learnMore: string;
    consentDate: string;
    consentVersion: string;
  };

  // Footer
  footer: {
    description: string;
    quickLinks: string;
    legal: string;
    privacyPolicy: string;
    termsOfService: string;
    contact: string;
    connectWithUs: string;
    rightsReserved: string;
    products: string;
    handmadeSoaps: string;
    naturalCreams: string;
    skincareSets: string;
    learn: string;
    takeQuiz: string;
    ingredients: string;
    connect: string;
    about: string;
    privacy: string;
    copyright: string;
    handcrafted: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      quiz: "Quiz",
    },
    landing: {
      hero: {
        title: "Discover Your Natural Beauty",
        subtitle:
          "I believe in skincare that's informed, personalized, and gentle. The quizzes I've designed help you better understand your skin's needs and discover natural solutions that match your lifestyle.",
        startJourney: "Start Your Journey",
        exploreProducts: "Explore Products",
      },
      features: {
        title: "Why Choose Natural?",
        subtitle:
          "Experience the difference that nature and craftsmanship make",
        natural: {
          title: "100% Natural",
          description:
            "Pure ingredients from nature, carefully selected for your skin's health",
        },
        handcrafted: {
          title: "Handcrafted",
          description:
            "Each product is lovingly made by hand with attention to every detail",
        },
        personalized: {
          title: "Personalized",
          description:
            "Discover what works best for your unique skin through our smart quiz",
        },
      },
      cta: {
        title: "Ready to Transform Your Skincare?",
        subtitle:
          "Take our personalized quiz and discover your perfect natural routine",
        button: "Take the Quiz",
      },
      medicalDisclaimer: {
        title: "Disclaimer Medical",
        text: "This information is based on my own research and does not represent medical advice. The recommendations provided are for educational purposes only and should not replace professional medical consultation. Always consult with a qualified healthcare provider or dermatologist for medical concerns, skin conditions, or before starting any new skincare routine.",
      },
    },
    quiz: {
      title: "Discover Your Perfect Match",
      subtitle:
        "Take our personalized quiz to find the perfect natural products for your unique skin",
      questions: "questions",
      minutes: "~5 minutes",
      startQuiz: "Start Quiz",
      back: "Back",
      resultTitle: "Your Result",
      score: "Score",
      backToQuizzes: "Back to Quizzes",
      restart: "Restart Quiz",
      whyTakeQuiz: {
        title: "Why Take Our Quiz?",
        benefits: [
          "Personalized recommendations based on your skin type",
          "Discover natural ingredients that work for you",
          "Get detailed skincare routines and tips",
          "Learn about your skin's unique needs",
        ],
      },
      scientificReferences: {
        title: "Scientific References",
        agingStudies: [
          "Aging Studies: The impact of age on skin health and appearance.",
          "Skin Type Studies: Understanding different skin types and their unique needs.",
        ],
        skinTypeStudies: [
          "Skin Type Studies: Understanding different skin types and their unique needs.",
          "Aging Studies: The impact of age on skin health and appearance.",
        ],
      },
      medicalDisclaimer: {
        title: "Disclaimer Medical",
        text: "This information is based on my own research and does not represent medical advice. The recommendations provided are for educational purposes only and should not replace professional medical consultation. Always consult with a qualified healthcare provider or dermatologist for medical concerns, skin conditions, or before starting any new skincare routine.",
      },
    },
    quizResultForm: {
      title: "Send Quiz Results",
      nameLabel: "Name",
      namePlaceholder: "Enter your name",
      nameRequired: "Name is required",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      sendToOwner: "Send results to site owner",
      captchaLabel: "Security Check",
      captchaPlaceholder: "Enter answer",
      fillAllFields: "Please fill all fields",
      captchaError: "Incorrect CAPTCHA answer",
      successMessage: "Results sent successfully!",
      errorMessage: "Error sending results. Please try again.",
      cancel: "Cancel",
      send: "Send Results",
      sending: "Sending...",
      download: "Download Data",
      downloadReport: "Download Report",
      openReport: "Open Report",
      preview: "Preview",
      quizName: "Quiz",
      score: "Score",
      result: "Result",
      medicalDisclaimer: {
        title: "Disclaimer Medical",
        text: "This information is based on my own research and does not represent medical advice. The recommendations provided are for educational purposes only and should not replace professional medical consultation. Always consult with a qualified healthcare provider or dermatologist for medical concerns, skin conditions, or before starting any new skincare routine.",
      },
    },
    ownerDashboard: {
      title: "Owner Dashboard",
      subtitle: "Manage your quiz results and users",
      searchPlaceholder: "Search quizzes...",
      allQuizzes: "All Quizzes",
      downloadAll: "Download All Results",
      totalResults: "Total Results",
      filteredResults: "Filtered Results",
      uniqueQuizzes: "Unique Quizzes",
      noResults: "No results found",
      noResultsSubtitle: "Try adjusting your filters or search terms",
      score: "Score",
      download: "Download",
      sentToOwner: "Sent to Owner",
    },

    gdpr: {
      title: "Privacy Policy & Cookies",
      subtitle: "We care about your privacy and use of cookies.",
      description:
        "This website uses cookies to ensure you get the best experience on our website. By continuing to use this site, you agree to our use of cookies.",
      necessary: {
        title: "Necessary Cookies",
        description:
          "These cookies are essential for the website to function properly. Without them, the website would not work as intended.",
        alwaysActive: "Always active",
      },
      analytics: {
        title: "Analytics Cookies",
        description:
          "These cookies help us understand how visitors use our website. We use this information to improve our website and provide better services to our users.",
        purpose: "Analytics",
      },
      marketing: {
        title: "Marketing Cookies",
        description:
          "These cookies are used to track visitors across websites. The intention is to display relevant ads to you based on your interests.",
        purpose: "Marketing",
      },
      thirdParty: {
        title: "Third-Party Cookies",
        description:
          "These cookies are set by third-party services that provide additional functionality on our website, such as social media plugins or advertising.",
        purpose: "Third-party",
      },
      acceptAll: "Accept All",
      acceptNecessary: "Accept Necessary",
      rejectAll: "Reject All",
      savePreferences: "Save Preferences",
      privacyPolicy: "Privacy Policy",
      cookiePolicy: "Cookie Policy",
      learnMore: "Learn More",
      consentDate: "Consent Date",
      consentVersion: "Consent Version",
    },
    footer: {
      description:
        "I created Skin Studio to bring more clarity, gentleness, and simplicity to skincare. Everything you'll find here is designed to help you understand what truly suits your skin.",
      quickLinks: "Quick Links",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      contact: "Contact Us",
      connectWithUs: "Connect with us on social media",
      rightsReserved: "© 2025 Skin Studio. All rights reserved.",
      products: "Products",
      handmadeSoaps: "Handmade Soaps",
      naturalCreams: "Natural Creams",
      skincareSets: "Skincare Sets",
      learn: "Learn",
      takeQuiz: "Take Quiz",
      ingredients: "Ingredients",
      connect: "Connect",
      about: "About",
      privacy: "Privacy",
      copyright: "© 2025 Skin Studio. All rights reserved.",
      handcrafted: "Handcrafted with ❤️ for natural beauty",
    },
  },
  ro: {
    nav: {
      home: "Acasă",
      quiz: "Quiz",
    },
    landing: {
      hero: {
        title: "Descoperă Frumusețea Ta Naturală",
        subtitle:
          "Cred într-o îngrijire a pielii informată, personalizată și blândă. Chestionarele pe care le-am creat te ajută să înțelegi mai bine nevoile pielii tale și să descoperi soluții naturale potrivite stilului tău de viață.",
        startJourney: "Începe Călătoria",
        exploreProducts: "Explorează Produsele",
      },
      features: {
        title: "De Ce Să Alegi Natural?",
        subtitle: "Experimentează diferența pe care o fac natura și meșteșugul",
        natural: {
          title: "100% Natural",
          description:
            "Ingrediente pure din natură, selectate cu grijă pentru sănătatea pielii tale",
        },
        handcrafted: {
          title: "Handmade",
          description:
            "Fiecare produs este făcut cu dragoste de mână, cu atenție la fiecare detaliu",
        },
        personalized: {
          title: "Personalizat",
          description:
            "Descoperă ce funcționează cel mai bine pentru pielea ta unică prin quiz-ul nostru inteligent",
        },
      },
      cta: {
        title: "Gata Să-ți Transformi Îngrijirea Pielii?",
        subtitle:
          "Fă quiz-ul nostru personalizat și descoperă rutina ta naturală perfectă",
        button: "Fă Quiz-ul",
      },
      medicalDisclaimer: {
        title: "Disclaimer Medical",
        text: "Această informație se bazează pe propria mea cercetare și nu reprezintă sfaturi medicale. Recomandările furnizate sunt doar în scop educațional și nu ar trebui să înlocuiască consultația medicală profesională. Consultă întotdeauna cu un furnizor de îngrijire medicală calificat sau dermatolog pentru probleme medicale, afecțiuni ale pielii sau înainte de a începe orice rutină nouă de îngrijire a pielii.",
      },
    },
    quiz: {
      title: "Descoperă Potrivirea Ta Perfectă",
      subtitle:
        "Fă quiz-ul nostru personalizat pentru a găsi produsele naturale perfecte pentru pielea ta unică",
      questions: "întrebări",
      minutes: "~5 minute",
      startQuiz: "Începe Quiz-ul",
      back: "Înapoi",
      resultTitle: "Rezultatul Tău",
      score: "Scor",
      backToQuizzes: "Înapoi la Quiz-uri",
      restart: "Reîncepe Quiz-ul",
      whyTakeQuiz: {
        title: "De Ce Să Faci Quiz-ul Nostru?",
        benefits: [
          "Recomandări personalizate bazate pe tipul tău de piele",
          "Descoperă ingrediente naturale care funcționează pentru tine",
          "Primește rutine detaliate de îngrijire și sfaturi",
          "Învață despre nevoile unice ale pielii tale",
        ],
      },
      scientificReferences: {
        title: "Referințe Științifice",
        agingStudies: [
          "Studii de îmbătrânire: Impactul vârstei asupra sănătății și aspectului pielii.",
          "Studii de tip de piele: Înțelegerea diferitelor tipuri de piele și nevoile unice ale fiecăreia.",
        ],
        skinTypeStudies: [
          "Studii de tip de piele: Înțelegerea diferitelor tipuri de piele și nevoile unice ale fiecăreia.",
          "Studii de îmbătrânire: Impactul vârstei asupra sănătății și aspectului pielii.",
        ],
      },
      medicalDisclaimer: {
        title: "Disclaimer Medical",
        text: "Această informație se bazează pe propria mea cercetare și nu reprezintă sfaturi medicale. Recomandările furnizate sunt doar în scop educațional și nu ar trebui să înlocuiască consultația medicală profesională. Consultă întotdeauna cu un furnizor de îngrijire medicală calificat sau dermatolog pentru probleme medicale, afecțiuni ale pielii sau înainte de a începe orice rutină nouă de îngrijire a pielii.",
      },
    },
    quizResultForm: {
      title: "Trimite Rezultatele Quizului",
      nameLabel: "Nume",
      namePlaceholder: "Introduceți numele dumneavoastră",
      nameRequired: "Numele este obligatoriu",
      emailLabel: "Adresă de Email",
      emailPlaceholder: "Introduceți adresa dumneavoastră de email",
      sendToOwner: "Trimite rezultate către Skin Studio site-ului",
      captchaLabel: "Verificare Securitate",
      captchaPlaceholder: "Introduceți răspunsul",
      fillAllFields: "Vă rugăm să completați toate câmpurile",
      captchaError: "Răspuns incorect pentru CAPTCHA",
      successMessage: "Rezultatele au fost trimise cu succes!",
      errorMessage:
        "Eroare la trimiterea rezultatelor. Vă rugăm să încercați din nou.",
      cancel: "Anulare",
      send: "Trimite Rezultate",
      sending: "Trimitere...",
      download: "Descarcă Date",
      downloadReport: "Descarcă Raport",
      openReport: "Deschide Raportul",
      preview: "Previzualizare",
      quizName: "Quiz",
      score: "Scor",
      result: "Rezultat",
      medicalDisclaimer: {
        title: "Disclaimer Medical",
        text: "Această informație se bazează pe propria mea cercetare și nu reprezintă sfaturi medicale. Recomandările furnizate sunt doar în scop educațional și nu ar trebui să înlocuiască consultația medicală profesională. Consultă întotdeauna cu un furnizor de îngrijire medicală calificat sau dermatolog pentru probleme medicale, afecțiuni ale pielii sau înainte de a începe orice rutină nouă de îngrijire a pielii.",
      },
    },
    ownerDashboard: {
      title: "Tabloul de Comandă",
      subtitle: "Gestionați rezultatele quizurilor și utilizatorii",
      searchPlaceholder: "Cauta quiz-uri...",
      allQuizzes: "Toate Quiz-urile",
      downloadAll: "Descarcă Toate Rezultatele",
      totalResults: "Rezultate Totale",
      filteredResults: "Rezultate Filtrate",
      uniqueQuizzes: "Quiz-uri Unice",
      noResults: "Nu s-au găsit rezultate",
      noResultsSubtitle:
        "Încearcă să ajustezi filtrele sau termenii de căutare",
      score: "Scor",
      download: "Descarcă",
      sentToOwner: "Trimis către Proprietar",
    },

    gdpr: {
      title: "Politica de Confidențialitate & Cookie-uri",
      subtitle: "Ne pasăm de confidențialitatea și utilizarea cookie-urilor.",
      description:
        "Acest site folosește cookie-uri pentru a vă asigura cea mai bună experiență pe site-ul nostru. Continuând să utilizați acest site, sunteți de acord cu utilizarea cookie-urilor noastre.",
      necessary: {
        title: "Cookie-uri esențiale",
        description:
          "Aceste cookie-uri sunt esențiale pentru funcționarea site-ului. Fără ele, site-ul nu ar funcționa conform intenției.",
        alwaysActive: "Întotdeauna activ",
      },
      analytics: {
        title: "Cookie-uri de analiză",
        description:
          "Aceste cookie-uri ne ajută să înțelegem cum utilizatorii noștri utilizează site-ul nostru. Folosim această informație pentru a îmbunătăți site-ul nostru și pentru a vă oferi cele mai bune servicii.",
        purpose: "Analiză",
      },
      marketing: {
        title: "Cookie-uri de marketing",
        description:
          "Aceste cookie-uri sunt utilizate pentru a urmări vizitatorii pe diferite site-uri. Scopul este de a afișa anunțuri relevante pentru dvs. bazate pe interesele voastre.",
        purpose: "Marketing",
      },
      thirdParty: {
        title: "Cookie-uri de terță parte",
        description:
          "Aceste cookie-uri sunt setate de servicii de terță parte care oferă funcționalitate suplimentară pe site-ul nostru, cum ar fi plugin-uri pentru rețele sociale sau anunțuri.",
        purpose: "De terță parte",
      },
      acceptAll: "Acceptați Toate",
      acceptNecessary: "Acceptați Esențiale",
      rejectAll: "Respingeți Toate",
      savePreferences: "Salvați Preferințele",
      privacyPolicy: "Politica de Confidențialitate",
      cookiePolicy: "Politica Cookie-urilor",
      learnMore: "Află Mai Multe",
      consentDate: "Data Consimțământului",
      consentVersion: "Versiunea Consimțământului",
    },
    footer: {
      description:
        "Am creat Skin Studio din dorința de a aduce mai multă claritate, blândețe și naturalețe în îngrijirea pielii. Tot ce găsești aici e gândit cu grijă, ca să te ajute să înțelegi mai bine ce i se potrivește pielii tale.",
      quickLinks: "Link-uri Rapide",
      legal: "Legal",
      privacyPolicy: "Politica de Confidențialitate",
      termsOfService: "Termeni și Condiții",
      contact: "Contactați-ne",
      connectWithUs: "Conectează-te cu noi pe rețelele sociale",
      rightsReserved: "© 2025 Skin Studio. Toate drepturile rezervate.",
      products: "Produse",
      handmadeSoaps: "Săpunuri Handmade",
      naturalCreams: "Creme Naturale",
      skincareSets: "Seturi Îngrijire",
      learn: "Învață",
      takeQuiz: "Fă Quiz",
      ingredients: "Ingrediente",
      connect: "Conectare",
      about: "Despre",
      privacy: "Confidențialitate",
      copyright: "© 2025 Skin Studio. Toate drepturile rezervate.",
      handcrafted: "Făcut cu ❤️ pentru frumusețea naturală",
    },
  },
};
