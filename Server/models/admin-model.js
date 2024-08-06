import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    namalengkap: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);