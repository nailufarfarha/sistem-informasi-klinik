import "../App.css";
import Navigation from "./Navigation";
import clinic from "../assets/clinic.jpeg";
import Footer from "./Footer";

const Fasilitas = () => {
  return (
    <div className="body">
      <Navigation></Navigation>
      <div className="hero-1">
        <img src={clinic} alt="Fatimah Medical Clinic" className="img-fluid" />
        <h2>FASILITAS KLINIK</h2>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Fasilitas;
