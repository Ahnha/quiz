// React imports
// React = main library
// createContext = creates a context (like a global variable that can be shared)
// useContext = hook to use context (like accessing a global variable)
// useState = hook for state management (like instance variables in Java)
// ReactNode = TypeScript type for React elements (like Object in Java)
import React, { createContext, useContext, useState, ReactNode } from "react";

// Import our translations and types
// Similar to importing utility classes in Java
import { translations, Language, Translations } from "../translations";

/**
 * Context interface - defines what data the context will provide
 * Similar to defining a service interface in Java
 *
 * In Java, this would be like:
 * public interface LanguageContext {
 *     String getCurrentLanguage();
 *     void setLanguage(String language);
 *     String getTranslation(String key);
 * }
 */
interface LanguageContextType {
  language: Language; // Current language (like 'en' or 'ro')
  t: Translations; // Current translations (like ResourceBundle in Java)
  setLanguage: (lang: Language) => void; // Function to change language
}

/**
 * Create the context with a default value
 * Similar to creating a singleton service in Java
 *
 * In Java, this would be like:
 * public class LanguageContext {
 *     private static LanguageContext instance;
 *     private String currentLanguage = "en";
 * }
 */
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

/**
 * Props interface for the provider component
 * Similar to constructor parameters in Java
 */
interface LanguageProviderProps {
  children: ReactNode; // Child components (like child components in JavaFX)
}

/**
 * Language Provider Component
 *
 * This is a provider component that wraps other components and provides language context
 * Similar to a service provider in Java (like dependency injection container)
 *
 * PATTERN: Context Provider Pattern (like dependency injection in Spring)
 * - Provides language data to all child components
 * - Manages language state globally
 * - Similar to LocaleResolver in Spring MVC
 *
 * @param props - properties passed to this component
 * @returns JSX with context provider
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // useState hook - creates state that can change
  // Similar to instance variables in Java, but with automatic re-rendering
  // [state, setState] = array destructuring (like tuple in Java)
  const [language, setLanguageState] = useState<Language>("en"); // Default to English

  /**
   * Function to change the language
   * Similar to a setter method in Java
   *
   * @param lang - the new language to set
   */
  const setLanguage = (lang: Language) => {
    setLanguageState(lang); // Update state (triggers re-render)

    // Save to localStorage (like saving to session in Java)
    try {
      localStorage.setItem("language", lang);
    } catch (error) {
      // Handle error if localStorage is not available
      console.warn("Could not save language preference");
    }
  };

  // Get current translations based on language
  // Similar to ResourceBundle.getBundle() in Java
  const t = translations[language];

  // Create the context value object
  // Similar to creating a service object in Java
  const contextValue: LanguageContextType = {
    language,
    t,
    setLanguage,
  };

  // Return JSX with context provider
  // Similar to returning a view in Spring MVC
  return (
    // LanguageContext.Provider = provides context to child components
    // value = the data to provide (like dependency injection in Spring)
    // children = the components that will receive this context
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to use the language context
 * Similar to a utility method in Java that accesses a service
 *
 * This hook makes it easy for components to access language data
 * Similar to @Autowired in Spring
 *
 * @returns the language context data
 * @throws Error if used outside of LanguageProvider
 */
export const useLanguage = (): LanguageContextType => {
  // useContext hook - gets the context value
  // Similar to accessing a service in Spring
  const context = useContext(LanguageContext);

  // Check if context exists (like null check in Java)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
