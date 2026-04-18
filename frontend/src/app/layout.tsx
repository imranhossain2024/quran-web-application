import type { Metadata } from 'next';
import { Amiri_Quran, Scheherazade_New, Noto_Naskh_Arabic, Inter } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '@/context/SettingsContext';
import Navbar from '@/components/Navbar';
import SettingsSidebar from '@/components/SettingsSidebar';

const inter = Inter({ subsets: ['latin'] });

const amiri = Amiri_Quran({ 
  weight: ['400'], 
  subsets: ['arabic'],
  variable: '--font-amiri'
});

const scheherazade = Scheherazade_New({ 
  weight: ['400', '700'], 
  subsets: ['arabic'],
  variable: '--font-scheherazade'
});

const notoNaskh = Noto_Naskh_Arabic({ 
  weight: ['400', '700'], 
  subsets: ['arabic'],
  variable: '--font-noto'
});

export const metadata: Metadata = {
  title: 'NurulQuran',
  description: 'A complete Quran web application with Arabic text and English translation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${amiri.variable} ${scheherazade.variable} ${notoNaskh.variable}`}>
      <body className={`${inter.className} bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300`}>
        <SettingsProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
              {children}
            </main>
          </div>
          <SettingsSidebar />
        </SettingsProvider>
      </body>
    </html>
  );
}
