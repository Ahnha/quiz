// PATTERN: Constants File - Centralized configuration
// PATTERN: DRY Principle - No repeated magic values
// PATTERN: Single Source of Truth - All constants in one place

/**
 * Application Constants
 * 
 * PATTERN: Constants Pattern
 * - Centralized location for all application constants
 * - Easy to maintain and update
 * - Prevents magic numbers/strings throughout the codebase
 */

// Navigation Constants
export const ROUTES = {
    HOME: '/',
    QUIZ: '/quiz',
    BLOG: '/blog'
} as const;

// Animation Constants
export const ANIMATION = {
    TRANSITION_DURATION: 300,
    HOVER_DELAY: 100,
    LOADING_DELAY: 100
} as const;

// UI Constants
export const UI = {
    MAX_WIDTH: {
        CONTAINER: 1200,
        HERO_CONTENT: 1000,
        QUIZ_CARD: 700
    },
    PADDING: {
        SECTION: '5rem 1rem',
        HERO: '4rem 1rem',
        MOBILE: '3rem 1rem'
    },
    BORDER_RADIUS: {
        CARD: '20px',
        BUTTON: '50px',
        FEATURE: '16px'
    }
} as const;

// Company Information
export const COMPANY = {
    NAME: 'Skin Studio',
    COPYRIGHT_TEXT: 'Toate drepturile rezervate.'
} as const;

// Quiz Constants
export const QUIZ = {
    PROGRESS_BAR_HEIGHT: 6,
    MIN_SCORE: 0,
    DEFAULT_RESULT: 'Nicio interpretare disponibilă.'
} as const;

// Type-safe route checking
export const isValidRoute = (route: string): route is keyof typeof ROUTES => {
    return Object.values(ROUTES).includes(route as any);
}; 