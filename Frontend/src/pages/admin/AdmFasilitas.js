// useRef menyimpan nilai yang bisa berubah tanpa menyebabkan komponen dirender ulang.
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

function AdmFasilitas() {
  const [keterangan, setKeterangan] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  // false: nilai awal state yang menunjukkan bahwa saat ini tidak dalam mode edit.
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fasilitass, setFasilitass] = useState([]);
  const fileInputRef = useRef(null); //fileInputRef: menyimpan referensi ke elemen input file, memungkinkan untuk mengakses elemen DOM secara langsung.
  const [show, setShow] = useState(true);

  // get data dari server
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/fasilitas")
      .then((response) => {
        setFasilitass(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // get token di local, jika tidak ada token akan direct ke halaman admin
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  console.log("token", token);

  // untuk image
  const onChangeImage = (e) => {
    // setImage(e.target.value);
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // keterangan
  const onChangeKeterangan = (e) => {
    setKeterangan(e.target.value);
  };

  // memproses tombol sumbit atau create data
  const handleCreate = async () => {
    if (!image) {
      setMessage("Gambar harus dipilih");
      return;
    }

    if (!keterangan) {
      setMessage("Keterangan harus diisi");
      return;
    }

    const data = new FormData();
    data.append("image", image);
    data.append("keterangan", keterangan);

    axios
      .post("http://localhost:8081/api/v1/fasilitas", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFasilitass([...fasilitass, response.data]);
        resetForm();

        setMessage("Fasilitas berhasil ditambahkan!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    if (!image) {
      setMessage("Gambar harus dipilih");
      return;
    }

    if (!keterangan) {
      setMessage("Keterangan harus diisi");
      return;
    }

    const data = new FormData();
    data.append("image", image);
    data.append("keterangan", keterangan);

    axios
      .put(`http://localhost:8081/api/v1/fasilitas/${currentId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          setFasilitass((fasilitass) => fasilitass.map((item) => (item._id === currentId ? { ...item, image: URL.createObjectURL(image), keterangan: keterangan } : item)));
          setIsEditing(false);
          resetForm();

          setMessage("Fasilitas Berhasil di Perbaharui!");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    if (isEditing && currentId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleEdit = (index) => {
    if (index >= 0 && index < fasilitass.length) {
      setIsEditing(true);
      setKeterangan(fasilitass[index].keterangan);
      setCurrentId(fasilitass[index]._id);
      setImagePreview(`http://localhost:8081/api/v1/fasilitas/image/${fasilitass[index]._id}`);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } else {
      console.error("Invalid index:", index);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/v1/fasilitas/${id}`)
      .then(() => {
        setFasilitass((prevData) => prevData.filter((item) => item._id !== id));

        setMessage("Fasilitas berhasil dihapus!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting fasilitas", error);
        setMessage(error.response?.data?.message || "Error deleting fasilitas");
      });
  };

  // untuk reset atau mengosongkan form atau input
  const resetForm = () => {
    setKeterangan("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setMessage("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    resetForm();
  };

  const AlertMessage = ({ message }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }, []);
  };

  return (
    <div>
      <Sidebar />
      <Profile />
      <div className="content-fasilitas">
        <div className="tambah-fasilitas">
          <h4>{isEditing ? "Edit Fasilitas" : "Tambah Fasilitas"}</h4>

          {message && show && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          <div className="tambah-form">
            <label>Gambar</label>
            <input type="file" name="image" onChange={onChangeImage} ref={fileInputRef} />
            {imagePreview && <img src={imagePreview} alt="Preview" width="100" />}
            <label>Keterangan</label>
            <input type="text" name="keterangan" value={keterangan} onChange={onChangeKeterangan} />
            <div className="form-buttons">
              <Button type="submit" variant="success" onClick={handleSubmit}>
                {isEditing ? "Update" : "Submit"}
              </Button>
              <Button type="button" variant="danger" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>

        <div className="content-fasilitas-data">
          <Table bordered>
            <thead>
              <tr>
                <th>No</th>
                <th>Gambar</th>
                <th>Keterangan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fasilitass.map((fasilitas, index) => (
                <tr key={fasilitas._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`http://localhost:8081/api/v1/fasilitas/image/${fasilitas._id}`} alt="gambar" style={{ width: "auto", height: "100px" }} />
                  </td>
                  <td>{fasilitas.keterangan}</td>
                  <td>
                    <Button type="button" variant="warning" onClick={() => handleEdit(index)} style={{ color: "white", marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button type="button" variant="danger" onClick={() => handleDelete(fasilitas._id)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdmFasilitas;
