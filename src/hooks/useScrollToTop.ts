import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom Hook for Auto Scroll to Top
 * 
 * PATTERN: Custom Hook Pattern
 * - Automatically scrolls to top when route changes
 * - Especially useful for mobile navigation
 * - Handles navbar offset properly
 */
export const useScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to top with offset for fixed navbar
        const scrollToTop = () => {
            const navbarHeight = window.innerWidth <= 768 ? 60 : 70;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        // Add a small delay to ensure the page has loaded
        const timer = setTimeout(scrollToTop, 100);

        return () => clearTimeout(timer);
    }, [location.pathname]);
}; 