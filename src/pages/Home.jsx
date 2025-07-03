import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//COMPONENTS 
import PostCard from "../components/PostCard";
import VisualAlert from "../components/VisualAlert";
import Footer from "../components/Footer";
import BannerBienvenida from "../components/BannerBienvenida";
//IMAGES
import imagenMuestra from "../images/paisajeParaEstilo.jpeg";
//CSS
import "../styles/Home.css";
//CONEXION API
import { API_URL} from "../config";

const imagenesDeMuestra = [imagenMuestra];

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  const { usuario } = useAuth();

  const navigate = useNavigate(); 

  useEffect(() => {
    const cargarPosts = async () => {
      try {
        const respuestaPosts = await fetch(`${API_URL}/posts`);
        if (!respuestaPosts.ok) {
          throw new Error("Error al cargar los posts");
        }
        const postsData = await respuestaPosts.json();

        const postsConDatos = await Promise.all(
          postsData.map(async (post) => {
            let commentCount = 0;
            try {
              const respuestaComments = await fetch(`${API_URL}/comments/post/${post.id}`);
              if (respuestaComments.ok) {
                const commentsData = await respuestaComments.json();
                commentCount = commentsData.length;
              }
            } catch {}

            let imagenes = [];
            try {
              const respuestaImagenes = await fetch(`${API_URL}/postimages/post/${post.id}`);
              if (respuestaImagenes.ok) {
                imagenes = await respuestaImagenes.json();
              }
            } catch {}

            return {
              ...post,
              commentCount,
              PostImages: imagenes,
            };
          })
        );
        
        postsConDatos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(postsConDatos);
        setError(null);
      } catch (error) {
        setError("No se pudieron cargar los posts: " + error.message);
      }
    };

    cargarPosts();
  }, []);

  const postsFiltrados = posts.filter((post) => {
    if (filtro.trim() === "") return true;
    if (!post.Tags) return false;

    return post.Tags.some((tag) =>
      tag.name.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  const irANuevaPublicacion = () => {
    navigate("/NuevaPublicacion"); 
  };

  return (
    <>
      <h1 className="space">Home</h1>
      <hr />
      {!usuario && <BannerBienvenida />}
      <div className="filtro-container">
        <input
          className="filtro-input"
          type="text"
          placeholder="Buscar por etiqueta"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button onClick={irANuevaPublicacion} className="btn btn-primary btn-publicacion" type="button">
          Nueva Publicación
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {error && <VisualAlert mensaje={error} />}

        {!error && postsFiltrados.length === 0 && (
          <p>No se encontraron posts que coincidan con el filtro.</p>
        )}

        {postsFiltrados.map((post, index) => (
          <PostCard
            key={post.id}
            postId={post.id}
            title={post.title}
            image={post.PostImages?.[0]?.url || imagenesDeMuestra}
            description={post.description}
            tags={post.Tags?.map((tag) => tag.name) || []}
            commentCount={post.commentCount || 0}
            userName={post.User?.nickName || "Usuario desconocido"}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Home;