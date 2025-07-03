import { useState } from "react";
import { useNavigate } from "react-router-dom";
//COMPONENTS
import Footer from "../components/Footer";
//CSS
import "../styles/Register.css";
//CONEXION API
import { API_URL } from "../config";


function Register() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const res = await fetch(`${API_URL}/users`);
      const usuarios = await res.json();

      const yaExiste = usuarios.find(
        (u) => u.nickName.toLowerCase() === nickName.toLowerCase()
      );

      if (yaExiste) {
        setError("Ese nickname ya está registrado.");
        return;
      }

      const nuevoUsuario = { nickName, email };

      const postRes = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!postRes.ok) {
        throw new Error("Error al registrar usuario.");
      }

      setMensaje("¡Registro exitoso! Ahora podés iniciar sesión.");
      setTimeout(() => navigate("/Login"), 2000);
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("No se pudo registrar el usuario.");
    }
  };

  return (
    <div className="containerRegister">
      <h2>Registro de usuario</h2>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        <button type="submit">Registrarse</button>
      </form>
      <Footer />
    </div> 
    
  );
}

export default Register;
