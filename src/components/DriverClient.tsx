"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Biography = {
  dob: string;
  pob: string;
  info: string;
  quote: string;
  hisimage: string;
  carimage: string;
};

type Driver = {
  name: string;
  team: string;
  number: string;
  abbrv: string;
  nationality: string;
  image: string;
  biography: Biography;
};

const carImages = (bio: Biography) => [bio.carimage, bio.hisimage];

export default function DriverClient({ driver }: { driver: Driver }) {
  const { name, team, number, nationality, image, biography } = driver;
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + carImages(biography).length) % carImages(biography).length);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % carImages(biography).length);
  };

  const flags: Record<string, string> = {
    "United Kingdom": "🇬🇧",
    "Germany": "🇩🇪",
    "Spain": "🇪🇸",
    "France": "🇫🇷",
    "Japan": "🇯🇵",
    // Add more flags as needed
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-900 to-black text-white py-16 px-4 sm:px-8 min-h-screen overflow-hidden">
      
      {/* Team Watermark */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-[12rem] font-bold text-red-900 opacity-5 select-none pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        {team.toUpperCase()}
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-10 relative">

          {/* Number Badge */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-5 -left-5 md:static md:top-auto md:left-auto bg-red-600 text-black font-bold text-3xl w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-20"
          >
            #{number}
          </motion.div>

          {/* Driver Image */}
          <motion.div
            className="relative rounded-full border-4 border-red-600 shadow-2xl w-64 h-64"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={image} alt={name} className="rounded-full w-full h-full object-cover" />
            <div className="absolute inset-0 rounded-full bg-red-500/10 blur-2xl z-[-1]" />
          </motion.div>

          {/* Info */}
          <div className="text-center md:text-left space-y-2">
            <motion.h1
              whileHover={{ letterSpacing: "0.1em", color: "#ef4444" }}
              transition={{ duration: 0.3 }}
              className="text-5xl font-extrabold text-white"
            >
              {name}
            </motion.h1>
            <p className="text-xl text-gray-300">{team}</p>
            <p className="text-base text-gray-400">
              {flags[nationality] || ""} {nationality}
            </p>
            <p className="text-sm text-gray-500">
              Born: {biography.dob} in {biography.pob}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="text-lg leading-relaxed text-gray-300 max-w-4xl mx-auto px-2">
          {biography.info
            .split(/\.\s+/)
            .filter(Boolean)
            .map((sentence, idx) => (
              <motion.p
                key={idx}
                className="mb-4 text-justify"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {sentence.trim()}.
              </motion.p>
            ))}
          <motion.blockquote
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="mt-6 border-l-4 border-red-600 pl-4 text-xl italic font-medium text-red-400"
          >
            “{biography.quote}”
          </motion.blockquote>
        </div>

        {/* Carousel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-red-500 tracking-wide uppercase">Driver Car Gallery</h2>
          <div className="relative overflow-hidden rounded-xl shadow-2xl group">
            <motion.img
              key={currentImage}
              src={carImages(biography)[currentImage]}
              alt="Car"
              className="w-full h-[22rem] object-cover transition-all duration-500"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
            />
            {/* Left Arrow */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={handlePrev}
                className="text-white bg-red-500/60 hover:bg-red-500 p-2 rounded-full ml-2 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            {/* Right Arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={handleNext}
                className="text-white bg-red-500/60 hover:bg-red-500 p-2 rounded-full mr-2 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
