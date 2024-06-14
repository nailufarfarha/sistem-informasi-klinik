import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth-router.js";
import fasilitasRouter from "./routes/fasilitas-router.js";
import jadwalRouter from "./routes/jadwal-router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
// const PORT = process.env.PORT || 8081;
const PORT = 8081;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/", authRouter);
app.use("/api/v1/fasilitas", fasilitasRouter);
app.use("/api/v1/jadwal", jadwalRouter);

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
