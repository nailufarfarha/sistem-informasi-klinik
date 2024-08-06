import mongoose from "mongoose";

const layananSchema = new mongoose.Schema(
  {
    image: {
      data: Buffer,
      contentType: String,
    },
    judul: {
      type: String,
      unique: true,
      required: true,
    },
    deskripsi: String,
  },
  { timestamps: true }
);

export default mongoose.model("Layanan", layananSchema);
