"use client";

import React, { createContext, useContext, useState } from "react";

interface Settings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("quranSettings");
      if (savedSettings) {
        try {
          return JSON.parse(savedSettings);
        } catch (error) {
          console.error("Failed to parse settings:", error);
        }
      }
    }
    return {
      arabicFont: "font-amiri",
      arabicFontSize: 32,
      translationFontSize: 18,
    };
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quranSettings", JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
}
