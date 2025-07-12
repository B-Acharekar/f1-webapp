import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-10 border-t border-red-600">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold text-red-500 mb-3">F1 Insights</h4>
          <p className="text-sm text-gray-400">
            Dive into Formula 1 like never before. Lap times, race analysis, and more!
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Explore</h5>
          <ul className="space-y-1 text-sm">
            <li><Link href="/lap-times" className="hover:text-red-500">Lap Times</Link></li>
            <li><Link href="/compare-laps" className="hover:text-red-500">Compare Laps</Link></li>
            <li><Link href="/session-summary" className="hover:text-red-500">Session Summary</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Seasons</h5>
          <ul className="space-y-1 text-sm">
            <li><Link href="/schedule" className="hover:text-red-500">Schedule</Link></li>
            <li><Link href="/standings" className="hover:text-red-500">Standings</Link></li>
            <li><Link href="/results" className="hover:text-red-500">Results</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Follow Us</h5>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-500">🐦</a>
            <a href="#" className="hover:text-red-500">📷</a>
            <a href="#" className="hover:text-red-500">📺</a>
          </div>
          <p className="text-xs mt-4 text-gray-500">© {new Date().getFullYear()} F1 Insights</p>
        </div>
      </div>
    </footer>
  );
}
