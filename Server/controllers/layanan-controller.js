import Layanan from "../models/layanan-model.js";
import fs from "fs";

// Create
export const createLayanan = async (req, res) => {
  try {
    const img = fs.readFileSync(req.file.path);
    const encode_image = img.toString("base64");

    const layanan = new Layanan({
      image: {
        data: Buffer.from(encode_image, "base64"),
        contentType: req.file.mimetype,
      },
      judul: req.body.judul,
      deskripsi: req.body.deskripsi,
    });

    await layanan.save();

    res.status(201).json(layanan);
    // console.log("Saved layanan:", layanan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Image
export const getLayananImage = async (req, res) => {
  try {
    const layanan = await Layanan.findById(req.params.id);
    if (!layanan || !layanan.image.data) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.contentType(layanan.image.contentType);
    res.send(layanan.image.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read All
export const getLayanan = async (req, res) => {
  try {
    const layanans = await Layanan.find();
    res.status(200).json(layanans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read One
export const getLayananById = async (req, res) => {
  try {
    const layanan = await Layanan.findById(req.params.id);
    if (!layanan) {
      return res.status(404).json({ message: "layanan not found" });
    }
    res.status(200).json(layanan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateLayanan = async (req, res) => {
  const { id } = req.params;
  const { image, judul, deskripsi } = req.body;

  try {
    const updatedLayanan = await Layanan.findByIdAndUpdate(id, { image, judul, deskripsi }, { new: true });
    res.json(updatedLayanan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
export const deleteLayanan = async (req, res) => {
  const { id } = req.params;

  try {
    await Layanan.findByIdAndDelete(id);
    res.json({ message: "Layanan deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
