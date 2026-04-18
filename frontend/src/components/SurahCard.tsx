'use client';

import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';

type SurahCardProps = {
  surah: {
    id: number;
    name: string;
    transliteration: string;
    translation: string;
    type: string;
    total_verses: number;
  };
};

export default function SurahCard({ surah }: SurahCardProps) {
  const { arabicFont } = useSettings();

  return (
    <Link 
      href={`/surah/${surah.id}`}
      className="group relative flex flex-col p-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm font-semibold group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {surah.id}
        </div>
        <div 
          className="text-2xl text-emerald-800 dark:text-emerald-500 text-right leading-relaxed"
          style={{ fontFamily: arabicFont }}
          dir="rtl"
        >
          {surah.name}
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {surah.transliteration}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-0.5">
          {surah.translation}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-500">
          {surah.total_verses} Verses
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
          surah.type === 'meccan' 
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500' 
            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500'
        }`}>
          {surah.type}
        </span>
      </div>
    </Link>
  );
}
