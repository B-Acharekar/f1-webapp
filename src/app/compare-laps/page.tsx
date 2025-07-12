"use client";

import { useEffect, useState } from "react";
import TelemetryChart from "@/components/TelemetryChart";
import { fetchCompareLaps, fetchDriversInSession, fetchEvents } from "@/lib/api";

export default function CompareLapsPage() {
  const [year, setYear] = useState(2024);
  const [gp, setGp] = useState("Monaco");
  const [session, setSession] = useState("R");

  const [driver1, setDriver1] = useState("NOR");
  const [driver2, setDriver2] = useState("VER");
  const [lap, setLap] = useState(30);
  const [data, setData] = useState<any>({});
  const [drivers, setDrivers] = useState<string[]>([]);
  const [availableGPs, setAvailableGPs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load GPs for selected year
  useEffect(() => {
    fetchEvents(year)
      .then((res) => setAvailableGPs(res.data.events))
      .catch(console.error);
  }, [year]);

  // Load drivers for selected session
  useEffect(() => {
    fetchDriversInSession({ year, gp, session_type: session })
      .then(res => setDrivers(res.data.drivers))
      .catch(console.error);
  }, [year, gp, session]);

  // Fetch lap telemetry
  useEffect(() => {
    if (driver1 && driver2 && lap) {
      setLoading(true);
      fetchCompareLaps({ driver1, driver2, lap, year, gp, session_type: session })
        .then(res => setData(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [driver1, driver2, lap, year, gp, session]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Compare Laps</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select value={year} onChange={(e) => setYear(+e.target.value)} className="p-2 border rounded">
          {[2024, 2023, 2022].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select value={gp} onChange={(e) => setGp(e.target.value)} className="p-2 border rounded">
          <option value="">-- Select GP --</option>
          {availableGPs.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={session} onChange={(e) => setSession(e.target.value)} className="p-2 border rounded">
          <option value="R">Race</option>
          <option value="Q">Qualifying</option>
          <option value="FP1">FP1</option>
        </select>

        <input
          type="number"
          value={lap}
          onChange={(e) => setLap(+e.target.value)}
          className="p-2 border rounded"
          placeholder="Lap Number"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <select value={driver1} onChange={e => setDriver1(e.target.value)} className="p-2 border rounded">
          {drivers.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select value={driver2} onChange={e => setDriver2(e.target.value)} className="p-2 border rounded">
          {drivers.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        data[driver1] && data[driver2] && (
          <TelemetryChart
            data1={data[driver1]}
            data2={data[driver2]}
            label1={driver1}
            label2={driver2}
          />
        )
      )}
    </div>
  );
}
