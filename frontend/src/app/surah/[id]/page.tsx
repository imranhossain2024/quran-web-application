import Link from "next/link";
import AyahCard from "@/components/AyahCard";
import quranData from "@/data/quran.json";

interface Verse {
  id: number;
  text: string;
  translation: string;
}

interface SurahDetail {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  verses: Verse[];
}

// SSG এর জন্য ১১৪টি সূরার আইডি জেনারেট করা (JSON থেকে সরাসরি)
export async function generateStaticParams() {
  return quranData.map((surah) => ({
    id: surah.id.toString(),
  }));
}

// Next.js 14+ এ params এক্সেস করার নিয়ম
export default async function SurahDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const surahId = resolvedParams.id;

  // JSON থেকে সরাসরি নির্দিষ্ট সূরার তথ্য পড়া
  const surah: SurahDetail | undefined = quranData.find(
    (s) => s.id.toString() === surahId
  );

  // যদি ওই ID বা সূরা না পাওয়া যায়
  if (!surah) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500">
        সূরাটি পাওয়া যায়নি। অনুগ্রহ করে সঠিক সূরা নম্বর ব্যবহার করুন।
      </div>
    );
  }

  // মূল UI ডিজাইন
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/" className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-2">
          ← Back to Home
        </Link>
      </div>

      {/* Surah Header */}
      <div className="bg-green-700 text-white rounded-2xl p-8 text-center mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">{surah.name}</h1>
        <h2 className="text-2xl mb-2">{surah.transliteration}</h2>
        <p className="text-green-100">{surah.translation}</p>
        <div className="flex justify-center gap-4 mt-4 text-sm font-medium">
          <span className="bg-green-800 px-3 py-1 rounded-full">{surah.type === "meccan" ? "Meccan" : "Medinan"}</span>
          <span className="bg-green-800 px-3 py-1 rounded-full">{surah.total_verses} Verses</span>
        </div>
      </div>

      {/* Verses List */}
      <div className="space-y-6">
        {surah.verses.map((verse) => (
          <AyahCard key={verse.id} verse={verse} />
        ))}
      </div>
    </main>
  );
}
