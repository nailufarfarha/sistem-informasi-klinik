import express from "express";
import uploadFasilitas from "../controllers/fasilitas-controller.js";

const router = express.Router();

router.post("/api/v1/fasilitas", uploadFasilitas);

export default router;
