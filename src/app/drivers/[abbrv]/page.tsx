import { notFound } from "next/navigation";
import { fetchDriverByAbbrv } from "@/lib/api";
import DriverClient from "@/components/DriverClient"; // This will be your actual UI

export default async function DriverPage({ params }: { params: { abbrv: string } }) {
  const driver = await fetchDriverByAbbrv(params.abbrv.toUpperCase());

  if (!driver) return notFound();

  return <DriverClient driver={driver} />;
}
