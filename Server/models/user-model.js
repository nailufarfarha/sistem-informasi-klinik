import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    namalengkap: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    umur: {
      type: Number,
    },
    alamat: {
      type: String,
    },
    nohp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
