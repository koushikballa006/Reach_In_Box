"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--foreground-rgb', '255, 255, 255');
      root.style.setProperty('--background-start-rgb', '0, 0, 0');
      root.style.setProperty('--background-end-rgb', '0, 0, 0');
    } else {
      root.style.setProperty('--foreground-rgb', '0, 0, 0');
      root.style.setProperty('--background-start-rgb', '214, 219, 220');
      root.style.setProperty('--background-end-rgb', '255, 255, 255');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
