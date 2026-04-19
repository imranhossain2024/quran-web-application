'use client';

import React, { useState, useRef, useCallback, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import quranData from '@/data/quran.json';

type SurahSuggestion = {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
};

type SearchBarProps = {
  onSearch?: () => void;
  className?: string;
};

function SearchBarContent({ onSearch, className = '' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Build surah list for suggestions (without verses to keep it light)
  const surahList: SurahSuggestion[] = useMemo(() => {
    return quranData.map(({ id, name, transliteration, translation }: any) => ({
      id,
      name,
      transliteration,
      translation,
    }));
  }, []);

  // Filter surah suggestions based on query
  const suggestions = useMemo(() => {
    if (!query.trim() || query.trim().length < 1) return [];
    const q = query.toLowerCase();
    return surahList.filter(
      (s) =>
        s.transliteration.toLowerCase().includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        s.name.includes(query)
    );
  }, [query, surahList]);

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setShowSuggestions(false);
    if (onSearch) onSearch();
  }, [router, onSearch]);

  const handleSurahClick = useCallback((surah: SurahSuggestion) => {
    setQuery(surah.transliteration);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    router.push(`/surah/${surah.id}`);
    if (onSearch) onSearch();
  }, [router, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        return;
      }
      if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSurahClick(suggestions[selectedIndex]);
        return;
      }
    }

    if (e.key === 'Enter') {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      setShowSuggestions(false);
      performSearch(query);
    }

    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    // Delay hiding so click on suggestion registers
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    router.push('/');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-neutral-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => query.trim() && setShowSuggestions(true)}
        onBlur={handleBlur}
        className="block w-full pl-10 pr-10 py-3 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-emerald-500 placeholder-neutral-500 dark:placeholder-neutral-500 transition-all sm:text-sm"
        placeholder="Search surah name or translation..."
        autoComplete="off"
      />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 z-10"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Surah Name Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden z-50 max-h-72 overflow-y-auto"
        >
          <div className="px-3 py-2 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            Surahs
          </div>
          {suggestions.map((surah, index) => (
            <button
              key={surah.id}
              onClick={() => handleSurahClick(surah)}
              className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                index === selectedIndex
                  ? 'bg-emerald-50 dark:bg-emerald-950'
                  : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-500 text-xs font-bold border border-emerald-100 dark:border-emerald-900">
                  {surah.id}
                </span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {surah.transliteration}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {surah.translation}
                  </p>
                </div>
              </div>
              <span className="text-base text-neutral-700 dark:text-neutral-300 font-amiri" dir="rtl">
                {surah.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense fallback={<div className={`h-11 w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse ${props.className || ''}`} />}>
      <SearchBarContent {...props} />
    </Suspense>
  );
}
