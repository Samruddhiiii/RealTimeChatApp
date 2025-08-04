import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://realtimechatapp-2-u3j7.onrender.com/api",
  withCredentials: true,
});
