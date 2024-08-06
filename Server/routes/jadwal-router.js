import express from "express";
import { createJadwal, getAllJadwals, updateJadwal, deleteJadwal, getJadwalById } from "../controllers/jadwal-controller.js";

const router = express.Router();

router.post("/", createJadwal);
router.get("/", getAllJadwals);
router.get("/:id", getJadwalById);
router.put("/:id", updateJadwal);
router.delete("/:id", deleteJadwal);

export default router;
