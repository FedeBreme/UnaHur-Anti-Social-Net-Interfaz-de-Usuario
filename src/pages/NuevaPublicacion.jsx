import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//CSS
import "../styles/NuevaPublicacion.css";
//CONEXION API
import { API_URL} from "../config";


function NuevaPublicacion() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([""]); // al menos un campo vacío
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Traer etiquetas
  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch(`${API_URL}/tags`);
        const data = await res.json();
        setTags(data);
      } catch (err) {
        console.error("Error al traer etiquetas:", err);
      }
    }

    fetchTags();
  }, []);

  // Manejar el cambio de etiquetas seleccionadas
  function handleTagToggle(tagId) {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  }

  // Manejar envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    if (!usuario) {
      setMensaje("Debés iniciar sesión para crear una publicación.");
      return;
    }

    try {
      // Crear post
      const resPost = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          userId: usuario.id,
          tags: selectedTags,
        }),
      });

      if (!resPost.ok) throw new Error("Error creando la publicación");

      const newPost = await resPost.json();
      const postId = newPost.id;

      // Enviar imágenes si hay
      const urlsFiltradas = imageUrls.filter((url) => url.trim() !== "");
      for (let url of urlsFiltradas) {
        await fetch(`${API_URL}/postimages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            postId,
          }),
        });
      }

      // Reset y mensaje
      setDescription("");
      setImageUrls([""]);
      setSelectedTags([]);
      setMensaje("¡Publicación creada exitosamente!");

      // Redirigir o esperar unos segundos
      setTimeout(() => {
        navigate("/Perfil");
      }, 2000);
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      setMensaje("Hubo un error al crear la publicación.");
    }
  }

  // Agregar otro campo de imagen
  function agregarCampoImagen() {
    setImageUrls([...imageUrls, ""]);
  }

  return (
    <div className="contenedor-formulario">
      <h2>Crear nueva publicación</h2>
      <form onSubmit={handleSubmit} className="form-post">
        <label>Descripción*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>URLs de imágenes (opcional)</label>
        {imageUrls.map((url, index) => (
          <input
            key={index}
            type="text"
            value={url}
            onChange={(e) => {
              const nuevas = [...imageUrls];
              nuevas[index] = e.target.value;
              setImageUrls(nuevas);
            }}
            placeholder="https://..."
          />
        ))}
        <button type="button" onClick={agregarCampoImagen}>
          + Agregar otra imagen
        </button>

        <label>Etiquetas</label>
        <div className="tags-checkboxes">
          {tags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>

        <button type="submit">Publicar</button>
      </form>

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
    </div>
  );
}

export default NuevaPublicacion;