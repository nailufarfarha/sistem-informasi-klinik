import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth-router.js";
import cors from "cors";
import path from "path";

const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Middlewares;
app.get("/api/v1/auth", authRouter);

// Use import.meta.url to get the current module's URL
const __filename = new URL(import.meta.url).pathname;
// Use path.dirname to extract the directory name
const __dirname = path.dirname(__filename);

// connect mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port: ", PORT);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB: ", err);
  });
