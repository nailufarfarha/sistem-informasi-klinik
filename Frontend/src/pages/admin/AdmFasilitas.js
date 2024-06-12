import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

function AdmFasilitas() {
  // const token = localStorage.getItem("token");

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  // console.log("token", token);

  const [keterangan, setKeterangan] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State tambahan untuk URL gambar
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleKeteranganChange = (e) => {
    setKeterangan(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(file)); // Set URL gambar untuk pratinjau
  };

  useEffect(() => {
    const savedImageData = localStorage.getItem("imageData");
    if (savedImageData) {
      setImageData(JSON.parse(savedImageData));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("keterangan", keterangan);
    if (image) {
      data.append("image", image);
    }

    if (isEditing) {
      // Update existing data
      axios
        .patch(`http://localhost:8081/api/v1/fasilitas/$id`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (result.data) {
            const updatedImageData = [...imageData];
            updatedImageData[edit] = {
              image: image ? URL.createObjectURL(image) : imageData[edit].image,
              keterangan: keterangan,
            };
            setImageData(updatedImageData);
            localStorage.setItem("imageData", JSON.stringify(updatedImageData));
            setIsEditing(false);
            setEdit(null);

            setImageUrl("");
            setKeterangan("");
            setMessage(result.data.message);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            setMessage(e.response.data.message);
          } else {
            setMessage("Error occurred, but no data available.");
          }
        });
    } else {
      // Add new data
      axios
        .post("http://localhost:8081/api/v1/fasilitas", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          if (result.data) {
            const newImageData = [...imageData, { image: URL.createObjectURL(image), keterangan: keterangan }];
            setImageData(newImageData);
            localStorage.setItem("imageData", JSON.stringify(newImageData));
            setImage("");
            setImageUrl("");
            setKeterangan("");
            setMessage(result.data.message);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
        })
        .catch((e) => {
          setMessage(e.response.data.message);
        });
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);

    setImage(imageData[index].image);
    setKeterangan(imageData[index].keterangan);
  };

  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:8081/api/v1/fasilitas/delete/${id}`)
      .then((result) => {
        if (result.data) {
          const updatedImageData = imageData.filter((item) => item.id !== id);
          setImageData(updatedImageData);
          localStorage.setItem("imageData", JSON.stringify(updatedImageData));
          setMessage(result.data.message);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      })
      .catch((e) => {
        setMessage(e.response.data.message);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEdit(null);
    setImage(null);
    setImageUrl("");
    setKeterangan("");
  };

  return (
    <div>
      <Sidebar />
      <Profile />
      <div className="content-fasilitas">
        <div className="tambah-fasilitas">
          <h4>{isEditing ? "Edit Fasilitas" : "Tambah Fasilitas"}</h4>
          {message && <p>{message}</p>}
          <div className="tambah-form">
            <label>Gambar</label>
            <input type="file" name="image" id="image" onChange={handleImageChange} />
            <label>Keterangan</label>
            <input type="text" name="keterangan" value={keterangan} onChange={handleKeteranganChange} />
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
              {imageData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.image} alt="uploaded" style={{ width: "auto", height: "100px" }} />
                  </td>
                  <td>{item.keterangan}</td>
                  <td>
                    <Button type="button" variant="warning" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button type="button" variant="danger" onClick={() => handleDelete(item._id)}>
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
