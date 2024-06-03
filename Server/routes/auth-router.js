import express from "express";
import { DaftarUser, LoginUser } from "../controllers/auth-controller.js";

// import DaftarUser, { LoginUser } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/daftar", DaftarUser);
router.post("/login", LoginUser);

// router.get("/", (req, res) => {
//   return res.send("berhasil");
// });

export default router;
