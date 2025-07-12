"use client";

import { useEffect, useState } from "react";
import { fetchStories } from "@/lib/api";

type Story = {
  title: string;
  link: string;
  summary: string;
  published: string;
};

export default function StoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetchStories()
      .then((res) => {
        setStories(res.data.stories || []);
      })
      .catch((err) => console.error("Failed to fetch stories", err));
  }, []);

  return (
    <section className="bg-gradient-to-b from-neutral-100 dark:from-neutral-900 to-neutral-200 dark:to-black text-black dark:text-white py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-4xl font-extrabold border-b-4 border-red-600 inline-block pb-2 uppercase tracking-wider">
          F1 Stories
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <a
              key={index}
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-300 dark:border-neutral-700 shadow-md hover:shadow-red-600/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-red-600 transition">
                {story.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                {story.summary}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 italic">
                🕒 {new Date(story.published).toLocaleString()}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
