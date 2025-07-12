"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchDrivers } from "@/lib/api";

type Driver = {
  name: string;
  team: string;
  number: string;
  photo: string;
  link: string;
  nationality: string;
};

export default function DriverSection() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrivers()
      .then((res) => {
        const driverList = Array.isArray(res.data?.drivers)
          ? res.data.drivers
          : Array.isArray(res.data)
          ? res.data
          : [];

        setDrivers(driverList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch drivers", err);
        setError("Unable to load drivers. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-white dark:bg-neutral-900 py-14 px-6 text-black dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-10">
        <h2 className="text-4xl font-extrabold border-b-4 border-red-600 inline-block pb-2 tracking-wide">
          Meet the Grid
        </h2>

        {loading && (
          <p className="text-gray-500 animate-pulse text-lg">Loading drivers...</p>
        )}
        {error && <p className="text-red-500 text-lg">{error}</p>}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {drivers.map((driver) => (
              <Link
                key={driver.number}
                href={driver.link || "#"}
                className="bg-neutral-800 rounded-2xl overflow-hidden shadow-xl transform transition duration-300 hover:scale-[1.03] hover:shadow-red-600/40 border border-neutral-700 group"
              >
                <div className="relative">
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-sm font-extrabold rounded-full shadow-md">
                    #{driver.number}
                  </div>
                </div>
                <div className="p-5 space-y-1 text-center">
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {driver.name}
                  </h3>
                  <p className="text-sm text-gray-300">{driver.team}</p>
                  {driver.nationality && (
                    <p className="text-xs text-gray-400 italic">
                      {driver.nationality}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}