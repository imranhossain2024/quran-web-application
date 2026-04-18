import Link from "next/link";

interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
}

export default async function Home() {
  let surahs: Surah[] = [];
  
  try {
    // ব্যাকএন্ড থেকে ডেটা ফেচ করা
    const res = await fetch("http://localhost:5000/api/surahs", {
      cache: "no-store", // ডেভেলপমেন্টের সুবিধার জন্য, যাতে রিফ্রেশ করলে নতুন ডাটা পায়
    });
    
    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    // ব্যাকএন্ডের রেসপন্স অনুযায়ী ডাটা এক্সেস করা
    surahs = Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    // ব্যাকএন্ড ডাউন থাকলে এলার্ট দেখাবে
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">NurulQuran</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center shadow-sm">
          <strong>Tragic Error:</strong> ব্যাকএন্ড সার্ভার (Express) থেকে ডেটা লোড করা যাচ্ছে না। আপনার Node.js সার্ভার চালু আছে কিনা চেক করুন।
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        NurulQuran
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah) => (
          <Link href={`/surah/${surah.id}`} key={surah.id}>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-800 rounded-full font-bold">
                  {surah.id}
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                  {surah.name}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-1 dark:text-white">
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
