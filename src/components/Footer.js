import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faSquareInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-column">
          <img src={require("../assets/logofooter.png")} />
        </div>
        <div className="footer-column">
          <h5>Hubungi Kami</h5>
          <p className="contact">
            <FontAwesomeIcon icon={faPhone} /> 08123456789
          </p>
          <p className="contact">
            <FontAwesomeIcon icon={faEnvelope} /> fatimahmedicalclinic@gmail.com
          </p>
          <p className="contact">
            <FontAwesomeIcon icon={faLocationDot} /> Jl. Cikeris, Desa Cikeris, Kecamatan Bojong, Kabupaten Purwakarta
          </p>
        </div>
        <div className="footer-column">
          <h5>Sosial Media</h5>
          <span className="sosmed">
            <FontAwesomeIcon icon={faFacebook} /> <FontAwesomeIcon icon={faTwitter} /> <FontAwesomeIcon icon={faSquareInstagram} /> <FontAwesomeIcon icon={faYoutube} />
          </span>
        </div>
      </div>
      <div className="credit">
        <span>Copyright © Nailufar Farha Afifah</span>
      </div>
    </div>
  );
};

export default Footer;
