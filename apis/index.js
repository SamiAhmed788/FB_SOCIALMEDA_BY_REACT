import express from "express";
import cors from "cors";
import { authRoute } from "./authours/auth.js";
import { dbConnection } from "./utils/config.js";
import { userRoute } from "./authours/useer.js";
import { PostRoute } from "./authours/post.js";
import multer from "multer";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imagas");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

// Routes
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", PostRoute);

// File Upload Route
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Database Connection
dbConnection();

// Server Setup
const port = 5000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});