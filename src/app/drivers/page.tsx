"use client";

import { motion } from "framer-motion";
import DriverSection from "@/components/DriverSection";

export default function DriversPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center text-red-500 tracking-widest"
        >
          Formula 1 Drivers
        </motion.h1>

        <DriverSection />
      </div>
    </section>
  );
}
