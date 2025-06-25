import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logoUnaHur from "../Imagenes/LogoUnaHurAnti-SocialNet.png";
import '../Styles/Navbar.css'

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.className = darkMode ? "modo-oscuro" : "modo-claro";
  }, [darkMode]);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <img
              src={logoUnaHur}
              alt="Logo UnaHur"
              width="60"
              height="60"
            />
          </Link>
        <Link className="navbar-brand" to="/">UnaHur - Red Anti-Social</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/Home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Perfil">Perfil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/QuienesSomos">Quienes Somos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ComoFunciona">Como Funciona</NavLink>
            </li>
          </ul>
          <button
            className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'} me-3`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Modo claro' : 'Modo oscuro'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;