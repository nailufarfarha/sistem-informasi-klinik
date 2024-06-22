import { check, validationResult } from "express-validator";

// ini buat apa ya lupa
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

// ini untuk daftar
export const validationDaftar = [
  check("namalengkap", "Nama tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Nama tidak boleh terlalu pendek."),
  check("username", "Username tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Username tidak boleh terlalu pendek."),
  check("password", "Password tidak boleh kosong").notEmpty().isLength({ min: 6 }).withMessage("Password minimal 6 characters."),
];

// ini untuk login
export const validationLogin = [check("username", "Username tidak boleh kosong").notEmpty(), check("password", "Password tidak boleh kosong").notEmpty()];

// ini untuk add jadwal
export const validationJadwal = [
  check("layanan", "Layanan tidak boleh kosong").notEmpty(),
  check("dokter", "Nama dokter tidak boleh kosong").notEmpty(),
  check("hari", "Hari harus dipilih!").notEmpty(),
  check("jam", "Jam harus dipilih!").notEmpty(),
];

// export const validatationFasilitas = [
//   check("image").notEmpty().withMessage("Gambar harus diisi"),
//   check("keterangan").notEmpty().withMessage("Keterangan harus diisi"),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];
