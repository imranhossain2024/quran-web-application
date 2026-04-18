"use client";
import React from "react";
import { useSettings } from "@/context/SettingsContext";

interface Verse {
  id: number;
  text: string;
  translation: string;
}

export default function AyahCard({ verse }: { verse: Verse }) {
  const { settings } = useSettings();

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full font-semibold text-gray-600 dark:text-gray-300">
          {verse.id}
        </div>
      </div>
      {/* Arabic Text (Right Aligned) */}
      <h3
        className={`text-right mb-6 leading-loose dark:text-white ${settings.arabicFont}`}
        style={{ fontSize: `${settings.arabicFontSize}px` }}
        dir="rtl"
      >
        {verse.text}
      </h3>
      {/* Translation */}
      <p 
        className="text-gray-600 dark:text-gray-400"
        style={{ fontSize: `${settings.translationFontSize}px` }}
      >
        {verse.translation}
      </p>
    </div>
  );
}
