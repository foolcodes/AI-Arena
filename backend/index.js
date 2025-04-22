import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import battleRoutes from "./routes/battle.route.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", battleRoutes);
app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});
export default app;
