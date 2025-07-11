// React import - the main library for building user interfaces
// Similar to importing Spring framework classes in Java
import React, { useState, useCallback } from 'react';

// Import our security utilities
// Similar to importing utility classes in Java
import { SecurityUtils } from '../config/security';

/**
 * TypeScript interface - defines the structure of props (parameters) for this component
 * Similar to method parameters in Java, but with type safety
 * 
 * In Java, this would be like:
 * public class SecureInputProps {
 *     private String type;
 *     private String value;
 *     private Consumer<String> onChange;
 *     // ... etc
 * }
 */
interface SecureInputProps {
    type?: 'text' | 'email' | 'url' | 'message'; // Union type (like enum in Java)
    value: string; // Current value of the input
    onChange: (value: string) => void; // Callback function (like Consumer<String> in Java)
    placeholder?: string; // Optional placeholder text
    className?: string; // Optional CSS class
    required?: boolean; // Whether the field is required
    maxLength?: number; // Maximum length
    validation?: {
        pattern?: RegExp; // Regex pattern (like Pattern in Java)
        minLength?: number;
        maxLength?: number;
        customValidator?: (value: string) => boolean; // Function type (like Predicate<String> in Java)
    };
    onValidationError?: (error: string) => void; // Error callback
}

/**
 * Secure Input Component
 * 
 * This is a React functional component - similar to a Java class with a render method
 * In React, components are functions that return JSX (HTML-like syntax)
 * 
 * PATTERN: Secure Input Handling (like input validation in Spring)
 * - Built-in input sanitization (like HTML escaping in Thymeleaf)
 * - Real-time validation (like Bean Validation in Spring)
 * - XSS protection (like security filters in Spring Security)
 * - Configurable validation rules
 * 
 * @param props - the properties passed to this component
 * @returns JSX element (like returning HTML in a Java controller)
 */
const SecureInput: React.FC<SecureInputProps> = ({
    // Destructuring assignment - extract values from props object
    // Similar to method parameters in Java
    type = 'text', // Default value (like default parameter in Java)
    value,
    onChange,
    placeholder,
    className = '',
    required = false,
    maxLength,
    validation,
    onValidationError
}) => {
    // React hooks - similar to instance variables in Java classes
    // useState = creates state that can change (like instance variables)
    // [state, setState] = array destructuring (like tuple in Java)
    const [error, setError] = useState<string>(''); // State for error message
    const [isTouched, setIsTouched] = useState<boolean>(false); // State for touch status

    /**
     * useCallback = memoizes a function (like caching a method in Java)
     * Prevents unnecessary re-renders when the component updates
     * Similar to @Cacheable in Spring
     * 
     * @param inputValue - the value to validate
     * @returns boolean indicating if input is valid
     */
    const validateInput = useCallback((inputValue: string): boolean => {
        // Basic sanitization - remove dangerous content
        // Similar to HTML escaping in Thymeleaf or JSTL
        const sanitizedValue = SecurityUtils.sanitizeInput(inputValue);

        // Type-specific validation
        // Similar to switch statement in Java
        let isValid = true;
        let errorMessage = '';

        switch (type) {
            case 'email':
                // Email validation - similar to @Email in Bean Validation
                if (!SecurityUtils.isValidEmail(sanitizedValue)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'url':
                // URL validation - similar to @URL in Bean Validation
                if (sanitizedValue && !SecurityUtils.isValidUrl(sanitizedValue)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid URL';
                }
                break;
            case 'message':
                // Message validation - similar to @Size in Bean Validation
                if (!SecurityUtils.isValidMessage(sanitizedValue)) {
                    isValid = false;
                    errorMessage = 'Message must be between 1 and 1000 characters';
                }
                break;
            default:
                // Text validation with custom rules
                // Similar to custom validation in Spring
                if (validation?.minLength && sanitizedValue.length < validation.minLength) {
                    isValid = false;
                    errorMessage = `Minimum ${validation.minLength} characters required`;
                }
                if (validation?.maxLength && sanitizedValue.length > validation.maxLength) {
                    isValid = false;
                    errorMessage = `Maximum ${validation.maxLength} characters allowed`;
                }
                if (validation?.pattern && !validation.pattern.test(sanitizedValue)) {
                    isValid = false;
                    errorMessage = 'Invalid format';
                }
                if (validation?.customValidator && !validation.customValidator(sanitizedValue)) {
                    isValid = false;
                    errorMessage = 'Invalid input';
                }
        }

        // Required field validation - similar to @NotNull in Bean Validation
        if (required && !sanitizedValue.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Update error state (like setting an instance variable in Java)
        setError(errorMessage);

        // Call error callback if provided (like calling a listener in Java)
        if (!isValid && onValidationError) {
            onValidationError(errorMessage);
        }

        return isValid;
    }, [type, validation, required, onValidationError, isTouched]); // Dependencies array (like @Cacheable key)

    /**
     * Event handler for input changes
     * Similar to event listeners in Java Swing or JavaFX
     * 
     * @param e - the change event (like ActionEvent in Java)
     */
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // e.target.value = the new input value (like getText() in Java Swing)
        const inputValue = e.target.value;

        // Apply maxLength if specified (like input validation in Java)
        if (maxLength && inputValue.length > maxLength) {
            return; // Don't update if too long
        }

        // Validate input
        const isValid = validateInput(inputValue);

        // Only update if valid or if it's the first input (to allow user to type)
        // Similar to conditional logic in Java
        if (isValid || !isTouched) {
            onChange(inputValue); // Call parent's onChange (like calling a callback in Java)
        }
    }, [onChange, validateInput, maxLength, isTouched]);

    /**
     * Event handler for when input loses focus
     * Similar to focusLost event in Java Swing
     */
    const handleBlur = useCallback(() => {
        setIsTouched(true); // Mark as touched (like setting a flag in Java)
        validateInput(value); // Validate current value
    }, [validateInput, value]);

    /**
     * Event handler for when input gains focus
     * Similar to focusGained event in Java Swing
     */
    const handleFocus = useCallback(() => {
        setError(''); // Clear error when user starts typing
    }, []);

    // Prepare props for the input element
    // Similar to preparing parameters for a method call in Java
    const inputProps = {
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        placeholder,
        className: `secure-input ${className} ${error ? 'error' : ''}`, // Template literal (like String.format in Java)
        required
    };

    // Return JSX (HTML-like syntax mixed with JavaScript)
    // Similar to returning HTML content in a Java controller
    return (
        // JSX fragment - like a container div but doesn't add extra HTML
        <div className="secure-input-container">
            {/* Conditional rendering - like if statement in Java */}
            {type === 'message' ? (
                // Textarea for messages (like JTextArea in Java Swing)
                <textarea
                    {...inputProps} // Spread operator - like passing all props
                    rows={4}
                    maxLength={maxLength}
                />
            ) : (
                // Regular input field (like JTextField in Java Swing)
                <input
                    {...inputProps}
                    type={type === 'url' ? 'url' : type} // Conditional type
                    maxLength={maxLength}
                />
            )}

            {/* Show error message if there is one and field has been touched */}
            {/* Similar to displaying validation errors in Java web apps */}
            {error && isTouched && (
                <div className="input-error">
                    {error}
                </div>
            )}

            {/* Show character counter if maxLength is specified */}
            {/* Similar to showing progress in Java applications */}
            {maxLength && (
                <div className="input-counter">
                    {value.length}/{maxLength}
                </div>
            )}
        </div>
    );
};

// Export the component so other files can import it
// Similar to making a class public in Java
export default SecureInput; 