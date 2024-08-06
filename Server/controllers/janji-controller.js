import Janji from "../models/janji-model.js";

// create janji
export const createJanji = async (req, res) => {
  const { layanan, dokter, hari, jam, namalengkap, umur, alamat, nohp } = req.body;

  const janji = new Janji({
    layanan: layanan,
    dokter: dokter,
    hari: hari,
    jam: jam,
    namalengkap: namalengkap,
    umur: umur,
    alamat: alamat,
    nohp: nohp,
  });

  try {
    const savedJanji = await janji.save();
    res.status(201).json(savedJanji);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// get all
export const getAllJanjis = async (req, res) => {
  try {
    const janjis = await Janji.find();
    res.status(200).json(janjis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  janji temu berdasarkan username
export const getJanjis = (req, res) => {
  const namalengkap = req.query.namalengkap;

  Janji.find({ namalengkap: namalengkap })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// janji by id
export const getJanjiById = async (req, res) => {
  try {
    const janji = await Janji.findById(req.params.id);
    if (!janji) {
      return res.status(404).json({ message: "Jadwal not found" });
    }
    res.status(200).json(janji);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete
export const deleteJanji = async (req, res) => {
  const { id } = req.params;

  try {
    await Janji.findByIdAndDelete(id);
    res.json({ message: "Janji deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
