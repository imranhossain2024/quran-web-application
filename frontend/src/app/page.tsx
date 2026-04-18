import Link from "next/link";
import quranData from "@/data/quran.json";

interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
}

export default function Home() {
  // JSON ফাইল থেকে সরাসরি ডেটা পড়া (কোনো fetch দরকার নেই)
  const surahs: Surah[] = quranData.map((s) => ({
    id: s.id,
    name: s.name,
    transliteration: s.transliteration,
    translation: s.translation,
    type: s.type,
    total_verses: s.total_verses,
  }));

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-12 bg-green-700 text-white p-8 md:p-16 text-center shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            NurulQuran
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8">
            কুরআনের আলো ছড়িয়ে পড়ুক আপনার হৃদয়ে। খুঁজুন আপনার কাঙ্ক্ষিত আয়াত এবং
            সূরা।
          </p>
          <Link
            href="/search"
            className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all inline-block shadow-lg"
          >
            🔍 Search Verses
          </Link>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-600 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-green-800 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Surah List Title */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            সবগুলো সূরা
          </h2>
          <p className="text-gray-500">১১৪টি সূরার তালিকা</p>
        </div>
      </div>

      {/* Surah Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah) => (
          <Link href={`/surah/${surah.id}`} key={surah.id}>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700 group">
              <div className="flex justify-between items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-800 rounded-full font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {surah.id}
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-500 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                  {surah.name}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-1 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                {surah.transliteration}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {surah.translation}
              </p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-500">
                <span className="bg-gray-100 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                  {surah.type === "meccan" ? "মাক্কী" : "মাদানী"}
                </span>
                <span>{surah.total_verses} Verses</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
