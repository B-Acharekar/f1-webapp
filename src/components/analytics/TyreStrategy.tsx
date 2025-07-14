// components/analytics/TyreStrategy.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchTyreStints } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TyreStrategy({ year, gp }: { year: number; gp: number }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTyreStints(year, gp).then((res) => {
      setData(res.data.strategy || []);
      setLoading(false);
    });
  }, [year, gp]);

  if (loading) return <p>Loading tyre strategies...</p>;

  return (
    <section className="p-6 bg-white dark:bg-black text-black dark:text-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Tyre Strategy Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="start_lap" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="compound" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
