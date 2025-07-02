import { API_URL } from "../constants/constants";

export const fetchUser = async () => {
  try {
    const res = await fetch(`${API_URL}/protected`, {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user || null;
  } catch (error) {
    console.error("Error in fetchUser:", error);
    return null;
  }
};