"use client"

import { useState } from "react";
import { addMood } from "@/lib/api";

export default function HeroSection({ onEnter }: { onEnter?: () => void }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");

  const handleSave = async () => {
    if (!selectedMood) {
      alert("Please select a mood!");
      return;
    }

    try {
      await addMood(selectedMood, note);
      alert("Mood added successfully!");
      setSelectedMood("");
      setNote("");
      onEnter?.(); // scroll to dashboard if needed
    } catch (err) {
      console.error(err);
      alert("Failed to add mood");
    }
  };

  return (
    <section className="p-6 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl text-center">
      <h1 className="text-3xl font-bold mb-4">How are you feeling today?</h1>

      {/* Mood Selection */}
      <div className="flex justify-center gap-4 mb-4">
        {["😊", "😔", "😡", "😴", "😱"].map((mood) => (
          <button
            key={mood}
            className={`text-3xl p-2 rounded-full border-2 ${
              selectedMood === mood ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setSelectedMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Note input */}
      <textarea
        className="w-full max-w-md p-2 rounded-md border border-gray-300 mb-4"
        placeholder="Write a note (optional)..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
        onClick={handleSave}
      >
        Save Mood
      </button>
    </section>
  );
}