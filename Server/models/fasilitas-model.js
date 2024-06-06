import mongoose from "mongoose";

const fasilitasSchema = new mongoose.Schema(
  {
    keterangan: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Fasilitas", fasilitasSchema);
