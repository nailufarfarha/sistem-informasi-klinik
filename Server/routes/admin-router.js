import express from "express";
import { DaftarAdmin, LoginAdmin } from "../controllers/admin-controller.js";
import { runValidation, validationDaftar, validationLogin } from "../validation/index.js";

const router = express.Router();

router.post("/admin/daftar", validationDaftar, runValidation, DaftarAdmin);
router.post("/admin/login", validationLogin, runValidation, LoginAdmin);

// router.get("/", (req, res) => {
//   return res.send("berhasil");
// });

export default router;
