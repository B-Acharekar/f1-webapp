"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function TelemetryChart({
  data1,
  data2,
  label1,
  label2,
}: {
  data1: any[];
  data2: any[];
  label1: string;
  label2: string;
}) {
  const merged = data1.map((pt, idx) => ({
    distance: pt.distance,
    [label1]: pt.speed,
    [label2]: data2[idx]?.speed || null,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={merged}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="distance" label={{ value: "Distance (m)", position: "insideBottom", offset: -5 }} />
        <YAxis label={{ value: "Speed (km/h)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={label1} stroke="#ff7300" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey={label2} stroke="#387908" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
