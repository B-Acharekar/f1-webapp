"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Lap Times", href: "/lap-times" },
  { label: "Compare Laps", href: "/compare-laps" },
  { label: "Session Summary", href: "/session-summary" },
  { label: "Results", href: "/results" },
  { label: "Drivers", href: "/drivers" },
  { label: "Teams", href: "/teams" },
  { label: "Schedule", href: "/schedule" },
  { label: "Standings", href: "/standings" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-red-600 text-2xl font-extrabold tracking-widest uppercase"
          >
            F1 Insights
          </Link>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-medium transition duration-300 hover:text-red-500 group"
              >
                <span>{item.label}</span>
                <span className="block h-0.5 w-0 bg-red-500 transition-all group-hover:w-full duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black px-4 pb-4 space-y-3 animate-slide-down">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-white hover:text-red-500 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
