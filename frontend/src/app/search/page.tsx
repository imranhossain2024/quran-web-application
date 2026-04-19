'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AyahCard from '@/components/AyahCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import SearchBar from '@/components/SearchBar';
import { Search } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(query)}&page=1&limit=50`);
        const data = await res.json();
        setResults(data.results);
        setTotal(data.pagination.total);
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="pt-4">
          <SearchBar className="max-w-xl mx-auto" />
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search size={48} className="text-neutral-300 dark:text-neutral-700 mb-4" />
          <h2 className="text-2xl font-bold text-neutral-400">Enter a term to search</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search bar stays visible with the current query */}
      <div className="pt-4">
        <SearchBar className="max-w-xl mx-auto" />
      </div>

      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Search Results
        </h1>
        <p className="text-neutral-500 mt-2">
          {loading ? 'Searching...' : `Found ${total} results for "${query}"`}
        </p>
      </div>

      {loading ? (
        <div className="space-y-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="h-4 w-40 bg-neutral-100 dark:bg-neutral-800 rounded" />
              <div className="h-10 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
              <div className="h-6 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result, i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-500 mb-4 uppercase tracking-widest">
                <span>{result.surah_name}</span>
                <span className="text-neutral-300 dark:text-neutral-700 mx-2">•</span>
                <span>Ayah {result.ayah_number}</span>
              </div>
              <AyahCard 
                ayah={{ id: result.ayah_number, text: result.text, translation: result.translation }} 
                highlight={query}
              />
            </div>
          ))}

          {!loading && results.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-500">No results found for your search term.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20 animate-pulse"><div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-full" /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}
