import Link from "next/link";
import AyahCard from "@/components/AyahCard";

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
// SSG এর জন্য ১১৪টি সূরার আইডি জেনারেট করা
export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:5000/api/surahs");
    if (!res.ok) return [];
    const data = await res.json();
    const surahs = Array.isArray(data) ? data : data.data || [];
    return surahs.map((surah: { id: number }) => ({
      id: surah.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Next.js 14+ এ params এক্সেস করার নিয়ম
export default async function SurahDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const surahId = resolvedParams.id;
  let surah: SurahDetail | null = null;

  try {
    // ব্যাকএন্ড থেকে নির্দিষ্ট সূরার তথ্য ফেচ করা
    const res = await fetch(`http://localhost:5000/api/surahs/${surahId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    surah = await res.json();
  } catch {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        সূরার ডেটা লোড করা ব্যর্থ হয়েছে!
      </div>
    );
  }

  // যদি ওই ID বা সূরা না পাওয়া যায়
  if (!surah) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500">
        সূরাটি পাওয়া যায়নি। অথবা ব্যাকএন্ড থেকে ডেটা আসেনি।
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
