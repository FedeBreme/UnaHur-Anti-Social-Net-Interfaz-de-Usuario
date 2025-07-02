import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import '../Styles/PostDetails.css';
import imagen2 from "../Imagenes/tralaleroTralala.jpg";
import imagen1 from "../Imagenes/NocheLifeder16.jpg";
import { UserContext } from "../context/UserContext"; 

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState(""); // Nuevo estado para comentario
  const { user } = useContext(UserContext); // Usuario logueado desde contexto

  const imagenes = [imagen1, imagen2];

  useEffect(() => {
    async function cargarPost() {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`);
        if (!res.ok) {
          throw new Error("No se pudo cargar el post");
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    }

    cargarPost();
  }, [id]);

  // Función para enviar comentario
  async function manejarEnvioComentario(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post.id,
          userId: user.id,
          text: newComment,
        }),
      });
      setNewComment("");

      // Recargar comentarios del post actualizado
      const res = await fetch(`http://localhost:3001/posts/${id}`);
      const updatedPost = await res.json();
      setPost(updatedPost);
    } catch (err) {
      alert("Error al enviar comentario");
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Cargando post...</div>;
  }

  const imagen = imagenes[parseInt(id) % imagenes.length];

  return (
    <div className="post-container">
      <div className="header-post">
        <span className="user-name">{post.User?.nickName}</span>
        <h2 className="post-title">{post.title}</h2>
      </div>

      <p className="post-description">{post.description}</p>

      <div className="image-post">
        <img className="image-style" src={imagen} alt="Imagen del post" />
      </div>

      <div className="right-section">
        <div className="tags-container space">
          {post.Tags?.map((tag, i) => (
            <span key={i} className="tag">{tag.name}</span>
          ))}
        </div>

        <div className="comments-container">
          <h3>Comentarios ({post.Comments?.length || 0})</h3>
          {post.Comments?.length > 0 ? (
            <ul>
              {post.Comments.map((comment) => (
                <li key={comment.id}>
                  <b>{comment.nickName || "Anónimo"}:</b> {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay comentarios aún.</p>
          )}

          {/* Formulario de comentario */}
          {user ? (
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


