import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const DaftarUser = async (req, res) => {
  const { namalengkap, username, password, umur, alamat, nohp } = req.body;

  let usernameUser = await User.findOne({ username: username });
  if (usernameUser) {
    return res.status(404).json({
      status: false,
      message: "Username sudah tersedia!",
    });
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const user = new User({
    namalengkap: namalengkap,
    username: username,
    password: hashPassword,
    umur: umur,
    alamat: alamat,
    nohp: nohp,
  });

  user.save();

  return res.status(201).json({
    message: "User berhasil didaftarkan!",
  });
};

export const LoginUser = async (req, res) => {
  const { username, password } = req.body;

  const datauser = await User.findOne({ username: username });

  if (datauser) {
    const passwordUser = await bcryptjs.compare(password, datauser.password);
    if (passwordUser) {
      const data = {
        id: datauser._id,
        username: datauser.username, // Tambahkan username ke dalam data token
        namalengkap: datauser.namalengkap,
        umur: datauser.umur,
        alamat: datauser.alamat,
        nohp: datauser.nohp,
      };
      const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET);

      return res.status(200).json({
        message: "berhasil",
        token: token,
        username: datauser.username, // Sertakan username dalam respons
        namalengkap: datauser.namalengkap,
        umur: datauser.umur,
        alamat: datauser.alamat,
        nohp: datauser.nohp,
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

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Memperbaharui data pengguna
export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { namalengkap, umur, alamat, nohp } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { namalengkap, umur, alamat, nohp }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
