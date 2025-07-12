"use client";

import { useEffect, useState } from "react";
import { fetchNextRace } from "@/lib/api";

export default function HeroSection() {
  const [nextRace, setNextRace] = useState<any>(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear();
    fetchNextRace(year)
      .then((res) => setNextRace(res.data))
      .catch((err) => console.error("Failed to load next race", err));
  }, []);

  useEffect(() => {
    if (!nextRace?.session_date) return;

    const targetTime = new Date(nextRace.session_date).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setCountdown("🏁 Race has started!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const format = (num: number) => String(num).padStart(2, "0");

      setCountdown(
        `${days}d ${format(hours)}h ${format(minutes)}m ${format(seconds)}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [nextRace]);


  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-900 to-black text-white py-20 px-6 md:px-12 overflow-hidden border-b border-red-600">
      <div className="max-w-6xl mx-auto text-center space-y-6 z-10 relative">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 uppercase tracking-widest drop-shadow-lg">
          Next Grand Prix
        </h1>

        {nextRace ? (
          <>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight">
              {nextRace.circuit}
            </p>
            <p className="text-lg text-gray-400">
              {nextRace.location}, {nextRace.country} &mdash;{" "}
              <span className="uppercase">{nextRace.session_type}</span>
            </p>

            <div className="mt-6 inline-flex flex-col items-center gap-1 bg-neutral-800/80 px-8 py-4 rounded-lg shadow-md backdrop-blur-md border border-neutral-700">
              <span className="text-sm text-gray-400 uppercase">
                Track Time Countdown
              </span>
              <span className="text-5xl font-mono tracking-tight text-white">
                {countdown}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                ⏱ Powered by Tag Heuer
              </span>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-xl">Loading race info...</p>
        )}
      </div>

      {/* Optional: subtle background image overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('/f1-bg.jpg')] bg-cover bg-center pointer-events-none" />
    </section>
  );
}
