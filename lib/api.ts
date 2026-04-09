const BASE_URL = "https://mood-tracker-backend-ok3r.onrender.com/api/moods";

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

  await fetchMoods();

  if (!res.ok) {
    throw new Error("Failed to save mood");
  }

  return res.json();
}