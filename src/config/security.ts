/**
 * Security Configuration
 * 
 * This file is like a Java configuration class (similar to @Configuration in Spring)
 * It centralizes all security-related settings and utilities
 * 
 * PATTERN: Configuration Management (similar to @ConfigurationProperties in Spring)
 * - Centralized configuration for sensitive data
 * - Environment-based configuration (like Spring profiles)
 * - Secure handling of API keys and tokens
 * 
 * PATTERN: Defense in Depth (like multiple security layers in Spring Security)
 * - Multiple layers of security protection
 * - Input validation and sanitization
 * - Rate limiting and abuse prevention
 * - Content Security Policy
 */

// Environment-based configuration
// process.env = similar to System.getProperty() in Java
// NODE_ENV = environment variable (like -Dspring.profiles.active in Java)
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Security configuration object
// This is like a Java configuration class with static final fields
// In TypeScript, we use const for immutable values (like final in Java)
export const SECURITY_CONFIG = {
    // Environment info - similar to checking Spring profiles
    environment: {
        isDevelopment,
        isProduction
    },

    // Email service configuration
    // Similar to @Value annotations in Spring for configuration properties
    emailService: {
        // || = default value (like @Value with default in Spring)
        serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_b0eycgy',
        publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'qpMdCwldZeAqODpQR',
        templates: {
            userNotification: process.env.REACT_APP_EMAILJS_USER_TEMPLATE || 'template_quiz_enhanced',
            ownerNotification: process.env.REACT_APP_EMAILJS_OWNER_TEMPLATE || 'template_owner_notification'
        }
    },

    // CAPTCHA configuration
    // Similar to reCAPTCHA configuration in Spring Security
    captcha: {
        siteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6Ld7ZTYUAAAAAGgBvCrSeiQrUBLw55jP8hetKuer',
        secretKey: process.env.REACT_APP_RECAPTCHA_SECRET_KEY || ''
    },

    // Application security settings
    // Similar to security configuration in Spring Security
    app: {
        maxFileSize: 5 * 1024 * 1024, // 5MB (like file upload limits in Spring)
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp'], // MIME type validation
        sessionTimeout: 30 * 60 * 1000, // 30 minutes (like session timeout in Spring)
        maxLoginAttempts: 5, // Like login attempt limits in Spring Security
        passwordMinLength: 8,
        maxRequestsPerMinute: 60, // Rate limiting (like @RateLimit in Spring)
        maxQuizSubmissionsPerHour: 10
    },

    // Content Security Policy
    // Similar to security headers configuration in Spring Security
    csp: {
        // 'default-src': ["'self'"] = only allow resources from same origin
        'default-src': ["'self'"],
        // 'script-src': allowed sources for JavaScript files
        'script-src': [
            "'self'", // Same origin
            "'unsafe-inline'", // Required for React (like inline scripts)
            "'unsafe-eval'", // Required for React development
            'https://www.google.com/recaptcha/', // reCAPTCHA
            'https://www.gstatic.com/recaptcha/',
            'https://cdn.jsdelivr.net', // CDN for libraries
            'https://unpkg.com'
        ],
        // 'style-src': allowed sources for CSS files
        'style-src': [
            "'self'",
            "'unsafe-inline'", // Required for CSS-in-JS
            'https://fonts.googleapis.com' // Google Fonts
        ],
        // 'font-src': allowed sources for fonts
        'font-src': [
            "'self'",
            'https://fonts.gstatic.com'
        ],
        // 'img-src': allowed sources for images
        'img-src': [
            "'self'",
            'data:', // Data URLs
            'https:', // HTTPS images
            'blob:' // Blob URLs
        ],
        // 'connect-src': allowed sources for API calls
        'connect-src': [
            "'self'",
            'https://api.emailjs.com', // Email service
            'https://www.google.com/recaptcha/', // reCAPTCHA
            'https://fonts.googleapis.com'
        ],
        // 'frame-src': allowed sources for iframes
        'frame-src': [
            'https://www.google.com/recaptcha/'
        ]
    },

    // Data validation rules
    // Similar to Bean Validation annotations in Java (@Size, @Email, etc.)
    validation: {
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex pattern (like @Email in Java)
            maxLength: 254
        },
        name: {
            minLength: 2,
            maxLength: 50,
            // Regex for names with Romanian characters
            pattern: /^[a-zA-ZăâîșțĂÂÎȘȚ\s-']+$/
        },
        quizScore: {
            min: 0,
            max: 100
        },
        message: {
            minLength: 1,
            maxLength: 1000
        },
        url: {
            // Regex for valid URLs
            pattern: /^https?:\/\/[^\s/$.?#].[^\s]*$/i
        }
    },

    // Rate limiting configuration
    // Similar to rate limiting in Spring Boot
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.'
    }
};

