import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import interviewRoutes from "./src/routes/interview.routes.js";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-resume-analyzer-1-vuzo.onrender.com",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

export default app;
