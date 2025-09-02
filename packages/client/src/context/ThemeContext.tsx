import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextValue = {
   isDark: boolean;
   toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const [isDark, setIsDark] = useState<boolean>(() => {
      try {
         const saved = localStorage.getItem('theme');
         if (saved) return saved === 'dark';
      } catch {}
      // prefer system
      return (
         window.matchMedia &&
         window.matchMedia('(prefers-color-scheme: dark)').matches
      );
   });

   useEffect(() => {
      try {
         localStorage.setItem('theme', isDark ? 'dark' : 'light');
         const root = document.documentElement;
         if (isDark) root.classList.add('dark');
         else root.classList.remove('dark');
      } catch {}
   }, [isDark]);

   const value = {
      isDark,
      toggleTheme: () => setIsDark((s) => !s),
   };

   return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
   );
}

export function useTheme() {
   const ctx = useContext(ThemeContext);
   if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
   return ctx;
}
