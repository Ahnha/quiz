import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || 'system';
    });

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        if (theme === 'system') {
            // If system, switch to light
            setTheme('light');
        } else if (theme === 'light') {
            // If light, switch to dark
            setTheme('dark');
        } else {
            // If dark, switch to system
            setTheme('system');
        }
    };

    useEffect(() => {
        if (theme === 'system') {
            // Remove data-theme attribute to use system preference
            document.body.removeAttribute('data-theme');
        } else {
            // Apply manual theme
            document.body.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 