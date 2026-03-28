const BASE_URL = "http://localhost:8080/api/moods";

// Fetch all moods
export async function getMoods() {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch moods");
  }

  return res.json();
}

// Add a new mood
export async function addMood(mood: string, note: string) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mood, note }),
  });

  if (!res.ok) {
    throw new Error("Failed to save mood");
  }

  return res.json();
}