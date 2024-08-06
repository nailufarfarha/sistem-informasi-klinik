import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import { Table, Button, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

function AdmJanji() {
  const [datajanji, setDatajanji] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/janji")
      .then((response) => {
        setDatajanji(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = datajanji.filter((janji) => janji.namalengkap.toLowerCase().includes(search.toLowerCase()));

  const handleCheck = (id) => {
    axios
      .delete(`http://localhost:8081/api/v1/janji/${id}`)
      .then((response) => {
        // Memperbarui data yang ditampilkan
        setDatajanji(datajanji.filter((janji) => janji._id !== id));
        setMessage("Pasien telah diperiksa dokter!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return;
      })
      .catch((error) => {
        setMessage("Terjadi kesalahan.");
      });
  };

  const handleCancel = (id) => {
    axios
      .delete(`http://localhost:8081/api/v1/janji/${id}`)
      .then((response) => {
        // Memperbarui data yang ditampilkan
        setDatajanji(datajanji.filter((janji) => janji._id !== id));
        setMessage("Janji temu dibatalkan!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return;
      })
      .catch((error) => {
        setMessage("Terjadi kesalahan.");
      });
  };

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`http://localhost:8081/api/v1/janji/${id}`)
  //     .then(() => {
  //       setDatajanji((prevData) => prevData.filter((item) => item._id !== id));

  //       setMessage("Data pasien berhasil dihapus!");
  //       setTimeout(() => {
  //         setMessage("");
  //       }, 3000);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting data", error);
  //       setMessage(error.response?.data?.message || "Error deleting data");
  //     });
  // };

  return (
    <div>
      <Sidebar />
      <Profile />
      <div className="content-fasilitas">
        <h4>Daftar Janji Temu Dokter</h4>
        <div className="content-fasilitas-data">
          <FormControl type="text" placeholder="Cari Nama Pasien" value={search} onChange={handleSearch} className=" mb-3" style={{ width: "250px" }} />
          {message && <div className="alert alert-success">{message}</div>}
          <Table bordered>
            <thead>
              <tr>
                <th>No</th>
                <th>Layanan</th>
                <th>Dokter</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Nama Pasien</th>
                <th>Umur</th>
                <th>Alamat</th>
                <th>WhatsApp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((janji, index) => (
                <tr key={janji._id}>
                  <td>{index + 1}</td>
                  <td>{janji.layanan}</td>
                  <td>{janji.dokter}</td>
                  <td>{janji.hari}</td>
                  <td>{janji.jam}</td>
                  <td>{janji.namalengkap}</td>
                  <td>{janji.umur} Tahun</td>
                  <td>{janji.alamat}</td>
                  <td>{janji.nohp}</td>
                  <td>
                    <div className="form-buttons-janji">
                      <Button variant="success" onClick={() => handleCheck(janji._id)}>
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button variant="danger" onClick={() => handleCancel(janji._id)}>
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                    </div>
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

export default AdmJanji;
