import Fasilitas from "../models/fasilitas-model.js";
import multer from "multer";
import path from "path";

// Setup Multer to save files to the server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/fasilitas");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage }).single("image");

export const uploadFasilitas = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ message: "Error uploading file." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const newFasilitas = new Fasilitas();
    newFasilitas.keterangan = req.body.keterangan;
    newFasilitas.img.data = req.file.path;
    newFasilitas.img.contentType = req.file.mimetype;

    newFasilitas
      .save()
      .then(() => res.status(201).json({ message: "Image uploaded successfully." }))
      .catch((err) => res.status(500).json({ message: "Error saving image.", error: err }));
  });
};

export default uploadFasilitas;
