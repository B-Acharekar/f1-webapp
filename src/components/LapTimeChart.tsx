"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  DotProps,
} from "recharts";
import { FC } from "react";

export default function LapTimeChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  const bestLap = data.reduce((a, b) => (a.time < b.time ? a : b), data[0]);

  const CustomDot: FC<DotProps> = (props) => {
    const { cx, cy } = props;
    const payload = (props as any).payload; // 👈 assert to bypass TS restriction

    if (payload?.lap === bestLap.lap) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="gold"
          stroke="black"
          strokeWidth={1}
        />
      );
    }
    return (
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="#3b82f6"
        stroke="white"
        strokeWidth={0.5}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis
          dataKey="lap"
          label={{ value: "Lap", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          label={{
            value: "Time (s)",
            angle: -90,
            position: "insideLeft",
          }}
          domain={["auto", "auto"]}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="time"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={<CustomDot />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
