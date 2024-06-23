import express from "express";
import cors from "cors";
import { authRoute } from "./authours/auth.js";
import { dbConnection } from "./utils/config.js";
import { userRoute } from "./authours/useer.js";
import { PostRoute } from "./authours/post.js";
import multer from "multer";

const app = express();

// Middleware
app.use(express.json());

// CORS middleware setup
app.use(cors({
  origin: 'https://fb-socialmeda-by-react.vercel.app', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent with the requests
}));

// CORS options for specific route
app.options("/auth/signup", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://fb-socialmeda-by-react.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", PostRoute);

// Database Connection
dbConnection();

// Server Setup
const port = 5000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
