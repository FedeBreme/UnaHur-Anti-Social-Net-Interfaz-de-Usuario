import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/Perfil.css';
import '../styles/VisualAlert.css';
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

    const obtenerPostsDelUsuario = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/posts");

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los posts");
        }

        const todosLosPosts = await respuesta.json();

        const postsDelUsuario = todosLosPosts.filter(post =>
          String(post.UserId) === String(usuario.id)
        );

        setPosts(postsDelUsuario);
      } catch (err) {
        setError("No se pudieron cargar los posts. " + err.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerPostsDelUsuario();
  }, [usuario, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (usuario === undefined || loading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <>
      <div className="container mt-4">
        <h2 className="space">Bienvenid@, {usuario?.nickName}</h2>
        <hr />
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>

        {error && <VisualAlert mensaje={error} />}
        {!error && posts.length === 0 && <p>No publicaste nada todavía.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {posts.map(post => (
            <PostCard
              key={post.id}
              postId={post.id}
              title={post.title}
              image={imagenFija}
              description={post.description}
              tags={post.Tags?.map(tag => tag.name) || []}
              commentCount={post.Comments?.length || 0}
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