import { useState, useCallback } from 'react';
import { SecurityUtils } from '../config/security';

/**
 * Rate Limiting Hook
 * 
 * PATTERN: Custom Hook
 * - Provides rate limiting functionality
 * - Prevents abuse and spam
 * - Configurable limits and windows
 */
interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
    key?: string;
}

interface RateLimitResult {
    isAllowed: boolean;
    remainingRequests: number;
    resetTime: number;
    error?: string;
}

export const useRateLimit = (config: RateLimitConfig) => {
    const [lastCheck, setLastCheck] = useState<RateLimitResult | null>(null);

    const checkRateLimit = useCallback((actionKey?: string): RateLimitResult => {
        const key = actionKey || config.key || 'default';
        const now = Date.now();

        try {
            const requests = SecurityUtils.safeLocalStorageGet(`rate_limit_${key}`, []);

            // Remove old requests outside the window
            const validRequests = requests.filter((timestamp: number) =>
                now - timestamp < config.windowMs
            );

            const remainingRequests = Math.max(0, config.maxRequests - validRequests.length);
            const isAllowed = validRequests.length < config.maxRequests;
            const resetTime = now + config.windowMs;

            if (isAllowed) {
                // Add current request
                validRequests.push(now);
                SecurityUtils.safeLocalStorageSet(`rate_limit_${key}`, validRequests);
            }

            const result: RateLimitResult = {
                isAllowed,
                remainingRequests,
                resetTime,
                error: isAllowed ? undefined : 'Rate limit exceeded. Please try again later.'
            };

            setLastCheck(result);
            return result;

        } catch (error) {
            // If rate limiting fails, allow the request
            const result: RateLimitResult = {
                isAllowed: true,
                remainingRequests: config.maxRequests,
                resetTime: now + config.windowMs
            };

            setLastCheck(result);
            return result;
        }
    }, [config]);

    const resetRateLimit = useCallback((actionKey?: string) => {
        const key = actionKey || config.key || 'default';
        SecurityUtils.safeLocalStorageSet(`rate_limit_${key}`, []);
        setLastCheck(null);
    }, [config]);

    return {
        checkRateLimit,
        resetRateLimit,
        lastCheck
    };
}; 