import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/" className="text-2xl font-bold text-green-700 dark:text-green-500">
          NurulQuran
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
            Home
          </Link>
          <Link href="/search" className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-colors">
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
}
