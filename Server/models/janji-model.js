import mongoose from "mongoose";

const janjiSchema = new mongoose.Schema(
  {
    layanan: {
      type: String,
    },
    dokter: {
      type: String,
    },
    hari: {
      type: String,
    },
    jam: {
      type: String,
    },
    namalengkap: {
      type: String,
      unique: true,
      required: true,
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
  { timestamps: true }
);

export default mongoose.model("Janji", janjiSchema);
