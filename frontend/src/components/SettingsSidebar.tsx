"use client";
import { useSettings } from "@/context/SettingsContext";
import { useState } from "react";

export default function SettingsSidebar() {
  const { settings, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-green-700 text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
      >
        ⚙️ Settings
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-green-700">Settings</h2>
              <button onClick={() => setIsOpen(false)} className="text-2xl">✕</button>
            </div>

            {/* Arabic Font Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Arabic Font</label>
              <select 
                value={settings.arabicFont}
                onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                className="w-full p-3 border rounded-xl dark:bg-gray-800"
              >
                <option value="font-amiri">Amiri (Classic)</option>
                <option value="font-noto-arabic">Noto Sans Arabic</option>
              </select>
            </div>

            {/* Arabic Font Size */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Arabic Font Size ({settings.arabicFontSize}px)</label>
              <input 
                type="range" min="20" max="60" 
                value={settings.arabicFontSize}
                onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                className="w-full accent-green-700"
              />
            </div>

            {/* Translation Font Size */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Translation Font Size ({settings.translationFontSize}px)</label>
              <input 
                type="range" min="12" max="30" 
                value={settings.translationFontSize}
                onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                className="w-full accent-green-700"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