// Security utilities class
// Similar to a utility class in Java with static methods
export class SecurityUtils {
    /**
     * Sanitize user input to prevent XSS attacks
     * Similar to HTML escaping in Java (like JSTL <c:out> or Thymeleaf)
     * 
     * @param input - the user input to sanitize
     * @returns sanitized input safe for display
     */
    static sanitizeInput(input: string): string {
        // Type checking (like instanceof in Java)
        if (typeof input !== 'string') return '';

        // Chain of replace operations (like multiple String.replace() in Java)
        return input
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+=/gi, '') // Remove event handlers
            .replace(/data:/gi, '') // Remove data: protocol
            .replace(/vbscript:/gi, '') // Remove vbscript: protocol
            .replace(/file:/gi, '') // Remove file: protocol
            .trim(); // Remove whitespace (like String.trim() in Java)
    }

    /**
     * Validate email format
     * Similar to @Email validation in Java Bean Validation
     */
    static isValidEmail(email: string): boolean {
        // && = logical AND (like && in Java)
        // test() = regex test method (like Pattern.matches() in Java)
        return SECURITY_CONFIG.validation.email.pattern.test(email) &&
            email.length <= SECURITY_CONFIG.validation.email.maxLength;
    }

    /**
     * Validate name format
     * Similar to @Size and custom validation in Java
     */
    static isValidName(name: string): boolean {
        return name.length >= SECURITY_CONFIG.validation.name.minLength &&
            name.length <= SECURITY_CONFIG.validation.name.maxLength &&
            SECURITY_CONFIG.validation.name.pattern.test(name);
    }

    /**
     * Validate quiz score
     * Similar to @Min and @Max validation in Java
     */
    static isValidQuizScore(score: number): boolean {
        return score >= SECURITY_CONFIG.validation.quizScore.min &&
            score <= SECURITY_CONFIG.validation.quizScore.max;
    }

    /**
     * Validate message content
     * Similar to @Size validation in Java
     */
    static isValidMessage(message: string): boolean {
        return message.length >= SECURITY_CONFIG.validation.message.minLength &&
            message.length <= SECURITY_CONFIG.validation.message.maxLength;
    }

    /**
     * Validate URL format
     * Similar to @URL validation in Java
     */
    static isValidUrl(url: string): boolean {
        return SECURITY_CONFIG.validation.url.pattern.test(url);
    }

    /**
     * Generate secure random string
     * Similar to UUID.randomUUID() in Java
     */
    static generateSecureId(): string {
        // crypto.getRandomValues() = cryptographically secure random (like SecureRandom in Java)
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        // Convert to hex string (like converting bytes to hex in Java)
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Generate CSRF token
     * Similar to CSRF token generation in Spring Security
     */
    static generateCSRFToken(): string {
        return this.generateSecureId();
    }

    /**
     * Safe JSON parsing with error handling
     * Similar to try-catch with ObjectMapper in Java
     */
    static safeJsonParse<T>(jsonString: string, fallback: T): T {
        try {
            return JSON.parse(jsonString); // Like ObjectMapper.readValue() in Java
        } catch (error) {
            return fallback; // Return default value on error
        }
    }

    /**
     * Safe localStorage operations with error handling
     * localStorage = browser storage (like HttpSession in Java)
     */
    static safeLocalStorageGet(key: string, fallback: any = null): any {
        try {
            const item = localStorage.getItem(key); // Like session.getAttribute() in Java
            return item ? this.safeJsonParse(item, fallback) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    static safeLocalStorageSet(key: string, value: any): boolean {
        try {
            localStorage.setItem(key, JSON.stringify(value)); // Like session.setAttribute() in Java
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Rate limiting utility
     * Similar to rate limiting in Spring Boot with Redis
     */
    static checkRateLimit(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
        try {
            const now = Date.now(); // Current timestamp (like System.currentTimeMillis() in Java)
            const requests = this.safeLocalStorageGet(`rate_limit_${key}`, []);

            // Filter old requests (like filtering a List in Java)
            const validRequests = requests.filter((timestamp: number) => now - timestamp < windowMs);

            if (validRequests.length >= maxRequests) {
                return false; // Rate limit exceeded
            }

            // Add current request
            validRequests.push(now);
            this.safeLocalStorageSet(`rate_limit_${key}`, validRequests);

            return true; // Request allowed
        } catch (error) {
            return true; // Allow request if rate limiting fails
        }
    }

    /**
     * Validate file upload
     * Similar to file upload validation in Spring
     */
    static validateFile(file: File): { isValid: boolean; error?: string } {
        // File validation (like MultipartFile validation in Spring)
        if (file.size > SECURITY_CONFIG.app.maxFileSize) {
            return { isValid: false, error: 'File size too large' };
        }

        if (!SECURITY_CONFIG.app.allowedFileTypes.includes(file.type)) {
            return { isValid: false, error: 'File type not allowed' };
        }

        return { isValid: true };
    }

    /**
     * Hash sensitive data (for logging purposes)
     * Similar to hashing in Java (like MessageDigest)
     */
    static hashSensitiveData(data: string): string {
        // Simple hash for logging - not for password storage
        // In production, use proper hashing like bcrypt
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(16);
    }
}

// Error logging utility (for development only)
// Similar to logging in Java (like SLF4J/Logback)
export class ErrorLogger {
    /**
     * Log errors (like logger.error() in Java)
     */
    static log(error: Error, context?: string): void {
        if (isDevelopment) {
            console.error(`[${context || 'App'}] Error:`, error);
        }
        // In production, this would send to a logging service (like ELK stack)
    }

    /**
     * Log warnings (like logger.warn() in Java)
     */
    static warn(message: string, context?: string): void {
        if (isDevelopment) {
            console.warn(`[${context || 'App'}] Warning:`, message);
        }
    }

    /**
     * Log info messages (like logger.info() in Java)
     */
    static info(message: string, context?: string): void {
        if (isDevelopment) {
            console.info(`[${context || 'App'}] Info:`, message);
        }
    }
} 