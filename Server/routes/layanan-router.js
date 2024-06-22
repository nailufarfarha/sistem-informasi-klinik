import express from "express";
import { createLayanan, getLayanan, getLayananById, getLayananImage, updateLayanan, deleteLayanan } from "../controllers/layanan-controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/layanan/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow only png files
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only PNG files are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", upload.single("image"), createLayanan);
router.get("/", getLayanan);
router.get("/:id", getLayananById);
router.get("/image/:id", getLayananImage);
router.put("/:id", upload.single("image"), updateLayanan);
router.delete("/:id", deleteLayanan);

export default router;
