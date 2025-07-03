import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
//CSS
import "../styles/Perfil.css";
import "../styles/VisualAlert.css";
//COMPONENTS
import VisualAlert from "../components/VisualAlert";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
//IMAGES
import imagenFija from "../images/default.png";
//CONEXION API
import { API_URL} from "../config";

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
        const respuestaPosts = await fetch(`${API_URL}/posts`);
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
            let commentCount = 0;
            let imagenes = [];

            try {
              const respuestaComments = await fetch(`${API_URL}/comments/post/${post.id}`);
              if (respuestaComments.ok) {
                const commentsData = await respuestaComments.json();
                commentCount = commentsData.length;
              }
            } catch (error) {
              console.error("Error al traer comentarios:", error);
            }

            try {
              const respuestaImagenes = await fetch(`${API_URL}/postimages/post/${post.id}`);
              if (respuestaImagenes.ok) {
                imagenes = await respuestaImagenes.json();
              }
            } catch (error) {
              console.error("Error al traer imágenes:", error);
            }

            return {
              ...post,
              commentCount,
              PostImages: imagenes,
            };
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

        {error && <VisualAlert mensaje={error} />}
        {!error && posts.length === 0 && <p>No publicaste nada todavía.</p>}

        <div className="contenedor-posts-usuario">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              title={post.title}
              image={post.PostImages?.[0]?.url || imagenFija}
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