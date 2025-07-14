"use client";

import { useEffect, useState } from "react";
import { fetchDrivers } from "@/lib/api";
import PitStopChart from "@/components/analytics/PitStopChart";
import TyreStrategy from "@/components/analytics/TyreStrategy";
import TelemetryHeatmap from "@/components/analytics/TelemetryHeatmap";

export default function RaceAnalyticsPage() {
  const [year, setYear] = useState(2024);
  const [gp, setGp] = useState(1);
  const [driver, setDriver] = useState("");
  const [drivers, setDrivers] = useState<string[]>([]);

  useEffect(() => {
    fetchDrivers()
      .then((res) => {
        const fetched = res.data?.drivers || [];
        const abbrvs = fetched.map((d: any) => d.abbrv);
        setDrivers(abbrvs);
        setDriver(abbrvs[0] || "");
      })
      .catch((err) => {
        console.error("Failed to fetch drivers:", err);
      });
  }, []);

  return (
    <section className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold border-b-4 border-red-600 inline-block pb-2">
          Race Analytics
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Year */}
          <select
            className="p-2 border rounded bg-neutral-800 text-white"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[2021, 2022, 2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Grand Prix (Round) */}
          <select
            className="p-2 border rounded bg-neutral-800 text-white"
            value={gp}
            onChange={(e) => setGp(Number(e.target.value))}
          >
            {Array.from({ length: 23 }, (_, i) => i + 1).map((r) => (
              <option key={r} value={r}>
                Round {r}
              </option>
            ))}
          </select>

          {/* Driver */}
          <select
            className="p-2 border rounded bg-neutral-800 text-white"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
          >
            {drivers.map((abbrv) => (
              <option key={abbrv} value={abbrv}>
                {abbrv}
              </option>
            ))}
          </select>
        </div>

        {/* Charts */}
        <div className="space-y-14">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-500">Pit Stop Analysis</h2>
            <PitStopChart year={year} gp={gp} />
          </div>

          {/* <div>
            <h2 className="text-2xl font-bold mb-4 text-red-500">Tyre Strategy</h2>
            <TyreStrategy year={year} gp={gp} />
          </div> */}

          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-500">Telemetry Heatmap</h2>
            <TelemetryHeatmap year={year} gp={gp} driver={driver} />
          </div>
        </div>
      </div>
    </section>
  );
}
