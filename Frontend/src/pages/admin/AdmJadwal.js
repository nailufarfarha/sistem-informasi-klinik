import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AdmJadwal = () => {
  // untuk ambil token login
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  console.log("token", token);

  const [layanan, setLayanan] = useState("");
  const [dokter, setDokter] = useState("");
  const [hariMulai, setHariMulai] = useState("");
  const [hariSelesai, setHariSelesai] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedJadwalId, setEditedJadwalId] = useState(null);
  const [jadwals, setJadwals] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/jadwal")
      .then((response) => {
        setJadwals(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu", "Setiap Hari"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  const onChangeLayanan = (e) => {
    setLayanan(e.target.value);
  };

  const onChangeDokter = (e) => {
    setDokter(e.target.value);
  };

  const onChangeHariMulai = (e) => {
    setHariMulai(e.target.value);
  };

  const onChangeHariSelesai = (e) => {
    setHariSelesai(e.target.value);
  };

  const handleJamMulaiChange = (e) => {
    setJamMulai(e.target.value);
  };

  const handleJamSelesaiChange = (e) => {
    setJamSelesai(e.target.value);
  };

  const handleCreate = () => {
    const hari = hariMulai === "Setiap Hari" ? "Setiap Hari" : `${hariMulai} - ${hariSelesai}`;
    const jam = `${jamMulai} - ${jamSelesai}`;

    // cek input
    if (!layanan || !dokter || !hariMulai || (!hariSelesai && hariMulai !== "Setiap Hari") || !jamMulai || !jamSelesai) {
      setMessage("Semua data harus diisi!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    const data = {
      layanan: layanan,
      dokter: dokter,
      hari: hari,
      jam: jam,
    };
    axios
      .post("http://localhost:8081/api/v1/jadwal", data)
      .then((response) => {
        setJadwals([...jadwals, response.data]);
        setLayanan("");
        setDokter("");
        setHariMulai("");
        setHariSelesai("");
        setJamMulai("");
        setJamSelesai("");

        setMessage("Jadwal berhasil ditambahkan!");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    const hari = hariMulai === "Setiap Hari" ? "Setiap Hari" : `${hariMulai} - ${hariSelesai}`;
    const jam = `${jamMulai} - ${jamSelesai}`;

    // cek input
    if (!layanan || !dokter || !hariMulai || (!hariSelesai && hariMulai !== "Setiap Hari") || !jamMulai || !jamSelesai) {
      setMessage("Semua data harus diisi!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    axios
      .put(`http://localhost:8081/api/v1/jadwal/${editedJadwalId}`, { layanan, dokter, hari, jam })
      .then((response) => {
        setJadwals(jadwals.map((jadwal) => (jadwal._id === editedJadwalId ? response.data : jadwal)));
        setIsEditing(false);
        setEditedJadwalId(null);
        setLayanan("");
        setDokter("");
        setHariMulai("");
        setHariSelesai("");
        setJamMulai("");
        setJamSelesai("");

        setMessage("Jadwal berhasil diperbaharui!");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    if (isEditing) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedJadwalId(null);
    setLayanan("");
    setDokter("");
    setHariMulai("");
    setHariSelesai("");
    setJamMulai("");
    setJamSelesai("");
  };

  const handleEdit = (jadwal) => {
    setIsEditing(true);
    setEditedJadwalId(jadwal._id);
    setLayanan(jadwal.layanan);
    setDokter(jadwal.dokter);
    const hariSplit = jadwal.hari.split(" - ");
    setHariMulai(hariSplit[0]);
    setHariSelesai(hariSplit[1] || "Setiap Hari");
    const jamSplit = jadwal.jam.split(" - ");
    setJamMulai(jamSplit[0]);
    setJamSelesai(jamSplit[1]);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/v1/jadwal/${id}`)
      .then(() => {
        setJadwals(jadwals.filter((jadwal) => jadwal._id !== id));

        setMessage("Jadwal berhasil dihapus!");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const AlertMessage = ({ message }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }, []);
  };

  return (
    <div>
      <Sidebar />
      <Profile />
      <div className="adm-jadwal">
        <div className="tambah-jadwal">
          <h4>{isEditing ? "Edit Jadwal" : "Tambah Jadwal"}</h4>

          {message && show && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          {/* {message && <p>{message}</p>} */}
          <div className="tambah-form">
            <label>Layanan</label>
            <input type="text" name="layanan" value={layanan} onChange={onChangeLayanan} />
            <label>Nama Dokter</label>
            <input type="text" name="dokter" value={dokter} onChange={onChangeDokter} />
            <label>Hari Mulai</label>
            <select name="hariMulai" value={hariMulai} onChange={onChangeHariMulai}>
              <option value="">Pilih Hari Mulai</option>
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
            {hariMulai !== "Setiap Hari" && (
              <>
                <label>Hari Selesai</label>
                <select name="hariSelesai" value={hariSelesai} onChange={onChangeHariSelesai}>
                  <option value="">Pilih Hari Selesai</option>
                  {daysOfWeek.slice(0, 7).map((day, index) => (
                    <option key={index} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </>
            )}
            <label>Jam Mulai</label>
            <select name="jamMulai" value={jamMulai} onChange={handleJamMulaiChange}>
              <option value="">Pilih Jam Mulai</option>
              {hours.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <label>Jam Selesai</label>
            <select name="jamSelesai" value={jamSelesai} onChange={handleJamSelesaiChange}>
              <option value="">Pilih Jam Selesai</option>
              {hours.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>

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
          <Table bordered hover>
            <thead>
              <tr>
                <th>Layanan</th>
                <th>Nama Dokter</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jadwals.map((jadwal, index) => (
                <tr key={index}>
                  <td>{jadwal.layanan}</td>
                  <td>{jadwal.dokter}</td>
                  <td>{jadwal.hari}</td>
                  <td>{jadwal.jam}</td>
                  <td>
                    <Button type="button" variant="warning" onClick={() => handleEdit(jadwal)} style={{ color: "white", marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(jadwal._id)}>
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
};

export default AdmJadwal;
