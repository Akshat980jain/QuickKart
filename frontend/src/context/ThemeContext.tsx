import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setThemeMode: (mode: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setThemeMode: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

// ─── Single source of truth: directly touch the DOM ─────────────────────────
function applyThemeToDOM(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function saveTheme(theme: Theme) {
  try {
    localStorage.setItem('quickkart-theme', theme);
  } catch (_) {}
}

function loadStoredTheme(): Theme {
  try {
    const v = localStorage.getItem('quickkart-theme');
    if (v === 'light' || v === 'dark') return v;
  } catch (_) {}
  return 'light';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = loadStoredTheme();
    // Apply immediately during initialization (before first render)
    applyThemeToDOM(stored);
    return stored;
  });

  // Keep DOM in sync whenever React re-renders with new theme
  useEffect(() => {
    applyThemeToDOM(theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      // Apply to DOM immediately — don't wait for useEffect
      applyThemeToDOM(next);
      saveTheme(next);
      return next;
    });
  };

  const setThemeMode = (mode: Theme) => {
    applyThemeToDOM(mode);
    saveTheme(mode);
    setTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
