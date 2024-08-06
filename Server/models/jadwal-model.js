import mongoose from "mongoose";

const jadwalSchema = new mongoose.Schema(
  {
    layanan: {
      type: String,
      unique: true,
      required: true,
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
  },
  { timestamps: true }
);

export default mongoose.model("Jadwal", jadwalSchema);
