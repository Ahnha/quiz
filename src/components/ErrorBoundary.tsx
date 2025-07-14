// React imports for class components and error handling
// Component = base class for React class components (like extending a class in Java)
// ErrorInfo = TypeScript type for error information
// ReactNode = TypeScript type for React elements (like Object in Java)
import React, { Component, ErrorInfo, ReactNode } from "react";

// Import our error logging utility
// Similar to importing a logging service in Java
import { ErrorLogger } from "../config/security";

/**
 * Props interface - defines what props this component accepts
 * Similar to constructor parameters in Java
 */
interface Props {
  children: ReactNode; // Child components to render (like child components in JavaFX)
  fallback?: ReactNode; // Optional fallback UI (like default error page in Spring)
}

/**
 * State interface - defines the component's internal state
 * Similar to instance variables in Java
 */
interface State {
  hasError: boolean; // Whether an error has occurred (like error flag in Java)
  error?: Error; // The error that occurred (like Exception in Java)
}

/**
 * Error Boundary Component
 *
 * This is a React class component - similar to a Java class that extends Component
 * Error boundaries catch JavaScript errors anywhere in the component tree
 * Similar to try-catch blocks in Java, but for React components
 *
 * PATTERN: Error Boundary Pattern (like exception handling in Java)
 * - Catches JavaScript errors anywhere in the component tree
 * - Logs error information and displays fallback UI
 * - Prevents the entire app from crashing
 *
 * PATTERN: Security First (like security exception handling in Java)
 * - Secure error logging and handling
 * - User-friendly error messages
 * - No sensitive data exposure
 *
 * In Java, this would be like:
 * public class ErrorBoundary extends Component {
 *     private boolean hasError = false;
 *     private Exception error = null;
 *
 *     public void componentDidCatch(Exception error, ErrorInfo info) {
 *         this.hasError = true;
 *         this.error = error;
 *         logger.error("Error caught", error);
 *     }
 *
 *     public String render() {
 *         if (hasError) {
 *             return "<div>Something went wrong</div>";
 *         }
 *         return children.render();
 *     }
 * }
 */
class ErrorBoundary extends Component<Props, State> {
  /**
   * Constructor - initializes the component state
   * Similar to constructor in Java
   *
   * @param props - the props passed to this component
   */
  constructor(props: Props) {
    super(props); // Call parent constructor (like super() in Java)
    this.state = { hasError: false }; // Initialize state (like instance variables in Java)
  }

  /**
   * Static method called when an error occurs
   * Similar to a static factory method in Java
   *
   * This method is called when a child component throws an error
   * It returns new state to update the component
   *
   * @param error - the error that occurred
   * @returns new state object
   */
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    // Similar to setting error flags in Java exception handling
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called when an error is caught
   * Similar to catch block in Java try-catch
   *
   * This method is called after an error has been thrown by a child component
   * It's used for side effects like logging
   *
   * @param error - the error that occurred
   * @param errorInfo - additional error information
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error information securely
    // Similar to logging exceptions in Java
    ErrorLogger.log(error, "React Error Boundary");
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  /**
   * Render method - returns the JSX to display
   * Similar to toString() or render() method in Java
   *
   * This method is called whenever the component needs to update
   * It returns JSX (HTML-like syntax) or null
   *
   * @returns JSX element or null
   */
  render() {
    // Check if an error has occurred
    // Similar to checking error flags in Java
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise render default error UI
      // Similar to returning error page in Spring MVC
      return (
        this.props.fallback || (
          // Default error UI - similar to error.jsp in Java web apps
          <div className="error-boundary-fallback">
            <div className="error-container glass-card">
              <h2>😔 Something went wrong</h2>
              <p>
                We're sorry, but something unexpected happened. Please try
                refreshing the page.
              </p>

              {/* Button to refresh the page */}
              {/* Similar to refresh button in Java web apps */}
              <button
                onClick={() => window.location.reload()} // Reload page (like redirect in Java)
                className="btn-minimal primary"
              >
                Refresh Page
              </button>

              {/* Button to try again (reset error state) */}
              {/* Similar to retry mechanism in Java */}
              <button
                onClick={() => this.setState({ hasError: false })} // Reset state (like clearing error flag)
                className="btn-minimal secondary"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    // If no error, render children normally
    // Similar to normal flow in Java
    return this.props.children;
  }
}

// Export the component so other files can import it
// Similar to making a class public in Java
export default ErrorBoundary;
