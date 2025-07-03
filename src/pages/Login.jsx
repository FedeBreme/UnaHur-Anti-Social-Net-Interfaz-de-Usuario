import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link  } from "react-router-dom";
//CSS
import "../styles/Login.css";
//COMPONENTS
import Footer from "../components/Footer";
//CONEXION API
import { API_URL} from "../config";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseña simulada
    if (password !== "123456") {
      setError("Contraseña incorrecta.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users`);
      const usuarios = await res.json();

      // Buscar usuario por nickName
      const usuarioEncontrado = usuarios.find(
        (u) => u.nickName.toLowerCase() === nickName.toLowerCase()
      );

      if (!usuarioEncontrado) {
        setError("Usuario no encontrado.");
        return;
      }

      // Login exitoso
      login(usuarioEncontrado);
      navigate("/Perfil");
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError("Ocurrió un error. Intentalo de nuevo más tarde.");
    }
  };

  return (
    <div className="containerSesion">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>NickName:</label>
          <input
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tenés cuenta? <Link to="/Register">Registrate acá</Link>
      </p>
      <Footer />
    </div>
  );
}

export default Login;