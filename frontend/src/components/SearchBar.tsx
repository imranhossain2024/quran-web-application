'use client';

import React, { useState, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

type SearchBarProps = {
  onSearch?: () => void;
  className?: string;
};

function SearchBarContent({ onSearch, className = '' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    if (onSearch) onSearch();
  }, [router, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Only auto-search after user stops typing for 800ms
    if (value.trim().length >= 3) {
      debounceRef.current = setTimeout(() => {
        performSearch(value);
      }, 800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Clear any pending debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      performSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    router.push('/');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-neutral-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="block w-full pl-10 pr-10 py-3 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-emerald-500 placeholder-neutral-500 dark:placeholder-neutral-500 transition-all sm:text-sm"
        placeholder="Search surah name or translation..."
      />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
        >
          <X className="h-5 w-5" />
        </button>
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
