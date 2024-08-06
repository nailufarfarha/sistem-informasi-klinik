import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import { Table, Button, FormControl } from "react-bootstrap";

import axios from "axios";

function AdmData() {
  const [datapasien, setDatapasien] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/daftar")
      .then((response) => {
        setDatapasien(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = datapasien.filter((pasien) => pasien.namalengkap.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/daftar/${id}`)
      .then(() => {
        setDatapasien((prevData) => prevData.filter((item) => item._id !== id));

        setMessage("Data pasien berhasil dihapus!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting data", error);
        setMessage(error.response?.data?.message || "Error deleting data");
      });
  };

  return (
    <div>
      <Sidebar />
      <Profile />
      <div className="content-fasilitas">
        <h4>Data Pasien</h4>
        <div className="content-fasilitas-data">
          <FormControl type="text" placeholder="Cari Nama Pasien" value={search} onChange={handleSearch} className=" mb-3" style={{ width: "250px" }} />
          {message && <div className="alert alert-success">{message}</div>}
          <Table bordered>
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Nama Lengkap</th>
                <th>Umur</th>
                <th>Alamat</th>
                <th>No Hp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((pasien, index) => (
                <tr key={pasien._id}>
                  <td>{index + 1}</td>
                  <td>{pasien.username}</td>
                  <td>{pasien.namalengkap}</td>
                  <td>{pasien.umur} Tahun</td>
                  <td>{pasien.alamat}</td>
                  <td>{pasien.nohp}</td>
                  <td>
                    <Button type="button" variant="danger" onClick={() => handleDelete(pasien._id)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
              {/* {datapasien.map((pasien, index) => (
                <tr key={pasien._id}>
                  <td>{index + 1}</td>
                  <td>{pasien.username}</td>
                  <td>{pasien.namalengkap}</td>
                  <td>{pasien.umur} Tahun</td>
                  <td>{pasien.alamat}</td>
                  <td>{pasien.nohp}</td>
                  <td>
                    <Button type="button" variant="danger" onClick={() => handleDelete(pasien._id)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdmData;
