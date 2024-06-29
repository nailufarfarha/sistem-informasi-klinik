import React from "react";
import "../App.css";
import Navigation from "./Navigation";
import clinic from "../assets/clinic.jpeg";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="body">
      <Navigation></Navigation>
      <div className="hero-1">
        <img src={clinic} alt="Fatimah Medical Clinic" className="img-fluid" />
        <h2>TENTANG KAMI</h2>
      </div>
      <div className="tentang">
        <span>
          Fatimah Medical Clinic adalah sebuah klinik pratama atau fasilitas kesehatan yang menyelenggarakan dan menyediakan pelayanan medik dasar yang didirikan pada tanggal 08 November 2021 dan dibentuk oleh lebih dari satu tenaga
          kesehatan yang dipimpin oleh seorang tenaga medis yaitu Dokter. Fatimah Medical Clinic terletak di Jl. Cikeris, Desa Cikeris, Kecamatan Bojong, Kabupaten Purwakarta dengan menyelenggarakan jasa di bidang kesehatan yaitu klinik.
          Klinik ini dibangun sebagai pelayanan kesehatan opsional yang berfungsi sebagai usaha pencegahan dan penanggulangan terhadap upaya kesehatan masyarakat. Klinik ini mempunyai struktur organisasi yang didesain untuk memberikan
          layanan medis dasar dan spesialis, dipimpin oleh tenaga medis yang kompeten dan berpengalaman.
        </span>
        <h2 className="text-orange" style={{ marginTop: "30px" }}>
          Visi
        </h2>
        <span style={{ fontStyle: "italic", fontWeight: "bold" }}>“Menjadikan Fatimah Medical Clinic solusi kesehatan masyarakat.”</span>
        <h2 className="text-orange" style={{ marginTop: "30px" }}>
          Misi
        </h2>
        <span>
          <li>Menjalin Kemitraan dengan seluruh kalangan masyarakat.</li>
          <li>Memberikan Pelayanan Kesehatan yang cepat, tepat, bermutu, dan terjangkau.</li>
          <li>Memberikan Pelayanan Medis dasar yang terpecaya.</li>
          <li>Memotivasi Masyarakat agar hidup dengan kesadaran hidup yang sehat.</li>
          <li>Menjadi mitra pemerintah ataupun swasta dalam memberikan pelayanan yang berkesinambungan.</li>
        </span>
        <h2 className="text-orange" style={{ marginTop: "30px" }}>
          Tujuan
        </h2>
        <span>
          <li>Melaksanakan Pelayanan Kesehatan secara profesional.</li>
          <li>Mengupayakan pencapaian standar pelayanan yang optimal.</li>
          <li>Melalui pengembangan dan kerjasama serta proses evaluasi yang berkesinambungan.</li>
        </span>
        <h2 className="text-orange" style={{ marginTop: "30px" }}>
          Motto
        </h2>
        <span style={{ fontStyle: "italic", fontWeight: "bold" }}>“SENYUM PASIEN SEGALANYA BAGI KAMI”</span>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default About;
