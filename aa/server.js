import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jobsRouter from "./routes/jobs.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/jobs", jobsRouter);

app.get("/", (req, res) => {
  res.send("Job Search API is running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
