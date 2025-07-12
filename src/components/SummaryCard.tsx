export default function SummaryCard({ data }: { data: any }) {
  if (!data || data.error) return <p className="text-red-600">No data found.</p>;

  const { circuit, location, country, session_type, session_date, weather } = data;

  return (
    <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white space-y-3">
      <h2 className="text-2xl font-bold">{circuit}</h2>
      <p className="text-sm">{location}, {country}</p>
      <p className="text-sm">Session: {session_type} | Date: {new Date(session_date).toLocaleString()}</p>
      <div className="pt-2 text-sm">
        <p><strong>Air Temp:</strong> {weather.air_temp}</p>
        <p><strong>Humidity:</strong> {weather.humidity}</p>
        <p><strong>Rainfall:</strong> {weather.rainfall}</p>
      </div>
    </div>
  );
}
