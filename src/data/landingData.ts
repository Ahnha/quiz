import { InfoSectionData, FeatureItem } from '../components/InfoSection';

// PATTERN: Data Layer - Separates content from presentation
// PATTERN: Single Source of Truth - All landing page content in one place
// PATTERN: Immutability - Using const for data that shouldn't change

/**
 * Landing Page Content Configuration
 * 
 * PATTERN: Configuration Object
 * - Centralized configuration for easy maintenance
 * - Clear separation between data and presentation
 */
export const LANDING_PAGE_CONFIG = {
    hero: {
        title: "Pielea ta merită ce e mai bun",
        subtitle: "Descoperă tipul tău de piele și primește recomandări personalizate pentru produse naturale care funcționează",
        buttonText: "Începe Quiz-ul",
        buttonIcon: "🌟"
    },

    infoSections: [
        {
            title: "De ce să alegi Skin Studio?",
            text: "Combinăm știința dermatologică cu puterea naturii pentru a-ți oferi soluții personalizate. Fiecare quiz este creat de experți pentru a-ți oferi cele mai precise recomandări pentru pielea ta."
        },
        {
            title: "Cum funcționează?",
            text: "Răspunde la câteva întrebări simple despre pielea ta și obiceiurile tale. Vei primi un profil complet cu recomandări de produse naturale adaptate nevoilor tale specifice."
        },
        {
            title: "Produse 100% naturale",
            text: "Toate recomandările noastre sunt pentru produse naturale, fără ingrediente toxice, testate dermatologic și aprobate pentru pielea ta sensibilă."
        }
    ] as InfoSectionData[],

    features: [
        { icon: '🌿', text: 'Produse 100% naturale' },
        { icon: '🧪', text: 'Testat dermatologic' },
        { icon: '💚', text: 'Fără ingrediente toxice' },
        { icon: '✨', text: 'Rezultate vizibile' }
    ] as FeatureItem[]
};

// PATTERN: Named Export - Clear naming for imports
export const getLandingPageData = () => LANDING_PAGE_CONFIG; 