import "../App.css";
import Navigation from "./Navigation";
import clinic from "../assets/clinic.jpeg";
import Footer from "./Footer";

const Layanan = () => {
  return (
    <div className="body">
      <Navigation></Navigation>
      <div className="hero-1">
        <img src={clinic} alt="Fatimah Medical Clinic" className="img-fluid" />
        <h2>LAYANAN KLINIK</h2>
      </div>
      <h2 className="layanan-header">
        <span>Layanan </span>
        <span className="text-orange">Klinik Fatimah</span>
      </h2>

      <Footer></Footer>
    </div>
  );
};

export default Layanan;
