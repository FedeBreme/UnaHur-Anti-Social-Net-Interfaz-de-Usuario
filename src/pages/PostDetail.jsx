import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
//CSS
import '../styles/PostDetails.css';
//IMAGES
import imagenMuestra from "../images/paisajeParaEstilo.jpeg";
//CONEXION API
import { API_URL} from "../config";

function PostDetail() {
  const { id } = useParams();
  const { usuario } = useAuth();

  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]); 
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  //
  const [imagenes, setImagenes] = useState([]);

  const imagen = imagenes[parseInt(id, 10) % imagenes.length];

  const cargarPost = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      if (!res.ok) throw new Error("No se pudo cargar el post");
      const data = await res.json();

      const resImgs = await fetch(`${API_URL}/postimages/post/${id}`);
      const imagenesData = resImgs.ok ? await resImgs.json() : [];

      setPost(data);
      setImagenes(imagenesData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPost(null);
      
      setImagenes([]);
    }
  }, [id]);

  const cargarComentarios = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/comments/post/${id}`);
      if (!res.ok) throw new Error("No se pudieron cargar los comentarios");
      const data = await res.json();
      setComentarios(data);
    } catch (err) {
      console.error("Error cargando comentarios:", err.message);
    }
  }, [id]);

  useEffect(() => {
    cargarPost();
    cargarComentarios();
  }, [cargarPost, cargarComentarios]);

  async function manejarEnvioComentario(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: id,
          userId: usuario.id,
          content: newComment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear comentario");
      }

      setNewComment("");
      await cargarComentarios();
    } catch (error) {
      alert("Error al enviar comentario: " + error.message);
    }
  }

  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Cargando post...</div>;

  return (
    <div className="post-container">
      <div className="header-post">
        <span className="user-name">{post.User?.nickName}</span>
        <h2 className="post-title">{post.title}</h2>
      </div>

      <p className="post-description">{post.description}</p>

      <div className="image-post">
        <img
          className="image-style"
          src={imagenes[0]?.url || imagenMuestra}
          alt="Imagen del post"
        />
      </div>

      <div className="right-section">
        <div className="tags-container space">
          {post.Tags?.map((tag, i) => (
            <span key={i} className="tag">{tag.name}</span>
          ))}
        </div>

        <div className="comments-container">
          <h3>Comentarios ({comentarios.length})</h3>
          {comentarios.length > 0 ? (
            <ul>
              {comentarios.map((comment) => (
                <li key={comment.id}>
                  <b>{comment.User?.nickName || "Anónimo"}:</b> {comment.content}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay comentarios aún.</p>
          )}

          {usuario ? (
            <form onSubmit={manejarEnvioComentario} style={{ marginTop: "1rem" }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribí un comentario..."
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  resize: "vertical",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: "0.5rem",
                  padding: "8px 16px",
                  backgroundColor: "#0077cc",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Agregar comentario
              </button>
            </form>
          ) : (
            <p>Iniciá sesión para comentar.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;