import express from "express";
import { createJanji, getAllJanjis, getJanjiById, getJanjis, deleteJanji } from "../controllers/janji-controller.js";

const router = express.Router();

router.post("/", createJanji);
router.get("/", getAllJanjis);
router.get("/", getJanjis);
router.get("/:id", getJanjiById);
router.delete("/:id", deleteJanji);

export default router;
