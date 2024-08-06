import Admin from "../models/admin-model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const DaftarAdmin = async (req, res) => {
  const { namalengkap, username, password } = req.body;

  let usernameAdmin = await Admin.findOne({ username: username });
  if (usernameAdmin) {
    return res.status(404).json({
      status: false,
      message: "Username sudah tersedia!",
    });
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const admin = new Admin({
    namalengkap: namalengkap,
    username: username,
    password: hashPassword,
  });

  admin.save();

  return res.status(201).json({
    message: "Admin berhasil didaftarkan!",
  });
};

export const LoginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const dataadmin = await Admin.findOne({ username: username });

  if (dataadmin) {
    const passwordAdmin = await bcryptjs.compare(password, dataadmin.password);
    if (passwordAdmin) {
      const data = {
        id: dataadmin._id,
      };
      const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET);

      return res.status(200).json({
        message: "berhasil",
        token: token,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Password salah!",
      });
    }
  } else {
    return res.status(404).json({
      status: false,
      message: "Username tidak terdaftar!",
    });
  }
};
