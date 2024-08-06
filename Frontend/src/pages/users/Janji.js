import React, { useState, useEffect } from "react";
import piclogin from "../../assets/login.png";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { jsPDF } from "jspdf";

const Janji = () => {
  // Jadwal Layanan
  const [jadwals, setJadwals] = useState([]);
  const [layanan, setLayanan] = useState("");
  const [dokter, setDokter] = useState("");
  const [hari, setHari] = useState("");
  const [jam, setJam] = useState("");
  const [jamTerpilih, setJamTerpilih] = useState([]);

  // Informasi pasien
  const [namalengkap, setNamalengkap] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nohp, setNohp] = useState("");

  //   alert
  const [Message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const startHour = 7;
  const endHour = 21;
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return `${hour.toString().padStart(2, "0")}:00`;
  });
  // Filter jam yang sudah dipilih
  const availableHours = hours.filter((hour) => !jamTerpilih.includes(hour));
  // Filter options based on previous selections
  const filteredDokters = jadwals.filter((jadwal) => jadwal.layanan === layanan);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/jadwal")
      .then((response) => {
        setJadwals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jadwal:", error);
      });
  }, []);

  const onChangeJam = (e) => {
    const jam = e.target.value;
    setJam(jam);
    // if (jam && !jamTerpilih.includes(jam)) {
    //   setJamTerpilih([...jamTerpilih, jam]);
    // }
    setJamTerpilih([...jamTerpilih, jam]);
  };

  const ChangeNamalengkap = (e) => {
    const value = e.target.value;
    setNamalengkap(value);
    setErrorMsg("");
  };

  const ChangeUmur = (e) => {
    const value = e.target.value;
    setUmur(value);
    setErrorMsg("");
  };

  const ChangeAlamat = (e) => {
    const value = e.target.value;
    setAlamat(value);
    setErrorMsg("");
  };

  const ChangeNohp = (e) => {
    const value = e.target.value;
    setNohp(value);
    setErrorMsg("");
  };

  const generatePDF = (data) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [150, 210],
    });

    const imgData = logo;
    doc.addImage(imgData, "PNG", 10, 10, 50, 20);
    doc.setFontSize(25);
    doc.text("FATIMAH MEDICAL CLINIC", 80, 15);
    doc.setFontSize(15);
    doc.text("By: dr. Zulfadli Amri", 110, 23);

    doc.setFontSize(12);
    doc.text("SIP: 446/SIPD-2854/DPMPTSP/2020", 100, 28);
    doc.text("Jl. Cikeris Pasanggrahan No.11 Kecamatan Bojong 41164", 80, 33);
    doc.text("Telp/WA: 0821-2389-8188", 105, 38);
    doc.setLineWidth(0.5);
    doc.line(10, 42, 200, 42);
    doc.setLineWidth(1.0);
    doc.line(10, 43, 200, 43);
    doc.setLineWidth(0.5);
    doc.line(10, 44, 200, 44);

    doc.setFontSize(16);
    doc.text("Data Janji Temu Dokter", 80, 55);

    doc.setFontSize(12);
    doc.text(`Layanan: ${data.layanan}`, 10, 65);
    doc.text(`Dokter: ${data.dokter}`, 10, 75);
    doc.text(`Hari: ${data.hari}`, 10, 85);
    doc.text(`Jam: ${data.jam}`, 10, 95);
    doc.text(`Nama Lengkap: ${data.namalengkap}`, 10, 105);
    doc.text(`Umur: ${data.umur}`, 10, 115);
    doc.text(`Alamat: ${data.alamat}`, 10, 125);
    doc.text(`Nomor WhatsApp: ${data.nohp}`, 10, 135);
    doc.save("janji_temu_dokter.pdf");
  };

  const handleRegist = () => {
    // cek input
    if (!layanan || !dokter || !hari || !jam || !namalengkap || !umur || !alamat || !nohp) {
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
      namalengkap: namalengkap,
      umur: umur,
      alamat: alamat,
      nohp: nohp,
    };

    axios
      .post("http://localhost:8081/api/v1/janji", data)
      .then((result) => {
        if (result) {
          if (result.data) {
            setLayanan("");
            setDokter("");
            setHari("");
            setJam("");
            setNamalengkap("");
            setUmur("");
            setAlamat("");
            setNohp("");

            setMessage(result.data.message);
            generatePDF(data);

            setMessage("Halo, terima kasih telah melakukan janji temu bersama dokter. Kami akan segera menghubungi Anda melalui WhatsApp.");

            // navigate("/janji-temu/sukses");
          }
        }
      })
      .catch((e) => {
        setErrorMsg(e.response.data.message);
      });
  };

  const handleClear = () => {
    setLayanan("");
    setDokter("");
    setHari("");
    setJam("");
    setNamalengkap("");
    setUmur("");
    setAlamat("");
    setNohp("");
    setMessage("");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="header-logo col-md-6">
          <div className="icon-log">
            <img src={piclogin} />
          </div>
        </div>

        <div className="col-md-6 ">
          <div className="janji-log">
            <img src={logo} />
          </div>
          <h5 className="txt-janji">Buat Janji Temu Dokter</h5>
          <div>
            <p>{Message}</p>
            <p>{errorMsg}</p>

            <div className="form-janji">
              <select name="layanan" value={layanan} onChange={(e) => setLayanan(e.target.value)}>
                <option value="">Pilih Layanan</option>
                {[...new Set(jadwals.map((jadwal) => jadwal.layanan))].map((layanan, index) => (
                  <option key={index} value={layanan}>
                    {layanan}
                  </option>
                ))}
              </select>
              <select name="dokter" value={dokter} onChange={(e) => setDokter(e.target.value)}>
                <option value="">Pilih Dokter</option>
                {[...new Set(filteredDokters.map((jadwal) => jadwal.dokter))].map((dokter, index) => (
                  <option key={index} value={dokter}>
                    {dokter}
                  </option>
                ))}
              </select>

              <select name="hari" value={hari} onChange={(e) => setHari(e.target.value)}>
                <option value="">Pilih Hari</option>
                {daysOfWeek.map((hari, index) => (
                  <option key={index} value={hari}>
                    {hari}
                  </option>
                ))}
              </select>

              <select name="jam" value={jam} onChange={onChangeJam}>
                <option value="">Pilih Jam</option>
                {hours.map((jam, index) => (
                  <option key={index} value={jam}>
                    {jam}
                  </option>
                ))}
              </select>

              <input type="text" id="namalengkap" name="namalengkap" placeholder="Nama Lengkap" value={namalengkap} autoComplete="off" onChange={ChangeNamalengkap} />

              <input type="number" id="umur" name="umur" placeholder="Umur (Tahun)" value={umur} autoComplete="off" onChange={ChangeUmur} />

              <input type="text" id="alamat" name="alamat" placeholder="Alamat" value={alamat} autoComplete="off" onChange={ChangeAlamat} />

              <input type="text" id="nohp" name="nohp" placeholder="Nomor WhatsApp" value={nohp} autoComplete="off" onChange={ChangeNohp} />
              <div className="form-buttons-janji">
                <button className="btn-send" onClick={handleRegist}>
                  Kirim
                </button>
                <button className="btn-clear" onClick={handleClear}>
                  Clear Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Janji;
