// components/analytics/PitStopChart.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchPitStops } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function PitStopChart({ year, gp }: { year: number; gp: number }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPitStops(year, gp).then((res) => {
      setData(res.data.pit_stops || []);
      setLoading(false);
    });
  }, [year, gp]);

  if (loading) return <p>Loading pit stops...</p>;

  return (
    <section className="p-6 bg-white dark:bg-black text-black dark:text-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Pit Stop Durations</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="driver" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

