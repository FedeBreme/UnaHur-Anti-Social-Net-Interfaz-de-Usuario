import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//IMAGES
import logoUnaHur from "../images/LogoUnaHurAnti-SocialNet.png";
//CSS
import '../styles/Navbar.css'

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("modo") === "oscuro";
  });

  const { usuario,logout  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? "modo-oscuro" : "modo-claro";
    localStorage.setItem("modo", darkMode ? "oscuro" : "claro");
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logoUnaHur} alt="Logo UnaHur" width="50" height="50" className="me-2" />
          <span>UnaHur - Red Anti-Social</span>
        </Link>
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
            {[
              { path: "/Home", label: "Home" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink className="nav-link" to={item.path}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            {!usuario && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Login">
                    Login
                  </NavLink>
                </li>
              )}
            {usuario && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Perfil">
                    Perfil - {usuario.nickName}
                  </NavLink>
                </li>
              )}
          </ul>
            {usuario && (
          <button
            className="btn btn-outline-danger btn-sm me-2"
            onClick={() =>{
              logout();
              navigate("/Home")}}
          >
            Cerrar sesión
          </button>
          )}
          <button
            className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"} me-3`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;