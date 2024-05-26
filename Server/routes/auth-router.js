import express from "express";
import { Auth } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/login", Auth);

export default router;
