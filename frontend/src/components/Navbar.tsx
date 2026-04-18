'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Settings, Moon, Sun } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { darkMode, setDarkMode } = useSettings();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-800 dark:text-emerald-500">
          NurulQuran
        </Link>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            id="settings-trigger"
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      {showSearch && (
        <div className="max-w-7xl mx-auto px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
          <SearchBar onSearch={() => setShowSearch(false)} />
        </div>
      )}
    </nav>
  );
}
