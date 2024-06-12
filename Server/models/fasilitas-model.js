import mongoose from "mongoose";

const fasilitasSchema = new mongoose.Schema(
  {
    keterangan: String,
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Fasilitas", fasilitasSchema);
