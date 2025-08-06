import { useEffect, useState } from 'react';

export type ColorTheme = 'purple' | 'blue' | 'emerald' | 'rose' | 'amber' | 'cyan' | 'indigo' | 'teal';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  glow: string;
  border: string;
  text: string;
}

const colorThemes: Record<ColorTheme, ThemeColors> = {
  purple: {
    primary: 'from-purple-600 to-pink-600',
    secondary: 'from-purple-700 to-pink-700',
    accent: 'from-purple-500 to-pink-500',
    gradient: 'from-slate-900 via-purple-900 to-slate-900',
    glow: 'shadow-purple-500/25 hover:shadow-purple-500/40',
    border: 'border-purple-500/20',
    text: 'from-white via-purple-200 to-white'
  },
  blue: {
    primary: 'from-blue-600 to-cyan-600',
    secondary: 'from-blue-700 to-cyan-700',
    accent: 'from-blue-500 to-cyan-500',
    gradient: 'from-slate-900 via-blue-900 to-slate-900',
    glow: 'shadow-blue-500/25 hover:shadow-blue-500/40',
    border: 'border-blue-500/20',
    text: 'from-white via-blue-200 to-white'
  },
  emerald: {
    primary: 'from-emerald-600 to-teal-600',
    secondary: 'from-emerald-700 to-teal-700',
    accent: 'from-emerald-500 to-teal-500',
    gradient: 'from-slate-900 via-emerald-900 to-slate-900',
    glow: 'shadow-emerald-500/25 hover:shadow-emerald-500/40',
    border: 'border-emerald-500/20',
    text: 'from-white via-emerald-200 to-white'
  },
  rose: {
    primary: 'from-rose-600 to-pink-600',
    secondary: 'from-rose-700 to-pink-700',
    accent: 'from-rose-500 to-pink-500',
    gradient: 'from-slate-900 via-rose-900 to-slate-900',
    glow: 'shadow-rose-500/25 hover:shadow-rose-500/40',
    border: 'border-rose-500/20',
    text: 'from-white via-rose-200 to-white'
  },
  amber: {
    primary: 'from-amber-600 to-orange-600',
    secondary: 'from-amber-700 to-orange-700',
    accent: 'from-amber-500 to-orange-500',
    gradient: 'from-slate-900 via-amber-900 to-slate-900',
    glow: 'shadow-amber-500/25 hover:shadow-amber-500/40',
    border: 'border-amber-500/20',
    text: 'from-white via-amber-200 to-white'
  },
  cyan: {
    primary: 'from-cyan-600 to-blue-600',
    secondary: 'from-cyan-700 to-blue-700',
    accent: 'from-cyan-500 to-blue-500',
    gradient: 'from-slate-900 via-cyan-900 to-slate-900',
    glow: 'shadow-cyan-500/25 hover:shadow-cyan-500/40',
    border: 'border-cyan-500/20',
    text: 'from-white via-cyan-200 to-white'
  },
  indigo: {
    primary: 'from-indigo-600 to-purple-600',
    secondary: 'from-indigo-700 to-purple-700',
    accent: 'from-indigo-500 to-purple-500',
    gradient: 'from-slate-900 via-indigo-900 to-slate-900',
    glow: 'shadow-indigo-500/25 hover:shadow-indigo-500/40',
    border: 'border-indigo-500/20',
    text: 'from-white via-indigo-200 to-white'
  },
  teal: {
    primary: 'from-teal-600 to-emerald-600',
    secondary: 'from-teal-700 to-emerald-700',
    accent: 'from-teal-500 to-emerald-500',
    gradient: 'from-slate-900 via-teal-900 to-slate-900',
    glow: 'shadow-teal-500/25 hover:shadow-teal-500/40',
    border: 'border-teal-500/20',
    text: 'from-white via-teal-200 to-white'
  }
};

/**
 * Custom hook for managing color themes
 */
export function useColorTheme() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem('colorTheme') as ColorTheme | null;
    return saved || 'purple';
  });

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
    
    // Update CSS custom properties for dynamic theming
    const theme = colorThemes[colorTheme];
    const root = document.documentElement;
    
    // Set CSS variables for the current theme
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-glow', theme.glow);
    root.style.setProperty('--theme-border', theme.border);
    root.style.setProperty('--theme-text', theme.text);
  }, [colorTheme]);

  const changeColorTheme = (theme: ColorTheme) => {
    setColorTheme(theme);
  };

  return {
    colorTheme,
    changeColorTheme,
    colors: colorThemes[colorTheme],
    allThemes: colorThemes
  };
}