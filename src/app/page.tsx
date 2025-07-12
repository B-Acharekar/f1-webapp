import DriverSection from "@/components/DriverSection";
import HeroSection from "@/components/HeroSection";
import StoriesSection from "@/components/StoriesSection";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">

      <HeroSection />

      {/* Stories Section (F1 News) */}
      <StoriesSection />

      <DriverSection />

    </div>
  );
}
