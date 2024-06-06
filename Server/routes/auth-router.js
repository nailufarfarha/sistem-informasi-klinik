import express from "express";
import { DaftarUser, LoginUser } from "../controllers/auth-controller.js";
import { runValidation, validationDaftar, validationLogin } from "../validation/index.js";

const router = express.Router();

router.post("/daftar", validationDaftar, runValidation, DaftarUser);
router.post("/login", validationLogin, runValidation, LoginUser);

// router.get("/", (req, res) => {
//   return res.send("berhasil");
// });

export default router;
