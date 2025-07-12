"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";

export default function GPSelect({
  year,
  onSelect,
}: {
  year: number;
  onSelect: (gp: string) => void;
}) {
  const [events, setEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents(year)
      .then((res) => {
        setEvents(res.data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events", err);
        setLoading(false);
      });
  }, [year]);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-sm">Select Grand Prix</label>
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">-- Choose GP --</option>
          {events.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
