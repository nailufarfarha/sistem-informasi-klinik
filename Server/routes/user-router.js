import express from "express";
import { DaftarUser, LoginUser, getUser, getUserById, UpdateUser, deleteUser } from "../controllers/user-controller.js";
import { runValidation, validationDaftar, validationLogin } from "../validation/index.js";

const router = express.Router();

router.post("/daftar", validationDaftar, runValidation, DaftarUser);
router.post("/login", validationLogin, runValidation, LoginUser);
router.get("/daftar", getUser);
router.get("/daftar/:id", getUserById);
router.put("/daftar/:id", UpdateUser);
router.delete("/daftar/:id", deleteUser);

// router.get("/", (req, res) => {
//   return res.send("berhasil");
// });

export default router;
