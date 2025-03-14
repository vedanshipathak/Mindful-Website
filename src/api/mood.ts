const API_URL = "http://localhost:5000/api/mood";

// Sync moods from localStorage to MongoDB
export const syncMoodsToBackend = async (moodEntries: any[]) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/bulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ moodEntries }),
  });

  return response.json();
};

// Fetch moods from MongoDB to store in localStorage
export const syncMoodsFromBackend = async () => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}/sync`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

// Delete all moods from MongoDB (for resetting localStorage)
export const clearMoodsInBackend = async () => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
