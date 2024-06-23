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
app.use(cors({  
  origin: 'https://fb-socialmeda-by-react-t6jt.vercel.app', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent with the requests
}));
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//   next();
// });

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
