// components/analytics/TelemetryHeatmap.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchTelemetryData } from "@/lib/api";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TelemetryProps = {
  year: number;
  gp: number;
  driver: string;
};

export default function TelemetryHeatmap({ year, gp, driver }: TelemetryProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTelemetryData({ year, gp, driver }).then((res) => {
      const { distance, speed, throttle } = res.data;
      const formatted = distance.map((d: number, i: number) => ({
        Distance: d,
        Speed: speed[i],
        Throttle: throttle[i],
      }));
      setData(formatted);
      setLoading(false);
    });
  }, [year, gp, driver]);

  if (loading) return <p className="text-gray-400">Loading telemetry...</p>;

  return (
    <section className="p-6 bg-white dark:bg-black text-black dark:text-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Telemetry Heatmap</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <XAxis type="number" dataKey="Distance" name="Distance" unit="m" />
          <YAxis type="number" dataKey="Speed" name="Speed" unit="km/h" />
          <ZAxis type="number" dataKey="Throttle" name="Throttle %" range={[60, 200]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name={driver} data={data} fill="#10b981" />
        </ScatterChart>
      </ResponsiveContainer>
    </section>
  );
}
