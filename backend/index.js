import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectDB } from "./db/connectDB.js";
import battleRoutes from "./routes/battle.route.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/api", battleRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
