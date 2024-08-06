import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import adminRouter from "./routes/admin-router.js";
import userRouter from "./routes/user-router.js";
import fasilitasRouter from "./routes/fasilitas-router.js";
import jadwalRouter from "./routes/jadwal-router.js";
import layananRouter from "./routes/layanan-router.js";
import janjiRouter from "./routes/janji-router.js";

const app = express();
// const PORT = process.env.PORT || 8081;
const PORT = 8081;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/", adminRouter);
app.use("/", userRouter);
app.use("/api/v1/fasilitas", fasilitasRouter);
app.use("/api/v1/jadwal", jadwalRouter);
app.use("/api/v1/layanan", layananRouter);
app.use("/api/v1/janji", janjiRouter);

mongoose
  .connect("mongodb+srv://nailufarfrh:gqB1tIEoXmVh8XqN@cluster0.8tsgs3v.mongodb.net/db-fatimah?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port: ", PORT);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB: ", err);
  });
