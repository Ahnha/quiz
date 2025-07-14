import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorLogger } from "../config/security";

// PATTERN: Custom Hook - Encapsulates related state and logic
// PATTERN: Single Responsibility - Only handles quiz navigation
// PATTERN: Dependency Injection - Receives navigation function

/**
 * Custom Hook for Quiz Navigation
 *
 * PATTERN: Custom Hook Pattern
 * - Encapsulates quiz-related state and logic
 * - Reusable across different components
 *
 * PATTERN: Single Responsibility Principle
 * - Only responsible for quiz navigation logic
 *
 * PATTERN: Dependency Injection
 * - Receives navigation function as parameter
 *
 * PATTERN: Error Handling
 * - Comprehensive error handling and logging
 * - Graceful fallbacks for navigation failures
 */
export const useQuizNavigation = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  /**
   * Navigate to quiz page with loading state and error handling
   *
   * PATTERN: Command Pattern
   * - Encapsulates navigation action
   * - Provides feedback through loading state
   * - Handles errors gracefully
   */
  const navigateToQuiz = async () => {
    setIsNavigating(true);

    try {
      // Simulate loading time for better UX
      await new Promise((resolve) => setTimeout(resolve, 100));
      navigate("/quiz");
    } catch (error) {
      ErrorLogger.log(error as Error, "Quiz Navigation");
      // Fallback navigation in case of error
      window.location.href = "/quiz";
    } finally {
      setIsNavigating(false);
    }
  };

  return {
    navigateToQuiz,
    isNavigating,
  };
};
