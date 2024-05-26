import { Express } from "express";
import User from "../models/user.js";

export const Auth = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) {
      return res.status(404).json({ message: "Username atau Password tidak ditemukan!", user });
    }
    const userData = {
      username: user.username,
      password: user.password,
    };
    return res.status(200).json({ message: "Berhasil Login!", user: userData });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan pada server!" });
  }
};
