import mongoose from "mongoose";

const jadwalSchema = new mongoose.Schema(
  {
    layanan: {
      type: String,
    },
    dokter: {
      type: String,
    },
    hari: {
      type: String,
      // enum: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    },
    jam: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Jadwal", jadwalSchema);
