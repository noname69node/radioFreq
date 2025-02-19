import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import frequencyRoutes from "./routes/frequency.routes";
import authRoutes from "./routes/admin";
// import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Frequency routes initialized");
});
app.use("/api/frequencies", frequencyRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/auth", authRoutes);

export default app;
