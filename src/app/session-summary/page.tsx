"use client";

import { useEffect, useState } from "react";
import SummaryCard from "@/components/SummaryCard";
import { fetchSessionSummary, fetchEvents } from "@/lib/api";

export default function SessionSummaryPage() {
  const [year, setYear] = useState(2024);
  const [gp, setGp] = useState("Monaco");
  const [session, setSession] = useState("R");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [availableGPs, setAvailableGPs] = useState<string[]>([]);

  useEffect(() => {
    fetchEvents(year)
      .then((res) => setAvailableGPs(res.data.events))
      .catch(console.error);
  }, [year]);

  useEffect(() => {
    if (!gp) return;
    setLoading(true);
    fetchSessionSummary({ year, gp, session_type: session })
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [year, gp, session]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Session Summary</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <select
          value={year}
          onChange={(e) => setYear(+e.target.value)}
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
          {availableGPs.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>

        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="R">Race</option>
          <option value="Q">Qualifying</option>
          <option value="FP1">FP1</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <SummaryCard data={data} />
      )}
    </div>
  );
}
