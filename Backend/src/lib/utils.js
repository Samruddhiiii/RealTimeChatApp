import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // ✅ prevents JS access
    secure: process.env.NODE_ENV !== "development", // ✅ ensures cookie only on HTTPS in prod
    sameSite: "none", // ✅ allows cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

