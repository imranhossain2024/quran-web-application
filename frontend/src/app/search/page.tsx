"use client";

import { useState } from "react";
import AyahCard from "@/components/AyahCard";
import quranData from "@/data/quran.json";

interface SearchResult {
  surahId: number;
  surahName: string;
  surahTransliteration: string;
  verseId: number;
  text: string;
  translation: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setTotalResults(null);
    setResults([]);

    // JSON ডেটা থেকে সরাসরি সার্চ করা (কোনো ব্যাকএন্ড দরকার নেই)
    const searchQuery = query.toLowerCase();
    const matched: SearchResult[] = [];

    for (const surah of quranData) {
      for (const verse of surah.verses) {
        if (verse.translation.toLowerCase().includes(searchQuery)) {
          matched.push({
            surahId: surah.id,
            surahName: surah.name,
            surahTransliteration: surah.transliteration,
            verseId: verse.id,
            text: verse.text,
            translation: verse.translation,
          });
        }
      }
    }

    setResults(matched);
    setTotalResults(matched.length);
    setLoading(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-2">
          কুরআনে খুঁজুন
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Search the English translation (e.g., mercy, faith, peace)
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="flex-1 px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {totalResults !== null && !loading && (
          <p className="text-center text-green-600 font-medium mb-6">
            Found {totalResults} result{totalResults !== 1 ? "s" : ""}
          </p>
        )}

        <div className="space-y-8">
          {results.length > 0 ? (
            results.map((verse) => (
              <div key={`${verse.surahId}-${verse.verseId}`}>
                <h4 className="text-sm text-green-600 font-semibold mb-3 flex items-center gap-2">
                  <span className="bg-green-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    Surah {verse.surahTransliteration} ({verse.surahName})
                  </span>
                  <span className="text-gray-500">
                    Verse {verse.verseId}
                  </span>
                </h4>
                <AyahCard 
                  verse={{ 
                    id: verse.verseId, 
                    text: verse.text, 
                    translation: verse.translation 
                  }} 
                />
              </div>
            ))
          ) : (
            !loading && totalResults === 0 && (
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-gray-500 text-lg">কোনো ফলাফল পাওয়া যায়নি। অন্য কিছু লিখে খুঁজুন।</p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
