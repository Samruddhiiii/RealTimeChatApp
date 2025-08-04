import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// ✅ Fix 1: Allow large payloads (for image upload)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Fix 2: Enable cookies and allow frontend access from localhost and Vercel
const allowedOrigins = [
  "http://localhost:5173",
  "https://real-time-chat-app-gkh8.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Start server after DB is connected
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

