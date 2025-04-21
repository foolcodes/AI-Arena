import axios from "axios";

export const shareBattle = async (
  topic: string,
  model1: string,
  model2: string,
  judge: string,
  rounds: Number,
  messages: Object
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_CLIENT_URL}/api/battle`,
      {
        topic,
        model1,
        model2,
        judge,
        rounds,
        messages,
      }
    );
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
