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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
