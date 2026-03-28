"use client"

import { useEffect, useState } from "react";
import { getMoods, MoodEntry } from "@/lib/api";

export default function MoodHistory() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const data = await getMoods();
        setEntries(data);
      } catch (err) {
        console.error("Failed to fetch moods", err);
      }
    };

    fetchMoods();
  }, []);

  return (
    <section className="bg-white shadow-md p-4 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Mood History</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500">No moods logged yet.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <p className="text-xl">{entry.mood}</p>
              {entry.note && <p className="text-gray-600">{entry.note}</p>}
              <p className="text-xs text-gray-400">
                {new Date(entry.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}