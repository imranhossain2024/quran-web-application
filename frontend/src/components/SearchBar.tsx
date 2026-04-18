'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
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

  // Debounced navigation
  useEffect(() => {
    if (!query.trim()) return;
    
    const timeout = setTimeout(() => {
      if (query !== searchParams.get('q')) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
        if (onSearch) onSearch();
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, router, searchParams, onSearch]);

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
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
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-emerald-500 placeholder-neutral-500 dark:placeholder-neutral-500 transition-all sm:text-sm"
        placeholder="Search for translation text..."
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
