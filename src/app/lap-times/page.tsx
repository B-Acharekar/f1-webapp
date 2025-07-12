"use client";

import { useEffect, useState } from "react";
import LapTimeChart from "@/components/LapTimeChart";
import { fetchDriversInSession, fetchLapTimes, fetchEvents } from "@/lib/api";

export default function LapTimesPage() {
  const [year, setYear] = useState(2024);
  const [gp, setGp] = useState("Monaco");
  const [sessionType, setSessionType] = useState("R");
  const [driver, setDriver] = useState("VER");

  const [drivers, setDrivers] = useState<string[]>([]);
  const [lapData, setLapData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [bestOnly, setBestOnly] = useState(false);
  const [availableGPs, setAvailableGPs] = useState<string[]>([]);

  useEffect(() => {
    fetchEvents(year)
      .then((res) => setAvailableGPs(res.data.events))
      .catch((err) => {
        console.error("Failed to load events", err);
        setAvailableGPs([]);
      });
  }, [year]);

  useEffect(() => {
    fetchDriversInSession({ year, gp, session_type: sessionType }).then((res) =>
      setDrivers(res.data.drivers)
    );
  }, [year, gp, sessionType]);

  useEffect(() => {
    if (!driver) return;
    setLoading(true);
    fetchLapTimes({
      driver,
      year,
      gp,
      session_type: sessionType,
      best_lap_only: bestOnly,
    })
      .then((res) => setLapData(res.data))
      .finally(() => setLoading(false));
  }, [driver, year, gp, sessionType, bestOnly]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Lap Times</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="p-2 border rounded"
        >
          {[2024, 2023, 2022].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={gp}
          onChange={(e) => setGp(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- Select GP --</option>
          {availableGPs.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="R">Race</option>
          <option value="Q">Qualifying</option>
          <option value="FP1">FP1</option>
        </select>

        <select
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          className="p-2 border rounded"
        >
          {drivers.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestOnly}
          onChange={() => setBestOnly(!bestOnly)}
        />
        Show only best lap
      </label>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <LapTimeChart data={lapData} />
      )}
    </div>
  );
}
