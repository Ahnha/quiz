// React import - similar to importing classes in Java
// React is the main library for building user interfaces
import React from 'react';

// React Router imports - handles navigation between pages (like Spring MVC routing)
// Route = defines a URL path and what component to show
// HashRouter = router that uses URL hash (#) for navigation
// Routes = container for multiple Route components
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

// Custom imports - these are our own components and utilities
// Similar to importing your own Java classes
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ContentSecurityPolicy from './components/ContentSecurityPolicy';
import SecurityAudit from './components/SecurityAudit';
import GDPRConsent from './components/GDPRConsent';

// Page components - each represents a different page/screen
// Similar to different JSP pages or Thymeleaf templates in Java
import LandingPage from './pages/LandingPage';
import QuizzesPage from './pages/QuizzesPage';
import QuizPage from './pages/QuizPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// CSS imports - styles for the application
// Similar to including CSS files in your Java web app
import './styles/global.css';
import './styles/security.css';
import './styles/themeStyles.css';

/**
 * Main App Component - This is the root component of our application
 * 
 * In React, components are like Java classes that return JSX (HTML-like syntax)
 * FC = Function Component (a function that returns JSX)
 * 
 * PATTERN: Composition Pattern (similar to dependency injection in Spring)
 * - We compose multiple providers and components together
 * - Each provider wraps the components below it, providing context/data
 * - Similar to how Spring beans can depend on other beans
 * 
 * PATTERN: Security First
 * - Error boundary for crash protection (like try-catch in Java)
 * - Secure context providers (like security context in Spring Security)
 * - GDPR consent management (like cookie consent in Java web apps)
 * - Content Security Policy (like security headers in Java)
 * - Security audit and monitoring
 * 
 * PATTERN: SEO Optimization
 * - Native DOM manipulation for meta tags (like managing meta tags in Java)
 * - Structured data support (like JSON-LD in Java templates)
 * - Search engine optimization
 */
const App: React.FC = () => {
  // This function returns JSX (HTML-like syntax mixed with JavaScript)
  // In Java, this would be like a method that returns HTML content

  return (
    // JSX syntax: looks like HTML but is actually JavaScript
    // Each tag represents a React component (like Java beans)
    // Components can be nested (composition)

    // ErrorBoundary = catches JavaScript errors (like try-catch in Java)
    // If any component crashes, this prevents the entire app from crashing
    <ErrorBoundary>

      {/* ContentSecurityPolicy = adds security headers */}
      {/* Similar to security headers in Spring Security */}
      <ContentSecurityPolicy />

      {/* ThemeProvider = provides theme context */}
      <ThemeProvider>

        {/* LanguageProvider = provides language/translation context */}
        {/* Similar to LocaleResolver in Spring MVC */}
        <LanguageProvider>

          {/* Router = handles navigation between pages */}
          {/* Similar to Spring MVC routing configuration */}
          <Router>

            {/* Routes = container for all our page routes */}
            {/* Similar to @RequestMapping annotations in Spring */}
            <Routes>

              {/* Route = defines a URL path and what component to show */}
              {/* path="/" = URL path (like @RequestMapping("/") in Spring) */}
              {/* element={<Component />} = what component to render */}
              {/* Similar to returning a view name in Spring MVC */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/quiz" element={<QuizzesPage />} />
              <Route path="/quiz/:quizId" element={<QuizPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

            </Routes>

            {/* GDPRConsent = cookie consent popup */}
            {/* Similar to cookie consent in Java web apps */}
            <GDPRConsent />

            {/* SecurityAudit = security monitoring (development only) */}
            {/* Similar to security logging in Java applications */}
            <SecurityAudit />

          </Router>

        </LanguageProvider>

      </ThemeProvider>

    </ErrorBoundary>
  );
};

// Export the component so other files can import it
// Similar to making a class public in Java
export default App;
