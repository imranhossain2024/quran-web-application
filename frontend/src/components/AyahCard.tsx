'use client';

import { useSettings } from '@/context/SettingsContext';

type AyahCardProps = {
  ayah: {
    id: number;
    text: string;
    translation: string;
  };
  highlight?: string;
};

export default function AyahCard({ ayah, highlight }: AyahCardProps) {
  const { arabicFont, arabicFontSize, translationFontSize } = useSettings();

  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === term.toLowerCase() 
        ? <span key={i} className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-bold px-1 rounded">{part}</span> 
        : part
    );
  };

  return (
    <div className="group py-8 first:pt-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center justify-center min-w-[32px] h-8 rounded-full border border-amber-500/30 text-amber-600 dark:text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-900/20">
            {ayah.id}
          </div>
          <div 
            className="text-right leading-[1.8]"
            style={{ 
              fontFamily: arabicFont,
              fontSize: `${arabicFontSize}px`
            }}
            dir="rtl"
          >
            {ayah.text}
          </div>
        </div>
        <div 
          className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
          style={{ fontSize: `${translationFontSize}px` }}
        >
          {highlight ? highlightText(ayah.translation, highlight) : ayah.translation}
        </div>
      </div>
    </div>
  );
}
