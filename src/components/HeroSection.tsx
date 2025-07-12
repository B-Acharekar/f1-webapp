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
        setCountdown("Race has started!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextRace]);

  return (
    <section className="bg-black text-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600">
          Next Grand Prix
        </h1>

        {nextRace ? (
          <>
            <p className="text-2xl font-semibold">
              {nextRace.circuit} – {nextRace.location}, {nextRace.country}
            </p>
            <p className="text-lg text-gray-300">Session: {nextRace.session_type}</p>
            <p className="text-3xl font-mono text-white">{countdown}</p>
          </>
        ) : (
          <p className="text-gray-400">Loading race info...</p>
        )}
      </div>
    </section>
  );
}
