import axios from "./axiosConfig";

// Call this before checking protected routes
export const isAuthenticated = async () => {
  try {
    const res = await axios.get("/api/v1/auth/check");
    return res.status === 200;
  } catch {
    return false;
  }
};

// src/Utils/auth.js
export const logout = async () => {
  try {
    await axios.post("/api/v1/auth/logout");
    return true; // ✅ success ke case mein true return kar
  } catch (err) {
    console.error("Logout error", err);
    return false; // ❌ fail ke case mein false return kar
  }
};

