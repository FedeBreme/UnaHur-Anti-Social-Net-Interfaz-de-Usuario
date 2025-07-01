import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import '../Styles/PostDetails.css';
import VisualAlert from "../Componentes/VisualAlert"; 
import imagen2 from "../Imagenes/tralaleroTralala.jpg";
import imagen1 from "../Imagenes/NocheLifeder16.jpg";
=======
import '../styles/PostDetails.css';
import VisualAlert from "../components/VisualAlert"; 
import imagen2 from "../images/tralaleroTralala.jpg";
import imagen1 from "../images/NocheLifeder16.jpg";
>>>>>>> origin/dev/Franco

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const imagenes = [imagen1, imagen2];

  useEffect(() => {
    async function cargarPost() {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    }
    cargarPost();
  }, [id]);

  if (error) return <VisualAlert mensaje={"Un error inesperado: " + error} />; 

  if (!post) return <div>Cargando post...</div>;

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
        </div>
      </div>
    </div>
  );
}

export default PostDetail;



