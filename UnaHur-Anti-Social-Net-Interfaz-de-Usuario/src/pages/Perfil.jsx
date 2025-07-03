import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";
import "../styles/VisualAlert.css";
import VisualAlert from "../components/VisualAlert";
import PostCard from "../components/PostCard";
import imagenFija from "../images/default.png";
import Footer from "../components/Footer";

function Perfil() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usuario === undefined) return;

    if (usuario === null) {
      navigate("/login", { replace: true });
      return;
    }

    const cargarPosts = async () => {
      try {
        const respuestaPosts = await fetch("http://localhost:3001/posts");
        if (!respuestaPosts.ok) {
          throw new Error("No se pudieron cargar los posts");
        }

        const postsData = await respuestaPosts.json();

        // Filtrar por los posts del usuario actual
        const postsUsuario = postsData.filter(
          (post) => String(post.UserId) === String(usuario.id)
        );

        // Para cada post, obtener los comentarios
        const postsConComentarios = await Promise.all(
          postsUsuario.map(async (post) => {
            try {
              const respuestaComments = await fetch(
                `http://localhost:3001/comments/post/${post.id}`
              );

              if (!respuestaComments.ok) {
                return { ...post, commentCount: 0 };
              }

              const commentsData = await respuestaComments.json();
              return { ...post, commentCount: commentsData.length };
            } catch (error) {
              console.error("Error al traer comentarios:", error);
              return { ...post, commentCount: 0 };
            }
          })
        );

        setPosts(postsConComentarios);
        setError(null);
      } catch (error) {
        setError("No se pudieron cargar los posts: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarPosts();
  }, [usuario, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (usuario === undefined || loading) {
    return <p className="cargando">Cargando perfil...</p>;
  }

  return (
    <>
      <div className="container mt-4 container-posts-usuario">
        <h2 className="space">Bienvenid@, {usuario?.nickName}</h2>
        <hr />
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>

        {error && <VisualAlert mensaje={error} />}
        {!error && posts.length === 0 && <p>No publicaste nada todavía.</p>}

        <div className="contenedor-posts-usuario">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              title={post.title}
              image={imagenFija}
              description={post.description}
              tags={post.Tags?.map((tag) => tag.name) || []}
              commentCount={post.commentCount || 0}
              userName={usuario.nickName}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;

