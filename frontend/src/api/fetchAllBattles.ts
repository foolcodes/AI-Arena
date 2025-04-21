import axios from "axios";

export const fetchAllBattles = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_CLIENT_URL}/api/all-battles`
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Server error:", error.response.data);
      throw new Error(error.response.data.error || "Server error occurred");
    } else if (error.request) {
      console.error("Network error:", error.request);
      throw new Error("Network error. Please check your connection.");
    } else {
      console.error("Request error:", error.message);
      throw error;
    }
  }
};
