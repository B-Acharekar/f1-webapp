"use client";

import { useEffect, useState } from "react";
import LapTimeChart from "@/components/LapTimeChart";
import { fetchLapTimes, fetchDriversInSession } from "@/lib/api";

export default function LapTimesPage() {
  const [driver, setDriver] = useState("NOR");
  const [lapData, setLapData] = useState([]);
  const [drivers, setDrivers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [year, setYear] = useState(2024);
  const [gp, setGp] = useState("Monaco");
  const [session, setSession] = useState("R");

  useEffect(() => {
    fetchDriversInSession({ year, gp, session_type: session })
      .then(res => setDrivers(res.data.drivers))
      .catch(console.error);
  }, [year, gp, session]);

  useEffect(() => {
    if (driver) {
      setLoading(true);
      fetchLapTimes({ driver, year, gp, session_type: session })
        .then(res => setLapData(res.data))
        .finally(() => setLoading(false));
    }
  }, [driver, year, gp, session]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Lap Times</h1>

      <div className="flex gap-4">
        <select value={driver} onChange={(e) => setDriver(e.target.value)} className="p-2 border rounded">
          {drivers.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select value={gp} onChange={(e) => setGp(e.target.value)} className="p-2 border rounded">
          <option value="Monaco">Monaco</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Spain">Spain</option>
        </select>
        <select value={session} onChange={(e) => setSession(e.target.value)} className="p-2 border rounded">
          <option value="R">Race</option>
          <option value="Q">Qualifying</option>
          <option value="FP1">FP1</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading lap times...</p>
      ) : (
        <LapTimeChart data={lapData} />
      )}
    </div>
  );
}
