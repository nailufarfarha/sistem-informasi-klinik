import Jadwal from "../models/jadwal-model.js";

// Create a new jadwal
export const createJadwal = async (req, res) => {
  const { layanan, dokter, hari, jam } = req.body;

  const jadwal = new Jadwal({
    layanan: layanan,
    dokter: dokter,
    hari: hari,
    jam: jam,
  });

  try {
    const savedJadwal = await jadwal.save();
    res.status(201).json(savedJadwal);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Get all jadwals
export const getAllJadwals = async (req, res) => {
  try {
    const jadwals = await Jadwal.find();
    res.status(200).json(jadwals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a jadwal by ID
export const getJadwalById = async (req, res) => {
  try {
    const jadwal = await Jadwal.findById(req.params.id);
    if (jadwal == null) {
      return res.status(404).json({ message: "Jadwal not found" });
    }
    res.status(200).json(jadwal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a jadwal by ID
export const updateJadwal = async (req, res) => {
  const { id } = req.params;
  const { layanan, dokter, hari, jam } = req.body;

  try {
    const updatedJadwal = await Jadwal.findByIdAndUpdate(id, { layanan, dokter, hari, jam }, { new: true });
    res.json(updatedJadwal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  // try {
  //   const jadwal = await Jadwal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  //   if (jadwal == null) {
  //     return res.status(404).json({ message: "Jadwal not found" });
  //   }
  //   res.status(200).json(jadwal);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
};

// Delete a jadwal by ID
export const deleteJadwal = async (req, res) => {
  const { id } = req.params;

  try {
    await Jadwal.findByIdAndDelete(id);
    res.json({ message: "Jadwal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // try {
  //   const jadwal = await Jadwal.findByIdAndDelete(req.params.id);
  //   if (jadwal == null) {
  //     return res.status(404).json({ message: "Jadwal not found" });
  //   }
  //   res.status(200).json({ message: "Jadwal deleted" });
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
};

// // create
// export const createJadwal = async (req, res) => {
//   try {
//     const { layanan, dokter, hari, jam } = req.body;
//     const jadwalBaru = new Jadwal({ layanan, dokter, hari, jam });
//     const jadwal = await jadwalBaru.save();
//     res.status(201).json(jadwal);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // getAll
// export const getAllJadwal = async (req, res) => {
//   try {
//     const jadwal = await Jadwal.find();
//     res.status(200).json(jadwal);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // update
// export const updateJadwal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { layanan, dokter, hari, jam } = req.body;
//     const jadwal = await Jadwal.findByIdAndUpdate(id, { layanan, dokter, hari, jam }, { new: true });
//     if (!jadwal) {
//       return res.status(404).json({ message: "Jadwal tidak ditemukan" });
//     }
//     res.status(200).json(jadwal);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // delete
// export const deleteJadwal = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const jadwal = await Jadwal.findByIdAndDelete(id);
//     if (!jadwal) {
//       return res.status(404).json({ message: "Jadwal tidak ditemukan" });
//     }
//     res.status(200).json({ message: "Jadwal berhasil dihapus" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
