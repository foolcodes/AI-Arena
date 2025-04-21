import axios from "axios";

export const fetchBattle = async (id: string | null) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/battle/${id}`);

    if (!response || !response.data || !response.data.success) {
      throw new Error("Invalid response from server");
    }
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
