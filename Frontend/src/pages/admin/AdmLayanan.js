import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

function AdmLayanan() {
  const [image, setImage] = useState("");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [layanan, setLayanan] = useState([]);
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(true);

  // get data dari server
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/layanan")
      .then((response) => {
        setLayanan(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // untuk image
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // keterangan
  const onChangeJudul = (e) => {
    setJudul(e.target.value);
  };

  const onChangeDeskripsi = (e) => {
    setDeskripsi(e.target.value);
  };

  // memproses tombol sumbit atau create data
  const handleCreate = async () => {
    const data = new FormData();
    data.append("image", image);
    data.append("judul", judul);
    data.append("deskripsi", deskripsi);

    axios
      .post("http://localhost:8081/api/v1/layanan", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLayanan([...layanan, response.data]);
        resetForm();

        setMessage("Layanan berhasil ditambahkan!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    const data = new FormData();
    data.append("image", image);
    data.append("judul", judul);
    data.append("deskripsi", deskripsi);

    axios
      .put(`http://localhost:8081/api/v1/layanan/${currentId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          setLayanan((layanan) => layanan.map((item) => (item._id === currentId ? { ...item, image: URL.createObjectURL(image), judul: judul, deskripsi: deskripsi } : item)));
          setIsEditing(false);
          resetForm();

          setMessage("Layanan Berhasil di Perbaharui!");
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
    if (index >= 0 && index < layanan.length) {
      setIsEditing(true);
      setJudul(layanan[index].judul);
      setDeskripsi(layanan[index].deskripsi);
      setCurrentId(layanan[index]._id);
      setImagePreview(`http://localhost:8081/api/v1/layanan/image/${layanan[index]._id}`);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } else {
      console.error("Invalid index:", index);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/v1/layanan/${id}`)
      .then(() => {
        setLayanan((prevData) => prevData.filter((item) => item._id !== id));

        setMessage("Layanan berhasil dihapus!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting Layanan", error);
        setMessage(error.response?.data?.message || "Error deleting Layanan");
      });
  };

  // untuk reset atau mengosongkan form atau input
  const resetForm = () => {
    setJudul("");
    setDeskripsi("");
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
      <div className="content-layanan">
        <div className="tambah-fasilitas">
          <h4>{isEditing ? "Edit Layanan" : "Tambah Layanan"}</h4>

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
            <input type="text" name="judul" value={judul} onChange={onChangeJudul} />
            <label>Keterangan</label>
            <input type="text" name="deskripsi" value={deskripsi} onChange={onChangeDeskripsi} />
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

        <div className="content-layanan-data">
          <Table bordered>
            <thead>
              <tr>
                <th>No</th>
                <th>Logo</th>
                <th>Keterangan</th>
                <th>Deskripsi</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {layanan.map((layanan, index) => (
                <tr key={layanan._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`http://localhost:8081/api/v1/layanan/image/${layanan._id}`} alt="gambar" style={{ width: "auto", height: "100px" }} />
                  </td>
                  <td>{layanan.judul}</td>
                  <td>{layanan.deskripsi}</td>
                  <td>
                    <Button type="button" variant="warning" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button type="button" variant="danger" onClick={() => handleDelete(layanan._id)}>
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

export default AdmLayanan;
