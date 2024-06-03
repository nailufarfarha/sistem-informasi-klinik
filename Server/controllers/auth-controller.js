import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const DaftarUser = async (req, res) => {
  const { namalengkap, username, password } = req.body;

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
      };
      const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET);

      return res.status(200).json({
        message: "berhasil",
        token: token,
        // username: username,
        // password: password,
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

// export default DaftarUser;
// export { LoginUser };
