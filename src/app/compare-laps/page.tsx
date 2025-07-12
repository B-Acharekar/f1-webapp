"use client";

import { useEffect, useState } from "react";
import TelemetryChart from "@/components/TelemetryChart";
import { fetchCompareLaps, fetchDriversInSession } from "@/lib/api";

export default function CompareLapsPage() {
  const [driver1, setDriver1] = useState("NOR");
  const [driver2, setDriver2] = useState("VER");
  const [lap, setLap] = useState(30);
  const [data, setData] = useState<any>({});
  const [drivers, setDrivers] = useState<string[]>([]);

  const [year, setYear] = useState(2024);
  const [gp, setGp] = useState("Monaco");
  const [session, setSession] = useState("R");

  useEffect(() => {
    fetchDriversInSession({ year, gp, session_type: session })
      .then(res => setDrivers(res.data.drivers))
      .catch(console.error);
  }, [year, gp, session]);

  useEffect(() => {
    if (driver1 && driver2 && lap) {
      fetchCompareLaps({ driver1, driver2, lap, year, gp, session_type: session })
        .then(res => setData(res.data))
        .catch(console.error);
    }
  }, [driver1, driver2, lap, year, gp, session]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Compare Laps</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <select value={driver1} onChange={e => setDriver1(e.target.value)} className="p-2 border rounded">
          {drivers.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={driver2} onChange={e => setDriver2(e.target.value)} className="p-2 border rounded">
          {drivers.map(d => <option key={d}>{d}</option>)}
        </select>
        <input
          type="number"
          value={lap}
          onChange={(e) => setLap(+e.target.value)}
          className="p-2 border rounded"
          placeholder="Lap Number"
        />
      </div>

      {data[driver1] && data[driver2] && (
        <TelemetryChart
          data1={data[driver1]}
          data2={data[driver2]}
          label1={driver1}
          label2={driver2}
        />
      )}
    </div>
  );
}
