"use client";

import { useEffect, useState } from "react";
import SummaryCard from "@/components/SummaryCard";
import { fetchSessionSummary } from "@/lib/api";

export default function SessionSummaryPage() {
  const [year, setYear] = useState(2024);
  const [gp, setGp] = useState("Monaco");
  const [session, setSession] = useState("R");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchSessionSummary({ year, gp, session_type: session })
      .then(res => setData(res.data))
      .catch(console.error);
  }, [year, gp, session]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Session Summary</h1>

      <div className="flex gap-4">
        <select value={gp} onChange={e => setGp(e.target.value)} className="p-2 border rounded">
          <option value="Monaco">Monaco</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Spain">Spain</option>
        </select>
        <select value={session} onChange={e => setSession(e.target.value)} className="p-2 border rounded">
          <option value="R">Race</option>
          <option value="Q">Qualifying</option>
          <option value="FP1">FP1</option>
        </select>
      </div>

      <SummaryCard data={data} />
    </div>
  );
}
