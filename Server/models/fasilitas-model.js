import mongoose from "mongoose";

const fasilitasSchema = new mongoose.Schema(
  {
    keterangan: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Fasilitas", fasilitasSchema);
