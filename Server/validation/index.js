import { check, validationResult } from "express-validator";

export const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: false,
      message: errors.array()[0].msg,
    });
  }
  next();
};

export const validationDaftar = [
  check("namalengkap", "Nama tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Nama tidak boleh terlalu pendek."),
  check("username", "Username tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Username tidak boleh terlalu pendek."),
  check("password", "Password tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Password minimal 6 characters."),
];

export const validationLogin = [check("username", "Username tidak boleh kosong").notEmpty(), check("password", "Password tidak boleh kosong").notEmpty()];
