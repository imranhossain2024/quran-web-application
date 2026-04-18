'use client';

import React, { useEffect, useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

const ARABIC_FONTS = [
  { name: 'Amiri Quran', label: 'Amiri' },
  { name: 'Scheherazade New', label: 'Scheherazade' },
  { name: 'Noto Naskh Arabic', label: 'Noto Naskh' },
];

export default function SettingsSidebar() {
  const { 
    arabicFont, setArabicFont,
    arabicFontSize, setArabicFontSize,
    translationFontSize, setTranslationFontSize,
    resetToDefaults
  } = useSettings();
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById('settings-trigger');
    const closeTrigger = () => setIsOpen(false);
    const openTrigger = () => setIsOpen(true);

    trigger?.addEventListener('click', openTrigger);
    
    return () => {
      trigger?.removeEventListener('click', openTrigger);
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed right-0 top-0 h-full w-80 z-50 bg-white dark:bg-neutral-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Settings</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Arabic Font */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-4">Arabic Font</h3>
              <div className="grid grid-cols-1 gap-2">
                {ARABIC_FONTS.map(font => (
                  <button
                    key={font.name}
                    onClick={() => setArabicFont(font.name)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      arabicFont === font.name 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500' 
                        : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{font.label}</span>
                    {arabicFont === font.name && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </button>
                ))}
              </div>
            </section>

            {/* Arabic Font Size */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">Arabic Font Size</h3>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{arabicFontSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="48"
                step="1"
                value={arabicFontSize}
                onChange={(e) => setArabicFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between mt-2 text-[10px] text-neutral-400 font-medium">
                <span>Small</span>
                <span>Large</span>
              </div>
            </section>

            {/* Translation Font Size */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">English Text Size</h3>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{translationFontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                step="1"
                value={translationFontSize}
                onChange={(e) => setTranslationFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between mt-2 text-[10px] text-neutral-400 font-medium">
                <span>Small</span>
                <span>Large</span>
              </div>
            </section>
          </div>

          <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30">
            <button
              onClick={resetToDefaults}
              className="w-full flex items-center justify-center space-x-2 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
