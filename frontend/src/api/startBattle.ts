import axios from "axios";

export const startBattle = async (
  model1: string,
  model2: string,
  topic: string,
  turns: number = 4
): Promise<any> => {
  try {
    if (!model1 || !model2) {
      throw new Error("Both models must be specified");
    }

    if (!topic) {
      throw new Error("Enter a valid topic to debate!");
    }

    const response = await axios.post(
      `${import.meta.env.VITE_CLIENT_URL}/api/battle-chat`,
      {
        model1,
        model2,
        topic,
        turns,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response || !response.data || !response.data.success) {
      throw new Error("Invalid response from server");
    }

    return response.data.data;
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
