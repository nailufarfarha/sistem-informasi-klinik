import express from "express";
import { createFasilitas, getFasilitas, getFasilitasById, updateFasilitas, deleteFasilitas } from "../controllers/fasilitas-controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/fasilitas");
  },
  filename: function (req, file, cb) {
    cb(null, path.parse(file.originalname).name + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), createFasilitas);
router.get("/", getFasilitas);
router.get("/:id", getFasilitasById);
router.patch("/:id", upload.single("image"), updateFasilitas);
router.delete("/:id", deleteFasilitas);

export default router;
