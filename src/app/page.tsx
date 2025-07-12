import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <HeroSection />

      <main className="p-8 flex flex-col items-center justify-center gap-10 text-center bg-white text-black dark:bg-black dark:text-white">
        <h1 className="text-4xl font-bold text-red-600">
          🏎️ F1 Web App Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          Explore driver lap times, telemetry comparisons, and session summaries using FastF1 data.
        </p>

        <div className="grid gap-6 sm:grid-cols-3 w-full max-w-3xl">
          <Link
            href="/lap-times"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 text-lg font-medium transition text-center"
          >
            View Lap Times
          </Link>
          <Link
            href="/compare-laps"
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl p-4 text-lg font-medium transition text-center"
          >
            Compare Laps
          </Link>
          <Link
            href="/session-summary"
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 text-lg font-medium transition text-center"
          >
            Session Summary
          </Link>
        </div>
      </main>
    </div>
  );
}
