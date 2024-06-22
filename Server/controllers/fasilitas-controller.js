import Fasilitas from "../models/fasilitas-model.js";
import fs from "fs";

// Create
export const createFasilitas = async (req, res) => {
  try {
    const img = fs.readFileSync(req.file.path);
    const encode_image = img.toString("base64");

    const fasilitas = new Fasilitas({
      keterangan: req.body.keterangan,
      image: {
        data: Buffer.from(encode_image, "base64"),
        contentType: req.file.mimetype,
      },
    });

    await fasilitas.save();

    res.status(201).json(fasilitas);
    // console.log("Saved fasilitas:", fasilitas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Image
export const getFasilitasImage = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.findById(req.params.id);
    if (!fasilitas || !fasilitas.image.data) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.contentType(fasilitas.image.contentType);
    res.send(fasilitas.image.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read All
export const getFasilitas = async (req, res) => {
  try {
    const fasilitass = await Fasilitas.find();
    res.status(200).json(fasilitass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read One
export const getFasilitasById = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.findById(req.params.id);
    if (!fasilitas) {
      return res.status(404).json({ message: "Fasilitas not found" });
    }
    res.status(200).json(fasilitas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const updateFasilitas = async (req, res) => {
  const { id } = req.params;
  const { image, keterangan } = req.body;

  try {
    const updatedFasilitas = await Fasilitas.findByIdAndUpdate(id, { image, keterangan }, { new: true });
    res.json(updatedFasilitas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete

export const deleteFasilitas = async (req, res) => {
  const { id } = req.params;

  try {
    await Fasilitas.findByIdAndDelete(id);
    res.json({ message: "Fasilitas deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
