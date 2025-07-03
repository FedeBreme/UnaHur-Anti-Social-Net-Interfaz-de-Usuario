import { Link } from "react-router-dom";
//CSS
import '../styles/Footer.css'

const Footer = () => {
  return (
    <>
    <hr className="space"></hr>
    <div className="footer-container">
        <p>
            <Link to="/QuienesSomos">Quiénes somos</Link>
            |
            <Link to="/ComoFunciona">Cómo funciona</Link>
        </p>
        <p>Argentina | © 2025 UnaHur - Red Anti-Social</p>
    </div>
    </>
  );
};

export default Footer;