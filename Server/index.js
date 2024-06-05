import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth-router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
// const PORT = process.env.PORT || 8081;
const PORT = 8081;
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use("/", authRouter);

mongoose
  .connect("mongodb+srv://nailufarfrh:gqB1tIEoXmVh8XqN@cluster0.8tsgs3v.mongodb.net/klinik-fatimah?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port: ", PORT);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB: ", err);
  });
