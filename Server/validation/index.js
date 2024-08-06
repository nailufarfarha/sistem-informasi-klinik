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

// daftar
export const validationDaftar = [
  check("namalengkap", "Nama tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Nama tidak boleh terlalu pendek."),
  check("username", "Username tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Username tidak boleh terlalu pendek."),
  check("password", "Password tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Password minimal 6 karakter."),
  check("umur", "Umur tidak boleh kosong").notEmpty().isInt().withMessage("Umur harus berupa angka."),
  check("alamat", "Alamat tidak boleh kosong").notEmpty(),
  check("nohp", "Nomor hp tidak boleh kosong")
    .notEmpty()
    .matches(/^\d{10,}$/)
    .withMessage("Nomor hp minimal 10 digit dan harus berupa angka."),
];

// login
export const validationLogin = [check("username", "Username tidak boleh kosong").notEmpty(), check("password", "Password tidak boleh kosong").notEmpty()];
