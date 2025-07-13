"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchDrivers } from "@/lib/api";

type Biography = {
  dob: string;
  pob: string;
  info: string;
  quote: string;
  hisimage: string;
  carimage: string;
};

type Driver = {
  name: string;
  team: string;
  number: string;
  abbrv: string;
  nationality: string;
  image: string;
  biography: Biography;
};

const flags: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  Germany: "🇩🇪",
  Spain: "🇪🇸",
  France: "🇫🇷",
  Japan: "🇯🇵",
  Italy: "🇮🇹",
  Australia: "🇦🇺",
  Netherlands: "🇳🇱",
  Finland: "🇫🇮",
  Mexico: "🇲🇽",
  USA: "🇺🇸",
  Brazil: "🇧🇷",
};

export default function DriverSection() {
  const [drivers, setDrivers] = useState<(Driver & { link: string; photo: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrivers()
      .then((res) => {
        const raw = res.data?.drivers ?? [];

        const transformed = raw.map((driver: Driver) => ({
          ...driver,
          photo: driver.image,
          link: `/drivers/${driver.abbrv?.toLowerCase() || driver.number}`
        }));

        setDrivers(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch drivers", err);
        setError("Unable to load drivers. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative bg-transparent text-white">
      <div className="max-w-7xl mx-auto">
        {loading && (
          <p className="text-gray-500 animate-pulse text-lg">Loading drivers...</p>
        )}
        {error && <p className="text-red-500 text-lg">{error}</p>}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {drivers.map((driver, idx) => (
              <motion.div
                key={driver.abbrv || driver.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.5, type: "spring" }}
              >
                <Link
                  href={driver.link}
                  className="relative group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-500 shadow-[0_0_30px_#991b1b22] hover:shadow-red-700/40 transform transition-all duration-300 hover:scale-[1.04]"
                >
                  {/* Ambient glow ring */}
                  <div className="absolute -inset-1 bg-red-600/20 blur-xl z-[-1] rounded-2xl pointer-events-none" />

                  {/* Top Image */}
                  <div className="relative">
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="w-full h-64 object-cover transition duration-300 group-hover:opacity-90"
                    />
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-sm font-extrabold rounded-full shadow-md tracking-wide">
                      #{driver.number}
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="p-5 space-y-1 text-center transition-all duration-300 group-hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-white tracking-wider">
                      {driver.name}
                    </h3>
                    <p className="text-sm text-gray-300">{driver.team}</p>
                    <p className="text-xs text-gray-400 italic">
                      {flags[driver.nationality] || ""} {driver.nationality}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
