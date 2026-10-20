import { createContext, useContext, useEffect, useState } from 'react';

export const ACCENT_COLORS = {
  lavender: {
    id: 'lavender',
    name: 'Soft Lavender',
    colorHex: '#8b5cf6',
    previewClass: 'bg-purple-500',
    btnClass: 'bg-purple-500 hover:bg-purple-600 text-white shadow-sm shadow-purple-400/30',
    btnOutlineClass: 'border-purple-300 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40',
    textClass: 'text-purple-600 dark:text-purple-300',
    bgLightClass: 'bg-purple-50 dark:bg-purple-950/40',
    borderClass: 'border-purple-200 dark:border-purple-800/80',
    activeNavClass: 'bg-purple-100/80 text-purple-700 dark:bg-purple-950/70 dark:text-purple-200 font-semibold shadow-xs',
    ringClass: 'focus:ring-purple-400 focus:border-purple-400',
    badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300',
    cardBorderClass: 'border-purple-100 dark:border-purple-900/40',
  },
  pink: {
    id: 'pink',
    name: 'Blush Blossom',
    colorHex: '#ec4899',
    previewClass: 'bg-pink-500',
    btnClass: 'bg-pink-500 hover:bg-pink-600 text-white shadow-sm shadow-pink-400/30',
    btnOutlineClass: 'border-pink-300 text-pink-600 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950/40',
    textClass: 'text-pink-600 dark:text-pink-300',
    bgLightClass: 'bg-pink-50 dark:bg-pink-950/40',
    borderClass: 'border-pink-200 dark:border-pink-800/80',
    activeNavClass: 'bg-pink-100/80 text-pink-700 dark:bg-pink-950/70 dark:text-pink-200 font-semibold shadow-xs',
    ringClass: 'focus:ring-pink-400 focus:border-pink-400',
    badgeClass: 'bg-pink-100 text-pink-700 dark:bg-pink-950/70 dark:text-pink-300',
    cardBorderClass: 'border-pink-100 dark:border-pink-900/40',
  },
  sage: {
    id: 'sage',
    name: 'Sage Garden',
    colorHex: '#10b981',
    previewClass: 'bg-emerald-500',
    btnClass: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-400/30',
    btnOutlineClass: 'border-emerald-300 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40',
    textClass: 'text-emerald-600 dark:text-emerald-300',
    bgLightClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderClass: 'border-emerald-200 dark:border-emerald-800/80',
    activeNavClass: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-200 font-semibold shadow-xs',
    ringClass: 'focus:ring-emerald-400 focus:border-emerald-400',
    badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
    cardBorderClass: 'border-emerald-100 dark:border-emerald-900/40',
  },
  peach: {
    id: 'peach',
    name: 'Peach Sorbet',
    colorHex: '#f97316',
    previewClass: 'bg-orange-500',
    btnClass: 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-400/30',
    btnOutlineClass: 'border-orange-300 text-orange-600 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/40',
    textClass: 'text-orange-600 dark:text-orange-300',
    bgLightClass: 'bg-orange-50 dark:bg-orange-950/40',
    borderClass: 'border-orange-200 dark:border-orange-800/80',
    activeNavClass: 'bg-orange-100/80 text-orange-700 dark:bg-orange-950/70 dark:text-orange-200 font-semibold shadow-xs',
    ringClass: 'focus:ring-orange-400 focus:border-orange-400',
    badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-950/70 dark:text-orange-300',
    cardBorderClass: 'border-orange-100 dark:border-orange-900/40',
  },
  butter: {
    id: 'butter',
    name: 'Buttercup Gold',
    colorHex: '#eab308',
    previewClass: 'bg-amber-500',
    btnClass: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-400/30',
    btnOutlineClass: 'border-amber-300 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40',
    textClass: 'text-amber-700 dark:text-amber-300',
    bgLightClass: 'bg-amber-50 dark:bg-amber-950/40',
    borderClass: 'border-amber-200 dark:border-amber-800/80',
    activeNavClass: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/70 dark:text-amber-200 font-semibold shadow-xs',
    ringClass: 'focus:ring-amber-400 focus:border-amber-400',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
    cardBorderClass: 'border-amber-100 dark:border-amber-900/40',
  },
};

// Compatibility map for earlier accent IDs
const ALIASES = {
  blue: 'lavender',
  purple: 'lavender',
  green: 'sage',
  rose: 'pink',
  amber: 'butter',
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Read persisted preferences or default to light / system
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('task_manager_theme_mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const [accent, setAccent] = useState(() => {
    const saved = localStorage.getItem('task_manager_theme_accent');
    if (ACCENT_COLORS[saved]) return saved;
    if (ALIASES[saved] && ACCENT_COLORS[ALIASES[saved]]) return ALIASES[saved];
    return 'lavender';
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Sync mode changes with DOM and localStorage
  useEffect(() => {
    localStorage.setItem('task_manager_theme_mode', mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  // Sync accent changes with DOM and localStorage
  useEffect(() => {
    localStorage.setItem('task_manager_theme_accent', accent);
    document.documentElement.setAttribute('data-accent', accent);
    
    // Set dynamic CSS variable for accent color
    const activeColor = ACCENT_COLORS[accent] || ACCENT_COLORS.lavender;
    document.documentElement.style.setProperty('--accent-color', activeColor.colorHex);
  }, [accent]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const accentConfig = ACCENT_COLORS[accent] || ACCENT_COLORS.lavender;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        accent,
        setAccent,
        accentConfig,
        availableAccents: ACCENT_COLORS,
        isThemeModalOpen,
        setIsThemeModalOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
