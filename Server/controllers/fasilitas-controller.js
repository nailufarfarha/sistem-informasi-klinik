import Fasilitas from "../models/fasilitas-model.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

// Create
export const createFasilitas = async (req, res) => {
  try {
    const newFasilitas = new Fasilitas({
      keterangan: req.body.keterangan,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newFasilitas.save();
    res.status(201).json({ message: "Fasilitas created successfully" });
  } catch (error) {
    console.error("Error creating fasilitas:", error); // Log error
    res.status(500).json({ message: "Error creating fasilitas", error });
  }
};

// Read All
export const getFasilitas = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.find();
    res.status(200).json(fasilitas);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  try {
    const isValidObjectId = ObjectId.isValid(req.params._id);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const updatedData = {
      keterangan: req.body.keterangan,
    };

    if (req.file) {
      updatedData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const fasilitas = await Fasilitas.findOneAndUpdate({ _id: ObjectId(req.params.id) }, updatedData, { new: true });

    if (!fasilitas) {
      return res.status(404).json({ message: "Fasilitas not found" });
    }

    res.status(200).json({ message: "Fasilitas updated successfully" });
  } catch (error) {
    console.error("Error updating fasilitas:", error); // Log error
    res.status(500).json({ message: "Error updating fasilitas", error });
  }
};

// Delete

export const deleteFasilitas = async (req, res) => {
  console.log("Received id:", req.params._id); // Tambahkan log ini
  try {
    const isValidObjectId = ObjectId.isValid(req.params._id);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const fasilitas = await Fasilitas.findByIdAndDelete(req.params._id);
    if (!fasilitas) {
      return res.status(404).json({ message: "Fasilitas not found" });
    }

    res.status(200).json({ message: "Fasilitas deleted successfully" });
  } catch (error) {
    console.error("Error deleting fasilitas:", error); // Log error
    res.status(500).json({ message: "Error deleting fasilitas", error });
  }
};
//   try {
//     const fasilitas = await Fasilitas.findByIdAndDelete(req.params.id);
//     if (!fasilitas) {
//       return res.status(404).json({ message: "Fasilitas not found" });
//     }
//     res.status(200).json({ message: "Fasilitas deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting fasilitas:", error);
//     res.status(500).json({ message: "Error deleting fasilitas", error });
//   }
// };
