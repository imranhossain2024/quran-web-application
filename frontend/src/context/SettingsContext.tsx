'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Settings = {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  darkMode: boolean;
};

type SettingsContextType = Settings & {
  setArabicFont: (font: string) => void;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  setDarkMode: (dark: boolean) => void;
  resetToDefaults: () => void;
};

const defaultSettings: Settings = {
  arabicFont: 'Amiri Quran',
  arabicFontSize: 28,
  translationFontSize: 16,
  darkMode: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nurulQuranSettings');
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nurulQuranSettings', JSON.stringify(settings));
      if (settings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings, isLoaded]);

  const setArabicFont = (arabicFont: string) => setSettings(s => ({ ...s, arabicFont }));
  const setArabicFontSize = (arabicFontSize: number) => setSettings(s => ({ ...s, arabicFontSize }));
  const setTranslationFontSize = (translationFontSize: number) => setSettings(s => ({ ...s, translationFontSize }));
  const setDarkMode = (darkMode: boolean) => setSettings(s => ({ ...s, darkMode }));
  const resetToDefaults = () => setSettings(defaultSettings);

  return (
    <SettingsContext.Provider 
      value={{ 
        ...settings, 
        setArabicFont, 
        setArabicFontSize, 
        setTranslationFontSize, 
        setDarkMode,
        resetToDefaults 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
