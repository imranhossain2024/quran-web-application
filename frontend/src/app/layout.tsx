import type { Metadata } from "next";
import { SettingsProvider } from "@/context/SettingsContext";
import Navbar from "@/components/Navbar";
import { Roboto, Amiri, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
});

export const metadata: Metadata = {
  title: "Quran Web Application",
  description: "Quran Web Application Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} ${amiri.variable} ${notoArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SettingsProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
