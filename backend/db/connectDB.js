import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("<ongo Db connected:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting DB", error.message);
    process.exit(1);
  }
};
