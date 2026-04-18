import SurahCard from '@/components/SurahCard';
import SearchBar from '@/components/SearchBar';

async function getSurahs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surahs`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch surahs');
  }
  
  return res.json();
}

export default async function HomePage() {
  const surahs = await getSurahs();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Explore the Glorious <span className="text-emerald-600">Quran</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Read, study, and search through all 114 Surahs with Arabic text and English translation.
        </p>
        <SearchBar className="max-w-md mx-auto mt-8" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah: any) => (
          <SurahCard key={surah.id} surah={surah} />
        ))}
      </div>
    </div>
  );
}
