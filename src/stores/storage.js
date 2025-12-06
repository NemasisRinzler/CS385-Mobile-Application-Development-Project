/* Notes for Chris:
Aight, genuinly idk what supabase is doing here:

Each function takes an object called token for auth, and does fetch calls to these endpoints.
The responses are expected to be JSON objects with specific fields.

the API_BASE is set to the supabase project URl.
From there, it calls two endpoints:
- /user/progress : to get and save user progress
- /user/profile : to get user profile info like username and xp

Go see AccountPage.jsx once your done here and the goose chase will be over.
*/

const API_BASE = "https://neynsjohdechnkjlureu.supabase.co";

export async function getProgress(token) {
  try {
    const response = await fetch(`${API_BASE}/user/progress`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    
    if (!response.ok) throw new Error("Failed to fetch progress");
    
    const data = await response.json();
    // Expected response: { completed: [1, 2], xp: 50 }
    return data;
  } catch (error) {
    console.error("Get progress error:", error);
    return null;
  }
}

export async function saveProgress(token, progressData) {
  try {
    const response = await fetch(`${API_BASE}/user/progress`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(progressData),
    });
    
    if (!response.ok) throw new Error("Failed to save progress");
    
    return await response.json();
  } catch (error) {
    console.error("Save progress error:", error);
    return null;
  }
}

export async function getUserProfile(token) {
  try {
    const response = await fetch(`${API_BASE}/user/profile`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    
    if (!response.ok) throw new Error("Failed to fetch profile");
    
    const data = await response.json();
    // Expected response: { username, xp, level, badges }
    return data;
  } catch (error) {
    console.error("Get profile error:", error);
    return null;
  }
}