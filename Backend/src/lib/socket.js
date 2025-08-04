import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

// Allow CORS for Vercel frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "https://real-time-chat-app-gkh8.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO server with CORS for frontend
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://real-time-chat-app-gkh8.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store online users: { userId: socketId }
const userSocketMap = {};

// Export helper function to get socket ID by user ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket.IO event listeners
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    if (userId) {
      delete userSocketMap[userId];
    }

    // Update client-side list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
