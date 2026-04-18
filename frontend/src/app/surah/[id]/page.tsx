import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AyahCard from '@/components/AyahCard';

import quranData from '@/data/quran.json';

async function getSurah(id: string) {
  const surah = quranData.find(s => s.id.toString() === id);
  
  if (!surah) {
    throw new Error('Failed to find surah');
  }
  
  return surah;
}

export async function generateStaticParams() {
  return quranData.map((surah: any) => ({
    id: surah.id.toString(),
  }));
}

export default async function SurahPage({ params }: { params: { id: string } }) {
  const surah = await getSurah(params.id);
  const prevId = parseInt(params.id) > 1 ? parseInt(params.id) - 1 : null;
  const nextId = parseInt(params.id) < 114 ? parseInt(params.id) + 1 : null;

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Surah Header */}
      <header className="text-center py-12 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-500 font-bold text-2xl border border-emerald-100 dark:border-emerald-900 shadow-sm">
            {surah.id}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {surah.transliteration}
            </h1>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-[0.2em]">
              {surah.translation} • {surah.total_verses} Ayahs • {surah.type}
            </p>
          </div>
        </div>
      </header>

      {/* Bismillah */}
      {surah.id !== 9 && (
        <div className="text-center text-4xl leading-relaxed text-emerald-900 dark:text-emerald-500 font-amiri" dir="rtl">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
      )}

      {/* Ayahs */}
      <div className="space-y-4">
        {surah.verses.map((ayah: any) => (
          <AyahCard key={ayah.id} ayah={ayah} />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center py-12 border-t border-neutral-200 dark:border-neutral-800">
        {prevId ? (
          <Link 
            href={`/surah/${prevId}`}
            className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="font-medium">Previous Surah</span>
          </Link>
        ) : <div />}

        {nextId ? (
          <Link 
            href={`/surah/${nextId}`}
            className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
          >
            <span className="font-medium">Next Surah</span>
            <ChevronRight size={20} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
